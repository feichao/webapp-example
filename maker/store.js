/* eslint no-console: 0 */

const minimist = require('minimist');
const path = require('path');
const fs = require('fs');

const params = minimist(process.argv.slice(2));
const filename = params.name;
const created = params.created;

if (!filename) {
  throw new Error('文件名不能为空');
}

const newStoreDir = path.join('./src/stores', filename);

if (fs.existsSync(newStoreDir)) {
  throw new Error(`目录 ${newStoreDir} 已存在`);
}

const actionsFile = path.join(newStoreDir, './_actions.js');
const mutationsFile = path.join(newStoreDir, './_mutations.js');
const stateFile = path.join(newStoreDir, './_state.js');
const typesFile = path.join(newStoreDir, './_types.js');
const indexFile = path.join(newStoreDir, './index.js');

const createdInfo = `/**
* Created Info
* Created Command: npm run make-store ${filename}
* Created By: ${created}
* Created Date: ${new Date()}
*/`;

fs.mkdirSync(newStoreDir);

fs.writeFileSync(actionsFile,

  `import TYPES from './_types';

export default {};
`

);
console.log('create _actions.js success');

fs.writeFileSync(mutationsFile,

  `import TYPES from './_types';

export default {};
`

);
console.log('create _mutations.js success');

fs.writeFileSync(stateFile, `export default {};\n`);
console.log('create _state.js success');

fs.writeFileSync(typesFile, `export default {};\n`);
console.log('create _types.js success');

fs.writeFileSync(indexFile,

  `${createdInfo}
import actions from './_actions';
import mutations from './_mutations';
import state from './_state';
import types from './_types';

export default {
  actions,
  mutations,
  state,
  types
};
`

);
console.log('create index.js success\n');
console.log('success!!\n\n\n');
