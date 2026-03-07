# Implementation Plan: AI-Powered Semantic Search

**Objective:** Upgrade Spengo's existing Fuse.js keyword search to a fully AI-powered semantic search engine using OpenAI embeddings (text-embedding-ada-002) and Supabase pgvector.

## Phase 1 — Backfill all existing content
**What we are doing and why it matters:**
We'll write a one-time seed script to generate embeddings for all 17 existing static Spengo pages AND all blog posts currently in the Supabase database. This solves the "cold start" problem — ensuring our new semantic search actually returns valuable, pre-populated content from the very first day. We're matching by URL during the upsert so running the script multiple times won't create duplicate records.

**Tasks:**
- [x] Create a seed script (e.g., `scripts/seed_embeddings.js` or `.ts`).
- [x] Fetch the URLs, titles, and descriptions of the 17 static pages.
- [x] Fetch all existing blog posts from Supabase using the Supabase MCP where possible (fetching title, description, and URL).
- [x] For each page/blog post, combine `title` + `description` into a single string.
- [x] Ingest each combined string into the OpenAI API using `text-embedding-ada-002` to generate a 1536-dimensional embedding.
- [x] Upsert the generated embeddings into the `page_embeddings` table in Supabase, matched by `url`.

**Code Snippets:**

*OpenAI Embedding Draft:*
```javascript
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const response = await openai.createEmbedding({
  model: 'text-embedding-ada-002',
  input: `${title} - ${description}`,
});
const embedding = response.data.data[0].embedding;
```

*Supabase Upsert Draft:*
```javascript
const { data, error } = await supabase
  .from('page_embeddings')
  .upsert({ url, title, description, embedding }, { onConflict: 'url' });
```

**Verification Checklist:**
- [ ] Seed script executes without throwing errors.
- [ ] The `page_embeddings` table in Supabase is populated with rows matching the number of pages + blog posts.
- [ ] No duplicate URLs exist in the database even if the script is run multiple times.

---

## Phase 2 — Auto-sync all future content
**What we are doing and why it matters:**
Here, we ensure that the search engine stays up to date implicitly. We'll add a new `/api/embed` Next.js endpoint that hooks directly into the existing `/admin/blog-admin` UI. This allows authors to publish, update, and delete seamlessly without manually touching search records. Crucially, the embedding generation logic lives strictly server-side to keep our OpenAI secret key totally locked down and secure. If creating an embedding fails, we fail gracefully without blocking the blog publish flow.

**Tasks:**
- [x] Create a new Next.js API route at `/api/embed`.
- [x] The route must parse the POST body for `title`, `description`, `url`, and `action` (`upsert` or `delete`).
- [x] If `action === 'delete'`, remove the corresponding row from `page_embeddings` by `url`.
- [x] If `action === 'upsert'`, call OpenAI `text-embedding-ada-002` to generate an embedding for the combined title and description.
- [x] Upsert the generated embedding into the `page_embeddings` table.
- [x] Wrap the embedding generation in a try/catch block. If an error occurs, log it but return a success code to ensure the publishing flow remains unbroken.
- [x] Update `/admin/blog-admin` hooks (on publish, update, and delete) to POST to `/api/embed`.

**Code Snippets:**

*API Route Draft (`/api/embed`):*
```javascript
export default async function handler(req, res) {
  const { title, description, url, action } = req.body;
  if (action === 'delete') {
    await supabase.from('page_embeddings').delete().eq('url', url);
    return res.status(200).json({ success: true });
  }

  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: `${title} - ${description}`
    });
    const embedding = response.data.data[0].embedding;
    await supabase.from('page_embeddings').upsert(
      { url, title, description, embedding },
      { onConflict: 'url' }
    );
  } catch (err) {
    console.error('Embedding failed, but saving gracefully:', err);
  }
  return res.status(200).json({ success: true });
}
```

