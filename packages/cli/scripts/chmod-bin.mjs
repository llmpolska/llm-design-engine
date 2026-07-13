import { chmod } from 'node:fs/promises';
await chmod(new URL('../dist/bin.js', import.meta.url), 0o755);
