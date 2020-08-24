let contador = [23348081, 14160988, 3783243];

let index = 0;

let rectWidth;

let song;

let osc, fft;


// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,8);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(255,255,255,0.15)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

// an array to add multiple particles
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
  
  createP('https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6');
  song = loadSound('covid.mp3');
  frameRate(12);
  
  noStroke();
  rectWidth = width / 4;
  
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  fft = new p5.FFT();
  osc.start();
  
  
}

function draw() {
  
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }



  // change oscillator frequency based on mouseX
  let freq = map(mouseX, 0, width, 40, 120);
  osc.freq(freq);

  let amp = map(mouseY, 0, height, 1, 0.09);
  osc.amp(amp);
    
  
    noStroke();
    fill(255,0,0);
    textSize(30);
    textAlign(CENTER);   
    text(contador[index] + frameCount, width / 2, height / 2);
  
    textSize(10);
    textAlign(CENTER);
    text('Estadísticas del COVID-19', width / 2, height / 1.90);
  
    textSize(10);
    textAlign(CENTER);
    text('por el Centro de Ciencia e Ingeniería de Sistemas (CSSE)', width / 2, height / 1.84);
} 



  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    
}

function mousePressed() {
  index = index + 1;
  
  if (index == 3) {
    index = 0;
  } 
} 

function keyPressed() {
  let keyIndex = -1;
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  if (keyIndex === -1) {
    // If it's not a letter key, clear the screen
    
    
  } else {
    // It's a letter key, fill a rectangle
    randFill_r = Math.floor(Math.random() * 300 + 1);
    randFill_g = Math.floor(Math.random() * 255 + 1);
    randFill_b = Math.floor(Math.random() * 255 + 1);
    fill(randFill_r, randFill_g, randFill_b);
    let x = map(keyIndex, 0, 25, 0, width - rectWidth);
    rect(x, 0, rectWidth, height);
  }
  
  
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    
  } else {
    song.play();
    
  }
  
}