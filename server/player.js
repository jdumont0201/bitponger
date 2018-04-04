module.exports = {
    nbconnected: 0,
    nbplayers: 0,
    AMOUNTS: [0, 1, 10, 100, 1000],
  
    leaveGame: function(pong, socket) {
        var game = pong.game;
        if (game.clients[socket.id].room) {
            var room = game.clients[socket.id].room;
            if (game.chal[room]) {
                game.chal[room].status = "ENDED";
                pong.io.sockets.in(room).emit('game-opponentdisconnected', 1);
                delete game.chal[room];
            }
            delete game.clients[socket.id];
        }
    },
    isConnected: function(pong, u) {

        return (u in pong.io.sockets.connected);
    },
    generateNewClientInfo:function(pong,socket){
        return {
            "socketid": socket.id,
            "ip": socket.handshake.address,
            "name": null,
            "isguest": false,
            "pid": null,
            "amount": 0,
            "address": null,
            "date": pong.dates.now(),
            "country": null,
            "room": null,
            "roomList": {} ,
            isLogged:false,
            "lasttid": null,
            "dateentered": pong.dates.now(),
            "side": null};
            }
    , newConnection: function(pong, socket) {
        
        
        //CLIENT DEF
        pong.game.clients[socket.id] = this.generateNewClientInfo(pong,socket);
        pong.game.nbconnected++; 
        pong.log.info("CONN Socket Id:" + socket.id);
        pong.log.debug(pong.game.clients[socket.id]);
        pong.log.event("<-- user-connected" + socket.id);
        socket.emit('user-connected', socket.id);
        pong.io.sockets.emit('info-newuserconnected', {playerCount:this.getPlayerCount(pong)});
        //pong.log.emit("info-playercount" + socket.id);
        //socket.emit('info-playercount', this.getPlayerCount(pong));
    },
    rename: function(pong, socket, res) {
        pong.game.clients[socket.id].name = res.name;
        pong.game.clients[socket.id].country = res.country;
        pong.game.clients[socket.id].address = res.address;
        socket.broadcast.emit('info-playerrenamed', {'name': res.name});
    },
    
    feed: function(pong, socket, am) {
        pong.game.clients[socket.id].amount = pong.game.clients[socket.id].amount+am;
        pong.game.clients[socket.id].isguest = false;
        pong.game.clients[socket.id].dateentered = new Date();
        pong.room.autoJoinRooms(pong,socket,pong.game.clients[socket.id].amount);
        this.nbplayers++;
        var pc = this.getPlayerCount(pong);
        pong.log.emit("info-playerenterhall " + pc);
        socket.emit('room-updatecurrent',pong.game.clients[socket.id].roomList);
        socket.broadcast.emit('info-playerenterhall', {'name': pong.game.clients[socket.id].name, 'amount': am, 'playerCount': pc});
        socket.broadcast.emit('info-roomcontent', {'list': pong.room.getContent(pong,socket)});

    }
    , asguest: function(pong, socket) {
        var clients = pong.game.clients;
        clients[socket.id].amount = 0;
        clients[socket.id].roomList = {};
        clients[socket.id].isguest = true;
        clients[socket.id].dateentered = new Date();
        pong.room.joinRoom(pong,socket,pong.room.getRoomNameByAmount(0));
        //socket.join(pong.game.ROOMS.HALL);
        this.nbplayers++;
        var pc = this.getPlayerCount(pong);
        pong.log.emit("info-asguest " + pc);
        pong.log.emit('room-updatecurrent');
        socket.emit('room-updatecurrent',clients[socket.id].roomList);
        socket.broadcast.emit('info-playerenterhall', {'name': clients[socket.id].name, 'amount': 0, 'playerCount': pc});
        socket.broadcast.emit('info-roomcontent', {'list':  pong.room.getContent(pong,socket)});
    }
    ,
    findAmount: function(address) {

    },
    playerExists: function(pong, socket,address, password,callb) {
        pong.log.debug("check player exists (" + address + " , " + password+")");
        var bdd = pong.sql.BD();
        var a = {found: false, res: null};
        var query = bdd.query("SELECT * FROM player WHERE address=?", [address], function(err, result) {
            if (err) {
                pong.log.debug("Error select " + err);
                socket.emit('login-wrong', socket.id);

            } else if (result) {
                //pong.log.debug("result exists"+res);
                if (result.length > 0) {
                    pong.log.debug("address exists");
                    for (var i = 0; i < result.length; ++i) {
                        var matchingPlayer = result[i];
                        var bcrypt = require('bcryptjs');
                        if (bcrypt.compareSync(password, matchingPlayer.password)) {
                            pong.log.debug("player exists");
                            a = {found: true, matchingPlayer: matchingPlayer};

                        }

                    }
                } else {
                    pong.log.debug("result length 0");
                }

            }
            callb(a);
        });
        
    }
    ,
    login: function(pong, socket, res) {
        pong.log.debug("Try login");
        //var password=pong.sql.getCryptedPassword(res.password);
        var address = res.address;
        var bdd = pong.sql.BD();
        var query = bdd.query("SELECT * FROM player WHERE address=?", [address], function(err, result) {
            pong.log.debug("q" + address);//
            if (err) {
                pong.log.debug("Error select " + err);
                socket.emit('login-wrong', socket.id);
            } else if (result) {
                if (result.length > 0) {
                    var found = false;
                    for (var i = 0; i < result.length; ++i) {
                        var matchingPlayer = result[i];
                        var bcrypt = require('bcryptjs');
                        if (bcrypt.compareSync(res.password, matchingPlayer.password)) {
                            found = true;
                            pong.log.debug("found");
                            pong.player.loginFromResult(pong, socket, matchingPlayer);
                            break;
                            return;
                        }
                    }
                    if (!found) {
                        pong.log.emit("login-wrong");
                        socket.emit('login-wrong', socket.id);
                    }
                }
            }
        });
        //pong.sql.select("player","address",address,function(res){

        //});
    },
    loginNewPlayer:function(pong,socket,res){
        return this.login(pong,socket,res);
    },
    loginFromResult: function(pong, socket, result) {
        var amch=0;
        if(result.amountcharged) amch=result.amountcharged;
        pong.log.debug(result);
        //CLIENT DEF
        pong.game.clients[socket.id] = {
            "socketid": socket.id,
            "ip": socket.handshake.address,
            "name": result.name,
            "isguest": false,
            "pid": result.id,
            "isLogged":true,
            "amount": amch,
            "address": result.address,
            "country": result.country,
            "room": null,
            "roomList": {},
            "lasttid": null,
            "dateentered": pong.dates.now(),
            "side": null};
        pong.game.nbconnected++;
        pong.log.emit(" login-successful am="+amch);
        pong.room.autoJoinRooms(pong,socket,amch);
        var rL= pong.game.clients[socket.id].roomList;
        pong.log.debug({amount: amch, name: result.name, address: result.address, country: result.country});
        socket.emit('login-successful', {roomList:rL,amount: amch, name: result.name, address: result.address, country: result.country,knownPlayer:true});
        pong.io.sockets.emit('info-playerlogin', {name: result.name});
        socket.emit('info-playercount', pong.player.getPlayerCount(pong));
    },
    loginFromNewPlayer: function(pong, socket, result) {
        pong.log.debug("loginnewplayer");
        pong.log.debug(result);
        //CLIENT DEF
        pong.game.clients[socket.id] = {
            "socketid": socket.id,
            "ip": socket.handshake.address,
            "name": result.name,
            "pid": result.id,
            "address": result.address,
            "country": result.country,
            "isguest": false,
            "isLogged":true,
            "amount": 0,
            "room": null,
            "roomList": {},
            "lasttid": null,
            "dateentered": pong.dates.now(),
            "side": null};
        pong.game.nbconnected++;
        pong.log.emit(" login-successful ");
        pong.room.autoJoinRooms(pong,socket,0);
        socket.emit('login-successful', {roomList:{},amount: 0, name: result.name, address: result.address, country: result.country,knownPlayer:false});
        pong.io.sockets.emit('info-playerlogin', {name: result.name});
        socket.emit('info-playercount', pong.player.getPlayerCount(pong));
    },
    getMe:function(pong,socket){
        return pong.game.clients[socket.id];
    }
    ,
    
    getPlayerCount: function(pong) {
        var n = 0;
        for (var id in pong.game.clients) {
            if (this.isConnected(pong, id)) {
                n++;
            }
        }
        return n;
    },
    getUserCount: function() {
        return this.nbconnected;
    },
    isPlayingLeft: function(pong, socket) {
        return pong.game.clients[socket.id].side === "LEFT";
    }
    ,
    isPlayingRight: function(pong, socket) {
        return pong.game.clients[socket.id].side === "RIGHT";
    },
    disconnect: function(pong, socket) {
        var clients = pong.game.clients;
        var chal = pong.game.chal;
        this.nbconnected--;
        if(clients[socket.id]){
        if (clients[socket.id].amount)
            this.nbplayers--;
        var oppid;
        pong.log.info("DISC Player disconnected ID:" + socket.id + " / " + clients[socket.id].name + "  users remaining");
        pong.io.sockets.emit('info-user-disconnected', {playerCount: this.nbplayers, name: clients[socket.id].name});
        pong.io.sockets.emit('info-playercount', this.getPlayerCount(pong));
        if (clients[socket.id].room) {
            //  var oppid;
            var room = clients[socket.id].room;
            if(room==="HALL"){
            if (socket.id === chal[room].asker)
                oppid = chal[room].asked;
            else if (socket.id === chal[room].asked)
                oppid = chal[room].asker;
            if (clients[oppid].room)
                pong.io.sockets.in(clients[socket.id].room).emit('game-opponentdisconnected', 1);
        }
        }}
    },
    
    
    updatePosition: function(pong, socket, res) {
        var clients = pong.game.clients;
        var chal = pong.game.chal;
        
        if (clients[socket.id].room) {
            var cid = clients[socket.id].room;
            if (chal[cid]) {
                if (clients[socket.id].side === "LEFT") {
                    chal[cid].leftpos = res.y;
                    //  pong.log.debug("Send info to right player "+clients[chal[cid].rightplayerid].name);
                    if (this.isConnected(pong, chal[cid].rightplayerid)){
//                        console.log("em"+res.y);
                        pong.io.sockets.connected[chal[cid].rightplayerid].emit('update-player-left', res.y);
                    }
                } else if (clients[socket.id].side === "RIGHT") {
                    chal[cid].rightpos = res.y;

                    // pong.log.debug("Send info to left player "+clients[chal[cid].leftplayerid].name);
                    if (this.isConnected(pong, chal[cid].leftplayerid)){
//                        console.log("em"+res.y);
                        pong.io.sockets.connected[chal[cid].leftplayerid].emit('update-player-right', res.y);
                    }
                } else {
                    pong.log.err("unknown player side");
                }
            }
        }
   },
    getSimpleProfile: function(client) {
        
        return {id: client.socketid,roomList:client.roomList, date: client.dateentered, name: client.name,isLogged: client.isLogged, country: client.country, amount: client.amount, room: client.room};
    },
   
    challengeDeclined: function(pong, res) {
        var chal = pong.game.chal;
        var clients = pong.game.clients;
        chal[res.cid].status = "DECLINED";
        pong.log.emit(" info-challengedeclined");
        var askerName=clients[chal[res.cid].asker]?clients[chal[res.cid].asker].name:"";
        var askedName=clients[chal[res.cid].asked]?clients[chal[res.cid].asked].name:"";
        
        pong.io.sockets.emit("info-challengedeclined", {'asker': askerName, 'asked': askedName});
        pong.log.emit("challenge-declinedbyopponent" + askedName + " proposed by " + askerName);
        var oppid = chal[res.cid].asked;
        if (this.isConnected(pong, oppid))
            pong.io.sockets.connected[oppid].emit('challenge-informdeclinedbyopponent', {'oppid': chal[res.cid].asked, 'cid': res.cid});

    },
    askingChallenge: function(pong, socket, res) {
        pong.log.debug(" <-- challenge-asking ",res);// + clients[asker].name + " is challenging " + clients[askedid].name + " for " + amount + "BTC...");
        
        var clients = pong.game.clients;
        var chal = pong.game.chal;
        var askedid = res.oppid;
        var asker = socket.id;
        var amount = res.amount;//clients[asker].amount + clients[askedid].amount;
        if(!clients[asker] ){
            pong.log.debug("asker "+asker+" disappeared");
            return;
        }
        if(!clients[askedid] ){
            pong.log.debug("opponent "+askedid+" disappeared");
            socket.emit("challenge-asking-response-oppdisc", { 'askedid': askedid, 'amount': amount});
            return;
        }
        
        pong.log.debug(" <-- challenge-asking " + clients[asker].name + " is challenging " + clients[askedid].name + " for " + amount + "BTC...");
        var dd = new Date();
        var cid = pong.shortid.generate();
        //CHAL DEF
        chal[cid] = {'room': null,
            'asker': asker,
            'chalid': null,
            'leftplayerid': null, 'rightplayerid': null,
            'askerside': null,
            'winningId': null,
            'winnersocketid': null,
            'losersocketid': null,
            'asked': askedid,
            'amount': amount, 'status': 'ASKED', 'date': dd, 'askerready': false, 'askedready': false,
            'leftpos': null, 'rightpos': null, //position du joueur
            'ly': null, 'ry': null,
            'ballx': null, 'bally': null, 'alpha': null,
            'nextx': null, 'nexty': null, 'dura': null, 'score': {left: 0, right: 0},
            //'moves':new Array(),
            'rewardid': null,
            'points': new Array(),
            'n': 0, //current move
            'm': 0 //current point
        }
        if (pong.io.sockets.connected[askedid]) {
            pong.log.emit(" --> challenge-askopponent " + clients[asker].name + " is challenging " + clients[askedid].name + " for " + amount + "BTC...");
            pong.io.sockets.connected[askedid].emit("challenge-askopponent", {'cid': cid, 'amount': amount, 'askername': clients[asker].name, 'date': dd});

            pong.io.sockets.emit("infochallenge", {'askername': clients[asker].name, 'askedname': clients[askedid].name, 'amount': amount});
        } else {
            pong.log.err("challenge-askopponent not existing");

        }
    },
    challengeAccepted: function(pong, socket, res) {
        var clients = pong.game.clients;
        var chal = pong.game.chal;
        chal[res.cid].status = "ACCEPTED";
        var askerSide = pong.game.generateAskerSide();
        //pong.log.debug("askerSide" + askerSide);
        var askedSide = pong.game.getAskedSide(askerSide);
        //pong.log.debug("askedSide" + askedSide);

        if (chal[res.cid].asker === socket.id) {
            pong.log.debug("Client is asker");
            clients[socket.id].side = askerSide;
            clients[chal[res.cid].asked].side = askedSide;
        } else if (chal[res.cid].asked === socket.id) {
            pong.log.debug("Client is asked");
            clients[socket.id].side = askedSide;
            clients[chal[res.cid].asker].side = askerSide;
        } else {
            pong.log.err("identity of player");
        }

        if ((askerSide === "LEFT" && chal[res.cid].asker === socket.id) ||
                askedSide === "LEFT" && chal[res.cid].asked === socket.id) {
            chal[res.cid].leftplayerid = socket.id;
            if (chal[res.cid].asked === socket.id)
                chal[res.cid].rightplayerid = chal[res.cid].asker;
            else
                chal[res.cid].rightplayerid = chal[res.cid].asked;
        }
        else if ((askerSide === "RIGHT" && chal[res.cid].asker === socket.id) ||
                askedSide === "RIGHT" && chal[res.cid].asked === socket.id) {
            chal[res.cid].rightplayerid = socket.id;
            if (chal[res.cid].asked === socket.id)
                chal[res.cid].leftplayerid = chal[res.cid].asker;
            else
                chal[res.cid].leftplayerid = chal[res.cid].asked;
        } else {
            pong.log.err("unknown role");
        }

        pong.game.setNewPoint(pong, res.cid);
        chal[res.cid].askerside = askerSide;
        pong.log.debug("Asker playing on the " + askerSide + ", asked on the " + askedSide);
        pong.io.sockets.emit("infogamestarting", {'amount': chal[res.cid].amount, 'asker': clients[chal[res.cid].asker].name, 'asked': clients[chal[res.cid].asked].name});
        pong.log.emit("--> game-preparing");
        var board = {'left': {'name': clients[chal[res.cid].leftplayerid].name, 'country': clients[chal[res.cid].leftplayerid].country}, 'right': {'name': clients[chal[res.cid].rightplayerid].name, 'country': clients[chal[res.cid].rightplayerid].country}}
        if (this.isConnected(pong, chal[res.cid].asker) && this.isConnected(pong, chal[res.cid].asked)) {
            pong.io.sockets.connected[chal[res.cid].asker].emit('game-preparing', {'side': askerSide, 'cid': res.cid, 'oppid': clients[chal[res.cid].asked], 'board': board});
            pong.io.sockets.connected[chal[res.cid].asked].emit('game-preparing', {'side': askedSide, 'cid': res.cid, 'oppid': clients[chal[res.cid].asker], 'board': board});
        } else {
            pong.log.debug("User disconnected");
            if (this.isConnected(pong, chal[res.cid].asker))
                pong.io.sockets.connected[chal[res.cid].asker].emit('game-challengecanceled');
            if (this.isConnected(pong, chal[res.cid].asked))
                pong.io.sockets.connected[chal[res.cid].asked].emit('game-challengecanceled');
        }
        pong.log.debug("Game about to start between " + clients[chal[res.cid].asker].name + " and " + clients[chal[res.cid].asked].name + " for " + chal[res.cid].amount + "BTC !");
        //computeAndSendNextMove(res.cid);
    },
}