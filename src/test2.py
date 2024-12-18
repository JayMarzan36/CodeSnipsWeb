import os
listOfFiles = []

#if running from src folder "data"
# folderStart = "data"

folderStart = "CodeSnipsWeb\src\data"

for filename in os.listdir(folderStart): 
    listOfFiles.append(filename)
    
for j in listOfFiles:
    print(j)