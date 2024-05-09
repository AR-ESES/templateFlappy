let bird;
let obstacles = [];
let pipesCleared;
let obstaclesHit;
let playQuality;

let quantDeObstaculosTipo1 = 30;
let nivelDeDificuldade = 1;

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

  if (frameCount % quantDeObstaculosTipo1 == 0) {
    obstacles.push(new Obstacle());
  }

  if (frameCount % 400 == 0) {
    nivelDeDificuldade++;
    quantDeObstaculosTipo1 = quantDeObstaculosTipo1 / nivelDeDificuldade;
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
