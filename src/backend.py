import re
import os
from http.server import BaseHTTPRequestHandler, HTTPServer



class HTTPRequestHandler(BaseHTTPRequestHandler):
    
    def do_INIT(self):
        listOfFiles = []
        #if running from src folder "data"
        # folderStart = "data"
        folderStart = "data"
        for filename in os.listdir(folderStart):
            listOfFiles.append(filename)

        if (len(listOfFiles) >= 1):
            self.send_response(200)
            self.send_header('Content-Type', 'text.html')
            self.end_headers()
            
            for file in listOfFiles:
                file = folderStart + "/" + file
                self.wfile.write(bytes(open(file).read(), 'utf-8'))
        
        else:
            self.send_response(404, 'No files found')
            self.end_headers()

    def do_GET(self):
        file_requested = self.path.split('/')[-1].split('?')[0]
        
        print("File requested: ", file_requested)
        
        file_path = os.path.join(os.getcwd(), file_requested)
        print(file_path)
        
        if os.path.isfile(file_requested):
            self.send_response(200)
            self.send_header('Content-Type', 'text.html')
            self.end_headers()
            self.wfile.write(bytes(open(file_requested).read(), 'utf-8'))

        else:
            print(f"404 Not Found: {file_requested}")
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), HTTPRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()