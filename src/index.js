import "./styles.css";
import frames from "./sprite-frames.json";

const sprite = document.getElementById("sprite1");
const fps = 15;
let tick = 0;
let step = 0;
let frameIndex = 0;
let isButtonPressed = false;
let direction = "right"; // right | left

document.body.addEventListener("keydown", function (event) {
  console.log("WHAT KEY? ", event.key);
  if (event.key === "ArrowRight") {
    isButtonPressed = true;
    direction = "right";
  } else if (event.key === "ArrowLeft") {
    isButtonPressed = true;
    direction = "left";
  }
});

document.body.addEventListener("keyup", function (event) {
  isButtonPressed = false;

  // Display standing sprite frame when iot running
  frameIndex = 0;
  setFrame("running", frameIndex);
});

function setFrame(category, index) {
  const frame = frames[category][index];

  sprite.style["width"] = frame.width;
  sprite.style["height"] = frame.height;
  sprite.style["background-position-x"] = frame.left;
  sprite.style["background-position-y"] = frame.top;

  if (direction === "right") {
    sprite.style["transform"] = "scaleX(1)";
  } else if (direction === "left") {
    sprite.style["transform"] = "scaleX(-1)";
  }
}

function setSpritePosition(x) {
  sprite.style.left = `${x}px`;
}

function runningAnimation() {
  // Set correct Frame Image
  setFrame("running", frameIndex);

  // Move the sprite
  setSpritePosition(step * 5);
  frameIndex++;

  if (direction === "right") {
    step++;
  } else if (direction === "left") {
    step--;
  }

  // Loop sprite running animation
  if (frameIndex >= frames.running.length) {
    frameIndex = 2;
  }

  // Start from the beginning of screen when sprite goes off of it
  if (parseInt(sprite.style.left) >= window.innerWidth) {
    step = 0;
  }
}

function jumpingAnimation() {
  // Set correct Frame Image
  setFrame("jumping", frameIndex);

  frameIndex++;

  if (frameIndex >= frames.jumping.length) {
    frameIndex = 0;
  }
}

function MAIN_LOOP() {
  if (isButtonPressed) {
    runningAnimation();
  }

  tick++;
}

setInterval(MAIN_LOOP, 1000 / fps);
//runningAnimation();
