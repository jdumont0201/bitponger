var points = new Array();

var isProgressed = false;
var s = null;
var socket;
socket = io.connect();
var c = null;
var connected = false;
var RETRY_INTERVAL = 10000;
var timeout;
var padheight = $("#player1-pad").height();
var padwidth = 10;
var halfpadheight = padheight / 2;
var content = $(".content");
var padoffset = 5;
var centerscreenx = W / 2;
var centerscreeny = H / 2;
var R = 30;
var alpha = 0.1;
var readyToStart = false
var nextBord = "A";

var lastBord = "";
var speed = 1;
var N = 10;
var engine = "GSAP";
var STEPS = {WELCOME: 1, CONFIG: 2, HALL: 3, COURT: 4, GAME: 5, ENDED: 6};
var TOUCH = {RETURNED: 1, BOUNCE: 2, WATCH: 3, LOST: 4};
var SIDES = {LEFT: 1, RIGHT: 2};
var step = STEPS.WELCOME;
var side = "";
var toplay = false;
var vs = 1;
var nextmove = true;

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};
function addLog(logm) {
    var d = printDate(new Date());
    $("#bglog1").html($("#bglog2").html());
    $("#bglog2").html(d + " " + logm);
    $("<div class='logline'>" + d + " " + logm + "</div>").appendTo("#log-in");
    $("#log-in").scrollTop($("#log")[0].scrollHeight);
}
function printDate(ladate) {
    ladate = new Date(Date.parse(ladate));
    var h = ladate.getHours();
    if (h < 10)
        h = "0" + h;
    var m = ladate.getMinutes();
    if (m < 10)
        m = "0" + m;
    var s = ladate.getSeconds();
    if (s < 10)
        s = "0" + s;

    return h + ":" + m + ":" + s
}
function initGame() {
    setStep(STEPS.WELCOME);
    centerBall();
}
function setStep(a) {
    console.log("Enter step " + a);
    step = a;
    changeBgMusic(a);
}
/**************************************************************
 *                  PLAYER POSITION
 */

function sendPositionToServer() {
    var y = getPlayerPositionPercent();

    socket.emit('update-game-player', {'y': y});
    return false;
}

function movePlayer(y) {
    if (step === STEPS.WELCOME || step === STEPS.GAME || step === STEPS.COURT) {
        var pid = parseInt($("#pid").val());
        //alert(pid);
        if (pid === 0) {
            //alert(event.pageY - 80);
            $("#player1-pad").css("top", y - $("#player1-pad").height() / 2);
            $("#horline").css("top", y);
        } else if (pid === 1) {
            $("#player1-pad").css("top", y - $("#player1-pad").height() / 2);
            $("#horline").css("top", y);
            sendPositionToServer();
        } else if (pid === 2) {
            $("#player2-pad").css("top", y - $("#player2-pad").height() / 2);
            $("#horline").css("top", y);
            sendPositionToServer();
        }
    }
}

var playerid = -1;

socket.on('update-player-left', function(y) {
    //console.log("update player left"+y);
    var yy = percentToPosition(y, $("#player1-pad").height());
    $("#player1-pad").css("top", yy);
});
socket.on('update-player-right', function(y) {
    //console.log("update player right"+y);
    var yy = percentToPosition(y, $("#player2-pad").height());
    $("#player2-pad").css("top", yy);
});
function updateScore(score, callb, num) {
    $("#playerinfo-score-right").html(score.right);
    $("#playerinfo-score-left").html(score.left);
    showScorepanel(score.left, score.right, callb, num);
}

