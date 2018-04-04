module.exports={
    event:function(u){
     console.log(u);
    },
    receive:function(u){
     console.log("--> "+u);
    },
    emit:function(u){
     console.log("<-- "+u);
    },
    debug:function(u){
        if(typeof(u)==='object')
     console.log(u);       else
                
        
     console.log("    "+u);
    },
    err:function(u){
     console.log("ERR "+u);
    },
    info:function(u){
     console.log("INFO "+u);
    }
 }