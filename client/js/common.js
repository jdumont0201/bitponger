/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ajaxErrorMsg = "Error ";
function ajaxPerform(myurl, a) {
    $("#ajaxloader").show();
    $.ajax({
        url: myurl,
        success: a,
        error:function(xhr, status, error) {
            alert(ajaxErrorMsg + myurl);
            console.log(xhr);
            console.log();
            $("#ajaxloader").hide();
        }
    });
}
function ajaxLocalPerform(myurl, a) {
    $("#ajaxloader").show();
    $.ajax({
        url: myurl,
        crossDomain: true,
/*    dataType: 'jsonp',
    contentType:'application/json',*/
        success: a,
        error:function(xhr, status, error) {
            alert(ajaxErrorMsg + myurl);
            console.log(xhr);
            console.log(error);
            $("#ajaxloader").hide();
        }
    });
}
function ajaxPerformMini(myurl, a) {
    $("#ajaxloader-mini").show();
    $.ajax({
        url: myurl,
        success: a,
        error: function() {
            alert(ajaxErrorMsg + myurl);
            $("#ajaxloader-mini").hide();
        }
    });
}
 function changeFilterMenuButtonText(){
    
       if($("#catalog-filter-menu").is(":visible")){
        $("#catalog-filter-open").html("Show filters"); }
   else{
        $("#catalog-filter-open").html("Hide filters");     }
   }
function getBaseUrl() {
    return "http://www.aureuscoins.com/";
}

function hideAllMenuSub() {
    $("#top-switchers").hide();
    $("#top-login").hide();
    $("#top-cart").hide();
    $("#top-research").hide();
}
function loadCatalogCategoriesBox(id){

 var myurl = getBaseUrl() + 'catalog/ajaxgetcategories/' + id;
    ajaxPerformMini(myurl, function(response) {
        $("#catalog-category-list").html(response);
        $("#ajaxloader-mini").hide();
    
    });
}


var mo940 = ["menuiden"];
var mo750 = ["menuin"];
var mo650 = ["index-front", "offer-front", "top-logo", "top"];
var mo550 = ["menuin", "menuiden"];
var mo500 = ["catchup", "logo", "top-logo", "top"];
var mo440 = ["top-right-block", "menu-user-dropdown","topmenu-mobile", "top-cart-info", "topmenu", "index-latest", "index-latest-in ", "content2catalog", "content2", "index1a", "index2a", "index3a", "catalog-category-list"];



function doSwitchDisplay(x, key, arr) {
    var w = $(window).width();
    if (w < x) {
        for (var i = 0; i < arr.length; ++i) {
            var v = arr[i];
            $("#" + v).addClass(key + v);
        }
    } else {
        for (var i = 0; i < arr.length; ++i) {
            var v = arr[i];
            $("#" + v).removeClass(key + v);
        }
    }
}

function doResizeDisplayOneTime() {
    var w = $(window).width();
    if (w < 440) {

    } else {

    }
    if (w < 440) {


        //hideCatalogFilterMenu();

    } else {

    }
}
function prependClass(sel, strClass) {
    var $el = $(sel);

    /* prepend class */
    var classes = $el.attr('class');
    classes = strClass +' ' +classes;
    $el.attr('class', classes);
}

