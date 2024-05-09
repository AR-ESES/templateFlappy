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
