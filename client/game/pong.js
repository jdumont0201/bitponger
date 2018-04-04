var music = {
    pong: null,
    currentBgMusic: "",
//var STEPS={WELCOME:1,CONFIG:2,HALL:3,COURT:4,GAME:5,ENDED:6};
    sounds: [
        //{            name: "ding",            volume 0.2        },
        {name: "light", volume: 1},
        {name: "boing", volume: 0.3},
        {name: "drag", volume: 1},
        {name: "tap", volume: 1},
        {name: "pong", volume: 1},
        {name: "pong2", volume: 1},
        {name: "pbounce", volume: 1},
        {name: "bounce2", volume: 1},
        {name: "litched", volume: 1},
        {name: "but", volume: 1},
        {name: "snap", volume: 1},
        {name: "powerup", volume: 1},
        {name: "countdown1", volume: 0.1},
        {name: "countdown2", volume: 0.1},
        {name: "button", volume: 0.2},
        {name: "buttonc", volume: 1},
        {name: "alert", volume: 0.4},
        {name: "preview-chill-lounge", volume: 0.6},
        {name: "elevator", volume: 1}, 
        {name: "railroad", volume: 1}, 

        {name: "preview-electro", volume: 0.3},
        {name: "preview-lounge-house", volume: 0.4},
        {name: "preview-lounge-house2", volume: 0.6},
        {name: "preview-the-sultry-lounge", volume: 0.4},

    ],
    MUSIC: {1: "preview-electro", 2: "preview-lounge-house2", 3: "preview-lounge-house2", 4: "litched", 5: "preview-chill-lounge", 6: "railroad", 7: "railroad"},
    playSound: function(a) {
        //console.log("Sound "+a);
        if(this.pong.config.ENABLE_SOUNDS)
        $.ionSound.play(a);
    }
    , stopSound: function(a) {
        console.log("Sound " + a);
        if(this.pong.config.ENABLE_SOUNDS)
        $.ionSound.stop(a);
    },
    playButtonSound: function() {
        if(this.pong.config.ENABLE_SOUNDS)
        this.playSound("but");
        //playSound("elevator");   
    },
    changeBgMusic: function(pong, step) {
        if(this.pong.config.ENABLE_SOUNDS)
        if (pong.config.playMusic) {
            if (this.MUSIC[step]) {
                var mu = this.MUSIC[step];
                if (mu === "NO") {
                    pong.log.debug("Change BG Music stop");
                    $.ionSound.stop(this.currentBgMusic);
                } else {
                    if (mu !== this.currentBgMusic) {
                        pong.log.debug(" Change BG Music stop " + this.currentBgMusic + " and play " + mu);
                        $.ionSound.stop(this.currentBgMusic);
                        $.ionSound.play(mu, {loop: true});

                    } else {
                        pong.log.debug("Music already playing");
                    }
                    this.currentBgMusic = mu;
                }
            } else {

            }
        }

    },
    playBgMusic: function(pong, a) {
        if(this.pong.config.ENABLE_SOUNDS)
        if (pong.config.playMusic)
            $.ionSound.play(a, {loop: true});
    },
    stopBgMusic: function() {
        if(this.pong.config.ENABLE_SOUNDS)
        $.ionSound.stop(this.currentBgMusic);
    }
}
var ui = {
    pong: null,
    currentTheme:"green",
    openWindows: {},
    nbOpenWindows: 0,
    voile: null,
    ajaxloader: null,
    ball: null,
    leftplayer: null,
    rightplayer: null,
    content: null,
    panel_faq: null,
    panel_halloffame: null,
    rs: null,
    panel_howitworks: null,
    panel_askedchallenge: null,
    panel_joinroom: null,
    panel_login: null,
    panel_createplayer: null,
    panel_sendpayment: null,
    panel_gameready: null,
    panel_opponentdisconnected: null,
    panel_logout: null,
    panel_tx: null,
    panel_: null,
    panel_welcome: null,
    panel_welcome_in: null,
    rechallengeinfo:null,
    speedindicator: null,
    speedindicator_in_in: null,
    exp: null,
    horline: null,
    reconnecting: null,
    bounce: null,
    alertstart: null,
    star: null,
    alert1: null,
    alert2: null,
    alert3: null,
    topCanvasZindex: 3,
    nbPaymentCheckAttempts: 0,
    nbSecondsBeforeAttempt: 5,
    tim: null,
    init: function() {
        this.panel_welcome_in = $("#panel-welcome-in");
        this.panel_gameready = $("#panel-gameready");
        this.panel_welcome = $("#panel-welcome");
        this.panel_gamready = $("#panel-gameready");
        this.panel_faq = $("#panel-faq");
        this.panel_halloffame = $("#panel-halloffame");
        this.panel_howitworks = $("#panel-howitworks");
        this.panel_askedchallenge = $("#panel-askedchallenge");
        this.panel_joinroom = $("#panel-joinroom");
        this.panel_login = $("#panel-step-login");
        this.panel_createplayer = $("#panel-step-createplayer");
        this.panel_payment = $("#panel-step-sendpayment");
        this.panel_opponentdisconnected = $("#panel-opponentdisconnected");
        this.panel_logout = $("#panel-logout");
        this.panel_tx = $("#panel-tx");
        this.rs = $("#rightspace");
        this.panel_ = $("#panel-");

        this.ajaxloader = $("#ajaxloader");
        this.voile = $("#voile");
        this.speedindicator = $("#speedindicator");
        this.speedindicator_in_in = $("#speedbar-in-in");
        this.star = $("#star");
        this.rechallengeinfo = $("#rechallengeinfo");
        this.reconnecting = $("#reconnecting");
        this.horline = $("#horline");

        this.ball = $("#ball");
        this.leftplayer = $("#player1-pad");
        this.rightplayer = $("#player2-pad");

        this.bouncein = $("#bounce-in");
        this.bounce = $("#bounce");
        this.alertstart = $("#alertstart");
        this.alert1 = $("#alert1");
        this.alert2 = $("#alert2");
        this.alert3 = $("#alert3");
        this.content = $("#content");
        this.exp = $("#exp");
    },
    resetLogoH:function(){
        famous.logoH=(pong.config.H>400?200:150) ;
        
    }
    ,
    decreaseWindowCount:function(){
        this.nbOpenWindows=Math.max(0,this.nbOpenWindows);
    },
    increaseWindowCount:function(){
        this.nbOpenWindows++;
    },
        checkWelcome:function(){
            if(this.nbOpenWindows===0)
                this.returnHome(this.pong);
            
        }
    ,
    formCreatePlayerValid:function(){
       pong.game.isProgressed=true;
        
        pong.music.playButtonSound();
        var playeraddress = $("#player-address").val();
        var password=$("#player-password").val();
        
        var country = $("#player-country :selected").val();
        var nickname = $("#player-nickname").val();
        nickname = nickname.trim();
        
        if (nickname.length === 0) {
            nickname = "Player";
        }
        if (!country) {
            country = "ZZ";
        }
        $("#button-saveplayer").val("Creating player...").prop('disabled', true);
        pong.ui.showLoadingScreen();
        
        pong.conn.emit('sql-savenewplayer',{address:playeraddress,name:nickname,country:country,password:password});
        return false;
          
    },
    setSpeedIndicator: function(n) {
        console.log("set speed"+n+" "+Math.max(0, Math.min(100, n)) + "%");
        this.speedindicator_in_in.css("width", Math.max(0, Math.min(100, n)) + "%");
    },
    openPanel: function(pong, id) {

        id.fadeIn();
        pong.anim.stopIntro(pong);
        
        this.openWindows[id.attr("id")] = true;
        //this.nbOpenWindows++;
    },
    closePanel: function(pong, id) {
        id.fadeOut();
        if (this.openWindows[id.attr("id")])
            delete this.openWindows[id.attr("id")];

        if (this.openWindows.length === 0)
            this.returnHome(pong);
    },
    roomIdToRoomName: function(id) {
        var v = id.substring(4);
        return v;
    }
    , roomIdToCommonRoomName: function(id) {
        if (id === "HALL0mBTC")
            return "Guest";
        else
            return this.roomIdToRoomName(id);

    }
    , amountToCommonRoomName: function(id) {
        if (id === 0)
            return "Guest";
        else
            return id+"mBTC";

    }
    ,
    roomIdToRoomAmount: function(id) {
        var v = id.substring(4);
        return v.substring(0, v.length - 4);
    }
    ,
    updateCurrentHalls: function(pong, roomList) {
        pong.log.debug("roomList");
        pong.log.debug(roomList);
        var n = Object.keys(roomList).length;
        pong.log.debug(n);
        var con = "";
        if (n > 0)
            con = "You appear in the following rooms : ";
        else
            con = "You don't appear in any room yet.";
        for (var roomid in roomList) {
            if (roomList[roomid]) {
                con += '      <span class="roomname">' + this.roomIdToCommonRoomName(roomid) + '</span>';
                $("#room-select-" + this.roomIdToRoomAmount(roomid)).addClass("room-sel-active");
            }
        }
        $("#panel-joinroom-recap-box-in").html(con);



    },
    showLoadingScreen: function() {
        this.ajaxloader.show();
        //this.voile.show();
    },
    hideLoadingScreen: function() {
        this.ajaxloader.fadeOut();
        //this.voile.fadeOut();
    },
    setCanvasOnTop: function(u) {
        this.topCanvasZindex++;
        $(u).css("z-index", this.topCanvasZindex);
    }
    ,
    resizeElements: function() {
        var pong=this.pong;
        this.pong.config.resetMetrics();
        famous.leftPlayer.setSize([10, pong.config.padheightpercent*pong.config.H]);
        famous.rightPlayer.setSize([10, pong.config.padheightpercent*pong.config.H]);
        pong.ui.rs.css("height",pong.config.H-pong.config.R-4);
        if(pong.ui.rs.is(":visible"))
            $("#rs-in-top").css("height",pong.config.H-pong.config.R-4-$("#rs-in-bottom").height());
        this.resetLogoH();
    },
    askPaymentFound: function(pong) {
        this.nbPaymentCheckAttempts = this.nbPaymentCheckAttempts + 1;
        $("#button-declarepaymentsent").val("Checking ...").prop("disabled", true);
        $("#step-send-payment-check").html("Payment not found at attempt #" + this.nbPaymentCheckAttempts + ". New attempt in 5s...");
        console.log("<-- sql-findpayment" + this.nbPaymentCheckAttempts);
        pong.conn.emit("sql-findpayment");
    },
    startCheckPaymentAttemps: function(pong) {
        this.tim = window.setTimeout(function() {
            pong.log.debug(pong);
            pong.ui.startFindPaymentCountdown(pong);
        }, 2000);
    },
    startFindPaymentCountdown: function(pong) {

//        console.log("startfindpaymentcd "+pong.ui.nbSecondsBeforeAttempt);

        if (this.nbSecondsBeforeAttempt >= 0) {
            $("#step-send-payment-check").html("Not found yet at attempt #" + (pong.ui.nbPaymentCheckAttempts + 1) + ". New attempt in " + pong.ui.nbSecondsBeforeAttempt + "s...");
            pong.ui.nbSecondsBeforeAttempt--;

            setTimeout(function() {
                pong.ui.startFindPaymentCountdown(pong);
            }, 1000);
        } else {
            pong.ui.askPaymentFound(pong);
            pong.ui.nbSecondsBeforeAttempt = 5;
        }
    },
    returnHall:function(){
        var pong=this.pong;
      pong.music.playButtonSound();
        pong.music.changeBgMusic(pong,2);
        $("#panel-game-end").fadeOut();
        $(".in-game").fadeOut();
        $(".game-out").fadeIn();
        pong.ui.openPanel(pong,pong.ui.panel_joinroom);
        pong.ui.updatePlayerList(pong);
      
        console.log("--> game-returnroom"); 
        pong.conn.emit('game-returnroom');
        $("#button-gameready").val("Let's play !").prop("disabled",false);
          
    },
    returnHome: function(pong) {
        pong.log.debug("reutnr home");
        famous.ingameOpaTra.set(1);
        pong.music.playButtonSound();
        pong.anim.centerBall(pong);
        if (pong.config.PLAY_WELCOME_ANIMATIONS) {
            
        pong.anim.showStar(pong);
    }
        pong.anim.showBall();
        pong.game.setStep(pong, pong.game.STEPS.WELCOME);
        pong.ui.panel_welcome.fadeIn();
        pong.ui.exp.fadeIn();
        
        pong.anim.introMoveBall(pong);
    }

    , afterLogout: function() {
        var pong = this.pong;
        pong.log.debug("After login");
        $.jStorage.set("logged", false);
        $.jStorage.deleteKey("logged");
        pong.conn.deleteLocalId();
        pong.ui.closePanel(pong, pong.ui.panel_logout);
        $("#player-address").prop("disabled",false);
        $(".bar-logged").hide();
        $(".bar-unlogged").show();
        pong.conn.isLogged = false;
    }
    , afterLogin: function(pong) {
        pong.log.debug("After login");
        pong.conn.isLogged = true;
        $.jStorage.set("logged", true);

        pong.music.playSound("drag");
//        $("#button-show-account").show();
        $(".bar-logged").show();
        $(".bar-unlogged").hide();
        
//        $("#button-show-logout").show();
        $("#button-show-login").hide();
        pong.ui.panel_login.hide();
        //$("#button-step-hall-return").hide();
    }
    , prepareConfig: function(pong) {
        pong.music.playSound("drag");
        famous.ingameOpaTra.set(0);
        $("#button-saveplayer").val("Submit").prop("disabled", false);
        pong.anim.stopIntro(pong);

        pong.game.setStep(pong, pong.game.STEPS.CONFIG);
        //pong.ui.panel_welcome.fadeOut();
        pong.ui.exp.fadeOut();

    },
    prepareWelcome: function(pong) {
        pong.log.debug("prepare welcome");
        pong.music.playBgMusic(pong, pong.music.MUSIC[pong.game.STEPS.WELCOME]);

        pong.anim.centerBall(pong);
        pong.game.initGame(pong);


        pong.ui.openPanel(pong, pong.ui.panel_welcome);
        if (pong.config.PLAY_WELCOME_ANIMATIONS) {
            pong.anim.shakeLogo(pong);
            pong.anim.showStar(pong);
            pong.anim.introMoveBall(pong);
        }

    },
    updateAmount: function(pong, amount) {
        pong.log.debug("updateamount" + amount);
        $("#span-feed-logged-val").html(amount);
        $("#count-amount").html(amount);

        for (var i = 0; i < pong.config.ROOMSIZES.length; i++) {

            var v = pong.config.ROOMSIZES[i];
            if (amount < v) {

                $("#room-select-" + v).addClass("room-sel-declined");
            } else {

                $("#room-select-" + v).addClass("room-sel-authorized");
            }
        }
        //if(amount < 10) $("#room-select-10").addClass( "room-sel-declined");
        //if(amount < 100) $("#room-select-100").addClass( "room-sel-declined");
        //if(amount < 1000) $("#room-select-1000").addClass( "room-sel-declined");
    }
    ,
    displayFeedAccount: function(pong, res) {
        pong.log.debug("displayfeed" + res);
        $("#span-feed-logged").show();

        pong.ui.panel_createplayer.fadeOut();
        pong.ui.openPanel(pong, pong.ui.panel_payment);
        //  var res = response;
        // if (res.playerid > 0) {

        pong.ui.panel_payment.fadeIn();

        //var callbackid = res.id; 
        var destinationAddress = res.destinationAddress;
        pong.log.debug(destinationAddress);

        $("#payment-hash").val(destinationAddress);
        $("#payment-address").val(destinationAddress);
        pong.game.updateQRSrc();
        //rename();
        if (pong.config.isSmallScreen()) {
            $("#button-step-chooseroom-return").show();
            $("#button-step-sendpayment-return").hide();
            $("#payment-right").hide();
        } else {
        //    $("#button-step-chooseroom-return").show();
          //  $("#button-step-sendpayment-return").hide();
        }
    },
    loadLoginInfo: function(pong, y) {

        pong.log.debug("loadlogininfo");
        
        this.updateAmount(pong, y.amount);
        this.updateCurrentHalls(pong, y.roomList);
        $("#account-name").val(y.name);
        $("#account-country").val(y.country);
        $("#account-address").val(y.address);
        pong.player.name = y.name;
        pong.player.country = y.country;
        pong.player.address = y.address;
        $("#button-show-account").html((pong.player.name ? (pong.player.name + "'s") : "Your") + " account");

    },
    showWrongLogin: function() {

        $("#span-wronglogin").show();
    },
    displayTransactions: function(pong, y) {
        pong.log.debug(y);
        var n = y.transactions.length;
        var table = $("#transactions-list tbody");
        $(table).html("");
        $("#transactions-list-nb").html("There are " + n + " transactions found for the address " + y.address);
        for (var i = 0; i < n; ++i) {
            var t = y.transactions[i];
            var status = "";
            var found = t.found ? "YES" : "NO";
            var confirmed = t.n > 0 ? "YES" : "NO";
            var date = pong.util.tsToDate(t.date);
            var hash = "-";
            if (t.hash)
                hash = t.hash.substring(0, 6) + "...";
            var tam = "-";
            if (t.amount)
                tam = t.amount + " mBTC";
            if (confirmed)
                var actions = "";
            if (confirmed)
                var res = "<tr><td>" + date + "</td><td>" + tam + "</td><td>" + hash + "</td><td>" + found + "</td><td>" + confirmed + "</td><td>" + status + "</td><td>" + actions + "</td></tr>";
            $(res).appendTo(table);
        }
    },
    displayRewards: function(pong, y) {
        pong.log.debug(y);
        var n = y.transactions.length;
        var table = $("#rewards-list tbody");
        $(table).html("");
        $("#rewards-list-nb").html("There are " + n + " rewards found for the address " + y.address);
        for (var i = 0; i < n; ++i) {
            var t = y.rewards[i];
            var status = "";
            var found = t.found ? "YES" : "NO";
            var confirmed = t.n > 0 ? "YES" : "NO";
            var date = pong.util.tsToDate(t.date);
            var hash = "-";
            if (t.hash)
                hash = t.hash.substring(0, 6) + "...";
            var tam = "-";
            if (t.amount)
                tam = t.amount + " mBTC";
            if (confirmed)
                var actions = "";
            if (confirmed)
                var res = "<tr><td>" + date + "</td><td>" + tam + "</td><td>" + hash + "</td><td>" + found + "</td><td>" + confirmed + "</td><td>" + status + "</td><td>" + actions + "</td></tr>";
            $(res).appendTo(table);
        }
    }
}
var game = {
    pong: null,
    roomList: {},
    SIDES: {LEFT: 1, RIGHT: 2},
    side: null,
    sideid: 1,
    TOUCH: {RETURNED: 1, BOUNCE: 2, WATCH: 3, LOST: 4},
    STEPS: {WELCOME: 1, CONFIG: 2, HALL: 3, COURT: 4, GAME: 5, ENDED: 6,FINISHED:7},
    step: null,
    points: new Array(),
    n: null, m: null,
    isProgressed: false,
    readyToStart: false,
    ballready: false,
    moves: new Array(),
    nint: 0,
    nextmove: true,
    initGame: function(pong) {

        this.setStep(pong, this.STEPS.WELCOME);
        pong.anim.centerBall(pong);
    },
    updatePlayerList: function(pong) {
        console.log("e");
        pong.conn.emit('room-askcontent');
        return false;
    },
    isMyTurn: function(bord) {
        if ((bord === "B" && this.sideid === this.SIDES.RIGHT) || (bord === "D" && this.sideid === this.SIDES.LEFT))
            return true;
        else
            return false;
    },
    isOppTurn: function(bord) {
        if ((bord === "B" && this.sideid === this.SIDES.LEFT) || (bord === "D" && this.sideid === this.SIDES.RIGHT))
            return true;
        else
            return false;
    },
    isWelcomeStep:function(){
      return (this.step===this.STEPS.WELCOME)  ;
    },
    startPoint: function(pong, m) {
        pong.log.debug("startPoint " + m);
        // setStep(STEPS.GAME);
        this.readyToStart = true;
        pong.anim.playLastMove(pong, m, 0);
    },
    playerFeed: function(pong, am) {
        pong.conn.emit('player-feed', am);
        this.setStep(pong, this.STEPS.HALL);
        return false;
    },
        playerSaved: function(pong, res) {
        pong.player.name = $("#player-nickname").val();
        pong.player.address = $("#player-address").val();
        pong.log.debug("player saved");
        pong.conn.storeGid(res.gid);
        //$("#button-step-hall-return-2").hide();
        $("#player-address").prop('disabled', true);
        $("#player-address-save").hide();
        var roomsize = res.roomsize;
        console.log(res);
        pong.log.debug("roomsize");
        pong.log.debug(res);
        for (var key in roomsize) {

            $("#roomsize-" + key).html(" - " + roomsize[key] + " players");
        }
        $("#tid").val(res.id);
        pong.ui.displayFeedAccount(pong, res);
        pong.ui.afterLogin(pong);
        pong.ui.hideLoadingScreen();
    },
    playerAsGuest: function(pong) {
        pong.music.playButtonSound();
        $("#intro").fadeOut();
        $("#panel-joinroom-thank").hide();
        pong.ui.openPanel(pong, pong.ui.panel_joinroom);
        pong.ui.closePanel(pong, pong.ui.panel_payment);
        $("#join-room").val("Join the room").removeClass("buttonwhite").addClass("buttonblue").prop('disabled', false);
        pong.conn.emit('player-asguest');
        this.setStep(pong, this.STEPS.HALL);
        pong.game.updatePlayerList(pong);
        return false;
    },
    setStep: function(pong, a) {
        pong.log.debug("Enter step " + a);
        this.step = a;
        pong.music.changeBgMusic(pong, a);
    }
    ,
    updateQRSrc: function() {
        var img = $("#bitcoin-qr");
        var overlay = $("#bitcoin-qr-overlay");
        overlay.show();
        var finalAddress = $("#payment-hash").val();
        var amount = $("input[name=radio-chooseroom]:checked").val();
        if (amount > 0) {
            img.load(function() {
                overlay.hide();
            }).attr("src", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:" + finalAddress + "?amount=" + amount + "&label=Bitpong");
        } else {
            img.load(function() {
                overlay.hide(   );
            }).attr("src", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:" + finalAddress + "?label=Bitpong");
        }
    },paymentFound:function(result){
            //console.log(result);
            var error=(result.error);
            var found=(result.found === "FOUND");
            //console.log(result);
            if(error){
                alert(result.errormsg);
            }else{
            if (found) {
                $("#transaction-hash").attr("href", "https://blockchain.info/fr/tx/" + result.hash).html(result.hash);
                $("#transaction-amount").html(result.amount);
                this.pong.ui.updateAmount(result.newamount);
                $("#intro").fadeOut();
                $("#step-send-payment-check").html( "Payment found.");
                $("#panel-joinroom").fadeIn();
                $("#panel-step-sendpayment").fadeOut();
                $("#join-room").val("Join the room").removeClass("buttonwhite").addClass("buttonblue").prop('disabled', false);
                pong.game.playerFeed(pong,result.amount);
                pong.game.updatePlayerList(pong);
              //  joinRoom();
                //clearInterval(tim);
                
            }else{
                console.log(pong.ui.nbPaymentCheckAttempts+" "+pong.config.MAX_FINDPAYMENTS_ATTEMPTS);
                if(pong.ui.nbPaymentCheckAttempts<pong.config.MAX_FINDPAYMENTS_ATTEMPTS)
                    pong.ui.startFindPaymentCountdown(pong);
                else{
                $("#button-declarepaymentsent").val("Recheck").prop("disabled",false);
                $("#step-send-payment-check").val("Payment not found after "+pong.config.MAX_FINDPAYMENTS_ATTEMPTS+" attempts");
                }
        }
    }
    }
    , showGameScreen: function(pong) {
        famous.outgameOpaTra.set(0);
        pong.music.stopBgMusic();

        $("#panel-askedchallenge").fadeOut();
        $("#panel-joinroom").fadeOut();
        pong.ui.exp.fadeOut();
        $(".game-out").fadeOut();
        $("#log").fadeOut();
        $("#gamestarting").fadeIn();
        $(".content").addClass("crosshair");
        pong.ui.openPanel(pong, pong.ui.panel_gameready);

        this.resetGameReadyButton();
        this.playIntro = false;
        pong.anim.centerBall(pong);
        $(".in-game").fadeIn();
        pong.ui.ball.hide();
        pong.ui.leftplayer.hide();
        pong.ui.rightplayer.hide();
        
        
    }
    ,
    resetGameReadyButton: function() {
        $("#button-gameready").val("Let's play !").prop("disabled", false);
    }
    , resetScore: function() {
        $("#playerinfo-score-left").html(0);
        $("#playerinfo-score-right").html(0);
        $("#player1-ready").html(0);
        $("#player2-ready").html(0);
        $("#playerinfo-flapscore-right-flap").val(0);
        $("#playerinfo-flapscore-left-flap").val(0);
    },
    setSide: function(side) {
        console.log("SIDE IS" + side);
        this.side = side;
        if (side === "LEFT")
            this.sideid = this.SIDES.LEFT;
        else if (side === "RIGHT")
            this.sideid = this.SIDES.RIGHT;
        else
            console.log("Error setside");
    }
    ,
    prepareNewMatch: function(y) {
        $("#game-cid").val(y.cid);
        
        $("#span-playerside").html(y.side);

        this.setSide(y.side);
        $("#player-info").fadeIn();
        this.resetScore();
        console.log(y);
        pong.ui.panel_payment.hide();
        $("#playerinfo-flapscore-left-flap").addClass("flag-" + y.board.left.country.toLowerCase());
        $("#playerinfo-flapscore-right-flap").addClass("flag-" + y.board.right.country.toLowerCase());
        $("#playerinfo-left-flag").addClass("flag-" + y.board.left.country.toLowerCase());
        $("#playerinfo-right-flag").addClass("flag-" + y.board.right.country.toLowerCase());
        if (this.side === "LEFT") {
            $("#speedbar").addClass("speedbar-left").removeClass("speedbar-right");
            $("#pid").val(1);
            $("#player1").html(y.board.left.name);
            $("#player2").html(y.board.right.name);
            $("#playerinfo-left-type").html("You");
            $("#playerinfo-right-type").html("Opponent");

            $("#panel-flapscore-right-type").html("Opponent");
            $("#panel-flapscore-left-type").html("You");
        } else {
            $("#speedbar").addClass("speedbar-right").removeClass("speedbar-left");
            $("#pid").val(2);
            $("#player2").html(y.board.right.name);
            $("#player1").html(y.board.left.name);
            $("#panel-flapscore-left-type").html("Opponent");
            $("#panel-flapscore-right-type").html("You");
        }
        $("#panel-flapscore-right-name").html(y.board.right.name);
        $("#panel-flapscore-left-name").html(y.board.left.name);

    }
    ,
    updateScore: function(pong, score, callb, num) {
        $("#playerinfo-score-right").html(score.right);
        $("#playerinfo-score-left").html(score.left);
        this.showScorepanel(pong, score.left, score.right, callb, num);
    }
    , updatePlayerCount: function(n) {
        $("#user-count").html(n);
    }
    ,
    displayRoomContent: function(pong, y) {
        var tableall = $("#roomcontent-all tbody");
        var tablerightspacebody = $("#rightspace-table tbody");
        $(tablerightspacebody).html("");
        var hallTables = new Array();
        var NBR=pong.config.ROOMSIZES.length;
        var la=(100-30)/NBR;
        var rightspaceth="<tr><td rowspan=2 style='border-bottom:solid 1px #444;width:30%;'>Player</td><td style='border-bottom:0' colspan='"+(NBR)+"'>Value in mBTC</td></tr><tr>";
        var refArray=new Array();
        
        var rms=pong.config.ROOMSIZES;
        for (var i = 0; i < NBR; ++i) {
            hallTables[rms[i]] = $("#roomcontent-" + rms[i] + " tbody");
            hallTables[rms[i]].html("");
            rightspaceth+="<td style='border-bottom:solid 1px #444;width:"+la+"%'>"+(rms[i]===0?"FREE":rms[i])+"</td>";
            $(tableall).html("");
            refArray[pong.config.ROOMSIZES[i]]=false;
        }
        rightspaceth+="</tr>";
        $("#rightspace-table thead").html(rightspaceth);
        var ntot = 0;
        //console.log("cont");
        //pong.log.debug(y);


        for (var i in y) {
            //pong.log.debug("item"+i);
            var nn = y[i].isLogged?y[i].name:"Visitor";
            var ss = y[i].id;
            var cc = y[i].country;
            var aa = y[i].amount;
            var ds = '<abbr class="timeago" title="' + y[i].date + '"></abbr>';
            //pong.config.printDate(y[i].date);
            var flag = "";
            if (y[i].country)
                flag = y[i].country.toLowerCase();
            var statu = "";
            pong.log.debug("socket=" + pong.conn.sid + " " + ss);

            var res1 = "<tr><td><img class='flag flag-" + flag + "'/><br>" + nn + "</td><td>" +                    ds + "</td><td>";
            var res2 = " mBTC</td><td>";
            var res3 = "</td></tr>";
            
            var ref=refArray;
            for (var roomid in y[i].roomList) {
                //var am=y[i].roomList[roomd];
                
                var r = roomid.substring(4);
                var am = parseInt(r.substring(0, r.length - 4));
                ref[am]=true;
                //pong.log.debug("add pla"+i+" to room "+roomid+" "+am);
                if (ss === pong.conn.sid)
                    statu = "You";
                else if (y[i].room)
                    statu = "Currently playing";
                else
                    statu = this.getChallengeButton(am,ss);

                var re = res1 + am + res2 + statu + res3;
                $(re).appendTo(hallTables[am]);
                $(re).appendTo(tableall);
            }
            var rr="<tr><td><img class='flag flag-" + flag + "'/><br>"+nn+"</td>";
            if (ss === pong.conn.sid)
                rr+= '<td colspan="'+NBR+'" style="text-align: center;">You</td>';
            else if (y[i].room)
                rr+= '<td colspan="'+NBR+'" style="text-align: center;">Currently playing</td>';
            else{
                for(var i=0;i<NBR;++i){
                    if(ref[rms[i]])
                    rr+="<td><input class='rs-button spbuttonyellow spbutton' amount='" + am + "' id='ch" + ss + "' oppid='" + ss + "' type='button' value='Ask'></td>";
                else
                    rr+="<td>-</td>";
                }
            }
            $(rr).appendTo(tablerightspacebody);
        }
        $(".tableroomcontent tbody:empty").html("<tr><td colspan=4   >There is no player in this room.</td></tr>");
        jQuery("abbr.timeago").timeago();
    },
    getRoomAmountFromRoomName:function(name){
        
        var r = name.substring(4);
                return  parseInt(r.substring(0, r.length - 4));
                
            },
    getChallengeButton:function(am,ss,format){
        if(format==="rechallenge")
            return "<div class='spbuttonyellow spbutton' amount='" + am + "' id='rech" + ss + "' oppid='" + ss + "'>Rechallenge for <div class='rechallenge-amount'>"+(am>0?(am+"mBTC"):"FREE")+"</div> game</div>";    
            else
            return "<input class='spbuttonyellow spbutton ' amount='" + am + "' id='ch" + ss + "' oppid='" + ss + "' type='button' value='Challenge !'>";
            }
    ,
    getOppSideId:function(sideid){
        if(sideid===this.SIDES.LEFT) return this.SIDES.RIGHT;
        else if(sideid===this.SIDES.RIGHT) return this.SIDES.LEFT;
        else this.pong.log.err("no sideid");
    }
    ,
    prepareNewPoint: function(pong, m) {
        pong.log.debug("preparenewpoint" + m);
        this.points[m] = {'moves': new Array()};
        pong.ui.setSpeedIndicator(1);
        pong.anim.centerBall(pong);
    },
    showPointYouLost: function(pong, y) {
        pong.log.debug("Show you lost");
        $("#alert-point-youlost").show().fadeOut(1000, function() {

            pong.game.updateScore(pong, y.score, pong.anim.animatedCounter, y.m + 1);
        });
    }
    , showPointYouWin: function(pong, y) {
        pong.log.debug("Show you win");
        $("#alert-point-youwin").show().fadeOut(1000, function() {
            pong.game.updateScore(pong, y.score, pong.anim.animatedCounter, y.m + 1);
        });
    },
    hideScorepanel: function() {
        //$("#panel-flapscore").animate({"bottom":"-150px"},{duration:1600,easing:"easeOutQuint",complete:function(){}});
        //TweenLite.to("#panel-flapscore", 1.600, {bottom: -150, ease: Linear.easeNone});
        $("#panel-flapscore").fadeOut();
    }
    , showScorepanel: function(pong, left, right, callb, num) {
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
            setTimeout(pong.game.hideScorepanel, 2000);
            ;
            if (callb)
                setTimeout(callb(pong, num), 4000);
            ;
        }
        );
    }   
    , prepareFirstPoint: function(pong, y) {
        pong.log.debug("Prepare first point");
        pong.anim.stopIntro(pong);
        
        
        
        famous.ingameOpaTra.set(1);
        this.points[0] = {'moves': new Array()};
        this.setStep(pong, this.STEPS.COURT);
        
        pong.music.playSound("light");
        //this.nextmove = true;
        this.showGameScreen(pong);
        this.prepareNewMatch(y);
        
        pong.anim.centerBall(pong);
    }


    , setPlayerDisconnected: function(pong) {
        $(".bg").addClass("bgblack");
        pong.config.setTitle(pong, "[Disconnected]");
        //socket.socket.connect();
        pong.conn.isConnected = false;
        pong.log.debug("Reco " + s);
        pong.conn.socket.connect();
    }

    , sendPositionToServer: function(pong) {    
        
        var y = pong.comp.getPlayerPositionPercent(pong);

        pong.conn.socket.emit('update-game-player', {'y': y});
        return false;
    }
    ,
    isPlayerMovingStep:function(){
     return (this.step === this.STEPS.WELCOME || this.step === this.STEPS.GAME || this.step === this.STEPS.COURT   )
    }
    ,
    movePlayer: function(pong, y) {
//        console.log("movep");
        if (this.isPlayerMovingStep()) {
            var pid = parseInt($("#pid").val());
            if(this.step !== this.STEPS.WELCOME ){
            //alert(pid);
            if (pid === 0) {
                //alert(event.pageY - 80);
    //            pong.ui.leftplayer.css("top", y - pong.config.padheight / 2);
      //          pong.ui.horline.css("top", y);
            } else if (pid === 1) {
//                pong.ui.leftplayer.css("top", y - pong.config.padheight / 2);
  //              pong.ui.horline.css("top", y);
                this.sendPositionToServer(pong);
            } else if (pid === 2) {
                
           //     pong.ui.rightplayer.css("top", y - pong.config.padheight / 2);
             //   pong.ui.horline.css("top", y);
                this.sendPositionToServer(pong);
            }
            }
        }
    }
}

