const angleCircle = document.querySelector(".angle_circle");
const pointer = document.querySelector(".angle_circle_inner");
const angleValue = document.querySelector(".angle_value");
const angleDiv = document.querySelector(".angle");
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
const cssCodeTextarea = document.querySelector(".css_code textarea");
const checkBox = document.querySelector(".toggle_switch input");
const copyCss = document.querySelector(".copy_css");
const cssResult = document.querySelector(".css_result");
const css3Btn = document.querySelector(".css3_btn");
const closeBtn = document.querySelector(".close");
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

cssCodeTextarea.value = `
background: ${firstColorValue.value};
background: ${gradientString};
`;

css3Btn.addEventListener("click", () => {
  cssResult.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  cssResult.style.display = "none";
});

checkBox.addEventListener("change", () => {
  if (this.checked) {
    cssCodeTextarea.value = "dope";
  } else {
    cssCodeTextarea.value = `
background: ${firstColorValue.value};
background: ${gradientString};
    `;
  }
});

copyCss.addEventListener("mouseover", () => {
  copyCss.style.background = gradientString;
});

copyCss.addEventListener("mouseleave", () => {
  copyCss.style.backgroundColor = "grey";
});

copyCss.addEventListener("click", () => {
  cssCodeTextarea.select();
  document.execCommand("copy");
  copyCss.textContent = "Copied!";
  setTimeout(() => {
    copyCss.innerHTML = `<i class="fa fa-clone"></i> Copy CSS`;
  }, 1500);
});

function changeGradient(colorOne, colorTwo, angle) {
  gradientString = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  mainBg.style.background = gradientString;
  cssCodeTextarea.value = `
background: ${firstColorValue.value};
background: ${gradientString};
`;
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

function radialGradient(colorOne, num1, colorTwo, num2) {
  const radialgradientString = `radial-gradient(circle,  ${colorOne}, ${num1}%, ${colorTwo}, ${num2}%)`;
  mainBg.style.background = radialgradientString;
  console.log(radialgradientString);
}

randomBtn.addEventListener("click", randomGradient);

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    randomGradient();
  }
});

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

// radialBtn.addEventListener("click", () => {
//   // angleDiv.style.display = "none";
//   radialGradient(
//     firstColorValue.value,
//     sliderOne.value,
//     secondColorValue.value,
//     sliderTwo.value
//   );
//   radialBtn.style.color = "#fff";
//   radialBtn.style.backgroundColor = "red";
//   linearBtn.style.color = "red";
//   linearBtn.style.backgroundColor = "#fff";
// });

tippy(radialBtn, {
  content: "Coming Soon",
  hideOnClick: false,
});

window.onload = function () {
  slideOne();
  slideTwo();
};

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.textContent = sliderOne.value;
  fillColor();
  radialGradient(
    firstColorValue.value,
    sliderOne.value,
    secondColorValue.value,
    sliderTwo.value
  );
}
function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = sliderTwo.value;
  fillColor();
  radialGradient(
    firstColorValue.value,
    sliderOne.value,
    secondColorValue.value,
    sliderTwo.value
  );
}
function fillColor() {
  percent1 = (sliderOne.value / sliderMaxValue) * 100;
  percent2 = (sliderTwo.value / sliderMaxValue) * 100;
  sliderTrack.style.background = "#fff";
}

sliderOne.addEventListener("input", slideOne);
sliderTwo.addEventListener("input", slideTwo);
