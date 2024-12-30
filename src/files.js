let good_Upload = false;

const input_File_Form = document.getElementById("input-file-form");
const input_File = document.getElementById("input-file");

update_Found("ALLGOOD", (update) => {
    update_Files_List(found_Files);
});



input_File.addEventListener("change", e => {
    const file = input_File.files[0];
    console.log(file);

    let file_Object = {
        "file_Name": file["name"],
        "file_Content": ""
    }

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const content = event.target.result;
            file_Object["file_Content"] = content;
            console.log(content);
            console.log(file_Object);


            fetch(server_loc + "upload", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(file_Object)
            })
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    if (result === "GOOD") {
                        good_Upload = true;
                        console.log(good_Upload);
                        if (good_Upload) {
                            update_Found("ALLGOOD", (update) => {
                                update_Files_List(found_Files);
                            });
                        }

                    }
                })
                .catch(error => {
                    console.log(error);
                })



        };

        reader.onerror = function () {
            console.log("Error");
        };

        reader.readAsText(file);
    }

});