let fs=require("fs")
let path=require("path")
function fnTree(dirpath){
    if(dirpath==undefined){
        treeHelper(process.cwd(),"");
        return
    }
    else{
        doesExist=fs.existsSync(dirpath);
        if(doesExist==true){
            treeHelper(dirpath,"");
        }
        else{
            console.log("path does not exist");
            return;
        }
    }
}
function treeHelper(dirpath,indent){
    let isFile=fs.lstatSync(dirpath).isFile();
    if(isFile){
        let fileName=path.basename(dirpath);
        console.log(indent + "|===" + fileName);
    }
    else{
        let dirName=path.basename(dirpath);
        console.log(indent + "|===" +  dirName);
        let children=fs.readdirSync(dirpath);
        for(let i=0;i<children.length;i++){
            let childPath=path.join(dirpath,children[i]);
            treeHelper(childPath,indent+"\t");
        }
    }
}
module.exports={
    treeKey : fnTree
}