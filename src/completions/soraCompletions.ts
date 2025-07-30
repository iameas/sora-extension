import * as vscode from 'vscode';

export function registerSoraCompletions(): vscode.Disposable {
  const soraWords = [
    'let', 'be', 'make', 'if', 'else', 'elseif', 'is', 'not', 'and', 'or', 'as',
    'show', 'print', 'print -r', 'modal', 'input', 'none'
  ];

  const components = [
    'Container', 'Text', 'Button', 'Image', 'Scroll', 'Input',
    'Stack', 'List', 'Modal', 'ToastAlert', 'Navigator', 'Alert',
    'Animate', 'Style'
  ];

  const allSuggestions = [...soraWords, ...components].map(word => {
    return new vscode.CompletionItem(word, vscode.CompletionItemKind.Keyword);
  });

  return vscode.languages.registerCompletionItemProvider('sora', {
    provideCompletionItems() {
      return allSuggestions;
    }
  });
}