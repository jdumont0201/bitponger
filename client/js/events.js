/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    $(function() {		

$(window).unbind("resize").resize(function(evt) {
//    var w = $(window).width();
    evt.stopPropagation();
    evt.preventDefault();
    //alert("re");
    doResizeDisplay();
});
/*
$(window).unbind("scroll").scroll(function (evt) {
    
    evt.stopPropagation();
    evt.preventDefault();
});*/
doResizeDisplay();
doResizeDisplayOneTime();
hideCatalogFilterMenuNoAnim();

$("#top-mini-4").click(function(){hideAllMenuSub();$("#top-switchers").show();});
$("#top-mini-2").click(function(){hideAllMenuSub();$("#top-login").show();});
$("#top-mini-3").click(function(){hideAllMenuSub();$("#top-cart").show();});
$("#top-mini-1").click(function(){hideAllMenuSub();$("#top-research").show();});

$("#catalog-mobile-classification-button").click(function(){
   
   if($("#catalog-category-list").is(":visible")){
       $("#catalog-mobile-classification-button").removeClass("z20");
        $(this).html("Show categories"); 
        $("#voile").hide();
        }else{
        $(this).html("Hide categories"); 
        $("#voile").show();
        $("#catalog-mobile-classification-button").addClass("z20");
loadCatalogCategoriesBox(0);        
    }
    $("#catalog-category-list").toggle(); 
});
$("#topmobile-categories").click(function(){
   showMobileCategoryMenu();
});


$("#catalog-filter-close").click(function(){
   hideCatalogFilterMenu();
});
   $("#catalog-filter-menu").hide(); 
  
$("#catalog-filter-open").click(function(){
   changeFilterMenuButtonText(); 
$("#catalog-filter-menu").slideToggle(); 
});

    $("#catalog-category-list-hide").click(function(){
        hideMobileCategoryMenu();
    });


var mobilemenuactivated=false;

$("#mobile-menu-return").click(function(){
    hideMobileMenu();
});

$("#mobile-menu-button").click(function(){
    if(!mobilemenuactivated){
    showMobileMenu();
    }else{
        hideMobileMenu();
    }
});



});