# GA4 연결 (gtag) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 라이브 사이트에 GA4(`G-88PJZ9PR54`) 태그를 붙여 방문 데이터가 쌓이게 한다.

**Architecture:** `src/app.html`의 `<head>`에 공식 Google 태그 스니펫을 정적으로 넣는다. 테스트는 그 파일을 `node:fs`로 읽어 문자열을 검사한다.

**Tech Stack:** SvelteKit 2 + Svelte 4, vitest (`src/**/*.{test,spec}.{js,ts}`), Vercel 자동 배포.

**Spec:** `docs/specs/ga-gtag.md`

---

### Task 1: app.html에 Google 태그 추가

**Files:**
- Create: `src/app-html.test.ts`
- Modify: `src/app.html` (`%sveltekit.head%` 바로 앞)

- [ ] **Step 1: 실패하는 테스트 작성**

`src/app-html.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const GA_ID = 'G-88PJZ9PR54';
const html = readFileSync('src/app.html', 'utf8');

describe('app.html Google tag', () => {
  it('loads gtag.js exactly once, async, with the GA4 id', () => {
    const tags = html.match(/<script\b[^>]*googletagmanager\.com\/gtag\/js[^>]*>/g) ?? [];
    expect(tags).toHaveLength(1);
    expect(tags[0]).toContain(`id=${GA_ID}`);
    expect(tags[0]).toMatch(/\sasync\b/);
  });

  it('defines the dataLayer shim that pushes arguments', () => {
    expect(html).toMatch(/window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\]/);
    expect(html).toMatch(/function gtag\(\)\s*\{\s*dataLayer\.push\(arguments\);?\s*\}/);
  });

  it('configures the GA4 id', () => {
    expect(html).toMatch(
      new RegExp(`gtag\\(\\s*(['"])config\\1\\s*,\\s*(['"])${GA_ID}\\2\\s*\\)`)
    );
  });

  it('places the tag before %sveltekit.head%', () => {
    expect(html.indexOf('googletagmanager.com/gtag/js')).toBeLessThan(
      html.indexOf('%sveltekit.head%')
    );
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run` (`npm test`는 watch 모드라 쓰지 않는다)
Expected: FAIL — 4개 테스트 모두 실패. 첫 테스트는 `expected [] to have a length of 1`.

- [ ] **Step 3: 스니펫 추가**

`src/app.html`에서 `<meta property="og:type" content="website">` 줄과 `%sveltekit.head%` 줄 사이에 넣는다:

```html
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-88PJZ9PR54"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-88PJZ9PR54');
    </script>
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run`
Expected: PASS — 1 file, 4 tests.

Run: `npm run build`
Expected: 성공 (exit 0).

- [ ] **Step 5: 커밋**

```bash
git add src/app.html src/app-html.test.ts
git commit -m "chore: GA4 gtag 연결"
```

`.idea/`는 추가하지 않는다.

---

### 병합 후 확인 (코드 작업 아님)

- [ ] Vercel 프로덕션 재배포 완료 후 Playwright로 https://mac-unbreakable-korean.vercel.app 를 열고,
      네트워크 목록에 `google-analytics.com/g/collect` POST(`tid=G-88PJZ9PR54`, `en=page_view`)가 있는지 확인한다.
- [ ] 사용자가 GA 실시간 보고서에서 방문을 확인한다.
