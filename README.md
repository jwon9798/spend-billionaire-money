# 부자의 삶 체험하기

이재용·김범수 등 한국 부자부터 머스크·게이츠 같은 글로벌 부자까지, 진짜 자산을 한국 물가로 다 써보는 단일 페이지 게임.

- 벤치마크: neal.fun "Spend Bill Gates' Money" (해외 → 한국 로컬라이제이션)
- 타겟: 국내 사용자
- 기술: 순수 HTML/CSS/JS 단일 파일. 빌드/서버/의존성/AI 비용 **0원**.

## 실행

`index.html`을 브라우저로 열면 끝.

## 배포 (독립)

이 폴더만 Vercel에 올리면 됩니다.

```powershell
cd spend-billionaire-money
npx vercel login
npx vercel deploy --prod --yes
```

배포 후 `ads-config.js` · `ads.txt`에 AdSense ID 입력 → `vercel deploy --prod` 재실행.

자세한 내용: 상위 폴더 `DEPLOY.md`

## 수익화 (AdSense)

`ads-config.js`의 `ca-pub-XXXX`와 `ads.txt`의 `pub-XXXX`를 본인 게시자 ID로 교체 후 redeploy.
AdSense 대시보드에서 **이 사이트 URL만** 등록하세요.

## 주요 기능

- 부자 17명 + **'내 돈으로 도전'**(자기 자산 입력) 모드
- 100+ 아이템 · 9개 카테고리(특수·거대 포함) + 검색 · 실제 시장가
- **60초 챌린지** 모드 · 사용률·등급(짠돌이→전설의 큰손) · 캐싱 사운드
- 소비 영수증 PNG + 공유/복사 · 소셜프루프(플레이 수)
- **아이템별 실제 상품 링크**(🛒) — 클릭 시 쇼핑몰 검색으로 실제 가격 확인
- **검색창에 제품명 입력 → 직접 추가**: 결과가 없으면 "➕ 추가" + "네이버쇼핑에서 가격 보기" 링크 제공

## 추가 수익화 (제휴 링크)

- 각 아이템의 `🛒 실제 가격·구매`는 기본적으로 쿠팡 검색 링크입니다.
- **쿠팡 파트너스**를 쓰려면 `index.html`의 `COUPANG_PARTNER_TAG`에 트래킹 ID를 넣고, 딥링크 변환은 서버측(HMAC 서명)에서 처리해야 합니다. (정적 사이트만으로는 가격 자동 호출/딥링크 서명이 불가 — 필요 시 Vercel 서버리스 함수로 네이버 쇼핑 API 프록시를 붙일 수 있음)

## 데이터 출처 (2026)

- **부자 자산**: Forbes Korea「2026 대한민국 50대 부자」(2026.4.28, 3.27 장마감 환율 ≒1,478원/$) · Forbes「The World's Billionaires 2026」(2026.3.10, 3.1 환율 ≒1,380원/$)
- **가격**: 공식 출고가(삼성·애플·포르쉐·제네시스 등), 국토부 실거래(아파트), Forbes 팀 가치·시가총액, Reuters·Virgin Galactic 등 공개 자료
- 수정: `index.html`의 `PEOPLE`, `ITEMS` 배열

## 면책

재미용 게임이며 자산 수치는 추정치입니다.