socket.on('game-end-youwin', function(y) {
    updateScore(y.score);
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
socket.on('game-end-youlose', function(y) {
    updateScore(y.score);
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
socket.on('point-end-youwin', function(y) {
    addLog("Opponent lost the ball: " + y.score.left + "-" + y.score.right);
    console.log("--> point-end-youwin");
    prepareNewPoint(y.m + 1);
    showPointYouWin(y);
//    setTimeout(animatedCounter(y.m+1),2000);
});
socket.on('point-end-youlose', function(y) {
    addLog("You lost the ball: " + y.score.left + "-" + y.score.right);
    console.log("--> point-end-youlose");
    prepareNewPoint(y.m + 1);
    showPointYouLost(y);
//    setTimeout(animatedCounter(y.m+1),2000);
});
socket.on('info-playerrenamed', function(y) {
    addLog("Player <span class='playername'>" + y.name + "</span> entered the game");
});
function updatePlayerCount(n) {
    $("#user-count").html(n);
}
socket.on('info-playerenterhall', function(y) {
    console.log("--> info-playerenterhall " +y.name+" "+ y.playerCount);
    updatePlayerCount(y.playerCount);
    y.amount > 0 ?
            addLog("Player <span class='playername'>" + y.name + "</span> fed the pot with " + y.amount) :
            addLog("Player <span class='playername'>" + y.name + "</span> entered as a guest")
            ;
    if (step === STEPS.HALL)
        updatePlayerList();
});
socket.on('info-playercount', function(y) {
    console.log("--> info-playercount ");
    updatePlayerCount(y);
});
socket.on('infochallenge', function(y) {
    addLog("Player <span class='playername'>" + y.askername + "</span> challenged <span class='playername'>" + y.askedname + "</span> for a " + y.amount + "BTC game");
});
socket.on('info-challengedeclined', function(y) {
    addLog("Player <span class='playername'>" + y.asked + "</span> declined game from <span class='playername'>" + y.asker + "</span>");
});
socket.on('infogamestarting', function(y) {
    addLog("Game starting between <span class='playername'>" + y.asker + "</span> and <span class='playername'>" + y.asked + "</span> for " + y.amount + "BTC !");
});

socket.on('alert2', function(y) {
    $("#alert3").hide();
    $("#alert2").show();
});
socket.on('alert3', function(y) {
    $("#alert2").hide();
    $("#alert1").show();
});

socket.on('challenge-askopponent', function(y) {
    playSound("powerup");
    $("#panel-askedchallenge").fadeIn();
    $("<tr id='tr" + y.cid + "'><td>" + y.askername + "</td><td>" + y.amount + " BTC</td><td>" + printDate(y.date) + "</td><td><input type='button' class='cbutton buttonblue button-askedchallenge-accept' cid='" + y.cid + "'  value='Accept' ></td><td><input  cid='" + y.cid + "' type=\"button\" class=\"cbutton buttonwhite button-askedchallenge-decline\" value=\"Decline\" ></td></tr>").appendTo("#challenger-list tbody");
});

socket.on('info-sendcontent', function(y) {
    console.log("--> info-sendcontent");
    displayRoomContent(y.list);
});
socket.on('room-sendcontent', function(y) {
    console.log("--> room-sendcontent");
    displayRoomContent(y.list);
});
function displayRoomContent(y){
    var ntot=0;
    for(var am in y) {
         var nnn = 0;
        
        var np=y[am].length;
        
        var name=(am==='0'?"GUEST":(am+"mb"));
        var table = $("#roomcontent-"+am+" tbody");
         $(table).html("");
        for (var i = 0; i < np; i++) {
        
        if (y[am][i].id !== s) {
            console.log("in room "+am+" player "+y[am][i].name);
            nnn++;
            ntot++;
            var nn = y[am][i].name;
            var ss = y[am][i].id;
            var cc = y[am][i].country;
            var aa = y[am][i].amount;
            var ds = printDate(y[am][i].date);
            var flag = y[am][i].country.toLowerCase();
            var statu = "";
            if (y[am][i].room)
                statu = "Currently playing";
            else
                statu = "<input class='button-challenge cbutton' id='ch" + ss + "' oppid='" + ss + "' type='button' value='Challenge'>";

            var res = "<tr><td><img class='flag flag-" + flag + "'/>" + nn + "</td><td>" +
                    ds + "</td><td>" + aa + " BTC</td><td>" + statu + "</td></tr>";
            $(res).appendTo(table);

        }
        $("#tab-room-"+am+"-head").html(name+" (" +nnn+")");
    }
    }
    if (nnn > 1)
        $("#span-challengeroom").html("There are currently " + ntot + " players online in the room.");
    else
        $("#span-challengeroom").html("There is currently 1 player online in the room.");
}
function prepareNewPoint(m) {
    console.log("preparenewpoint" + m);
    points[m] = {'moves': new Array()};
    centerBall();
}
function showPointYouLost(y) {
    console.log("Show you lost");
    $("#alert-point-youlost").show().fadeOut(1000, function() {
        updateScore(y.score, animatedCounter, y.m + 1);
    });//show().animate({opacity: 0}, {queue: false, duration: 1000, complete: function() {

    //}});
}
function showPointYouWin(y) {
    console.log("Show you win");
    $("#alert-point-youwin").show().fadeOut(1000, function() {
        updateScore(y.score, animatedCounter, y.m + 1);
    });
}
function hideScorepanel() {

    //$("#panel-flapscore").animate({"bottom":"-150px"},{duration:1600,easing:"easeOutQuint",complete:function(){}});
    //TweenLite.to("#panel-flapscore", 1.600, {bottom: -150, ease: Linear.easeNone});
    $("#panel-flapscore").fadeOut();
}
function showScorepanel(left, right, callb, num) {
    $("#player-info").fadeOut();
    $("#panel-flapscore").fadeIn(400, function() {
        //$("#panel-flapscore").show().css("bottom","-130px").animate({"bottom":"0px"},{duration:1600,easing:"easeInCirc",complete:function(){
        $("#panel-flapscore").show();
        //TweenLite.to("#panel-flapscore", 400, {bottom: 0, ease: Linear.easeNone,onComplete:function(){
        var lef = $('#playerinfo-flapscore-left-flap');
        var rig = $('#playerinfo-flapscore-right-flap')
        if (left !== $(lef).val()) {
            $(lef).val(left).change();
        }
        if (right !== $(rig).val()) {
            $(rig).val(right).change();
        }
        $("#playerinfo-score-left").html(left);
        $("#playerinfo-score-right").html(right);
        $("#player-info").fadeIn();
        setTimeout(hideScorepanel, 2000);
        ;
        if (callb)
            setTimeout(callb(num), 4000);
        ;
    }
    );
}
function animatedCounter(m) {
    $("#panel-gameready").fadeOut(400, function() {
        playSound("countdown1");
        $("#alert3").show().fadeOut({queue: false, duration: 1000, complete: function() {
                $("#alert3").hide();
                playSound("countdown1");
                $("#alert2").show().fadeOut({queue: false, duration: 1000, complete: function() {
                        $("#alert2").hide();
                        playSound("countdown1");
                        $("#alert1").show().fadeOut({queue: false, duration: 1000, complete: function() {
                                $("#alert1").hide();
                                playSound("countdown2");
                                $("#alertstart").show().fadeOut({queue: false, duration: 1000, complete: function() {
                                        $("#alertstart").hide();
                                        startPoint(m);
                                    }});
                            }}).animate({fontSize: "240px"}, 1000);
                        ;
                    }}).animate({fontSize: "240px"}, 1000);
                ;
            }}).animate({fontSize: "240px"}, 1000);
    });

}

socket.on('point-countdown', function(y) {
    //stopBgMusic();
    setStep(STEPS.GAME);
    stopSound("light");
    hideScorepanel();
    animatedCounter(y.m);
});

function startPoint(m) {
    console.log("startPoint " + m);
    // setStep(STEPS.GAME);
    readyToStart = true;
    playLastMove(m, 0);
}
socket.on('challenge-informdeclinedbyopponent', function(y) {
    console.log("--> challenge-informdeclinedbyopponent");
    $("#ch" + y.oppid).val("Declined").prop("disabled", true);

});

/**********************************************************************************
 *                               GAME STARTING
 */
socket.on('game-preparing', function(y) {
    console.log("Game starting");
    prepareFirstPoint(y);

});
function prepareFirstPoint(y) {
    console.log("Prepare first point");
    points[0] = {'moves': new Array()};
    console.log(points[0]);
    setStep(STEPS.COURT);
    playSound("light");
    nextmove = true;
    showGameScreen();
    prepareNewMatch(y);
    $(".in-game").fadeIn();
    centerBall();
}
function showGameScreen() {
    stopBgMusic();

    $("#panel-askedchallenge").fadeOut();
    $("#panel-joinroom").fadeOut();
    $("#exp").fadeOut();
    $(".game-out").fadeOut();
    $("#log").fadeOut();
    $("#gamestarting").fadeIn();
    $(".content").addClass("crosshair");
    $("#panel-gameready").fadeIn();

    resetGameReadyButton();
    playIntro = false;
    centerBall();
}
function resetScore() {
    $("#playerinfo-score-left").html(0);
    $("#playerinfo-score-right").html(0);
    $("#player1-ready").html(0);
    $("#player2-ready").html(0);
    $("#playerinfo-flapscore-right-flap").val(0);
    $("#playerinfo-flapscore-left-flap").val(0);
}
function prepareNewMatch(y) {
    $("#game-cid").val(y.cid);
    $("#span-playerside").html(y.side);
    side = y.side;
    $("#player-info").fadeIn();
    resetScore();
    console.log(y);
    $("#playerinfo-flapscore-left-flap").addClass("flag-" + y.board.left.country.toLowerCase());
    $("#playerinfo-flapscore-right-flap").addClass("flag-" + y.board.right.country.toLowerCase());
    $("#playerinfo-left-flag").addClass("flag-" + y.board.left.country.toLowerCase());
    $("#playerinfo-right-flag").addClass("flag-" + y.board.right.country.toLowerCase());
    if (side === "LEFT") {
        $("#pid").val(1);
        $("#player1").html(y.board.left.name);
        $("#player2").html(y.board.right.name);
        $("#playerinfo-left-type").html("You");
        $("#playerinfo-right-type").html("Opponent");

        $("#panel-flapscore-right-type").html("Opponent");
        $("#panel-flapscore-left-type").html("You");
    } else {
        $("#pid").val(2);
        $("#player2").html(y.board.right.name);
        $("#player1").html(y.board.left.name);
        $("#panel-flapscore-left-type").html("Opponent");
        $("#panel-flapscore-right-type").html("You");
    }
    $("#panel-flapscore-right-name").html(y.board.right.name);
    $("#panel-flapscore-left-name").html(y.board.left.name);

}
function centerBall() {
    $("#ball").css("top", centerscreeny - d / 2).css("left", centerscreenx - d / 2);
}



/**********************************************************************
 *                      PLAYER CONNECTIONS
 */
socket.on('info-newuserconnected', function(y) {
    addLog("New visitor connected");
    $("#user-count").html(1+parseInt($("#user-count").html()));
});


socket.on('info-user-disconnected', function(y) {
    console.log("info-user-disconnected");
    updatePlayerCount(y.playerCount);
    addLog("Player <span class='playername'>" + y.name + "</span> left the game");

});
function setPlayerDisconnected() {
    $(".bg").addClass("bgblack");
    setTitle("DISCONNECTED");
    //socket.socket.connect();
    connected = false;
    console.log("Reco " + s);
    socket.connect();
}


function setTitle(u) {
    document.title = u;
}
socket.on('user-connected', function(y) {
    s = y;
    connected = true;
    $(".bg").removeClass("bgblack");
    setTitle("CONNECTED");
    //clearTimeout(timeout);

});
socket.on('game-opponentdisconnected', function(y) {
    $("#panel-opponentdisconnected").fadeIn();
    setStep(STEPS.ENDED);
});



/******************************************************************
 *                      MOVE RECEPTION
 */
socket.on('move-newmove', function(y) {
    console.log("--> move-newmove (" + y.m + "," + y.n + ")");
    //console.log(y);
    points[y.m].moves[points[y.m].moves.length  ] = y.move;
    console.log("<-- move-received (" + y.m + "," + y.n + ")");
    socket.emit('move-received', {'n': y.n, 'm': y.m});
});
socket.on('game-challengecanceled', function(y) {
    console.log("--> game-challengecanceled");
    $("#panel-joinroom").fadeIn();
    $("#panel-gameready").fadeOut();
    $(".in-game").fadeOut();
});
socket.on('move-playmove', function(y) {
    console.log("--> move-playmove " + y.m + " " + y.n);
    if (y.n > 0 && ballready)
        playLastMove(y.m, y.n);
    else
        readyToStart = true;
});
socket.on('role', function(y) {
    playerid = y;
    if (playerid === 1) {
        $("#player1").html("Player 1 - You ");
    } else if (playerid === 2) {
        $("#player2").html("Player 2 - You ");
    } else {

    }
});
function playerFeed(am) {
    socket.emit('player-feed', am);
    setStep(STEPS.HALL);
    return false;
}
function playerAsGuest() {
    socket.emit('player-asguest');
    setStep(STEPS.HALL);
    return false;
}
function updatePlayerList() {

    socket.emit('room-askcontent');
    return false;
}
function rename() {
    //addLog("Player "+m+" entered the game");              
    socket.emit('rename', {"name": m, "country": c});
    return false;
}
/***************************************************************************
 *                  INTRO BALL BOUNCE
 * 
 */
var speed = 1;
var padoffset = 5;
var padheight = 0.14;
//  var centerscreenx = W / 2;
// var centerscreeny = H / 2;
var R = 30;
var vs = 1;
var pi2 = Math.PI / 2;
var troispi2 = 3 * Math.PI / 2;
var deuxpi = 2 * Math.PI;
//    var padheight = 60;
var padwidth = 10;

function Move(n, bx, by, nx, ny, dura, alpha, bord) {
    this.n = n;
    this.bx = bx;
    this.by = by;
    this.nx = nx;
    this.alpha = alpha;
    this.ny = ny;
    this.dura = dura;
    this.bord = bord;
    //console.log(this);
}

var moves = new Array();
var nint = 0;


function resetGameReadyButton() {
    $("#button-gameready").val("Let's play !").prop("disabled", false);
}