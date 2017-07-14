var boxs = [];
var foodBlock = null;
var numberOfSnackBlocks = 1;
var playinggame = false;
var justinit = true;
//var movingbyX = false;
//var moveDelta = -0.1;
//var advanceLeft = false;
//var advanceRight = false;

window.onload = function(){
	configure_msf();
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		boxs[0].advanceLeft = true;
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		boxs[0].advanceRight = true;
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		playinggame = !playinggame;
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
	
	var canvas = document.getElementById('gamecanvas');
	
	var engine = new BABYLON.Engine(canvas, true);
	
	var createScene = function() {
		// This creates a basic Babylon Scene object (non-mesh)
	    var scene = new BABYLON.Scene(engine);

	    // This creates and positions a free camera (non-mesh)
	    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-10, 15,-10), scene);

	    // This targets the camera to scene origin
	    camera.setTarget(new BABYLON.Vector3(0,0,0));

	    // This attaches the camera to the canvas
	    //camera.attachControl(canvas, true);

	    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, -10), scene);

	    // Default intensity is 1. Let's dim the light a small amount
	    light.intensity = 0.7;

	    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
	    //var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 5, scene);

	    // Move the sphere upward 1/2 its height
	    //sphere.position.y = 1;
	    //var grid = new BABYLON.GridMaterial("grid", scene);	
		//grid.gridRatio = 0.5;
	    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
	    var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 6, scene);
	    ground.position.z = 0; 
	    
	    //ground.material = grid;
	    
        var boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

        //make first snake block
	    boxs[0] = BABYLON.Mesh.CreateBox("box", 0.5, scene);
        boxs[0].material = boxMaterial;
        boxs[0].position.x = 9.75;
        boxs[0].position.z = 9.75;
        boxs[0].position.y = 0.2;
	    
        boxs[0].movingbyX = false;
        boxs[0].moveDelta = -0.1;
        boxs[0].advanceLeft = false;
        boxs[0].advanceRight = false;
	    
        //make snakes food
        foodBlock = BABYLON.Mesh.CreateBox("food", 0.5, scene);
        foodBlock.position.y = 0.2;
        foodBlock.position.x = getRandomInt(-5, 9);
        foodBlock.position.z = getRandomInt(-5, 9);
        var boxMaterial = new BABYLON.StandardMaterial("foodMaterial", scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0.86);
        foodBlock.material = boxMaterial;
        
        
        //
	    return scene;
	};
	
	var scene = createScene();
	
	engine.runRenderLoop(function() {
		if(playinggame === true){
			justinit = false;
			//------------moves each block-------------------------------------------------------------
			for(var i=0; i<numberOfSnackBlocks; i++){
				if(boxs[i].movingbyX === true){
					boxs[i].position.x = boxs[i].position.x + boxs[i].moveDelta;
				}
				else {
					boxs[i].position.z = boxs[i].position.z + boxs[i].moveDelta;
				}
			}
			//------------moves each block-------------------------------------------------------------
			
			
			//---------makes new block-----------------------------------------------------------------
			if (boxs[0].intersectsMesh(foodBlock, false)) {
				//--- if head toches the food --------
				foodBlock.position.x = getRandomInt(-5, 9);
		        foodBlock.position.z = getRandomInt(-5, 9);
		        
		        
		        var boxMaterial = new BABYLON.StandardMaterial("material", scene);
		        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
		        boxs[numberOfSnackBlocks] = BABYLON.Mesh.CreateBox("box"+numberOfSnackBlocks, 0.5, scene);
		        boxs[numberOfSnackBlocks].material = boxMaterial;
		        boxs[numberOfSnackBlocks].position.y = 0.2;
		        
		        if(boxs[numberOfSnackBlocks - 1 ].movingbyX === true){
		        	if(boxs[numberOfSnackBlocks-1].moveDelta < 0){
		        		boxs[numberOfSnackBlocks].position.x = boxs[numberOfSnackBlocks-1].position.x + 0.5;
		        	}
		        	else{
		        		boxs[numberOfSnackBlocks].position.x = boxs[numberOfSnackBlocks-1].position.x - 0.5;
		        	}
		        	boxs[numberOfSnackBlocks].position.z = boxs[numberOfSnackBlocks-1].position.z;
		        }
		        else{
		        	if(boxs[numberOfSnackBlocks-1].moveDelta < 0){
		        		boxs[numberOfSnackBlocks].position.z = boxs[numberOfSnackBlocks-1].position.z + 0.5;
		        	}
		        	else{
		        		boxs[numberOfSnackBlocks].position.z = boxs[numberOfSnackBlocks-1].position.z - 0.5;
		        	}
		        	boxs[numberOfSnackBlocks].position.x = boxs[numberOfSnackBlocks-1].position.x;
		        }
			    
		        boxs[numberOfSnackBlocks].movingbyX = boxs[numberOfSnackBlocks-1].movingbyX;
		        boxs[numberOfSnackBlocks].moveDelta = boxs[numberOfSnackBlocks-1].moveDelta;
		        boxs[numberOfSnackBlocks].advanceLeft = false;
		        boxs[numberOfSnackBlocks].advanceRight = false;
			    numberOfSnackBlocks = numberOfSnackBlocks + 1;
		        
				} else {
				  //balloon1.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
				}
			//---------makes new block-----------------------------------------------------------------
			
			//--------advances movement of each block--------------------------------------------------
			if(boxs[0].advanceRight || boxs[0].advanceLeft){
				if(numberOfSnackBlocks > 1){
					boxs[1].advanceRight = boxs[0].advanceRight;
					boxs[1].advanceLeft = boxs[0].advanceLeft;
					
					boxs[1].whenToAdvanceX = boxs[0].position.x;
					boxs[1].whenToAdvanceZ = boxs[0].position.z;
				}
				advance(boxs[0]);
			}
				//---i=1 may cause a bug... maybe...)
			for(var i=1;i<numberOfSnackBlocks;i++){
				var madeAdvancmentRight = false;
				var madeAdvancmentLeft = false;
				if(boxs[i].advanceRight || boxs[i].advanceLeft){
					
					
					
					if(boxs[i].movingbyX === true){
						if(boxs[i].moveDelta > 0){
							if(boxs[i].position.x >= boxs[i].whenToAdvanceX){
								madeAdvancmentRight = boxs[i].advanceRight;
								madeAdvancmentLeft = boxs[i].advanceLeft;
								advance(boxs[i]);
								//----set block right after the other----
								if(boxs[i-1].moveDelta < 0){
					        		boxs[i].position.z = boxs[i-1].position.z + 0.5;
					        	}
					        	else{
					        		boxs[i].position.z = boxs[i-1].position.z - 0.5;
					        	}
					        	boxs[i].position.x = boxs[i-1].position.x;
					        	//----set block right after the other----
							}
						}
						else{
							if(boxs[i].position.x <= boxs[i].whenToAdvanceX){
								madeAdvancmentRight = boxs[i].advanceRight;
								madeAdvancmentLeft = boxs[i].advanceLeft;
								advance(boxs[i]);
								//----set block right after the other----
								if(boxs[i-1].moveDelta < 0){
					        		boxs[i].position.z = boxs[i-1].position.z + 0.5;
					        	}
					        	else{
					        		boxs[i].position.z = boxs[i-1].position.z - 0.5;
					        	}
					        	boxs[i].position.x = boxs[i-1].position.x;
					        	//----set block right after the other----
							}
						}
					}
					else{
						if(boxs[i].moveDelta > 0){
							if(boxs[i].position.z >= boxs[i].whenToAdvanceZ){
								madeAdvancmentRight = boxs[i].advanceRight;
								madeAdvancmentLeft = boxs[i].advanceLeft;
								advance(boxs[i]);
								//----set block right after the other----
								if(boxs[i-1].moveDelta < 0){
					        		boxs[i].position.x = boxs[i-1].position.x + 0.5;
					        	}
					        	else{
					        		boxs[i].position.x = boxs[i-1].position.x - 0.5;
					        	}
					        	boxs[i].position.z = boxs[i-1].position.z;
					        	//----set block right after the other----
							}
						}
						else{
							if(boxs[i].position.z <= boxs[i].whenToAdvanceZ){
								madeAdvancmentRight = boxs[i].advanceRight;
								madeAdvancmentLeft = boxs[i].advanceLeft;
								advance(boxs[i]);
								//----set block right after the other----
								if(boxs[i-1].moveDelta < 0){
					        		boxs[i].position.x = boxs[i-1].position.x + 0.5;
					        	}
					        	else{
					        		boxs[i].position.x = boxs[i-1].position.x - 0.5;
					        	}
					        	boxs[i].position.z = boxs[i-1].position.z;
					        	//----set block right after the other----
							}
						}
					}
				}
				
				if(madeAdvancmentRight === true || madeAdvancmentLeft === true){
					if(i+1 !== numberOfSnackBlocks){
						boxs[i+1].advanceRight = madeAdvancmentRight;
						boxs[i+1].advanceLeft = madeAdvancmentLeft;
						
						boxs[i+1].whenToAdvanceX = boxs[i].position.x;
						boxs[i+1].whenToAdvanceZ = boxs[i].position.z;
					}
				}
				
			}
			//--------advances movement of each block--------------------------------------------------
			
		}
		    scene.render();
		
	});
};

