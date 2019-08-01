const { parse, stringify } = require('himalaya');

const traverse = function(htmlAst) {
  if(Array.isArray(htmlAst)) {
    htmlAst.forEach(tag => {
      if (tag.tagName === 'img') {
        let hasErrorHandler = false;
        for(let attr of tag.attributes) {
          if (attr.key === 'onerror') {
            hasErrorHandler = true;
            attr.value = `_$$_handleImgLoadError_$$_(event) & ${attr.value}`;
          }
        }
        if (!hasErrorHandler) {
          tag.attributes.push({
            key: 'onerror',
            value: '_$$_handleImgLoadError_$$_(event)'
          });
        }
      }
      traverse(tag.children);
    });
  }
};
module.exports = function(source) {
  const htmlAst = parse(source);

  traverse(htmlAst);

  const retHtml = stringify(htmlAst);

  this.callback(null, retHtml);
};
