export default async function handler(req, res) {
  const { steamId64 } = req.query; // SteamID64를 요청에서 가져오기
  const apiKey = process.env.STEAM_API_KEY; // Vercel 환경변수에 저장된 Steam API 키

  if (!steamId64) {
    return res.status(400).json({ error: 'Missing SteamID64 parameter.' });
  }

  const apiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId64}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.response.players.length > 0) {
      const player = data.response.players[0];
      res.status(200).json({
        personaName: player.personaname,
        personaState: player.personastate, // 0: Offline, 1: Online, etc.
        gameInfo: player.gameextrainfo || null, // 현재 게임 정보
      });
    } else {
      res.status(404).json({ error: 'Player not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Steam status data.' });
  }
}
