const colorBars = document.querySelector(".color_bars");
const heroText = document.querySelector(".main_text .colored");
const learnMore = document.querySelector(".learn_more");
const heroSmallText = document.querySelector(".hero_text_content p");
const savedIcon = document.querySelector(".fa-heart");
function generateColorBars() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(randomColor());
  }

  colors.forEach((color) => {
    const bar = `<div class="color_bar" style="background-color: ${color}"></div>`;
    colorBars.innerHTML += bar;
    console.log(color);
  });
}
generateColorBars();
const heroSmallTextLink = document.querySelector(".hero_text_content p a");

const getStartedButton = document.querySelector(".buttons button");
const colorPicker = new iro.ColorPicker(".wheel", {
  width: 450,
  color: "#f00",
  slider: false,
});
const colorPickerMobile = new iro.ColorPicker(".wheel_mobile", {
  width: 300,
  color: "#f00",
  slider: false,
});

colorPicker.on("color:change", function (color) {
  const currentColor = color.hexString;
  heroText.style.color = currentColor;
  heroSmallText.style.borderColor = currentColor;
  heroSmallTextLink.style.color = currentColor;
  getStartedButton.style.backgroundColor = currentColor;
  savedIcon.style.color = currentColor;
  const colorBars = document.querySelectorAll(".color_bars .color_bar");
  colorBars.forEach((colorBar) => {
    colorBar.remove();
  });
  generateColorBars();
});
colorPickerMobile.on("color:change", function (color) {
  const currentColor = color.hexString;
  heroText.style.color = currentColor;
  heroSmallText.style.borderColor = currentColor;
  heroSmallTextLink.style.color = currentColor;
  getStartedButton.style.backgroundColor = currentColor;
  savedIcon.style.color = currentColor;
  const colorBars = document.querySelectorAll(".color_bars .color_bar");
  colorBars.forEach((colorBar) => {
    colorBar.remove();
  });
  generateColorBars();
});

let typewriter = new Typewriter(heroText, {
  loop: true,
});

typewriter
  .typeString("Colors")
  .pauseFor(2500)
  .deleteAll()
  .typeString("Palettes")
  .pauseFor(2500)
  .deleteAll()
  .typeString("Gradients")
  .pauseFor(2500)
  .start();
