import { chmod } from 'node:fs/promises';
await chmod(new URL('../dist/server.js', import.meta.url), 0o755);
