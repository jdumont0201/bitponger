module.exports = {
    pi2: Math.PI / 2,
    troispi2: 3 * Math.PI / 2,
    deuxpi: 2 * Math.PI,
    SIDES: {LEFT: 1, RIGHT: 2},
    BOUNCE_MODE: {SAME: 1, FLAT: 2, ROUNDED: 3},
    generateStartAngle: function() {
        var res = 2 * Math.PI * Math.random();
        if (Math.abs(res - this.pi2) < 0.2)
            return this.generateStartAngle();
        else if (Math.abs(res - this.troispi2) < 0.2)
            return this.generateStartAngle();
        else if (Math.abs(res) < 0.2)
            return this.generateStartAngle();
        else if (Math.abs(res - Math.PI) < 0.2)
            return this.generateStartAngle();
        else
            return res;
    }
    ,
    getPointDistance: function(A, B) {
        return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
    },
    Point: function(n, x, y) {
        this.name = n;
        this.x = x;
        this.y = y;
        //  console.log(this);
    },
    Move: function(n, bx, by, nx, ny, dura, leftack, rightack, alpha, leftplayedack, rightplayedack, bord, nxend, nyend, duraend) {
        this.n = n;
        this.bx = bx;
        this.by = by;
        this.nx = nx;
        this.nxend = nx;
        this.nyend = ny;
        this.duraend = duraend;
        this.alpha = alpha;
        this.ny = ny;
        this.dura = dura;
        this.leftack = leftack;
        this.rightack = rightack;
        this.leftplayedack = leftplayedack;
        this.rightplayedack = rightplayedack;
        this.bord = bord;
        //console.log(this);
    },
    getDuration: function(pong, len, n) {

        var mod = Math.pow(n + 1, -0.4);
        if (n)
            return len / pong.config.speed * mod;
        else {
            return len / pong.config.speed * pong.config.vs;
        }

    },
    getQuadrant: function(alpha) {
        if (alpha > 0 && alpha < this.pi2) {
//            console.log("     * Quadrant Nord Est");
            return "NE";
        }
        else if (alpha > this.pi2 && alpha < Math.PI) {
//            console.log("     * Quadrant Nord Ouest");
            return "NO";
        }
        else if (alpha > Math.PI && alpha < this.troispi2) {
//            console.log("     * Quadrant Sud ouest");
            return "SO";
        }
        else if (alpha > this.troispi2 && alpha < this.deuxpi) {
//            console.log("     * Quadrant Sud Est");
            return "SE";
        }

    },
    computeNextAngle: function(alpha, bord, quadrant) {
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
        return nextalpha;
    },
    pointToPercent: function(pong, Q) {
        var R = pong.config.R;
        return new this.Point("Qs",
                (Q.x - R) / (pong.config.W - R - R),
                (Q.y - R) / (pong.config.H - R - R));
    },
    percentToPoint: function(config, x, y) {


        return new this.Point("Ball",
                config.R + x * (config.W - config.R - config.R),
                config.R + y * (config.H - config.R - config.R));
    },
    computeNextMove: function(pong, cid) {
        var chal = pong.game.chal;
        var config = pong.config;


        var m = chal[cid].m;
        var n = chal[cid].n;
        var R = config.R;
        var H = config.H;
        var W = config.W;
        var d = config.d;
        var padwidth = config.padwidth;
        var padoffset = config.padoffset;

        console.log(" * Computing move (" + m + "," + n + ")");
        var ga = chal[cid].points[chal[cid].m].moves[chal[cid].n];
        //n = n + 1;
        var alpha = ga.alpha;
//        console.log("alpha="+alpha);
        var BALL = this.percentToPoint(config, ga.bx, ga.by);
        var ballx = BALL.x;
        var bally = BALL.y;

        //alert("spa");
        //console.log(" * Cid #" + cid);
//        console.log("     * Alpha=" + Math.floor(100 * alpha) / 100);
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
        var dura = this.getDuration(pong, lt, n);
        var duraend = this.getDuration(pong, l, n);
        var Qs = this.pointToPercent(pong, Qt);
        var Qend = this.pointToPercent(pong, Q);

//        console.log("     * Length t " + Math.floor(lt) + " " + Math.floor(l));
//        console.log("     * Duration " + dura);
//        console.log(" * Length " + Math.floor(l));
//        console.log("     * Bord " + bord );
//        console.log("     * Move (" + Math.floor(P.x) + "," + Math.floor(P.y) + ")->(" + Math.floor(Q.x) + "," + Math.floor(Q.y)+")");

        chal[cid].points[m].moves[n].nx = Qs.x;
        chal[cid].points[m].moves[n].ny = Qs.y;
        chal[cid].points[m].moves[n].dura = dura;
        chal[cid].points[m].moves[n].bord = bord;

        chal[cid].points[m].moves[n].nxend = Qend.x;
        chal[cid].points[m].moves[n].nyend = Qend.y;
        chal[cid].points[m].moves[n].duraend = duraend;

//        console.log("     * Preparing move ("+m+","+(n+1)+")"); 
        var nextalpha = this.computeNextAngle(alpha, bord, quadrant);
//        console.log("comp prepare next" + m + "," + (n + 1) + ")" + nextalpha);
        chal[cid].points[m].moves[n + 1] = new this.Move(n + 1, Qs.x, Qs.y, null, null, null, false, false, nextalpha, false, false, null, Qend.x, Qend.y, duraend);
        //return {oldx:Px,oldy:Py,nextx:Qt.x,nexty:Qt.y,dura:dura};
    }
    ,
    isPlayerInFrontOfBall: function(pong, room, side, m, n) {

        var playercenter = null;
//        console.log("Analyse player position ("+m+","+n+")");
        if (side === this.SIDES.LEFT) {
//            console.log("leftcen" + pong.game.chal[room].points[m].moves[n].leftpos);
            playercenter = pong.game.chal[room].points[m].moves[n].leftpos;
        } else if (side === this.SIDES.RIGHT) {
//            console.log("rightcen" + pong.game.chal[room].points[m].moves[n].rightpos);
            playercenter = pong.game.chal[room].points[m].moves[n].rightpos;
        } else {
            console.log("ERR Player front ball");
        }
        //console.log("LOST "+playercenter);
        var playertop = playercenter - pong.config.padheight / 2;
        var playerbottom = playercenter + pong.config.padheight / 2;
        var balltop = pong.game.chal[room].points[m].moves[n].ny;
        var ballbottom = balltop + pong.config.d / pong.config.H;
//        console.log("LOST ? " + playertop + " --->  " + balltop + " BALL " + ballbottom + " <--- " + playerbottom);
        return (ballbottom > playertop) && (balltop < playerbottom);
    },
    recomputeTouchedAngle: function(pong, side, originalAngle, room, m, n) {
//        console.log("");
//        console.log("");
//        console.log("");
//        console.log("RECOMPUTE (" + m + "," + n + ") original side" + side + " angle" + originalAngle);
        var chal = pong.game.chal;
        var config = pong.config;

        var playercenter = null;
        if (side === pong.game.SIDES.LEFT) {
//            console.log("leftplay" + pong.game.chal[room].points[m].moves[n].leftpos);
            playercenter = pong.game.chal[room].points[m].moves[n].leftpos;
        } else if (side === pong.game.SIDES.RIGHT) {
//            console.log("rightplay" + pong.game.chal[room].points[m].moves[n].rightpos);
            playercenter = pong.game.chal[room].points[m].moves[n].rightpos;
        } else {
            console.log("ERR Player front ball");
        }

        //var playerPad=this.getPlayerPad(pong,side);
        //var playertop = playerPad.position().top;
        var playertop = playercenter - pong.config.padheight / 2;
        var playerbottom = playercenter + pong.config.padheight / 2;

        var balltop = pong.game.chal[room].points[m].moves[n].ny;
        var ballbottom = balltop + pong.config.d / pong.config.H;

        var ballcenter = balltop + pong.config.d / 2 / pong.config.H;
        var touchpercent = (ballcenter - playertop) / pong.config.padheight;

//        console.log("Tp" + touchpercent);
        var r = pong.config.BOUNCE_MIX_RATIO;

        if (side === pong.game.SIDES.LEFT) {
            var mix = null;
            var ideal = null;
            var converted = null;
            if (touchpercent < 0.5) {
//                console.log("touchup");
                ideal = this.pi2 - this.pi2 * touchpercent * 2;
                if (originalAngle >= this.troispi2)
                    originalAngle = originalAngle - this.deuxpi;

                mix = (r * ideal + (1 - r) * originalAngle);
                if (mix < 0)
                    mix = mix + this.deuxpi;
//                console.log("ratio" + r + "ideal" + ideal);
            } else {
//                console.log("touchdown");
                ideal = this.troispi2 + (touchpercent - 0.5) * this.pi2;
                converted = ideal - this.deuxpi;
                if (originalAngle >= this.troispi2)
                    originalAngle = originalAngle - this.deuxpi;
                mix = (r * converted + (1 - r) * originalAngle);
                if (mix < 0)
                    mix = mix + this.deuxpi;
//                console.log("ratio" + r + "ideal" + ideal);
                // angle=(r*(res+this.pi2)+(1-r)*(angle+this.pi2))-this.pi2;
            }
        } else if (side === pong.game.SIDES.RIGHT) {
            var mix = null;
            var ideal = null;
            var converted = null;
            //if (touchpercent < 0.5) {
//                console.log("touchup");
                ideal = this.pi2 + this.pi2 * touchpercent * 2;
                //if (originalAngle >= this.troispi2)
                 //   originalAngle = originalAngle - this.deuxpi;

                mix = (r * ideal + (1 - r) * originalAngle);
                //if (mix < 0)
                  //  mix = mix + this.deuxpi;
//                console.log("ratio" + r + "ideal" + ideal);
            /*} else {
                console.log("touchdown");
                ideal = this.troispi2 + (touchpercent - 0.5) * this.pi2;
                converted = ideal - this.deuxpi;
                if (originalAngle >= this.troispi2)
                    originalAngle = originalAngle - this.deuxpi;
                mix = (r * converted + (1 - r) * originalAngle);
                if (mix < 0)
                    mix = mix + this.deuxpi;
                console.log("ratio" + r + "ideal" + ideal);
                // angle=(r*(res+this.pi2)+(1-r)*(angle+this.pi2))-this.pi2;
            }*/
//             console.log("ratio" + r + "ideal=" + ideal+" mix="+mix);
        } else {

        }
//        console.log("recomp ptop " + playercenter + "+" + playertop + " > " + ballcenter + " < " + playerbottom + " -> " + touchpercent + " mix" + mix);

        return mix;
    }
}