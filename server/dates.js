module.exports = {
 now:function (){
return    new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '');
  }
,isDateCorrect:    function (txdate, debutdate, findate){
        return (debutdate < txdate)  && (txdate < findate);
    }
   
}
