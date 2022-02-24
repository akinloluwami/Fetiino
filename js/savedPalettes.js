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

function downloadCss(css) {
  const cssFile = new Blob([css], { type: "text/css" });
  const cssUrl = URL.createObjectURL(cssFile);
  const link = document.createElement("a");
  link.href = cssUrl;
  link.setAttribute(
    "download",
    `${paletteName.replace(/\s/g, "")}byFetiino.css`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

let cssFile;

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
                <div class="color" style="background-color:${colors[0]}"></div>
                <div class="color" style="background-color:${colors[1]}"></div>
                <div class="color" style="background-color:${colors[2]}"></div>
                <div class="color" style="background-color:${colors[3]}"></div>
                <div class="color" style="background-color:${colors[4]}"></div>
              </div>
              
            <div class="options_button">
              <div class="options_menu">
              <div class="arrow"></div>
                <button class="css"><i class="fab fa-css3-alt"></i></button>
                <button class="image"><i class="fa fa-image"></i></button>
                <button class="delete"><i class="fa fa-trash"></i></button>
              </div>
              <i class="fa fa-ellipsis-h"></i>
            </div>

        </div>
        `;
    savedColorPalettes.innerHTML += singlePaletteData;
  });
}

const allSavedPalettes = document.querySelectorAll(".saved_palette_card");

allSavedPalettes.forEach((savedPalette) => {
  const optionsButton = savedPalette.querySelector(".options_button");
  const optionsMenu = savedPalette.querySelector(".options_menu");
  const cssButton = savedPalette.querySelector(".css");
  const imageButton = savedPalette.querySelector(".image");
  const deleteButton = savedPalette.querySelector(".delete");

  optionsButton.addEventListener("click", () => {
    optionsMenu.classList.toggle("show");
  });

  cssButton.addEventListener("click", () => {
    downloadCss(cssFile);
  });

  imageButton.addEventListener("click", () => {
    const css = savedPalette.querySelector(".css_code").textContent;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = `https://placehold.it/500x500`;
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      ctx.putImageData(imageData, 0, 0);
      const imageUrl = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = imageUrl;
      link.setAttribute("download", `${paletteName.replace(/\s/g, "")}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  });
});

// const optionsButton = document.querySelectorAll(".options_button");

/*optionsButton.forEach((button) => {
      button.addEventListener("mouseover", (e) => {
        const optionsMenu = button.querySelector(".options_menu");
        optionsMenu.classList.add("show");
        const cssButton = optionsMenu.children[1];
        const imageButton = optionsMenu.children[2];
        const deleteButton = optionsMenu.children[3];
        cssButton.addEventListener("click", () => {
          downloadCss(cssCode);
        });
      });*/
/*button.addEventListener("mouseout", (e) => {
        setTimeout(() => {
          const optionsMenu = button.querySelector(".options_menu");
          optionsMenu.classList.remove("show");
        }, 5000);
      });
    });*/
