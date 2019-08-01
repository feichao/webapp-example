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

const finalName = filename.replace(/^([a-zA-Z0-9_])/, (m, $1) => $1.toUpperCase());
const dirName = path.join('./src/components', finalName);

if (fs.existsSync(dirName)) {
  throw new Error(`目录 ${dirName} 已存在`);
}

const vueFile = path.join(dirName, `./${finalName}.vue`);
const scssFile = path.join(dirName, `./${finalName}.scss`);

fs.mkdirSync(dirName);

fs.writeFileSync(vueFile,

  `<!-- Created Info -->
<!-- Command: npm run make-component ${filename} -->
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
console.log(`create ${finalName}.vue success`);

fs.writeFileSync(scssFile, ``);
console.log(`create ${finalName}.scss success`);

console.log('success!!\n\n\n');
