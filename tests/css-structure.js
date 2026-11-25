// Guards the core structure of the CSS files:
//  - line budget (keep the files small)
//  - every feature block is introduced by a comment and can be deleted on its own
//  - the blocks and their order stay as listed in css-structure.json
// After an intentional change:  node tests/css-structure.js --update
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'css-tree';

const root = new URL('..', import.meta.url);
const expectedFile = new URL('css-structure.json', import.meta.url);
const expected = JSON.parse(readFileSync(expectedFile));
const update = process.argv.includes('--update');
const errors = [];

// a block starts at a comment in column 0 which follows an empty line
function blocks(css) {
  const lines = css.split('\n');
  const result = [{ name: '(head)', body: [] }];
  let inComment = false;
  lines.forEach((line, i) => {
    if (!inComment && line.startsWith('/*') && (i === 0 || lines[i - 1].trim() === '')) {
      const name = line.replace(/^\/\*+|\*\/.*$/g, '').replace(/[–-]{3,}.*$/, '').trim();
      if (i > 0) result.push({ name, body: [] });
    }
    if (line.includes('/*')) inComment = true;
    if (line.includes('*/')) inComment = false;
    result.at(-1).body.push(line);
  });
  return result;
}

for (const [file, spec] of Object.entries(expected)) {
  const css = readFileSync(new URL(file, root), 'utf8');
  const lineCount = css.trimEnd().split('\n').length;
  if (lineCount > spec.maxLines) errors.push(`${file}: ${lineCount} lines, budget is ${spec.maxLines}`);

  const found = blocks(css);
  // each block must be complete CSS by itself, otherwise deleting it breaks its neighbours
  for (const { name, body } of found) {
    const text = body.join('\n');
    const code = text.replace(/\/\*[\s\S]*?\*\/|"[^"\n]*"|'[^'\n]*'/g, '');
    if (code.split('{').length !== code.split('}').length || text.split('/*').length !== text.split('*/').length)
      errors.push(`${file}: block "${name}" is not self-contained (unbalanced braces or comments)`);
    else parse(text, { onParseError: (e) => errors.push(`${file}: block "${name}": ${e.message}`) });
  }

  // numbered table of contents must match the section headers
  const toc = [...css.split('*/')[0].matchAll(/^\s*(\d)\. /gm)].map((m) => m[1]);
  const sections = [...css.matchAll(/^\/\* (\d)\. /gm)].map((m) => m[1]);
  if (toc.join() !== sections.join()) errors.push(`${file}: table of contents [${toc}] != sections [${sections}]`);

  const names = found.map((b) => b.name);
  if (update) spec.blocks = names;
  else if (JSON.stringify(names) !== JSON.stringify(spec.blocks))
    errors.push(`${file}: block list changed\n    expected: ${spec.blocks.join(' | ')}\n    found:    ${names.join(' | ')}`);
}

if (update) writeFileSync(expectedFile, JSON.stringify(expected, null, 2) + '\n');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`CSS structure OK (${Object.keys(expected).join(', ')})`);
