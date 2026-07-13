export interface RepoScanRequest {
  root: string;
  designId: string;
  routes: string[];
}

export interface RepoScanResult {
  status: 'deferred' | 'ready';
  designId: string;
  reason: string;
  checkedRoutes: string[];
  extensionPoint: 'visual-implementation-verifier';
}

export interface RepoScanner {
  scan(request: RepoScanRequest): Promise<RepoScanResult>;
}

export function createDeferredScanner(): RepoScanner {
  return {
    async scan(request: RepoScanRequest): Promise<RepoScanResult> {
      return {
        status: 'deferred',
        designId: request.designId,
        reason:
          'Full visual implementation verification is an extension point; the MVP does not claim to judge arbitrary frontend fidelity.',
        checkedRoutes: request.routes,
        extensionPoint: 'visual-implementation-verifier',
      };
    },
  };
}
