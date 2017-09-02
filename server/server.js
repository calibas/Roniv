const noise = require('./perlin.js');
noise.seed(Math.random());

var noiseMap = [];

for (var x = 0; x < 16; x++) {
  if (typeof noiseMap[x] === 'undefined') {
	noiseMap.push([]);
  }
  for (var y = 0; y < 16; y++) {
    var value = Math.abs(noise.perlin2(x / 16, y / 16));
    value = Math.floor(value * 256);
    //console.log(value);
    if (value < 10) {
    	value = 0;
    } else if (value >= 10 && value < 50) {
    	value = 1;
    } else if (value >=50 && value < 100) {
    	value = 2;
    } else {
    	value = 3;
    }
    noiseMap[x][y] = value;
    //var cell = (x + y * 10) * 4;
    //data[cell] = data[cell + 1] = data[cell + 2] = value;
    //data[cell] += Math.max(0, (25 - value) * 8);
    //data[cell + 3] = 255; // alpha.
  }
}

console.log(noiseMap);

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(typeof noise.perlin2(50,50) + " " + noise.perlin2(50,50));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
