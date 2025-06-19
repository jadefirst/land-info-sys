import type { LandInfo, ApiError } from "./land";




/**
 * 좌표 api
 */
export const getInvestmentScore = async(lat: number, lng: number) => {

  try {
    const response = await fetch('http://localhost:8085/api/investment/score', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ lat, lng})
    })
  
    if(!response.ok) {
       throw new Error('투자점수 조회 실패');
    }
  
    return await response.json();
    
  } catch (error) {
    console.log('api 호출 오류: ', error);

    return{
      lat,
      lng,
      address: `위도 ${lat.toFixed(4)}, 경도 ${lng.toFixed(4)} 지역`,
      pnu: `${lat}_${lng}`,
      totalScore: Math.floor(Math.random() * 40) + 60,
      profitabilityScore: Math.floor(Math.random() * 30) + 70,
      activityScore: Math.floor(Math.random() * 30) + 70,
      convenienceScore: Math.floor(Math.random() * 30) + 70,
      transportScore: Math.floor(Math.random() * 30) + 70,
    }
  }

}










