#!/usr/bin/env node
// Validates every YAML file parses, and the example task envelope against
// its JSON Schema. Run with `npm test`.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    if (e === 'node_modules' || e.startsWith('.')) continue;
    const p = path.join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

for (const f of walk(root).filter((p) => p.endsWith('.yaml') || p.endsWith('.yml'))) {
  try {
    parse(readFileSync(f, 'utf8'));
    console.log(`ok    ${path.relative(root, f)}`);
  } catch (e) {
    failures += 1;
    console.error(`FAIL  ${path.relative(root, f)}: ${e.message}`);
  }
}

const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);
const schema = JSON.parse(readFileSync(path.join(root, 'schemas/task-envelope.schema.json'), 'utf8'));
const example = JSON.parse(readFileSync(path.join(root, 'schemas/task-envelope.example.json'), 'utf8'));
const validate = ajv.compile(schema);
if (validate(example)) {
  console.log('ok    schemas/task-envelope.example.json validates against schema');
} else {
  failures += 1;
  console.error('FAIL  schemas/task-envelope.example.json:', ajv.errorsText(validate.errors));
}

// Cross-check: every control id cited in the risk register and metrics
// exists in controls.yaml.
const ra = path.join(root, 'reference-architecture/governed-agentic-rag');
const controls = new Set(parse(readFileSync(path.join(ra, 'controls.yaml'), 'utf8')).controls.map((c) => c.id));
for (const [file, key] of [['risk-register.yaml', 'risks'], ['metrics.yaml', 'metrics']]) {
  const doc = parse(readFileSync(path.join(ra, file), 'utf8'));
  for (const item of doc[key]) {
    for (const id of item.controls ?? item.observes ?? []) {
      if (!controls.has(id)) {
        failures += 1;
        console.error(`FAIL  ${file}: unknown control ${id}`);
      }
    }
  }
}
console.log(failures ? `\n${failures} failure(s)` : '\nall checks passed');
process.exit(failures ? 1 : 0);
