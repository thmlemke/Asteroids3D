var meshVertices = [vec3(-10.0,  10.0,  10.0), vec3(-10.0,  10.0, -10.0), vec3(-10.0, -10.0, -10.0), vec3(-10.0, -10.0,  10.0), vec3(-10.0,  10.0,  10.0), 
vec3(-9.0,  10.0,  10.0), vec3(-9.0,  10.0, -10.0), vec3(-9.0, -10.0, -10.0), vec3(-9.0, -10.0,  10.0), vec3(-9.0,  10.0,  10.0), 
vec3(-8.0,  10.0,  10.0), vec3(-8.0,  10.0, -10.0), vec3(-8.0, -10.0, -10.0), vec3(-8.0, -10.0,  10.0), vec3(-8.0,  10.0,  10.0), 
vec3(-7.0,  10.0,  10.0), vec3(-7.0,  10.0, -10.0), vec3(-7.0, -10.0, -10.0), vec3(-7.0, -10.0,  10.0), vec3(-7.0,  10.0,  10.0), 
vec3(-6.0,  10.0,  10.0), vec3(-6.0,  10.0, -10.0), vec3(-6.0, -10.0, -10.0), vec3(-6.0, -10.0,  10.0), vec3(-6.0,  10.0,  10.0), 
vec3(-5.0,  10.0,  10.0), vec3(-5.0,  10.0, -10.0), vec3(-5.0, -10.0, -10.0), vec3(-5.0, -10.0,  10.0), vec3(-5.0,  10.0,  10.0), 
vec3(-4.0,  10.0,  10.0), vec3(-4.0,  10.0, -10.0), vec3(-4.0, -10.0, -10.0), vec3(-4.0, -10.0,  10.0), vec3(-4.0,  10.0,  10.0), 
vec3(-3.0,  10.0,  10.0), vec3(-3.0,  10.0, -10.0), vec3(-3.0, -10.0, -10.0), vec3(-3.0, -10.0,  10.0), vec3(-3.0,  10.0,  10.0), 
vec3(-2.0,  10.0,  10.0), vec3(-2.0,  10.0, -10.0), vec3(-2.0, -10.0, -10.0), vec3(-2.0, -10.0,  10.0), vec3(-2.0,  10.0,  10.0), 
vec3(-1.0,  10.0,  10.0), vec3(-1.0,  10.0, -10.0), vec3(-1.0, -10.0, -10.0), vec3(-1.0, -10.0,  10.0), vec3(-1.0,  10.0,  10.0), 
vec3(0.0,  10.0,  10.0), vec3(0.0,  10.0, -10.0), vec3(0.0, -10.0, -10.0), vec3(0.0, -10.0,  10.0), vec3(0.0,  10.0,  10.0), 
vec3(1.0,  10.0,  10.0), vec3(1.0,  10.0, -10.0), vec3(1.0, -10.0, -10.0), vec3(1.0, -10.0,  10.0), vec3(1.0,  10.0,  10.0), 
vec3(2.0,  10.0,  10.0), vec3(2.0,  10.0, -10.0), vec3(2.0, -10.0, -10.0), vec3(2.0, -10.0,  10.0), vec3(2.0,  10.0,  10.0), 
vec3(3.0,  10.0,  10.0), vec3(3.0,  10.0, -10.0), vec3(3.0, -10.0, -10.0), vec3(3.0, -10.0,  10.0), vec3(3.0,  10.0,  10.0), 
vec3(4.0,  10.0,  10.0), vec3(4.0,  10.0, -10.0), vec3(4.0, -10.0, -10.0), vec3(4.0, -10.0,  10.0), vec3(4.0,  10.0,  10.0), 
vec3(5.0,  10.0,  10.0), vec3(5.0,  10.0, -10.0), vec3(5.0, -10.0, -10.0), vec3(5.0, -10.0,  10.0), vec3(5.0,  10.0,  10.0), 
vec3(6.0,  10.0,  10.0), vec3(6.0,  10.0, -10.0), vec3(6.0, -10.0, -10.0), vec3(6.0, -10.0,  10.0), vec3(6.0,  10.0,  10.0), 
vec3(7.0,  10.0,  10.0), vec3(7.0,  10.0, -10.0), vec3(7.0, -10.0, -10.0), vec3(7.0, -10.0,  10.0), vec3(7.0,  10.0,  10.0), 
vec3(8.0,  10.0,  10.0), vec3(8.0,  10.0, -10.0), vec3(8.0, -10.0, -10.0), vec3(8.0, -10.0,  10.0), vec3(8.0,  10.0,  10.0), 
vec3(9.0,  10.0,  10.0), vec3(9.0,  10.0, -10.0), vec3(9.0, -10.0, -10.0), vec3(9.0, -10.0,  10.0), vec3(9.0,  10.0,  10.0), 
vec3(10.0,  10.0,  10.0), vec3(10.0,  10.0, -10.0), vec3(10.0, -10.0, -10.0), vec3(10.0, -10.0,  10.0), vec3(10.0,  10.0,  10.0)];
    //Should've put this somewhere else :D


