var debug=true;
        
function isSmallScreen(){
    return $( window ).width()<480;
    }
function resizeMenu(){
        if(isSmallScreen()){
        $("#payment-left").addClass("paymentleft-small");
        $("#payment-right").addClass("paymentright-small");
    }
    }

    
$(document).ready(function() {
    var options = {
  width: 1, timing:500  }
    $('#playerinfo-flapscore-left-flap').flapper(options).val(0).change(); 
    $('#playerinfo-flapscore-right-flap').flapper(options).val(0).change();

    /*$("#theme-dark").click(function(){
     $("body").css("background","#222222");
     });*/
     resizeMenu();
    //$(".canvas").css("max-height",$(window ).height()-40-40-60);
    $(".theme").click(function() {
        var col = $(this).attr("val");
        $("body").css("background", "#" + col);
    });
    /*$("#theme-green").click(function(){
     $("body").css("background","#38522E");
     });
     $("#theme-blue").click(function(){
     $("body").css("background","#337EA8");
     });
     */
    $("#button-howtoplay").click(function() {
        playButtonSound();
        $("#panel-howitworks").fadeIn();
    });
    $("#button-halloffame").click(function() {
        playButtonSound();
        $("#panel-halloffame").fadeIn();
    });
    $("#button-faq").click(function() {
        playButtonSound();
        $("#panel-faq").fadeIn();
    });
    
    $("#button-howitworks-close").click(function() {
        playButtonSound();
        $("#panel-howitworks").fadeOut();
    });
    $("#button-faq-close").click(function() {
        playButtonSound();
        $("#panel-faq").fadeOut();
    });
    $("#button-opponentdisconnected-close").click(function() {
        playButtonSound();
        $("#panel-opponentdisconnected").fadeOut();
    });
    $("#button-halloffame-close").click(function() {
        playButtonSound();
        $("#panel-halloffame").fadeOut();
    });
    $("#game-rechallenge").click(function(){
        
    });
    $("#game-returntotheroom").click(function(){
        playButtonSound();
        changeBgMusic(2);
        $("#panel-game-end").fadeOut();
        $(".in-game").fadeOut();
        $(".game-out").fadeIn();
        $("#panel-step-sendpayment").fadeIn();
        if(isSmallScreen()){
            $("#payment-left").show();
            $("#payment-right").hide();
        }else{
            $("#payment-left").show();
            $("#payment-right").show();
            
        }
        console.log("--> game-returnroom"); 
        socket.emit('game-returnroom');
        $("#button-gameready").val("Let's play !").prop("disabled",false);
        
        
    });
    socket.on("sql-playersaved",function(res){
       $("#player-address").prop('disabled', true);
            $("#player-address-save").hide();
            var roomsize=res.roomsize;
            console.log("roomsize");
            console.log(res);
            for(var key in roomsize){
                
            $("#roomsize-"+key).html(" - "+roomsize[key]+" players");
            }
            $("#panel-step-createplayer").fadeOut();
            $("#panel-step-sendpayment").fadeIn();
          //  var res = response;
           // if (res.playerid > 0) {
                $("#panel-step-createplayer").fadeOut();
                $("#panel-step-sendpayment").fadeIn();
                
                //var callbackid = res.id; 
                var to = res.to;
                $("#tid").val(res.id);
                $("#payment-hash").val(to);
                $("#payment-address").val(to); 
                updateQRSrc();
                //rename();
                if(isSmallScreen()){
                    $("#button-step-chooseroom-return").show();
                    $("#button-step-sendpayment-return").hide();
                    $("#payment-right").hide();
                }else{
                       $("#button-step-chooseroom-return").show();
                       $("#button-step-sendpayment-return").hide();
                } 
    });
    $("#button-saveplayer").click(function() {
        isProgressed=true;
        $("#button-saveplayer").val("Creating player...").prop('disabled', true);
        playButtonSound();
        var playeraddress = $("#player-address").val();
        var country = $("#player-country :selected").val();
        var nickname = $("#player-nickname").val();
        nickname = nickname.trim();
        m=nickname;
                c=country;
        if (nickname.length === 0) {
            nickname = "Player";
        }
        if (!country) {
            country = "ZZ";
        }
        //var url = "http://www.thelostbitcoin.com/transaction/" + playeraddress;
        
        
        console.log("<-- sql-savenewplayer");
        socket.emit('sql-savenewplayer',{address:playeraddress,name:nickname,country:country});
        //var url = "http://www.thelostbitcoin.com/player/new/" + playeraddress + "/" + nickname + "/" + country;

        //ajaxPerform(url, function(response) {
            
            //}
            //$("#ajaxloader").hide();
        
    });
    
    function updateQRSrc() {
        var img = $("#bitcoin-qr");
        var overlay = $("#bitcoin-qr-overlay");
        overlay.fadeIn();
        var paymenthash = $("#payment-hash").val();
        var amount = $("input[name=radio-chooseroom]:checked").val();
        if (amount > 0) {
            img.load(function() {
                overlay.hide();
            }).attr("src", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:" + paymenthash + "?amount=" + amount + "&label=Bitpong");
        } else {
            img.load(function() {
                overlay.hide(   );
            }).attr("src", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:" + paymenthash + "?label=Bitpong");
        }
    }
  
    function joinRoom() {
        // var tid = $("#tid").val();
        var url = "joinroom";
        ajaxPerform(url, function(response) {
            var res = jQuery.parseJSON(response);
            $("#ajaxloader").hide();
        });

    }
    $("#button-step-chooseroom-return").click(function() {
        playButtonSound();
        $("#panel-step-sendpayment").fadeOut();
        $("#panel-step-createplayer").fadeIn();
        $("#button-saveplayer").val("Submit").prop('disabled', false);
        
    });
    $("#button-step-sendpayment-return").click(function() {
        playButtonSound();
        $("#button-step-chooseroom-return").show();
        $(this).hide();
        $("#payment-left").fadeIn();
        $("#payment-right").hide();;
    });
    $(".radio-chooseroom").change(function() {
        if(isSmallScreen()){
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
        updateQRSrc();
        }
    });
    $(".payment-amount").click(function() {
        if(isSmallScreen()){
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
        updateQRSrc();
        }
    });
    // var found = false;
    var starttimer = false;
    var tim;
    var nn = 0;
    var nns=5;
    
    
    socket.on("sql-findpayment-response",function(result){
      console.log("--> sql-findpayment-response"); 
            
            //console.log(result);
            found=(result.found === "FOUND");
            console.log(result);
            if (found) {
                
                
                $("#transaction-hash").attr("href", "https://blockchain.info/fr/tx/" + result.hash).html(result.hash);
                $("#transaction-amount").html(result.amount);
                $("#count-amount").html(result.amount*1000);
                $("#intro").fadeOut();
                $("#step-send-payment-check").html( "Payment found.");
                $("#panel-joinroom").fadeIn();
                $("#panel-step-sendpayment").fadeOut();
                $("#join-room").val("Join the room").removeClass("buttonwhite").addClass("buttonblue").prop('disabled', false);
                playerFeed(result.amount);
                updatePlayerList();
              //  joinRoom();
                //clearInterval(tim);
                
            }else{
                if(nn<10)
                    checkDec();
        }
            
        
    });
    function checkDec(){
        //console.log("ckeckdec"+nns);
        if(nns>=0){
            $("#step-send-payment-check").html( "Payment not found at attempt #"+nn+". New attempt in "+nns+"s...");
            nns=nns-1;
            setTimeout(checkDec,1000);
        }else{
            checkFound();
            nns=5;
        }
            
    }
    function checkFound() {
        nn = nn + 1;
        $("#button-declarepaymentsent").val("Checking ...").prop("disabled",true);
        $("#step-send-payment-check").html( "Payment not found at attempt #"+nn+". New attempt in 5s...");
        var tid = $("#tid").val();
        var url = "findpayment/" + tid;
        console.log("<-- sql-findpayment"+nn);
        socket.emit("sql-findpayment");
        
        
    }
    function showAfterPayment(){
        
    }
    
    
    function pcheckFound() {
        tim = window.setTimeout(function() {
            checkFound();
        }, 2000);
    }
    function clearScreenForGameStart() {
        $("#exp").fadeOut();
    }
    $("#button-updateroomcontent").click(function() {
        playSound("tap");
        updatePlayerList();
    });
 
    $("#disconnect").click(function() {
        var url = "disconnect";
        ajaxPerform(url, function(response) {
            $("#ajaxloader").hide();
            location.reload();
        });
    });
    $("#button-enterasguest").click(function(){
        playButtonSound();
                $("#intro").fadeOut();
                $("#panel-joinroom-thank").hide();
                $("#panel-joinroom").fadeIn();
                $("#panel-step-sendpayment").fadeOut();
                $("#join-room").val("Join the room").removeClass("buttonwhite").addClass("buttonblue").prop('disabled', false);
                playerAsGuest();
                updatePlayerList();
                
        
    });
    $("#join-room").click(function() {
        joinRoom();
    });
    //showScorepanel(3,2);
    $("#button-playnow").click(function() {
        playSound("drag");
        $("#button-saveplayer").val("Submit").prop("disabled",false);
        playIntro=false;
        anim.kill();
        $("#ball").fadeOut();
        
        centerBall();
        $("#ball").fadeIn();
        setStep(STEPS.CONFIG);
        //step="config";
        nextmove=false;
        $("#panel-welcome").fadeOut();
        $("#exp").fadeOut();
        $("#panel-step-createplayer").fadeIn();
    });
    $("#tabs").tabs();
    //        $("#left").css("left",($( window ).width()-$("#left").outerWidth())/2);
    $("#button-declarepaymentsent").click(function() {
        playButtonSound();
        $("#step-send-payment-check").show();
        $("#button-declarepaymentsent").val("Checking ...").prop("disabled",true);
        pcheckFound();
    });
    
});








