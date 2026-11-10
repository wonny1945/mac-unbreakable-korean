# GA4 연결 (gtag)

## Problem

라이브 사이트(https://mac-unbreakable-korean.vercel.app)에 분석 도구가 전혀 없어 방문 데이터가 0이다.
Svelte 5 + Cloudflare 전면 재구축이 다음 작업이지만, 그 전까지 데이터가 쌓이도록 임시로 GA4를 붙인다.

## Behavior

- `src/app.html`의 `<head>` 안, `%sveltekit.head%` 앞에 공식 Google 태그 스니펫을 넣는다.
  - `gtag.js` 로더 `<script async>` 1개 (측정 ID `G-88PJZ9PR54`)
  - 인라인 스크립트: `dataLayer` 초기화, `gtag()` 정의, `gtag('js', new Date())`, `gtag('config', 'G-88PJZ9PR54')`
- 측정 ID는 하드코딩한다. 공개 값이고, 재구축 때 다시 붙일 것이라 환경 변수를 두지 않는다.
- 라우트가 `src/routes/+page.svelte` 하나뿐이라 기본 `page_view` 한 번이면 충분하다. SPA 이동 추적은 없다.
- 기존 Kakao AdFit 등 다른 동작은 건드리지 않는다.

## Out of scope

- 개인정보처리방침 페이지 추가 — 현재 `src`에 없다. 재구축 때 만든다.
- 커스텀 이벤트(변환 클릭 등), 동의 배너/Consent Mode — 재구축 때.
- 환경 변수화, GTM 컨테이너.

참고: 이 저장소에는 git 훅(`core.hooksPath` 미설정)도 CI도 없다. 테스트는 수동 실행(`npx vitest run`)이 유일한 관문이다.

## Done when

- [ ] `src/app-html.test.ts`가 추가되고 `npx vitest run`이 통과한다 (현재는 테스트 파일이 없어 exit 1).
  - `gtag.js` 스크립트 태그가 정확히 1개이고 `id=G-88PJZ9PR54`, `async`를 가진다
  - `gtag('config', 'G-88PJZ9PR54')` 호출이 있다 (따옴표 종류 무관)
  - `dataLayer` 심이 `arguments`를 push 한다
- [ ] `npm run build`가 성공한다.
- [ ] main 병합 후 Vercel 프로덕션이 재배포되고, 라이브 사이트 로드 시
      `google-analytics.com/g/collect`로 `tid=G-88PJZ9PR54`, `en=page_view`를 담은 POST가 나간다
      (Playwright 네트워크 목록으로 확인).
- [ ] 사용자가 GA 실시간 보고서에서 방문을 확인한다.
