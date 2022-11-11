# commerce_platform
## 프로젝트 개요

**commerce platform의 일부분을 벤치마킹 하여 구현한 프로젝트 입니다.**

> 유저의 회원가입 / 로그인, 판매자의 입점신청 / 상품등록 / 수정 / 삭제 기능 <br>
> 상품리스트조회 / 상품상세조회 기능을 구현하였습니다. <br>

## 기술 스택
- Framework: express
- Language: typescript
- ODM : mongoose
- DB : mongodb

## 요구사항 분석 및 구현 사항 정리
### 기술 관련
- winston, morgan module을 사용하여 logging 처리
- express-validator module 사용하여 validation 처리

### 회원가입
- 이메일
- 비밀번호 (영문/숫자/특수문자 조합 8~20자, bcrypt 암호화 하여 저장)
- 이름(16자 이내)
- 국가 번호(숫자만  ex 82)
- 핸드폰 번호

### 로그인
- 이메일, 비밀번호 사용
- jwt token 발행

### 판매자 입점 신청
- 셀러명 (최대 10자)
- 은행
- 수익금 정산계좌(한국 계좌)
- 예금주명

### 판매자 상품 수정, 삭제
- param id로 조회
- 수정의 경우 전체 항목을 하나의 페이지에서 처리하기 때문에 put Method 사용
- 판매자인지 권한 확인

### 상품 등록
- 상품명(최대 80자 미만) 
- 카테고리(옵션 중 선택) 
- 세부 카테고리(옵션 중 선택) 
- 옵션 설정(단일 옵션 or 그룹 옵션) 
    - 단일 옵션 (복수 설정 가능) 
        - 옵션명(최대 20자 미만) 
        - 수량 
    - 그룹 옵션 (복수 설정 가능) 
        - 그룹옵션 제목(최대 10자까지) 
        - 옵션 명(최대 20자까지) 
        - 판매 수량(최대 100개) 
- 요약 상품 설명(최대 1000자) 
- 구매일(사용자 선택) 
- 배송 정보
    - 구매지역(국가/도시 설정 가능 or 지역 상관없음 체크 가능)
    - 주문 마감일(2022-11-17 형식)
    - 배송 수단(한국 내 배송/해외배송/직거래)
    - 배송비 
    - 합배송 설정(true,false)
    - 발송예정일 
    
### 상품 상세 조회
- param id로 조회


### 마켓 상품 리스트 조회
query string 방식 
- 상품명 검색 &search=미국
- 카테고리/국가별 필터링 &category=[{maincategory:신발, subcategory:운동화}]&nation=['us'] 
- 최신순/주문 마감일 순 정렬 &sort=recent or deadline


## 구현 예정
- 썸네일(최대 8장) → 구현 예정
- 상세설명(사용자 선택) → 구현 예정
    - 동영상 or 사진 → detail 설명 설정 가능
## DB Modeling
총 3개의 collection을 가지고 진행
- 유저
- 마켓
- 상품
## API 문서
자세한 내용은 아래 링크 참조<br>
[POSTMAN DOCS](https://documenter.getpostman.com/view/11539438/2s8YemvaPn).
|기능구분| 기능  | Method | URL |  auth | 비고 |
|-------------| ------------- | ------------- |:-------------|:---:|---| 
| User | 회원가입 | POST | /api/users/signup  |    |   
|  | 로그인 | POST | /api/users/login  | |
| Market | 입점신청 | POST  |/api/markets|ㅇ|
|  |  상품등록  | POST |/api/markets/products |ㅇ|
|  |  상품수정  | PUT |/api/markets/products/:id |ㅇ|
|  |  상품삭제  | PUT |/api/markets/products/:id |ㅇ|
|  |  상품상세조회  | GET |/api/markets/products/:id | |
|  |  상품목록조회  | GET |api/markets/products| | ?search=미국 <br>&category=[{"mainCategory":"가방"},{"mainCategory":"신발", "subCategory":"운동화"}]<br>&nation=["korea", "us"]<br> &sort=deadline |


## 구현 과정 
### 프로젝트 초기 세팅 순서
1. npm init
2. express 설치
3. 프로젝트에 필요한 기본적인 모듈 추가
4. env 파일 생성 및 .gitignore 생성
5. eslint, prettierrc 설정
6. app.js 작성
7. 데이터베이스 세팅 

### 데이터베이스 모델 작성
작성 예정
### 기능 구현
작성 예정
### 테스트 코드
리팩토링 후 다시 작성중입니다.


## 프로젝트 구조
작성 예정

## 설치 및 실행 방법
nodejs와 npm이 install 되어있지 않다면 먼저 install 과정 진행
<details>
    <summary> 프로젝트 설치 밀 실행 과정</summary>

<b>1. 프로젝트 clone 및 디렉토리 이동</b>
```bash
git clone https://github.com/commerce_platform.git
cd commerce_platform
```
<b>2. .env 파일 생성</b>
```bash
PORT=
DB_URL=mongodb://localhost:27017/{database Name}
JWT_SECRETKEY=jwtsecretkey
JWT_EXPIRE=30m
```
<b>3. node package 설치</b>
```javascript
npm install
```
<b>4. 서버 실행</b>
```javascript
npm start
```
</details>

<details>
    <summary>Test 실행 방법</summary>
    
<b>unit test 실행</b>
```javascript
npm run test
```
</details>



