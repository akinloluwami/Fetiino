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

const colorPicker = new iro.ColorPicker(".color_wheel", {
  width: 450,
  color: "#f00",
});
const rgbValue = document.querySelector(".rgb input");
const cmykValue = document.querySelector(".cmyk input");
const hslValue = document.querySelector(".hsl input");
const hexValue = document.querySelector(".hex input");
const resultsCard = document.querySelectorAll(".result_card");
const colorBox = document.querySelector(".color_box");

colorPicker.on("color:change", function (color) {
  const { hexString, rgbString, hslString } = color;
  hexValue.value = hexString;
  rgbValue.value = rgbString;
  hslValue.value = hslString;
  const getCodes = w3color(hexString);
  cmykValue.value = getCodes.toCmykString();
  colorBox.style.backgroundColor = hexString;
  const nameColor = ntc.name(hexString);
  const colorName = nameColor[1];
  colorBox.textContent = colorName;
  if (checkLuminance(hexString) === true) {
    colorBox.style.color = "white";
  } else {
    colorBox.style.color = "black";
  }
});

resultsCard.forEach((card) => {
  const colorCodeValue = card.childNodes[3];
  const copyButton = card.childNodes[5];
  tippy(copyButton, {
    content: "Copy",
    animation: "fade",
    followCursor: true,
    hideOnClick: true,
  });
  copyButton.addEventListener("click", () => {
    colorCodeValue.select();
    colorCodeValue.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(colorCodeValue.value);
  });
});

const toggleMenu = document.querySelector(".ham");
const menuLinks = document.querySelector(".links");

toggleMenu.addEventListener("click", () => {
  menuLinks.classList.toggle("show");
});
