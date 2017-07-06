var checkTime;

var posters = [];
var sources = [];
var currentSource = 0;
var player = null;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    
    
   tizen.systeminfo.getPropertyValue("BUILD", function(e){
	   $("#tvmodel").text(e.model);
	   $("#osvertion").text(e.buildVersion);
    });
    
   tizen.systeminfo.getPropertyValue("ETHERNET_NETWORK", function(e){
	   $("#ipadress").text(e.ipAddress);
    });
   
   tizen.tvaudiocontrol.setVolumeChangeListener(function (v){
	   $("#vollev").text(v);
   });
   
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
    
    fileEnumerator.init(function() {
    	changeSource(0);
    });
    fileEnumerator.listFiles();
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		$("#lastbtn").text("Left arr");
    		break;
    	case 38: //UP arrow
    		$("#lastbtn").text("Up arr");
    		break;
    	case 39: //RIGHT arrow
    		$("#lastbtn").text("Right arr");
    		break;
    	case 40: //DOWN arrow
    		$("#lastbtn").text("Down arr");
    		break;
    	case 13: //OK button
    		$("#lastbtn").text("OK");
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('divbutton1').innerHTML='Current time: ' + h + ':' + m + ':' + s;
    setTimeout(startTime, 10);
}

function checkTime(i) {
    if (i < 10) {
        i='0' + i;
    }
    return i;
}




var fileEnumerator = {

		
		
    	onFilesListed : null,
    	
		_onListFilesError : function (error) {
            log("Error " + error.message + " occurred when listing the files in the selected folder");
        },
        

        _onListFilesSuccess : function (files) {
        	//console.log("hahah");
        	var names = [];
        	var paths = [];
            for (var i = 0; i < files.length; i++) {
            	names[names.length] = files[i].name;
            	paths[paths.length] = files[i].fullPath;
                
            }
            for (var i = 0; i < names.length; i++) {
            	console.log("before ex");
            	if (names[i].match(/.*\.(mp4|avi|mkv)$/i)) {
            		console.log("in match  "+ names[i]);
            		var index = sources.length;
            	     
                    sources[index] = paths[i];
                    
                    console.log('Video added: ' + names[i]);
                } else 
            	if (files[i].name.match(/.*\.(png|jpg)$/i)) {
                    
                }
            }
            
            $("#video").attr("src", sources[0]);
            $("#video")[0].load();
            document.getElementById("video").play();
            //if (fileEnumerator.onFilesListed) { fileEnumerator.onFilesListed(); }
        },

        _listStoragesCallback : function (storages) {
        	sources = [];
        	posters = [];
            for (var i = 0; i < storages.length; i++) {
            	//log('Storage found: ' + storages[i].label);
                if (storages[i].type != "EXTERNAL")
                    continue;

                console.log("Drive:" + storages[i].label);

                tizen.filesystem.resolve(
                    storages[i].label,
                    function(dir) {
                        dir.listFiles(fileEnumerator._onListFilesSuccess, fileEnumerator._onListFilesError);
                    },
                    function(e) {
                        log("Error:" + e.message);
                    }, "r"
                );
            }
        },
                
    	_onStorageStateChanged : function (storage) {
            if (storage.state === "MOUNTED") {
                log("Storage " + storage.label + " was added!");
                fileEnumerator.listFiles();
                
            }
        },
        
        init : function(cb) {
        	watchID = tizen.filesystem.addStorageStateChangeListener(this._onStorageStateChanged);
        	this.onFilesListed = cb;
        },
        
        listFiles : function() {
        	tizen.filesystem.listStorages(this._listStoragesCallback);
        }

        
    };

