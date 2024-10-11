
const { readFile, writeFile, copyFile } = require('fs').promises;

async function reactNativeMaps() {
    const modulePath = 'node_modules/react-native-maps';
    await writeFile(`${modulePath}/lib/index.web.js`, 'module.exports = {}', 'utf-8');
    await copyFile(`${modulePath}/lib/index.d.ts`, `${modulePath}/lib/index.web.d.ts`);
    const pkg = JSON.parse(await readFile(`${modulePath}/package.json`));
    pkg['react-native'] = 'lib/index.js';
    pkg['main'] = 'lib/index.web.js';
    await writeFile(`${modulePath}/package.json`, JSON.stringify(pkg, null, 2), 'utf-8');
}

reactNativeMaps();