**Verification Checklist:**
- [ ] Publishing a new blog post in `/admin/blog-admin` successfully adds a row to `page_embeddings`.
- [ ] Updating a blog post updates its embedding.
- [ ] Deleting a blog post removes the row from `page_embeddings`.
- [ ] Invalid OpenAI API keys/fail states don't block saving the original post.

---

## Phase 3 — Upgrade the search UI
**What we are doing and why it matters:**
We replace the naive keyword matching (Fuse.js) with context-aware semantic search logic. The existing aesthetic stays exactly the same, so regular users just feel like search got magically "smarter". The new `/api/search` route handles the heavy lifting, securing the API key, and returning results from the `match_pages` pgvector function. We'll also use debouncing on the client side to avoid spamming the database while typing.

**Tasks:**
- [x] Create a Next.js API route `/api/search`.
- [x] Accept a `query` parameter from the client.
- [x] Call OpenAI `text-embedding-ada-002` using the `query` input to generate a search vector.
- [x] Call `supabase.rpc('match_pages', { query_embedding: vector, match_threshold: 0.5, match_count: 5 })` using the backend.
- [x] Return the rows to the client.
- [x] Refactor the existing search overlay UI: completely remove the `fuse.js` dependency from the codebase.
- [x] Add a `300ms` debounce to the search input state before initiating a fetch to `/api/search`.
- [x] Render results using the exact same dark theme, purple accents, and result card design.

**Code Snippets:**

*Server-side Search RPC Draft:*
```javascript
const response = await openai.createEmbedding({
  model: 'text-embedding-ada-002',
  input: query
});
const query_embedding = response.data.data[0].embedding;

const { data, error } = await supabase.rpc('match_pages', {
  query_embedding,
  match_threshold: 0.5,
  match_count: 5
});
```

*Client-side Debounce Hook Draft:*
```javascript
import { useEffect, useState } from 'react';

// Debounce value inside component setup
const [debouncedQuery, setDebouncedQuery] = useState(query);

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedQuery(query);
  }, 300);
  return () => clearTimeout(handler);
}, [query]);
```

**Verification Checklist:**
- [ ] Searching vague concepts or typos returns accurate results.
- [ ] `fuse.js` is uninstalled and fully removed from `package.json` and imports.
- [ ] Rapid typing triggers only one API call per 300ms pause.
- [ ] The search UI visuals are visually 100% unchanged.

---

## Phase 4 — Polish and edge cases
**What we are doing and why it matters:**
A great feature requires rock-solid edge case handling. We are implementing loading states, mobile responsiveness, empty states, and rate limits. This guarantees that whether the user is on a tiny phone or the API slows down, the layout holds up gracefully without crashing or running up an astronomical OpenAI bill.

**Tasks:**
- [x] Add a loading state representation while waiting on `/api/search` so the user knows an action is processing.
- [x] Handle client `fetch` errors safely, rendering a friendly fallback message instead of crashing or showing a blank overlay.
- [x] Update specific styles to ensure the search overlay is fully responsive: switch to a full-screen layout with scrollable results on screens smaller than `768px`.
- [x] Add clear "No results found" empty state if the API responds with 0 hits.
- [x] Add basic rate limiting to `/api/search` restricting requests to 20 per minute per IP address.

**Code Snippets:**

*Mobile CSS Modification Draft:*
```css
@media (max-width: 768px) {
  .search-overlay-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
  }
}
```

*Conditional UX Draft:*
```javascript
if (isLoading) return <LoadingInterface />;
if (error) return <FriendlyErrorMessage />;
if (!error && results.length === 0 && debouncedQuery) {
  return <NoResultsMessage query={debouncedQuery} />;
}
```

**Verification Checklist:**
- [ ] Loading state visually verifies asynchronous calls.
- [ ] Breaking the network displays the friendly fallback message.
- [ ] Non-sense queries trigger the exact "No results found" empty state behavior.
- [ ] Search overlay behaves responsively `<768px` spanning the viewport.
- [ ] Triggering `/api/search` 21 times inside 60s returns `429 Too Many Requests`.
