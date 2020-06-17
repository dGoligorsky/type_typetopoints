let font;
let points;

function preload() {
  font = loadFont("assets/inconsolata-bold.ttf");
}

function setup() {
  createCanvas(1200, 600);

  points = font.textToPoints("david goligorsky", 130, 330, 100, {
    sampleFactor: 0.1,
    simplifyThreshold: 0.0,
  });
}

function draw() {
  const nl = 0.01; // noise level

  background("saddlebrown");

  fill("ivory");
  noStroke();

  points.forEach((point) => {
    const distance = createVector(point.x - mouseX, point.y - mouseY);
    const distortion = distance.mult(60 / distance.mag());

    circle(point.x + distortion.x, point.y + distortion.y, 5);
  });

  noFill();
  stroke("pink");
  beginShape();
  points.forEach((point) => {
    const distance = createVector(point.x - mouseX, point.y - mouseY);
    const distortion = distance.mult(60 / distance.mag());

    // adding noise to the line
    const nx = 40 * noise(nl * point.x, nl * point.y, nl * frameCount) - 20;
    const ny = 40 * noise(nl * point.x, nl * point.y, nl * frameCount) - 20;

    vertex(point.x + distortion.x + nx, point.y + distortion.y + ny);
  });
  endShape(CLOSE);
}
