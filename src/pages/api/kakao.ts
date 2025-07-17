import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const kakaoApiKey = process.env.KAKAO_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search`,{
        	headers: {
                Authorization: `KakaoAK ${kakaoApiKey}`
            },
            params: {
                query: query,
            },
        });
    console.log('카카오맵 response', response);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Kakao API' });
    console.log(error);
  }}