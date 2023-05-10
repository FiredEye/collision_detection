const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 1.5;
const key = [];
class Player {
  constructor() {
    this.movement = {
      x: 0,
      y: 1,
    };
    this.position = {
      x: 140,
      y: 500,
    };
    this.width = 40;
    this.height = 40;
  }
  #draw() {
    c.fillStyle = "purple";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.#draw();
    this.position.x += this.movement.x;
    this.position.y += this.movement.y;
    if (this.position.y + this.height + this.movement.y <= canvas.height) {
      this.movement.y += gravity;
      return;
    }
    this.movement.y = 0;
  }
}

class Platform {
  constructor(x, y, color) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = 20;
    this.color = color;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};
const platforms = [
  new Platform(300, 400, "black"),
  new Platform(650, 500, "blue"),
  new Platform(950, 300, "green"),
];

const player = new Player();

function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();
  if (keys.left.pressed && player.position.x >= 10) {
    player.movement.x = -5;
  } else if (
    keys.right.pressed &&
    player.position.x + player.width <= canvas.width - 10
  ) {
    player.movement.x = 5;
  } else {
    player.movement.x = 0;
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.movement.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.movement.y = 0;
    }
  });
}

animation();

window.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "ArrowRight":
      keys.right.pressed = true;
      break;
    case "ArrowLeft":
      keys.left.pressed = true;
      break;
    case "ArrowUp":
      player.movement.y = -20;

      break;
  }
});

window.addEventListener("keyup", ({ code }) => {
  switch (code) {
    case "ArrowRight":
      keys.right.pressed = false;
      break;
    case "ArrowLeft":
      keys.left.pressed = false;
      break;
    case "ArrowUp":
      player.movement.y -= 10;
      break;
  }
});
