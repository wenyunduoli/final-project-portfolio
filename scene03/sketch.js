// this code sets up a canvas and continuously draws semi-transparent squares with a soft light blend mode, 
// creating an evolving visual pattern. 
// It also allows for experimentation with filter effects if you choose to uncomment and use them.

let t = 0;
let f = 0;

function setup() {
  createCanvas(800, 800);
  noStroke();
  colorMode(GRAY, 255); // Set color mode to grayscale
}

function draw() {
// If f is 0, set it to 1
  if (f === 0) {
    f = 1;
  }
// Increment the variable t by 1 on each frame
  t += 1;
  
  fill(random(0, 255, 100));
  blendMode(SOFT_LIGHT);
  square(random() * 800 - 75, random() * 800 - 75, 150);
  
  // Apply filter effect
  // filter(INVERT); // You can choose different filters here
}
