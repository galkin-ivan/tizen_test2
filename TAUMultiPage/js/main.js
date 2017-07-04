( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "one" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );
    
    $("#two .ui-content p").css("color", "white");
    
    var contentText = document.querySelector('#content-text');
    contentText.innerHTML = "Resolution is: "+ screen.availHeight + " by "+ screen.availWidth;
    
    var btnHide = document.querySelector('#btn_hide');

    btnHide.addEventListener("click", function() {
        var contentText = document.querySelector('#content-text');
        contentText.style.display = "none";
    });
    
    var btnShow = document.querySelector('#btn_show');

    btnShow.addEventListener("click", function() {
        var contentText = document.querySelector('#content-text');
        contentText.style.display = "block";
    });
    
} () );