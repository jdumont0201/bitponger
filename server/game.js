module.exports = {
    chal: [],
    nbchal: 0,
    clients: [],
    BORDERS: {A: 1, B: 2, C: 3, D: 4},
//var messages = [];
    ROOMS: {HALL: "HALL", HALLGUEST: "HALL0mBTC", HALL1mb: "HALL1mBTC", HALL10mb: "HALL10mmBTC", HALL100mb: "HALL100mmBTC", HALL1b: "HALL1000mBTC", WELCOME: "WELCOME"},
    SIDES: {LEFT: 1, RIGHT: 2},
    generateAskerSide: function() {
        if (Math.random() < 0.5)
            return "LEFT";
        else
            return "RIGHT";
    },
    getAskedSide: function(askerSide) {
        if (askerSide === "RIGHT")
            return "LEFT";
        else
            return "RIGHT";
    },
    checkLostGame: function(pong, room) {

        var chal = this.chal;
        var n = chal[room].n - 1;
        //if(n<0) n=0;
        var m = chal[room].m;
        console.log("checklost with data (" + m + "," + n);
        var g = chal[room].points[m].moves[n];
//        console.log("Checking ("+m+","+n+")");
        if (m > chal[room].points.length - 1)
            console.log("ERR Reach point " + m + " out of " + chal[room].points.length - 1);
        if (n > chal[room].points[m].moves.length - 1)
            console.log("ERR Reach move " + n + " out of " + chal[room].points[m].moves.length - 1);
        if (g.bord === "B") {
            var res = !pong.comp.isPlayerInFrontOfBall(pong, room, this.SIDES.RIGHT, m, n);
//            console.log("  O  LOST Check ("+m+","+n+") bord B "+(res?"OUI":"NON"));
            return res ? this.SIDES.RIGHT : 0;
        } else if (g.bord === "D") {
            var res = !pong.comp.isPlayerInFrontOfBall(pong, room, this.SIDES.LEFT, m, n);
//            console.log("  O  LOST Check ("+m+","+n+") bord D "+(res?"OUI":"NON"));
            return res ? this.SIDES.LEFT : 0;
        } else {
            return 0;
        }
    },
    increaseScore: function(room, loserSide) {
        var chal = this.chal;
        if (loserSide === this.SIDES.LEFT) {
            chal[room].score.right = chal[room].score.right + 1;
        } else if (loserSide === this.SIDES.RIGHT) {
            chal[room].score.left = chal[room].score.left + 1;
        } else {
            console.log("ERR Unknown score");
        }
    },
    getWinnerSide: function(room) {
        var chal = this.chal;
        if (chal[room].score.right > chal[room].score.left)
            return this.SIDES.RIGHT;
        else if (chal[room].score.right < chal[room].score.left)
            return this.SIDES.RIGHT;
        else {
            return null;
            console.log("ERR no winner");
        }
    },
    getPointWinnerSide: function(room) {
        var chal = this.chal;
        if (chal[room].score.right > chal[room].score.left)
            return this.SIDES.RIGHT;
        else if (chal[room].score.right < chal[room].score.left)
            return this.SIDES.RIGHT;
        else {
            return null;
            console.log("ERR no winner");
        }
    },
    isEndGame: function(pong, room) {
        var chal = this.chal;
        return(chal[room].score.right + chal[room].score.left >= pong.config.MAX_POINTS_PER_GAME);
    }
    , switchNewPoint: function(room) {
        var chal = this.chal;
        console.log("____ Switch new point (" + chal[room].m + "," + chal[room].n + ") --> (" + (chal[room].m + 1) + "," + 0 + ")");
        //chal[clients[socket.id].room].points[chal[room].m].moves=new Array();
        chal[room].m = chal[room].m + 1;
        chal[room].n = 0;
    },
    setNewPoint: function(pong, cid) {
        var chal = this.chal;
        //console.log("NEW Setting new point " + cid);
        var alpha = pong.comp.generateStartAngle();
        //console.log("NEW startAngle" + alpha);
        var m = chal[cid].m;
        chal[cid].alpha = alpha;
        chal[cid].ballx = pong.config.W / 2;
        chal[cid].bally = pong.config.H / 2;
        chal[cid].points[m] = {'moves': new Array()};
        chal[cid].points[m].moves[0] = new pong.comp.Move(0, 0.5, 0.5, null, null, null, false, false, alpha, false, false, null, null, null, null);
    }

    , setChallengeStatus: function(cid, u) {
        this.chal[cid].status = u;
    }
    , acknowledgeMove: function(pong, socket) {
        var clients = this.clients;
        var room = clients[socket.id].room;
        var chal = this.chal;

        var n = chal[room].n;
        var m = chal[room].m;
        //console.log("Ack move (" + m + "," + n + ") from " + clients[socket.id].name);

        if (clients[socket.id].side === "LEFT") {
            chal[room].points[m].moves[n].leftack = true;
        } else if (clients[socket.id].side === "RIGHT") {
            chal[room].points[m].moves[n].rightack = true;
        } else
            console.log("Error");
        //console.log(chal[room].moves[chal[room].n].leftack);

    },
    acknowledgePlayed: function(socket) {
        var chal = this.chal;
        var clients = this.clients;
        var room = clients[socket.id].room;
        if (chal[room]) {
            var n = chal[room].n - 1;
            var m = chal[room].m;
            // console.log("Ack played ("+m+","+n+") from "+clients[socket.id].name);
            if (clients[socket.id].side === "LEFT") {
                if (chal[room].points[m].moves[n]) {
                    chal[room].points[m].moves[n].leftplayedack = true;
                }
            } else if (clients[socket.id].side === "RIGHT") {
                if (chal[room].points[m].moves[n]) {
                    chal[room].points[m].moves[n].rightplayedack = true;
                }
            } else {
                console.log("Error");
            }
        }

    }
    , acknowledgePosition: function(pong, socket, pos) {
        var chal = this.chal;
        var clients = this.clients;
        var room = clients[socket.id].room;
        var n = chal[room].n - 1;
        var m = chal[room].m;
        if (chal[room].points[m].moves[n]) {
            if (pong.player.isPlayingLeft(pong, socket)) {
                chal[room].points[m].moves[n].leftpos = pos;
                //   console.log("Ack position ("+m+","+n+") from left "+clients[socket.id].name+"pos="+pos);

            } else if (pong.player.isPlayingRight(pong, socket)) {
                //   console.log("Ack position ("+m+","+n+") right "+clients[socket.id].name+"pos="+pos);

                chal[room].points[m].moves[n].rightpos = pos;
            } else
                console.log("Error");
        } else {
            console.log("Error move[m] at acknoledge position m=" + m);
        }
    },
    roomExists: function(room) {
        return this.chal[room];
    }
    ,
    isMoveReceivedByAll: function(socket) {
        var room = this.clients[socket.id].room;
        var chal = this.chal;
        return chal[room].points[chal[room].m].moves[chal[room].n].leftack && chal[room].points[chal[room].m].moves[chal[room].n].rightack;
    }
    ,
    isMovePlayedByAll: function(socket) {
        var chal = this.chal;
        var room = this.clients[socket.id].room;
        var n = chal[room].n - 1;
        var m = chal[room].m;

        return chal[room].points[m].moves[n].leftplayedack && chal[room].points[m].moves[n].rightplayedack;
    }
    ,
    getRoomNameFromCid: function(cid) {
        return cid;
    },
    getCurrentGame: function(room) {
        var chal = this.chal;
        return chal[room].points[chal[room].m].moves[chal[room].n];
    },
    playerReady: function(pong, socket, cid) {
        var clients = this.clients;
        var chal = this.chal;


        var room = this.getRoomNameFromCid(cid);
        pong.room.joinPlayingRoom(pong, socket, room);
        this.setChallengeStatus(cid, "WAITINGFROPLAYERS");
        console.log("Player " + clients[socket.id].name + " entered playing room " + cid);
        if (chal[cid].asker === socket.id) {
            chal[cid].askerready = true;
        }
        else if (chal[cid].asked === socket.id) {
            chal[cid].askedready = true;
        }
        if (chal[cid].askedready && chal[cid].askerready) {
            pong.sql.saveGame(pong, cid);
            this.setChallengeStatus(cid, "GAMESTARTING");
            console.log("!!! Game " + room + " starting");
            console.log(" --> point-countdown");
            pong.io.sockets.in(room).emit('point-countdown', {'m': 0});
            this.computeAndSendNextMove(pong, cid);
        }
    },
    sendNewMove: function(pong, cid) {
        var clients = this.clients;
        var chal = this.chal;
        var room = this.getRoomNameFromCid(cid);
        console.log(" <-- move-newmove (" + chal[cid].m + "," + chal[cid].n + ")");
        pong.io.sockets.in(room).emit('move-newmove', {n: chal[cid].n, 'm': chal[cid].m, 'move': chal[cid].points[chal[cid].m].moves[chal[cid].n]});
    }
    ,
    computeAndSendNextMove: function(pong, cid) {
        var chal = this.chal;
        pong.comp.computeNextMove(pong, cid);
        this.sendNewMove(pong, cid);
    }
    ,
    movePlayed: function(pong, socket, y) {
        var clients = this.clients;
        var chal = this.chal;

        var room = clients[socket.id].room;
        if (this.roomExists(room)) {
            this.acknowledgePlayed(socket);
            this.acknowledgePosition(pong, socket, y.pos);
            var n = y.n;//chal[room].n; 
            var m = y.m;//chal[room].m; 
            //if(n<0) n=0;
            var g = chal[room].points[m].moves[n];

            if (this.isMovePlayedByAll(socket)) {
                console.log("Move played by all");

                //console.log("Checking lost (" + m + "," + n + ") BORD " + g.bord);
                var isLost = false;
                //console.log("LOST before check for move "+n+" bord"+g.bord);
                //var isConcerned=(g.bord==="B" && clients[socket.id].side==="RIGHT") || (g.bord==="D" && clients[socket.id].side==="LEFT");
                var isConcerned = (g.bord === "B" || g.bord === "D");
                if (isConcerned) {
//                    console.log("Analyze (" + m + "," + n + ")");
//                console.log(g);

                    var loserSide = this.checkLostGame(pong, room);
                    isLost = loserSide > 0;
                } else {
//                console.log("Analyze ("+m+","+n+") "+clients[socket.id].name+" not concerned bord"+g.bord+" bec "+clients[socket.id].side);
                }

                if (!isLost) {
                    if (pong.config.changeAngleAtBounce && isConcerned) {
//                        pong.log.debug("change angle at bounce ("+m+","+(n));
                        var originalAngle = pong.game.chal[room].points[m].moves[n + 1].alpha;
//                         console.log("original angle ("+m+","+n+")");
                        var concernedSide = null;
                        var gg = chal[room].points[m].moves[n];
                        if (gg.bord === "B")
                            concernedSide = pong.game.SIDES.RIGHT;
                        else if (gg.bord === "D")
                            concernedSide = pong.game.SIDES.LEFT;
//                         console.log("side from ("+m+","+(n)+")="+concernedSide);

                        var angle = pong.comp.recomputeTouchedAngle(pong, concernedSide, originalAngle, room, m, n);
//                            console.log("store new angle ("+m+","+(n+1)+")");
                        pong.game.chal[room].points[m].moves[n + 1].alpha = angle;
                        //pong.game.nint = pong.game.nint + 1;
                        pong.comp.computeNextMove(pong, room);


                    }

                    this.sendNewMove(pong, room);
                } else {
//                console.log("Point is lost");
                    this.increaseScore(room, loserSide);
                    var isPlayingLeft = pong.player.isPlayingLeft(pong, socket);
                    var isPlayingRight = pong.player.isPlayingRight(pong, socket);

                    if (this.isEndGame(pong, room)) {
//                    console.log("Endgame");
                        var winningSide = this.getWinnerSide(room);

//                    console.log("Winner side "+winningSide);
                        if ((isPlayingLeft && winningSide === this.SIDES.LEFT) || (isPlayingRight && winningSide === this.SIDES.RIGHT)) {
                            console.log("iwin mysocket");
                            chal[room].winnersocketid = socket.id;
                            var loosersocketid;
                            if (isPlayingLeft)
                                chal[room].losersocketid = clients[chal[room].rightplayerid].socketid;
                            else if (isPlayingRight)
                                chal[room].losersocketid = clients[chal[room].leftplayerid].socketid;
                            var res = this.closeGame(pong, socket, room, function(res) {
                                console.log("emit youwin/lose");
                                socket.emit('game-end-youwin', {'am': chal[room].am, 'm': chal[room].m, 'score': chal[room].score, 'reward_hash': res.reward_hash});

                                pong.io.sockets.connected[chal[room].losersocketid].emit('game-end-youlose', {'am': chal[room].am, 'm': chal[room].m, 'score': chal[room].score});
                            });
                        } else if ((isPlayingLeft && winningSide === this.SIDES.RIGHT) || (isPlayingRight && winningSide === this.SIDES.LEFT)) {
                            if (isPlayingLeft)
                                chal[room].winnersocketid = clients[chal[room].rightplayerid].socketid;
                            else if (isPlayingRight)
                                chal[room].winnersocketid = clients[chal[room].leftplayerid].socketid;
                            else {
                                console.log("ERR no winnerd");
                            }
                            var res = this.closeGame(pong, socket, room, function(res) {
                                console.log("emit youwin/lose");
                                pong.io.sockets.connected[chal[room].winnersocketid].emit('game-end-youwin', {'am': chal[room].am, 'm': chal[room].m, 'score': chal[room].score, 'reward_hash': res.reward_hash});
                                socket.emit('game-end-youlose', {'am': chal[room].am, 'm': chal[room].m, 'score': chal[room].score});
                            });

                        } else {
                            console.log("ERR computing winner");
                        }
                        console.log("winner" + chal[room].winnersocketid);

                    } else {
                        console.log(" <-- point-end-youwin/lost");
                        if ((g.bord === "B" && isPlayingRight) || (g.bord === "D" && isPlayingLeft)) {
                            socket.broadcast.emit('point-end-youwin', {'m': chal[room].m, 'score': chal[room].score});
                            socket.emit('point-end-youlose', {'m': chal[room].m, 'score': chal[room].score});
                        } else if ((g.bord === "D" && isPlayingRight) || (g.bord === "B" && isPlayingLeft)) {
                            socket.emit('point-end-youwin', {'m': chal[room].m, 'score': chal[room].score});
                            socket.broadcast.emit('point-end-youlose', {'m': chal[room].m, 'score': chal[room].score});
                        } else {
                            console.log("Error point lost but no winner" + g.bord + " " + (isPlayingRight ? "right" : "no") + " " + (isPlayingLeft ? "LEFT" : "no"));

                        }


                        console.log("*************************************************");
                        this.switchNewPoint(room);
                        this.setNewPoint(pong, room);
                        this.computeAndSendNextMove(pong, room);
                    }
                }
            } else {
                console.log("Waiting for other player");
            }
        } else {
            console.log("ENDED room does not exist");
        }
        //sendPlayMove(clients[socket.id].room);
    },
    setWinnerSocketId: function(pong, room) {
    },
    sendPlayMove: function(pong, cid) {
        var room = this.getRoomNameFromCid(cid);
        var chal = pong.game.chal;
        console.log("--------------------------------------------------------------------------------");
        console.log(" --> move-playmove (" + chal[cid].m + "," + chal[cid].n + ")");
        pong.io.sockets.in(room).emit('move-playmove', {"m": chal[cid].m, "n": chal[cid].n});
        // computeAndSendNextMove(cid);
        this.switchNewMove(room);
    }
    ,
    switchNewMove: function(room) {
        var chal = this.chal;
        console.log("____ Switch new move (" + chal[room].m + "," + chal[room].n + ") ->" + "(" + chal[room].m + "," + (chal[room].n + 1) + ")");

        chal[room].n = chal[room].n + 1;
    }
    , moveReceived: function(pong, socket) {
        var chal = this.chal;
        var clients = this.clients;
        var room = clients[socket.id].room;

        if (this.roomExists(room)) {
            this.acknowledgeMove(pong, socket);
            if (this.isMoveReceivedByAll(socket)) {
                //console.log("Move received by all");
                this.sendPlayMove(pong, clients[socket.id].room);
                pong.comp.computeNextMove(pong, clients[socket.id].room);
            }
        } else {
            console.log("ENDED room does not exist");
        }
    },
    getRoom: function(room) {
        if (room in this.chal) {
            return this.chal[room];
        }
    },
    getRoomAmount: function(room) {
        return   this.chal[room].amount;
    },
    getRewardAmount: function(pong, room) {
        return this.chal[room].amount * pong.config.rewardShare;
    },
    getOpponent: function(pong, socket, room) {
        if (pong.game.chal[room]) {
            if (socket.id === pong.game.chal[room].leftplayerid)
                return pong.game.clients[pong.game.chal[room].rightplayerid];
            else if (socket.id === pong.game.chal[room].rightplayerid)
                return pong.game.clients[pong.game.chal[room].leftplayerid];
            else {
                pong.log.err("No opponent");
                return null;
            }
        } else {
            pong.log.err("No opponent chal room");
            return null;
        }
    }
    , closeGame: function(pong, socket, room, callb) {
        console.log("Close game");
        pong.sql.saveGameEnd(pong, room);

        var opp = this.getOpponent(pong, socket, room);
        console.log(opp);
        var rechallengeInfo = null;
        if (opp) {
            var oppRoomList = opp.roomList;

            rechallengeInfo = {
                id: opp.socketid,
                roomList: oppRoomList,
                rechallenge: true
            };

        } else {
            rechallengeInfo = {
                id: null,
                roomList: null,
                rechallenge: false
            };
        }
        console.log("RI");
        console.log(rechallengeInfo);

        pong.io.sockets.in(room).emit('rechallenge-info', {'rechallengeInfo': rechallengeInfo});
        if (this.chal[room].amount > 0) {
            console.log("Close pay game");
            pong.sql.saveReward(pong, room);
            //pong.bitcoin.rewardPlayer(pong, room);
            var res = pong.bitcoin.rewardPlayer(pong, room, callb);
        } else {
            console.log("Close free game");
            //this.chal[room].amount=1;
            //pong.sql.saveReward(pong, room);
            //var res=pong.sql.rewardPlayer(pong, room,callb);
            callb({reward_hash: null});
        }
        pong.game.clients[pong.game.chal[room].leftplayerid].room = null;
        pong.game.clients[pong.game.chal[room].rightplayerid].room = null;

        this.setChallengeStatus(room, "CLOSED");
    }
};
