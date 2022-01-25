
let fs=require("fs")
let path=require("path")
let inputArr=process.argv.slice(2)
let treeObj=require("./tree")
let organiseObj=require("./organise")
let helpObj=require("./help")



let command=inputArr[0]

switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    
    case "organise":
        //console.log(inputArr[1])
        organiseObj.organiseKey(inputArr[1])
        break;
    
    case "help":
        helpObj.helpKey();
        break;

    default :
        console.log("kindly enter correct command")
        break;
}




