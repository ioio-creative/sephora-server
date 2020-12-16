
const { v1: uuid } = require('uuid');
// const mysql = require('mysql');
// const dbConfig = require('../../config/dbConfig.js');

const log = console.log;

const gameStatus = {
  idle:      0,
  waiting:   1,
  selecting: 2,
  selected:  3,
  ready1:    4,
  started1:  5,
  result1:   6,
  ready2:    7,
  started2:  8,
  result2:   9,
  offline:   10, // should be not able to get this signal
};
const stageTimer = {
  [gameStatus.idle]:      -1,
  [gameStatus.waiting]:   -1,
  [gameStatus.selecting]: -1,
  [gameStatus.selected]:  -1,
  [gameStatus.ready1]:    -1,
  [gameStatus.started1]:  -1,
  [gameStatus.result1]:   -1,
  [gameStatus.ready2]:    -1,
  [gameStatus.started2]:  -1,
  [gameStatus.result2]:   -1,
  [gameStatus.offline]:   -1,
};
const gameTypeArray = [
  0, // day
  1, // night
]
class Room {
  constructor({roomId, roomManager, playersCount, hostCount}) {
    this.roomStatus = gameStatus.offline;
    this.roomManager = roomManager;
    this.socketio = roomManager.socketio;
    this.playersCount = playersCount;
    this.hostCount = hostCount;
    this.roomId = (roomId? roomId: uuid());
    this.gameId = 1;
    this.players = [];
    this.hosts = [];
    this.debugs = [];
    this.shakeArray = [];
    this.gameChoices = [];
    this.stageTimer = null;
    // the follow 4 params should be get in db
    // this.distanceMultiplier = 0.1;
    this.totalDistance = 2884;
    this.accumulatedDistance = 128;
    this.totalVisit = 10;
    // the above 4 params should be get in db
    
    this.roomManager.addRoom(this.roomId, this);
    // this.roomManager.addHost();
    this.initialRoom();
  }

  emit(eventName, data, additionalParams) {
    log(`emit - ${eventName} - ${JSON.stringify({
      data: data,
      ...additionalParams
    }, null , '  ')}`);
    // log("emit");
    this.socketio.to(this.roomId).emit(eventName, {
      data: data,
      ...additionalParams
    });
  }

  // initDb() {
  //   this.db = mysql.createConnection(dbConfig);
  // }
  initialRoom() {
    this.generateAllPlayersId();
    this.updateGameStage(gameStatus.idle);
  }

