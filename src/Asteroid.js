// I have no idea how js works, but this seems to keep track of the things pertaining to asteroids. 
Asteroid.textures = [];
Asteroid.asteroids = [];





//var textures = [];
function Asteroid( at, velocity, axis, theta, thetaD, scale, size) {
  //Asteroid.asteroids+1||1;
  this.at = at;
  this.theta = theta;
  this.thetaD = thetaD;
  this.axis = axis;
  this.scale = scale;
  this.velocity = velocity;
  this.size = size;
  this.valid = true;
  this.animate = function() {
    for (var i=0; i<3; i++) //vera viss um a� �a� fari ekki � neina vitleysu
      if (Math.abs(this.at[i] + this.velocity[i])> (mapDim+1)/2) this.at[i] *= -1.0;
    this.at = add(this.at,this.velocity);
    this.theta = (this.theta + this.thetaD) % 360;
  }
  this.hit = function(impact) {
    Asteroid.generate(this.size-1, this.at, impact);
    Asteroid.generate(this.size-1, this.at, impact);
  }
};

Asteroid.init = function(program) {
  var modelData = importObj('./assets/Obelix_1.OBJ');
  Asteroid.vLength = modelData.vertices.length/4;
  Asteroid.vBuffer = createBuffer(modelData.vertices);
  Asteroid.tBuffer = createBuffer(modelData.uv);
  
  Asteroid.textures.push(configureTexture( document.getElementById("texture"), "texture" , true, 0));
  Asteroid.textures.push(configureTexture( document.getElementById("normals"), "normals" , true, 1)); 
  Asteroid.textures.push(configureTexture( document.getElementById("specular"), "specular", true, 2));
  
  Asteroid.vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.enableVertexAttribArray( Asteroid.vPosition );
  Asteroid.vTexCoord = gl.getAttribLocation( program,  "vTexCoord" );
  gl.enableVertexAttribArray( Asteroid.vTexCoord );
}
  

Asteroid.generate = function(size, loc, impact){
  if (size == 0) return;
  var posRoll = Math.random()*3;
  var at;
  if (size == 3){
    at = vec3(Math.random()*mapDim - mapDim/2, Math.random()*mapDim - mapDim/2, Math.random()*mapDim -mapDim/2);
    at[posRoll | 0] = Math.sign( (Math.round(posRoll)) - (posRoll | 0) - 0.00001) * mapDim/2; //pos if posRoll < n.5, kemur alltaf fra einhverjum kanti
    impact = vec3(0.0, 0.0, 0.0);
  }
  else //add dispersion if necessary 
    at = loc;
  var velocity = add(scale( 0.2*Math.random()/(size + 1.0), normalize(vec3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5))),scale(0.02, impact)) //hmmm;
  var axis = vec3(Math.random(), Math.random(), Math.random()); //Can turn to (0.0,0.0,0.0) and mess things up. I am willing to risk that, may get lottery sponsorship.
  var theta = Math.random()*360;
  var thetaD = Math.random()*3/size;
  var astScale = size/1.5;
  var newAst = new Asteroid(at, velocity, axis, theta, thetaD, astScale, size);
  newAst.animate(); //make sure it's somewhere that looks good.
  Asteroid.asteroids.push(newAst);
  numAstElement.textContent = Asteroid.asteroids.length;
} 

Asteroid.draw = function(ctm, pos, mLoc, nLoc){
  gl.bindBuffer( gl.ARRAY_BUFFER, Asteroid.vBuffer );
  gl.vertexAttribPointer( Asteroid.vPosition, 4, gl.FLOAT, false, 0, 0 );
  gl.bindBuffer( gl.ARRAY_BUFFER,  Asteroid.tBuffer );
  gl.vertexAttribPointer( Asteroid.vTexCoord, 2, gl.FLOAT, false, 0, 0 );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, Asteroid.textures[0]);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, Asteroid.textures[1]);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, Asteroid.textures[2]);
  for (var i=0; i<Asteroid.asteroids.length; i++){
  var ast = Asteroid.asteroids[i];
  if (dot(subtract(ast.at, pos), facing) > 0) //Let�s not draw what's not in front of us!
    {
      var tm = translate(ast.at);
      //var rm = mult(rotateX(ast.xRot), rotateZ(ast.yRot));
      var rm = rotate(ast.theta, ast.axis);
      var sm = scalem(ast.scale, ast.scale, ast.scale);
      var mvMat = mult(ctm , rm);
      gl.uniformMatrix4fv(mLoc, false, flatten(mult(tm, (mult( mvMat , sm)))));
      gl.uniformMatrix4fv(nLoc, false, flatten(mvMat));
      gl.drawArrays(gl.TRIANGLES, 0, Asteroid.vLength );
    }
  }
}

Asteroid.animate = function(){
  for (var i=0; i<Asteroid.asteroids.length; i++){
    Asteroid.asteroids[i].animate();
  }
}


Asteroid.remove = function(num, shotId){
  Asteroid.asteroids[num].hit(Shot.shots[shotId].velocity);
  Asteroid.asteroids.splice(num, 1);
    points++;
  
  numPointsElement.textContent = points;
  if (points%3 == 0) Asteroid.generate(3, null, null);
  numAstElement.textContent = Asteroid.asteroids.length;
}


  

