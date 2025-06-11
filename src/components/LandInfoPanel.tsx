
import React, { useEffect, useState } from 'react';
import type { ClickInfo, LandInfo } from '../utils/land';
import { getLandDetailsByPNU, formatArea, formatPrice } from '../utils/vworldApi';


interface LandInfoPanelProps {
  clickInfo: ClickInfo | null;
  loading: boolean;
}



const LandInfoPanel: React.FC<LandInfoPanelProps> = ({ clickInfo, loading}) => {
  const [landDetails, setLandDetails] = useState<LandInfo | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   
    // PNU가 있을 때 상세 정보 조회
    useEffect(() => {
        const fetchLandDetails = async() => {
         if(!clickInfo?.pnu) {
            setLandDetails(null)
            return;
        }   

        setDetailsLoading(true)
        setError(null)


        try {
            const details = await getLandDetailsByPNU(clickInfo.pnu)
            setLandDetails(details)
        } catch (error) {
            setError('토지 상세정보를 가져오는 중 오류가 발생했습니다.');
            console.error('토지 상세정보 조회 실패:', error);           
        } finally {
            setDetailsLoading(false);
        }
        }
        fetchLandDetails()
    },[clickInfo?.pnu])
   
   
   
 if (!clickInfo) {
  return <div>클릭하세요</div>;
} 
   
   
 return (
    <div className="info-panel">
      <h2>📍 토지 정보</h2>

      {/* 에러 메시지 */}
      {error && (
        <div className="info-error">
          <strong>⚠️ 오류 발생</strong>
          {error}
        </div>
      )}

      {/* 위치 정보 */}
      <div className="info-section">
        <h3>🎯 클릭 위치</h3>
        <div className="info-row">
          <span className="info-label">위도:</span>
          <span className="info-value">{clickInfo.lat.toFixed(6)}</span>
        </div>
        <div className="info-row">
          <span className="info-label">경도:</span>
          <span className="info-value">{clickInfo.lng.toFixed(6)}</span>
        </div>
      </div>

      {/* 주소 정보 */}
      <div className="info-section">
        <h3>📍 주소 정보</h3>
        <div className="info-row">
          <span className="info-label">주소:</span>
          <span className="info-value">{clickInfo.address || '주소 정보 없음'}</span>
        </div>
      </div>

      {/* PNU 정보 */}
      {clickInfo.pnu && (
        <div className="info-section">
          <h3>🏷️ 필지 정보</h3>
          <div className="info-row">
            <span className="info-label">PNU:</span>
            <span className="info-value">{clickInfo.pnu}</span>
          </div>
        </div>
      )}

      {/* 토지 상세 정보 */}
      {detailsLoading ? (
        <div className="info-section">
          <h3>🏠 토지 상세</h3>
          <div className="info-loading">
            <div className="loading-spinner"></div>
            상세 정보를 조회하고 있습니다...
          </div>
        </div>
      ) : landDetails ? (
        <div className="info-section">
          <h3>🏠 토지 상세</h3>
          {landDetails.address && (
            <>
              <div className="info-row">
                <span className="info-label">도로명:</span>
                <span className="info-value">{landDetails.address.roadAddress}</span>
              </div>
              <div className="info-row">
                <span className="info-label">지번:</span>
                <span className="info-value">{landDetails.address.jibunAddress}</span>
              </div>
            </>
          )}
          {landDetails.landDetails.area && (
            <div className="info-row">
              <span className="info-label">면적:</span>
              <span className="info-value">{formatArea(landDetails.landDetails.area)}</span>
            </div>
          )}
          {landDetails.landDetails.landType && (
            <div className="info-row">
              <span className="info-label">지목:</span>
              <span className="info-value">{landDetails.landDetails.landType}</span>
            </div>
          )}
          {landDetails.landDetails.publicPrice && (
            <div className="info-row">
              <span className="info-label">공시지가:</span>
              <span className="info-value">{formatPrice(landDetails.landDetails.publicPrice)} /㎡</span>
            </div>
          )}
          {landDetails.landDetails.ownerType && (
            <div className="info-row">
              <span className="info-label">소유구분:</span>
              <span className="info-value">{landDetails.landDetails.ownerType}</span>
            </div>
          )}
        </div>
      ) : clickInfo.pnu ? (
        <div className="info-section">
          <h3>🏠 토지 상세</h3>
          <div className="info-placeholder">
            <p>상세 정보를 가져올 수 없습니다</p>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>
              (API 연동 개발 중)
            </p>
          </div>
        </div>
      ) : null}

      {/* 추가 정보 안내 */}
      {!clickInfo.pnu && (
        <div className="highlight-box">
          <strong>💡 안내</strong>
          토지 경계 내의 지점을 클릭하시면<br/>
          더 자세한 토지 정보를 확인할 수 있습니다.
        </div>
      )}
    </div>
  );
}

export default LandInfoPanel;