function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

//the part about movement advancement
function advance(myObj){
	if(myObj.movingbyX === true && myObj.moveDelta < 0 && myObj.advanceLeft === true){
		myObj.movingbyX = false;
		myObj.moveDelta = -0.1;
		myObj.advanceLeft = false;
	}
	if(myObj.movingbyX === true && myObj.moveDelta < 0 && myObj.advanceRight === true){
		myObj.movingbyX = false;
		myObj.moveDelta = 0.1;
		myObj.advanceRight = false;
	}
	if(myObj.movingbyX === true && myObj.moveDelta > 0 && myObj.advanceLeft === true){
		myObj.movingbyX = false;
		myObj.moveDelta = 0.1;
		myObj.advanceLeft = false;
	}
	if(myObj.movingbyX === true && myObj.moveDelta > 0 && myObj.advanceRight === true){
		myObj.movingbyX = false;
		myObj.moveDelta = -0.1;
		myObj.advanceRight = false;
	}
	
	if(myObj.movingbyX === false && myObj.moveDelta < 0 && myObj.advanceLeft === true){
		myObj.movingbyX = true;
		myObj.moveDelta = 0.1;
		myObj.advanceLeft = false;
	}
	if(myObj.movingbyX === false && myObj.moveDelta < 0 && myObj.advanceRight === true){
		myObj.movingbyX = true;
		myObj.moveDelta = -0.1;
		myObj.advanceRight = false;
	}
	if(myObj.movingbyX === false && myObj.moveDelta > 0 && myObj.advanceLeft === true){
		myObj.movingbyX = true;
		myObj.moveDelta = -0.1;
		myObj.advanceLeft = false;
	}
	if(myObj.movingbyX === false && myObj.moveDelta > 0 && myObj.advanceRight === true){
		myObj.movingbyX = true;
		myObj.moveDelta = 0.1;
		myObj.advanceRight = false;
	}
} 


