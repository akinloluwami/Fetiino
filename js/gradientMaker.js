const angleCircle = document.querySelector(".angle_circle");
const pointer = document.querySelector(".angle_circle_inner");
const angleValue = document.querySelector(".angle_value");
const mainBg = document.querySelector(".main");
const firstColor = document.querySelector(".first_color");
const secondColor = document.querySelector(".second_color");
let firstColorValue = document.querySelector(".first_color input");
let secondColorValue = document.querySelector(".second_color input");
const firstColorBox = document.querySelector(".first_color .box");
const secondColorBox = document.querySelector(".second_color .box");
const randomBtn = document.querySelector(".random_btn");
const linearBtn = document.querySelector(".linear_btn");
const radialBtn = document.querySelector(".radial_btn");

firstColorValue.value = randomColor({});
secondColorValue.value = randomColor({});
firstColorBox.style.backgroundColor = firstColorValue.value;
secondColorBox.style.backgroundColor = secondColorValue.value;

linearBtn.style.color = "#fff";
linearBtn.style.backgroundColor = "red";
radialBtn.style.color = "red";
radialBtn.style.backgroundColor = "#fff";

(pointerBox = pointer.getBoundingClientRect()),
  (centerPoint = window.getComputedStyle(pointer).transformOrigin),
  (centers = centerPoint.split(" "));

function rotatePointer(e) {
  const pointerEvent = e;
  if (e.targetTouches && e.targetTouches[0]) {
    e.preventDefault();
    pointerEvent = e.targetTouches[0];
    mouseX = pointerEvent.pageX;
    mouseY = pointerEvent.pageY;
  } else {
    (mouseX = e.clientX), (mouseY = e.clientY);
  }

  const centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
    centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
    radians = Math.atan2(mouseX - centerX, mouseY - centerY),
    degrees = radians * (180 / Math.PI) * -1 + 180;
  pointer.style.transform = "rotate(" + degrees + "deg)";
  angleValue.value = `${Math.round(degrees)}`;
}

angleCircle.addEventListener("mousemove", rotatePointer);
angleCircle.addEventListener("touchmove", rotatePointer);
angleCircle.addEventListener("touchstart", rotatePointer);

const angle = angleValue.value;
let gradientString = `linear-gradient(${45}deg, ${firstColorValue.value}, ${
  secondColorValue.value
})`;
mainBg.style.backgroundImage = gradientString;
pointer.style.transform = `rotate(${angle}deg)`;

function changeGradient(colorOne, colorTwo, angle) {
  gradientString = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  mainBg.style.backgroundImage = gradientString;
  console.log(gradientString);
}

firstColorValue.addEventListener("input", (e) => {
  changeGradient(e.target.value, secondColorValue.value, angleValue.value);
  firstColorBox.style.backgroundColor = e.target.value;
});
secondColorValue.addEventListener("input", (e) => {
  changeGradient(firstColorValue.value, e.target.value, angleValue.value);
  secondColorBox.style.backgroundColor = e.target.value;
});
angleCircle.addEventListener("mousemove", () => {
  changeGradient(
    firstColorValue.value,
    secondColorValue.value,
    angleValue.value
  );
});
function randomGradient() {
  firstColorValue.value = randomColor({});
  secondColorValue.value = randomColor({});
  firstColorBox.style.backgroundColor = firstColorValue.value;
  secondColorBox.style.backgroundColor = secondColorValue.value;
  const randomAngle = Math.round(Math.random() * 360);
  linearBtn.style.color = "#fff";
  linearBtn.style.backgroundColor = "red";
  radialBtn.style.color = "red";
  radialBtn.style.backgroundColor = "#fff";
  angleCircle.style.pointerEvents = "auto";

  changeGradient(firstColorValue.value, secondColorValue.value, randomAngle);

  angleValue.value = randomAngle;
}

function radialGradient(colorOne, colorTwo) {
  gradientString = `radial-gradient(circle, ${colorOne}, ${colorTwo})`;
  mainBg.style.backgroundImage = gradientString;
  console.log(gradientString);
}

randomBtn.addEventListener("click", randomGradient);

function linearGradient() {
  changeGradient(
    firstColorValue.value,
    secondColorValue.value,
    angleValue.value
  );
}

linearBtn.addEventListener("click", () => {
  linearGradient();
  angleCircle.addEventListener("mousemove", rotatePointer);
  linearBtn.style.color = "#fff";
  linearBtn.style.backgroundColor = "red";
  radialBtn.style.color = "red";
  radialBtn.style.backgroundColor = "#fff";
  angleCircle.style.pointerEvents = "auto";
});

radialBtn.addEventListener("click", () => {
  angleCircle.style.pointerEvents = "none";
  radialGradient(firstColorValue.value, secondColorValue.value);
  radialBtn.style.color = "#fff";
  radialBtn.style.backgroundColor = "red";
  linearBtn.style.color = "red";
  linearBtn.style.backgroundColor = "#fff";
});
