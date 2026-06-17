import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Track {
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  spotifyUrl: string;
  playedAt: string;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({ error: "Missing Spotify credentials" });
  }

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!tokenRes.ok) {
      return res.status(500).json({ error: "Failed to refresh token" });
    }

    const { access_token } = await tokenRes.json();

    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    if (!recentRes.ok) {
      return res.status(500).json({ error: "Failed to fetch recently played" });
    }

    const data = await recentRes.json();

    const item = data.items?.[0]?.track;
    if (!item) {
      return res.status(404).json({ error: "No recently played track found" });
    }

    const track: Track = {
      name: item.name,
      artist: item.artists.map((a: { name: string }) => a.name).join(", "),
      album: item.album.name,
      albumImageUrl: item.album.images[0]?.url ?? "",
      spotifyUrl: item.external_urls.spotify,
      playedAt: data.items[0].played_at,
    };

    return res.status(200).json(track);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}