function configure_msf()
{
	// Get a reference to the local "service"
    msf.local(function(err, service) {
        if (err) {
            log('msf.local error: ' + err /*, logBox*/);
            return;
        }
        // Create a reference to a communication "channel"
        channel = service.channel('com.samsung.multiscreen.MultiScreenSimple');

        // Connect to the channel
        channel.connect({name:"The TV"}, function (err) {
            if (err) {
                return console.error(err);
            }
            log('MultiScreen initialized, channel opened.');
        });

        // Add a message listener. This is where you will receive messages from mobile devices
        channel.on('say', function(msg, from){
        	var command = extract_command_from_query(msg);
        	log(from.attributes.name + ' says: <strong>' + msg + '</strong>');                	
            
        	try
        	{
                if (command === "volume_down"){
                	boxs[0].advanceLeft = true;
                }
                else if (command  === "volume_up"){
                	boxs[0].advanceRight = true;
                }
           
                else
                {
                    //echo(from.attributes.name + ' says: <strong>' + msg + '</strong>');                	
                }
        	}
        	catch (e)
        	{
        		log(e.toString());
        	}
            
        });

        // Add a listener for when another client connects, such as a mobile device
        channel.on('clientConnect', function(client){
            // Send the new client a message
        	// hannel.publish('say', 'Hello ' + client.attributes.name, client.id);
        	publishState();
            log("Let's welcome a new client: " + client.attributes.name);
        });

        // Add a listener for when a client disconnects
        channel.on('clientDisconnect', function(client){
            log("Sorry to see you go, " + client.attributes.name + ". Goodbye!");
        });
    });
}

function extract_command_from_query(query){
	var splitted_query = null;
	if (query){
		splitted_query = query.split(' ');
		return splitted_query[0];
	}
	
	return null;
}

function log(msg) {
	console.log(msg);
    /*var logsEl = document.getElementById('logs');

    if (msg) {
        // Update logs
        //console.log('[MultiScreen]: ', msg);
        logsEl.innerHTML += msg + '<br />';
    } else {
        // Clear logs
        logsEl.innerHTML = '';
    }

    logsEl.scrollTop = logsEl.scrollHeight;*/
}
