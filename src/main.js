const menuBtn = document.getElementById("nav-menu");
const menuContent = document.getElementById("menu-content");
const mask = document.getElementById("mask");
const search = document.getElementById("main-search");

let menuOpen = false;

menuBtn.addEventListener("click", e => {
    openMenu();
});

mask.addEventListener("click", () => {
    openMenu();
});


function openMenu() {
    menuOpen = !menuOpen;
    menuContent.dataset.open = menuOpen;
    mask.dataset.open = menuOpen;

    search.dataset.menu = menuOpen;
    if (menuOpen) {
        search.disabled = true;
    } else {
        search.disabled = false;
    }
}