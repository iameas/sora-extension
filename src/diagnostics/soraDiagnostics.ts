import * as vscode from 'vscode';

export function activateDiagnostics(context: vscode.ExtensionContext) {
  const collection = vscode.languages.createDiagnosticCollection('sora');
  context.subscriptions.push(collection);

  vscode.workspace.onDidOpenTextDocument(doc => updateDiagnostics(doc, collection));
  vscode.workspace.onDidChangeTextDocument(e => updateDiagnostics(e.document, collection));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
  if (document.languageId !== 'sora') return;

  const diagnostics: vscode.Diagnostic[] = [];

  const text = document.getText();
  const lines = text.split('\n');

  lines.forEach((line, i) => {
    if (/let\s+\w+\s+[^b]e\s+/.test(line)) {
      const match = /let\s+\w+\s+/.exec(line);
      if (match) {
        diagnostics.push(
          new vscode.Diagnostic(
            new vscode.Range(i, match.index, i, match.index + match[0].length),
            `Possible typo or missing 'be' keyword.`,
            vscode.DiagnosticSeverity.Warning
          )
        );
      }
    }
  });

  collection.set(document.uri, diagnostics);
}