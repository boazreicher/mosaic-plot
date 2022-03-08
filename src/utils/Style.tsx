export function getStyleObj(styleString: string) {
  const cssToObject = require('css-to-object');
  return cssToObject(styleString);
}
