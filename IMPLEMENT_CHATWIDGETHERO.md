# Implementation Plan: Inline AI Chat Widget (Hero Section)

This document outlines the steps to build and integrate an inline AI chat section sitting directly below the existing hero content on the Spengo website. 

## 🎯 Goal
Create a full-width, embedded chat-style interface that allows users to interact with "Mav", Spengo's AI assistant, with support for normal messages, clickable quick-reply pill buttons, and horizontal card carousels.

---

## 🛠️ Tech Stack & Prerequisites
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (matching site standards, deep dark backgrounds #0d0d0d+, and purple #7c3aed accents)
- **Animations:** Framer Motion (smooth transitions), typing indicators
- **Icons:** Lucide React (for standard UI elements like send icon)
- **State Management:** React `useState` and `useEffect`

---

## 📂 Implementation Steps

### Step 1: Create the Component `src/components/InlineChatWidget.tsx`
Create a new client component that houses the core layout.

#### 1. Layout Structure
- **Container:** Max height ~400px, overflow-y-auto, full width.
- **Message List:** Map over a `messages` array.
- **Typing Indicator:** Show whenever `isLoading` is true.
- **Bottom Input Area:** Sticky/flexed at bottom containing `<input>` and send `<button>`.

---

### Step 2: Define State & Session ID
- **`sessionId`**: Generate a random string/UUID *once* on load.
  ```typescript
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  ```
- **`messages`**: State tracking message logs.
  - Initial message: `{ role: 'mav', content: "Hey — I'm Mav, Spengo's assistant. What brought you here today?" }`
- **`isLoading`**: State for handling typing anim during webhook waiting time.
- **`input`**: Controlled input value for user typing.

---

### Step 3: Implement Webhook Backend Communication
- **URL:** `https://goadlabs.app.n8n.cloud/webhook/a36340de-354c-44c1-92c6-c4c02c33e62d`
- **Payload:** `{ "message": "<user input>", "sessionId": "<sessionId>" }`
- **Response Handling:**
  - Extract text from `.response` or `.output` or `.output` field.
  - Append to messages array.

```typescript
const sendMessage = async (text: string) => {
  if (!text.trim()) return;
  setMessages(prev => [...prev, { role: 'user', content: text }]);
  setInput('');
  setIsLoading(true);

  try {
    const res = await fetch('https://goadlabs.app.n8n.cloud/webhook/a36340de-354c-44c1-92c6-c4c02c33e62d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId })
    });
    const data = await res.json();
    const botResponse = data.response?.output || data.output || data.response || "Sorry, I'm experiencing some trouble right now.";

    setMessages(prev => [...prev, { role: 'mav', content: botResponse }]);
  } catch (error) {
    console.error("Webhook Error:", error);
  } finally {
    setIsLoading(false);
  }
};
```

---

### Step 4: Parse Special Response Blocks
You will need a function to parse Mav responses into standard text vs special UI blocks for **Quick replies** and **Carousels**.

#### 1. Quick Replies Parsing (`[BUTTONS: ...]`)
Matches formatting starting with `[BUTTONS:` and ending with `]`.

```typescript
const parseButtons = (content: string) => {
  const match = content.match(/\[BUTTONS:\s*(.+?)\]/);
  if (!match) return { text: content, buttons: [] };
  const buttonsText = match[1];
  const buttons = buttonsText.split(',').map(b => b.trim());
  const cleanText = content.replace(/\[BUTTONS:\s*.+?\]/, '').trim();
  return { text: cleanText, buttons };
};
```

#### 2. Carousel Parsing (`[CAROUSEL]`)
Matches formatting starting with `[CAROUSEL]` and JSON array below it.

```typescript
const parseCarousel = (content: string) => {
  const marker = "[CAROUSEL]";
  const index = content.indexOf(marker);
  if (index === -1) return { text: content, carousel: null };

  const cleanText = content.substring(0, index).trim();
  const jsonString = content.substring(index + marker.length).trim();
  try {
    const carouselData = JSON.parse(jsonString);
    return { text: cleanText, carousel: carouselData };
  } catch (e) {
    return { text: content, carousel: null };
  }
};
```

---

### Step 5: Visual Styling & Framer Motion

- **Mav Cards:** Left-aligned. Subtle dark card background with faint purple left border.
- **User Cards:** Right-aligned with purple background (`#7c3aed`).
- **Cards (Carousel):** Flex item horizontally scrollable (`flex overflow-x-auto gap-4 py-2`). Sticky hover elevations.
- **Auto-Scroll Behavior:** Use `useRef` at bottom of messages and `useEffect` triggering scrolling on messages array updates.

```typescript
const bottomRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
```

---

### Step 6: Integration in Hero Layout
To put it inline, go to `src/components/Hero.tsx` and place it directly beneath your link layout:

```tsx
// Inside Hero.tsx (near bottom of view structure)
<div className="mt-12 w-full max-w-4xl">
  <InlineChatWidget />
</div>
```

Ensure `<InlineChatWidget>` doesn't inherit alignment that pushes items out of framing.

---

## ✅ Quality Assurance / Verification
After implementation, ensure:
1.  On Load, Mav sends the welcome statement.
2.  Sessions remain persistent (e.g. multi-turn dialogues keep context).
3.  Clicking pill replies instantly triggers user log bubble + triggers bot reload.
4.  Scrolling works seamlessly within max boundaries (~400px height window).
5.  Check mobile support — confirm that items don't overflow on small-screens.
