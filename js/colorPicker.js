const colorPicker = new iro.ColorPicker(".color_wheel", {
  width: 450,
  color: "#f00",
});
const rgbValue = document.querySelector(".rgb input");
const cmykValue = document.querySelector(".cmyk input");
const hslValue = document.querySelector(".hsl input");
const hexValue = document.querySelector(".hex input");

colorPicker.on("color:change", function (color) {
  const { hexString, rgbString, cmykString, hslString } = color;
  hexValue.value = hexString;
  rgbValue.value = rgbString;
  cmykValue.value = cmykString;
  hslValue.value = hslString;
  function RgbToCmyk(R, G, B) {
    if (R == 0 && G == 0 && B == 0) {
      return [0, 0, 0, 1];
    } else {
      var calcR = 1 - R / 255,
        calcG = 1 - G / 255,
        calcB = 1 - B / 255;

      var K = Math.min(calcR, Math.min(calcG, calcB)),
        C = (calcR - K) / (1 - K),
        M = (calcG - K) / (1 - K),
        Y = (calcB - K) / (1 - K);

      return [C, M, Y, K];
    }
  }
  cmykValue.value = RgbToCmyk(color.rgb.r, color.rgb.g, color.rgb.b);
});
