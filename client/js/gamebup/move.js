var config={
 W : $(content).width(),
 H : $(content).height(),
 d : 16,

}

var comp={
 pi2 : Math.PI / 2,
 troispi2 : 3 * Math.PI / 2,
 deuxpi : 2 * Math.PI,

    getPointDistance:function (A, B) {
    return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
},
Point:function (n, x, y) {
    this.name = n;
    this.x = x;
    this.y = y;
    //console.log(this);
},
getDuration:function (len, engine) {
    if (engine === "GSAP") {
        return len / speed / 400 * vs;
    } else if (engine === "jQuery") {
        return Math.floor(len / speed);
    } else {
        console.log("Unknown engine");
    }
},
 scalePoint:function(Q){
    var res=new this.Point("Qs",
            (Q.x-30)*W/1000+30,
            (Qt.y-30)*H/1000+30);
    return res;
    },
    percentToPoint:function(Q){
        return new this.Point("Qs",
        Q.x*(W-R-R)+R,
        Q.y*(H-R-R)+R)
       
    },
     positionToPercent:function(top,height){
    return (top+height/2-R)/(H-R-R);
    },
 percentToPosition:function(per,height){
    return per*(H-R-R)+R-height/2;
    }    ,
     getPlayerPositionPercent:function(){
        if(side==="LEFT"){          var playe=$("#player1-pad");    }
    else{                       var playe=$("#player2-pad");   }
    return positionToPercent($(playe).position().top,$(playe).height());
    }
,computeNextAngle:function (alpha, bord, quadrant) {
        //console.log("     * Next angle " + bord + " " + quadrant);
        var nextalpha=null;
        if (quadrant === "NE") {
            if (bord === "A") {
                //console.log("  - A NE");
                nextalpha = deuxpi - alpha;
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
                nextalpha = deuxpi - alpha;
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
                nextalpha = deuxpi - alpha;
            }
            else {
                console.log("  - Error border");
            }
        }
        else if (quadrant === "SO") {
            if (bord === "C") {
                nextalpha = deuxpi - alpha;
            }
            else if (bord === "D") {
                nextalpha = troispi2 - (alpha - troispi2);
            }
            else {
                console.log("  - Error border");
            }


        }
        //console.log("     * Nouvel angle " + Math.floor(100 * alpha) / 100);
        return nextalpha;

    },
     getQuadrant:function(alpha) {
        if (alpha > 0 && alpha < pi2) {
//            console.log("     * Quadrant Nord Est");
            return "NE";
        }
        else if (alpha > pi2 && alpha < Math.PI) {
            return "NO";
        }
        else if (alpha > Math.PI && alpha < troispi2) {
            return "SO";
        }
        else if (alpha > troispi2 && alpha < deuxpi) {
            return "SE";
        }

    },
    
    ,
 pointToPercent:function(Q){
        return new this.Point("Qs",
            (Q.x-R)/(W-R-R),
            (Q.y-R)/(H-R-R));
    }    ,
computeNextMove:function () {
        //console.log(" * Computing intro move "+nint);
        
        //n = n + 1;
        
        ga=moves[nint];
        var alpha = ga.alpha;
        var st=new Point("P",ga.bx,ga.by);
        var BALL=percentToPoint(st);
        var ballx = BALL.x;
        var bally = BALL.y;

        //alert("spa");
        //console.log(" * Cid #" + cid);
        //console.log("     * Alpha=" + Math.floor(100 * alpha) / 100);
        //var ball = $("#ball");
        //console.log(ball.position());
        var P = new Point("P", ballx, bally);
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
        var A = new this.Point("A", f(R), R);
        var lA = L["A"] = L["At"] = this.getPointDistance(P, A);
        var B = new this.Point("B", W - R - d, -g(W - R - d));
        var lB = L["B"] = this.getPointDistance(P, B);
        //var Bt = new Point("B", W - R - d - padwidth - padoffset, -g(W - R - d - padwidth - padoffset));
        //var lBt = L["Bt"] = getPointDistance(P, Bt);
        var C = new this.Point("C", f(H - R - d), H - R - d);
        var lC = L["C"] = L["Ct"] = this.getPointDistance(P, C);
        var D = new this.Point("D", R, -g(R));
        var lD = L["D"] = this.getPointDistance(P, D);
        //var Dt = new Point("D", R + padwidth + padoffset, -g(R + padwidth + padoffset));
        //var lDt = L["Dt"] = getPointDistance(P, Dt);
        S = {"A": A, "B": B, "C": C, "D": D};
        //St = {"A": A, "B": Bt, "C": C, "D": Dt};
        //console.log(L);

        //calcul du prochain bord
        var bord=null;
        if (quadrant === "NE") {            if (lA < lB)                bord = "A";            else                bord = "B";        }
        else if (quadrant === "NO") {            if (lA < lD)                bord = "A";            else                bord = "D";        }
        else if (quadrant === "SO") {            if (lD < lC)               bord = "D";            else                bord = "C";        }
        else if (quadrant === "SE") {            if (lC < lB)                bord = "C";            else                bord = "B";        }

        Q = S[bord];
        //Qt = St[bord];
        l = L[Q.name];
        //lt = L[Qt.name + "t"];
        var dura = this.getDuration(l);
        var Qs=this.pointToPercent(Q);
        
//        console.log("     * Length t " + Math.floor(lt) + " " + Math.floor(l));
//        console.log("     * Duration " + dura);
//        console.log(" * Length " + Math.floor(l));
        //console.log("     * Bord " + bord );
        //console.log("     * Move (" + Math.floor(P.x) + "," + Math.floor(P.y) + ")->(" + Math.floor(Q.x) + "," + Math.floor(Q.y)+")");

        moves[nint].nx = Qs.x;
        moves[nint].ny = Qs.y;
        moves[nint].dura = dura;
        moves[nint].bord = bord;
            
        //console.log("     * Preparing move ("+m+","+(nint+1)+")"); 
        var nextalpha=computeNextAngle(alpha,bord,quadrant);
        
        moves[nint+1]=new Move(nint+1,Qs.x,Qs.y,null,null,null,nextalpha,null);
        //return {oldx:Px,oldy:Py,nextx:Qt.x,nexty:Qt.y,dura:dura};
        playIntroMove();
    },
    

 generateStartAngle:function() {
        var res=2 * Math.PI * Math.random();
        if(Math.abs(res-pi2)<0.2)
            return generateStartAngle();
        else if(Math.abs(res-troispi2)<0.2)
            return generateStartAngle();
        else
            return res;
    }
}

