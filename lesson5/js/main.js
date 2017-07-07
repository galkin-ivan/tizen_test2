
window.onload = function () {
    // TODO:: Do your initialization job
	//alert("kjf");
	 //console.log("tt");
	document.getElementById("setAl").addEventListener("click", function() {
		var picker = document.querySelector("#timePiker");
		picker.click();
		
	});
	
	document.getElementById("timePiker").onchange = function(){
		//alert(this.value.substring(0,5));
		
		var setedH = this.value.substring(0,2);
		var setedM = this.value.substring(3,5);
		
		//alert(setedH +":"+setedM);
		
		var d = new Date();

		//var y = Math.round(t / years);
		
		var realH = d.getHours();
		var realM = d.getMinutes();;
		
		//alert(realH +":"+realM);
		
		var realMS = realH*60*60 + realM*60 + d.getSeconds();
		realMS = realMS*1000;
		
		var setedMS = setedH*60*60 + setedM*60;
		setedMS = setedMS*1000;
		
		if(setedMS <= realMS){
			alert("Указанное время уже прошло!!");
		}
		else{
			//alert("Указано продходящее время");
			$("#setTextHolder").css("display", "none");
			$("#isSetTextHolder").css("display", "block");
			$("#setedTime").text(setedH +":"+setedM);
			var TOtime = setedMS - realMS;
			alert("TO set in: "+ (TOtime));
			setTimeout(function(){
				$("#isSetTextHolder").css("display", "none");
				$("#timeup").css("display", "block");
				navigator.vibrate([300, 300, 600, 600, 300, 300, 300, 600, 600, 300]);
				//alert("TIME UP!!!");
				setTimeout(function(){
					$("#setTextHolder").css("display", "block");
					$("#timeup").css("display", "none");
				}, 10000);
			}, TOtime);
		}
		
	};
	
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
