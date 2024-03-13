# DevTools VS Code Extension

Devtools to assist with the kind of code I typically write.

## Installation

This extension isn't published yet so either clone this repo and create a `.vsix` file then follow this guide: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions

or

clone/download `kash-dev-tools-0.0.1.vsix` from the root of the project then follow the installation guide from the above link.

## Convert to Styled Component

Two commands to convert jsx to styled components that use twin macro. Both are accessible via context menu (right click).
Highlight an html element before activating command.

- Convert to SC and Copy to Clipboard

  - input: `<div className='flex items-center gap-3' id='myDiv'> other random stuff </div>`
  - output: `const NewStyledComponent = styled.div`${tw`flex items-center gap-3`};`

- Convert to SC in Styles File
  Converts the highlighted html element to a styled component in a styles file of the same name
  (e.g. element in `Modal.tsx` creates a styled component in `Modal.styles.tsx`) and in the same directory.
  The component definition is added along with its export. If the file doesn't exist it creates it.

  - input: `<div className='flex items-center gap-3' id='myDiv'> other random stuff </div>`
  - output in new file:

  ```
    import styled from 'styled-components';
    import tw from 'twin.macro';

  const NewStyledComponent = styled.div`${tw`flex items-center gap-3`};

    export default { NewStyledComponent };
  ```

- Convert to SC and replace inline

Notes:

- Currently only works for `.tsx` files
- Assumes styles file and component file should have the same name
- Assumes object export style: `export default { ... }
