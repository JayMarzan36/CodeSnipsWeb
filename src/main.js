
const search = document.getElementById("main-search");

let menuOpen = false;
let inputSnip = null;
let snippet;
const test = ["Will you let me 1", "Will you let me take a pic", "Will you let me 2", "Will you let me 3", "Will you let me 4", "Will you let me", "Will you let me", "Will you let me", "Will you let me", "Will you let me 1", "Will you let me", "Will you let me", "Will you let me 1", "Will you let me", "Will you let me", "Will you let me", "Will you let me"];


search.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        inputSnip = e.target.value;
        createContent(inputSnip);
    }
});





function createContent(toHighLight) {
    if (inputSnip !== null) {
        const testDiv = document.getElementById("test-div");
        let foundLine = false;
    
        snippet = toHighLight;
    
        testDiv.replaceChildren();
    
        for (i of test) {
            const words = i.split(" ");
    
            for (j of words) {
                if (j === snippet) {
                    foundLine = true;
                }
            }
            
    
            const line = document.createElement("div");
            
            if (foundLine) {
                line.id = "HighLightedLine";
            }
            
            
            line.className = "Line";
            line.innerHTML = i;
    
    
    
    
            testDiv.appendChild(line);
            foundLine = false;
        }
    }
    
}