var currentBgMusic="";
//var STEPS={WELCOME:1,CONFIG:2,HALL:3,COURT:4,GAME:5,ENDED:6};

var MUSIC={1:"preview-electro",2:"preview-lounge-house",3:"preview-lounge-house",4:"tap",5:"preview-chill-lounge"}
function playSound(a){
        //console.log("Sound "+a);
        $.ionSound.play(a);
    }
function stopSound(a){
        //console.log("Sound "+a);
        $.ionSound.stop(a);
    }
    function playButtonSound(){
        playSound("but");   
        //playSound("elevator");   
    }
    function changeBgMusic(step){
       
        if(MUSIC[step]){
            var mu=MUSIC[step];
            if(mu==="NO"){
                 console.log("Change BG Music stop");
                $.ionSound.stop(currentBgMusic     );
            }else{
            if(mu!==currentBgMusic){
                console.log(" Change BG Music stop "+currentBgMusic+" and play " +mu );
                $.ionSound.stop(currentBgMusic     );
                $.ionSound.play(mu,{loop:true});    
                
            }else{
                console.log("Music already playing");
            }
            currentBgMusic=mu;
        }
        }else{
            
        }
        
    }
function playBgMusic(a){
        //$.ionSound.play("preview-in-the-orange-mood",{loop:true});
        //$.ionSound.play("preview-a-dose-of-positive",{loop:true});
        //$.ionSound.play("preview-fun-time",{loop:true});
        //$.ionSound.play("preview-coconut-paradise",{loop:true});
        $.ionSound.play(a,{loop:true});
}
function stopBgMusic(){
    $.ionSound.stop(currentBgMusic);
}



$(document).ready(function() {

$.ionSound({
   sounds: [   
        //{            name: "ding",            volume 0.2        },
        {            name: "light",            volume: 0.3        },
        {            name: "drag",            volume: 1        },
        {            name: "tap",            volume: 1        },
        {            name: "but",            volume: 1        },
        {            name: "snap",            volume: 1        },
        {            name: "powerup",            volume: 1        },
        {            name: "countdown1",            volume: 0.1        },
        {            name: "countdown2",            volume: 0.1        },
        {            name: "button",            volume: 0.2        },
        {            name: "buttonc",            volume: 1        },
        {            name: "alert",            volume: 0.4        },
        {            name: "preview-chill-lounge",            volume: 0.1        },
        {            name: "elevator",            volume: 1        },/*
        {            name: "preview-a-dose-of-positive",            volume: 0.2        },
        {            name: "preview-bubble-maze",            volume: 0.2        },*/
        
        {            name: "preview-electro",            volume: 0.4        },
        {            name: "preview-lounge-house",            volume: 0.4        },
        {            name: "preview-the-sultry-lounge",            volume: 0.4        },
        /*{            name: "preview-coconut-paradise",            volume: 0.2        },
        {            name: "preview-fun-time",            volume: 0.2        },
        {            name: "preview-in-the-orange-mood",            volume: 0.2        },*/
        
    ],
    volume: 0.5,
    path: "sounds/",
    preload: true
});

playBgMusic();
});