import * as vscode from "vscode";
import SCToClipboardCommand from "./CreateStyledComponent/copyToClipboard";
import createInStylesFileCommand from "./CreateStyledComponent/createInStylesFile";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "dev-tools" is now active!');

  let createStyledComponentAndCopyToClipboard = SCToClipboardCommand;

  let createInStylesFile = createInStylesFileCommand;

  context.subscriptions.push(createStyledComponentAndCopyToClipboard);
  context.subscriptions.push(createInStylesFile);
}

// This method is called when your extension is deactivated
export function deactivate() {}
