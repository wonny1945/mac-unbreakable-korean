# Vercel 빌드 복구 (adapter-vercel 6 + engines)

## Problem

PR #11 병합 커밋(2920dff)의 Vercel 빌드가 실패해 라이브 사이트에 GA 태그가 올라가지 않았다:
`Node.js Version "20.x" is discontinued and must be upgraded. Please set Node.js Version to 26.x`.
저장소에 Vercel 프로젝트가 2개(`mac-unbreakable-korean`, `mac-unbreakable-korean-6g37`) 연결돼 있고,
대시보드 설정 변경 + 재배포로는 라이브가 갱신되지 않았다.

Node 버전만 올려서는 안 된다. `adapter-auto` 3.2.2는 `@sveltejs/adapter-vercel` v4를 고정해 내려받는데
(`node_modules/@sveltejs/adapter-auto/adapters.js`), v4의 `get_default_runtime`은 Node 18/20이 아니면 throw 한다.

## Behavior

- `@sveltejs/adapter-auto`를 제거하고 `@sveltejs/adapter-vercel@^6`을 devDependency로 넣는다
  (6.3.5 확인: peer `@sveltejs/kit ^2.4.0`, Node 20/22/24/26 허용). `svelte.config.js`가 이를 import 한다.
- `package.json`에 `"engines": { "node": ">=22" }`를 추가한다. Vercel은 프로젝트 설정보다 `engines.node`를
  우선하고 범위를 만족하는 최신 메이저(26)를 고른다 — 두 프로젝트가 저장소 한 곳에서 고정된다.
  `26.x`로 못 박지 않는 이유: `.npmrc`가 `engine-strict=true`이고 로컬은 Node 22라 설치가 막힌다.
- 새 의존성이 들어오므로 PR 전에 security-review를 돌린다.

## Out of scope

- 중복 Vercel 프로젝트 정리, `.nvmrc`, kit·svelte 등 다른 의존성 업그레이드.

## Done when

- [ ] `npx vitest run`이 통과한다. 새 테스트가 확인하는 것:
  - `svelte.config.js`가 `@sveltejs/adapter-vercel`을 import 하고 `adapter-auto` 문자열이 없다
  - `package.json`에 `@sveltejs/adapter-auto`가 없고 `@sveltejs/adapter-vercel`이 devDependency다
  - `engines.node === '>=22'`
- [ ] `npm run build`가 Node 22(로컬)와 Node 26(`npx -p node@26`) 둘 다에서 성공하고 `.vercel/output`이 생긴다.
      `.vercel`은 이미 `.gitignore`에 있다 — 커밋에 섞이지 않는다.
- [ ] `npm run check` 오류가 main 기준선(23 errors / 4 files)에서 늘지 않는다.
- [ ] security-review에서 새 의존성에 대한 지적이 없다.
- [ ] main 병합 후 병합 커밋의 Vercel 배포 2개가 모두 success다 (GitHub commit status로 확인).
- [ ] 라이브 사이트(https://mac-unbreakable-korean.vercel.app) HTML에 `G-88PJZ9PR54`가 있고,
      로드 시 `g/collect`로 `en=page_view` 요청이 나간다 (Playwright로 확인).

## 결정 (2026-11-10)

`engines.node`는 넣지 않는다. 범위(`>=`) 해석이 문서화돼 있지 않고 package.json 덮어쓰기는 legacy build image를 쓴다. Node 버전은 Vercel Project Settings(26.x, 두 프로젝트 모두)로 관리한다. engines 관련 Behavior·Done when 항목은 이 결정으로 대체한다.
