function Bird() {
  this.y = height / 2;
  this.x = width / 2;
  this.gravity = 0.96;
  this.lift = -30;
  this.velocity = 0;
  this.diam = 80;
  this.img = loadImage("space.png");
  this.limiteInf = 300;

  this.show = function () {
    stroke(0);
    strokeWeight(2);
    fill(255);
    image(this.img, this.x, this.y, this.diam, this.diam * 0.7368421053);
  };

  this.goUp = function () {
    this.velocity += this.lift;
    console.log(this.velocity);
  };

  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y >= height - this.limiteInf) {
      this.y = height - this.limiteInf;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}
