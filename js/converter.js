const box = document.querySelector(".box");
const colorCodeInput = document.querySelector(".color_code_input");
const resultsCard = document.querySelectorAll(".result_card");
const rgbValue = document.querySelector(".rgb input");
const cmykValue = document.querySelector(".cmyk input");
const hslValue = document.querySelector(".hsl input");
const hexValue = document.querySelector(".hex input");
const colorBox = document.querySelector(".color_box");

function convert() {
  const getCodes = w3color(colorCodeInput.value, box);
  const rgb = getCodes.toRgbString();
  const hsl = getCodes.toHslString();
  const cmyk = getCodes.toCmykString();
  const hex = getCodes.toHexString();
  rgbValue.value = rgb;
  hslValue.value = hsl;
  cmykValue.value = cmyk;
  hexValue.value = hex;
  //   colorCodeInput.style.borderColor = hex;
  colorBox.style.backgroundColor = hex;
  resultsCard.forEach((card) => {
    card.style.borderColor = hex;
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
}

colorCodeInput.addEventListener("input", convert);
