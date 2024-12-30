import re, json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer


class HTTPRequestHandler(BaseHTTPRequestHandler):

    def do_FILE(self):
        folderStart = "data"
        file_contents = {}
        temp = []
        file_requested = self.path.split("/")[-1].split("?")[0]
        file_requested = folderStart + '/' + file_requested
        print("File requested: ", file_requested)

        file_path = os.path.join(os.getcwd(), file_requested)
        print(file_path)

        if os.path.isfile(file_requested):
            self.send_response(200)
            self.send_header("Content-Type", "text.html")
            self.end_headers()
            
            with open(file_requested, "r") as f:
                for line in f:
                    temp.append(line)
                f.close()
            
            file_contents['contents'] = temp
            final_contents = json.dumps(file_contents)
            
            self.wfile.write(bytes(final_contents, "utf-8"))
            

        else:
            print(f"404 Not Found: {file_requested}")
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        file_requested = self.path.split("/")[-1].split("?")[0]

        print("File requested: ", file_requested)

        file_path = os.path.join(os.getcwd(), file_requested)
        print(file_path)

        if os.path.isfile(file_requested):
            self.send_response(200)
            self.send_header("Content-Type", "text.html")
            self.end_headers()
            self.wfile.write(bytes(open(file_requested).read(), "utf-8"))

        else:
            print(f"404 Not Found: {file_requested}")
            self.send_response(404)
            self.end_headers()

    def do_SNIP(self):
        snippet = self.path.split("/")[-1].split("?")[0]

        print("snip requested: ", snippet)

        listOfFiles = []
        fileArray = {}
        # if running from src folder "data"
        # folderStart = "data"
        folderStart = "data"
        for filename in os.listdir(folderStart):
            listOfFiles.append(filename)

        if len(listOfFiles) >= 1 and snippet != "" and snippet != " ":
            self.send_response(200)
            self.send_header("Content-Type", "text.html")
            self.end_headers()

            temp = []
            for file in listOfFiles:
                temp_File_Name = file
                if (snippet == "ALLGOOD"):
                    temp.append(temp_File_Name)
                else:
                    file = folderStart + "/" + file
                    with open(file, "r") as f:
                        print(file)
                        for line in f:
                            split_Line = re.split(r'["():#\s]+', line)
                            for i in split_Line:
                                if str(i) == snippet:
                                    print(split_Line)
                                    temp.append(temp_File_Name)
                                    break
                    f.close()

            fileArray["found"] = temp
            final_Array = json.dumps(fileArray)
            self.wfile.write(bytes(final_Array, "utf-8"))

        else:
            self.send_response(404, "No files found")
            self.end_headers()


    def do_POST(self):
        if self.path == "/upload":
            content_length = int(self.headers['Content-length'])
            
            messy_data = self.rfile.read(content_length).decode('utf-8');
            clean_data = json.loads(messy_data)
            
            file_name = clean_data.get('file_Name')
            file_content = clean_data.get('file_Content')
            
            save_path = os.path.join('data', file_name)
            os.makedirs('data', exist_ok = True)
            
            with open(save_path, 'w') as file:
                file.write(file_content)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            response = "GOOD"
            self.wfile.write(bytes(response, 'utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    server = HTTPServer(("localhost", 8000), HTTPRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()
