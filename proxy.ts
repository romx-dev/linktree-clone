import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// #region agent log
fetch("http://127.0.0.1:7243/ingest/78192930-7ea9-4b62-9a53-b5bc18ed6cf1", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    location: "proxy.ts:5",
    message: "Proxy initialized",
    data: { hasMatcher: false },
    timestamp: Date.now(),
    sessionId: "debug-session",
    runId: "run1",
    hypothesisId: "A",
  }),
}).catch(() => {});
// #endregion

// Define public routes that don't require authentication
// Note: Routes like /planos will be protected by the page itself using redirect
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

// #region agent log
fetch("http://127.0.0.1:7243/ingest/78192930-7ea9-4b62-9a53-b5bc18ed6cf1", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    location: "proxy.ts:20",
    message: "Public routes matcher created",
    data: { matcherExists: true },
    timestamp: Date.now(),
    sessionId: "debug-session",
    runId: "run1",
    hypothesisId: "A",
  }),
}).catch(() => {});
// #endregion

export default clerkMiddleware(async (auth, req) => {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/78192930-7ea9-4b62-9a53-b5bc18ed6cf1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "proxy.ts:25",
      message: "clerkMiddleware executed",
      data: { path: req.nextUrl.pathname, isPublic: isPublicRoute(req) },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "A",
    }),
  }).catch(() => {});
  // #endregion

  // Clerk middleware is now active - this allows currentUser() to work
  // Individual pages will handle their own authentication requirements
  // Public routes (home, sign-in, sign-up) are explicitly allowed
  // Protected routes like /planos will check auth in the page component
});

// #region agent log
fetch("http://127.0.0.1:7243/ingest/78192930-7ea9-4b62-9a53-b5bc18ed6cf1", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    location: "proxy.ts:40",
    message: "Proxy export completed",
    data: { proxyExists: true },
    timestamp: Date.now(),
    sessionId: "debug-session",
    runId: "run1",
    hypothesisId: "A",
  }),
}).catch(() => {});
// #endregion

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
