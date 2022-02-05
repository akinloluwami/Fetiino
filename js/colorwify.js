const colorThief = new ColorThief();
const image = document.querySelector(".uploaded_image");
const mainBg = document.querySelector(".main");
const dominantColorCodeAndButton = document.querySelector(
  ".dominant_color_code_and_copy_button"
);
const dominantColorContainer = document.querySelector(".dominant_color");
const dominantColorDiv = document.querySelector(".dominant");
const colorPaletteDiv = document.querySelector(".color_palette");
const uploadInput = document.querySelector(".upload_input");
const defaultSidebarContent = document.querySelector(".default");
const rightSidebar = document.querySelector(".right_sidebar");
// const rangeSlider = document.querySelector(".range_slider");
const imageLoaded = document.querySelector(".image_loaded");
let count = 10;
const exportButton = document.querySelector(".export_palette");
const cssCode = document.querySelector(".css_code");
const copyCssButton = document.querySelector(".copy_css_button");
const downloadCssCodeButton = document.querySelector(".download_css_button");
const popUp = document.querySelector(".popup");
const exportPalette = document.querySelector(".export_palette");
const closePopUpButton = document.querySelector(".fa-times-circle");

closePopUpButton.addEventListener("click", () => {
  popUp.classList.remove("active");
});
exportButton.addEventListener("click", () => {
  // popUp.style.display = "block";
  popUp.classList.add("active");
});

if (popUp.classList.contains("active")) {
  console.log("popup is active");
}
//disable interaction with the rest of the page while pop up is open
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    e.stopPropagation();
  }
});

// rangeSlider.addEventListener("input", (e) => {
//   count = e.target.value;
// });

// console.log(rangeSlider);
// const newPaletteButton = document.querySelector(".new_palette");

