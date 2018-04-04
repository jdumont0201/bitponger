$(document).ready(function() {
    $(".room-sel").click(function(){
           var val=$(this).attr("val");
            pong.ui.showLoadingScreen();
            if($(this).hasClass("room-sel-active")){
                
            pong.conn.emit('room-leaveroom', {'size': val});    
        }else{
            pong.conn.emit('room-askpermission', {'size': val});}
    });
    
    $("#user").click(function(){
        if(pong.ui.rs.is(":visible")){
            $("#user").removeClass("bluebg");
            pong.ui.rs.hide();
        }else{
            $("#user").addClass("bluebg");
            pong.ui.rs.css("height",pong.config.H-pong.config.R-4);
            
            pong.ui.rs.show();
            $("#rs-in-top").css("height",pong.config.H-pong.config.R-4-$("#rs-in-bottom").height());
            pong.conn.emit('room-askcontent');    
   }
    });
   $("#sound").click(function(){
       
        if(pong.config.ENABLE_SOUNDS){
            $("#sound img").css("opacity",0.6);
           pong.music.stopBgMusic(); 
           pong.config.ENABLE_SOUNDS=false;
            pong.music.currentBgMusic=null;
       }else{console.log("s"+pong.game.step);
           $("#sound img").css("opacity",1);
           pong.config.ENABLE_SOUNDS=true;
           pong.music.changeBgMusic(pong, pong.game.step);
       }
   
       
       
    });
    
    $("#rightspace-close").click(function(){
        
       $(".content").removeClass("content-small-left");
       $("#rightspace").hide();
       pong.ui.resizeElements();
    });
    
    $("#showlog").click(function(){
        
       $(".content").addClass("content-small");
       $("#bottomspace").show();
       pong.ui.resizeElements();
    });
    
    $("#bottomspace-close").click(function(){
        
       pong.ui.content.removeClass("content-small");
       $("#bottomspace").hide();
       pong.ui.resizeElements();
    });
    
   $("#star").click(function(){
       $("#button-playnow").trigger( "click" );
   });
    $(".tabc table").delegate(".button-challenge", "click", function() {
        pong.music.playButtonSound();
        $(this).val("Asking...");
        var id = $(this).attr("oppid");
        var amount = $(this).attr("amount");
         
        console.log("<-- challenge-asking");
        pong.conn.emit('challenge-asking', {amount:amount,oppid: id});
        return false;
    });
    $("#rightspace-table ").delegate(".button-challenge", "click", function() {
        
        pong.music.playButtonSound();
        $(this).val("Asking...");
        var id = $(this).attr("oppid");
        var amount = $(this).attr("amount");
         
        console.log("<-- challenge-asking");
        pong.conn.emit('challenge-asking', {amount:amount,oppid: id});
        return false;
    });
    $("#rechallenge").delegate(".rechallenge-button", "click", function() {
        pong.music.playButtonSound();
        $(this).val("Asking...");
        var id = $(this).attr("oppid");
        var amount = $(this).attr("amount");
        console.log("<-- challenge-asking");
        pong.conn.emit('challenge-asking', {amount:amount,oppid: id});
        return false;
    });
    $("#challenger-list").delegate(".button-askedchallenge-accept", "click", function() {
        //alert("a");
        pong.music.playButtonSound();
        var cid = $(this).attr("cid");
        $("#game-cid").val(cid);
        pong.conn.emit('challenge-accepted', {'cid': cid});
        return false;
    });

    $("#challenger-list").delegate(".button-askedchallenge-decline", "click", function() {
        pong.music.playButtonSound();
        var cid = $(this).attr("cid");
        $("#tr" + cid).fadeOut(400, function() {
            if ($('#challenger-list tbody tr:visible').length === 0) {
                $("#panel-askedchallenge").fadeOut();
            }
        });
        pong.conn.emit('challenge-declined', {'cid': cid});
        return false;
    });
    
     $("#button-step-gameready-cancel").click(function() {
        $("#panel-gameready").fadeOut(); 
        pong.ui.openPanel(pong,pong.ui.panel_joinroom);
        $(".in-game").fadeOut();
       pong.game.resetGameReadyButton();
       pong.conn.emit('challenge-cancel');
     });
     
     $("#button-gameready").click(function() {
        $("#button-gameready").val("Waiting for the other player...").prop("disabled", true);
        pong.conn.emit('game-playerready', $("#game-cid").val());

        return false;
    });
    $(document).mousemove(function(event) {
        
        if(pong.game.isPlayerMovingStep())
            pong.game.movePlayer(pong, event.pageY);
        
    });
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        pong.game.movePlayer(pong,touch.pageY);
    }, false);
    $(window).resize(function() {
        pong.ui.resizeElements();
    });
    window.onbeforeunload = function() {
        //pong.conn.deleteLocalId();
        if(!pong.config.debug)
            if(pong.game.iProgressed)
                return "Leaving the game will lose your progress. Are you sure ?";
    };
    $(".theme").click(function() {
        var col = $(this).attr("val");
        $(".content").removeClass("theme-"+pong.ui.currentTheme).addClass("theme-"+col);
        pong.ui.currentTheme=col;
    });
    $("#button-howtoplay").click(function() {
        pong.music.playButtonSound();
        pong.ui.openPanel(pong,pong.ui.panel_howitworks);
    });
    $("#button-halloffame").click(function() {
        pong.music.playButtonSound();
        pong.ui.openPanel(pong,pong.ui.panel_halloffame);
    });
    $("#button-faq").click(function() {
        pong.music.playButtonSound();
        pong.ui.openPanel(pong,pong.ui.panel_faq);
    });
    
    $("#button-howitworks-close").click(function() {
        pong.music.playButtonSound();
        pong.ui.closePanel(pong,pong.ui.panel_howitworks);
    });
    $("#button-faq-close").click(function() {
        pong.music.playButtonSound();
        pong.ui.closePanel(pong,pong.ui.panel_faq);
    });
    $("#button-opponentdisconnected-close").click(function() {
        pong.music.playButtonSound();
        pong.ui.closePanel(pong,pong.ui.panel_opponentdisconnected);
    });
    $("#button-halloffame-close").click(function() {
        pong.music.playButtonSound();
        pong.ui.closePanel(pong,pong.ui.panel_halloffame);
    });
    $("#game-rechallenge").click(function(){
        pong.conn.emit("ask-rechallenge");
    });
    $("#game-returntothehome").click(function(){
       pong.ui.returnHome(pong);
    });
    
    $("#button-loadtransactions").click(function(){
        console.log("<-- button-loadtransactions");
        pong.conn.emit('ask-findtransactions');
    });
    $("#button-loadrewards").click(function(){
        console.log("<-- button-loadrewards");
        pong.conn.emit('ask-findrewards');
    });
    $("#game-returnhome").click(function(){
        pong.ui.closePanel(pong,pong.ui.panel_createplayer);
        pong.ui.returnHome(pong);
    });
    $("#game-returntotheroom").click(function(){
        pong.ui.returnHall();
        
    });
    //$("#button-show-login").click();
    $("#button-feedaccount").click(function(){
        pong.ui.prepareConfig(pong);
       //pong.ui.displayFeedAccount(pong,res.to); 
       pong.ui.showLoadingScreen();
       pong.conn.emit('ask-feedaccount');
    });
    $("#button-show-login").click(function(){
      // pong.ui.prepareConfig(pong); 
       pong.ui.closePanel(pong,pong.ui.panel_createplayer);
       pong.ui.openPanel(pong,pong.ui.panel_login);
       
    }); 
    $("#button-show-logout").click(function(){
       pong.ui.prepareConfig(pong);
       pong.ui.openPanel(pong,pong.ui.panel_logout);
    });
    $("#button-logout").click(function(){
        pong.ui.showLoadingScreen();
        pong.conn.emit('ask-logout');
    });
    $("#button-show-account").click(function(){
       pong.ui.prepareConfig(pong);
       $("#panel-account").css("z-index","10").fadeIn(); 
       
    });
    $("#button-show-tx").click(function(){
        pong.ui.prepareConfig(pong);
       console.log("<-- button-loadtransactions");
        pong.conn.emit('ask-findtransactions');
       pong.ui.openPanel(pong,pong.ui.panel_tx);
       
    });
    
    $(".closebutton").click(function(){ 
        $(this).    closest("div").hide();
        pong.ui.decreaseWindowCount();
        pong.ui.checkWelcome();
    });
    $("#button-login").click(function(){ 
        pong.ui.showLoadingScreen();
        pong.music.playButtonSound();
        var loginaddress = $("#login-address").val();
        var loginpassword = $("#login-password").val();
        console.log("<-- sql-asklogin"); 
        pong.conn.emit('sql-asklogin',{address:loginaddress,password:loginpassword});
        
    });
    
    $("#button-saveplayer").click(function() {
        $("#form-createplayer").submit();
        
    });
    
    $("#button-qrcode-refresh").click(function(){
    pong.game.updateQRSrc();    
    });
  
    
    $("#button-step-hall-return").click(function() {
        pong.music.playButtonSound();
        $("#panel-step-sendpayment").fadeIn();
        $("#panel-joinroom").fadeOut();
    }   );
    $("#button-step-chooseroom-return").click(function() {
        pong.music.playButtonSound();
        $("#panel-step-sendpayment").fadeOut();
        $("#panel-step-createplayer").fadeIn();
        $("#button-saveplayer").val("Submit").prop('disabled', false);
        
    });
    $("#button-step-sendpayment-return").click(function() {
        pong.music.playButtonSound();
        if(pong.config.isSmallScreen()){
        $("#button-step-chooseroom-return").show();
        $(this).hide();
        $("#payment-left").fadeIn();
        $("#payment-right").hide();;
    }else{
        //pong.ui.closePanel(pong,pong.ui.panel_sendpayment);
        pong.ui.openPanel(pong,pong.ui.panel_createplayer);
        }
    });
    $(".radio-chooseroom").change(function() {
        if(pong.config.isSmallScreen()){
            var lef=$("#payment-left");
            $(lef).hide();
            $("#payment-right").fadeIn();
            $("#button-step-sendpayment-return").show();
            $("#button-step-chooseroom-return").hide();
        }else{
            
        }
        if(parseInt($("input[name=radio-chooseroom]:checked").val())===-2){
            $("#payment-right-free").show();
            $("#payment-right-charge").hide();
            
        }else{
            $("#payment-right-free").hide();
            $("#payment-right-charge").show();
            pong.game.updateQRSrc();
        }
    });
    $(".payment-amount").click(function() {
        if(pong.config.isSmallScreen()){
            var lef=$("#payment-left");
            $(lef).hide();
            $("#payment-right").fadeIn();
            $("#button-step-sendpayment-return").show();
            $("#button-step-chooseroom-return").hide();
        }else{
            
        }
        if(parseInt($("input[name=radio-chooseroom]:checked").val())===-2){
            $("#payment-right-free").show();
            $("#payment-right-charge").hide();
            
        }else{
            $("#payment-right-free").hide();
            $("#payment-right-charge").show();
        pong.game.updateQRSrc();
        }
    });
    
    
        
    $("#button-updateroomcontent").click(function() {
        console.log("up");
        pong.ui.showLoadingScreen();
        pong.music.playSound("snap");
        pong.game.updatePlayerList(pong);
    });
 /*
    $("#disconnect").click(function() {
        var url = "disconnect";
        ajaxPerform(url, function(response) {
            $("#ajaxloader").hide();
            location.reload();
        });
    });*/
    $("#button-enterasguest").click(function(){
          pong.game.playerAsGuest(pong);
       
    });
   
    $("#button-joinroom-edit").click(function() {
        $("#panel-joinroom-recap-box").slideUp(200,function(){
        $("#panel-joinroom-choose-box").slideDown(400,function(){
            
        });
        });
    });
    $("#button-joinroom-edited").click(function() {
        $("#panel-joinroom-choose-box").slideUp(400,function(){
        $("#panel-joinroom-recap-box").slideDown(400,function(){
            
        });
        });
    });
    $("#button-playnow").click(function() {
        console.log("playnow");
        pong.ui.prepareConfig(pong);
        console.log(pong.conn.isLogged);
        if(pong.conn.isLogged){
            console.log("isloged");
            pong.game.updatePlayerList(pong);
            pong.ui.openPanel(pong,pong.ui.panel_joinroom);    
            
            
        }else{
        pong.ui.openPanel(pong,pong.ui.panel_createplayer);
    }
    });

    $("#button-declarepaymentsent").click(function() {
        
        pong.music.playButtonSound();
        $("#step-send-payment-check").show();
        $("#button-declarepaymentsent").val("Checking ...").prop("disabled",true);
        pong.ui.startCheckPaymentAttemps(pong);
    });
    
});








