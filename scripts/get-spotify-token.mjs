import http from "node:http";
import { randomBytes } from "node:crypto";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPES = "user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}

const state = randomBytes(16).toString("hex");

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state,
  });

console.log("\nOpen this URL in your browser and authorize:\n");
console.log(authUrl + "\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);

  if (url.pathname !== "/") {
    res.writeHead(404);
    res.end();
    return;
  }

  if (url.searchParams.get("state") !== state) {
    res.writeHead(400);
    res.end("State mismatch");
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400);
    res.end("No code in response");
    return;
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  const data = await tokenRes.json();

  if (!data.refresh_token) {
    res.writeHead(500);
    res.end("Failed to get refresh token:\n" + JSON.stringify(data, null, 2));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`✅ Done! Add this to your .env:\n\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);

  console.log(`\n✅ Refresh token obtained! Add to .env:\n`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);

  server.close();
});

server.listen(PORT, () => {
  console.log(`Waiting for auth callback on http://localhost:${PORT} ...`);
});