var config = {
    pong: null,
    content: null,
    ROOMSIZES: [0, 1, 10, 100, 1000],
    W: null,
    H: null,
    d: 16,
    brayon: 8,
    R: 30,
    padheight: null,
    padheightpercent:0.14,
    padwidth: 10,
    padoffset: 5,
    speed: 1,
    halfpadheight: null,
    centerscreenx: null,
    centerscreeny: null,
    debug: false,
    ENABLE_SOUNDS:true,
    playMusic: true,
    
    bouncewidth: 15,
    bounceEnlargement: 1.5,
    bouncePosition: 0.6,
    PLAY_WELCOME_ANIMATIONS: true,
    
    changeAngleAtBounce: true,
    BOUNCE_MIX_RATIO: 0.5,
    
    MAX_FINDPAYMENTS_ATTEMPTS: 10,
    PAGE_TITLE: "Bitponger - The realtime multiplayer tennis game !",
    resetMetrics:function(){
        console.log("reset metrics");
        this.W = $(this.content).width();
        this.H = $(this.content).height();
        this.halfpadheight = this.padheight / 2;
        this.centerscreenx = this.W / 2;
        this.centerscreeny = this.H / 2;
        this.padheight = this.padheightpercent*this.H;//$("#player1-pad").height();
        
    },
    init: function() {
        this.content = $(".content");
        this.resetMetrics();
    },
    isSmallScreen: function() {
        return $(window).width() < 480;
    },
    resizeMenu: function() {
        if (this.isSmallScreen()) {
            $("#payment-left").addClass("paymentleft-small");
            $("#payment-right").addClass("paymentright-small");
            $(".canvas").addClass("canvas-small");
        }
    }
    ,
    addLog: function(logm) {
        var d = this.printDate(new Date());
        $("#bglog1").html($("#bglog2").html());
        $("#bglog2").html(d + " " + logm);
        $("<div class='logline'>" + d + " " + logm + "</div>").appendTo("#log-in");
        $("#log-in").scrollTop($("#log")[0].scrollHeight);
    },
    printDate: function(ladate) {
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
    , setTitle: function(pong, u) {
        document.title = u + " - " + pong.config.PAGE_TITLE;
    }


}


var comp = {
    pong: null,
    pi2: Math.PI / 2,
    troispi2: 3 * Math.PI / 2,
    deuxpi: 2 * Math.PI,
    alpha: 0.1,
    round: function(x) {
        return Math.round(x * 100) / x;
    },
    getPointDistance: function(A, B) {
        return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
    },
    Point: function(n, x, y) {
        this.name = n;
        this.x = x;
        this.y = y;
        //console.log(this);
    },
    getDuration: function(pong, len) {
        return len / pong.config.speed / 400;
    },
    scalePoint: function(pong, Q) {
        var res = new this.Point("Qs",
                (Q.x - pong.config.R) * pong.config.W / 1000 + pong.config.R,
                (Qt.y - pong.config.R) * pong.config.H / 1000 + pong.config.R);
        return res;
    },
    percentToPoint: function(pong, Q) {
        return new this.Point("Qs",
                Q.x * (pong.config.W - pong.config.R - pong.config.R) + pong.config.R,
                Q.y * (pong.config.H - pong.config.R - pong.config.R) + pong.config.R)

    },
    positionToPercent: function(pong, top, height) {
        return (top + height / 2 - pong.config.R) / (pong.config.H - pong.config.R - pong.config.R);
    },
    positionCenterToPercent: function(pong, top) {
        return (top  - pong.config.R) / (pong.config.H - pong.config.R - pong.config.R);
    },
    percentToPosition: function(pong, per, height) {
        return per * (pong.config.H - pong.config.R - pong.config.R) + pong.config.R - height / 2;
    },
    getPlayerPositionPercent: function(pong) {
        if(pong.anim.engine===pong.anim.ENGINES.famous){
            return this.positionCenterToPercent(pong, pong.input.mousey);
        }else{
        if (pong.game.side === "LEFT") {
            var playe = $("#player1-pad");
        }
        else {
            var playe = $("#player2-pad");
        }
        return this.positionToPercent(pong, $(playe).position().top, $(playe).height());
        }
    }
    , computeNextAngle: function(alpha, bord, quadrant) {
        //console.log("     * Next angle " + bord + " " + quadrant);
        var nextalpha = null;
        if (quadrant === "NE") {
            if (bord === "A") {
                //console.log("  - A NE");
                nextalpha = this.deuxpi - alpha;
            }
            else if (bord === "B") {
                nextalpha = Math.PI - alpha;
            }
            else {
                console.log("  - Error border");
            }
        }
        else if (quadrant === "NO") {
            if (bord === "A") {
                nextalpha = this.deuxpi - alpha;
            }
            else if (bord === "D") {
                nextalpha = Math.PI - alpha;
            }
            else {
                console.log("  - Error border");
            }
        }
        else if (quadrant === "SE") {
            if (bord === "B") {
                nextalpha = 3 * Math.PI - alpha;
            }
            else if (bord === "C") {
                nextalpha = this.deuxpi - alpha;
            }
            else {
                console.log("  - Error border");
            }
        }
        else if (quadrant === "SO") {
            if (bord === "C") {
                nextalpha = this.deuxpi - alpha;
            }
            else if (bord === "D") {
                nextalpha = this.troispi2 - (alpha - this.troispi2);
            }
            else {
                console.log("  - Error border");
            }


        }
        //console.log("     * Nouvel angle " + Math.floor(100 * alpha) / 100);
        return nextalpha;

    },
    isPlayerInFrontOfBall: function(pong, side,bally) {
        var res="";
        if(pong.anim.engine===pong.anim.ENGINES.famous){
            console.log(pong.input.mousey);
            var playertop = pong.input.mousey-pong.config.padheight/2;
            var playerbottom = playertop + pong.config.padheight;
            var balltop = bally;//pong.game.moves[pong.game.nint].ny;
            var ballbottom = balltop + pong.config.d;
           res = (ballbottom > playertop) && (balltop < playerbottom);
            console.log(playertop+" > "+balltop+","+ballbottom+" < "+playerbottom);
            console.log(res?"oui":"non");
            
        }else{
            var playerPad = this.getPlayerPad(pong, side);
            var playertop = playerPad.position().top;
            var playerbottom = playertop + pong.config.padheight;
            var balltop = pong.ui.ball.position().top;//pong.game.moves[pong.game.nint].ny;
            var ballbottom = balltop + pong.config.d;
             res = (ballbottom > playertop) && (balltop < playerbottom);
        }
        console.log(res?"oui":"non");
        return res;
    },
    getPlayerPad: function(pong, side) {
        if (side === pong.game.SIDES.LEFT) {
            return pong.ui.leftplayer;
        } else if (side === pong.game.SIDES.RIGHT) {
            return pong.ui.rightplayer;
        } else {
            pong.log.debug("ERR Player pad side incorrect" + side);
        }

    },
    recomputeTouchedAngle: function(pong, side, originalAngle,bally) {
        var playerPad = this.getPlayerPad(pong, side);
        var playertop = null;
        var balltop=null;
        if(pong.anim.engine===pong.anim.ENGINES.famous){
            playertop=pong.input.mousey-pong.config.padheight/2;
            balltop=bally;
        }else{
            playertop=playerPad.position().top;
            balltop= pong.ui.ball.position().top;//pong.game.moves[pong.game.nint].ny;
        }
        
         
        var ballcenter = balltop + pong.config.d / 2;
        var touchpercent = (ballcenter - playertop) / pong.config.padheight;
        var r = pong.config.BOUNCE_MIX_RATIO;
        if (side === pong.game.SIDES.LEFT) {
            var mix = null;
            var ideal = null;
            var converted = null;
            if (touchpercent < 0.5) {
                ideal = this.pi2 - this.pi2 * touchpercent * 2;
                if (originalAngle >= this.troispi2)
                    originalAngle = originalAngle - this.deuxpi;

                mix = (r * ideal + (1 - r) * originalAngle);
                if (mix < 0)
                    mix = mix + this.deuxpi;

            }
            else {
                ideal = this.troispi2 + (touchpercent - 0.5) * this.pi2;
                converted = ideal - this.deuxpi;
                if (originalAngle >= this.troispi2)
                    originalAngle = originalAngle - this.deuxpi;
                mix = (r * converted + (1 - r) * originalAngle);
                if (mix < 0)
                    mix = mix + this.deuxpi;
                // angle=(r*(res+this.pi2)+(1-r)*(angle+this.pi2))-this.pi2;
            }
        }
        return mix;
    },
    getQuadrant: function(alpha) {
        if (alpha > 0 && alpha < this.pi2) {
//            console.log("     * Quadrant Nord Est");
            return "NE";
        }
        else if (alpha > this.pi2 && alpha < Math.PI) {
            return "NO";
        }
        else if (alpha > Math.PI && alpha < this.troispi2) {
            return "SO";
        }
        else if (alpha > this.troispi2 && alpha < this.deuxpi) {
            return "SE";
        }

    },
    pointToPercent: function(pong, Q) {
        return new this.Point("Qs",
                (Q.x - pong.config.R) / (pong.config.W - pong.config.R - pong.config.R),
                (Q.y - pong.config.R) / (pong.config.H - pong.config.R - pong.config.R));
    },
    computeNextMove: function(pong, noplay) {
//        console.log(" * Computing intro move "+pong.game.nint);
        ga = pong.game.moves[pong.game.nint];
        var alpha = ga.alpha;
        var st = new this.Point("P", ga.bx, ga.by);
        var BALL = this.percentToPoint(pong, st);
        var ballx = BALL.x;
        var bally = BALL.y;
        //console.log(" * Cid #" + cid);
        //console.log("     * Alpha=" + Math.floor(100 * alpha) / 100);
        //var ball = $("#ball");
        //console.log(ball.position());
        var P = new this.Point("P", ballx, bally);
        var L = new Array();
        var S = new Array();
        var quadrant = this.getQuadrant(alpha);
        var aa = Math.tan(alpha);
        var bb = -P.y - aa * P.x;
        function f(y) {
            return (-y - bb) / aa;
        }
        function g(x) {
            return aa * x + bb;
        }

//        console.log(" * Equation y=" + aa + "*x" + bb);
        var R = pong.config.R;
        var H = pong.config.H;
        var W = pong.config.W;
        var d = pong.config.d;
        var padwidth = pong.config.padwidth;
        var padoffset = pong.config.padoffset;
        var A = new this.Point("A", f(R), R);
        var lA = L["A"] = L["At"] = this.getPointDistance(P, A);
        var B = new this.Point("B", W - R - d, -g(W - R - d));
        var lB = L["B"] = this.getPointDistance(P, B);
        var Bt = new this.Point("B", W - R - d - padwidth - padoffset, -g(W - R - d - padwidth - padoffset));
        var lBt = L["Bt"] = this.getPointDistance(P, Bt);
        var C = new this.Point("C", f(H - R - d), H - R - d);
        var lC = L["C"] = L["Ct"] = this.getPointDistance(P, C);
        var D = new this.Point("D", R, -g(R));
        var lD = L["D"] = this.getPointDistance(P, D);
        var Dt = new this.Point("D", R + padwidth + padoffset, -g(R + padwidth + padoffset));
        var lDt = L["Dt"] = this.getPointDistance(P, Dt);
        var S = {"A": A, "B": B, "C": C, "D": D};
        var St = {"A": A, "B": Bt, "C": C, "D": Dt};
        //console.log(L);

        //calcul du prochain bord
        var bord = null;
        if (quadrant === "NE") {
            if (lA < lB)
                bord = "A";
            else
                bord = "B";
        }
        else if (quadrant === "NO") {
            if (lA < lD)
                bord = "A";
            else
                bord = "D";
        }
        else if (quadrant === "SO") {
            if (lD < lC)
                bord = "D";
            else
                bord = "C";
        }
        else if (quadrant === "SE") {
            if (lC < lB)
                bord = "C";
            else
                bord = "B";
        }

        var Q = S[bord];
        var Qt = St[bord];
        var l = L[Q.name];
        var lt = L[Qt.name + "t"];
        var dura = this.getDuration(pong, l);
        var Qs = this.pointToPercent(pong, Q);
        var Qsl = this.pointToPercent(pong, Qt);

//        console.log("     * Length t " + Math.floor(lt) + " " + Math.floor(l));
//        console.log("     * Duration " + dura);
//        console.log(" * Length " + Math.floor(l));
        //console.log("     * Bord " + bord );
        //console.log("     * Move (" + Math.floor(P.x) + "," + Math.floor(P.y) + ")->(" + Math.floor(Q.x) + "," + Math.floor(Q.y)+")");

        pong.game.moves[pong.game.nint].nx = Qs.x;
        pong.game.moves[pong.game.nint].ny = Qs.y;
        pong.game.moves[pong.game.nint].dura = dura;
        pong.game.moves[pong.game.nint].bord = bord;

        var dural = this.getDuration(pong, lt);
        //console.log("lt="+lt+" "+dural);
        pong.game.moves[pong.game.nint].nxl = Qsl.x;
        pong.game.moves[pong.game.nint].nyl = Qsl.y;
        pong.game.moves[pong.game.nint].dural = dural;



        //console.log("     * Preparing move ("+m+","+(nint+1)+")"); 
        var nextalpha = this.computeNextAngle(alpha, bord, quadrant);

        pong.game.moves[pong.game.nint + 1] = new pong.anim.Move(pong.game.nint + 1, Qs.x, Qs.y, null, null, null, nextalpha, null);
        if (!noplay)
            pong.anim.playIntroMove(pong);
    },
    generateStartAngle: function(pong) {
        var res = 2 * Math.PI * Math.random();
        if (Math.abs(res - pong.comp.pi2) < 0.2)
            return this.generateStartAngle(pong);
        else if (Math.abs(res - pong.comp.troispi2) < 0.2)
            return this.generateStartAngle(pong);
        else
            return res;
    }
};

var anim = {
    ENGINES: {GSAP: 1, jQuery: 2, transit: 3, css: 4, velocity: 5, famous: 6},
    engine:6,
    
    currentAnim: null,
    playIntro: true,
    mainContext: null,
    ballMoveModifier: null,
    Transform: null,
    Easing: null,
    initFamous: function(callb) {
        console.log("Init famous");
        define(function(require, exports, module) {
            var Engine = require('famous/core/Engine');
            var Modifier = require('famous/core/Modifier');
            this.Transform = require('famous/core/Transform');
            var StateModifier = require('famous/modifiers/StateModifier');
            this.Easing = require('famous/transitions/Easing');
            var Surface = require('famous/core/Surface');
            var ImageSurface = require('famous/surfaces/ImageSurface');


            this.mainContext = Engine.createContext();

            var ball = new Surface({
                size: [16, 16],
                content: 'ball',
                properties: {
                    color: 'white',
                    borderRadius: '16px',
                    background: 'rgb(255, 197, 11)',
                    background: 'radial-gradient(circle at 4px 5px, rgba(249,215,103,1), rgba(177, 100, 3, 1))',
                            backgroundColor: '#FA5C4F'
                }
            });



            var centerModifier = new Modifier({origin: [0.5, 0.5]});
            this.ballMoveModifier = new StateModifier();

            this.mainContext.add(centerModifier).add(ball);
            this.mainContext.add(this.ballMoveModifier).add(ball);

        callb();
    });
    },
    showBall:function(d,callb){
        this.pong.log.debug("showBall");
        if(d>0)
            famous.ballOpaTra.set(1, {    duration: 1000, curve: famous.Easing.outBack},callb);
        else
            famous.ballOpaTra.set(1,null, callb);
    },
    hideBall:function(d,callb){
        this.pong.log.debug("hideBall");
        if(d>0)
            famous.ballOpaTra.set(0, {    duration: 1000, curve: famous.Easing.outBack},callb);
        else
            famous.ballOpaTra.set(0, null, callb);
    }
    ,    
    playLastMove        : function(pong, m, n) {
        pong.game.m = m;
        pong.game.n = n;
        pong.game.ballready = false;
        pong.log.debug("----------------------------------------------------------");
        pong.log.debug(" * Playing move (" + m + "," + n + ") ");
        //pong.log.debug(points[m].moves[n]);
        //pong.log.debug(points[m].moves);

        var Qt = new pong.comp.Point("Q", pong.game.points[m].moves[n].nx, pong.game.points[m].moves[n].ny);
        //var bord=points[m].moves[n].bord;
        var Qs = pong.comp.percentToPoint(pong, Qt);
        var dura = pong.game.points[m].moves[n].dura;


        //pong.log.debug(" -> Tween " + (Math.floor(100 * dura) / 100) + " " + Qs.x + " " + Qs.y);
        pong.ui.setSpeedIndicator(n);
        if (n > 1) {
            var bordCourant = pong.game.points[m].moves[n - 1].bord;
            if (bordCourant === "A" || bordCourant === "C")
                pong.music.playSound("snap");
            else
                pong.music.playSound("tap");
            /*if(bordCourant==="A")
             pong.anim.squeezeBallUp(pong);
             else if(bordCourant==="C")
             pong.anim.squeezeBallDown(pong);*/
        }
        this.currentAnim = pong.anim.moveBall(pong, Qs.x, Qs.y, dura, false, function() {
            pong.log.debug("<-- move-moveplayed (" + m + "," + n + ") : (" + Qs.x + "," + Qs.y + ")");
            pong.conn.emit('move-moveplayed', {'m': m, 'n': n, 'pos': pong.comp.getPlayerPositionPercent(pong)});

            
            pong.game.ballready = true;
            
            var isMyTurn = pong.game.isMyTurn(pong.game.points[m].moves[n ].bord);
            if (isMyTurn) {
                pong.log.debug("IS MY TURN");
                var isPlayerInFront = pong.comp.isPlayerInFrontOfBall(pong, pong.game.sideid,Qs.y);
                if (!isPlayerInFront) {
                    pong.log.debug("NOT IN FRONT");
                    pong.anim.finishMoveToTheEnd(pong, m, n);
                } else {
                    pong.log.debug("IN FRONT");
                    pong.anim.playPlayerTouchedAnim(pong, pong.game.sideid);
                }
            }else{
                if(pong.game.isOppTurn(pong.game.points[m].moves[n ].bord)){
                    pong.log.debug("OPP FRONT");
                    pong.anim.playPlayerTouchedAnim(pong, pong.game.getOppSideId(pong.game.sideid));
                }
            }
        });
    },
    
    moveDiv: function(pong, div, x, y, dura, callb, easing) {
        console.log("movediv "+x+","+y);
        var ease = "linear";
        if (easing)
            ease = easing;
        if (this.engine === this.ENGINES.GSAP) {
            //this.currentAnim = TweenLite.to(div, dura, {top: y, left: x, ease: Linear.easeNone, onComplete: callb});
        } else if (this.engine === this.ENGINES.jQuery) {
            $(div).animate({top: y, left: x}, {duration: dura * 1000, easing: "linear", complete: callb});
        } else if (this.engine === this.ENGINES.velocity) {
            //console.log("move ease "+div+" "+ease); 
            if (div === "#ball")
                pong.ui.ball.velocity({top: y, left: x}, {duration: dura * 1000, easing: ease, complete: callb});
            else
                $(div).velocity({top: y, left: x}, {duration: dura * 1000, easing: ease, complete: callb});
        } else if (this.engine === this.ENGINES.transit) {

            if (div === "#ball")
                pong.ui.ball.transit({top: y, left: x}, {duration: dura * 1000, easing: ease, complete: callb});
            else
                $(div).transit({top: y, left: x}, {duration: dura * 1000, easing: ease, complete: callb});
        } else if (this.engine === this.ENGINES.famous) {
            if (div === "#ball")
                famous.ballMoveModifier.setTransform(famous.Transform.translate(x, y, 0), {duration: dura * 1000, curve: famous.Easing.linear}, callb);
            else
                $(div).velocity({top: y, left: x}, {duration: dura * 1000, easing: ease, complete: callb});
        } else if (this.engine === this.ENGINES.css) {
            var xx = $(div).position().left;
            var yy = $(div).position().right;
            $(div).css("transform", "translate(" + (x - xx) + "," + (y - yy) + ")").css("transition", dura + "s ease-in-out");
        } else {
        }
    }
    , killAnimation: function(pong, div) {

        if (this.engine === this.ENGINES.GSAP) {
            this.currentAnim.kill();
        } else if (this.engine === this.ENGINES.jQuery) {
            pong.ui.ball.stop();
        } else if (this.engine === this.ENGINES.transit) {

            pong.ui.ball.stop();
        } else if (this.engine === this.ENGINES.velocity) {
            pong.ui.ball.stop();
        } else if (this.engine === this.ENGINES.css) {

        } else {
        }
    }
    ,
    stopIntro: function(pong) {
        this.playIntro = false;
        this.killAnimation(pong, "#ball");
        pong.ui.ball.fadeOut(1000, function() {
            pong.anim.centerBall(pong);
            pong.anim.showBall();
        });
    },
    playIntroMove: function(pong) {
        if (!this.playIntro)
            return;

        //pong.log.debug("play intro move to " + pong.game.nint + " data bord=" + pong.game.moves[pong.game.nint].bord);
        var Qt = new pong.comp.Point("Q", pong.game.moves[pong.game.nint].nx, pong.game.moves[pong.game.nint].ny);
        var Qtl = new pong.comp.Point("Ql", pong.game.moves[pong.game.nint].nxl, pong.game.moves[pong.game.nint].nyl);
        var Qs = pong.comp.percentToPoint(pong, Qt);
        var Qsl = pong.comp.percentToPoint(pong, Qtl);
        var dura = pong.game.moves[pong.game.nint].dura;
        var dural = pong.game.moves[pong.game.nint].dural;
        var isConcerned = false;

        
        var animMove = false;

        var bord1 = pong.game.moves[pong.game.nint ].bord;
        if (bord1 === "A" || bord1 === "C" || bord1 === "B") {
            
            pong.anim.moveBall(pong, Qs.x, Qs.y, dura, animMove, function() {
                pong.music.playSound("snap");
                pong.game.nint = pong.game.nint + 1;
                pong.comp.computeNextMove(pong);
            });
        } else {
//            console.log("bord d"+Qsl.x+" "+Qsl.y+" "+dural);
//            console.log("MVB", Qsl.x, Qsl.y);
            this.moveBall(pong, Qsl.x, Qsl.y, dural, animMove, function() {
                var isPlayerInFront = pong.comp.isPlayerInFrontOfBall(pong, pong.game.SIDES.LEFT,Qsl.y);
                if (isPlayerInFront) {
                    pong.music.playSound("tap");
//                    console.log("plyaerinfront");
                    pong.anim.playPlayerTouchedAnim(pong, pong.game.SIDES.LEFT);
                    if (pong.config.changeAngleAtBounce) {
                        var originalAngle = pong.game.moves[pong.game.nint + 1].alpha;
                        var angle = pong.comp.recomputeTouchedAngle(pong, pong.game.SIDES.LEFT, originalAngle,Qsl.y);
                        //console.log("Set new angle move "+pong.game.nint+" "+(Math.floor(100*pong.game.moves[pong.game.nint].alpha)/100)+" -> "+(Math.floor(100*angle)/100));
                        pong.game.moves[pong.game.nint + 1].alpha = angle;
                        pong.game.nint = pong.game.nint + 1;
                        pong.comp.computeNextMove(pong);
                    } else {
                        pong.game.nint = pong.game.nint + 1;
                        pong.comp.computeNextMove(pong);
                    }

                } else {
//                    console.log("plyaer notinfront");
                    pong.music.playSound("snap");
                    pong.anim.moveBall(pong, Qs.x, Qs.y, dura - dural, false, function() {

                        pong.game.nint = pong.game.nint + 1;
                        pong.comp.computeNextMove(pong);
                    });
                }

            });
        }
    },
    moveBall: function(pong, x, y, dura, anim, callb) {
        
        //pong.log.debug("%c * MOVEBALL:("+pong.comp.round(x)+","+pong.comp.round(y)+") "+dura ,'color: blue');
        
        if (this.engine === this.ENGINES.famous) {
//         console.log(x+" "+y+" "+(x/pong.config.W)+" "+(y/pong.config.H));
                famous.ballMoveModifier.setTransform(famous.Transform.translate(x, y, 0), {duration: dura * 1000, curve: famous.Easing.linear}, callb);
             
           //famous.ballTra.set([x/pong.config.W,y/pong.config.H], {    duration: dura*1600, curve: famous.Easing.linear},callb);
                 
                 
            }       else{
        if (anim) {
            var ratio = pong.config.bouncePosition;
            var yy = pong.ui.ball.position().top;
            var xx = pong.ui.ball.position().left;

            var halfx = (x * ratio + xx * (1 - ratio));
            var halfy = (y * ratio + yy * (1 - ratio));

            var durafirst = dura * ratio;
            var durasec = dura * (1 - ratio);

            var halfxc = halfx - pong.config.brayon;
            var halfyc = halfy - pong.config.brayon;

            var orw = pong.config.d;
            var exw = pong.config.d * pong.config.bounceEnlargement;
            var exw2 = pong.config.d * pong.config.bounceEnlargement * 0.8;
            pong.ui.ball.velocity({width: exw, height: exw}, {duration: durafirst / 2 * 1000, queue: false, easing: "easeInQuad", complete: function() {
                    pong.ui.ball.velocity({width: orw, height: orw}, {duration: durafirst / 2 * 1000, queue: false, easing: "easeOutQuad", complete: function() {
                            pong.ui.ball.velocity({width: exw2, height: exw2}, {duration: durasec / 2 * 1000, queue: false, easing: "easeInQuad", complete: function() {
                                    pong.ui.ball.velocity({width: orw, height: orw}, {duration: durasec / 2 * 1000, queue: false, easing: "easeOutQuad", complete: function() {

                                        }});
                                }});
                        }});
                }}) ;
            pong.anim.moveDiv(pong, "#ball", halfx, halfy, durafirst, function() {

                pong.ui.bouncein.css("width", 0).css("height", 0).css("top", "50%").css("left", "50%").css("opacity", 1);
                pong.ui.bounce.css("left", halfxc).css("top", halfyc);
                pong.ui.bouncein.transit({width: pong.config.bouncewidth, height: pong.config.bouncewidth, left: "25%", top: "25%", opacity: 0}, {duration: 1000});


                pong.anim.moveDiv(pong, "#ball", x, y, durasec, function() {
                    callb();
                });
            });
        } else {
            pong.anim.moveDiv(pong, "#ball", x, y, dura, callb);
        }
        }
    }
    ,
    introMoveBall: function(pong) {
        pong.anim.centerBall(pong);
        pong.anim.playIntro = true;
        pong.game.nint = 0;
        pong.anim.moveOpponent(pong);
        
        pong.game.moves = new Array();
        pong.game.moves[0] = new this.Move(0, 0.5, 0.5, null, null, null, pong.comp.generateStartAngle(pong), null);
        pong.comp.computeNextMove(pong);
        //pong.anim.moveOpponent(pong);
    }
    ,
    Move: function(n, bx, by, nx, ny, dura, alpha, bord, nxl, nyl, dural) {
        this.n = n;
        this.bx = bx;
        this.by = by;
        this.nx = nx;
        this.alpha = alpha;
        this.ny = ny;
        this.dura = dura;
        this.bord = bord;

        this.nxl = nxl;
        this.nyl = nyl;
        this.dural = dural;
        //console.log(this);
    }
    ,
    centerBall: function(pong) {
        pong.log.debug("centerball");
        if (pong.anim.engine === pong.anim.ENGINES.famous)
            famous.ballMoveModifier.setTransform(famous.Transform.translate(pong.config.centerscreenx - pong.config.d / 2, pong.config.centerscreeny - pong.config.d / 2, 0));
        else
            pong.ui.ball.css("top", pong.config.centerscreeny - pong.config.d / 2).css("left", pong.config.centerscreenx - pong.config.d / 2);
    }
    , animatedCounter: function(pong, m) {
        pong.ui.panel_gameready.fadeOut(400, function() {
            pong.music.playSound("pong");
            pong.ui.alert3.show().fadeOut({queue: false, duration: 1000, complete: function() {
                    pong.ui.alert3.hide();
                    pong.music.playSound("pong");
                    pong.ui.alert2.show().fadeOut({queue: false, duration: 1000, complete: function() {
                            pong.ui.alert2.hide();
                            pong.music.playSound("pong");
                            pong.ui.alert1.show().fadeOut({queue: false, duration: 1000, complete: function() {
                                    pong.ui.alert1.hide();
                                    pong.music.playSound("pong2");
                                    pong.ui.alertstart.show().fadeOut({queue: false, duration: 1000, complete: function() {
                                            pong.ui.alertstart.hide();
                                            pong.game.startPoint(pong, m);
                                        }});
                                }}).animate({fontSize: "240px"}, 1000);
                            ;
                        }}).animate({fontSize: "240px"}, 1000);
                    ;
                }}).animate({fontSize: "240px"}, 1000);
        });
    }

    , shakeLogo: function(pong) {
         if(pong.anim.engine===pong.anim.ENGINES.famous){
             famous.logoTra.set(15, {    duration: 1600, curve: famous.Easing.inQuad},function(){
             famous.logoTra.set(0, {    duration: 1600, curve: famous.Easing.outQuad},function(){
                  if (pong.game.step === pong.game.STEPS.WELCOME)
                            pong.anim.shakeLogo(pong);
             });
         });   
        }else{
            
        
        var yy = pong.ui.panel_welcome_in.position().top;
        var xx = pong.ui.panel_welcome_in.position().left;
        pong.anim.moveDiv(pong, "#panel-welcome-in", xx, yy + 20, 1.6, function() {

            var yy = pong.ui.panel_welcome_in.position().top;
            var xx = pong.ui.panel_welcome_in.position().left;

            pong.anim.moveDiv(pong, "#panel-welcome-in", xx, yy - 20, 1.6, function() {
                if (pong.game.step === pong.game.STEPS.WELCOME)
                    pong.anim.shakeLogo(pong);
            }, "easeInQuad");
        }, "easeOutQuad");
        }

    },
    showStar: function(pong) {
        /*if(pong.anim.engine===pong.anim.ENGINES.famous){
         famous.starTra.set(1, {    duration: 1000, curve: famous.Easing.outBack},function(){
             famous.starTra.set(0, {    duration: 1000, curve: famous.Easing.outBack},function(){
                  if (pong.game.step === pong.game.STEPS.WELCOME)
                            pong.anim.showStar(pong);
             });
         });   
        }else{*/
        pong.ui.star.velocity({opacity: 0}, {duration: 1000, easing: "easeOutQuad", complete: function() {
                pong.ui.star.velocity({opacity: 1}, {duration: 1000, easing: "easeOutQuad", complete: function() {
                        if (pong.game.step === pong.game.STEPS.WELCOME)
                            pong.anim.showStar(pong);
                    }});
            }});
        ;
        //}
    }
    , playPlayerTouchedAnim : function(pong, side) {
//        var ratio = 1.5;
        var r = pong.config.padheight;
//        var tu = "-=" + (r * (ratio - 1) / 2);
//        var td = "+=" + (r * (ratio - 1) / 2);
        var pw = pong.config.padwidth;
        var widto = 8;
        //var lef = pong.config.R + pong.config.padoffset;

        if(pong.anim.engine===pong.anim.ENGINES.famous){
             if (side === pong.game.SIDES.LEFT) {
            famous.playerModifier.setTransform(famous.Transform.scale(0.5, 1, 1), {duration: 200, curve: famous.Easing.linear},function(){
                famous.playerModifier.setTransform(famous.Transform.scale(1, 1, 1), {duration: 200, curve: famous.Easing.linear},function(){
                });
            });
            } else if (side === pong.game.SIDES.RIGHT) {
                famous.player2Modifier.setTransform(famous.Transform.scale(0.5, 1, 1), {duration: 200, curve: famous.Easing.linear},function(){
                famous.player2Modifier.setTransform(famous.Transform.scale(1, 1, 1), {duration: 200, curve: famous.Easing.linear},function(){
                });
            });
            }else{}
        }else{
        if (side === pong.game.SIDES.LEFT) {
         //   var lefto = lef + (pw - widto) / 2;
            pong.ui.leftplayer.transit({width: widto, backgroundColor: "#aaaaaa"}, {duration: 200, easing: "easeOutQuint", complete: function() {
                    pong.ui.leftplayer.transit({backgroundColor: "#FFFFFF", width: pw}, {duration: 200, easing: "easeOutQuint"});
                }
            });
        } else if (side === pong.game.SIDES.RIGHT) {
           // var rigto = lef + widto;
            //var rig = lef + widto + pw;
            pong.ui.rightplayer.transit({width: widto, backgroundColor: "#aaaaaa"}, {duration: 200, easing: "easeOutQuint", complete: function() {
                    pong.ui.rightplayer.transit({backgroundColor: "rgb(255, 163, 0)", width: pw}, {duration: 200, easing: "easeOutQuint"});
                }
            });
        }
        }

    },
    isFamousEngine:function(){
        return this.isEngine===this.ENGINES.famous;
    },
    isEngine:function(e){
        return this.pong.anim.engine===e;
    }
    , finishMoveToTheEnd: function(pong, m, n) {
        var Qend = new pong.comp.Point("Qend", pong.game.points[m].moves[n].nxend, pong.game.points[m].moves[n].nyend);
        var Qs = pong.comp.percentToPoint(pong, Qend);
        var duraend = pong.game.points[m].moves[n].duraend;


        var Qtl = new pong.comp.Point("Q", pong.game.points[m].moves[n].nx, pong.game.points[m].moves[n].ny);
        var Ql = pong.comp.percentToPoint(pong, Qtl);
        var dura = pong.game.points[m].moves[n].dura;

        pong.log.debug("*****************finish to theend" + m + " (" + n + " = (" + Ql.x + "," + Ql.y + ")->(" + Qs.x + "," + Qs.y + ")");
        pong.anim.moveBall(pong, Qs.x, Qs.y, duraend - dura, false, function() {
            //pong.anim.centerBall(pong);
        });
    },
    squeezeBallDown: function(pong) {
        var topt = pong.ui.ball.position().top + pong.config.brayon;
        var th = pong.config.brayon;
        var to = pong.config.d;
        pong.ui.ball.transit({height: th, top: topt}, {duration: 50, easing: "easeOutQuint", complete: function() {
                pong.ui.ball.transit({height: to, top: pong.ui.ball.position().top}, {duration: 50, easing: "easeOutQuint", complete: function() {
                    }});
            }});


    },
    squeezeBallUp: function(pong) {
        var th = pong.config.brayon;
        var to = pong.config.d;

        pong.ui.ball.transit({height: th}, {duration: 50, easing: "easeOutQuint", complete: function() {
                pong.ui.ball.transit({height: to}, {duration: 50, easing: "easeOutQuint", complete: function() {
                    }});
            }});

    }, moveOpponent: function(pong) {

        
        var r2 = 5000 + Math.random() * 1000;
        //pong.log.debug("Move op "+r+" "+r2);
        if(pong.anim.isEngine(pong.anim.ENGINES.famous)){
            var r=(Math.random()/2+0.25);
            //pong.log.debug("move opp"+r);
            famous.player2Tra.set(r, {    duration: r2, curve: famous.Easing.outBack},function(){
             if (pong.game.step === pong.game.STEPS.WELCOME)
                    pong.anim.moveOpponent(pong);   
            });
        }
            else
            {
                var r = Math.random() * (pong.config.H - pong.config.padheight) + "px";
        pong.ui.rightplayer.velocity({top: r}, {duration: r2, complete: function() {
                if (pong.game.step === pong.game.STEPS.WELCOME)
                    pong.anim.moveOpponent(pong);
            
            }
        });
    }
    }
}
var util = {
    pong: null,
    tsToDate: function(ts) {
        if (ts)
            return new Date(ts * 1000).toISOString().
                    replace(/T/, ' ').// replace T with a space
                    replace(/\..+/, '');
        else
            return "-";
    },
    now: function() {
        return    new Date().toISOString().
                replace(/T/, ' ').// replace T with a space
                replace(/\..+/, '');
    },
    timeSince: function(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
};

var conn = {
    pong: null,
    isConnected: false,
    isLogged: false,
    socket: null,
    emit: function(m, v) {
        this.pong.log.emit(m);
        this.socket.emit(m, v);
    },
    deleteLocalId: function() {
        $.jStorage.deleteKey("gid");
    },
    sid: null,
    storeGid: function(gid) {
        console.log("SET GID " + gid);
        $.jStorage.set("gid", gid);
    },
    readGid: function() {
        return $.jStorage.get("gid");
    },
    loginSuccessful:function(y){
        var pong=this.pong;
        //console.log(pong.ui);
    pong.ui.hideLoadingScreen();
    pong.ui.loadLoginInfo(pong,y);
    pong.game.updatePlayerList(pong);
    pong.ui.afterLogin(pong);
    console.log("knwo?");
    console.log(y);
    if(y.knownPlayer){
        console.log("KNOWN");
        $(".untour").show();
        $(".tour").hide();
        $(".bar-knownplayer").show();
        $(".bar-unknownplayer").hide();
    }else{
        console.log("UNKNOWN");
        $(".untour").hide();
        $(".tour").show();
        $(".bar-unknownplayer").show();
        $(".bar-knownplayer").hide();
        }
    pong.ui.afterLogin(pong);
    $("#reconnecting").hide();
    //$("#panel-step-sendpayment").fadeIn();
    }
};
var log = {
    event: function(u) {
        console.log(u);
    },
    receive: function(u) {
        console.log("--> " + u);
    },
    emit: function(u) {
        console.log("<-- " + u);
    },
    debug: function(u) {
        if (typeof (u) === 'object')
            console.log("    ", u);
        else
            console.log("    " + u);
    },
    err: function(u) {
        console.log("ERR " + u);
    },
    info: function(u) {
        console.log("INFO " + u);
    }
};
var input = {
    mousey:null,
    mousex:null,
    
    mouseoy:null,
    mouseox:null,
    getUserAgentNavName:function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}
    
};
var player = {
    pong: null,
    name: null,
    country: null,
    address: null,
    playerid: -1,
};
var pong = {
    music: music,
    comp: comp,
    input: input,
    anim: anim,
    game: game,
    player: player,
    config: config,
    util: util,
    ui: ui,
    log: log,
    conn: conn,
    loaded:false,
    init: function(callb) {
        console.log("PONG INIT");
        this.ui.init();
        this.config.init(this);
        this.comp.pong = this;
        this.music.pong = this;
        this.conn.pong = this;
        this.log.pong = this;
        this.ui.pong = this;
        this.util.pong = this;
        this.player.pong = this;
        this.game.pong = this;
        this.anim.pong = this;
        this.ui.pong = this;
        this.input.pong = this;
        this.loaded=true;
        this.conn.socket = io.connect();
         if(this.config.ENABLE_SOUNDS)
            $.ionSound({sounds: pong.music.sounds, volume: 0.5, path: "sounds/", preload: true});
        console.log("PONG EVENTS");
        doEvents();
        console.log("PONG START");
        
        
        //this.anim.initFamous(callb);
        callb();
    }
};



