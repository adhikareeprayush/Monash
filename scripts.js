
document.addEventListener('DOMContentLoaded', function () {
    // Stack to keep track of open menus
    let menuStack = [];

    // Back button element
    const backButton = document.querySelector('.back-btn');

    // Add event listeners to the dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event from bubbling up to parent menus
            e.preventDefault();

            const submenu = this.nextElementSibling; // Get the corresponding submenu

            if (submenu && !submenu.classList.contains('show')) {
                // Show the submenu and push it to the stack
                submenu.classList.add('show');
                menuStack.push(submenu);

                // Show back button when any dropdown is opened (even "Why Monash?")
                toggleBackButton(true);
            }
        });
    });

    // Function to close the most recent submenu
    function closeLatestSubmenu() {
        if (menuStack.length > 0) {
            const latestSubmenu = menuStack.pop(); // Remove the most recent submenu from the stack
            latestSubmenu.classList.remove('show');

            // Hide the back button if no more submenus are open
            if (menuStack.length === 0) {
                toggleBackButton(false);
            }
        }
    }

    // Add click event to the back button to close the most recently opened submenu
    backButton.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent this click from being detected as an outside click
        closeLatestSubmenu();
    });

    // Function to close all menus if clicked outside the dropdown
    document.addEventListener('click', function (e) {
        // Check if the click is outside the dropdown menus and not on the back button
        const isClickInsideMenu = e.target.closest('.side-menus');
        const isClickOnBackButton = e.target === backButton;

        if (!isClickInsideMenu && !isClickOnBackButton) {
            closeAllMenus();
        }
    });

    // Prevent closing when clicking inside the menu
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent Bootstrap's default behavior of closing menus on click
        });
    });

    // Function to close all dropdown menus
    function closeAllMenus() {
        while (menuStack.length > 0) {
            const submenu = menuStack.pop();
            submenu.classList.remove('show'); // Close all submenus
        }
        toggleBackButton(false); // Hide back button when all menus are closed
    }

    // Function to toggle the visibility of the back button
    function toggleBackButton(show) {
        if (backButton) {
            backButton.style.display = show ? 'inline-block' : 'none';
        }
    }
});


//add class .show to sidebar when hamburger is clicked
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');
const body = document.querySelector('body');
const sideNavBtn = document.querySelector('.sideNavBtn');

hamburger.addEventListener('click', function () {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    sideNavBtn.classList.toggle('show');

});

//close the sidebar when close-btn is clicked
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function () {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    sideNavBtn.classList.remove('show');
});

//close the sidebar when overlay is clicked
overlay.addEventListener('click', function () {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    sideNavBtn.classList.remove('show');
});
