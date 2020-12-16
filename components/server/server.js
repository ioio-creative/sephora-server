// const http = require('http');
const http = require('https');
const fs = require('fs-extra');
const path = require('path');
const event = require('../eventemitter/eventemitter');
const fileExtension = require('../fileExtension/fileExtension');

let basePath = path.join(process.cwd(), 'webroot');

let port = 3003;

const setSettings = (newSettingsJSON) => {
  port = newSettingsJSON['port'] || port;
  basePath = path.join(newSettingsJSON['basePath'], 'webroot');
}

const startServer = () => {
  const httpServer = http.createServer((req, res) => {
  // const httpsOption = {
  //   key:  fs.readFileSync(path.join(process.cwd(), 'components', 'server', 'cert', '10.0.1.40.key')).toString(),
  //   cert: fs.readFileSync(path.join(process.cwd(), 'components', 'server', 'cert', '10.0.1.40.cert')).toString()
  // };
  // const httpServer = http.createServer(httpsOption, (req, res) => {
    if (req.url === '/') {
      req.url = 'index.html';
    }
    filePath = path.join(basePath, req.url);
    if (fs.existsSync(filePath)) {
      const contentType = fileExtension.getContentTypeOfPath(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } else {
      res.writeHead(404);
      res.end('404 not found');
    }
  });
  httpServer.listen(port);
  console.log(`server is now listening to port ${port}`);
  event.emit('serverStarted', httpServer);
}

event.on('setSettings', setSettings);
event.on('startServer', startServer);
