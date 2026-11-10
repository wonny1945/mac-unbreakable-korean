# Node 26 고정 (engines) Implementation Plan

**Goal:** Vercel 빌드가 Node 26으로 돌게 해 라이브 사이트를 다시 배포되게 한다.

**Spec:** `docs/specs/node-26-engines.md`

---

### Task 1: package.json에 engines 추가

**Files:**
- Create: `src/package-engines.test.ts`
- Modify: `package.json`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/package-engines.test.ts` — Vite JSON import를 쓴다 (`@types/node`가 없어 `node:fs`는 쓰지 않는다):

```ts
import { describe, expect, it } from 'vitest';
import pkg from '../package.json';

describe('package.json engines', () => {
  it('pins Node to 26.x', () => {
    expect((pkg as { engines?: { node?: string } }).engines?.node).toBe('26.x');
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run` (`npm test`는 watch 모드라 쓰지 않는다)
Expected: FAIL — `pins Node to 26.x`가 `expected undefined to be '26.x'`로 실패. 기존 4개는 통과.

- [ ] **Step 3: engines 추가**

`package.json`에서 `"private": true,` 다음 줄에 넣는다:

```json
  "engines": {
    "node": "26.x"
  },
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run`
Expected: PASS — 2 files, 5 tests.

Run: `npm run build`
Expected: 성공 (exit 0).

- [ ] **Step 5: 커밋**

```bash
git add package.json src/package-engines.test.ts
git commit -m "chore: Node 26 고정 (engines)"
```

`.idea/`는 추가하지 않는다.

---

### 병합 후 확인 (코드 작업 아님)

- [ ] 병합 커밋의 Vercel 배포 2개(`mac-unbreakable-korean`, `mac-unbreakable-korean-6g37`)가 모두 success인지
      `gh api repos/{owner}/{repo}/commits/<sha>/status`로 확인한다.
      실패 로그가 `adapter-vercel`의 Node 26 런타임 거부라면 어댑터 업그레이드를 별도 작업으로 연다.
- [ ] Playwright로 https://mac-unbreakable-korean.vercel.app 를 열어 HTML에 `G-88PJZ9PR54`가 있고
      `g/collect` 요청(`en=page_view`)이 나가는지 확인한다.
