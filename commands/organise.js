let fs=require("fs")
let path=require("path")
let types={
    media : ["mp4","mp3","mkv"],
    pepcodingTestCase : ["txt","tex"],
    docs : ["docx","doc","pdf","xlsx","vls","odt"],
    app : ['exe','dmg','pkg','deb'],
    images : ['jpeg','jpg']
}
function fnOrganise(dirpath){
    let destPath;
    if(dirpath==undefined){
        destPath=process.cwd();
    }
    else{
        doesExist=fs.existsSync(dirpath);
        if(doesExist==true){
            destPath=path.join(dirpath,"organisedFiles");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("path does not exist");
            return;
        }
        organiseHelper(dirpath,destPath);
    }
}
function organiseHelper(dirpath,destPath){
    let childNames=fs.readdirSync(dirpath);
    for(let i=0;i<childNames.length;i++){
        let childAdress=path.join(dirpath,childNames[i]);
        let isFile=fs.lstatSync(childAdress).isFile();
        if(isFile){
            let category=getCategory(childNames[i]);
            //console.log(childNames[i],"->",category);
            sendFiles(childAdress,destPath,category);
        }
    }
}

function sendFiles(childAdress,destPath,category){
    let categoryPath=path.join(destPath,category);
    //console.log(destPath);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName=path.basename(childAdress);
    let destfilepath=path.join(categoryPath,fileName);
    fs.copyFileSync(childAdress,destfilepath);
    fs.unlinkSync(childAdress);
    console.log(fileName ,"copies to ", category);
}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let cTypeArr=types[type];
        for(let i=0;i<cTypeArr.length;i++){
            if(cTypeArr[i]==ext){
                return type;
            }
        }
    }
    return "others";
}
module.exports={
    organiseKey : fnOrganise
}