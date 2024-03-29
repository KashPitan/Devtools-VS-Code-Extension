import * as vscode from 'vscode';

export const createStyledComponent = async () => {
  const highlighted = getHighlightedText();
  if (!highlighted) return;

  return await createStyledComponentString(highlighted);
};

const getHighlightedText = () => {
  const editor = vscode.window.activeTextEditor;

  const selection = editor?.selection;
  if (selection && !selection.isEmpty) {
    const selectionRange = new vscode.Range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );
    return editor.document.getText(selectionRange);
  }
};

const createStyledComponentString = async (text: string) => {
  const textNoLineBreaks = text.replace(/(\r\n|\n|\r)/gm, '');
  const htmlTag = textNoLineBreaks.match(/<[a-zA-Z]+(>|.*?[^?]>)/);
  if (htmlTag) {
    const tagType = htmlTag![0].match(/<([^\s>]+)(\s|>)+/);

    const classNames = htmlTag[0].match(
      /(?:className)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/
    );

    if (tagType && tagType[1] && classNames && classNames[1]) {
      const styledComponentNameInput = await vscode.window.showInputBox({
        placeHolder: 'Enter Component Name',
      });

      const styledComponentName = styledComponentNameInput
        ? styledComponentNameInput.replaceAll(' ', '')
        : 'NewStyledComponent';

      const twinMacroClasses = `\$\{tw\`${classNames[1]}\`\}`;
      const styledComponent = `const ${styledComponentName} = styled.${tagType[1]}\`${twinMacroClasses}\`;`;
      return { styledComponent, styledComponentName };
    }
  }
};