var isShowMobileCategory = false;
function doResizeDisplay() {

    doSwitchDisplay(940, "normal-", mo940);
    doSwitchDisplay(750, "subnormal-", mo750);
    doSwitchDisplay(650, "small-", mo650);
    doSwitchDisplay(550, "tiny-", mo550);
    doSwitchDisplay(500, "nano-", mo500);
    doSwitchDisplay(440, "pico-", mo440);

    var twoColumns=true;
    var w = $(window).width();
    if(w<400){
        $("#top-menu-cart").hide();
    }else{
        $("#top-menu-cart").show();
    }
    $(".product-line-actions-box").addClass("pico-product-line-actions-box");
        $(".product-line-actions a").removeClass("fr").addClass("pico-product-line-actionsa");
        $(".product-line-actions").hide();
        $(".show-actions").show().removeClass("buttonwhite cbutton").addClass("show-actions2 cbutton");
    if (w < 440) {
        if(twoColumns){
            $(".product-block").addClass("pico-product-block");    
            $(".cover").addClass("pico-cover");    
            $(".catalog-img").addClass("pico-catalog-img");    
            $(".product-block-link").html("View");
            
        }
        $("footer").hide();
        
        $("#menu-user-dropdown-list li a").addClass("pico-largemenu");
        $("#menu-user-dropdown").addClass("pico-menu-user-dropdown");
        $("#product-ownercard").addClass("pico-ownercard");
        $("#product-ownercard").addClass("w100p");
        $("#product-ownercard .ownercardin").addClass("btl").addClass("pico-ownercard-in");;
        $("#product-ownercard .ownertype").addClass("pico-ownertype");;
        $("#product-ownercard .cardextra").addClass("pico-ownercard-extra");
        
        $(".product-line-details").addClass("pico-product-line-details");
        $(".product-line-actions").addClass("pico-product-line-actions");
        
        $(".createbox").addClass("pico-createbox");
        $("h5").addClass("pico-h5");
      //  $("#mobile-menu-button").removeClass("hiddendiv");
        $("#content2").removeClass("mt50").addClass("nomb");
        $("#contentin").addClass("nopalrb");
        $("#product-in").addClass("pico-product-in");
        $("#content2catalog").removeClass("mt50");
        //$("nav").addClass("hiddendiv");
        $("nav").addClass("nob");
        $(".product-block").addClass("pico-pb ");
        $(".content-canvas").addClass("pico-content-canvas");
        $(".top-category").addClass("w100p");
        $(".top-category-list").addClass("pico-top-category-list");
        $(".category-list-item").addClass("pico-category-list-item");
        // $("#catalog-filter-menu").hide();
        $("#catalog-follow-button").hide();
        $(".breadcrumb").hide();
        $("index-text-inmb").hide();
        $("#catalog-mobile-classification-border").show();
        //$("h5").addClass("h4index");
        $(".index-text-in").addClass("pico-index-text-in");
        if (!isShowMobileCategory) {
            $("#catalog-category-list").hide();
        }

    } else {
        if(twoColumns){
            $(".product-block").removeClass("pico-product-block");    
            $(".cover").removeClass("pico-cover");    
            $(".catalog-img").removeClass("pico-catalog-img");    
        }
        $("footer").show();
        $("#contentin").removeClass("nopalrb");
        $("#menu-user-dropdown-list li a").removeClass("pico-largemenu");
        $("#product-ownercard").removeClass("pico-ownercard");
        //$(".product-line-actions").show();
        $("#product-ownercard .ownercardin").removeClass("btl").removeClass("pico-ownercard-in");
        $("#product-ownercard .ownertype").removeClass("pico-ownertype");;
        $("#product-ownercard").removeClass("w100p");
        $("#product-ownercard .cardextra").removeClass("pico-ownercard-extra");
        
        $(".product-line-details").removeClass("pico-product-line-details");
        $(".product-line-actions").removeClass("pico-product-line-actions");
        /*$(".product-line-actions-box").removeClass("pico-product-line-actions-box");
        $(".product-line-actions a").addClass("fr").removeClass("pico-product-line-actionsa");
        $(".show-actions").hide();
        */
        
        $("#product-in").removeClass("pico-product-in");
        $(".createbox").removeClass("pico-createbox");
         $("#menu-user-dropdown").removeClass("pico-menu-user-dropdown");
        $("nav").removeClass("nob");
        $("h5").removeClass("pico-h5");
    //    $("#mobile-menu-button").addClass("hiddendiv");
       // $("nav").removeClass("hiddendiv");
        $("#content2").addClass("mt50").removeClass("nomb");;
        $("#content2catalog").addClass("mt50");
        $(".product-block").removeClass("pico-pb ");
        $(".content-canvas").removeClass("pico-content-canvas");
        $(".top-category").removeClass("w100p");
        //$("#catalog-filter-menu").show();


        $(".index-text-in").removeClass("pico-index-text-in");
        $("#catalog-follow-button").show();
        //$(".breadcrumb").show();

        $("#catalog-mobile-classification-border").hide();
        $(".category-list-item").removeClass("pico-category-list-item");
        $(".top-category-list").removeClass("pico-top-category-list");

//        $("#catalog-category-list").prependTo("#catalog-filter-menu");   
        if (isShowMobileCategory) {
            $("#catalog-category-list").show();

        }


        //$("h5").hideClass("h4index");
    }
    if (w < 750) {
        moveAddtocartToTop();
    } else {
        moveAddtocartToRight();
    }
    // alert("res");

}
function moveAddtocartToTop() {
    $("#product-sales-and-exchanges").appendTo("#product-top");
    $("#product-ownercard").appendTo("#product-bottom");
    $("#product-right").hide();
    $("#product-left").addClass("ful");
}
function moveAddtocartToRight() {
    $("#product-ownercard").prependTo("#product-right");
    $("#product-sales-and-exchanges").prependTo("#product-right");

    $("#product-right").show();
    $("#product-left").removeClass("ful");
}

