// Netlify serverless function: proxies dev.to's *authenticated* article
// endpoint so we can see the account's own published posts exactly as
// dev.to sees them — this avoids cases where the public, unauthenticated
// /api/articles?username=... listing quietly omits a post (e.g. very
// short "test" posts can get held back from public listings until dev.to's
// automated review clears them, even though the post itself is live).
//
// SETUP (one-time):
//   Netlify dashboard -> Site configuration -> Environment variables
//   -> add DEVTO_API_KEY = <the API key you generated on dev.to>
//   (dev.to: Settings -> Extensions -> DEV Community API Keys)
//
// The key never touches the browser — it stays server-side here.

exports.handler = async function () {
  const apiKey = process.env.DEVTO_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "DEVTO_API_KEY not configured" }),
    };
  }

  try {
    const res = await fetch("https://dev.to/api/articles/me/published?per_page=30", {
      headers: { "api-key": apiKey },
    });

    if (!res.ok) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "dev.to request failed", status: res.status }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: String(err) }),
    };
  }
};
