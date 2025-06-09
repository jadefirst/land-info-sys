import React from 'react';
import MapComponent from './components/Mapcomponent'
import './App.css';
import type { ClickInfo } from './utils/land';

function App() {
  return (
    <div className="app">
      {/* 헤더 */}
      <header className="app-header">
        <h1>🗺️ 실시간 토지정보 시스템</h1>
        <p>
          <span className="status-indicator"></span>
          지도를 클릭하여 토지 정보를 확인하세요
        </p>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <MapComponent onLocationClick={function (ClickInfo: ClickInfo): void {
          throw new Error('Function not implemented.');
        } } loading={false}          
        // onLocationClick={handleLocationClick}
          // loading={loading}
        />
        {/* <LandInfoPanel 
          clickInfo={clickInfo}
          loading={loading}
        /> */}
      </main>
    </div>
  );
}

export default App;