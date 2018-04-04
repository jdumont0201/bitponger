function shakeLogo(){
    TweenLite.to("#panel-welcome", 1.600, {top:"+=20", ease: Power2.easeInOut,onComplete:function(){
        TweenLite.to("#panel-welcome", 1.600, {top:"-=20", ease: Power2.easeInOut,onComplete:function(){
             if(step===STEPS.WELCOME)   
                 shakeLogo();
            }});
    }
});
}
function showStar() {
     TweenLite.to("#star", 2, {opacity:0, ease: Power2.easeInOut,onComplete:function(){
        TweenLite.to("#star", 2, {opacity:0.8, ease: Power2.easeInOut,onComplete:function(){
             if(step===STEPS.WELCOME)   
                 showStar();
            }});
    }
});
     }
$(document).ready(function() {
    //$("#panel-welcome").css("opacity",0);
    //TweenLite.to("#panel-welcome", 1.600, {opacity:1,rotation: "-=180", ease: Linear.easeNone});
$("#panel-welcome").fadeIn();
    shakeLogo();
   showStar();
    
   $("#star").click(function(){
       $("#button-playnow").trigger( "click" );
   });
    $(".tabc table").delegate(".button-challenge", "click", function() {
        playButtonSound();
        $(this).val("Asking...");
        var id = $(this).attr("oppid");
        
        console.log("<-- challenge-asking");
        socket.emit('challenge-asking', {'oppid': id});
        return false;
    });
    $("#challenger-list").delegate(".button-askedchallenge-accept", "click", function() {
        //alert("a");
        playButtonSound();
        var cid = $(this).attr("cid");
        $("#game-cid").val(cid);
        socket.emit('challenge-accepted', {'cid': cid});
        return false;
    });

    $("#challenger-list").delegate(".button-askedchallenge-decline", "click", function() {
        playButtonSound();
        var cid = $(this).attr("cid");
        $("#tr" + cid).fadeOut(400, function() {
            if ($('#challenger-list tbody tr:visible').length === 0) {
                $("#panel-askedchallenge").fadeOut();
            }
        });
        socket.emit('challenge-declined', {'cid': cid});
        return false;
    });
    $("#panel-howitworks"). draggable();
    $("#panel-faq"). draggable();
    $("#panel-askedchallenge"). draggable();
     $("#button-step-gameready-cancel").click(function() {
        $("#panel-gameready").fadeOut(); 
        $("#panel-joinroom").fadeIn();
        $(".in-game").fadeOut();
       resetGameReadyButton();
       socket.emit('challenge-cancel');
     });
     $("#button-gameready").click(function() {
        $("#button-gameready").val("Waiting for the other player...").prop("disabled", true);
        socket.emit('game-playerready', $("#game-cid").val());

        return false;
    });
$( "#tabs" ).tabs();
    initGame();
    introMoveBall();
    //splashMoveBall();
    $(document).mousemove(function(event) {
        movePlayer( event.pageY);
    });
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        movePlayer(touch.pageY);
    }, false);
    $(window).resize(function() {
        W = $(content).width();
        H = $(content).height();
        centerscreenx = W / 2;
        centerscreeny = H / 2;
        
        speed = 1;
    });
    $("#tabs").tabs();
    window.onbeforeunload = function() {
        //if(isProgressed)
        //return "Leaving the game will lose your progress. Are you sure ?";
    }
});