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
    playerModifier:null,
    leftplayerpos: null,
    rightplayerpos: null,
    starTra:null,
    logoTra:null,
    ballOpaTra:null
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

        var horlineTra = new Transitionable([0, 0]);
        famous.ballOpaTra = new Transitionable(0);
        famous.logoTra = new Transitionable(0);
        famous.starTra = new Transitionable(0);

        var modifier = new Modifier({
            align: function() {                return horlineTra.get();            },
            origin: function() {                return horlineTra.get();            }
        });
        famous.playerModifier = new Modifier({
            align: function() {              return [0,horlineTra.get()[1]];            },
            origin: [0,0.5],
            opacity:function(){return famous.ballOpaTra.get();}
        });
        var player2Modifier = new Modifier({
            align: function() {              return [0,horlineTra.get()[1]];            },
            origin: [0,0.5]
        });
        var starModifier = new Modifier({
            origin: [0,0],
            transform: famous.Transform.translate(0,0,10),
            opacity: function() {              return famous.starTra.get();            }
        });
        var logoModifier = new Modifier({
            align: function() {              return [0.5,0.22   +famous.logoTra.get()/pong.config.H];            },
            origin: [0.5,0.5]
        });
        var logotxtModifier = new Modifier({
            align: function() {              return [0.5,0.22 +0/pong.config.H];            },
            origin: [0.5,0.5],
             transform: famous.Transform.rotateZ(-Math.PI/16)
        });

        var horline = new Surface({            size: [undefined, 1],            properties: {borderTop: 'dashed 1px white'}        });
        var ball = new Surface({            size: [16, 16],            content: '',            properties: {                color: 'white',                borderRadius: '16px',                background: 'rgb(255, 197, 11)',                background: 'radial-gradient(circle at 4px 5px, rgba(249,215,103,1), rgba(177, 100, 3, 1))',                        backgroundColor: '#FA5C4F'           }       });
        var star = new Surface({            size: [48, 48],            content: '',            properties: {                left:(pong.config.W/2+30)+'px',                                   background: 'url(http://www.cityscooter.fr/img/options2.png) no-repeat -118px -603px',                 position:'absolute',                 top:'260px'            }       });        
        var logo = new Surface({            size: [141, 141],            content: '',            properties: { border: 'solid 5px white',    background: 'radial-gradient(circle at 44px 41px, rgba(249,215,103,1), rgba(177, 100, 3, 1))',      borderRadius:'141px',                      }       });
        var logotxt = new Surface({            size: [260, 48],            content: 'Bitponger',            properties: {   font: "normal 50px / 30px 'Permanent Marker'",color:'rgb(255, 171, 21)',textShadow:' 3px 3px 1px rgb(73, 55, 9)'         }       });
        var leftPlayer = new Surface({            size: [10, pong.config.padheightpercent*pong.config.H],            content: '',            properties: {                background: 'white',left:(pong.config.R+pong.config.padoffset)+'px'            }        });
        var rightPlayer = new Surface({            size: [10,pong.config.padheightpercent*pong.config.H],            content: '',            properties: {                background: 'orange',right:(pong.config.R+pong.config.padoffset)+'px'                    }        });

        famous.logoMoveModifier = new StateModifier();
        famous.leftPlayerMoveModifier = new StateModifier();
        famous.rightPlayerMoveModifier = new StateModifier();
        
        famous.ballMoveModifier = new StateModifier(
                /*{
             origin: [0.5,0.5],
              align: [0.5,0.5]
        }*/);


        
        famous.mainContext.add(famous.ballMoveModifier).add(ball);
        famous.mainContext.add(famous.playerModifier).add(leftPlayer);
  
        famous.mainContext.add(starModifier).add(star);
        famous.mainContext.add(logoModifier).add(logo);
        famous.mainContext.add(logotxtModifier).add(logotxt);
        famous.mainContext.add(player2Modifier).add(rightPlayer);
        famous.mainContext.add(modifier).add(horline);

        //leftPlayer.addClass("leftplayerpad");
        //rightPlayer.addClass("rightplayerpad");
        
        Engine.on('mousemove', function(e) {
            pong.input.mousey=e.y;
            horlineTra.set([0, e.y / famous.mainContext.getSize()[1]]);
            //famous.leftPlayerModifier.setTransform(90, 60 , 0);
        });
        Engine.on('touchmove', function(e) {
            pong.input.mousey=e.touches[0].pageY;
            horlineTra.set([0, e.touches[0].pageY / famous.mainContext.getSize()[1]]);
            //famous.leftPlayerModifier.setTransform(90, 60 , 0);
        });

        
        callb();
    });

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


<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

