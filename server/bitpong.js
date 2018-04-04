var sql = require('./sql');
var dates = require('./dates');
var config = require('./config');
var comp= require('./comp');
var log= require('./log');
var room= require('./room');
var game= require('./game');
var bitcoin= require('./bitcoin');
var player= require('./player');
var pong= require('./pong');

var bcrypt = require('bcryptjs');
var http = require('http');
var request = require("request")
var port = 8080;
var fs = require('fs');
var shortid = require('shortid');
var io = require('socket.io');


var app = http.createServer(function(req, res) {
    fs.readFile('/web/bitpong/client/html.html', 'utf-8', function(error, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    });
});

app.on('connection', function(conn) {
    conn.id = shortid.generate();
    conn.on('data', function(data) {
        conn.write('ID: ' + conn.id);
        //pong.log.debug('CONN Server Id: ' + conn.id);
    });
});
io = io.listen(app);

io.sockets.on('connection', function(socket) {
    
    pong.init(sql,dates,config,comp,game,player,io,shortid,request,bitcoin,log,room);
    pong.player.newConnection(pong,socket);
    
    socket.on('game-playerready', function(cid) {
        pong.log.debug(" <-- game-playerready from "+game.clients[socket.id].name);
        game.playerReady(pong,socket,cid);
    }); 
    
    
    socket.on('player-feed', function(am) {
        pong.log.receive("player-feed" +game.clients[socket.id].name + " has paid " + am);
        player.feed(pong,socket,am);
    });
    socket.on('ask-feedaccount', function() {
        pong.log.receive("ask-feedaccount");
        var to=pong.game.clients[socket.id].address;
        var amount=pong.game.clients[socket.id].amount;
        pong.bitcoin.generateBitcoinFundAddress(pong,socket,function(res){
            
            pong.log.emit("account-feed");
            socket.emit("ask-feedaccount-response",{destinationAddress:res.temporaryDestinationAddress,error:res.error,errormsg:res.errormsg,to:to,amount:amount});
        });
        
    });
    socket.on('ask-logout', function(y) {
        pong.log.receive("ask-logout");
        pong.game.clients[socket.id]=pong.player.generateNewClientInfo(pong,socket);
        socket.emit("ask-logout-response");
    });
    socket.on('room-askpermission', function(y) {
        pong.log.receive("room-askpermission");
        var res=room.askPermissionEnterRoom(pong,socket,y.size);
        pong.log.emit("room-permission");
        socket.emit("room-permission",res);
        
    });
    socket.on('room-leaveroom', function(y) {
        pong.log.receive("room-leaveroom");
        var res=room.permissionLeaveRoom(pong,socket,y.size);
        pong.log.emit("room-leaved");
        socket.emit("room-leaved",res);
        
    });
    socket.on('player-asguest', function() {
        pong.log.receive("player-asguest");
        pong.log.debug(game.clients[socket.id].name +" enters as a guest");
        player.asguest(pong,socket);
    });
    socket.on('sql-asklogin', function(res) {
        pong.log.receive("ask-login");
        player.login(pong,socket,res);
    });
    /* socket.on('room-asksize', function() {
        pong.log.receive("room-asksize");
        player.room-asksize(pong,socket); 
    });*/
    
    socket.on('sql-findpayment', function(y) {
        pong.log.receive("sql-findpayment");
        sql.findPayment(pong,socket);
    });
    socket.on('register', function(y) {
        pong.log.info("register old "+y.old+" for "+socket.id);
        var oldsid=y.old;
          //console.log("IS OLD C"+((oldsid in pong.io.sockets.connected)?"oui":"non"));
          //console.log("IS NEW C"+((socket.id in pong.io.sockets.connected)?"oui":"non"));
        if(pong.game.clients[oldsid]){
            pong.log.debug("    old client"+oldsid+" recognised");
            pong.game.clients[socket.id]=pong.game.clients[oldsid];
            pong.game.clients[socket.id].socketid=socket.id;
            delete pong.game.clients[oldsid];
            
//            console.log("clients");
  //          console.log(pong.game.clients);
//            pong.log.debug(pong.game.clients);
        if(pong.game.clients[socket.id].roomList.length>0){
//            pong.log.debug("update room");
            for(var i=0;i<pong.game.clients[socket.id].roomList.length;++i)
                pong.room.joinRoom(pong.game.clients[socket.id].roomList[i]);
        }
            if(pong.game.clients[socket.id].isLogged){
                pong.log.emit("conn-registered");
                socket.emit('conn-registered', {gid:socket.id});
                var currentPlayer=pong.game.clients[socket.id];
                pong.log.emit("login-successful");
                //socket.emit('conn-setnewgid', {gid:socket.id});
                socket.emit('login-successful',
                {roomList:currentPlayer.roomList,amount:currentPlayer.amount ,
                    name: currentPlayer.name, address: currentPlayer.address, knownPlayer:true,
                    country: currentPlayer.country});
                
                if(pong.game.clients[socket.id].room ){
                    if(pong.game.clients[socket.id].room==="HALL"){
                    var ch=pong.game.chal[pong.game.clients[socket.id].room];
                    if(ch.asker===oldsid) ch.asker=socket.id;
                    if(ch.asked===oldsid) ch.asked=socket.id;
                    if(ch.leftplayerid===oldsid) ch.leftplayerid=socket.id;
                    if(ch.rightplayerid===oldsid) ch.rightplayerid=socket.id;
                    pong.log.emit("game-restore");
                    socket.emit('game-restore', {chal:ch});
                }
                }
            }else{
                pong.log.emit("conn-registered not logged");
                socket.emit('conn-registered', {gid:socket.id});
            }
        }else{
                pong.log.err("try register"+oldsid+" but non existing");   
                    socket.emit('conn-setnewgid', {gid:socket.id});
        }
    });
    socket.on('sql-savenewplayer', function(y) {
        pong.log.receive("sql-savenewplayer");
        sql.saveNewPlayer(pong,socket,y);
        
    });
    
    
    socket.on('move-received', function(y) {
        pong.log.emit("move-received ("+y.m+","+y.n+") by "+game.clients[socket.id].name);
        game.moveReceived(pong,socket);
    });
    
    socket.on('move-moveplayed', function(y) {
        pong.log.receive("move-moveplayed ("+y.m+","+y.n+") by "+game.clients[socket.id].name);
        game.movePlayed(pong,socket,y);
    });
    

    
    socket.on('ask-findtransactions', function(res) {
        pong.log.receive("ask-findtransactions");
        var res=pong.sql.findTransactionsFromPlayer(pong,socket,function(res){
            pong.log.emit("sql-findtransactions");
            var u={address:pong.game.clients[socket.id].address,transactions:res};
            pong.log.debug(u);
            socket.emit("sql-findtransactions",u);
        });
        
    });
    
    socket.on('ask-findrewards', function(res) {
        pong.log.receive("ask-findrewards"); 
        var res=pong.sql.findRewardsFromPlayer(pong,socket,function(res){
            pong.log.emit("sql-findrewards");
            var u={address:pong.game.clients[socket.id].address,rewards:res};
            pong.log.debug(u);
            socket.emit("sql-findrewards",u);
        });
        
    });
    
    socket.on('challenge-accepted', function(res) {
        pong.log.receive("challenge-accepted");
        player.challengeAccepted(pong,socket,res);
    });
    
    socket.on('challenge-asking', function(res) {
        pong.log.receive("challenge-asking");
        player.askingChallenge(pong,socket,res);
    });

    socket.on('ask-rechallenge', function(res) {
        
    });

    socket.on('challenge-cancel', function() {
        pong.log.receive("challenge-cancel");
        var room=pong.game.clients[socket.id].room;
        io.sockets.in(room).emit('game-challengecanceled');
        game.clients[socket.id].room=null;
        
    });
    
    socket.on('challenge-declined', function(res) {
        pong.log.receive("challenge-declined");
        player.challengeDeclined(pong,res);
    });
    
    socket.on('room-askcontent', function() {
        pong.log.emit("room-askcontent"+(game.clients[socket.id]?game.clients[socket.id].name:"") + " asking for room content");
        room.askRoomContent(pong,socket);
    });
    
    socket.on('game-returnroom', function() {
        pong.log.emit("game-returnroom"); 
        game.clients[socket.id].room=null;
    });

    
    socket.on('update-game-player', function(res) {
        player.updatePosition(pong,socket,res);
    });

 socket.on('reconnect', function() {
        pong.log.debug("RECO Player reconnected ID:" + socket.id+" / "+game.clients[socket.id].name+"  users remaining");
    });
    socket.on('disconnect', function() {
        player.disconnect(pong,socket);
    });
    

});

app.listen(port);
console.log('************************************************\n\**                                            **\n\**                                            **\n\**                    BITPONG                 **\n\**                                            **\n\**                                            **\n\************************************************\n\n');
console.log('BitPong running on ' + port + '...');
