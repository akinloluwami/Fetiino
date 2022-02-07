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
const leftSidebar = document.querySelector(".left_sidebar");

// const rangeSlider = document.querySelector(".range_slider");
const imageLoaded = document.querySelector(".image_loaded");
let count = 20;
const exportButton = document.querySelector(".export_palette");
const cssCode = document.querySelector(".css_code");
const copyCssButton = document.querySelector(".copy_css_button");
const downloadCssCodeButton = document.querySelector(".download_css_button");
const popUp = document.querySelector(".popup");
const exportPalette = document.querySelector(".export_palette");
const closePopUpButton = document.querySelector(".fa-times-circle");
const cssResult = document.querySelector(".css_result");
const exportAsCssButton = document.querySelector(".export_as_css");
const defaultPopUpRightContent = document.querySelector(
  ".default_popup_right_content"
);
exportAsImageButton = document.querySelector(".export_as_image");
const imageResult = document.querySelector(".image_result");
const savePaletteButton = document.querySelector(".save_palette");

exportAsCssButton.addEventListener("click", () => {
  cssResult.style.display = "block";
  imageResult.style.display = "none";
  defaultPopUpRightContent.style.display = "none";
  exportAsCssButton.style.backgroundColor = "red";
  exportAsCssButton.style.color = "#fff";
  exportAsImageButton.style.backgroundColor = "transparent";
  exportAsImageButton.style.color = "#000";
});
exportAsImageButton.addEventListener("click", () => {
  imageResult.style.display = "block";
  cssResult.style.display = "none";
  defaultPopUpRightContent.style.display = "none";
  exportAsImageButton.style.backgroundColor = "red";
  exportAsImageButton.style.color = "#fff";
  exportAsCssButton.style.backgroundColor = "transparent";
  exportAsCssButton.style.color = "#000";
});

closePopUpButton.addEventListener("click", () => {
  popUp.classList.remove("active");
  leftSidebar.style.pointerEvents = "auto";
  // rightSidebar.style.pointerEvents = "auto";
  mainBg.style.pointerEvents = "auto";
});

/***************Show export poppup***************/
exportButton.addEventListener("click", () => {
  popUp.classList.add("active");
  // rightSidebar.style.pointerEvents = "none";
  mainBg.style.pointerEvents = "none";
  leftSidebar.style.pointerEvents = "none";
});
/*************************************************/

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
    //***********Save Palette Data to localstorage******/
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
        // colorPaletteDiv.appendChild(singleColor);
        //remove current color palette before adding new one
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
      const svgImage = `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1034.9">
  <defs>
    <style>
      .cls-1, .cls-9 {
        fill: #f6f6f6;
      }

      .cls-2 {
        font-size: 67.82px;
      }

      .cls-2, .cls-9 {
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
      }

      .cls-3 {
        fill: red;
      }

      .cls-4 {
        fill: ${colorHexValues[0]};
      }

      .cls-5 {
        fill: ${colorHexValues[1]};
      }

      .cls-6 {
        fill: ${colorHexValues[2]};
      }

      .cls-7 {
        fill: ${colorHexValues[4]};
      }

      .cls-8 {
        fill: ${colorHexValues[3]};
      }

      .cls-9 {
        font-size: 52.2px;
      }
    </style>
  </defs>
  <rect class="cls-1" y="924" width="1024" height="100"/>
  <g>
    <text class="cls-2" transform="translate(24.3 995.43)">Colorwify</text>
    <circle class="cls-3" cx="354.7" cy="951.1" r="8.06"/>
    <circle class="cls-3" cx="273.45" cy="947.47" r="5.21"/>
  </g>
  <rect class="cls-4" width="204.8" height="924"/>
  <rect class="cls-5" x="204.8" width="204.8" height="924"/>
  <rect class="cls-6" x="409.6" width="204.8" height="924"/>
  <rect class="cls-7" x="819.2" width="204.8" height="924"/>
  <rect class="cls-8" x="614.4" width="204.8" height="924"/>
  <text class="cls-9" transform="translate(121.79 899.05) rotate(-90)">${colorNames[0]}</text>
  <text class="cls-9" transform="translate(327.41 895.45) rotate(-90)">${colorNames[1]}</text>
  <text class="cls-9" transform="translate(512 891.85) rotate(-90)">${colorNames[2]}</text>
  <text class="cls-9" transform="translate(730.6 891.01) rotate(-90)">${colorNames[3]}</text>
  <text class="cls-9" transform="translate(933.81 888.61) rotate(-90)">${colorNames[4]}</text>
</svg>
<button class="download_svg_button onClick=downloadSvgImage()><i class="fad fa-download"></i></button>
</div>
        `;

      imageResult.innerHTML = svgImage;
      //download svg image as a file
      function downloadSvgImage() {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgImage)
        );
        element.setAttribute(
          "download",
          `${colorNames[0].replace(/\s/g, "")}Palette.svg`
        );
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
      //push color name and hex code to palette object
      const palette = {
        colorNames: colorNames,
        colorHexValues: colorHexValues,
      };
      function savePalette() {
        //use palette object to save palette data array
        const paletteData = JSON.parse(localStorage.getItem("paletteData"));
        if (paletteData === null) {
          const paletteData = [];
          paletteData.push(palette);
          localStorage.setItem("paletteData", JSON.stringify(paletteData));
        } else {
          paletteData.push(palette);
          localStorage.setItem("paletteData", JSON.stringify(paletteData));
        }
        savePaletteButton.innerHTML = `<i class="fad fa-check"></i> Saved`;
        savePaletteButton.style.backgroundColor = "grey";
      }
      savePaletteButton.addEventListener("click", savePalette, {
        once: true,
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
