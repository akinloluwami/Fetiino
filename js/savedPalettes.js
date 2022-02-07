const savedColorPalettes = document.querySelector(".saved_color_palettes");
const paletteDefaultContent = document.querySelector(
  ".palette_default_content"
);
//load saved color palettes
(function loadSavedPalettes() {
  const paletteData = JSON.parse(localStorage.getItem("paletteData"));
  if (paletteData === null) {
    paletteDefaultContent.style.display = "flex";
    console.log("no palettes saved");
  } else {
    paletteData.forEach((palette) => {
      console.log(
        palette.colorHexValues[0],
        palette.colorHexValues[1],
        palette.colorHexValues[2],
        palette.colorHexValues[3],
        palette.colorHexValues[4]
      );
      const singlePaletteData = `
        <div class="saved_palette_card">
              <div class="colors">
                <div class="color" style="background-color:${palette.colorHexValues[0]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[1]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[2]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[3]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[4]}"></div>
              </div>
              <button class="options_button">
                <i class="fad fa-ellipsis-h"></i>
              </button>
            </div>
        `;
      savedColorPalettes.innerHTML += singlePaletteData;
    });
  }
})();
