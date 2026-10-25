import { build } from 'esbuild';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'node_modules/.cache/showcase-tests.mjs');
await fs.mkdir(path.dirname(output), {recursive:true});
await build({entryPoints:[path.join(root,'tests/showcase.test.jsx')],outfile:output,bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',logLevel:'warning'});
await import(pathToFileURL(output).href);
