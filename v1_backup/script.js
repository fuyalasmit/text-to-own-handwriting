const fontFamilies = ['handwriting1', 'handwriting2', 'handwriting3', 'handwriting4', 'handwriting5'];



Promise.all(fontFamilies.map(font => 
    new FontFace(font, `url('./fonts/${font}.ttf')`).load()
)).then(fonts => {
    fonts.forEach(font => document.fonts.add(font));
    console.log("All fonts have been loaded and added to the document.");
}).catch(error => {
    console.error("Error loading fonts:", error);
});

// let darkMode = document.getElementById("darkModeToggle");
// darkMode.addEventListener("click", () => {
//     alert("This feature will be available soon!");
// });
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// Function to update the dark mode icon
function updateDarkModeIcon() {
    const sunIcon = darkModeToggle.querySelector('.sun-icon');
    const moonIcon = darkModeToggle.querySelector('.moon-icon');
    
    if (html.classList.contains('dark')) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Function to update the editable area background
function updateEditableAreaBackground() {
    // Add your logic here if needed
}

// Event listener for dark mode toggle
darkModeToggle.addEventListener("click", () => {
    html.classList.toggle('dark');
    updateDarkModeIcon();
    updateEditableAreaBackground();
});

// Initialize the theme based on system preference
function initializeTheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkScheme) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    updateDarkModeIcon();
}

// Call the initializeTheme function on page load
initializeTheme();


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
    if (window.innerWidth <= 640) {
        alert("For the best experience, please use a laptop or desktop.");
    }
};

fontSelect.addEventListener('change', function() {
    const selectedFont = this.value;
    applyFont(selectedFont);
});

// fontSizeSlider.addEventListener('input', function() {
//     const fontSize = this.value;
//     const currentFont = fontSelect.value;
//     fontSizes[currentFont] = `${fontSize}px`;
//     applyFont(currentFont);
// });

fontSizeSlider.addEventListener('input', function() {
    // Store the current scroll position
    const scrollTop = window.scrollY;
    
    const fontSize = this.value;
    const currentFont = fontSelect.value;
    fontSizes[currentFont] = `${fontSize}px`;
    applyFont(currentFont);

    // Restore the scroll position
    window.scrollTo(0, scrollTop);
});


// lineHeightSlider.addEventListener('input', function() {
//     const lineHeight = this.value;
//     contentArea.style.lineHeight = lineHeight;
//     lineHeightValue.textContent = lineHeight;
// });

lineHeightSlider.addEventListener('input', function() {
    // Store the current scroll position
    const scrollTop = window.scrollY;
    
    const lineHeight = this.value;
    contentArea.style.lineHeight = lineHeight;
    lineHeightValue.textContent = lineHeight;

    // Restore the scroll position
    window.scrollTo(0, scrollTop);
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


document.getElementById('generate-btn').addEventListener('click', function() {
    const mainText = document.getElementById('mainText');

    // Check for vertical overflow
    if (mainText.scrollHeight > mainText.clientHeight) {
        alert('Warning: Some text may be cut off in the generated image due to overflow.');
    }

    htmlToImage.toPng(mainText, {
        quality: 1.0,
        backgroundColor: '#ffffff'  // Ensure white background
    })
    .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        img.style.display = 'block';
        img.style.maxWidth = 'none';
        // img.style.height = '300px';

        // Create a container for the image and download button
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img-wrapper');

        // Append the image to the wrapper
        imgWrapper.appendChild(img);
        // Create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.innerHTML = 'Remove';
        removeBtn.classList.add('remove-btn');  // Use the same CSS class as download button

        // Add event listener to remove the image and buttons
        removeBtn.addEventListener('click', function() {
            imgWrapper.remove();
        });

        // Add a gap or margin between remove and download buttons
        removeBtn.style.marginRight = '10px';
        removeBtn.style.cursor = 'pointer';
        imgWrapper.appendChild(removeBtn);
        // Create the download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = dataUrl;
        downloadBtn.download = 'generated-image.png';
        downloadBtn.innerHTML = 'Download';
        downloadBtn.classList.add('download-btn');  // Use CSS class

        imgWrapper.appendChild(downloadBtn);

        const imageContainer = document.querySelector('.image-container');
        imageContainer.appendChild(imgWrapper);

        // Update the image count
        const imageCountElement = document.getElementById('imageCount');
        const currentCount = parseInt(imageCountElement.textContent, 10);
        imageCountElement.textContent = currentCount + 1;
    })
    .catch(function (error) {
        console.error('Error generating image:', error);
    });
});


document.getElementById('download-pdf-btn').addEventListener('click', function() {
    const imageContainer = document.querySelector('.image-container');
    const images = imageContainer.querySelectorAll('img');
    
    if (images.length === 0) {
        alert('No images to download.');
        return;
    }

    const pdfName = prompt('Enter the name for the PDF file:', 'generated-images');
    if (!pdfName) {
        alert('PDF name cannot be empty.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    images.forEach((img, index) => {
        if (index > 0) {
            doc.addPage();
        }
        const imgData = img.src;
        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    });

    doc.save(`${pdfName}.pdf`);
});


document.querySelector('.coffee-image img').addEventListener('click', function() {
    const kofiButton = document.querySelector('.kofi-button');
    kofiButton.scrollIntoView({ behavior: 'smooth' });

    // Function to toggle the shadow effect
    function toggleShadow(times) {
        if (times > 0) {
            kofiButton.style.transition = 'box-shadow 0.3s ease-in-out';
            if (document.documentElement.classList.contains('dark')) {
                kofiButton.style.boxShadow = '0 0 4px 4px rgba(0, 255, 255, 0.4)'; // Cyan shadow for dark mode
            } else {
                kofiButton.style.boxShadow = '0 0 10px 5px rgba(255, 165, 0, 0.7)'; // Orange shadow for light mode
            }
            kofiButton.style.borderRadius = '75%'; // Ensure the shadow is rounded

            setTimeout(() => {
                kofiButton.style.boxShadow = 'none';
                setTimeout(() => {
                    toggleShadow(times - 1);
                }, 300); // Delay before the shadow comes back
            }, 700); // Duration of the shadow effect
        }
    }

    toggleShadow(2);
});

