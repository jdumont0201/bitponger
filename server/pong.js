module.exports={
  sql:null,
  dates:null,
  config:null,
  comp:null,
  game:null,
  player:null,
  bitcoin:null,
  log:null,
  io:null,
  shortid:null,
  request:null,
  room:null,
    init:function(sql_,dates_,config_,comp_,game_,player_,io_,shortid_,request_,bitcoin_,log_,room_){
     this.room=  room_;
     this.sql=   sql_;
     
     this.dates=dates_;
     this.config=config_;
     this.log=log_;
     this.bitcoin=bitcoin_;
     this.comp=comp_;
     this.game=game_;
     this.player=player_;
     this.io=io_;
     this.shortid=shortid_;
     this.request=request_;
    }
}