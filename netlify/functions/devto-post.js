// Netlify serverless function: fetches a single dev.to article by id,
// server-side. This exists so the blog "read full post" view never has
// to rely on dev.to's API being reachable directly from the browser —
// if that ever gets blocked by CORS or rate limiting, requests made from
// here (server to server) aren't affected the same way.

exports.handler = async function (event) {
  const id = event.queryStringParameters && event.queryStringParameters.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "missing id" }),
    };
  }

  try {
    const res = await fetch("https://dev.to/api/articles/" + encodeURIComponent(id));

    if (res.status === 404) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "not found" }),
      };
    }

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
