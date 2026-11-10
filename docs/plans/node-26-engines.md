# Vercel 빌드 복구 (adapter-vercel 6 + engines) Implementation Plan

**Goal:** Vercel 빌드가 Node 26 + adapter-vercel 6으로 돌게 해 라이브 사이트를 다시 배포되게 한다.

**Spec:** `docs/specs/node-26-engines.md`

공통: 테스트는 `npx vitest run`으로 돌린다 (`npm test`는 watch 모드). 파일은 Vite import(`?raw`, JSON)로 읽는다 —
`@types/node`가 없어 `node:fs`는 쓰지 않는다. `.idea/`는 커밋하지 않는다.

---

### Task 1: adapter-auto → adapter-vercel 6

**Files:**
- Create: `src/adapter.test.ts`
- Modify: `svelte.config.js`, `package.json`, `package-lock.json`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/adapter.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import pkg from '../package.json';
import svelteConfig from '../svelte.config.js?raw';

describe('Vercel adapter', () => {
  it('svelte.config.js imports adapter-vercel, not adapter-auto', () => {
    expect(svelteConfig).toMatch(/import adapter from '@sveltejs\/adapter-vercel'/);
    expect(svelteConfig).not.toContain('adapter-auto');
  });

  it('package.json depends on adapter-vercel 6 only', () => {
    const deps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(deps['@sveltejs/adapter-auto']).toBeUndefined();
    expect(pkg.devDependencies).toHaveProperty('@sveltejs/adapter-vercel');
    expect(deps['@sveltejs/adapter-vercel']).toMatch(/^\^6\./);
  });
});
```

- [ ] **Step 2: 실패 확인** — `npx vitest run`: 새 2개 모두 FAIL, 기존 4개 PASS.

- [ ] **Step 3: 교체**

```bash
npm uninstall @sveltejs/adapter-auto
npm install -D @sveltejs/adapter-vercel@^6
```

`svelte.config.js`의 `kit` 블록을 아래로 바꾸고(adapter-auto 주석 3줄 삭제), 첫 줄 import를 고친다:

```js
import adapter from '@sveltejs/adapter-vercel';
```

```js
	kit: {
		adapter: adapter()
	}
```

- [ ] **Step 4: 통과 확인**

- `npx vitest run` → PASS, 2 files / 6 tests.
- `rm -rf .vercel && npm run build` (Node 22) → exit 0, `.vercel/output/config.json` 존재.
- `rm -rf .vercel && npx -y -p node@26 -c "node -v && npm run build"` → `v26.` 출력, exit 0, `.vercel/output/config.json` 존재.
- `npm run check` → main 기준선(23 errors / 4 files)에서 늘지 않는다.
- `git status --short`에 `.vercel`이 보이지 않는다.

- [ ] **Step 5: 커밋**

```bash
git add svelte.config.js package.json package-lock.json src/adapter.test.ts
git commit -m "chore: adapter-auto를 adapter-vercel 6으로 교체"
```

---

### Task 2: engines 추가

**Files:**
- Create: `src/package-engines.test.ts`
- Modify: `package.json`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/package-engines.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import pkg from '../package.json';

describe('package.json engines', () => {
  it('requires Node >=22', () => {
    expect((pkg as { engines?: { node?: string } }).engines?.node).toBe('>=22');
  });
});
```

- [ ] **Step 2: 실패 확인** — `npx vitest run`: `expected undefined to be '>=22'`, 나머지 6개 PASS.

- [ ] **Step 3: engines 추가** — `package.json`의 `"private": true,` 다음 줄:

```json
  "engines": {
    "node": ">=22"
  },
```

- [ ] **Step 4: 통과 확인**

- `npx vitest run` → PASS, 3 files / 7 tests.
- `npm install` (Node 22, `engine-strict=true`) → exit 0, `EBADENGINE` 없음.
- `npm run build` → exit 0.

- [ ] **Step 5: 커밋**

```bash
git add package.json package-lock.json src/package-engines.test.ts
git commit -m "chore: engines.node >=22"
```

---

### PR 전 · 병합 후 확인 (코드 작업 아님)

- [ ] PR 전: 새 의존성(`@sveltejs/adapter-vercel`과 그 전이 의존성)에 대해 security-review를 돌린다.
- [ ] 병합 커밋의 Vercel 배포 2개(`mac-unbreakable-korean`, `mac-unbreakable-korean-6g37`)가 모두 success인지
      `gh api repos/{owner}/{repo}/commits/<sha>/status`로 확인한다. 빌드 로그의 Node 버전이 26.x인지도 본다.
- [ ] Playwright로 https://mac-unbreakable-korean.vercel.app 를 열어 HTML에 `G-88PJZ9PR54`가 있고
      `g/collect` 요청(`en=page_view`)이 나가는지 확인한다.
