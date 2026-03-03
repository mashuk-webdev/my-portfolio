# Mashuk Portfolio - A Next.js Portfolio Website

This is a professional, production-ready portfolio website for "Mashuk", a Full-Stack Developer. Built with Next.js (App Router), Tailwind CSS, and TypeScript.

It features a clean, minimal design, smooth animations, a working contact form powered by Firebase, a blog, and an AI-powered SEO Enhancement Tool.

## Core Features

-   **Modern Stack**: Next.js 14+ (App Router), React 18, Tailwind CSS.
-   **Multiple Pages**: Home, About, Projects, Services, Blog, Contact, and an AI Tools page.
-   **Animations**: Subtle scroll-reveal animations and micro-interactions.
-   **Responsive Design**: Mobile-first and fully responsive across all devices.
-   **Light/Dark Mode**: Theme toggling with preference saved to local storage.
-   **Contact Form**: Server-side validation with honeypot, timing checks, optional Turnstile CAPTCHA, Redis-backed rate limiting, and Resend-powered email delivery.
-   **Blog**: Fetches posts from Firestore (with a fallback to local mock data).
-   **SEO Optimized**: Per-page metadata, semantic HTML, and an AI tool for SEO suggestions.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A Firebase project

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your project, go to **Project Settings** > **General**.
3.  Under "Your apps", click the Web icon (`</>`) to create a new web app.
4.  Register your app and copy the `firebaseConfig` object. You will need these values for your environment variables.
5.  Navigate to the **Firestore Database** section, click **Create database**, and start in **production mode**. Choose a location near your users.

### 4. Set up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.local.example .env.local
```

Now, open `.env.local` and add the Firebase configuration values you copied in the previous step:

```
GEMINI_API_KEY="<your-gemini-api-key>"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
SITE_URL="https://your-domain.com"
NEXT_PUBLIC_FIREBASE_API_KEY="<your-firebase-api-key>"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="<your-messaging-sender-id>"
NEXT_PUBLIC_FIREBASE_APP_ID="<your-firebase-app-id>"

# Optional for server-side Firebase Admin access in Next.js:
# FIREBASE_SERVICE_ACCOUNT_KEY='{"projectId":"...","clientEmail":"...","privateKey":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"}'
# FIREBASE_PROJECT_ID="your-project-id"

# Contact receiver (defaults to mdmashuk042@gmail.com)
# CONTACT_RECEIVER_EMAIL="mdmashuk042@gmail.com"

# Resend email delivery (recommended)
# RESEND_API_KEY="re_..."
# CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"

# Search Console and Bing verification
# GOOGLE_SITE_VERIFICATION="<google-site-verification-token>"
# BING_SITE_VERIFICATION="<bing-site-verification-token>"

# IndexNow (recommended for faster indexing updates)
# INDEXNOW_KEY="<your-indexnow-key>"
# INDEXNOW_KEY_LOCATION="https://your-domain.com/indexnow-key.txt"
# INDEXNOW_API_TOKEN="<optional-secret-for-protecting-/api/indexnow>"

# Optional Cloudflare Turnstile CAPTCHA (recommended for production)
# TURNSTILE_SECRET_KEY="<your-turnstile-secret-key>"
# NEXT_PUBLIC_TURNSTILE_SITE_KEY="<your-turnstile-site-key>"

# Optional Upstash Redis rate limiting (recommended for production)
# UPSTASH_REDIS_REST_URL="https://<your-db>.upstash.io"
# UPSTASH_REDIS_REST_TOKEN="<your-upstash-rest-token>"
```

Important: `.env`, `.env.local`, and `functions/.secret.local` must never be committed.

### 5. Configure Email Delivery (Resend Recommended)

Set these variables in `.env.local`:

```env
RESEND_API_KEY="re_..."
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
CONTACT_RECEIVER_EMAIL="mdmashuk042@gmail.com"
```

`CONTACT_RECEIVER_EMAIL` is optional; it defaults to `mdmashuk042@gmail.com`.

If you use your own domain in Resend, update `CONTACT_FROM_EMAIL` to a verified sender.

Legacy option: Firebase Functions + Gmail secrets still works, but Resend is simpler for local and production setup.

For Firebase emulators, copy `functions/.secret.local.example` to `functions/.secret.local` and fill values only if you need the legacy Gmail flow.

### 6. Configure Firestore Security Rules

The contact form writes through trusted server code (Firebase Admin SDK). Direct client writes to enquiries should stay blocked.

1.  In the Firebase Console, go to the **Firestore Database** section and click on the **Rules** tab.
2.  Replace the default rules with the following:

```json
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts: public read, admin-only write.
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Enquiries are server-only (written by Admin SDK in Next.js actions).
    match /enquiries/{enquiryId} {
      allow read, write: if false;
    }

    // Deny all other access to prevent unauthorized reads/writes
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3.  Click **Publish**.

