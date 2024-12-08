let navOpen = false;

const navBar = document.getElementById("nav-bar-content");
const mask = document.getElementById("mask");
const searchInput = document.getElementById("main-search-in");
const body2 = document.getElementById("body-2");


function toggleMask() {
    navOpen = !navOpen;
    navBar.dataset.open = `${navOpen}`;
    mask.dataset.open = `${navOpen}`;
    body2.dataset.open = `${navOpen}`;
    searchInput.open = `${navOpen}`;
}


document.getElementById("menu-btn").addEventListener("click", () => {
    toggleMask();
});

mask.addEventListener("click", () => {
    toggleMask();
});