var anim={    
    engine:"GSAP",
playLastMove:function (m,n){
    ballready=false;
    console.log("----------------------------------------------------------");
    console.log(" * Playing move ("+m+","+n+") ");
    //console.log(points[m].moves[n]);
    //console.log(points[m].moves);
    
    var Qt=new Point("Q",points[m].moves[n].nx,points[m].moves[n].ny);
    //var bord=points[m].moves[n].bord;
    var Qs=percentToPoint(Qt);
    var dura=points[m].moves[n].dura;
    
    if (this.engine === "GSAP") {
            console.log(" -> Tween "+ (Math.floor(100*dura)/100)+" "+Qs.x+" "+Qs.y);
            if(n>1){
            if(points[m].moves[n-1].bord==="A"||points[m].moves[n-1].bord==="C")
                playSound("snap");
            else
                playSound("tap");
            }
            anim=TweenLite.to("#ball", dura, {top: Qs.y, left: Qs.x, ease: Linear.easeNone, onComplete: function() {
                    console.log("<-- move-moveplayed ("+m+","+n+") : ("+Qs.x+","+Qs.x+")" );
                    socket.emit('move-moveplayed',{'m':m,'n':n,'pos':getPlayerPositionPercent()});
                    ballready=true;
            }});
    } else if (this.engine === "jQuery") {

    } else {
            console.log("Unknown engine");
    }
}
    ,
    playIntroMove:function(){
    if(!playIntro)  return;
    //console.log("----------------------------------------------------------");
    //console.log(nint);
    //console.log(moves[nint]);
    var Qt=new Point("Q",moves[nint].nx,moves[nint].ny);
    //var bord=points[m].moves[n].bord;
    //console.log(Qt); 
    //console.log("uu");
    var Qs=percentToPoint(Qt);
    //console.log(Qs);
    var dura=moves[nint].dura;
    
    if (this.engine === "GSAP") {
      //  console.log($("#ball").position());
//            console.log(" -> IntroTween "+ (Math.floor(100*dura)/100)+"  -> "+Qs.x+" "+Qs.y);
            if(nint>1){
            if(moves[nint-1].bord==="A" || moves[nint-1].bord==="C"){
                playSound("snap");
        }else{
                playSound("tap");
            }
        }
            animate=TweenLite.to("#ball", dura, {top: Qs.y, left: Qs.x, ease: Linear.easeNone, onComplete: function() {
                    nint=nint+1;
                    computeNextMove();
                    
                    //ballready=true;
            }});
    }
}
}
    function introMoveBall(){
        moves[0]=new Move(0,0.5,0.5,null,null,null,generateStartAngle(),null);
        computeNextMove();
        playIntroMove();
    }


