import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchSubscription, fetchSubscriptionWithFormat } from '../src/parsers/subscription/httpSubscriptionFetcher.js';

describe('httpSubscriptionFetcher decodeContent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should not base64-decode plain Clash YAML', async () => {
    const mockClashYaml = `
proxies:
  - name: HK-Node
    type: ss
    server: hk.example.com
    port: 443
    cipher: aes-128-gcm
    password: test123
`;

    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => mockClashYaml
    })));

    const res = await fetchSubscriptionWithFormat('https://example.com/sub', 'ua');
    expect(res).toBeTruthy();
    expect(res.format).toBe('clash');
    expect(res.content).toContain('proxies:');
    expect(res.content).toContain('HK-Node');
  });

  it('should base64-decode URI list subscriptions', async () => {
    const payload = 'vmess://abc\nvless://def';
    const b64 = Buffer.from(payload, 'utf8').toString('base64');

    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => b64
    })));

    const res = await fetchSubscriptionWithFormat('https://example.com/sub', 'ua');
    expect(res).toBeTruthy();
    expect(res.format).toBe('unknown');
    expect(res.content).toContain('vmess://abc');
    expect(res.content).toContain('vless://def');

    const parsed = await fetchSubscription('https://example.com/sub', 'ua');
    expect(Array.isArray(parsed)).toBeTruthy();
    expect(parsed).toContain('vmess://abc');
    expect(parsed).toContain('vless://def');
  });

  it('should base64-decode urlsafe base64 without padding', async () => {
    const payload = 'vmess://one\nvless://two';
    const b64 = Buffer.from(payload, 'utf8').toString('base64');
    const b64url = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => b64url
    })));

    const res = await fetchSubscriptionWithFormat('https://example.com/sub', 'ua');
    expect(res).toBeTruthy();
    expect(res.content).toContain('vmess://one');
    expect(res.content).toContain('vless://two');
  });
});

