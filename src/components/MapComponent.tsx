
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapComponent.css';
import type { ClickInfo } from '../utils/land';
// import { getAddressFromCoordinates } from '../utils/vworldApi';


interface MapComponentProps {
    onLocationClick: (ClickInfo: ClickInfo) => void;
    loading: boolean
}

function MapClickHandler({
    onLocationClick,
    setLoading
}: {
    onLocationClick: (info: ClickInfo) => void;
    setLoading: (loading: boolean) => void
}) {
    useMapEvents({
        click: async(e) => {
            const {lat, lng} = e.latlng
            console.log('지도 클릭:', lat, lng);
      
            setLoading(true);

            try {
                
            } catch (error) {
                
            }
        }
    })
    return null
}


const MapComponent: React.FC<MapComponentProps> = ({ onLocationClick, loading}) => {
    const [mapLoading, setMapLoading] = useState(false);

    const VWORLD_API_KEY = import.meta.env.VITE_VWORLD_API_KEY;
    return (
     <div className="map-container">
      {(loading || loading) && (
        <div className="map-loading">
          <div className="map-loading-spinner"></div>
          위치 정보를 조회하고 있습니다...
        </div>
      )}
      
      <div className="map-wrapper">
        <MapContainer
          center={[37.5665, 126.9780]} // 서울 중심
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={() => console.log('지도 로드 완료')}
        >
          {/* VWorld 배경지도 */}
          <TileLayer
            url={`http://api.vworld.kr/req/wmts/1.0.0/${VWORLD_API_KEY}/Base/{z}/{y}/{x}.png`}
            attribution='&copy; VWorld | 국토교통부'
            maxZoom={19}
          />
          
          {/* 위성 지도 (선택적) */}
          {/* <TileLayer
            url={`http://api.vworld.kr/req/wmts/1.0.0/${VWORLD_API_KEY}/Satellite/{z}/{y}/{x}.jpeg`}
            attribution='&copy; VWorld'
          /> */}
          
          {/* 클릭 이벤트 핸들러 */}
          <MapClickHandler 
            onLocationClick={onLocationClick} 
            setLoading={setMapLoading}
          />
        </MapContainer>
      </div>
    </div>       
    )
}

export default MapComponent;