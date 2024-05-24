## MarkPark
**사용자 주변의 주차장 정보**를 지도에 표시해주는 서비스 입니다.  [배포 링크](http://3.36.20.56)

![image](https://github.com/songhaeunsong/markpark/assets/84169393/8475aef6-4bcf-40c3-8f40-4c586ea5ee0c)

<br />
<br />

- 사용자 주변에 있는 주차장의 **위치, 거리, 요금 정보**를 한번에 정리해주는 서비스의 필요성을 느껴 제작했습니다.
  
- 주차장 데이터는 공공데이터 포털에서 제공하는 전국주차장정보표준데이터를 사용했습니다.
  
<br />
<br />

## 기술 스택
[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1714990706779?alt=media&token=4d889ca7-393f-491f-9d5f-dc59339401c3)](https://github.com/msdio/stackticon)

<br />
<br />

## 주요 기능
### 1️⃣ 내주변 주차장
- 사용자의 위치로부터 반경 1500m 이내의 주차장 정보(위치, 요금정보, 거리)를 필터링하여 제공

### 2️⃣ 길찾기 기능
- 현재위치에서 주차장으로 가는 이동 정보 제공

<br />
<br />

## 개발

### 🗺️ 지도 및 마커 기능
Naver Maps API를 사용하여 사용자의 위치로부터 반경 1500m 이내의 주차장 정보를 필터링하여 지도에 표시하도록 구현했습니다.

<br />

### 🚗 네이버 길찾기 연동
네이버 길찾기 주차장 정보 하단의 길찾기 버튼 클릭시, 선택한 주차장까지의 이동 정보를 바로 확인할 수 있습니다.

- proj4를 사용해 현재 위치와 선택한 주차장의 좌표를 EPSG:3857 좌표계로 변환했습니다.
  
- EPSG:3857 좌표계 변환하여 네이버 길찾기 url 경로로 삽입했습니다.
  
  
<br />

### 📉 데이터 전송량 최소화
16932개의 데이터로 거리 계산을 하는 로직을 클라이언트 사이드에서 서버 사이드로 이전하여 브라우저 성능 저하 문제를 개선했습니다.

- 필요한 속성만을 선택하여 데이터를 가공하고 데이터베이스에 삽입함으로써 데이터의 크기를 줄였습니다.
  
- 현재 위치와 반경을 파라미터로 받아 사용자 위치 기준 반경 n미터 이내의 정보만 제공하는 API를 구현했습니다.
  
- 필요한 데이터만을 사용자에게 전달함으로써 데이터 전송량을 줄이고 전체 에플리케이션 응답속도를 높였습니다.
  
<br />
<br />

## 구현 화면

|메인 화면|주차장 위치|
|------|---|
|![image](https://github.com/songhaeunsong/markpark/assets/84169393/11be3d3d-7a52-4c5a-8341-bedaf70f52f7)|![image](https://github.com/songhaeunsong/markpark/assets/84169393/b69fa2bc-996a-4155-9e9f-9bcd143cd37d)|


|주차장 정보|길찾기|
|------|---|
|![image](https://github.com/songhaeunsong/markpark/assets/84169393/6b024fa2-737d-432d-ab6e-189efe666999)|![image](https://github.com/songhaeunsong/markpark/assets/84169393/264486ec-d255-4953-9a64-2f51d1950aa7)|
