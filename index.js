const fs = require('fs-extra');
const path = require('path');
const event = require('./components/eventemitter/eventemitter');
// require('./components/datetime/dateFormat');

require('./components/server/server');
require('./components/server/socketServer');
require('./components/roomManager/roomManager');


const basePath = process.cwd();

// console.log(basePath);

// fs.ensureDirSync(basePath);
let settingsJSON = {
  basePath: basePath,
  port: process.env.PORT || 3005,
};
// const settingsPath = path.join(basePath, 'settings.json');
// const newSettingsJSON = fs.readJsonSync(settingsPath, { encoding: 'utf-8', throws: false });
// settingsJSON = {
//   ...settingsJSON,
//   ...newSettingsJSON
// };
// fs.writeJSONSync(settingsPath, settingsJSON, { spaces: '  ', encoding: 'utf-8' });


event.emit('setSettings', settingsJSON);
event.emit('startServer');


