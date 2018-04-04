module.exports = {
    generateBitcoinFundAddress:function(pong,socket,callb){
        
//        var bdd = this.BD();
        var pid=pong.game.clients[socket.id].pid;
        pong.log.debug("generateBitcoinFundAddress"+pid);
        var address=pong.game.clients[socket.id].address;
        var now = pong.dates.now();
        var post = {playerid: pid, date: now, confirmations: 0, status: "DECLARED", finalto: pong.config.finalAddressToReceivePayments, from: address};
                pong.sql.insert("transaction", post, function(result) {
                    var tid = result.insertId;
                    pong.game.clients[socket.id].lasttid = tid;
                    var callback_url = 'http://www.thelostbitcoin.com/callback/' + tid;
                    var parameters = 'method=create&address=' + pong.config.finalAddressToReceivePayments + '&callback=' + encodeURIComponent(callback_url);
                    var url = 'https://blockchain.info/api/receive?' + parameters;

                    pong.request({url: url, json: true}, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            var temporaryDestinationAddress = body.input_address;
                            console.log("address "+temporaryDestinationAddress);
                            pong.sql.update("transaction", "`to` = ? WHERE id = ?", [temporaryDestinationAddress, tid],function(result){ 
                                callb({temporaryDestinationAddress:temporaryDestinationAddress,error:false,erromsg:null});});
  /*                          var query = bdd.query("UPDATE transaction SET `to` = ? WHERE id = ? ", [temporaryDestinationAddress, tid], function(err, result) {
                                callb({temporaryDestinationAddress:temporaryDestinationAddress});
                                
                                
                            });*/
                        }else if(response.statusCode === 500){ 
                            console.log("Bad address");
                            callb({temporaryDestinationAddress:null,error:true,errormsg:"Wrong bitcoin address"});
                        }else{ 
                            console.log("Error generate fund address");
                            callb({temporaryDestinationAddress:null,error:true,errormsg:""});
                        }
                    });
                });
    },
    mBTCToSatoshi: function(n) {
        return Math.round(n / 100000);
    },
    satoshiToMBTC: function(n) {
        return n / 100000;
    },
    satoshiToBTC: function(n) {
        return n / 100000 / 1000;
    },
    BTCToSatoshi: function(n) {
        return Math.round(n * 100000 * 1000);
    },
    redeem:function(pong,transactionid){
        
    }
    ,
    payPlayer: function(pong, to, amount, callb) {
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
        var amount = this.mBTCToSatoshi(pong.game.getRewardAmount(pong, room));
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
        },
    findPayment: function(pong, socket) {
        //var bdd = this.BD();
        var tid = pong.game.clients[socket.id].lasttid;
        pong.sql.select("transaction", "id", tid, function(err, result) {
        //var query = bdd.query('SELECT * FROM transaction WHERE id = ?', [tid], function(err, result) {
            console.log("Error" + err);
            //pid=result.insertId;
            console.log(result[0]);

            if (!result) {
                var res = {'found': "NONEXISTING", 'hash': null, 'amount': -1, 'tx': null, 'n': -1, 'json': null};
                console.log("<-- sql-findpayment-response" + found);
                socket.emit("sql-findpayment-response", res);
            } else {
                result = result[0];
                //    var datemin=Date.parse(result.date);
//               var datemax=Date.parse(now());
                var url = 'https://blockchain.info/rawaddr/' + result.from;
                //console.log(url);
                pong.request({url: url, json: true}, function(error, response, body) {
                    console.log("Blockhain response");
                    if (!error && response.statusCode === 200) {
                        var a = body;
                        //   console.log(body);
                        var txs = a.txs;
                        var found = "NOTFOUNDYET";
                        var fam = -1;
                        var fres = -1;
                        var n = -1;
                        for (var i = 0; i < txs.length; ++i) {
                            var x = txs[i];
                            var hash = x.hash;
                            var i = x.inputs;
                            var o = x.out;
                            for (var j = 0; j < o.length; ++j) {
                                oo = o[j];
                                if (oo.addr === result.to) {
                                    fam = pong.bitcoin.satoshiToMBTC(oo.value); //value in satoshi
                                    found = "FOUND";
                                    console.log("found");
                                    //                                  var dd=getTransactionDate(hash);
                                    /*                                if(!isDateCorrect(dd,datemin,datemax)){
                                     console.log("bad date"+datemin+" "+datemax+" "+dd);
                                     }else{    
                                     */
                                    n = oo.n;
                                    console.log("TX FOUND");
                                    pong.sql.update("transaction","`transaction_hash` = ?,status= ? , amount= ? WHERE id = ? ",[x.hash, "FOUND", fam, tid], function( result) {
                                    //var query = bdd.query("UPDATE transaction SET `transaction_hash` = ?,status= ? , amount= ? WHERE id = ? ", [x.hash, "FOUND", fam, tid], function(err, result) {
                                        //console.log(err);
                                        console.log(result);
                                        var res = {'found': found, 'hash': x.hash, 'amount': fam, 'tx': fres, 'n': n};
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
                            var res = {'found': found, 'amount': fam, 'hash': null, 'tx': fres, 'n': n};
                            console.log("<-- sql-findpayment-response" + found);
                            socket.emit("sql-findpayment-response", res);
                        } else {
                            console.log(found);
                            var res = {'found': found, 'hash': x.hash, 'amount': fam, 'tx': fres, 'n': n};
                            console.log("<-- sql-findpayment-response" + found);
                            socket.emit("sql-findpayment-response", res);
                        }
                    } else {    
                        console.log("Blockchain connection not working");
                    }
                });
            }
        });
    }
    

}