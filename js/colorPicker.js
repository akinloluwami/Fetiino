const colorPicker = new iro.ColorPicker(".color_wheel", {
  width: 450,
  color: "#f00",
});
const rgbValue = document.querySelector(".rgb input");
const cmykValue = document.querySelector(".cmyk input");
const hslValue = document.querySelector(".hsl input");
const hexValue = document.querySelector(".hex input");

colorPicker.on("color:change", function (color) {
  const { hexString, rgbString, hslString } = color;
  hexValue.value = hexString;
  rgbValue.value = rgbString;
  hslValue.value = hslString;
  const getCodes = w3color(hexString);
  cmykValue.value = getCodes.toCmykString();
});
