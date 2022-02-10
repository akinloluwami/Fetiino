const palette = document.querySelector(".palette");

function generate() {
  const colorArr = [];
  //generate 5 random colors
  for (let i = 0; i < 5; i++) {
    colorArr.push(randomColor());
  }

  console.log(colorArr);
  colorArr.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;
    const colorName = ntc.name(color);
    colorDiv.innerHTML = `<div class="color_info">
    <p class="color_code">${color}</p>
    <p class="color_name">${colorName[1]}</p>

    </div>`;
    palette.appendChild(colorDiv);
  });
}

generate();
//run randomColor function when spacebar is pressed
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    //remove current palette before generating new one
    while (palette.firstChild) {
      palette.removeChild(palette.firstChild);
    }
    generate();
  }
});
