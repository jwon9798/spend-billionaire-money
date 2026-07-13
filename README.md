# 부자의 삶 체험하기

이재용·김범수 등 한국 부자부터 머스크·게이츠 같은 글로벌 부자까지, Forbes 2026 실제 자산을 한국 물가로 써 보는 정적 웹 게임.

- **URL**: https://spend-billionaire.jwonlabs.com
- **운영**: [JWON Labs](https://jwonlabs.com)
- **기술**: 순수 HTML/CSS/JS · Cloudflare Workers Static Assets · GitHub Actions 자동 배포

## 로컬 개발

```bash
npm install
npm run dev          # wrangler dev (http://localhost:8787)
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 Cloudflare Workers에 자동 배포합니다.

필요한 GitHub Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

수동 배포:

```bash
npm run deploy
```

## 프로젝트 구조

```
public/           # 정적 사이트 (배포 대상)
wrangler.jsonc    # Worker + custom_domain 설정
generate-images.py # icon.png / og-cover.png 재생성
```

## AdSense (승인 전)

현재 **AdSense 코드·광고 placeholder·ads.txt는 서브도메인에서 비활성** 상태입니다. 승인은 `jwonlabs.com`에서 진행하세요.

승인 후 복원:
1. `public/ads.txt` 복원
2. `site-config.js` → `adsenseEnabled: true`
3. `index.html`에 `ads-config.js`, `ads-init.js` 및 광고 슬롯 추가

## 제휴 링크

`COUPANG_PARTNER_TAG`가 비어 있으면 **네이버쇼핑 일반 검색**만 사용합니다 (제휴 수수료 없음).

## 면책

재미용 게임이며 자산·가격 수치는 추정치입니다. 투자·구매 조언이 아닙니다.
