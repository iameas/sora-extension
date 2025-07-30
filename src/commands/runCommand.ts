

import * as vscode from 'vscode';

export function registerRunCommand(): vscode.Disposable {
  return vscode.commands.registerCommand('sora.runApp', () => {
    const terminal = vscode.window.createTerminal('Sora App');
    terminal.show(true);
    terminal.sendText('sora-cli run App.sora');
  });
}