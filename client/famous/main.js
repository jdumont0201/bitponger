var famous = {
    mainContext: null,
    ballMoveModifier: null,
    logoMoveModifier: null,
    leftPlayerMoveModifier: null,
    leftPlayerModifier:null,
    rightPlayerMoveModifier: null,
    Transform: null,
    Easing: null,
    MouseSync: null,
    X: null,
    Y: null,
    playerSide: null,
    horlineTra: null,
    playerModifier:null,
    player2Modifier:null,
    leftplayerpos: null,
    leftPlayer: null,
    rightPlayer: null,
    rightplayerpos: null,
    starTra:null, 
    logoTra:null,
    playerTra:null,
    player2Tra:null,
    ballTra:null,
    ballOpaTra:null,
    outgameOpaTra:null,
    ingameOpaTra:null,
    
    logoH:200
//    Transitionable:null,
//    Modifier :null
};

function initF(callb) {
    console.log("INIT FAMOUS");
    famous.mainContext = null;
    famous.ballMoveModifier = null;
    famous.Transform = null;
    famous.Easing = null;
    famous.sync = null;
    ;

    define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Modifier = require('famous/core/Modifier');
        famous.Transform = require('famous/core/Transform');
        var Modifier = require("famous/core/Modifier");
        var StateModifier = require('famous/modifiers/StateModifier');
        famous.Easing = require('famous/transitions/Easing');
        var Surface = require('famous/core/Surface');
        var MouseSync = require("famous/inputs/MouseSync");
        var TouchSync = require("famous/inputs/TouchSync");
        var ScrollSync = require("famous/inputs/ScrollSync");
        var GenericSync = require("famous/inputs/GenericSync");
        var Transitionable = require("famous/transitions/Transitionable");

        GenericSync.register({"mouse": MouseSync, "touch": TouchSync, "scroll": ScrollSync});
        //var ImageSurface = require('famous/surfaces/ImageSurface');var position = new Transitionable([0,0]);
//        famous.position = new Transitionable([0, 0]);
        famous.sync = new MouseSync();    // create the main context
        famous.sync = new GenericSync({"mouse": {}, "touch": {}, "scroll": {scale: .5}});
        famous.mainContext = Engine.createContext();

        famous.horlineTra = new Transitionable( 0.5);
        famous.ballTra = new Transitionable([0, 0]);
        famous.ballOpaTra = new Transitionable(1);
        famous.logoTra = new Transitionable(0);
        famous.outgameOpaTra = new Transitionable(1);
        famous.ingameOpaTra = new Transitionable(1);
        famous.starTra = new Transitionable(0);
        famous.player2Tra = new Transitionable(0.5);
        famous.playerTra = new Transitionable(0.5);
        
        
        var modifier = new Modifier({
            align: function() {                return [0,famous.horlineTra.get()];            },
            origin: function() {                return [0,0];            }
            , opacity: function() {              return famous.ingameOpaTra.get();            }
        });
        famous.playerModifier = new Modifier({
            align: function() {              return [0,famous.playerTra.get()];            },
            origin: [0,0.5],
            opacity: function() {              return famous.ingameOpaTra.get();            }
        });
        famous.player2Modifier = new Modifier({
            align: function() {              return [0,famous.player2Tra.get()];            },
            origin: [0.5,0.5],
             opacity: function() {              return famous.ingameOpaTra.get();            }
        });
        var starModifier = new Modifier({
            origin: [0,0],
            transform: famous.Transform.translate(0,0,10),
            opacity: function() {              return famous.starTra.get();            }
        });
        var logoModifier = new Modifier({
            align: function() {              return [0.5,(famous.logoH  +famous.logoTra.get())/pong.config.H];            },
            origin: [0.5,0.5], 
              opacity: function() {              return famous.outgameOpaTra.get();            }
        });
        var logoSModifier = new Modifier({
            align: function() {              return [0.5,(  famous.logoH +famous.logoTra.get())/pong.config.H];            },
            origin: [0,1], 
              opacity: function() {              return famous.outgameOpaTra.get();            }
        });
        var logoS2Modifier = new Modifier({
            align: function() {              return [0.5,(famous.logoH   +famous.logoTra.get())/pong.config.H];            },
            origin: [1,1], 
              opacity: function() {              return famous.outgameOpaTra.get();            }
        });
        var logotxtModifier = new Modifier({
            align: function() {              return [0.5,famous.logoH/pong.config.H];            },
            origin: [0.5,0.5],
             transform: famous.Transform.rotateZ(-Math.PI/16),
               opacity: function() {              return famous.outgameOpaTra.get();            }
        });
        
//        var sizeModifier = new Modifier();
//            sizeModifier.sizeFrom(function(){
//                var size = famous.mainContext.getSize();
//                return [10, pong.config.padheightpercent* pong.config];
//            });

        var horline = new Surface({            size: [undefined, 1],            properties: {borderTop: 'dashed 1px white'}        });
        var ball = new Surface({            size: [16, 16],            content: '',            properties: {                color: 'white',                borderRadius: '16px',                         background: 'radial-gradient(circle at 4px 5px, rgba(249,215,103,1), rgba(177, 100, 3, 1))',                         backgroundColor: 'rgb(249,215,103)',           }       });
        var star = new Surface({            size: [48, 48],            content: '',            properties: {                left:(pong.config.W/2+30)+'px',                                   background: 'url(http://www.cityscooter.fr/img/options2.png) no-repeat -118px -603px',                 position:'absolute',                 top:'260px'            }       });        
        var logo = new Surface({            size: [141, 141],            content: '',            properties: { border: 'solid 5px white',   background: 'radial-gradient(circle at 44px 41px, rgba(249,215,103,1), rgba(177, 100, 3, 1))',  backgroundColor: ' rgb(177, 100, 3)',     borderRadius:'141px',                      }       });
        var logosine = new Surface({            size: [76, 55],            content: '',            properties: {     border: 'solid 4px white',    height: '55px',marginTop:'20px',marginLeft:'-5px',    borderTopLeftRadius: '80px',    borderRight: '0px',    borderBottom: '0px',        borderTopRightRadius: '39px'            }       });
        var logosine2 = new Surface({            size: [59, 34],            content: '',            properties: {      border: 'solid 4px white',height: '34px',marginTop:'54px',marginLeft:'-1px',borderBottomRightRadius: '100px',borderLeft: 0,borderTop: '0px',borderBottomLeftRadius: '78px'            }       });
        var logotxt = new Surface({            size: [260, 48],            content: 'Bitponger',            properties: {   fontSize:'50px',lineHeight:'50px',fontFamily: "'Permanent Marker','Open Sans',Tahoma",color:'rgb(255, 171, 21)',textShadow:' 3px 3px 1px rgb(73, 55, 9)'         }       });
        famous.leftPlayer = new Surface({            size: [10, pong.config.padheightpercent*pong.config.H],            content: '',            properties: {                background: 'white',left:(pong.config.R+pong.config.padoffset)+'px'            }        });
        famous.rightPlayer = new Surface({            size: [10,pong.config.padheightpercent*pong.config.H],            content: '',            properties: {                background: 'orange',right:(pong.config.R)+'px'                    }        });

    
        
        
        famous.ballMoveModifier = new Modifier(               {
            align: function() {                return famous.ballTra.get();            },
            origin: function() {                return famous.ballTra.get(); },
            opacity:function(){return famous.ingameOpaTra.get();}        }
                );
        
        famous.mainContext.add(famous.ballMoveModifier).add(ball);
        famous.mainContext.add(famous.playerModifier).add(famous.leftPlayer);
        famous.mainContext.add(famous.player2Modifier).add(famous.rightPlayer);
        //famous.mainContext.add(starModifier).add(star);
        famous.mainContext.add(logoModifier).add(logo);
        famous.mainContext.add(logoSModifier).add(logosine);
        famous.mainContext.add(logoS2Modifier).add(logosine2);
        famous.mainContext.add(logotxtModifier).add(logotxt);
        famous.mainContext.add(modifier).add(horline);


        Engine.on('mousemove', function(e) {          doMouseEvent(e)   ;     });
        Engine.on('touchmove', function(e) {         doTouchEvent(e);        });
        ball.on('mousemove', function(e) {          doMouseEvent(e)   ;     });
        ball.on('touchmove', function(e) {         doTouchEvent(e);        });
        famous.rightPlayer.on('mousemove', function(e) {          doMouseEvent(e)   ;     });
        famous.rightPlayer.on('touchmove', function(e) {         doTouchEvent(e);        });
        famous.leftPlayer.on('mousemove', function(e) {          doMouseEvent(e)   ;     });
        famous.rightPlayer.on('touchmove', function(e) {         doTouchEvent(e);        });
        callb();
    });
}
function doTouchEvent(e){
      var yy=e.touches[0].pageY;
            var xx=e.touches[0].pageX;
            if(pong.game.isPlayerMovingStep())
            storeMousePosition(xx,yy);
        }
