import * as vscode from 'vscode';

export function registerNewFileCommand(): vscode.Disposable {
  return vscode.commands.registerCommand('sora.newFile', async () => {
    const uri = await vscode.window.showSaveDialog({
      filters: {
        'Sora Files': ['sora']
      },
      saveLabel: 'Create Sora File'
    });

    if (uri) {
      const template = `show("Hello from Sora!")`;
      const uint8array = new TextEncoder().encode(template);

      await vscode.workspace.fs.writeFile(uri, uint8array);

      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc);
    }
  });
}