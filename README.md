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

## AdSense

- Publisher ID: `pub-4911271163170466`
- `public/ads.txt` — 서브도메인 루트에 배포됨
- `jwonlabs.com/ads.txt`에 `subdomain=spend-billionaire.jwonlabs.com` 추가 권장

## 면책

재미용 게임이며 자산·가격 수치는 추정치입니다. 투자·구매 조언이 아닙니다.
