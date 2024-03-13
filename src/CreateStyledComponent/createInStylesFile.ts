import * as vscode from "vscode";
import { createStyledComponent } from "./utils";

export const command = vscode.commands.registerCommand(
  "dev-tools.createInStylesFile",
  async () => {
    const styledComponent = createStyledComponent();
    if (styledComponent) {
      // assumes styles file name is the same as the component file
      const currentlyOpenTabFilePath =
        vscode.window.activeTextEditor?.document.fileName;

      if (!currentlyOpenTabFilePath) return;

      const currentDocumentUri = vscode.window.activeTextEditor?.document.uri;
      if (!currentDocumentUri) return;
      let currentFolder = currentDocumentUri.path.replace(
        ".tsx",
        ".styles.tsx"
      );
      const stylesFileUri = vscode.Uri.parse(currentFolder);

      try {
        await vscode.workspace.fs.stat(stylesFileUri);

        await addComponentToExport(stylesFileUri, styledComponent);
        await addSCToExistingFile(stylesFileUri, styledComponent);
        vscode.window.showInformationMessage(
          "Styled component created in styles file!"
        );
      } catch (error) {
        // if file doesnt exist then create it
        addSCToNewStylesfile(stylesFileUri, styledComponent);
        vscode.window.showInformationMessage(
          "Styled component created in new styles file!"
        );
      }
    }
  }
);

const addSCToExistingFile = async (
  stylesFileUri: vscode.Uri,
  styledComponent: {
    styledComponent: string;
    styledComponentName: string;
  }
) => {
  const stylesFile = await vscode.workspace.fs.readFile(stylesFileUri);

  const stylesFilesTextArray = stylesFile.toString().split("\n");
  const exportLineIndex = stylesFilesTextArray.findIndex((line) =>
    line.includes("export default")
  );

  const componentAddition = ` \n${styledComponent.styledComponent}\n`;
  const wsedit = new vscode.WorkspaceEdit();
  wsedit.createFile(stylesFileUri, { ignoreIfExists: true });

  wsedit.insert(
    stylesFileUri,
    new vscode.Position(exportLineIndex - 1, 0),
    componentAddition
  );

  vscode.workspace.applyEdit(wsedit).then((success) => {
    if (success) {
      // sucess message
    } else {
      vscode.window.showInformationMessage("Error!");
    }
  });

  await vscode.workspace.save(stylesFileUri);
};

const addComponentToExport = async (
  stylesFileUri: vscode.Uri,
  styledComponent: {
    styledComponent: string;
    styledComponentName: string;
  }
) => {
  // update existing file
  const stylesFile = await vscode.workspace.fs.readFile(stylesFileUri);

  const stylesFilesTextArray = stylesFile.toString().split("\n");
  const exportLineIndex = stylesFilesTextArray.findIndex((line) =>
    line.includes("export default")
  );

  const componentAddition = ` \n${styledComponent.styledComponentName},`;

  // after bracket
  const exportLineOpenBracket =
    stylesFilesTextArray[exportLineIndex].indexOf("{") + 1;

  const wsedit = new vscode.WorkspaceEdit();

  wsedit.insert(
    stylesFileUri,
    new vscode.Position(exportLineIndex, exportLineOpenBracket),
    componentAddition
  );

  await vscode.workspace.applyEdit(wsedit); // check if applied or not - returns boolean
  await vscode.workspace.save(stylesFileUri);
};

const addSCToNewStylesfile = (
  stylesFileUri: vscode.Uri,
  styledComponent: {
    styledComponent: string;
    styledComponentName: string;
  }
) => {
  const wsedit = new vscode.WorkspaceEdit();
  wsedit.createFile(stylesFileUri, { ignoreIfExists: true });

  const imports = `import tw from 'twin.macro';\nimport styled from 'styled-components';\n`;
  const exportLines = `\nexport default { ${styledComponent.styledComponentName} }`;
  wsedit.insert(
    stylesFileUri,
    new vscode.Position(0, 0),
    imports + `\n${styledComponent.styledComponent}` + `\n${exportLines}`
  );

  vscode.workspace.applyEdit(wsedit).then((success) => {
    if (success) {
      // sucess message
    } else {
      vscode.window.showInformationMessage("Error!");
    }
  });
};

export default command;
