/* eslint no-console: 0 */

const minimist = require('minimist');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const params = minimist(process.argv.slice(2));
const dir = params.name;
const created = params.created;

if (!dir) {
  throw new Error('文件路径不能为空');
}

const finalName = dir.split('/').pop().replace(/^([a-zA-Z0-9_])/, (m, $1) => $1.toUpperCase());
const dirName = path.join('./src/business/views', dir);

if (fs.existsSync(dirName)) {
  throw new Error(`目录 ${dirName} 已存在`);
}

const vueFile = path.join(dirName, `./${finalName}.vue`);
const scssFile = path.join(dirName, `./${finalName}.scss`);

mkdirp.sync(dirName);

fs.writeFileSync(vueFile,

  `<!-- Created Info -->
<!-- Command: npm run make-business ${dir} -->
<!-- Created By: ${created} -->
<!-- Created Date: ${new Date()} -->
<template>
  <div></div>
</template>

<style lang="sass" scoped>
@import './${finalName}.scss';
</style>

<script>
export default _extend({
  name: '${finalName}',
});
</script>
`

);
console.log(`create ${vueFile} success`);

fs.writeFileSync(scssFile, ``);
console.log(`create ${scssFile} success`);

console.log('success!!\n\n\n');
