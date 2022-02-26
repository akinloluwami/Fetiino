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

const savedColorPalettes = document.querySelector(".saved_color_palettes");
const paletteDefaultContent = document.querySelector(
  ".palette_default_content"
);
const deleteAllButton = document.querySelector(".delete_all");
const confirmDeletePopup = document.querySelector(".confirm_delete_popup");
const cancelDeleteButton = document.querySelector(".cancel_delete");
const confirmDeleteButton = document.querySelector(".confirm_delete");
deleteAllButton.addEventListener("click", () => {
  confirmDeletePopup.classList.add("show");
});
cancelDeleteButton.addEventListener("click", () => {
  confirmDeletePopup.classList.remove("show");
});
confirmDeleteButton.addEventListener("click", () => {
  savedColorPalettes.innerHTML = "";
  paletteDefaultContent.style.display = "flex";
  confirmDeletePopup.classList.remove("show");
  deleteAllButton.style.display = "none";
  localStorage.clear();
});

function downloadCss(css, filename) {
  const cssFile = new Blob([css], { type: "text/css" });
  const cssUrl = URL.createObjectURL(cssFile);
  const link = document.createElement("a");
  link.href = cssUrl;
  link.setAttribute("download", `${filename}.css`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

let cssFile;

function loadSavedPalettes() {
  const paletteData = JSON.parse(localStorage.getItem("palettes"));
  if (paletteData === null) {
    paletteDefaultContent.style.display = "flex";
    deleteAllButton.style.display = "none";
  } else {
    paletteData.forEach((palette) => {
      const { name, colors, cssCode } = palette;
      cssFile = cssCode;
      paletteName = name;
      const singlePaletteData = `
        <div class="saved_palette_card">
              <h3>${name}</h3>
              <div class="colors">
                <div class="color" style="background-color:${colors[0]}">
                <textarea class="color_code" readonly>${colors[0]}</textarea>
                </div>
                <div class="color" style="background-color:${colors[1]}">
                <textarea class="color_code" readonly>${colors[1]}</textarea>
                </div>
                <div class="color" style="background-color:${colors[2]}">
                <textarea class="color_code" readonly>${colors[2]}</textarea>
                </div>
                <div class="color" style="background-color:${colors[3]}">
                <textarea class="color_code" readonly>${colors[3]}</textarea>
                </div>
                <div class="color" style="background-color:${colors[4]}">
                <textarea class="color_code" readonly>${colors[4]}</textarea>
                </div>
              </div>
              <textarea class="css_code" readonly>${cssCode}</textarea>
            <div class="download_button">
              <i class="fa fa-download"></i>
            </!div>

        </div>
        `;
      savedColorPalettes.innerHTML += singlePaletteData;

      const cssFileCode = document.querySelectorAll(".css_code");
      cssFileCode.forEach((code) => {
        code.style.opacity = "0";
        code.style.pointerEvents = "none";
        code.style.resize = "none";
      });

      const textarea = document.querySelectorAll(".color_code");
      textarea.forEach((textarea) => {
        if (checkLuminance(textarea.value) === true) {
          textarea.style.color = "#fff";
        } else {
          textarea.style.color = "#000";
        }
      });
    });
  }
}
loadSavedPalettes();

const allColors = document.querySelectorAll(".color");

allColors.forEach((color) => {
  const colorCode = color.children[0].value;
  const copiedMessage = document.createElement("small");
  copiedMessage.textContent = "Copied!";
  color.appendChild(copiedMessage);
  color.appendChild(color.children[0]);
  if (checkLuminance(colorCode) === true) {
    color.children[0].style.color = "#fff";
  } else {
    color.children[0].style.color = "#000";
  }
  copiedMessage.style.opacity = 0;

  color.addEventListener("click", () => {
    setTimeout(() => {
      copiedMessage.style.opacity = 1;
      setTimeout(() => {
        copiedMessage.style.opacity = 0;
      }, 1000);
    }, 100);
    const textarea = document.createElement("textarea");
    textarea.value = colorCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  });
});

const allDownloadButtons = document.querySelectorAll(".download_button");

allDownloadButtons.forEach((downloadButton) => {
  downloadButton.addEventListener("click", () => {
    const downloadFile = downloadButton.parentElement.children[2].value;
    const filename =
      downloadButton.parentElement.children[0].textContent.replace(/\s/g, "-");
    console.log(filename);
    downloadCss(downloadFile, filename);
  });
});

const toggleMenu = document.querySelector(".ham");
const menuLinks = document.querySelector(".links");

toggleMenu.addEventListener("click", () => {
  menuLinks.classList.toggle("show");
});
