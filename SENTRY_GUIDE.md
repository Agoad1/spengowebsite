# Sentry Setup Guide

This guide provides a quick checklist for setting up Sentry for error tracking and user feedback monitoring in the SPENGO Next.js application.

## 1. Account & Project Setup
1. Go to [sentry.io](https://sentry.io/) and sign up or log in.
2. Click **Create Project**.
3. Select **Next.js** as your platform.
4. Name your project (e.g., `spengowebsite`) and set the default alert settings.
5. Create the project and copy your **DSN** (Data Source Name).

## 2. Installation
Run the Sentry wizard in your project root, which handles most of the boilerplate:

```bash
npx @sentry/wizard@latest -i nextjs
```

During the wizard:
- It will ask you to log in to Sentry.
- Select your recently created `spengowebsite` project.
- It will automatically create essential files like `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`.
- It will update your `next.config.mjs` to inject the Sentry webpack plugin for source maps.

## 3. Environment Variables
Ensure your Sentry integration tokens and DSN are stored securely. Add them to your `.env.local` file:

```env
NEXT_PUBLIC_SENTRY_DSN="your_dsn_url_here"
SENTRY_AUTH_TOKEN="your_auth_token_here"
```

## 4. Feedback Widget (Optional but Recommended)
To enable the feedback loop widget on the client side, ensure it is enabled in your `sentry.client.config.ts` file under `integrations`:

```typescript
integrations: [
  Sentry.feedbackIntegration({
    // Enable the feedback widget
    colorScheme: "dark",
  }),
],
```

## 5. Verification
To test if it's working:
1. Create a test error in a controlled environment (e.g., throwing an error on a specific test button).
2. Check your Sentry Dashboard to see if the issue is captured.
