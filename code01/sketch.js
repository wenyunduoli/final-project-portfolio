// please run this code with live server
// please click on the canvas to make the background video run

// this code sets up a canvas, plays a video as a background, 
// and animates various shapes on top of the video. 
// The shapes include straight lines, circular lines, and pulsating patterns, creating a visually dynamic and interactive display.

let video;
let canvas;
// an array to store the animated shapes 
let objs = []; 
// an array of different colours will be used 
let colors = ['#000000', '#808080', '#FFFFFF', '#f50c00'];
// number or ellipses
let numEllipses = 20;

function setup() {
  canvas = createCanvas(1080, 1080);
//   create 400 shapes and add them to the objs array
  for (let i = 0; i < 400; i++) {
		addObj();
	}
// Attach the canvas to the container		
  canvas.parent('canvas-container'); 

// add a video 
  video = createVideo("videobackground01.mp4");
  video.loop(); // Start the video loop
  video.hide(); // Hide the video element
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

// update and show animated shaped in the objs
  for (let i of objs) {
		i.run();
	}


// remove objects marked as 'toStop' from the 'objs' array and replace them
	for (let i = 0; i < objs.length; i++) {
		if (objs[i].toStop) {
			objs.splice(i, 1);
			addObj();
		}
	}

// draw a random number of ellipses with random properties on the canvas
  for (let j = 0; j < numEllipses; j++) {
    // generate random ellipse parameters
    let x = random(width);      
    let y = random(height);    
    let diameterX = random(200, 800);  
    let diameterY = random(200, 800);  

  
  noStroke();
  fill(255, 0, 0, 20);
  ellipse(x, y, diameterX, diameterY);
}
}

// to make sure the video runs smoothly in different browsers
// I had to make this mouseClick function. 
// browsers tend to have autoplay issue regularly
function mouseClicked() {
// play the video when the canvas is clicked
  if (video) {
    video.play();
  }
}

// add a new object (StraightLine, CircleLine, or Palse) to the objs array
function addObj() {
	let rnd = int(random(3));
	if (rnd == 0) objs.push(new StraightLine());
	else if (rnd == 1) objs.push(new CircleLine());
	else if (rnd == 2) objs.push(new Palse());
}

// make a class for straight line
class StraightLine {
	constructor() {
		this.x1 = random(width);
		this.y1 = random(height);
		this.rad = random(0.2, 0.75) * width;
		let a = (TWO_PI / 4) * int(random(4));
		this.x2 = this.x1 + this.rad * cos(a);
		this.y2 = this.y1 + this.rad * sin(a);
		this.dst = dist(this.x1, this.y1, this.x2, this.y2);
		this.duration = int(random(30, 60));
		this.n1 = -int(random(10));
		this.n2 = this.n1 - int(random(this.duration));
		this.cx1 = this.x1;
		this.cy1 = this.y1;
		this.cx2 = this.x1;
		this.cy2 = this.y1;
		this.toStop = false;
		this.col = random(colors);
		this.sw = random(1, 7);
		this.amt1 = 0;
		this.amt2 = 0;
	}

// Draw the straight line
	show() {
		stroke(this.col);
		strokeWeight(this.sw);
		if (dist(this.cx1, this.cy1, this.cx2, this.cy2) > 1) {
			line(this.cx1, this.cy1, this.cx2, this.cy2);
		}
	}
// update the position of the line
	move() {
		if (0 < this.n1 && this.n1 < this.duration) {
			this.amt1 = map(this.n1, 0, this.duration - 1, 0, 1);
			this.cx1 = lerp(this.x1, this.x2, this.amt1 ** 0.9);
			this.cy1 = lerp(this.y1, this.y2, this.amt1 ** 0.9);
		}

		if (0 < this.n2 && this.n2 < this.duration) {
			this.amt2 = map(this.n2, 0, this.duration - 1, 0, 1);
			this.cx2 = lerp(this.x1, this.x2, this.amt2 ** 1.1);
			this.cy2 = lerp(this.y1, this.y2, this.amt2 ** 1.1);
		}

		this.n1++;
		this.n2++;

		if (this.n2 > this.duration) {
			this.toStop = true;
		}
	}
// call method to show and update the line
	run() {
		this.show();
		this.move();
	}
}

// make a class for circleline
class CircleLine extends StraightLine {
	constructor() {
	 // Call the parent constructor
		super();
		this.ang = random(10);
		this.pm = random() < 0.5 ? -1 : 1;
		this.diameter = random(0.05, 0.3) * width;
	}
// draw the arcs
	show() {
		push();
		translate(this.x2, this.y2);
		scale(1, this.pm);
		rotate(this.ang);
		noFill();
		stroke(this.col);
		strokeWeight(this.sw);
		arc(0, 0, this.diameter, this.diameter, TWO_PI * this.amt2, TWO_PI * this.amt1);
		pop();
	}
}
// make a class for pulsating shape
class Palse extends CircleLine {
	constructor() {
		super();
		this.diameter *= 0.25

	}

	show() {
		push();
		translate(this.x2, this.y2);
		noStroke();
		fill(this.col);
		beginShape();
		for (let a = 0; a < TWO_PI; a += TWO_PI / 90) {
			vertex(this.diameter * this.amt1 * cos(a), this.diameter * this.amt1 * sin(a));
		}
		beginContour()
		for (let a = TWO_PI; a > 0; a -= TWO_PI / 90) {
			vertex(this.diameter * this.amt2 * cos(a), this.diameter * this.amt2 * sin(a));
		}
		endContour();
		endShape();
		pop();
	}
}
