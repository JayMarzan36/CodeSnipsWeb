const seperators = [" ", ":", "(", ")", '"', "'", ";", "=", "#", "\n"];

function findSnip(seperators, input, snip) {
    for (j of seperators) {

        let currentText = input.split(j);

        for (k of currentText) {

            if (k === snip) return true;

            for (l of seperators) {

                let currentText2 = k.split(l);

                for (m of currentText2) {

                    if (m === snip) return true;

                }
            }
        }
    }
    return false;
}


async function get_File_Contents(current_File_Loc, current_Snip, file_contents) {
    try {
        const res = await fetch(current_File_Loc, { method: "FILE" });
        let data = await res;
        data = data.text();
        data.then((result) => {
            result = JSON.parse(result);
            console.log(result);
            const contents = result["contents"];
            
            for (i of contents) {

                const temp_Div = document.createElement("div");
                temp_Div.innerHTML = i;

                const space_Div = document.createElement("div");
                space_Div.id = "spacer";

                const contain_Snip = findSnip(seperators, i, current_Snip);

                if (contain_Snip) {
                    temp_Div.id = "snip";
                }

                file_contents.appendChild(temp_Div);
                file_contents.appendChild(space_Div);
            }
        });
    } catch (error) {
        return error;
    }
}
