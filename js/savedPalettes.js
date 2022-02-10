const savedColorPalettes = document.querySelector(".saved_color_palettes");
const paletteDefaultContent = document.querySelector(
  ".palette_default_content"
);
//load saved color palettes
(function loadSavedPalettes() {
  const paletteData = JSON.parse(localStorage.getItem("paletteData"));
  if (paletteData === null) {
    paletteDefaultContent.style.display = "flex";
  } else {
    paletteData.forEach((palette) => {
      const singlePaletteData = `
        <div class="saved_palette_card">

        <div class="sharing_options">
        <button class="share_palette_text">
        <i class="fas fa-share-alt"></i>
         </button>
         <button class="share_palette_text">
         <i class="fab fa-css3-alt"></i>
         </button>
         <button class="share_palette_text">
         <i class="fas fa-file-image"></i>
         </button>
         <button class="share_palette_text">
         <i class="fas fa-trash-alt"></i>
         </button>
        </div>

              <div class="colors">
                <div class="color" style="background-color:${palette.colorHexValues[0]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[1]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[2]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[3]}"></div>
                <div class="color" style="background-color:${palette.colorHexValues[4]}"></div>
              </div>
              
              <button class="options_button">
                <i class="fa fa-ellipsis-h"></i>
              </button>
            </div>
        `;

      savedColorPalettes.innerHTML += singlePaletteData;

      //show sharing options when options button is clicked
      const optionsButton = document.querySelectorAll(".options_button");
      optionsButton.forEach((button) => {
        button.addEventListener("click", (e) => {
          const sharingOptions =
            e.target.parentElement.parentElement.querySelector(
              'div[class="sharing_options"]'
            );
          sharingOptions.classList.toggle("active");
        });
      });
      //delete palette when trash icon is clicked
      const trashIcon = document.querySelectorAll(".fa-trash-alt");
      trashIcon.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          const paletteCard = e.target.parentElement.parentElement;
          const paletteCardIndex = paletteCard.getAttribute("data-index");
          paletteData.splice(paletteCardIndex, 1);
          localStorage.setItem("paletteData", JSON.stringify(paletteData));
          // paletteCard.remove();
          paletteCard.style.display = "none";
        });
      });
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
