import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repository=path.dirname(source);
const distribution=path.join(source,'dist');
const hosted=path.join(repository,'static-hosting');
const portable=path.join(repository,'ready-to-open');
await fs.access(path.join(distribution,'index.html'));
// These paths are fixed generated-output siblings of this source package.
await fs.rm(hosted,{recursive:true,force:true});
await fs.cp(distribution,hosted,{recursive:true});
await fs.writeFile(path.join(hosted,'.nojekyll'),'');
await fs.cp(path.join(source,'public'),portable,{recursive:true});
await build({
  absWorkingDir:source,entryPoints:['src/main.jsx'],outfile:path.join(portable,'app.js'),
  bundle:true,format:'iife',minify:true,jsx:'automatic',
  define:{'process.env.NODE_ENV':'"production"'},
  loader:{'.woff':'file','.woff2':'file'},assetNames:'assets/[name]-[hash]',legalComments:'external',logLevel:'warning',
});
for(const [name,file] of [['Production HTML',path.join(hosted,'index.html')],['Portable JavaScript',path.join(portable,'app.js')],['Portable stylesheet',path.join(portable,'app.css')]]){
  console.log(name+': '+(await fs.stat(file)).size+' bytes');
}
console.log('Packaged static-hosting and ready-to-open from the same React source.');