function doMouseEvent(e){
      var yy=e.y;
            var xx=e.x;
            if(!e.y){
                xx=e.clientX;
                yy=e.clientY;
            }
            
            if(pong.game.isPlayerMovingStep())
          storeMousePosition(xx,yy);
    }
function storeMousePosition(xx,yy){
    
     pong.input.mouseoy=pong.input.mousey;
     pong.input.mouseox=pong.input.mousex;
     if(  yy===1 ){
                        //console.log("cancel");   
            }else{
            
            pong.input.mousey=yy;
            pong.input.mousex=xx;
                
            famous.horlineTra.set(yy / pong.config.H);
            if(pong.game.sideid===pong.game.SIDES.LEFT)
                famous.playerTra.set( yy / pong.config.H);
            else if(pong.game.sideid===pong.game.SIDES.RIGHT)
                famous.player2Tra.set( yy / pong.config.H);
            else 
                pong.log.err("No sideid");
}
}

$(document).ready(function() {
    jQuery("abbr.timeago").timeago();
    $.ionSound({sounds: pong.music.sounds, volume: 0.5, path: "sounds/", preload: true});
    var options = {width: 1, timing: 500};
    $('#playerinfo-flapscore-left-flap').flapper(options).val(0).change();
    $('#playerinfo-flapscore-right-flap').flapper(options).val(0).change();
    pong.config.resizeMenu();
    $("#tabs").tabs();
    $("#txabs").tabs();
    pong.init(function() {
        initF(function() {
            console.log("END INIT FAMOUS");
            pong.ui.prepareWelcome(pong);
        });
    });
    $("#form-createplayer").validate({onkeyup: false, submitHandler: pong.ui.formCreatePlayerValid, rules: {
            "player-password": "required", "player-address": "required"}});
    pong.ui.panel_howitworks.draggable();
    pong.ui.panel_faq.draggable();
    pong.ui.panel_askedchallenge.draggable();
});
