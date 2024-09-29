const fontFamilies = ['handwriting1', 'handwriting2', 'handwriting3', 'handwriting4', 'handwriting5'];

Promise.all(fontFamilies.map(font => 
    new FontFace(font, `url('./fonts/${font}.ttf')`).load()
)).then(fonts => {
    fonts.forEach(font => document.fonts.add(font));
    console.log("All fonts have been loaded and added to the document.");
}).catch(error => {
    console.error("Error loading fonts:", error);
});


let darkMode = document.getElementById("darkModeToggle");
darkMode.addEventListener("click", () => {
    alert("This feature will be available soon!");
});

const toggleLines = document.getElementById('toggleLines');
const toggleMargin = document.getElementById('toggleMargin');
const editableArea = document.querySelector('.editable-area');

toggleLines.addEventListener('change', function() {
    editableArea.classList.toggle('with-lines', this.checked);
});

toggleMargin.addEventListener('change', function() {
    editableArea.classList.toggle('with-margin', this.checked);
});

// Initialize the states
editableArea.classList.toggle('with-lines', toggleLines.checked);
editableArea.classList.toggle('with-margin', toggleMargin.checked);

const fontColorSelect = document.getElementById('fontColor');
const contentArea = document.querySelector('.content');

fontColorSelect.addEventListener('change', function() {
    contentArea.style.color = this.value;
});

const fontSelect = document.getElementById('preuploadedFonts');

function applyFont(fontFamily) {
    contentArea.style.fontFamily = fontFamily;
    contentArea.style.fontSize = fontSizes[fontFamily]; // Adjust size dynamically
}

window.onload = function() {
    const defaultFont = 'handwriting1'; // Set handwriting1 as the default font
    contentArea.style.fontFamily = defaultFont;
};

fontSelect.addEventListener('change', function() {
    const selectedFont = this.value;
    contentArea.style.fontFamily = selectedFont;
});



