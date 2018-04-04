



Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};
/*
(function() {
  var emit = pong.conn.socket.emit;
  pong.conn.socket.emit = function() {
    console.log('***','emit', Array.prototype.slice.call(arguments));
    emit.apply(pong.conn.socket, arguments);
  };
  var $emit = pong.conn.socket.$emit;
  pong.conn.socket.$emit = function() {
    console.log('***','on',Array.prototype.slice.call(arguments));
    $emit.apply(pong.conn.socket, arguments);
  };
})();
*/
function doEvents(){
pong.conn.socket.on('update-player-left', function(y) {
    
//    var yy = pong.comp.percentToPosition(pong,y, pong.config.padheight);
//    $("#player1-pad").css("top", yy);
    famous.playerTra.set(y);
});
pong.conn.socket.on('update-player-right', function(y) {
    
//    var yy = pong.comp.percentToPosition(pong,y, pong.config.padheight);
//    console.log("update player right"+y+" yy="+yy);
//    $("#player2-pad").css("top", yy);
    famous.player2Tra.set(y);
});

pong.conn.socket.on('game-end-youwin', function(y) {
    pong.game.setStep(pong,pong.game.STEPS.FINISHED);
    pong.log.receive('game-end-youwin');
    pong.game.updateScore(pong,y.score);
    $("#alert-match-youwin").fadeIn(1000, function() {

        $("#panel-game-end-result").html("You won the game !");
        $("#panel-game-end").fadeIn();
        if (y.am > 0) {
            $("#gameend-result-pay").show();
            $("#gameend-result-pay-win").show();
            $("#gameend-result-pay-lost").hide();
            $("#gameend-result-free").hide();
            if(y.reward_hash)
                $("#panel-gameend-pay-win-rewardhash").html("The transaction hash of your reward is <a target='_new' href='https://blockchain.info/fr/tx/"+y.reward_hash+"'>"+y.reward_hash+"</a>.");
            $("#span-gameend-result-win-score").html(y.score.left + "-" + y.score.right);
            $("#span-gameend-result-address").html($("#player-address").val());
        } else {
            $("#span-gameend-result-free").show();
            $("#span-gameend-result-free-win").show();
            $("#span-gameend-result-free-lost").hide();
            $("#span-gameend-result-pay").hide();
        }
    });
});
pong.conn.socket.on('game-end-youlose', function(y) {
    pong.game.setStep(pong,pong.game.STEPS.FINISHED);
    pong.log.receive('game-end-youlost');
    pong.game.updateScore(pong,y.score);
    $("#alert-match-youwin").fadeIn(1000, function() {

        if (y.am > 0) {
            $("#gameend-result-pay").show();
            $("#gameend-result-pay-win").hide();
            $("#gameend-result-pay-lost").show();
            $("#gameend-result-free").hide();
        } else {
            $("#span-gameend-result-free").show();
            $("#span-gameend-result-free-win").hide();
            $("#span-gameend-result-free-lost").show();
            $("#span-gameend-result-pay").hide();
        }

        $("#span-gameend-result-lost-score").html(y.score.left + "-" + y.score.right);

        $("#panel-game-end-result").html("You lost this one...");
        $("#panel-game-end").fadeIn();
    });
});
pong.conn.socket.on('sql-findtransactions', function(y) {
    console.log("--> sql-findtransactions");
    pong.ui.displayTransactions(pong,y);
});
pong.conn.socket.on('sql-findrewards', function(y) {
    console.log("--> sql-findrewards");
    pong.ui.displayRewards(pong,y); 
});
pong.conn.socket.on('point-end-youwin', function(y) {
    pong.config.addLog("Opponent lost the ball: " + y.score.left + "-" + y.score.right);
    console.log("--> point-end-youwin");
//    pong.anim.finishMoveToTheEnd(pong);
    pong.game.prepareNewPoint(pong,y.m + 1);
    pong.game.showPointYouWin(pong,y);
//    setTimeout(animatedCounter(y.m+1),2000);
});
pong.conn.socket.on('point-end-youlose', function(y) {
    pong.config.addLog("You lost the ball: " + y.score.left + "-" + y.score.right);
    console.log("--> point-end-youlose");
    pong.game.prepareNewPoint(pong,y.m + 1);
    pong.game.showPointYouLost(pong,y);
});
pong.conn.socket.on('info-playerrenamed', function(y) {
    pong.config.addLog("Player <span class='playername'>" + y.name + "</span> entered the game");
});
pong.conn.socket.on('info-playerlogin', function(y) {
    pong.config.addLog("Player <span class='playername'>" + y.name + "</span> entered the game");
});
pong.conn.socket.on('login-successful', function(y) {
    console.log("--> login-successful",y);
    pong.conn.loginSuccessful(y);
});
pong.conn.socket.on('rechallenge-info', function(y) {
    pong.log.receive("rechallengeinfo");
    if(y.rechallengeInfo.rechallenge){
        console.log("rechal");
        console.log(y.rechallengeInfo.roomList);
        
        var res="";
        for(var i in y.rechallengeInfo.roomList){
            
            var room=y.rechallengeInfo.roomList[i];
            console.log("rechal"+room);
            var am=pong.game.getRoomAmountFromRoomName(i);
            res+=pong.game.getChallengeButton(am,y.rechallengeInfo.id,"rechallenge");
        }
        res+="<br class='clear'>";
        console.log(res);
        pong.ui.rechallengeinfo.html(res);
        pong.ui.rechallengeinfo.show();
    }else{
        console.log("no rechal");
        pong.ui.rechallengeinfo.hide();    
        pong.ui.rechallengeinfo.html("");  
    }
    
});
pong.conn.socket.on('info-playerenterhall', function(y) {
    console.log("--> info-playerenterhall " +y.name+" "+ y.playerCount);
    pong.game.updatePlayerCount(y.playerCount);
    y.amount > 0 ?
            pong.config.addLog("Player <span class='playername'>" + y.name + "</span> fed the pot with " + y.amount) :
            pong.config.addLog("Player <span class='playername'>" + y.name + "</span> entered as a guest")
            ;
    if (pong.game.step === pong.game.STEPS.HALL)
        pong.game.updatePlayerList(pong);
});
pong.conn.socket.on('info-playercount', function(y) {
    console.log("--> info-playercount ");
    pong.game.updatePlayerCount(y);
});
pong.conn.socket.on('infochallenge', function(y) {
    pong.config.addLog("Player <span class='playername'>" + y.askername + "</span> challenged <span class='playername'>" + y.askedname + "</span> for a " + y.amount + "BTC game");
});
pong.conn.socket.on('info-challengedeclined', function(y) {
    pong.config.addLog("Player <span class='playername'>" + y.asked + "</span> declined game from <span class='playername'>" + y.asker + "</span>");
});
pong.conn.socket.on('infogamestarting', function(y) {
    pong.config.addLog("Game starting between <span class='playername'>" + y.asker + "</span> and <span class='playername'>" + y.asked + "</span> for " + y.amount + "BTC !");
});

pong.conn.socket.on('alert2', function(y) {
    $("#alert3").hide();
    $("#alert2").show();
});
pong.conn.socket.on('alert3', function(y) {
    $("#alert2").hide();
    $("#alert1").show();
});

pong.conn.socket.on('challenge-askopponent', function(y) {
    pong.music.playSound("powerup");
    $("#panel-askedchallenge").fadeIn();
    $("<tr id='tr" + y.cid + "'><td><img class='flag flag-" + y.country + "'/>" + y.askername + "</td><td>" + (y.amount>0?(y.amount+"mBTC"):"FREE") + "</td><td>" + pong.config.printDate(y.date) + "</td><td><input type='button' class='cbutton buttonblue button-askedchallenge-accept' cid='" + y.cid + "'  value='Accept' ></td><td><input  cid='" + y.cid + "' type=\"button\" class=\"cbutton buttonwhite button-askedchallenge-decline\" value=\"Decline\" ></td></tr>").appendTo("#challenger-list tbody");
});

pong.conn.socket.on('info-sendcontent', function(y) {
    console.log("--> info-sendcontent");
    pong.game.displayRoomContent(pong,y.list);
});
pong.conn.socket.on('room-sendcontent', function(y) {
    console.log("--> room-sendcontent");
    console.log(y.list);
    pong.game.displayRoomContent(pong,y.list);
    pong.ui.hideLoadingScreen();
});


pong.conn.socket.on('point-countdown', function(y) {
    //stopBgMusic();
    pong.game.setStep(pong,pong.game.STEPS.GAME);
    pong.music.stopSound("light");
    pong.game.hideScorepanel();
    pong.anim.animatedCounter(pong,y.m);
});

pong.conn.socket.on('challenge-informdeclinedbyopponent', function(y) {
    console.log("--> challenge-informdeclinedbyopponent");
    $("#ch" + y.oppid).val("Declined").prop("disabled", true);

});

pong.conn.socket.on('game-preparing', function(y) {
    console.log("Game starting");
    pong.game.prepareFirstPoint(pong,y);

});


pong.conn.socket.on('challenge-asking-response-oppdisc', function(y) {
   pong.log.debug("opp not resp");
   
   $("input[oppid='"+y.askedid+"']").val("Not responding" );
   pong.ui.hideLoadingScreen();
});
pong.conn.socket.on('info-newuserconnected', function(y) {
    pong.log.receive('info-newuserconnected' +y.playerCount);
    pong.config.addLog("New visitor connected");
    $("#user-count").html(y.playerCount);
});


pong.conn.socket.on('info-user-disconnected', function(y) {
    pong.log.receive("info-user-disconnected" +y.playerCount);
    pong.game.updatePlayerCount(y.playerCount);
    pong.config.addLog((y.name?("Player <span class='playername'>" + y.name + "</span>"):"Visitor")+" left the game");
});
pong.conn.socket.on('login-wrong', function(y) {
    pong.ui.hideLoadingScreen();
    console.log("--> login-wrong");
    
    pong.ui.showWrongLogin(y);
});

pong.conn.socket.on('conn-setnewgid', function(y) {
    
    pong.conn.storeGid(y.gid);
      pong.ui.reconnecting.hide();
});
pong.conn.socket.on('conn-registered', function(y) {
    console.log("--> conn-registered");
    pong.ui.reconnecting.hide();
    
});
pong.conn.socket.on('room-leaved', function(y) {
     console.log("<-- room-permission"+y.allowed);
    if(y.allowed){
         $("#room-select-"+y.asked).removeClass("room-sel-active"); 
    }else{
       alert("You are not allowed to leave this room.");
   }
   pong.ui.updateCurrentHalls(pong,y.roomList);
   pong.game.updatePlayerList(pong);
     pong.ui.hideLoadingScreen();
    });
pong.conn.socket.on('room-permission', function(y) {
    console.log("<-- room-permission"+y.allowed);
    if(y.allowed){
           //$(".room-sel").removeClass("room-sel-active"); 
           if(y.asked==="all"){
            $(".room-sel-authorized").addClass("room-sel-active"); 
        }else{
         $("#room-select-"+y.asked).addClass("room-sel-active"); 
     }
   }else{
       alert("Please feed your account to access the bigger rooms.");
   }
   pong.ui.updateCurrentHalls(pong,y.roomList);
   pong.game.updatePlayerList(pong);
    pong.ui.hideLoadingScreen();
    
});
pong.conn.socket.on('user-connected', function(y) {
    
    pong.conn.sid=y;
    var gid = pong.conn.readGid();
    if(!gid){
        console.log("nogid");
        gid = pong.conn.sid;
        pong.conn.storeGid(gid);
    }else{
        var logged = $.jStorage.get("logged");
        if(logged){
            console.log("islogged");
            if(pong.ui.reconnecting)
            pong.ui.reconnecting.show();
        }
        pong.log.emit("<-- register "+gid);
        pong.conn.emit('register', {old:gid});
        pong.conn.storeGid(pong.conn.sid);
        
    }
    pong.conn.isConnected = true;
    $(".bg").removeClass("bgblack");
    pong.config.setTitle(pong,"[Connected]");
});

pong.conn.socket.on('game-opponentdisconnected', function(y) {
    $("#panel-opponentdisconnected").fadeIn();
    pong.game.setStep(pong,pong.game.STEPS.ENDED);
});
pong.conn.socket.on('player-updateamount', function(y) {
    pong.ui.updateAmount(pong,y.amount);
});


pong.conn.socket.on("room-updatecurrent",function(roomList){  
    pong.ui.updateCurrentHalls(pong,roomList);
    });
pong.conn.socket.on("sql-findpayment-response",function(result){  
      console.log("--> sql-findpayment-response"); 
        pong.game.paymentFound(result);
            
        
    });
    
pong.conn.socket.on("ask-logout-response",function(res){
    pong.ui.afterLogout();
    
        
        pong.ui.hideLoadingScreen();
        
    });
pong.conn.socket.on("ask-feedaccount-response",function(res){
    pong.ui.hideLoadingScreen();
    if(res.error)
        alert("Bad bitcoin address");
    pong.ui.displayFeedAccount(pong,res);
});
pong.conn.socket.on("sql-playeralreadyexists",function(res){
    pong.ui.afterLogin(pong);
});
pong.conn.socket.on("sql-playersaved",function(res){
    pong.game.playerSaved(pong,res);
    });
    
pong.conn.socket.on('move-newmove', function(y) {
    console.log("--> move-newmove (" + y.m + "," + y.n + ")");
    //console.log(y);
    pong.game.points[y.m].moves[pong.game.points[y.m].moves.length  ] = y.move;
    console.log("<-- move-received (" + y.m + "," + y.n + ")");
    pong.conn.emit('move-received', {'n': y.n, 'm': y.m});
});
pong.conn.socket.on('game-challengecanceled', function(y) {
    console.log("--> game-challengecanceled");
    $("#panel-joinroom").fadeIn();
    $("#panel-gameready").fadeOut();
    $(".in-game").fadeOut();
});
pong.conn.socket.on('move-playmove', function(y) {
    console.log("--> move-playmove " + y.m + " " + y.n);
    if (y.n > 0 && pong.game.ballready)
        pong.anim.playLastMove(pong,y.m, y.n);
    else
        pong.game.readyToStart = true;
});

pong.conn.socket.on('role', function(y) {
    pong.player.playerid = y;
    if (pong.player.playerid === 1) {
        $("#player1").html("Player 1 - You ");
    } else if (pong.player.playerid === 2) {
        $("#player2").html("Player 2 - You ");
    } else {

    }
});

}

