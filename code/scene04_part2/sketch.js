// This code is to create an interactive canvas with a grid of circles that 
// change in size and color based on user input through sliders.

// set the size of the grid cells
let s = 20;

let t = 1;
let bgColor = 0;  
let circleColor = 255;  

function setup() {
  createCanvas(600, 600);
  noStroke();

  // create sliders for background and circle color
  createSlider(0, 255, bgColor).input(updateBackground);
  createSlider(0, 255, circleColor).input(updateCircleColor);
}

function draw() {
  background(bgColor);

  for (let x = -s; x < width + s; x += s) {
    for (let y = 0; y < height + s; y += s) {
      let n = sin(t + 30 * x) * s;
      let o = sin(t + 30 * y) * s;

      // calculate the distance to the center of the canvas
      let m = dist(x + n, y + o, width / 2, height / 2);

      // map the distance to a smaller range
      m = map(m, 0, width / 2, 0, s / 2);

      fill(circleColor);

      circle(x + n, y + o, 5 * m);
    }
  }

  t += 0.04;
}

// update background colour based on slider input
function updateBackground() {
  bgColor = this.value();
}

// update circle colour based on slider input
function updateCircleColor() {
  circleColor = this.value();
}

