const palette = document.querySelector(".palette");
const cssHexValues = [];
const cssColorNames = [];
const savePaletteBtn = document.querySelector(".fa-heart");
const saveCSSButton = document.querySelector(".fa-css3-alt");
const saveAsImageButton = document.querySelector(".fa-image");
const generateButton = document.querySelector(".generate_btn");

tippy(savePaletteBtn, {
  content: "Save Palette",
  animation: "fade",
});
tippy(saveCSSButton, {
  content: "Download CSS",
  animation: "fade",
});
tippy(saveAsImageButton, {
  content: "Download Image",
  animation: "fade",
});

let newArr = [];
function generate() {
  const colorArr = [];
  newArr = colorArr;
  for (let i = 0; i < 5; i++) {
    colorArr.push(randomColor());
  }
  colorArr.forEach((color) => {
    const colorDiv = document.createElement("div");

    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;
    const colorName = ntc.name(color);
    colorDiv.innerHTML = `
    <input class="color_code" value=${color} readonly>
    <p class="color_name">${colorName[1]}</p>
    <i class="fa fa-clone"></i>`;
    cssHexValues.push(color);
    cssColorNames.push(colorName[1]);
    palette.appendChild(colorDiv);
  });
  const copyButton = document.querySelectorAll(".fa-clone");

  tippy(copyButton, {
    content: "Copy",
    animation: "fade",
    followCursor: true,
    hideOnClick: true,
  });

  copyButton.forEach((button) => {
    button.addEventListener("click", () => {
      const colorCodeValue = button.parentElement.children[0];
      colorCodeValue.select();
      colorCodeValue.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(colorCodeValue.value);
    });
  });
}

generate();

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    setInterval(() => {
      document.querySelector(".options p").classList.add("fade");
    }, 1000);

    while (palette.firstChild) {
      palette.removeChild(palette.firstChild);
    }
    generate();
  }
});
generateButton.addEventListener("click", (e) => {
  while (palette.firstChild) {
    palette.removeChild(palette.firstChild);
  }
  generate();
});

function savePalette() {
  const paletteName = prompt("Enter a name for your palette");
  if (paletteName) {
    const paletteObj = {
      name: paletteName,
      colors: newArr,
    };

    const savedPalettes = JSON.parse(localStorage.getItem("palettes")) || [];
    savedPalettes.push(paletteObj);
    localStorage.setItem("palettes", JSON.stringify(savedPalettes));
  }
}
savePaletteBtn.addEventListener("click", () => {
  // savePaletteBtn.style.color = "red"
  savePalette();
});
//save pallette on ctrl s
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 83 && e.ctrlKey) {
    savePalette();
  }
});

function makeCSS() {
  let cssString = "";
  let scssString = "";
  const lastFive = cssColorNames.slice(-5);
  lastFive.forEach((colorName) => {
    cssString += `
    --${colorName.replace(/\s/g, "_").toLowerCase()}: ${
      cssHexValues[cssColorNames.indexOf(colorName)]
    };\n`;
    scssString += `
    $${colorName.replace(/\s/g, "_").toLowerCase()}: ${
      cssHexValues[cssColorNames.indexOf(colorName)]
    };\n`;
  });
  const cssOutput = `
  /* Generated with ❤️ by Colorwify */
  
  /*CSS HEX Values*/
  ${cssString}
  
  /*SCSS HEX Values*/
  ${scssString}
  `;
  const css = cssOutput;
  const cssFile = new Blob([css], { type: "text/css" });
  const cssUrl = URL.createObjectURL(cssFile);
  const link = document.createElement("a");
  link.href = cssUrl;
  link.setAttribute(
    "download",
    `${lastFive[0].replace(/\s/g, "")}byColorwify.css`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//run make css on click
saveCSSButton.addEventListener("click", () => {
  makeCSS();
});
//run make css on ctrl d
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.keyCode === 68 && e.ctrlKey) {
    makeCSS();
  }
});
