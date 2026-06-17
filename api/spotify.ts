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
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    if (!recentRes.ok) {
      return res.status(500).json({ error: "Failed to fetch recently played" });
    }

    const data = await recentRes.json();

    const tracks: Track[] = data.items.map(
      (item: { track: { name: string; artists: { name: string }[]; album: { name: string; images: { url: string }[] }; external_urls: { spotify: string } }; played_at: string }) => ({
        name: item.track.name,
        artist: item.track.artists.map((a: { name: string }) => a.name).join(", "),
        album: item.track.album.name,
        albumImageUrl: item.track.album.images[0]?.url ?? "",
        spotifyUrl: item.track.external_urls.spotify,
        playedAt: item.played_at,
      }),
    );

    return res.status(200).json(tracks);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}