var canvas;
var gl;
var program;
var simpleProgram;

var mapDim = 20; //map size nxnxn

var index = 0;
var locked = false;

var vBuffer, vPosition, vTexCoord, tBuffer;

var testVertices, testBuffer, testPosition, meshBuffer, meshPosition;
var testPlayerPosMatrixLoc, testProjectionMatrixLoc

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;



var fovy = 70.0;
var near = 0.2;
var far = 100.0;
var projectionMatrix = perspective( fovy, 2.0, near, far );


var lightPosition = vec4(512.0, 317.0, -512.0, 1.0 );
var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var textureLocation;
var normalsLocation;
var specularLocation; //test
var testLocation;


var normals;
var anisotropyMax;
var anisotropyExtension;

var materialAmbient = vec4( 0.08, 0.05, 0.2, 1.0 );
var materialDiffuse = vec4( 0.35, 0.35, 0.30, 1.0 );
var materialSpecular = vec4( 0.5, 0.45, 0.4, 1.0 );
var materialShininess = 50.0;

var ctm;
var ambientColor, diffuseColor, specularColor;

var modelViewMatrix;

var modelViewMatrixLoc, projectionMatrixLoc;
var playerPosMatrixLoc, playerPosMatrix;

var thetaLoc, scaleLoc, atLoc;
var normalMatrix, normalMatrixLoc;

var keyState = {};

var playerVelocity = vec3(0.0, 0.0, 0.0);
var eye = vec3(0.0, 0.0, 3.0);
var at = vec3(0.0, 0.0, 5.0);
var up = vec3(0.0, 1.0, 0.0);
var facing = vec3(0.0, 0.0, -1.0);
var points = 0;

var skybox;



window.onload = function init() {

  canvas = document.getElementById( "gl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  ambientProduct = mult(lightAmbient, materialAmbient);
  diffuseProduct = mult(lightDiffuse, materialDiffuse);
  specularProduct = mult(lightSpecular, materialSpecular);

  gl.viewport( 0, 0, canvas.width, canvas.height );

  gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
  
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);
  gl.frontFace(gl.CW);
  configureAnisotropy();
  
  //Program 1:
  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );
  configureAnisotropy();

  Asteroid.init(program);
  Shot.init(program);

  modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
  playerPosMatrixLoc = gl.getUniformLocation( program, "playerPosMatrix" );
  playerPosLoc = gl.getUniformLocation( program, "playerPos" );
  normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
  
  var projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
  
  gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct) );
  gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
  gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
  gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );
  gl.uniform1f( gl.getUniformLocation(program, "shininess"), materialShininess );

  
  //Program 2:

  simpleProgram = initShaders( gl, "vertex-shader2", "fragment-shader2");
  gl.useProgram( simpleProgram );
  
  meshBuffer = gl.createBuffer()
  gl.bindBuffer( gl.ARRAY_BUFFER, meshBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(meshVertices), gl.STATIC_DRAW);
  
  testPosition = gl.getAttribLocation( simpleProgram, "vPosition" );
  gl.vertexAttribPointer( testPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( testPosition );

  testPlayerPosMatrixLoc = gl.getUniformLocation( simpleProgram, "playerPosMatrix" );
  testProjectionMatrixLoc = gl.getUniformLocation( simpleProgram, "projectionMatrix");
  gl.uniformMatrix4fv(testProjectionMatrixLoc, false, flatten(projectionMatrix) );
  
  skybox = new Skybox();
  
  initGameState();
  
  

  //Pointer lock and control stuff:

  document.requestPointerLock = document.requestPointerLock || document.mozRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  canvas.onclick = function(){
    canvas.requestPointerLock();
  };
 
  function updatePosition(e) {
    spinY = ( (-e.movementX)/10 ) %360;
    spinX = ( (e.movementY)/10 ) %360;
    var newFacing = vec3();
    
    
    facing = linTrans(rotate(spinX, v34(cross(up, facing))), facing); // Jón Ingólfur væri stoltur   |==|
    up = linTrans(rotate(spinX, v34(cross(up, facing))), up); //                  Pantastic          |/\|
    facing = linTrans(rotate(spinY, v34(up)),facing);
  }

  document.addEventListener('pointerlockchange', lockChangeAlert, false);
  document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

  function lockChangeAlert() {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas){
      //document.addEventListener("mousemove", updatePosition, false);
      if (!locked) console.log("locked");
      locked = true;
    }
    else{
     // document.removeEventListener("mousemove", updatePosition, false);
      locked = false;
      console.log("unlocked");
    }
  }
  
  canvas.addEventListener("mousedown", function(e){
    if (locked){
      Shot.create(eye, facing, playerVelocity);
    }
    
  });

  canvas.addEventListener("mouseup", function(e){
    movement = false;
  });

  canvas.addEventListener("mousemove", function(e){
    if (locked){
      updatePosition(e);
    }
  });

  window.addEventListener("keydown", function(e){
    keyState[e.keyCode || e.which] = true;
    if(e.keyCode == 13) Asteroid.generate(3, null, null);
    if(e.keyCode == 109) initGameState();
  });

  window.addEventListener("keyup", function(e){
    keyState[e.keyCode || e.which] = false;
  });
  

  
  resize_canvas();
  render();
}

