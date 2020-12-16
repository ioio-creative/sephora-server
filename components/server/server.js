// const http = require('http');
const http = require('https');
const fs = require('fs-extra');
const path = require('path');
const event = require('../eventemitter/eventemitter');
const fileExtension = require('../fileExtension/fileExtension').ext;
const io = require('socket.io')();

let basePath = path.join(process.cwd(), 'webroot');

let port = process.env.PORT || 3005;

const setSettings = (newSettingsJSON) => {
  port = process.env.PORT || newSettingsJSON['port'] || port;
  basePath = path.join(newSettingsJSON['basePath'], 'webroot');
  console.log(basePath);
}

const httpsOption = {
  key:  fs.readFileSync(path.join(process.cwd(), 'components', 'server', 'cert', '10.0.1.40.key')).toString(),
  cert: fs.readFileSync(path.join(process.cwd(), 'components', 'server', 'cert', '10.0.1.40.cert')).toString()
};
const startServer = () => {
  // const httpServer = http.createServer((req, res) => {
  const httpServer = http.createServer(httpsOption, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

  
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
    // filePath = path.join(basePath, req.url);
    // res.writeHead(404);
      filePath = path.join(basePath, 'index.html');
      const contentType = fileExtension.getContentTypeOfPath(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    }
  });
  httpServer.listen(port);
  io.attach(httpServer, {cors: {
    origin: '*',
  }});
  event.emit('socketServerStarted', io);

  console.log(`server is now listening to port ${port}`);
  // event.emit('serverStarted', httpServer);
}

event.on('setSettings', setSettings);
event.on('startServer', startServer);
