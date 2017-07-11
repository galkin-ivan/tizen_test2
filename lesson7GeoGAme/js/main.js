
window.onload = function () {
    // TODO:: Do your initialization job

	$("#reg_btn").click(regFn);
	$("#check_pnt_btn").click(checkPTfn);
	
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

function regFn(){
	console.log("regfn");
	
	$.ajax({
		type:"POST",
		url:"http://83.69.213.178:8081/init?device_id=01",
		dataType: 'json',
		success: function(data){
			console.log("reg req ok");
			if(data.status === "ok"){
				alert("Game reg ok, game id is: "+data.game_id);
				//$("#reg_btn").click(null);
				$("#reg_btn").text("Game id: "+data.game_id);
				$("#reg_btn").attr("data-gameid", data.game_id);
				
				//alert($("#reg_btn").data("gameid"));
			}
			else{
				alert("Game reg status not ok");
			}
		},
		error: function(xhr, stat, err){
			console.log("reg req not ok "+err);
			alert("Faled to reg the game!");
		}
	});
}

function checkPTfn(){
	//alert("checkptfn");
	
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
	
}


function geoSuccess(position){
	
	var gID = $("#reg_btn").data("gameid");
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	
	$.ajax({
		type:"POST",
		url:"http://83.69.213.178:8081/check_point?game_id="+gID+"&latitude="+lat+"&longitude="+lon,
		dataType: 'json',
		success: function(data){
			console.log("reg req ok");
			if(data.status === "ok" || data.status === "found"){
				var msg = "";
				
				msg = "Status: "+data.status+"\n";
				msg = msg + "Distance: "+data.distance+"\n";
				msg = msg + "Rem_points: "+data.remained_points+"\n";
				msg = msg + "Curr_pont: "+data.current_point+"\n";
				msg = msg + "descr: "+data.description+"\n";
				
				alert(msg);
			}
			else{
				alert("Check point status: "+data.status);
			}
		},
		error: function(xhr, stat, err){
			console.log("reg req not ok "+err);
			alert("Faled to reg the game!");
		}
	});
}

function geoError(error){
	alert("Geo errorrrr");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}