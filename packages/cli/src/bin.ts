#!/usr/bin/env node
import { createProgram } from './index.js';

const output: string[] = [];
const program = createProgram({ cwd: process.cwd(), output });
await program.parseAsync(process.argv);
