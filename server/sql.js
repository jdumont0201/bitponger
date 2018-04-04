module.exports = {
    mysql: require('mysql'),
    BD: function() {
        mysqlConnexion = this.mysql.createConnection({user: 'root', password: 'hwcJJ472', host: 'localhost', port: 3306, database: 'bitgame'});
        return mysqlConnexion;
    },
    select: function(table, champ, where, success) {
        var bdd = this.BD();
        var query = bdd.query('SELECT * FROM ' + table + ' WHERE ' + champ + "=?", [where], function(err, result) {
            if (err) {
                console.log("Error insert " + err);
            } else if (result) {
                //console.log(result);
                success(result);
            }
        });
    },
    insert: function(table, post, success) {
        var bdd = this.BD();
        var query = bdd.query('INSERT INTO ' + table + ' SET ?', post, function(err, result) {
            if (err) {
                console.log("Error insert " + err);
            } else if (result) {
///                console.log(result);
                success(result);
            }
        });
    },
    update: function(table, item, post, callb) {
        var bdd = this.BD();
        var query = bdd.query("UPDATE " + table + " SET " + item, post, function(err, result) {
            if (err) {
                console.log("Error update " + err);
            } else if (result) {
   //             console.log(result);
                callb(result);
            }
        });
    },
    getCryptedPassword: function(p) {
        //return  bcrypt.hashSync(p);
        var bcrypt = require('bcryptjs');
        return bcrypt.hashSync(p, 8);
    }, 
    addToAmountCharged:function(pong,socket,add,callb){
        var pid=pong.game.clients[socket.id].pid;
        pong.sql.select("player", "id",pid, function(res) {
            var am=res.amountcharged;
            var amadd=am+add;
            pong.sql.update("player", " amountcharged = ? WHERE id=?", [amadd,pid], function(resu) {
                callb(resu);
            });
            });
    }    ,
    findRewardsFromPlayer: function(pong, socket,callb) {
        var bdd = this.BD();
        var transactionArray = new Array();
        this.getBlockchainInfoForAddress(pong,socket,pong.game.clients[socket.id].address,function(body){
            var txs = body.txs;
                //console.log(body);
            var arr=pong.sql.blockchainAddressToArray(body);
            var nn=0;
            var query = bdd.query('SELECT * FROM reward WHERE playerid = ?', [pong.game.clients[socket.id].pid], function(err, recordedTransactions) {
                if (recordedTransactions) {
                    console.log("rewards for player" + pong.game.clients[socket.id].pid + " nb=" + recordedTransactions.length);
                    for (var i = 0; i < recordedTransactions.length; ++i) {
                        if(recordedTransactions[i].to){
                          //  console.log(recordedTransactions[i].to);
                            //console.log(recordedTransactions[i]);
                            var toaddress = recordedTransactions[i].to;
          //              console.log(" * transaction check "+toaddress);
                        var res=pong.sql.isTransactionInBlockchainArray(pong,arr,toaddress);
     //                   if(res.found) console.log(res);
                        transactionArray.push(res);
                        }
                    }
//                    console.log("RESULT");
  //                  console.log(transactionArray);
                    callb( transactionArray);

                }
            });
        });
        
    },
    
    
    findTransactionsFromPlayer: function(pong, socket,callb) {
        var bdd = this.BD();
        var transactionArray = new Array();
        this.getBlockchainInfoForAddress(pong,socket,pong.game.clients[socket.id].address,function(body){
            var txs = body.txs;
                //console.log(body);
            var arr=pong.sql.blockchainAddressToArray(body);
            var nn=0;
            var query = bdd.query('SELECT * FROM transaction WHERE playerid = ?', [pong.game.clients[socket.id].pid], function(err, recordedTransactions) {
                if (recordedTransactions) {
                    console.log("transactions for player" + pong.game.clients[socket.id].pid + " nb=" + recordedTransactions.length);
                    for (var i = 0; i < recordedTransactions.length; ++i) {
                        if(recordedTransactions[i].to){
                          //  console.log(recordedTransactions[i].to);
                            //console.log(recordedTransactions[i]);
                            var toaddress = recordedTransactions[i].to;
          //              console.log(" * transaction check "+toaddress);
                        var res=pong.sql.isTransactionInBlockchainArray(pong,arr,toaddress);
     //                   if(res.found) console.log(res);
                        transactionArray.push(res);
                        }
                    }
//                    console.log("RESULT");
  //                  console.log(transactionArray);
                    callb( transactionArray);

                }
            });
        });
        
    },
    isTransactionInBlockchainArray:function(pong,array,toaddress){
        //console.log("istinbc of "+toaddress);
        //console.log(array);
        
        var found=false;
        var res={'found':false, 'hash': null, 'amount': null, 'tx': null, 'n': null, date: null};
        
        for(var hash in array){
            
            var t=array[hash];
            //console.log("ti");
   //         console.log(t);
            var d=t.dest;
            for(var j=0;j<d.length;++j){
                
                //console.log(d[j]);
                if(d[j].addr===toaddress){
 //                   console.log("found");
                    res= {'found': true, 'hash': hash, 'amount': pong.bitcoin.satoshiToMBTC(d[j].value), date: t.time, 'n': t.height};
                    break;
                }
            }
        }
        return res;
    },
    blockchainAddressToArray:function(body){
        
        var array=new Array();
        for(var i=0;i<body.txs.length;++i){
            var t=body.txs[i];
            array[t.hash]={hash:t.hash,dest:t.out,height:t.block_height,time:t.time};
            
        }
        return array;
    },
    getBlockchainInfoForAddress:function(pong,socket,address,callb){
                       var address = pong.game.clients[socket.id].address;
                        var url = 'https://blockchain.info/rawaddr/' + address;
     
     pong.request({url: url, json: true}, function(error, response, body) {
                            console.log("Blockhain response"+address);
                            if (!error && response.statusCode === 200) {   
                                callb( body);
                            }
                        });
    
     },
    findTransactionsInBlockchainFromPlayerToAddress: function(pong, socket, toaddress,callb) {
        console.log(" !  find transaction to " + toaddress);
        var address = pong.game.clients[socket.id].address;
        var url = 'https://blockchain.info/rawaddr/' + address;
        var date = "";
        pong.request({url: url, json: true}, function(error, response, body) {
            console.log("Blockhain response");
            /*if (!error && response.statusCode === 200) {
                var a = body;
                //   console.log(body);
                var txs = a.txs;
                var found = "NOTFOUNDYET";
                var amount = -1;
                var fres = -1;
                var n = -1;
                for (var i = 0; i < txs.length; ++i) {
                    var x = txs[i];
                    var i = x.inputs;
                    var o = x.out;
                    for (var j = 0; j < o.length; ++j) {
                        oo = o[j];
                        if (oo.addr === toaddress) {
                            amount = pong.bitcoin.satoshiToMBTC(oo.value); //value in satoshi
                            found = "FOUND";
                            console.log("found");
                            n = oo.n;
                            var res = {'found': found, 'hash': x.hash, 'amount': amount, 'tx': fres, 'n': n, date: date};
                            callb(res);
                            
                            fres = x;
                            break;
                        }
                        //        }
                    }
                }
                if (!found) {
                    var res = {'found': found, 'amount': amount, 'hash': null, 'tx': fres, 'n': n, date: date};
                    callb(null);
                } else {
                    console.log(found);
                    var res = {'found': found, 'hash': x.hash, 'amount': amount, 'tx': fres, 'n': n, date: date};
                    callb(null);
                }
            }*/
        });
    },
    saveNewPlayer: function(pong, socket, y) {
        pong.player.rename(pong, socket, y);
        var now = pong.dates.now();
        var pwd = this.getCryptedPassword(y.password);

        pong.player.playerExists(pong, socket,y.address, pwd,function (existsRes){
            pong.log.debug("Saving player Player exists ? "+(existsRes.found?"oui":"non"));
            if (existsRes.found) {
                pong.log.debug("Player already exists");
                pong.player.loginFromResult(pong, socket, existsRes.matchingPlayer);
                socket.emit("sql-playeralreadyexists");
            } else {
                pong.log.debug("Player does not exists");
                var post = {amountcharged:0,name: y.name, socketid: socket.id, ip: socket.handshake.address.address, 
                    datecreation: now, datelastlogin: now, country: y.country, address: y.address, password: pwd};
                var pid = null;
                pong.sql.insert('player', post, function(result) {
                    pid = result.insertId;
                    pong.game.clients[socket.id].pid = pid;
                    pong.bitcoin.generateBitcoinFundAddress(pong,socket,function(res){
                       var rs = pong.room.getRoomSize(pong);
                       pong.player.loginFromNewPlayer(pong,socket,
                       {name:y.name,pid:pid,country:y.country,password:pwd,address:y.address});
                       pong.log.debug("destaddress "+res.temporaryDestinationAddress);
                       socket.emit("sql-playersaved", {destinationAddress: res.temporaryDestinationAddress, roomsize: rs,gid:socket.id}); 
                    });
                });
            }    
        });
        
    },
    
    redeem:function(pong,transactionid){
        
    }
    ,
    /*
    *payPlayer: function(pong, to, amount, callb) {
        var from = pong.config.finalAddressToPay;
        var guid = pong.config.walletIdentifier;
        var password = pong.config.walletPassword;
        var note = "Bitpong";
        var url = "https://blockchain.info/fr/merchant/" + guid + "/payment?password=" + password + "&to=" + to + "&amount=" + amount + "&from=" + from + "&shared=false&note=" + note;
        console.log("Payment url=" + url);
        pong.request({url: url, json: true}, function(error, response, body) {
            //console.log(response);
            console.log(error);
            console.log(body);
            console.log("Blockhain response");
            if (!error && response.statusCode === 200) {
                if (body.hasOwnProperty("tx_hash")) {
                    var msg = body.message;
                    var tx_hash = body.tx_hash;
                    var res = {hash: tx_hash, success: false};
                    callb(res);
                } else {
                    console.log("ERR no message property");
                    var res = {hash: tx_hash, success: false};
                    callb(res);
                }
            } else {
                console.log(error);

                callb(res)

            }
        });
    },
    rewardPlayer: function(pong, room, callb) {
        var winnerid = pong.game.chal[room].winnersocketid;
        console.log("win" + winnerid);
        var to = pong.game.clients[winnerid].address;
        var amount = pong.bitcoin.mBTCToSatoshi(pong.game.getRewardAmount(pong, room));
        console.log("Reward player " + amount + " satoshi");

        this.payPlayer(pong, to, amount, function(res) {
            if (res.success) {
                var post = [res.hash, pong.game.chal[room].rewardid];
                pong.sql.update("reward", " transactionid = ?,status='SENT' WHERE id=?", post, function(res) {
                    console.log("Reward send");
                    callb({success: true, reward_hash: res.hash});
                });
            } else {
                var post = [pong.game.chal[room].rewardid];
                pong.sql.update("reward", " status='ERROR' WHERE id=?", post, function(res) {
                    console.log("Reward send");
                    callb({success: false, reward_hash: null});
                });
            }
            //callb();  
        });

        
    },*/
    saveRewardEnd: function(pong, room) {
        var chal = pong.game.chal;
        var clients = pong.game.clients;
        var amount = pong.game.getRewardAmount(pong, room);


    },
    saveReward: function(pong, room) {
        console.log("Save reward");
        var chal = pong.game.chal;
        var clients = pong.game.clients;
        var amount = pong.game.getRewardAmount(pong, room);
        var post = {playerid: clients[chal[room].winnersocketid].pid, amount: amount, date: pong.dates.now(), status: "CREATED"};
        pong.sql.insert("reward", post, function(res) {
            pong.game.chal[room].rewardid = res.insertId;
        });

    },
    saveGameEnd: function(pong, room) {
        var chal = pong.game.chal;
        var clients = pong.game.clients;
        var score = chal[room].score;
        var scorestr = chal[room].score.left + "-" + chal[room].score.right;
        var winnerid = chal[room].winnerid;
        var chalid = chal[room].chalid;
        var enddate = pong.dates.now();
        var post = [scorestr, winnerid, enddate, chalid];
        pong.sql.update("game", " score = ?,winnerid=?, status='FINISHED',enddate= ? WHERE id=?", post, function(res) {

        });

    },
    saveGame: function(pong, room) {
        console.log("Saving game room" + room);
        var chal = pong.game.chal;
        var clients = pong.game.clients;
        var post = {roomid: room, askerid: clients[chal[room].asker].pid, askedid: clients[chal[room].asked].pid, startdate: pong.dates.now(),
            askerpaymentid: (clients[chal[room].asker].lasttid?clients[chal[room].asker].lasttid:""), 
            askedpaymentid: (clients[chal[room].asked].lasttid?clients[chal[room].asked].lasttid:""),
            status: "CREATED",
            amount: chal[room].amount * 2};
        pong.sql.insert('game', post, function(result) {
            console.log(result);
            chal[room].chalid = result.insertId;
        });
    },
    findPayment: function(pong, socket) {
        var bdd = this.BD();
        var tid = pong.game.clients[socket.id].lasttid;
        var query = bdd.query('SELECT * FROM transaction WHERE id = ?', [tid], function(err, result) {
            if(err)
            console.log("Error" + err);
            //pid=result.insertId;
            

            if (!result) {
                var res = {'found': "NONEXISTING", 'hash': null, 'amount': -1, 'tx': null, 'n': -1, 'json': null};
                console.log("<-- sql-findpayment-response" + found);
                socket.emit("sql-findpayment-response", res);
            } else {
//                console.log(result);
                result = result[0];
//                console.log("result");
//                console.log(result);
                //    var datemin=Date.parse(result.date);
//               var datemax=Date.parse(now());
                var url = 'https://blockchain.info/rawaddr/' + result.from;
                console.log("url="+url);
                pong.request({url: url, json: true}, function(error, response, body) {
                    console.log("Blockhain response");
                    if(error){
                        var res = {'error':true,'errormsg':'Error at checking bitcoin payment','found': false, 'amount': null, 'hash': null, 'tx': null, 'n': null};
                        socket.emit("sql-findpayment-response", res);
                        console.log(error);
                    }
                    if (!error && response.statusCode === 200) {
                        var a = body;
                        //   console.log(body);
                        var txs = a.txs;
                        var found = "NOTFOUNDYET";
                        var foundAmount = -1;
                        var fres = -1;
                        var n = -1;
                        for (var i = 0; i < txs.length; ++i) {
                            var x = txs[i];
                            var hash = x.hash;
                            var i = x.inputs;
                            var o = x.out;
                            for (var j = 0; j < o.length; ++j) {
                                if (o[j].addr === result.to) {
                                    foundAmount = pong.bitcoin.satoshiToMBTC(o[j].value); //value in satoshi
                                    found = "FOUND";
                                    console.log("found");
                                    n = o[j].n;
                                    console.log("TX FOUND");
                                    var query = bdd.query("UPDATE transaction SET `transaction_hash` = ?,status= ? , amount= ? WHERE id = ? ", [x.hash, "FOUND", foundAmount, tid], function(err, result) {
                                        console.log(err);
                                        console.log(result);
                                        var newamount=pong.game.clients[socket.id].amount+foundAmount;
                                        var res = {'error':false,'errormsg':null,'found': found, 'hash': x.hash, 'amount': foundAmount, ,'newamount':newamount,'tx': fres, 'n': n};
                                        pong.sql.addToAmountCharged(pong,socket,foundAmount,function(){});
                                        console.log("<-- sql-findpayment-response" + found);
                                        socket.emit("sql-findpayment-response", res);
                                    });
                                    fres = x;
                                    break;
                                }
                                //        }
                            }
                        }
                        if (!found) {
                            var res = {'found': found, 'amount': foundAmount, 'hash': null, 'tx': fres, 'n': n,error:false,errormsg:null};
                            console.log("<-- sql-findpayment-response" + found);
                            socket.emit("sql-findpayment-response", res);
                        } else {
                            console.log(found);
                            var res = {'found': found, 'hash': x.hash, 'amount': foundAmount, 'tx': fres, 'n': n,error:false,errormsg:null};
                            console.log("<-- sql-findpayment-response" + found);
                            socket.emit("sql-findpayment-response", res);
                        }
                    } else {
                        console.log("Blockchain connection not working. Response code=");
                        console.log(response.statusCode);
                        //console.log(response);
                        var res = {'found': "NONEXISTING", 'hash': null, 'amount': -1, 'tx': null, 'n': -1, 'json': null,error:true,errormsg:"Wrong bitcoin address"};
                        console.log("<-- sql-findpayment-response" + found);
                        socket.emit("sql-findpayment-response", res);
                    }
                });
            }
        });
    }
    , readJSON: function(pong, url) {
        pong.request({url: url, json: true}, function(error, response, body) {
            console.log("Read json");
            console.log(response);
            console.log("Read json error");
            console.log(error);
            console.log("Read json body ");
            console.log(body);
            if (!error && response.statusCode === 200) {
                return body;
            }

        });
    },
    getTransactionDate: function(pong, hash) {
        var tx = this.readJSON(pong, "https://blockchain.info/rawtx/" + hash);
        return tx.date;

    }

}