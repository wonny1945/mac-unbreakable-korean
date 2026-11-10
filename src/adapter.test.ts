import { describe, expect, it } from 'vitest';
import pkg from '../package.json';
import svelteConfig from '../svelte.config.js?raw';

describe('Vercel adapter', () => {
  it('svelte.config.js imports adapter-vercel with an explicit nodejs24.x runtime', () => {
    expect(svelteConfig).toMatch(/import adapter from '@sveltejs\/adapter-vercel'/);
    expect(svelteConfig).not.toContain('adapter-auto');
    expect(svelteConfig).toContain("runtime: 'nodejs24.x'");
  });

  it('package.json pins adapter-vercel to exactly 6.3.0 and drops adapter-auto', () => {
    const deps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(deps['@sveltejs/adapter-auto']).toBeUndefined();
    expect(pkg.devDependencies).toHaveProperty('@sveltejs/adapter-vercel');
    expect(deps['@sveltejs/adapter-vercel']).toBe('6.3.0');
  });
});
