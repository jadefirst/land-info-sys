
export interface ClickInfo {
  pnu(pnu: any): unknown;
  lat: number;
  lng: number;
  address?: string;
  totalScore?: number;           
  profitabilityScore?: number;  
  activityScore?: number;        
  convenienceScore?: number;     
  transportScore?: number; 
}

export interface LandInfo {
  pnu: string;
  address: {
    roadAddress: string;
    jibunAddress: string;
  };
  landDetails: {
    area?: number;        // 면적 (㎡)
    landType?: string;    // 지목
    publicPrice?: number; // 공시지가 (원/㎡)
    ownerType?: string;   // 소유구분
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}
   
export interface VWorldAddressResponse {
  response: {
    status: string;
    result?: Array<{
      text: string;
      structure: {
        level0?: string;  // 시도
        level1?: string;  // 시군구  
        level2?: string;  // 읍면동
        level3?: string;  // 리
        level4L?: string; // 도로명
        level4A?: string; // 건물번호
        level4AC?: string;// 건물번호 상세
        level5?: string;  // 건물명
        detail?: string;  // 상세주소
        parcel?: string;  // PNU
      };
    }>;
  };
}

export interface VWorldLandResponse {
  response: {
    status: string;
    result?: {
      featureCollection: {
        features: Array<{
          properties: {
            pnu: string;
            jibun: string;
            area: number;
            landType: string;
            [key: string]: any;
          };
        }>; 
      };
    };
  };
}

export interface ApiError {
  message: string;
  code?: string;
}