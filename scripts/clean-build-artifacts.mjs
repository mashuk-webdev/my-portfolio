import { rmSync } from 'node:fs';

const targets = ['.next', 'tsconfig.tsbuildinfo'];

for (const target of targets) {
  rmSync(target, { recursive: true, force: true });
}

console.log('Cleaned build artifacts:', targets.join(', '));
