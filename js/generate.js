const palette = document.querySelector(".palette");

//generate random colors and push them into an array
function randomColor() {
  const randomColor = [];
  for (let i = 0; i < 5; i++) {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    randomColor.push(randomHex);
  }
  randomColor.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = "#" + color;
    const colorName = ntc.name(color);
    colorDiv.innerHTML = `<div class="color_info">
    <p class="color_code">#${color}</p>
    <p class="color_name">${colorName[1]}</p>

    </div>`;
    palette.appendChild(colorDiv);
  });
}

randomColor();
//run randomColor function when spacebar is pressed
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    //remove current palette before generating new one
    while (palette.firstChild) {
      palette.removeChild(palette.firstChild);
    }
    randomColor();
  }
});
