const colorThief = new ColorThief();
const image = document.querySelector(".uploaded_image");
const mainBg = document.querySelector(".main");
const dominantColorCodeAndButton = document.querySelector(
  ".dominant_color_code_and_copy_button"
);
const dominantColorContainer = document.querySelector(".dominant_color");
const dominantColorDiv = document.querySelector(".dominant");
const colorPaletteDiv = document.querySelector(".color_palette");
const colorPaletteContainer = document.querySelector(
  ".color_palette_container"
);
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
const exportPaletteButton = document.querySelector(".export_palette");
const closePopUpButton = document.querySelector(".fa-times-circle");
const cssResult = document.querySelector(".css_result");
const exportAsCssButton = document.querySelector(".export_as_css");
const defaultPopUpRightContent = document.querySelector(
  ".default_popup_right_content"
);
const exportAsImageButton = document.querySelector(".export_as_image");
const imageResult = document.querySelector(".image_result");
const savePaletteButton = document.querySelector(".save_palette");

//disable default ctrl+s behaviour
document.addEventListener("keydown", (e) => {
  e.ctrlKey && e.key === "s" ? e.preventDefault() : null;
});
//disable default ctrl+e behaviour
document.addEventListener("keydown", (e) => {
  e.ctrlKey && e.key === "e" ? e.preventDefault() : null;
});

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

const loadFile = function (e) {
  const uploadedImage = document.querySelector(".uploaded_image");
  const displayImage = URL.createObjectURL(e.target.files[0]);
  uploadedImage.src = displayImage;

  uploadedImage.onload = function () {
    URL.revokeObjectURL(uploadedImage.src);
    /**************************Get Dominant Color************************/
    function getDominantColor() {
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
      dominantColorCodeAndButton.appendChild(dominantColorCode);
      const copyCopied = document.createElement("small");
      copyCopied.textContent = "Copy";
      copyCopied.classList.add("copy_copied");
      dominantColorCodeAndButton.appendChild(copyCopied);
      const copyColorCodeButton = document.createElement("i");
      copyColorCodeButton.classList.add("fa", "fa-clone");
      dominantColorCodeAndButton.appendChild(copyColorCodeButton);
      copyColorCodeButton.addEventListener("click", copyColorCode);
      copyColorCodeButton.addEventListener("mouseenter", () => {
        copyCopied.style.display = "block";
      });
      copyColorCodeButton.addEventListener("mouseleave", () => {
        copyCopied.style.display = "none";
      });
    }

    getDominantColor();
    /*****************************************************************/
    //***********Save Palette Data to localstorage******/
    /*******************Generate Color Palette************************/
    function getColorPalette() {
      const colorPalette = colorThief.getPalette(image, count);
      const colorHexValues = [];
      const colorNames = [];
      const colorRgbValues = [];
      colorPalette.forEach((color, index) => {
        const [r, g, b] = [color[0], color[1], color[2]];
        const hexValue = rgbToHex(r, g, b);
        const nameColor = ntc.name(hexValue);
        n_rgb = nameColor[0];
        n_name = nameColor[1];
        colorHexValues.push(hexValue);
        colorNames.push(n_name);
        colorRgbValues.push(r, g, b);
        const singleColor = document.createElement("div");
        singleColor.classList.add("color");
        singleColor.style.backgroundColor = `rgb(${r},${g},${b})`;
        colorPaletteContainer.appendChild(singleColor);

        const colorPaletteCodeAndCopyButton = document.createElement("div");
        colorPaletteCodeAndCopyButton.classList.add(
          "color_palette_code_and_copy_button"
        );
        colorPaletteContainer.appendChild(colorPaletteCodeAndCopyButton);
        const colorPaletteCode = document.createElement("input");
        colorPaletteCode.value = hexValue;

        if (checkLuminance(hexValue) === true) {
          colorPaletteCode.style.color = "white";
        } else {
          colorPaletteCode.style.color = "black";
        }

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
        copyColorCodeButton.classList.add("fa", "fa-clone");

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

      const colorsArray = [
        colorHexValues[0],
        colorHexValues[1],
        colorHexValues[2],
        colorHexValues[3],
        colorHexValues[4],
      ];
      function savePalette() {
        const paletteName = prompt("Enter a name for your palette");
        if (paletteName) {
          const paletteObj = {
            name: paletteName,
            colors: colorsArray,
          };
          const palette = JSON.parse(localStorage.getItem("palettes"));
          if (palette) {
            palette.push(paletteObj);
            localStorage.setItem("palettes", JSON.stringify(palette));
          }
        }
      }
      savePaletteButton.addEventListener("click", savePalette);
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
        `;

      imageResult.innerHTML = svgImage;

      exportAsImageButton.addEventListener("click", () => {});

      function exportPalette() {
        popUp.classList.add("active");
        mainBg.style.pointerEvents = "none";
        leftSidebar.style.pointerEvents = "none";
        /*************************************************/
      }

      exportPaletteButton.addEventListener("click", exportPalette);
      //key bidings
      document.addEventListener("keydown", (e) => {
        e.ctrlKey ? (e.key === "s" ? savePalette() : null) : null;
      });
      document.addEventListener("keydown", (e) => {
        e.ctrlKey ? (e.key === "e" ? exportPalette() : null) : null;
        e.ctrlKey
          ? e.key === "x"
            ? popUp.classList.remove("active")
            : null
          : null;
      });
    }
    getColorPalette();
    /***********************************************************************/
  };
  defaultSidebarContent.style.display = "none";
  imageLoaded.style.display = "flex";
  colorPaletteContainer.replaceChildren();
  dominantColorCodeAndButton.replaceChildren();
};

uploadInput.addEventListener("change", loadFile);

/*********Convert RGB to HEX**************/
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
/************************************************/

//function makeGradient(){}
//PWA
