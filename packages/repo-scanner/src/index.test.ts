import { describe, expect, it } from 'vitest';
import { createDeferredScanner, type RepoScanRequest } from './index.js';

describe('repo scanner', () => {
  it('returns an explicit deferred report instead of pretending to verify fidelity', async () => {
    const request: RepoScanRequest = { root: '/tmp/example', designId: 'sample', routes: ['/'] };
    const result = await createDeferredScanner().scan(request);
    expect(result.status).toBe('deferred');
    expect(result.reason).toContain('visual implementation verification');
    expect(result.designId).toBe('sample');
  });
});
