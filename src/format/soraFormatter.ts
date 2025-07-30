import * as vscode from 'vscode';

const INDENT = '    ';

export function registerSoraFormatter(): vscode.Disposable {
  return vscode.languages.registerDocumentFormattingEditProvider('sora', {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const edits: vscode.TextEdit[] = [];
      const lines = document.getText().split('\n');
      let indentLevel = 0;

      for (let i = 0; i < lines.length; i++) {
        let raw = lines[i];
        let trimmed = raw.trim();

        if (trimmed === '') continue;

        // Dedent else/elseif
        if (trimmed.startsWith('else') || trimmed.startsWith('elseif')) {
          indentLevel = Math.max(indentLevel - 1, 0);
        }

        // Calculate new indent
        const indent = INDENT.repeat(indentLevel);
        const newLine = indent + trimmed;

        // Only add edit if it differs
        if (newLine !== raw) {
          const range = new vscode.Range(i, 0, i, raw.length);
          edits.push(vscode.TextEdit.replace(range, newLine));
        }

        // Increase indent if line ends with colon
        if (trimmed.endsWith(':')) {
          indentLevel++;
        }
      }

      return edits;
    }
  });
}