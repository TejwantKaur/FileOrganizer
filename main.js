import fs from 'fs'
import path from 'path'

let types = {
    music: [ "mp3"],
    video: ["mp4"],
    documents: ['docx', 'doc', 'pdf'],
    media: ["mkv" , "heic" , "png" ],
}

let inputArr = process.argv.slice(2)

if(inputArr[0] == 'organize'){
    organizeFolder(inputArr[1])
}
else{
    console.log("Wrong Command")
}

function organizeFolder(srcFolderPath){

    let destFolder;
    if(srcFolderPath == undefined){
        destFolder == process.cwd()
        return
    }

    else{
        if(fs.existsSync(srcFolderPath)){
            // 1 --> organiseFolder
            destFolder = path.join(srcFolderPath, "newFolder")

            if(!fs.existsSync(destFolder)){
                fs.mkdirSync(destFolder)
            }
        }
    }
    helper(srcFolderPath,destFolder)
}

function helper(srcFolder, destFolder){
    let childNames = fs.readdirSync(srcFolder)
    

    for(let i=0; i<childNames.length; i++){
        
        // get category 
        let childSrcAdd = path.join(srcFolder,childNames[i])

        // send files
            if(fs.lstatSync(childSrcAdd).isFile()){
            // let childFileName = fs.baseline(childNames[i])
            let cName = getCategory(childNames[i])

            // let childDestAdd = path.join(destFolder,cName)
            sendFiles(childSrcAdd,destFolder,cName)
        }
        // else{
        //     helper(childNames[i], destFolder)
        // }
    }
}

function getCategory(name){

    let ext = path.extname(name)
    ext = ext.slice(1)

    for(let type in types){
        let ctype = types[type]
        for(let i=0; i<ctype.length; i++){
            if(ctype[i]==ext){
                return type;
            }
        }
    }
    return 'other'
}

function sendFiles(src, dst, cat){
    let catPath = path.join(dst,cat)

    if(!fs.existsSync(catPath)){
        fs.mkdirSync(catPath)
    }
    let file = path.basename(src)
    let childDestAdd = path.join(catPath,file)

    fs.copyFileSync(src,childDestAdd);
}
