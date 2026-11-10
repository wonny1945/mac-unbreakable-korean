import { describe, expect, it } from 'vitest';
import html from './app.html?raw';

const GA_ID = 'G-88PJZ9PR54';

describe('app.html Google tag', () => {
  it('loads gtag.js exactly once, async, with the GA4 id', () => {
    const tags = html.match(/<script\b[^>]*googletagmanager\.com\/gtag\/js[^>]*>/g) ?? [];
    expect(tags).toHaveLength(1);
    expect(tags[0]).toContain(`id=${GA_ID}`);
    expect(tags[0]).toMatch(/\sasync\b/);
  });

  it('defines the dataLayer shim and sends the js timestamp', () => {
    expect(html).toMatch(/window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\]/);
    expect(html).toMatch(/function gtag\(\)\s*\{\s*dataLayer\.push\(arguments\);?\s*\}/);
    expect(html).toMatch(/gtag\(\s*(['"])js\1\s*,\s*new Date\(\)\s*\)/);
  });

  it('configures the GA4 id', () => {
    expect(html).toMatch(
      new RegExp(`gtag\\(\\s*(['"])config\\1\\s*,\\s*(['"])${GA_ID}\\2\\s*\\)`)
    );
  });

  it('places the tag before %sveltekit.head%', () => {
    const idx = html.indexOf('googletagmanager.com/gtag/js');
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(html.indexOf('%sveltekit.head%'));
  });
});
