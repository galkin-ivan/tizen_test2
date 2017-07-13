
window.onload = function () {
    // TODO:: Do your initialization job

	document.addEventListener('rotarydetent', rotaryHandler, false);
	
	//ui_controller.startApp();
	app_store.load(device_controller);
	/*device_discover_manager.set_discover_callback(
			function(id, description){ 
		    	console.log("found device " + description);
		    	ui_controller.add_discovered_device(id, description);    		    	
	});
	device_discover_manager.set_discover_completed_callback(function(){
		ui_controller.discover_finished();
	});

	function onScreenStateChanged(previousState, changedState) {
		console.log("Screen state changed from " + previousState + " to " + changedState);
		if (changedState === 'SCREEN_NORMAL') {
			device_controller.reconnect();
		}
		 }
	tizen.power.setScreenStateChangeListener(onScreenStateChanged);*/
	
	device_controller.set_device(0);
	
	console.log("Load finished ");
	
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back") {
			try {
			    tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
		}
	});
    
};

function rotaryHandler(e){
	//alert(e.detail.direction);
	device_controller.volume_up(1);
}


