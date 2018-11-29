function loadMeshData(data) {
  console.log(data)
  var lines = data.split("\n");
  var v = [];
  var vt = [];
  var vn = [];

  var uv = [];
  var normals = [];
  var vertices = [];
  
  var maxMinValues = [-Infinity, -Infinity, -Infinity, Infinity, Infinity, Infinity];
  var len = 0;
  var faceConst;

  var surfaceType = "";
  
  for ( var i = 0 ; i < lines.length ; i++ ) {
    var parts = lines[i].trimRight().split(' ');
    len = parts.length;
    if ( len > 0 ) {
      switch(parts[0]) {
        case 'v':  
          for (var j=0; j<3; j++){
            if(parseFloat(parts[j+1])>maxMinValues[j])
              maxMinValues[j] = parseFloat(parts[j+1]);
            else if (parseFloat(parts[j+1])<maxMinValues[j+3])
              maxMinValues[j+3] = parseFloat(parts[j+1]);
          }
          v.push(
            vec4(
              parseFloat(parts[1]),
              parseFloat(parts[2]),
              parseFloat(parts[3]),
              1
          ));
          break;
        case 'vt':
          vt.push(
            vec2(
              parseFloat(parts[1]),
              parseFloat(parts[2])
          ));
          break;
        case 'vn':
          vn.push(
            vec4(
              parseFloat(parts[1]),
              parseFloat(parts[2]),
              parseFloat(parts[3]),
              0
          ));
          break;
        case 'f': 
          faceConst = parts.length;
          var f1 = parts[1].split('/');
          var f2 = parts[2].split('/');
          var f3 = parts[3].split('/');
          if (faceConst == 5) {
            var f4 = parts[4].split('/');
            surfaceType = 'TRIANGLE_FAN';
          }
          else { surfaceType = 'TRIANGLES';}
          
          // CW

          Array.prototype.push.apply(
            vertices, v[parseInt(f1[0]) - 1]
          );
          Array.prototype.push.apply(
            uv, vt[parseInt(f1[1]) - 1]
          );
          Array.prototype.push.apply(
            normals, vn[parseInt(f1[2]) -1]
          );
          Array.prototype.push.apply(
            vertices, v[parseInt(f3[0]) - 1]
          );
          Array.prototype.push.apply(
            uv, vt[parseInt(f3[1]) - 1]
          );
          Array.prototype.push.apply(
            normals, vn[parseInt(f3[2]) -1]
          );
          Array.prototype.push.apply(
            vertices, v[parseInt(f2[0]) - 1]
          );
          Array.prototype.push.apply(
            uv, vt[parseInt(f2[1]) - 1]
          );
          Array.prototype.push.apply(
            normals, vn[parseInt(f2[2]) -1]
          );
          if (faceConst == 5) {
            Array.prototype.push.apply(
              vertices, v[parseInt(f1[0]) - 1]
            );
            Array.prototype.push.apply(
              uv, vt[parseInt(f1[1]) - 1]
            );
            Array.prototype.push.apply(
              normals, vn[parseInt(f1[2]) -1]
            );
            Array.prototype.push.apply(
              vertices, v[parseInt(f4[0]) - 1]
            );
            Array.prototype.push.apply(
              uv, vt[parseInt(f4[1]) - 1]
            );
            Array.prototype.push.apply(
              normals, vn[parseInt(f4[2]) -1]
            );
            Array.prototype.push.apply(
              vertices, v[parseInt(f3[0]) - 1]
            );
            Array.prototype.push.apply(
              uv, vt[parseInt(f3[1]) - 1]
            );
            Array.prototype.push.apply(
              normals, vn[parseInt(f3[2]) -1]
            );
          }
        break;
      default:
        console.log("Skipping a line");
      }
    }
  }
  vertices = center(vertices, maxMinValues);
  console.log("vertices after parsing:");
  console.log(vertices);
  console.log("normals after parsing:");
  console.log(normals);
  var vertexCount = vertices.length / 4;
  console.log("Loaded mesh with " + vertexCount + " vertices, " + normals.length/4 + " normals and " + uv.length/2 + " uv-coords");
  return {
    vertices: new Float32Array(vertices),
    vertexCount: vertexCount,
    uv: new Float32Array(uv),
    normals: new Float32Array(normals)
  };
}

function center(vertices, maxMinValues)
{
  var len = vertices.length;
  var maxDim = Math.max(maxMinValues[0]-maxMinValues[3], maxMinValues[1]-maxMinValues[4], maxMinValues[2]-maxMinValues[5]);
  var xOffset = (maxMinValues[0]+maxMinValues[3])/2;
  var yOffset = (maxMinValues[1]+maxMinValues[4])/2;
  var zOffset = (maxMinValues[2]+maxMinValues[5])/2;
  console.log(xOffset + " " + yOffset + " " + zOffset);
  var ret = [];
  for (var i=0; i<len; i=i+4)
  {
    ret.push((vertices[i]-xOffset)/maxDim);
    ret.push((vertices[i+1]-yOffset)/maxDim);
    ret.push((vertices[i+2]-zOffset)/maxDim);
    ret.push(1);
  }
  return ret;
}

function triang(v)
{
  var ret = [];
  for (i=0; i<v.length; i=i+4){
    ret.push(v[i]);
    ret.push(v[i+2]);
    ret.push(v[i+1]);
    ret.push(v[i]);
    ret.push(v[i+3]);
    ret.push(v[i+2]);
  }
  return ret;
}

let loadMesh = function(parser, filename) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', filename, false);
  var data;
  xhr.onload = function (e) {
    data = xhr.responseText;
  }
  xhr.send(null);
  return parser(data);
};

function importObj(filename) {
  var data = loadMesh(loadMeshData, filename);
  return data;
};
