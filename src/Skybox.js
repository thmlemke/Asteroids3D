function Skybox() {
  this.texture = Skybox.loadTextureCube([
      "./textures/skyboxRT.png", "./textures/skyboxLF.png",  
      "./textures/skyboxDN.png", "./textures/skyboxUP.png", 
      "./textures/skyboxFT.png", "./textures/skyboxBK.png"], 0);
  this.vertices = [
        // Positive X
        vec3( 1.0, 1.0,-1.0),
        vec3( 1.0, 1.0, 1.0),
        vec3( 1.0,-1.0, 1.0),        
        vec3( 1.0,-1.0,-1.0),
        vec3( 1.0, 1.0,-1.0),
        vec3( 1.0,-1.0, 1.0), 
        // Negative X
        vec3(-1.0, 1.0,-1.0),
        vec3(-1.0,-1.0, 1.0),
        vec3(-1.0, 1.0, 1.0),
        vec3(-1.0,-1.0,-1.0),
        vec3(-1.0,-1.0, 1.0), 
        vec3(-1.0, 1.0,-1.0),
        // Positive Y
        vec3(-1.0, 1.0, 1.0),
        vec3( 1.0, 1.0, 1.0),
        vec3( 1.0, 1.0,-1.0), 
        vec3(-1.0, 1.0,-1.0),
        vec3(-1.0, 1.0, 1.0),
        vec3( 1.0, 1.0,-1.0),      
        // Negative Y
        vec3(-1.0,-1.0, 1.0),
        vec3( 1.0,-1.0,-1.0),
        vec3( 1.0,-1.0, 1.0),
        vec3(-1.0,-1.0,-1.0),
        vec3( 1.0,-1.0,-1.0), 
        vec3(-1.0,-1.0, 1.0),  
         // Positive Z
        vec3(-1.0, 1.0, 1.0),
        vec3( 1.0,-1.0, 1.0),
        vec3( 1.0, 1.0, 1.0),
        vec3(-1.0,-1.0, 1.0),
        vec3( 1.0,-1.0, 1.0), 
        vec3(-1.0, 1.0, 1.0),
        // Negative Z
        vec3(-1.0, 1.0,-1.0),
        vec3( 1.0, 1.0,-1.0),
        vec3( 1.0,-1.0,-1.0), 
        vec3(-1.0,-1.0,-1.0),
        vec3(-1.0, 1.0,-1.0),
        vec3( 1.0,-1.0,-1.0)
        ];
  this.vBuffer = createBuffer(this.vertices);
  this.draw = function(ctm, pos, target){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
    gl.uniformMatrix4fv(target, false, flatten(ctm));
    gl.drawArrays( gl.TRIANGLES, 0, this.vertices.length );
  }
}
  
       
Skybox.loadTextureCube = function(urls, index) { // Found most of this online without a license or details. It's shorter than what I had written.
  var ct = 0;
  var img = new Array(6);
  var textr = gl.createTexture();
  for (var i = 0; i < 6; i++) {
    img[i] = new Image();
    img[i].onload = function() {
      ct++;
      if (ct == 6) {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, textr);
        var targets = [
           gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
           gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
           gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z 
        ];
        console.log("cuban?");
        for (var j = 0; j < 6; j++) {
          gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img[j]);
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      }
    }
    img[i].src = urls[i];
  }
  var loc = gl.getUniformLocation(simpleProgram, "skybox");
  gl.uniform1i(loc, index);
  return textr;
}
/*
function createBuffer(verts) {
  buffer = gl.createBuffer()
  gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(verts), gl.STATIC_DRAW);
  return buffer;
}
*/