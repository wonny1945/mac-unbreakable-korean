# Node 26 고정 (engines)

## Problem

PR #11 병합 커밋(2920dff)의 Vercel 빌드가 실패해 라이브 사이트에 GA 태그가 올라가지 않았다:
`Node.js Version "20.x" is discontinued and must be upgraded. Please set Node.js Version to 26.x`.
저장소에 Vercel 프로젝트가 2개(`mac-unbreakable-korean`, `mac-unbreakable-korean-6g37`) 연결돼 있고,
대시보드 설정 변경 + 재배포로는 라이브가 갱신되지 않았다.

## Behavior

- `package.json`에 `"engines": { "node": "26.x" }`를 추가한다. Vercel은 프로젝트 설정보다 `engines.node`를
  우선하므로 두 프로젝트 모두 저장소 한 곳에서 고정된다.
- 그 외 의존성·코드는 건드리지 않는다. 로컬 Node v26.13.0에서 `vite build` 성공, `vitest run` 4 passed 확인됨.

## Out of scope

- 어댑터 업그레이드. `adapter-auto` 3.2.2는 빌드 때 `adapter-vercel`을 내려받는데, 이것이 Node 26 런타임을
  거부하면 어댑터 업그레이드가 대안이다 — 그때 별도 작업으로 한다.
- 중복 Vercel 프로젝트 정리, `.nvmrc`, 다른 의존성 업그레이드.

## Done when

- [ ] `src/package-engines.test.ts`가 추가되고 `npx vitest run`이 통과한다 (`engines.node === '26.x'`).
- [ ] `npm run build`가 성공한다.
- [ ] main 병합 후 병합 커밋의 Vercel 배포 2개가 모두 success다 (GitHub commit status로 확인).
- [ ] 라이브 사이트(https://mac-unbreakable-korean.vercel.app) HTML에 `G-88PJZ9PR54`가 있고,
      로드 시 `g/collect`로 `en=page_view` 요청이 나간다 (Playwright로 확인).
