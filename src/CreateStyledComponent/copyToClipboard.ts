import * as vscode from "vscode";
import { createStyledComponent } from "./utils";

const command = vscode.commands.registerCommand(
  "dev-tools.createStyledComponentAndCopyToClipboard",
  () => {
    const styledComponent = createStyledComponent();
    if (styledComponent) {
      vscode.window.showInformationMessage(
        "Styled component copied to clipboard!"
      );

      vscode.env.clipboard.writeText(styledComponent.styledComponent);
    }
  }
);

export default command;
