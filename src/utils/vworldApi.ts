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
      address: `수도권 지역`,
      totalScore: '-',
      profitabilityScore: '-',
      activityScore: '-',
      convenienceScore: '-',
      transportScore: '-',
    }
  }

}










