Shot.shots = [];
Shot.textures = [];

//Shot.modelData = importObj('Obelix_1.OBJ');
//var textures = [];

function Shot(at, facing, velo){
    this.at = at;
    this.scale = 0.25;
    this.velocity = add(scale(0.05, velo), scale(0.3, facing));
    this.life = 180;
    this.valid = true;
    this.animate = function() {
      for (var i=0; i<3; i++)
        if (Math.abs(this.at[i] + this.velocity[i])> (mapDim+1)/2) this.at[i] *= -1.0;
      this.at = add(this.at,this.velocity);
      this.life --;
    }
}

Shot.init = function(program) {
  Shot.vLength = Asteroid.vLength;
  /*
  var modelData = importObj('Obelix_1.OBJ');
  Shot.vLength = modelData.vertices.length/4;
  Shot.vBuffer = createBuffer(modelData.vertices);
  Shot.tBuffer = createBuffer(modelData.uv);
  
  Shot.textures.push(configureTexture( document.getElementById("Stexture"), "texture" , true, 0));
  Shot.textures.push(configureTexture( document.getElementById("Snormals"), "normals" , true, 1)); 
  Shot.textures.push(configureTexture( document.getElementById("Sspecular"), "specular", true, 2));
  
  Shot.vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.enableVertexAttribArray( Shot.vPosition );
  Shot.vNormal = gl.getAttribLocation( program, "vNormal" );
  Shot.vTexCoord = gl.getAttribLocation( program,  "vTexCoord" );
  gl.enableVertexAttribArray( Shot.vTexCoord );
  */
}

Shot.create = function(at, facing, velocity){
  if (Shot.shots.length < 4){
    Shot.shots.push(new Shot(at, facing, velocity));
    numShotsElement.textContent = Shot.shots.length;
  }
} 

Shot.draw = function(ctm, pos, mLoc, nLoc){
 /* gl.uniform1i(textureLocation, 0);
  gl.uniform1i(normalsLocation, 1);
  gl.uniform1i(specularLocation, 2); */
  /*
  gl.bindBuffer( gl.ARRAY_BUFFER, Shot.vBuffer );
  gl.vertexAttribPointer( Shot.vPosition, 4, gl.FLOAT, false, 0, 0 );
  gl.bindBuffer( gl.ARRAY_BUFFER,  Shot.tBuffer );
  gl.vertexAttribPointer( Shot.vTexCoord, 2, gl.FLOAT, false, 0, 0 );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, Shot.textures[0]);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, Shot.textures[1]);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, Shot.textures[2]);
  */
  //For now we will be using asteroid texture and vertices for the shot.
  for (var i=0; i<Shot.shots.length; i++){
  var shot = Shot.shots[i];
  if (shot != null)
    if (dot(subtract(shot.at, pos), facing) > 0)
    {
      //Let´s not draw what's in front of us!
      var tm = translate(shot.at);
      var sm = scalem(shot.scale, shot.scale, shot.scale);
      var mvMat = ctm;

      gl.uniformMatrix4fv(mLoc, false, flatten(mult(tm, (mult( ctm , sm)))));
      gl.uniformMatrix4fv(nLoc, false, flatten(mvMat));
      gl.drawArrays(gl.TRIANGLES, 0, Shot.vLength );
    }
  }
}

Shot.animate = function(){
  for (var i=0; i<Shot.shots.length; i++){
    if(Shot.shots[i].life < 0) Shot.remove(i); 
    else Shot.shots[i].animate();
  }
}

Shot.remove = function(num){
  Shot.shots.splice(num, 1);
  numShotsElement.textContent = 4-Shot.shots.length;
}

console.log("Hello and welcome");
