import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('../src/parsers/subscription/httpSubscriptionFetcher.js', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    fetchSubscriptionWithFormat: vi.fn()
  };
});

import { fetchSubscriptionWithFormat } from '../src/parsers/subscription/httpSubscriptionFetcher.js';
import { ClashConfigBuilder } from '../src/builders/ClashConfigBuilder.js';

describe('Clash subscription warnings', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should include a warning without leaking subscription query params', async () => {
    fetchSubscriptionWithFormat.mockResolvedValue({
      content: 'ZXJyb3IgY29kZTogMTA0Mg==',
      format: 'unknown',
      url: 'https://feitu-sub.theigrams.workers.dev/original?key=supersecret',
      errorMessage: 'error code: 1042'
    });

    const builder = new ClashConfigBuilder(
      'https://feitu-sub.theigrams.workers.dev/original?key=supersecret',
      [],
      [],
      null,
      'zh-CN',
      'test-agent'
    );
    const yamlText = await builder.build();

    expect(yamlText).toContain('# sublink-worker warnings:');
    expect(yamlText).toContain('https://feitu-sub.theigrams.workers.dev/original');
    expect(yamlText).not.toContain('key=');
    expect(yamlText).toContain('error code: 1042');
  });
});

