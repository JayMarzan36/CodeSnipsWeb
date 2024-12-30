let navOpen = false;

const navBar = document.getElementById("nav-bar-content");
const mask = document.getElementById("mask");
const searchInput = document.getElementById("main-search-in");
const body2 = document.getElementById("body-2");
const file_List = document.getElementById("file-list");
const file_contents = document.getElementById("file-contents");

const server_loc = "http://localhost:8000/";

let init_Array = null;
let init_Array_Keys = null;
let found_Files = null;
let snippet = "";


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

searchInput.addEventListener("change", e => {
    file_contents.replaceChildren();
    snippet = e.target.value


    update_Found(snippet, (updated) => {
        update_Files_List(found_Files);
    });

});

async function send_Snip(user_input) {
    try {
        const res = await fetch(server_loc + user_input, { method: "SNIP" });
        const data = await res.text();
        const result = JSON.parse(data);
        console.log(result);
        return result;
        }
    catch (error) {
        return error;
    }
}

async function update_Found(snippet, callback) {
    const result = await send_Snip(snippet);
    found_Files = result;
    callback(found_Files);
}





function update_Files_List(list_Of_Files) {
    file_List.replaceChildren();
    const files = list_Of_Files["found"];
    console.log(files);

    for (i of files) {
        const temp_List = document.createElement("li");
        const temp_Link = document.createElement("a");
        const temp_Span = document.createElement("span");

        temp_Span.innerHTML = i;

        //temp_Link.href = `${server_loc}file.html?file=${i}&snip=${snippet}`;
        temp_Link.addEventListener("click" , e => {
            file_List.replaceChildren();
            searchInput.value = "";
            searchInput.ariaPlaceholder = "Search for file";
            console.log(e.target);
            let current_File = server_loc + e.target.innerHTML;
            let current_Snip = snippet;
            get_File_Contents(current_File, current_Snip, file_contents);

        });

        temp_Link.appendChild(temp_Span);
        temp_List.appendChild(temp_Link);

        file_List.appendChild(temp_List);

    }
}




async function getInitial() {
    try {
        const res = await fetch(server_loc, { method: "INIT" });
        let data = await res;
        data = data.text();
        data.then((result) => {
            result = JSON.parse(result);
            init_Array = result;
            init_Array_Keys = Object.keys(result);
        });

    } catch (error) {
        return error;
    }
}