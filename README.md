# 부동산 투자 분석 플랫폼

지도 클릭으로 해당 지역의 투자 점수를 실시간으로 분석하는 서비스

## 프로젝트 소개

부동산 투자 시 필요한 여러 정보들(실거래가, 교통 접근성, 주변 시설 등)을 한 곳에서 확인할 수 있는 도구입니다.
지도에서 관심 지역을 클릭하면 투자 점수와 상세 분석 결과를 제공합니다.

### 주요 기능
- **원클릭 지역 분석**: 지도 클릭만으로 투자 점수 확인
- **종합 점수 산출**: 교통, 편의시설, 실거래가, 개발계획 등을 종합한 점수
- **실시간 데이터**: 공공 API를 통한 최신 정보 제공

## 기술 스택

**Backend**
- Spring Boot, Java
- REST API 설계
- 외부 API 연동 (국토교통부, 카카오맵)

**Frontend** 
- React, JavaScript
- Leaflet.js (지도)
- Tailwind CSS

**외부 API**
- 국토교통부 실거래가 API
- 카카오맵 API (좌표 변환, 교통정보)

## 실행 방법

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### 환경 설정
- 카카오 개발자센터에서 REST API 키 발급
- 공공데이터포털에서 국토교통부 API 키 발급
- `application.properties`에 API 키 설정

## 📊 투자 점수 계산

5개 지표를 종합하여 100점 만점으로 점수 산출:

- **교통 접근성**: 지하철역, 버스 정류장 거리
- **편의 시설**: 학교, 병원, 상업시설 밀도  
- **실거래가 분석**: 최근 거래 동향
- **개발 계획**: 재개발, 신규 개발 정보
- **가격 안정성**: 가격 변동 패턴

## 주요 구현 사항

### 비동기 API 처리
```java
CompletableFuture<String> realEstate = CompletableFuture.supplyAsync(() -> getRealEstateData());
CompletableFuture<String> transport = CompletableFuture.supplyAsync(() -> getTransportData());
// 병렬 처리로 응답 시간 단축
```

### 좌표 기반 분석
- 클릭 좌표를 주소로 변환
- 해당 지역 중심 반경 내 데이터 수집
- 법정동코드 매핑을 통한 공공데이터 조회

## 개선 계획

**성능 최적화**
- Redis 캐싱 도입 (같은 지역 재조회 시 빠른 응답)
- 데이터베이스 연동 (실시간 API 의존도 감소)

**기능 확장**  
- 여러 지역 비교 분석
- 관심 지역 북마크 기능
- 점수 상세 분석 차트

**아키텍처 개선**
- 서비스 분리 (지도/분석/데이터 수집)
- 모니터링 및 로깅 시스템

## 기술적 포인트

- **외부 API 통합**: 서로 다른 4개 API의 데이터 형식 통일
- **병렬 처리**: CompletableFuture를 활용한 응답 시간 최적화  
- **GIS 데이터 처리**: 좌표 변환 및 거리 계산
- **실시간 분석**: 사용자 요청 시점의 최신 데이터 활용

---

개발 기간: 약 2개월