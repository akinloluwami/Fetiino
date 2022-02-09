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
              
              <div class="options_button">
                <i class="fa fa-ellipsis-h"></i>
                <div class="sharing_options">
                  <button class="share_palette_text">
                      <i class="fa fa-share"></i> 
                   </button>
                   <button class="share_palette_text">
                      <i class="fa fa-share"></i> 
                   </button>
                   <button class="share_palette_text">
                      <i class="fa fa-share"></i> 
                   </button>
                   <button class="share_palette_text">
                      <i class="fa fa-share"></i> 
                   </button>
              </div>
              </div>
            </div>
        `;
      savedColorPalettes.innerHTML += singlePaletteData;

      // const optionsButton = document.querySelectorAll(".options_button i");

      // optionsButton.forEach((button) => {
      //   button.addEventListener("mouseover", (e) => {
      //     const sharingOptions =
      //       e.target.parentElement.parentElement.querySelector(
      //         ".sharing_options"
      //       );
      //     sharingOptions.style.display = "flex";
      //   });

      //   button.addEventListener("mouseout", (e) => {
      //     const sharingOptions =
      //       e.target.parentElement.parentElement.querySelector(
      //         ".sharing_options"
      //       );
      //     sharingOptions.style.display = "none";
      //   });
      // });
    });
  }
})();

//delete saved all palettes
const deleteAllPalettes = document.querySelector(".delete_all");
deleteAllPalettes.addEventListener("click", () => {
  localStorage.clear();
  savedColorPalettes.innerHTML = "";
  paletteDefaultContent.style.display = "flex";
  deleteAllPalettes.style.display = "none";
});

//hide delete button if local storage is empty
if (localStorage.length === 0) {
  deleteAllPalettes.style.display = "none";
}
