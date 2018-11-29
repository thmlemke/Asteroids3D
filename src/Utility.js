



function createBuffer (data){
  buffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW );
  return buffer;
}

function configureTexture( image, loc, flip, index ) {
  var texture = gl.createTexture();
  gl.bindTexture( gl.TEXTURE_2D, texture );
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip );
  gl.generateMipmap( gl.TEXTURE_2D );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, anisotropyMax);
  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );

  var textureLocation = gl.getUniformLocation(program, loc );
  gl.uniform1i(textureLocation, index);
  return texture;         
}

function configureAnisotropy() {
  anisotropyExtension = gl.getExtension("EXT_texture_filter_anisotropic");
  anisotropyMax = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
}

function rpyView( eye, roll, pitch, yaw){
  c = rotateZ(roll);
  c = mult( rotateX(pitch), c);
  c = mult( rotateY(yaw), c);
  c = mult( translate(eye), c);
  return c;
}

function keyCheck() {
  if (keyState[87] && length(playerVelocity)<3) 
    playerVelocity = add( playerVelocity, scale(0.01, normalize(facing)));
  if (keyState[83] && length(playerVelocity)<3)
    playerVelocity = subtract( playerVelocity, scale(0.003, normalize(facing)));
  if (keyState[81])
    up = linTrans(rotate(-1, v34(facing)), up); 
  if (keyState[69])
    up = linTrans(rotate(1, v34(facing)), up);
  if (keyState[68] && length(playerVelocity) <3)
    playerVelocity = add( playerVelocity, scale(0.003, normalize(cross(facing, up))));
  if (keyState[65] && length(playerVelocity) <3)
    playerVelocity = subtract( playerVelocity, scale(0.003, normalize(cross(facing, up))));
  if (keyState[17] && length(playerVelocity) <3)
    playerVelocity = subtract( playerVelocity, scale(0.003, normalize(up)));
  if (keyState[16] && length(playerVelocity) <3)
    playerVelocity = add( playerVelocity, scale(0.003, normalize(up)));
  return;
}

function faceView( eye, at, up){
  return lookAt( eye, add(eye, at), up) //take that, you fixed point in space! bearings are where it's at!
}


function linTrans( M, v ){ //Q: is this allowed? A: probably not.
  var result = [];
  for (var i=0; i<M.length; i++){
    var sum = 0;
    for (var j=0; j<v.length; j++){
      sum += M[i][j]*v[j];
    }
    result.push(sum);
  }
  return result.splice(0, v.length);
}
  
function v34( v )
{
  return vec4( v[0],v[1],v[2],0.0 )
}