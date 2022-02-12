const savedColorPalettes = document.querySelector(".saved_color_palettes");
const paletteDefaultContent = document.querySelector(
  ".palette_default_content"
);
//load saved color palettes
let cssDownloadCode;
let paletteName;

(function loadSavedPalettes() {
  const paletteData = JSON.parse(localStorage.getItem("palettes"));
  if (paletteData === null) {
    paletteDefaultContent.style.display = "flex";
  } else {
    paletteData.forEach((palette) => {
      const { name, colors, cssCode } = palette;
      cssDownloadCode = cssCode;
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
    const optionsButton = document.querySelectorAll(".options_button");
    optionsButton.forEach((button) => {
      button.addEventListener("mouseover", (e) => {
        const optionsMenu = button.querySelector(".options_menu");
        optionsMenu.classList.add("show");
        const cssButton = optionsMenu.children[1];
        const imageButton = optionsMenu.children[2];
        const deleteButton = optionsMenu.children[3];
        function downloadCss() {
          const css = cssDownloadCode;
          const cssFile = new Blob([css], { type: "text/css" });
          const cssUrl = URL.createObjectURL(cssFile);
          const link = document.createElement("a");
          link.href = cssUrl;
          link.setAttribute(
            "download",
            `${paletteName.replace(/\s/g, "")}byColorwify.css`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        cssButton.addEventListener("click", downloadCss);
      });
      button.addEventListener("mouseout", (e) => {
        setTimeout(() => {
          const optionsMenu = button.querySelector(".options_menu");
          optionsMenu.classList.remove("show");
        }, 5000);
      });
    });
  }
})();
