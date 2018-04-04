module.exports = {
    getContent: function(pong, socket) {
        var clients = pong.game.clients;
        var cocli = new Object();
        cocli = {};
        for (var id in clients) {
            console.log(pong.io.sockets.in(clients[id].room));
            if (pong.player.isConnected(pong, id)) {
                //if(clients[id].socketid!==socket.id)
                cocli[clients[id].socketid] = pong.player.getSimpleProfile(clients[id]);
            }
        }
        pong.log.debug(cocli);
        return cocli;
    },
    askRoomContent: function(pong, socket) {
        pong.log.emit("room-sendcontent to " + pong.game.clients[socket.id].name);
        socket.emit('room-sendcontent', {'list': this.getContent(pong, socket)});
    }   
    ,
    getRoomAmountByName:function(n){
        var v=n.substring(4);
        return parseInt(v.substring(0,v.length-4));
    }
    , getRoomSize: function(pong) {
        pong.log.debug("GET ROOM SIZE");
        var clients = pong.game.clients;
        //ar cocli = new Array();
        var cocli = new Object();
        cocli = {};
        pong.log.debug(pong.config.AMOUNTS);
        pong.log.debug("Rsize");
        for (var am in pong.config.AMOUNTS) {
            cocli[pong.config.AMOUNTS[am]] = 0;
        }
        pong.log.debug(cocli);
        for (var id in clients) {
            if (pong.player.isConnected(pong, id)) {
                console.log("cli"+id);
                for(var i=0;i<clients[id].roomList;++i){
                    
                    var am=this.getRoomAmountByName(clients[id].roomList[i]);
                console.log("cli"+id+" room "+am);
                    cocli[am]++;
                
                }
            }
        }
        
        pong.log.debug(cocli);
        return cocli;
    }
    ,
    getRoomNameByAmount: function(am) {
        return "HALL" + am + "mBTC";
    },
    autoJoinRooms: function(pong, socket, am) {
        for (var i = 0; i < pong.config.AMOUNTS.length; ++i) {
            var a = pong.config.AMOUNTS[i];
            if (a <= am)
                this.joinRoom(pong, socket, this.getRoomNameByAmount(a));
        }
    },
    joinRoom: function(pong, socket, room) {
        pong.log.debug("joinroom " + room);
        //socket.leave(pong.game.ROOMS.HALL);
        socket.join(room);
        //pong.game.clients[socket.id].room = room;
        pong.game.clients[socket.id].roomList[room] = true;
        pong.log.debug("add: roomlist=");
        pong.log.debug(pong.game.clients[socket.id].roomList);

    },
    leaveRoom: function(pong, socket, room) {
        pong.log.debug("leave" + room + " roomlist=");
        socket.leave(room);
        delete pong.game.clients[socket.id].roomList[room];
        pong.log.debug(pong.game.clients[socket.id].roomList);
    },
    joinPlayingRoom: function(pong, socket, room) {
        pong.log.debug("joinroom " + room);
        //socket.leave(pong.game.ROOMS.HALL);
        socket.join(room);
        pong.game.clients[socket.id].room = room;


    },
    leavePlayingRoom: function(pong, socket, room) {
        pong.log.debug("leave" + room);
        //socket.leave(pong.game.ROOMS.HALL);
        socket.leave(room);


    }, permissionLeaveRoom: function(pong, socket, size) {
        pong.log.debug("leaveroom HALL" + size + "mBTC");
        this.leaveRoom(pong, socket, "HALL" + size + "mBTC");
        return {allowed: true, asked: size, roomList: pong.game.clients[socket.id].roomList};
    },
    askPermissionEnterRoom: function(pong, socket, size) {
        pong.log.debug("askPermissionEnterRoom HALL" + size + "mBTC");
        var am = pong.game.clients[socket.id].amount;
        if (size === "all") {
            size = 0;
            for (var ind in this.AMOUNTS) {
                var si = this.AMOUNTS[ind];
                if (si <= am) {
                    this.joinRoom(pong, socket, "HALL" + si + "mBTC");
                }
            }
            return {allowed: true, asked: "all", amount: am, roomList: pong.game.clients[socket.id].roomList};
        } else {

            if (size <= am) {
                pong.log.debug("allowed");
                this.joinRoom(pong, socket, "HALL" + size + "mBTC");
                return {allowed: true, asked: size, amount: am, roomList: pong.game.clients[socket.id].roomList};
            } else {
                return {allowed: false, asked: size, amount: am, roomList: pong.game.clients[socket.id].roomList};
            }
        }
    }
    ,
}