import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Sora is now active!');

  // Keywords & Components for Autocomplete
  const soraWords = [
    'let', 'const', 'stay', 'error', 'make', 'be', 'if', 'else', 'elseif', 'for', 'while',
    'can', 'show', 'print -r', 'math', 'equation', 'is', 'not', 'and', 'or',
    'import', 'export', 'function', '---break', 'what'
  ];

  const components = [
    'Body', 'Container', 'Text', 'Image', 'Alert', 'Button', 'Bar', 'Scroll', 'List',
    'Horizontal', 'Vertical', 'Stack', 'Input', 'Select', 'Switch', 'Style', 'Modal',
    'Navigator', 'StackNavigator', 'TabNavigator', 'BackHandler', 'DrawerLayout',
    'Permissions', 'ToastAlert', 'ActionSheetIOS', 'ActivityIndicator', 'Animate', 'Dimensions',
    'Link', 'Refresh', 'StatusBar'
  ];

  // Register Autocomplete Provider
  const provider = vscode.languages.registerCompletionItemProvider(
    'sora',
    {
      provideCompletionItems() {
        return [...soraWords, ...components].map(word =>
          new vscode.CompletionItem(word, vscode.CompletionItemKind.Keyword)
        );
      }
    }
  );

  // Command: Run Sora App
  const runCommand = vscode.commands.registerCommand('sora.runApp', () => {
    const terminal = vscode.window.createTerminal("Sora App Runner");
    terminal.show();
    terminal.sendText("sora-cli run App.sora"); 
  });

  // Command: Create a new Sora file
  const newFileCommand = vscode.commands.registerCommand('sora.newFile', async () => {
    const uri = await vscode.window.showSaveDialog({
      filters: {
        'Sora Files': ['sora']
      },
      saveLabel: 'Create Sora File'
    });

    if (uri) {
      const template = `show('Hello from Sora!')`;
      const encoder = new TextEncoder();
      const uint8array = encoder.encode(template);
      await vscode.workspace.fs.writeFile(uri, uint8array);
      const doc = await vscode.workspace.openTextDocument(uri);
      vscode.window.showTextDocument(doc);
    }
  });

  // Register all subscriptions
  context.subscriptions.push(provider, runCommand, newFileCommand);
}

export function deactivate() {
  console.log('Sora is deactivated.');
}