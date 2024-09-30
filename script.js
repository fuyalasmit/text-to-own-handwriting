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
const contentArea = document.querySelector('.content');
const fontColorSelect = document.getElementById('fontColor');
const fontSelect = document.getElementById('preuploadedFonts');
const fontSizeSlider = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const lineHeightSlider = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');

toggleLines.addEventListener('change', function() {
    editableArea.classList.toggle('with-lines', this.checked);
});

toggleMargin.addEventListener('change', function() {
    editableArea.classList.toggle('with-margin', this.checked);
});

// Initialize the states
editableArea.classList.toggle('with-lines', toggleLines.checked);
editableArea.classList.toggle('with-margin', toggleMargin.checked);

fontColorSelect.addEventListener('change', function() {
    contentArea.style.color = this.value;
});

const fontSizes = {
    'handwriting1': '24px',
    'handwriting2': '24px',
    'handwriting3': '24px',
    'handwriting4': '24px',
    'handwriting5': '24px'
};

function applyFont(fontFamily) {
    contentArea.style.fontFamily = fontFamily;
    contentArea.style.fontSize = fontSizes[fontFamily];
    fontSizeSlider.value = parseInt(fontSizes[fontFamily]);
    fontSizeValue.textContent = fontSizes[fontFamily];
    editableArea.style.setProperty('--font-size', fontSizes[fontFamily]);
}

window.onload = function() {
    const defaultFont = 'handwriting1';
    applyFont(defaultFont);
};

fontSelect.addEventListener('change', function() {
    const selectedFont = this.value;
    applyFont(selectedFont);
});

fontSizeSlider.addEventListener('input', function() {
    const fontSize = this.value;
    const currentFont = fontSelect.value;
    fontSizes[currentFont] = `${fontSize}px`;
    applyFont(currentFont);
});

lineHeightSlider.addEventListener('input', function() {
    const lineHeight = this.value;
    contentArea.style.lineHeight = lineHeight;
    lineHeightValue.textContent = lineHeight;
});


// Add these variables at the top of your script
const fontUploadInput = document.getElementById('uploadFont');
let customFontCounter = 0;

// Add this function to handle custom font uploads
function handleFontUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fontName = `customFont${++customFontCounter}`;
            const fontFace = new FontFace(fontName, e.target.result);
            fontFace.load().then(function(loadedFace) {
                document.fonts.add(loadedFace);
                fontFamilies.push(fontName);
                fontSizes[fontName] = '24px'; // Default size for custom fonts
                
                // Add the new font to the select options
                const option = document.createElement('option');
                option.value = fontName;
                option.textContent = `Custom Font ${customFontCounter}`;
                fontSelect.appendChild(option);
                
                // Automatically select the new font
                fontSelect.value = fontName;
                applyFont(fontName);
                
                console.log(`Custom font "${fontName}" has been loaded and added.`);
            }).catch(function(error) {
                console.error('Error loading custom font:', error);
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

// Add this event listener for font uploads
fontUploadInput.addEventListener('change', handleFontUpload);

// Modify the applyFont function to handle custom fonts
function applyFont(fontFamily) {
    contentArea.style.fontFamily = fontFamily;
    if (fontSizes[fontFamily]) {
        contentArea.style.fontSize = fontSizes[fontFamily];
        fontSizeSlider.value = parseInt(fontSizes[fontFamily]);
        fontSizeValue.textContent = fontSizes[fontFamily];
    } else {
        // Default size if not set
        contentArea.style.fontSize = '24px';
        fontSizeSlider.value = 24;
        fontSizeValue.textContent = '24px';
    }
    editableArea.style.setProperty('--font-size', contentArea.style.fontSize);
}

// Modify the fontSelect event listener to reset the file input
fontSelect.addEventListener('change', function() {
    const selectedFont = this.value;
    applyFont(selectedFont);
    fontUploadInput.value = ''; // Reset file input when changing fonts
});


// Select the line shift input and value display elements
const lineShiftSlider = document.getElementById('lineShift');
const lineShiftValue = document.getElementById('lineShiftValue');

// Update the background position when the slider is moved
lineShiftSlider.addEventListener('input', function() {
    const shiftValue = this.value;
    lineShiftValue.textContent = `${shiftValue}`;

    // Apply the background position adjustment for the lines
    editableArea.style.backgroundPositionY = `${shiftValue}px`;
});

