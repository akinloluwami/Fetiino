const colorPicker = new iro.ColorPicker(".color_wheel", {
  width: 450,
  color: "#f00",
});
const rgbValue = document.querySelector(".rgb input");
const cmykValue = document.querySelector(".cmyk input");
const hslValue = document.querySelector(".hsl input");
const hexValue = document.querySelector(".hex input");
const resultsCard = document.querySelectorAll(".result_card");

colorPicker.on("color:change", function (color) {
  const { hexString, rgbString, hslString } = color;
  hexValue.value = hexString;
  rgbValue.value = rgbString;
  hslValue.value = hslString;
  const getCodes = w3color(hexString);
  cmykValue.value = getCodes.toCmykString();
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