var numAstElement = document.getElementById("numAst");
var numShotsElement = document.getElementById("numShots");
var numPointsElement = document.getElementById("points");
var fpsElement = document.getElementById("fps");
var then = Date.now() /1000;
var frameCount = 0;



//RENDER
function render() {
  gl.viewport( 0, 0, canvas.width, canvas.height );
  frameCount = (frameCount + 1) % 30;
  if (frameCount == 29){

    var now = Date.now() /1000;
    var elapsedTime = now - then;
    then = now;
    var fps = 30/elapsedTime;
    fpsElement.textContent = fps.toFixed(2);
  }
  
  var ctm;

  keyCheck();
  modelViewMatrix = mat4();
  normalMatrix = mat4();
  playerPosMatrix = mat4();
  animatePlayer();



  normalMatrix = modelViewMatrix;
  playerPosMatrix = modelViewMatrix;
  var playerRM = faceView(vec3(0.0,0.0,0.0), facing, up);
  playerPosMatrix = mult( modelViewMatrix, faceView(eye, facing, up)); //2d above this line, basically.

  
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  gl.useProgram(simpleProgram); //SIMPLE RENDERER
  gl.disable(gl.DEPTH_TEST); //hax
  skybox.draw( playerRM, testPosition, testPlayerPosMatrixLoc );
  
  
  
  
  ////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////   LINE STRIP
  gl.bindBuffer( gl.ARRAY_BUFFER, meshBuffer );
  gl.vertexAttribPointer( testPosition, 3, gl.FLOAT, false, 0, 0 );
  
  gl.uniformMatrix4fv(testPlayerPosMatrixLoc, false, (flatten(playerPosMatrix)));
  gl.drawArrays(gl.LINE_STRIP, 0, meshVertices.length  ); 
  gl.uniformMatrix4fv(testPlayerPosMatrixLoc, false, flatten(mult(playerPosMatrix, rotateY(90))));
  gl.drawArrays(gl.LINE_STRIP, 0, meshVertices.length );
  gl.uniformMatrix4fv(testPlayerPosMatrixLoc, false, flatten(mult(playerPosMatrix, rotateZ(90))));
  gl.drawArrays(gl.LINE_STRIP, 0, meshVertices.length );
  
  
  
  
  ////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////
  gl.useProgram(program); ///     PER VERTEX SHADER
  gl.enable(gl.DEPTH_TEST);
  gl.uniform3fv( playerPosLoc, flatten(eye));
  gl.uniformMatrix4fv(playerPosMatrixLoc, false, flatten(playerPosMatrix));
  

  
  
  Asteroid.draw(modelViewMatrix, eye, modelViewMatrixLoc, normalMatrixLoc);
  Shot.draw(modelViewMatrix, eye, modelViewMatrixLoc, normalMatrixLoc);
 
 

  window.requestAnimFrame(render);
  Asteroid.animate();
  Shot.animate();
  //Player.animate();
  detectCollisions();
}

function initGameState() {
  Asteroid.asteroids = [];
  Shot.shots = [];
  for (i=0; i<4; i++)
    Asteroid.generate(3, null, null);
  playerVelocity = vec3(0.0, 0.0, 0.0);
  eye = vec3(0.0, 0.0, 3.0);
  at = vec3(0.0, 0.0, 5.0);
  up = vec3(0.0, 1.0, 0.0);
  facing = vec3(0.0, 0.0, -1.0);
  points = 0;
  numAstElement.textContent = Asteroid.asteroids.length;
  numShotsElement.textContent = Shot.shots.length;
}

function detectCollisions(){
  for (var i=Asteroid.asteroids.length-1; i>=0; i--){ //can technically miss some, but happens 60times per sec...
    if (length(subtract(Asteroid.asteroids[i].at, eye))< Asteroid.asteroids[i].scale/2) {
      console.log("COLLISION");
      initGameState();
    }
    for (var j=Shot.shots.length-1; j>=0; j--){
      if (Asteroid.asteroids.length === 0 || i > Asteroid.asteroids.length || i < 0 || typeof(Asteroid.asteroids[i]) == "undefined") break;
      else if(length(subtract(Asteroid.asteroids[i].at,  Shot.shots[j].at)) < 1.0){
        Asteroid.remove(i, j);
        Shot.remove(j);
        // splitAsteroid[i]; checks size and 
      }      
    }
  }
}

function animatePlayer(){
  eye[0] += playerVelocity[0]; eye[1] += playerVelocity[1];  eye[2] += playerVelocity[2];
  for (var i=0; i<3; i++) 
      if (Math.abs(eye[i] + playerVelocity[i])> (mapDim)/2) eye[i] *= -1.0;
  playerVelocity = scale( 0.99, playerVelocity);
}

