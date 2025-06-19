import { useState } from 'react';
import LandInfoPanel from './components/LandInfoPanel'
import MapComponentView from './components/MapComponentPanel';
import type { ClickInfo } from './utils/land';

function App() {

const [clickInfo, setClickInfo] = useState<ClickInfo | null>(null);
const [loading] = useState(false);

const handleLocationClick = (info: ClickInfo) => {
  setClickInfo(info)
  console.log('App에서 받은 클릭 정보:', info);
  
}
  
  
  return (
    <div className="app">
      {/* 헤더 */}
      <header className="app-header">
        <h1>🏢 부동산 투자분석</h1>
        <p>
          <span className="status-indicator"></span>
          지도를 클릭하여 토지 정보를 확인하세요
        </p>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <MapComponentView onLocationClick={handleLocationClick} loading={loading} />
        <LandInfoPanel clickInfo={clickInfo} loading={loading} /> 
      </main>
    </div>
  );
}

export default App;