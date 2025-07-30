import * as vscode from 'vscode';
import { registerSoraCompletions } from './completions/soraCompletions';
import { registerRunCommand } from './commands/runCommand';
import { registerNewFileCommand } from './commands/createFileCommand';

export function activate(context: vscode.ExtensionContext) {
  console.log('✅ Sora extension activated!');

  // Register Sora language completions
  const completionProvider = registerSoraCompletions();

  // Register commands
  const runApp = registerRunCommand();
  const newFile = registerNewFileCommand();

  // Push all to subscriptions
  context.subscriptions.push(completionProvider, runApp, newFile);
}

export function deactivate() {
  console.log('❌ Sora extension deactivated.');
}