### 7. Run the development server

You can now start the development server:

```bash
npm run dev
```

This runs on a fixed port: `http://localhost:3000`.

If assets ever look broken after interrupted runs, stop all running dev servers and use:

```bash
npm run dev:clean
```

Run only one `next dev` instance per project folder at a time.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 8. Optional: Enable CAPTCHA and Redis Rate Limit (Recommended)

1.  Create a Cloudflare Turnstile widget and set:
    - `TURNSTILE_SECRET_KEY`
    - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
2.  Create an Upstash Redis database and set:
    - `UPSTASH_REDIS_REST_URL`
    - `UPSTASH_REDIS_REST_TOKEN`
3.  Restart the Next.js server after updating environment variables.

When these variables are set, contact form protection uses Turnstile + Redis fixed-window limits. If Redis is unavailable, Firestore-based fallback limits are used.
Turnstile is enabled only when both Turnstile variables are present; partial setup is treated as misconfigured and submissions are rejected.

### 9. Search Console, Bing, and IndexNow Setup

1. Set `NEXT_PUBLIC_SITE_URL` and `SITE_URL` to your production domain.
2. In Google Search Console, choose **URL Prefix** property and verify ownership.
   - Recommended method here: HTML tag verification token via `GOOGLE_SITE_VERIFICATION`.
3. In Bing Webmaster Tools, add the same site and verify ownership.
   - Recommended method here: meta verification token via `BING_SITE_VERIFICATION`.
4. Submit your sitemap in both dashboards:
   - `https://<your-domain>/sitemap.xml`
5. Configure IndexNow:
   - Set `INDEXNOW_KEY` in env.
   - Optional: set `INDEXNOW_KEY_LOCATION` (defaults to `/indexnow-key.txt`).
   - Optional: set `INDEXNOW_API_TOKEN` to protect trigger route.
6. Trigger IndexNow submission:
   - GET all important URLs:
     ```bash
     curl https://<your-domain>/api/indexnow
     ```
   - POST specific URLs:
     ```bash
     curl -X POST https://<your-domain>/api/indexnow \
       -H "Content-Type: application/json" \
       -d '{"urls":["https://<your-domain>/","https://<your-domain>/projects"]}'
     ```
   - If `INDEXNOW_API_TOKEN` is set, include header:
     ```bash
     -H "x-indexnow-token: <your-token>"
     ```

## How to Test

-   **Automated checks**:
    ```bash
    npm run test
    npm run lint
    npm run typecheck
    npm run build
    ```
-   **Home Page**: Open `/` and check if the hero section and other preview sections load correctly.
-   **Navigation**: Click through the navigation links in the header and footer.
-   **Contact Form**:
    1.  Go to the `/contact` page.
    2.  Fill out the form with valid data and submit.
    3.  If Turnstile is configured, complete the CAPTCHA challenge.
    4.  A "Message sent successfully!" toast should appear.
    5.  Check `CONTACT_RECEIVER_EMAIL` inbox for the new enquiry email.
    6.  (Optional) Go to Firebase Console > Firestore Database to see the logged document in `enquiries`.
-   **Projects Page**: Visit `/projects`. Project cards should load. Clicking a card should take you to the project's detail page.
-   **Blog Page**: Visit `/blog`. The blog posts will load from mock data.
-   **Responsiveness**: Resize your browser window or use browser developer tools to check the mobile layout. The header should collapse into a hamburger menu.
-   **Theme Toggle**: Click the theme toggle button to switch between light and dark modes.

## GenAI SEO Tool

The application includes an AI-powered SEO Enhancement Tool available at `/tools`. This tool uses Genkit and Google AI to analyze content and provide SEO suggestions. To run it locally, you might need to authenticate with Google Cloud:

```bash
gcloud auth application-default login
```

## CI

GitHub Actions workflow runs on push and pull requests:
- `npm run test`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --omit=dev`
