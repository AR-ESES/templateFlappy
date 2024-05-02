function Bird() {
  this.y = height / 2;
  this.x = width / 2;
  this.gravity = 0.96;
  this.lift = -16;
  this.velocity = 0;
  this.diam = 80;
  this.img = loadImage("space.png");
  this.img4 = loadImage("flame.png");

  this.show = function () {
    stroke(0);
    strokeWeight(2);
    fill(255);
    image(this.img, this.x, this.y, this.diam, this.diam * 0.7368421053);
  };

  this.goUp = function () {
    this.velocity += this.lift;
    console.log(this.velocity);
    image(
      this.img4,
      this.x - this.diam / 1.6,
      this.y,
      this.diam,
      this.diam - this.diam / 3
    );
  };

  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

function Obstacle() {
  this.x = width;
  this.y = random(height);
  this.w = random(30, 80);
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 10;
  this.img2 = loadImage("asteroid.png");
  this.img3 = loadImage("deadasteroid.png");

  this.show = function () {
    fill(0);
    if (this.highlight) {
      image(this.img3, this.x, this.y, this.w, this.w);
    }
    image(this.img2, this.x, this.y, this.w, this.w);
  };
  this.update = function () {
    this.x -= this.speed;
  };
  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (bird) {
    if (bird.y > this.y - this.w / 2 && bird.y < this.y + this.w / 2) {
      if (bird.x > this.x - this.w / 2 && bird.x < this.x + this.w / 2) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}

var bird;
var obstacles = [];
var pipesCleared;
var obstaclesHit;
var playQuality;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  //canvas.parent("jumbo-canvas");
  bird = new Bird();
  pipesCleared = 0;
  obstaclesHit = 0;
  playQuality = 10;
  obstacles.push(new Obstacle());
}

function draw() {
  clear();
  background(0, 20, 50);
  fill(0, 0, 255);
  textSize(20);
  textFont("Helvetica");
  text("Obstáculos Ultrapassados: " + pipesCleared, 20, 20);
  text("Obstacle Damage: " + obstaclesHit, 20, 40);
  text(
    "Play Quality: " +
      String(1 + pipesCleared / obstaclesHit || 4).substring(0, 4) +
      "/5",
    20,
    60
  );
  bird.show();
  bird.update();

  if (frameCount % 10 == 0) {
    obstacles.push(new Obstacle());
  }

  for (var i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    if (obstacles[i].hits(bird)) {
      obstaclesHit++;
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      pipesCleared++;
    }
  }
}

function keyPressed() {
  if (key === " ") {
    bird.goUp();
  }
}
