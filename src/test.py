#print("this is a test")
import re
def test():
    print("This is to test the function")

number = 2 + 2


import os
fileArray = {}
        #if running from src folder "data"
        # folderStart = "data"
folderStart = "data"
listOfFiles = []

for filename in os.listdir(folderStart):
    listOfFiles.append(filename)

snippet = "test"
temp = []
for file in listOfFiles:
    temp_File_Name = file
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

print(fileArray)