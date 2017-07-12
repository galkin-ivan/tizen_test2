var boxs = [];
var foodBlock = null;
var numberOfSnackBlocks = 1;
//var movingbyX = false;
//var moveDelta = -0.1;
//var advanceLeft = false;
//var advanceRight = false;

window.onload = function(){
	
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
        
	    return scene;
	};
	
	var scene = createScene();
	
	engine.runRenderLoop(function() {
		if(boxs[0].movingbyX === true){
			boxs[0].position.x = boxs[0].position.x + boxs[0].moveDelta;
		}
		else {
			boxs[0].position.z = boxs[0].position.z + boxs[0].moveDelta;
		}
		
		if (boxs[0].intersectsMesh(foodBlock, false)) {
			foodBlock.position.x = getRandomInt(-5, 9);
	        foodBlock.position.z = getRandomInt(-5, 9);
			} else {
			  //balloon1.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
			}
		
		// the part about movement advancement
		if(boxs[0].advanceRight || boxs[0].advanceLeft){
			advance(boxs[0]);
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