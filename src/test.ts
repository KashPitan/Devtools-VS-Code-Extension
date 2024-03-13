// const testHtml = `<div ng-if="contact.type !== 'User'">`;
// const testHtml = '<div classNames="testClass and another class">';

const testHtml = '<p classNames="testClass and another p">';

const htmlTag = testHtml.match(/<[a-zA-Z]+(>|.*?[^?]>)/);
console.log(htmlTag);
if (htmlTag) {
  console.log(htmlTag[0]);

  const tagType = htmlTag![0].match(/<([^\s>]+)(\s|>)+/);
  if (tagType) {
    console.log(tagType[1]);
  }

  const classNames = htmlTag[0].match(
    /(?:classNames)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/
  );
  console.log(classNames);
  if (tagType && tagType[1] && classNames && classNames[1]) {
    const styledComponent = `const NewStyledComponent = styled.${tagType[1]}\`${classNames[1]}\`;`;
    console.log(styledComponent);
  }
}
