function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

let check = "";
function checkLuminance(hexCode) {
  const rgb = hexToRgb(hexCode);
  const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
  check = luminance;
  if (luminance < 100) {
    return true;
  } else {
    return false;
  }
}

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
    colorArr.push(randomColor({ luminosity: "random", hue: "random" }));
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
    if (checkLuminance(color) === true) {
      colorDiv.style.color = "white";
      colorDiv.children[0].style.color = "white";
    } else {
      colorDiv.style.color = "black";
    }
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
    console.log(check);
  }
});
generateButton.addEventListener("click", (e) => {
  while (palette.firstChild) {
    palette.removeChild(palette.firstChild);
  }
  generate();
});
let newCssCode;
let newLastFive;
function makeCSS() {
  let cssString = "";
  let scssString = "";
  let lastFive = [];
  let cssOutput;
  lastFive = cssColorNames.slice(-5);
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
  cssOutput = `
  /* Generated with ❤️ by Colorwify */
  
  /*CSS HEX Values*/
  ${cssString}
  
  /*SCSS HEX Values*/
  ${scssString}
  `;
  newCssCode = cssOutput;
  newLastFive = lastFive;
}
function downloadCss() {
  const css = newCssCode;
  const cssFile = new Blob([css], { type: "text/css" });
  const cssUrl = URL.createObjectURL(cssFile);
  const link = document.createElement("a");
  link.href = cssUrl;
  link.setAttribute(
    "download",
    `${newLastFive[0].replace(/\s/g, "")}byColorwify.css`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

saveCSSButton.addEventListener("click", () => {
  makeCSS();
  downloadCss();
});
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.keyCode === 68 && e.ctrlKey) {
    makeCSS();
    downloadCss();
  }
});

function savePalette() {
  makeCSS();
  const paletteName = prompt("Enter a name for your palette");
  if (paletteName) {
    const paletteObj = {
      name: paletteName,
      colors: newArr,
      cssCode: newCssCode,
    };

    const savedPalettes = JSON.parse(localStorage.getItem("palettes")) || [];
    savedPalettes.push(paletteObj);
    localStorage.setItem("palettes", JSON.stringify(savedPalettes));
  }
}
savePaletteBtn.addEventListener("click", () => {
  savePalette();
});
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 83 && e.ctrlKey) {
    savePalette();
  }
});
