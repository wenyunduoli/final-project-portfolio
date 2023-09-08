// this code creates a visually intriguing pattern of circles that change in size and color over time, 
// resulting in an animated and dynamic composition.

let s = 20;
let t = 1;

function setup() {
  createCanvas(600, 600);
  noStroke();
  // adjust the level of detail for the Perlin noise
  noiseDetail(2); 
}

function draw() {
  background(0);

 
  for (let x = -s; x < width + s; x += s) {
    for (let y = 0; y < height + s; y += s) {
      let n = sin(t + 30 * x) * s;
      let o = sin(t + 30 * y) * s;
      let m = dist(x + n, y + o, width / 2, height / 2);

      // use Perlin noise to generate dynamic radii
      let radiusNoise = noise(x * 0.01, y * 0.01, t * 0.1);
      let circleRadius = map(radiusNoise, 0, 1, 0, s / 2);

      // set the red colour 
      let redValue = map(circleRadius, 0, s / 2, 0, 255);

      stroke(redValue, 0, 0);
      fill(redValue, 0, 0);

      circle(x + n, y + o, 2 * circleRadius);
    }
  }

  t += 0.04;
}
