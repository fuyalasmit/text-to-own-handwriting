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