# Spengo Website

This repository contains the official website and backend dashboards for Spengo. It serves as our primary landing page, performance tracking hub, blog platform, and client booking portal.

## 🚀 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Backend, Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage Buckets, Edge Functions)
*   **Error Monitoring:** [Sentry](https://sentry.io/)
*   **Client-Side Search:** [Fuse.js](https://fusejs.io/)

## ✨ Key Features

*   **Dynamic Landing Page:** Features modern web aesthetics including interactive background blobs, cursor glow effects, and a responsive mega-menu navigation.
*   **Admin Dashboard:** A secured area for site administrators to track metrics, manage the blog (with image uploads via Supabase Storage), and (upcoming) manage 1-on-1 bookings and user roles.
*   **Client Booking System (In Progress):** Allows users to book 1-on-1 sessions up to 2 weeks in advance. Includes a full suite of session and category management for admins.
*   **Real-time Changelog:** A live-updating changelog page powered by Supabase Realtime subscriptions.
*   **Integrated Search:** Fast, client-side search functionality to easily navigate site content and articles.

## 📁 Project Structure

*   `app/`: Next.js App Router files. Contains the main layout, landing page (`page.tsx`), and different route segments like `/admin`, `/blog`, `/changelog`, etc.
*   `components/`: Reusable React components (Navbar, Hero, Footer, Contact, UI elements).
*   `src/`: (If applicable) Contains internal services or utility functions.
*   *(Root Level)*: Contains markdown documentation for our implementation plans and feature overviews (e.g., `IMPLEMENTATIONS_UPGRADESV5.md`, `IMPLEMENTATION_BOOKING.md`, `SENTRY_GUIDE.md`).

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn
*   A Supabase project (for database, auth, and storage)
*   A Sentry project (for monitoring)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd spengowebsite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the necessary environment variables for Supabase and Sentry. Coordinate with the project owner for the required keys.
    *(Requires `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and Sentry DSN variables).*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Documentation & Plans

If you are a developer looking to understand upcoming features or how specific parts of the app are built, please refer to the markdown files provided in the repository, particularly:
*   `implementation files/IMPLEMENTATION_BOOKING.md` (or wherever it was moved): Our roadmap for the new Spengo Backend Dashboards & Booking System.
*   `SENTRY_GUIDE.md`: Notes on our Sentry integration.
*   `GITHUB_ISSUES_GUIDE.md`: Notes on our GitHub Issue tracking.

---
*Maintained by the Spengo Team.*
