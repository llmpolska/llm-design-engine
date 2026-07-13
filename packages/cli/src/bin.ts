#!/usr/bin/env node
import { createProgram, runCommand } from './index.js';

const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h') || argv.length === 0) {
  await createProgram({ cwd: process.cwd(), output: [] }).parseAsync(process.argv);
} else {
  const output: string[] = [];
  await runCommand(argv, { cwd: process.cwd(), output });
  for (const line of output) console.log(line);
}
