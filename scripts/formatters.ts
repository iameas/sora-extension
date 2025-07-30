import * as fs from 'fs';
import * as path from 'path';

const INDENT = '    ';

function formatSoraCode(code: string): string {
  const lines = code.split('\n');
  let formatted: string[] = [];
  let indentLevel = 0;

  for (let raw of lines) {
    let line = raw.trim();

    if (line === '') {
      formatted.push('');
      continue;
    }

    // Dedent if closing a block
    if (line.startsWith('else') || line.startsWith('elseif')) {
      indentLevel = Math.max(indentLevel - 1, 0);
    }

    // Format and indent line
    formatted.push(INDENT.repeat(indentLevel) + line);

    // Add indent if current line opens a block
    if (line.endsWith(':')) {
      indentLevel++;
    }
  }

  return formatted.join('\n');
}

// Run the formatter
function main() {
  const filePath = process.argv[2];

  if (!filePath || !filePath.endsWith('.sora')) {
    console.error('Usage: node formatter.js <file.sora>');
    return;
  }

  const input = fs.readFileSync(filePath, 'utf-8');
  const formatted = formatSoraCode(input);

  fs.writeFileSync(filePath, formatted, 'utf-8');
  console.log(`✅ ${path.basename(filePath)} formatted.`);
}

main();