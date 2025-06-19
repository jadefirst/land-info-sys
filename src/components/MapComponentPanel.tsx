import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { type ClickInfo } from '../utils/land';
import { getInvestmentScore } from '../utils/vworldApi';

interface MapComponentProps {
  onLocationClick: (clickInfo: ClickInfo) => void;
  loading: boolean;
}

function MapClickHandler({ 
  onLocationClick, 
  setLoading 
}: { 
  onLocationClick: (info: ClickInfo) => void;
  setLoading: (loading: boolean) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      console.log('지도 클릭:', lat, lng);
      
      setLoading(true);
      
      try {
        // VWorld API로 좌표 -> 주소 변환
        const clickInfo = await getInvestmentScore(lat, lng);
        onLocationClick(clickInfo);
        console.error('clickInfo ::::::::::::', clickInfo);
      } catch (error) {
        console.error('위치 정보 조회 실패:', error);
        // onLocationClick({
        //   lat,
        //   lng,
        //   address: '위치 정보 조회 중 오류가 발생했습니다'
        // });
      } finally {
        setLoading(false);
      }
    },
  });
  
  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationClick, loading }) => {
  const [mapLoading, setMapLoading] = useState(false);

  // 하드코딩된 API 키 (임시)
  const VWORLD_API_KEY = "83450C7B-79F6-3640-BACD-067EC688CA9B";

  return (
    <div className="map-container">
      {(loading || mapLoading) && (
        <div className="map-loading">
          <div className="map-loading-spinner"></div>
          위치 정보를 조회하고 있습니다...
        </div>
      )}
      
      <div className="map-wrapper">
        <MapContainer
          {...({center :[37.5665, 126.9780], zoom: 13} as any)} 
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          {/* VWorld 배경지도 */}
          <TileLayer
            {...({ url :`https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_API_KEY}/Base/{z}/{y}/{x}.png`,
            maxZoom: 19
            } as any)}
          />
          
          {/* 클릭 이벤트 핸들러 */}
          <MapClickHandler 
            onLocationClick={onLocationClick} 
            setLoading={setMapLoading}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;