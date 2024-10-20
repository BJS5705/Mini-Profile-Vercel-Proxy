export default async function handler(req, res) {
  const steamId = req.query.accountId || '76561198055079301';
  const language = req.query.lang || 'koreana';

  const steamURL = `https://steamcommunity.com/miniprofile/${steamId}?l=${language}`;

  try {
    const response = await fetch(steamURL);
    const html = await response.text(); // HTML 데이터를 텍스트로 불러옴

    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    res.status(200).send(html); // HTML 반환
  } catch (error) {
    res.status(500).json({ error: 'Steam mini-profile fetch failed.' });
  }
}
