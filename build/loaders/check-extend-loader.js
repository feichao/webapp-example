const { transform, traverse, types } = require('babel-core');

module.exports = function (source, map) {
  const sources = map.sources.toString();
  const sourceRoot = map.sourceRoot;

  let isExtend = false;

  const { ast } = transform(source, {
    babelrc: false,
    code: false,
    compact: false,
  });
  traverse(ast, {
    CallExpression (path) {
      if (types.isIdentifier(path.node.callee, {name: '_extend'})) {
        const parent = path.parent;
        if(types.isExportDefaultDeclaration(parent) || types.isVariableDeclarator(parent) || types.isAssignmentExpression(parent)) {
          isExtend = true;
          path.skip();
        }
      }
    }
  });

  if (!isExtend) {
    throw (new Error(`目录: ${sourceRoot} 下的文件 ${sources} 必须使用全局函数 _extend() 扩展`));
  }

  this.callback(null, source, map);
};
