
window.onload = 
	
function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    // Sample code
    /*var mainPage = document.querySelector('#main');

    mainPage.addEventListener("click", function() {
        var contentText = document.querySelector('#content-text');
        i = i + 1;
        contentText.innerHTML =  i;///(contentText.innerHTML === "Basic") ? "Tizen" : "Basic";
    });*/
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
    
};