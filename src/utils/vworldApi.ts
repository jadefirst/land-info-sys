import type { ClickInfo, VWorldAddressResponse, LandInfo, ApiError } from "./land";



// const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;
const API_KEY = "83450C7B-79F6-3640-BACD-067EC688CA9B";

if(!API_KEY) {
    console.error('VWorld API Key가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

/**
 * 좌표를 주소로 변환
 */
export const getAddressFromCoordinates = async(lat: number, lng: number): Promise<ClickInfo> => {
    try {
        const response = await fetch(
        `/api/req/address?service=address&request=getAddress&key=${API_KEY}&point=${lng},${lat}&type=parcel&zipcode=true&simple=false`
        );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: VWorldAddressResponse = await response.json()
        console.log('data 좌표를 주소로 변환 ',data)

    if(data.response.status === 'OK' && data.response.result && data.response.result.length > 0 ) {
        const result = data.response.result[0]
        console.log('result ::::::::::',result)
        return {
            lat,
            lng,
            address: result.text,
            pnu: result.structure?.parcel || '없음'
        }
    }else {
        return {
            lat,
            lng,
            address: '주소를 찾을 수 없습니다'
        }
}
    } catch (error) {
        console.error('주소 조회 실패:', error);
        return {
            lat,
            lng,
            address: '주소 조회 중 오류가 발생했습니다.'
        }
    }
}

/**
 * PNU로 토지 상세정보 조회
 */
export const getLandDetailsByPNU = async (pnu: string): Promise<LandInfo | null> => {
  try {
    // TODO: 실제 토지 상세정보 API 연동
    // 현재는 목업 데이터 반환
    
    // 임시 데이터 (실제 API 연동 전까지 사용)
    const mockLandInfo: LandInfo = {
      pnu,
      address: {
        roadAddress: '서울특별시 중구 세종대로 110',
        jibunAddress: '서울특별시 중구 태평로1가 31'
      },
      landDetails: {
        area: 1234.56,
        landType: '대지',
        publicPrice: 12500000,
        ownerType: '사유'
      },
      coordinates: {
        lat: 37.566535,
        lng: 126.977969
      }
    };
    
    return mockLandInfo;
  } catch (error) {
    console.error('토지 상세정보 조회 실패:', error);
    return null;
  }
};



/**
 * 주소로 좌표 검색 (지오코딩)
 */
export const getCoordinatesFromAddress = async (address: string): Promise<{lat: any, lng: any} | null> => {
 try {
    const response = await fetch(
        `http://api.vworld.kr/req/address?service=address&request=getCoord&key=${API_KEY}&address=${encodeURIComponent(address)}&simple=false&crs=epsg:4326`
    )
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json()
    if(data.response.status === 'OK' && data.response.result && data.response.result.length > 0) {
        const {x,y} = data.response.result.point;
        console.log('좌표검색 x  y  값', {x,y})
        return {lat: parseFloat(y), lng: parseFloat(x)}
    }
    return null
 } catch (error) {
    console.error('좌표 조회 실패:', error);
    return null
 }
}

/**
 * API 에러 처리 헬퍼
 */
export const handleApiError = (error: any): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  }
  
  return {
    message: '알 수 없는 오류가 발생했습니다',
    code: 'UNKNOWN_ERROR'
  };
};


/**
 * 면적을 읽기 쉬운 형태로 포맷
 */
export const formatArea = (area: number) => {
    const pyeongRatio = 400/121
    if(area >= 3305)  //1000평 이상 
    {
        const pyeong = (area / pyeongRatio).toFixed(0)
        return `${area.toLocaleString()}㎡ (약 ${pyeong}평)`
    }else {
    const pyeong = (area / pyeongRatio).toFixed(1);
    return `${area.toLocaleString()} ㎡ (약 ${pyeong}평)`;
  }
}

/**
 * 가격을 읽기 쉬운 형태로 포맷
 */
export const formatPrice = (price:number) => {
    if(price >= 100000000) {
        const eok = Math.floor(price / 100000000)
        const remainder = price % 100000000
        if(remainder === 0) {
            return `${eok}억원`
        }else{
            const man = Math.floor(remainder / 10000)
            return `${eok}억 ${man.toLocaleString()}만원`;
        }
    }else if( price >= 10000) {
        const man = Math.floor(price / 10000)
        const remainder = price % 10000
        if(remainder === 0) {
            return `${man}만원`
        }else {
            return `${man}만 ${remainder.toLocaleString()}원`;
        }
    }else {
        return `${price.toLocaleString()}원`;
    }
}