const loadFile = function (e) {
  const uploadedImage = document.querySelector(".uploaded_image");
  const displayImage = URL.createObjectURL(e.target.files[0]);
  uploadedImage.src = displayImage;

  uploadedImage.onload = function () {
    URL.revokeObjectURL(uploadedImage.src);

    /**************************Get Dominant Color************************/
    (function getDominantColor() {
      const dominantColor = colorThief.getColor(uploadedImage);
      const [r, g, b] = [dominantColor[0], dominantColor[1], dominantColor[2]];
      // mainBg.style.backgroundColor = `rgb(${r},${g},${b})`;
      dominantColorDiv.style.backgroundColor = `rgb(${r},${g},${b})`;
      exportButton.style.backgroundColor = `rgb(${r},${g},${b})`;
      const hexValue = rgbToHex(r, g, b);

      const dominantColorCode = document.createElement("input");
      dominantColorCode.classList.add("dominant_color_code");
      dominantColorCode.value = hexValue;

      /*************Get color name****************/
      const nameColor = ntc.name(hexValue);
      n_rgb = nameColor[0]; // RGB value of closest match
      n_name = nameColor[1]; // Text string: Color name
      n_exactmatch = nameColor[2]; // True if exact color match
      console.log(`%c  ${n_name}`, `background: ${n_rgb}; color: #fff`);
      /******************************************/

      /************Copy color code****/
      function copyColorCode() {
        dominantColorCode.select();
        dominantColorCode.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(dominantColorCode.value);
        copyCopied.textContent = "Copied";
        copyCopied.style.display = "block";
        setTimeout(() => {
          copyCopied.style.display = "none";
        }, 800);
      }
      /***************************************/

      dominantColorCodeAndButton.appendChild(dominantColorCode);
      const copyCopied = document.createElement("small");
      copyCopied.textContent = "Copy";
      copyCopied.classList.add("copy_copied");
      dominantColorCodeAndButton.appendChild(copyCopied);
      const copyColorCodeButton = document.createElement("i");
      copyColorCodeButton.classList.add("fad", "fa-clone");
      dominantColorCodeAndButton.appendChild(copyColorCodeButton);
      copyColorCodeButton.addEventListener("click", copyColorCode);
      copyColorCodeButton.addEventListener("mouseenter", () => {
        copyCopied.style.display = "block";
      });
      copyColorCodeButton.addEventListener("mouseleave", () => {
        copyCopied.style.display = "none";
      });
    })();
    /*****************************************************************/

    /*******************Generate Color Palette************************/
    (function getColorPalette() {
      const colorPalette = colorThief.getPalette(image, count);
      const colorHexValues = [];
      const colorNames = [];
      const colorRgbValues = [];
      colorPalette.forEach((color) => {
        const [r, g, b] = [color[0], color[1], color[2]];
        const hexValue = rgbToHex(r, g, b);
        const nameColor = ntc.name(hexValue);
        n_rgb = nameColor[0]; // RGB value of closest match
        n_name = nameColor[1]; // Text string: Color name
        colorHexValues.push(hexValue);
        colorNames.push(n_name);
        colorRgbValues.push(r, g, b);
        const singleColor = document.createElement("div");
        singleColor.classList.add("color");
        singleColor.style.backgroundColor = `rgb(${r},${g},${b})`;
        colorPaletteDiv.appendChild(singleColor);
        const colorPaletteCodeAndCopyButton = document.createElement("div");
        colorPaletteCodeAndCopyButton.classList.add(
          "color_palette_code_and_copy_button"
        );
        colorPaletteDiv.appendChild(colorPaletteCodeAndCopyButton);
        const colorPaletteCode = document.createElement("input");
        colorPaletteCode.value = hexValue;

        function copyColorCode() {
          colorPaletteCode.select();
          colorPaletteCode.setSelectionRange(0, 99999);
          navigator.clipboard.writeText(colorPaletteCode.value);
          copyCopied.textContent = "Copied";

          setTimeout(() => {
            copyCopied.textContent = "Copy";
          }, 600);
          copyCopied.style.display = "block";
          setTimeout(() => {
            copyCopied.style.display = "none";
          }, 600);
        }
        const copyCopied = document.createElement("small");
        copyCopied.textContent = "Copy";
        copyCopied.classList.add("copy_copied");
        colorPaletteCodeAndCopyButton.appendChild(colorPaletteCode);
        colorPaletteCodeAndCopyButton.appendChild(copyCopied);

        const copyColorCodeButton = document.createElement("i");
        copyColorCodeButton.classList.add("fad", "fa-clone");

        colorPaletteCodeAndCopyButton.appendChild(copyColorCodeButton);
        singleColor.appendChild(colorPaletteCodeAndCopyButton);

        copyColorCodeButton.addEventListener("click", copyColorCode);
        copyColorCodeButton.addEventListener("mouseenter", () => {
          copyCopied.style.display = "block";
        });
        copyColorCodeButton.addEventListener("mouseleave", () => {
          copyCopied.style.display = "none";
        });
      });
      const singleColorValues = [
        {
          colorName: colorNames[0].toLowerCase(),
          colorHexCode: colorHexValues[0],
          colorRgbCode: colorRgbValues[0],
        },
        {
          colorName: colorNames[1].toLowerCase(),
          colorHexCode: colorHexValues[1],
        },
        {
          colorName: colorNames[2].toLowerCase(),
          colorHexCode: colorHexValues[2],
        },
        {
          colorName: colorNames[3].toLowerCase(),
          colorHexCode: colorHexValues[3],
        },
        {
          colorName: colorNames[4].toLowerCase(),
          colorHexCode: colorHexValues[4],
        },
        {
          colorName: colorNames[5].toLowerCase(),
          colorHexCode: colorHexValues[5],
        },
        {
          colorName: colorNames[6].toLowerCase(),
          colorHexCode: colorHexValues[6],
        },
      ];

      console.log(singleColorValues);

      const cssOutput = `
      /* Generated with ❤️ by Colorwify */

      /*CSS HEX Values*/

    --${singleColorValues[0].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[0].colorHexCode
      };
    --${singleColorValues[1].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[1].colorHexCode
      };
    --${singleColorValues[2].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[2].colorHexCode
      };
    --${singleColorValues[3].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[3].colorHexCode
      };
    --${singleColorValues[4].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[4].colorHexCode
      };
    --${singleColorValues[5].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[5].colorHexCode
      };
    --${singleColorValues[6].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[6].colorHexCode
      };


      /*SCSS HEX Values*/

    $${singleColorValues[0].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[0].colorHexCode
      };
    $${singleColorValues[1].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[1].colorHexCode
      };
    $${singleColorValues[2].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[2].colorHexCode
      };
    $${singleColorValues[3].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[3].colorHexCode
      };
    $${singleColorValues[4].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[4].colorHexCode
      };
    $${singleColorValues[5].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[5].colorHexCode
      };
    $${singleColorValues[6].colorName.replace(/\s/g, "_")}: ${
        singleColorValues[6].colorHexCode
      };
    `;
      cssCode.textContent = cssOutput;
      console.log(cssOutput);
      //copy css code to clipboard
      function copyCssCode() {
        cssCode.select();
        cssCode.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(cssCode.value);
        const copiedMessage = document.querySelector(".copied_message");
        copiedMessage.style.display = "block";
        setTimeout(() => {
          copiedMessage.style.display = "none";
        }, 900);
      }
      copyCssButton.addEventListener("click", copyCssCode);

      //disable copy button if no css code is present
      if (cssCode.textContent === "") {
        copyCssCodeButton.disabled = true;
      }
      //disable textarea editable
      cssCode.setAttribute("readonly", "readonly");

      //download css code as a file
      downloadCssCodeButton.addEventListener("click", () => {
        //download css code as a file
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(cssOutput)
        );
        element.setAttribute(
          "download",
          `${colorNames[0].replace(/\s/g, "")}Palette.css`
        );
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
    })();
    /***********************************************************************/
  };
  defaultSidebarContent.style.display = "none";
  imageLoaded.style.display = "flex";
};

uploadInput.addEventListener("change", loadFile);

/*********Convert RGB to HEX**************/
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
/************************************************/

//function makeGradient(){}