function showMobileCatalogCategories() {
    $("#catalog-category-list").show();
}
function hideMobileCatalogCategories() {
    $("#catalog-category-list").hide();
}

function hideCatalogFilterMenu() {
//    $("#catalog-filter-list").slideUp(function(){
    //  $("#catalog-category-list").slideUp(function(){
//            $("#catalog-filter-close").hide(); 
    //$("#catalog-filter-menu").addClass("nofloat").removeClass("fl"); 
    //            $("#catalog-filter-open").show(); 
    // }); 

//    }); 

}
function hideCatalogFilterMenuNoAnim() {
//    $("#catalog-filter-list").hide();
    //$("#catalog-category-list").hide();
    //    $("#catalog-filter-close").hide(); 
    //$("#catalog-filter-menu").addClass("nofloat").removeClass("fl"); 
    //          $("#catalog-filter-open").show(); 




}


function loadCategoryList(v) {
    var myurl = getBaseUrl() + 'perso/collection/ajaxgetcategorylist/' + v
    ajaxPerform(myurl, function(response) {
        $('#categoryid').html(response);
        $('#collection-add-category-selector').show();
        $('#ajaxloader').hide();
    });

}
function loadSubcategoryList(v) {
    var myurl = getBaseUrl() + 'perso/collection/ajaxgetsubcategorylist/' + $("#categoryid").val();
    ajaxPerform(myurl, function(response) {
        $('#subcategoryid').html(response);
        $('#collection-add-subcategory-selector').show();
        $('#ajaxloader').hide();
    });

}
function loadSubsubcategoryList(v) {
    var myurl = getBaseUrl() + 'perso/collection/ajaxgetsubsubcategorylist/' + v
    ajaxPerform(myurl, function(response) {
        $('#subsubcategoryid').html(response);
        $('#collection-add-subsubcategory-selector').show();
        $('#ajaxloader').hide();
    });

}
function loadOrHideCategory(topcat) {
    if (topcat > -1) {
        loadCategoryList(topcat);
    } else {
        $('#collection-add-category-selector').hide();
    }
}
function loadOrHideSubCategory(cat) {
    if (cat > -1) {
        loadSubcategoryList(cat);
    } else {
        $('#collection-add-subcategory-selector').hide();
    }
}
function loadOrHideSubsubcategory(subcat) {
    if (subcat > -1) {
        loadSubsubcategoryList(subcat);
    } else {
        $('#collection-add-subsubcategory-selector').hide();
    }
}

function hideMobileCategoryMenu() {
    $("#catalog-category-list").slideToggle();
//         $("footer").show();
//        $("#content2catalog").show();
//        $("#catalog-category-list-hide").hide();
    isShowMobileCategory = false;
}
function showMobileCategoryMenu() {
    $("#catalog-category-list").slideToggle();

//    $("#catalog-category-list-hide").show();
//   $("footer").hide();
//   $("#content2catalog").hide();
    isShowMobileCategory = true;

}

function hideMobileMenu() {
    $("footer").removeClass("hiddendiv");
    $("#mobile-menu").removeClass("mobile-menu-activated fl");
    $("#content2catalog").removeClass("content2-reduced fl");
    mobilemenuactivated=false;
}
function showMobileMenu() {
    $("#mobile-menu").addClass("mobile-menu-activated");
    $("#content2").addClass("content2-reduced fl");
    $("footer").addClass("hiddendiv");
    $("#content2catalog").addClass("content2-reduced fl");
    mobilemenuactivated=true;
}