  updateGameStage(newStage) {
    if (newStage === this.roomStatus) {
      this.emit('OnPlayersUpdate', this.playersStatus);
      this.emit('gameStage', this.roomStatus, {
        playersInfo: this.playersStatus
      });
      return;
    }
    const prevStage = this.roomStatus;
    this.roomStatus = newStage;
    const additionalParams = [];
    switch (newStage) {
      case gameStatus['idle']:
        log(`game idle`);
        this.clearAllTimeout();
        if (prevStage !== gameStatus['waiting']) {
          this.generateAllPlayersId();
          this.gameChoices = new Array(this.playersCount).fill(-1);
        }
        additionalParams.push({
          playersInfo: this.playersStatus
        });
        this.emit('OnPlayersUpdate', this.playersStatus, {
          accumulatedDistance: this.accumulatedDistance,
          totalVisit: this.totalVisit,
        });
        break;
      case gameStatus['waiting']:
        log(`game waiting`);
        this.clearAllTimeout();
        additionalParams.push({
          playersInfo: this.playersStatus
        });
        this.emit('OnPlayersUpdate', this.playersStatus, {
          accumulatedDistance: this.accumulatedDistance,
          totalVisit: this.totalVisit,
        });
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['selecting']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['selecting']:
        log(`game selecting`);
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['selected']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['selected']:
        log(`game selected`);
        // emit game selected
        this.clearAllTimeout();
        // random the game base on users choices
        const gameIdxToRand = [];
        this.players.forEach((player, idx) => {
          if (player.joined && this.gameChoices[idx] !== -1) {
            gameIdxToRand.push(this.gameChoices[idx]);
          }
        });
        if (gameIdxToRand.length) {
          // if any one of the client choosed the game
          const finalGameIdx = Math.floor(Math.random() * gameIdxToRand.length);
          this.gameId = gameIdxToRand[finalGameIdx];
        } else {
          // if no one has choosed game
          const finalGameIdx = Math.floor(Math.random() * gameTypeArray.length);
          this.gameId = gameTypeArray[finalGameIdx];
        }
        additionalParams.push({
          gameSelected: this.gameId
        });
        this.emit('ModePick', this.gameId);
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['ready1']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['ready1']:
        log(`game 1 ready`);
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['started1']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['started1']:
        log(`game 1 started`);
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['result 1']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['result1']: {
        log(`game 1 result`);
        // emit game result
        // const distanceShaked = this.shakeArray.reduce((prev, curr) => prev + curr, 0) * this.distanceMultiplier;
        let playerJoined = 0;
        this.players.forEach((player, idx) => {
          if (player['joined']) {
            playerJoined++;
            player['socket'].emit('game1Result', {
              // data: distanceShaked// this.shakeArray[idx] * this.distanceMultiplier
            });
          }
        });
        // this.hosts.forEach((hostSocket) => {
        //   hostSocket.emit('game1Result', distanceShaked);
        // });
        this.debugs.forEach((debugSocket) => {
          debugSocket.emit('game1Result', distanceShaked);
        });
        additionalParams.push({
          gameResult: distanceShaked
        });
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['ready2']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      }
      case gameStatus['ready2']:
        log(`game 1 ready`);
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['started2']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['started2']:
        log(`game 2 started`);
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['result2']);
          }, stageTimer[newStage] * 1000);
        }
        break;
      case gameStatus['result2']: {
        log(`game 2 result`);
        // emit game result
        // const distanceShaked = this.shakeArray.reduce((prev, curr) => prev + curr, 0) * this.distanceMultiplier;
        let playerJoined = 0;
        this.players.forEach((player, idx) => {
          if (player['joined']) {
            playerJoined++;
            player['socket'].emit('game2Result', {
              data: distanceShaked// this.shakeArray[idx] * this.distanceMultiplier
            });
          }
        });
        this.hosts.forEach((hostSocket) => {
          hostSocket.emit('game2Result', distanceShaked);
        });
        this.debugs.forEach((debugSocket) => {
          debugSocket.emit('game2Result', distanceShaked);
        });
        additionalParams.push({
          gameResult: distanceShaked
        });
        this.clearAllTimeout();
        if (stageTimer[newStage] > 0) {
          this.stageTimer = setTimeout(() => {
            this.updateGameStage(gameStatus['idle']);
          }, stageTimer[newStage] * 1000);
        }
        // save to db here
        // this.saveGameResult();
        // temp save to local variable
        this.accumulatedDistance += distanceShaked;
        this.totalVisit += playerJoined;

        break;
      }
      case gameStatus['offline']:
        break;
    }
    setImmediate(() => this.emit('gameStage', this.roomStatus, ...additionalParams));
  }
  clearAllTimeout() {
    clearTimeout(this.stageTimer);
    this.stageTimer = null;
  }
  generateAllPlayersId() {
    // remove old players if have
    this.players.forEach(oldPlayer => {
      if (oldPlayer) {
        this.roomManager.removePlayer(oldPlayer.playerId);
      }
    });
    // empty the players array
    this.players.length = 0;
    this.shakeArray.length = 0;
    // create new player slots
    for (let i = 0; i < this.playersCount; i++) {
      const newPlayer = {
        playerId: uuid().split('-')[0],
        joined: false,
        socket: null
      };
      this.players.push(newPlayer);
      this.shakeArray.push(false);
      this.roomManager.addPlayer(newPlayer.playerId, this);
    }
  }

  generatePlayer(idx) {
    this.kickPlayer(idx);
    this.players[idx] = {
      playerId: uuid().split('-')[0],
      joined: false,
      socket: null
    };
    this.shakeArray[idx] = false;
    this.roomManager.addPlayer(this.players[idx].playerId, this);
    this.emit('OnPlayersUpdate', this.playersStatus, {
      accumulatedDistance: this.accumulatedDistance,
      totalVisit: this.totalVisit,
    });
    const connectedPlayersCount = this.players.reduce((prev, curr) => {
      return prev + ~~curr['joined'];
    }, 0);
    if (connectedPlayersCount === 0 && this.roomStatus === gameStatus.waiting) {
      this.updateGameStage(gameStatus.idle);
    }
  }
  // kick the player in specifice idx
  kickPlayer(idx) {
    const oldPlayer = this.players[idx];
    if (oldPlayer) {
      // if (oldPlayer['socket'] && oldPlayer['socket'].connected) {
      //   oldPlayer['socket'].disconnect();
      // }
      this.players[idx] = null;
      this.shakeArray[idx] = false;
      this.roomManager.removePlayer(oldPlayer.playerId);
    }
  }

  addHost(hostSocket, ack) {
    this.hosts.push(hostSocket);
    hostSocket.join(this.roomId);
    // this.roomManager.
    log(`host join - ${this.roomId}`);
    this.bindSocketEventForHost(hostSocket);
    if (typeof(ack) === "function") {
      ack({
        data: {
          roomId: this.roomId,
          playersInfo: this.playersStatus
        }
      });
    }
    hostSocket.emit('OnPlayersUpdate', {
      data: this.playersStatus,
      // accumulatedDistance: this.accumulatedDistance,
      // totalVisit: this.totalVisit,
    });
    // hostSocket.emit('gameStage', {
    //   data: this.roomStatus,
    //   playersInfo: this.playersStatus
    // });
  }

  addDebug(debugSocket, ack) {
    this.debugs.push(debugSocket);
    debugSocket.join(this.roomId);
    log(`debug join - ${this.roomId}`);
    this.bindSocketEventForDebug(debugSocket);
    if (typeof(ack) === "function") {
      ack({
        data: this.roomId
      });
    }
    debugSocket.emit('OnPlayersUpdate', {
      data: this.playersStatus
    });
    debugSocket.emit('gameStage', {
      data: this.roomStatus,
      playersInfo: this.playersStatus
    });
    // debugSocket.emit('updateDistanceMultiplier', this.distanceMultiplier);
  }

  addPlayer(playerId, playerSocket, ack) {
    if (this.roomStatus === gameStatus.idle || this.roomStatus === gameStatus.waiting) {
      const playerJoiningIndex = this.players.findIndex(player => player.playerId === playerId);
      if (playerJoiningIndex !== -1) {
        const playerJoining = this.players[playerJoiningIndex];
        if (playerJoining['joined'] === false) {
          playerJoining['socket'] = playerSocket;
          playerJoining['joined'] = true;
          this.shakeArray[playerJoiningIndex] = 0;
          this.bindSocketEventForPlayer(playerJoiningIndex);
          playerSocket.join(this.roomId);
          log(`player joined - ${this.roomId}: ${playerJoiningIndex}`);
          if (typeof(ack) === "function") {
            ack({
              data: "joined",
              index: playerJoiningIndex
            });
          }
          // this.emit('OnPlayersUpdate', this.players);
          setImmediate(()=>this.updateGameStage(gameStatus.waiting));
        } else {
          if (typeof(ack) === "function") {
            ack({
              data: "failed, occupied"
            });
          }
        }
      } else {
        if (typeof(ack) === "function") {
          ack({
            data: "failed, playerId not found (???)"
          });
        }
      }
    } else {
      if (typeof(ack) === "function") {
        ack({
          data: "failed, game started"
        });
      }
    }
  }

  saveGameResult() {
    /*
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const distanceShaked = this.shakeArray.reduce((prev, curr) => prev + curr, 0) * this.distanceMultiplier;
    const playerJoined = this.players.reduce((prev, curr) => prev + ~~curr.joined, 0);
    const gameData  = { 
      playerdata: JSON.stringify(this.shakeArray),
      gametype: this.gameId,
      distance: distanceShaked,
      createdate: new Date()
    };
    const gameRecordSave = new Promise((resolve, reject) => {
      dbConnection.query('INSERT INTO gamerecord SET ?', gameData, function (error, results, fields) {
        if (error) throw error;
        resolve(true);
        // Neat!
      });
    });

    // https://en.wikipedia.org/wiki/Merge_(SQL)#upsert
    const totalDistanceUpdate = new Promise((resolve, reject) => {
      dbConnection.query(
        'UPDATE summary SET value = ? WHERE name = ?', [ { toSqlString: () => { return `value + ${distanceShaked}`; } }, 'total_distance'], 
        (error, results, fields) => {
          if (error) throw error;
          if (results.affectedRows === 0) {
            dbConnection.query(
              'INSERT INTO summary SET ?', {name: 'total_distance', value: distanceShaked}, 
              (error, results, fields) => {
                if (error) throw error;
                resolve(true);
              }
            )
          } else {
            resolve(true);
          }
        }
      );
    })

    const totalVisitUpdate = new Promise((resolve, reject) => {
      dbConnection.query(
        'UPDATE summary SET value = ? WHERE name = ?', [ { toSqlString: () => { return `value + ${playerJoined}`; } }, 'total_visit'], 
        (error, results, fields) => {
          if (error) throw error;
          if (results.affectedRows === 0) {
            dbConnection.query(
              'INSERT INTO summary SET ?', {name: 'total_visit', value: playerJoined}, 
              (error, results, fields) => {
                if (error) throw error;
                resolve(true);
              }
            )
          } else {
            resolve(true);
          }
        }
      );
    })

    Promise.all([gameRecordSave, totalDistanceUpdate, totalVisitUpdate]).then(() => {
      // console.log(values);
      dbConnection.end();
    });

    // */
    // connection.end();
  }
  bindSocketEventForHost(socket) {
    // nothing to do if the timer handled in server

    // change stage if the timer handled by frontend
    socket.on('changeStage', (data) => {
      const newStage = gameStatus[data['data']];
      log(`changeStage: ${newStage}`);
      if (stageTimer[newStage] !== undefined) {
        log("change to new stage");
        this.updateGameStage(newStage);
      } else {
        log("new stage not found");
      }
    });
    // submit score event
    socket.on('submitScore', (data) => {
      const scoreArray = data['data'];
      // expect scoreArray format
      // array of the five players shake count
      // e.g. [10, 21, 17, 15, 6]
    });

    socket.on('disconnect', () => {
      const hostIdx = this.hosts.findIndex(hostSocket => hostSocket === socket);
      if (hostIdx !== -1) {
        this.hosts.splice(hostIdx, 1);
      }
      if (this.hosts.length + this.debugs.length === 0) {
        this.roomManager.removeRoom(this.roomId);
      }
    });
  }

  bindSocketEventForPlayer(playerIdx) {
    const socket = this.players[playerIdx]['socket'];
    socket.on('disconnect', () => {
      this.generatePlayer(playerIdx);
    });
    socket.on('shake', () => {
      if (this.roomStatus === gameStatus.started || this.roomStatus === gameStatus.ready) {
        if (this.roomStatus === gameStatus.started) {
          this.shakeArray[playerIdx] += 1;
        }
        const shakeMessage = new Array(this.playersCount).fill(0);
        shakeMessage[playerIdx] = 1
        this.emit('playersShake', shakeMessage);
      }
    });
    socket.on('selectGame', (data, ack) => {
      const gameId = data["data"];
      if (this.roomStatus === gameStatus.selecting) {
        this.gameChoices[playerIdx] = gameId;
        this.emit('gameChoices', this.gameChoices);
        ack({
          data: gameId
        });

        // check if all selected
        const totalPlayers = this.playersStatus.reduce((total, player) => {
          return total + ~~(player.joined === true);
        }, 0);

        const totalSelected = this.gameChoices.reduce((total, choice) => {
          return total + ~~(choice !== -1);
        }, 0);
        // log(JSON.stringify(this.playersStatus, ['playerid', 'joined']));
        // log(JSON.stringify(this.gameChoices));
        // log("totalPlayers: ", totalPlayers);
        // log("totalSelected: ", totalSelected);
        if (totalPlayers === totalSelected) {
          this.updateGameStage(gameStatus.selected);
        }
      }
    });
  }

  bindSocketEventForDebug(socket) {
    socket.on('debug', (data) => {
      switch (data['type']) {
        case 'gameStage':
          const newStage = parseInt(data['data']);
          if (stageTimer[newStage] !== undefined) {
            this.updateGameStage(newStage);
          }
          break;
        case 'joinGame': {
          const playerIdx = this.players.findIndex((player) => (player.playerId === data['data']['playerId']));
          if (playerIdx >= 0) {
            this.players[playerIdx]['joined'] = true;
            this.players[playerIdx]['socket'] = socket;
            this.updateGameStage(gameStatus['waiting']);
            // this.emit('OnPlayersUpdate', this.players);
          }
          break;
        }
        case 'kickPlayer': {
          const playerIdx = this.players.findIndex((player) => (player.playerId === data['data']['playerId']));
          if (playerIdx >= 0) {
            this.generatePlayer(playerIdx);
          }
          break;
        }
        case 'selectGame': {
          if (this.roomStatus === gameStatus.selecting) {
            data['data']['selectedArray'].forEach((newChoice, idx) => {
              if (newChoice !== this.gameChoices[idx]) {
                this.gameChoices[idx] = newChoice;
                if (this.players[idx]['socket']) {
                  this.players[idx]['socket'].emit('gameChoice', newChoice);
                }
              }
            })
            // this.gameChoices = data['data']['selectedArray'];
            this.emit('gameChoices', this.gameChoices);
          }
          break;
        }
        case 'shake': {
          if (this.roomStatus === gameStatus.started) {
            const playerIdx = this.players.findIndex((player) => (player.playerId === data['data']['playerId']));
            this.shakeArray[playerIdx] += 1;
            const shakeMessage = new Array(this.playersCount).fill(0);
            shakeMessage[playerIdx] = 1
            this.emit('playersShake', shakeMessage);
          }
          break;
        }
        // case 'setDistanceMultiplier': {
        //   const newDistanceMultiplier = parseInt(data['data']);
        //   if (!isNaN(newDistanceMultiplier)) {
        //     this.distanceMultiplier = newDistanceMultiplier;
        //   }
        //   this.debugs.forEach(debugSocket => {
        //     debugSocket.emit('updateDistanceMultiplier', this.distanceMultiplier);
        //   })
        //   break;
        // }
      }
    })
    socket.on('disconnect', () => {
      const debugIdx = this.debugs.findIndex(debugSocket => debugSocket === socket);
      if (debugIdx !== -1) {
        this.debugs.splice(debugIdx, 1);
      }
      if (this.hosts.length + this.debugs.length === 0) {
        this.roomManager.removeRoom(this.roomId);
      }
    });
  }
  // unbindSocketEventForPlayer(playerIdx) {
  //   const socket = this.players[playerIdx]['socket'];
  //   socket.removeAllListeners()
  // }
  get name() {
    return this.roomId;
  }
  get playersStatus() {
    return JSON.parse(JSON.stringify(this.players, ['playerId', 'joined']));
  }

}

module.exports = Room;