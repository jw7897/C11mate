// Local Storage Implementation Based On: https://www.youtube.com/watch?v=wodWDIdV9BY&ab_channel=KevinPowell/
var darkBody = document.body;
var darkContentDiv = document.getElementById("content");
var darkLabel = document.getElementById("destLabel");
// Check for previously saved Dark Mode Settings in localStorage
let darkBodyStorage = localStorage.getItem('darkModeBody');
let darkContentDivStorage = localStorage.getItem('darkModeDiv');
let darkLabelStorage = localStorage.getItem('darkModeLabel');
// Dark Mode Checkbox Selector
const darkModeToggle = document.querySelector('#darkTrigger');
//Enable Dark Mode
const enableDarkMode = () => {
    // Enable Dark Mode CSS Features
    darkBody.classList.add("darkModeBody");
    darkContentDiv.classList.add("darkModeDiv");
    darkLabel.classList.add("darkModeLabel");
    // Update Dark Mode state to localStorage (enabled)
    localStorage.setItem('darkModeBody', 'enabled');
    localStorage.setItem('darkModeDiv', 'enabled');
    localStorage.setItem('darkModeLabel', 'enabled');
}
//Disable Dark Mode Features
const disableDarkMode = () => {
    // Disable Dark Mode CSS Features
    darkBody.classList.remove("darkModeBody");
    darkContentDiv.classList.remove("darkModeDiv");
    darkLabel.classList.remove("darkModeLabel");
    // Update Dark Mode state to localStorage (disabled)
    localStorage.setItem('darkModeBody', 'disabled');
    localStorage.setItem('darkModeDiv', 'disabled');
    localStorage.setItem('darkModeLabel', 'disabled');
}
// If a user has already enabled dark mode on previous visit, enable dark mode
if (darkBodyStorage === 'enabled') {
    enableDarkMode();
    //Automatically check checkbox slider if Dark Mode is already on
    darkModeToggle.checked = true;
}
// Event Listener for Checklist Toggle
darkModeToggle.addEventListener('change', () => {
    // Update Dark Mode Variables on Change
    darkBodyStorage = localStorage.getItem('darkModeBody');
    darkContentDivStorage = localStorage.getItem('darkModeDiv');
    darkLabelStorage = localStorage.getItem('darkModeLabel');
    // Change Modes
    // If not enabled, enable
    if (darkBodyStorage !== 'enabled') {
        enableDarkMode();
        // If enabled, disable
    } else {
        disableDarkMode();
    }
});
