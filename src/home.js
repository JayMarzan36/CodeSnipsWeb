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




// const testText2 = ["let navOpen = false;", "const navBar = document.getElementById(nav-bar-content);"];

// console.log(findSnip(testText2, [" ", ",", "(", ")"], "nav-bar-content"));

function findSnip(fileArray, seperators, input) {
    for (i of fileArray) {

        for (j of seperators) {

            let currentText = i.split(j);

            for (k of currentText) {

                if (k === input) return true;

                for (l of seperators) {

                    let currentText2 = k.split(l);

                    for (m of currentText2) {

                        if (m === input) return true;

                    }
                }
            }
        }
    }
    return false;
}



const server_loc = "http://localhost:8000/";

async function getInitial() {
    try {
        const res = await fetch(server_loc, { method: "INIT" });
        let data = await res;
        console.log(data);
    } catch (error) {
        return error;
    }
}

getInitial();