var versions = require('./versions.json');
const fs = require('fs');

function getAllFunctions(){
    return versions;
}
function getFunction(functionName){
   return versions[functionName];
}

async function addNewFunction(functionName,addedVersion){
    var key = functionName;
    var object =  {add:[addedVersion],mod:[],dep:[]};
    
    fs.readFile('versions.json',function(err,content){
        if(err) throw err;
            var parseJson = JSON.parse(content);
            parseJson[key] = object;
        fs.writeFile('versions.json',JSON.stringify(parseJson),function(err){
            if(err) throw err;
        });
    });
}

function deprecateFunction(functionName,depricatedVersion){
    fs.readFile('versions.json',function(err,content){
        if(err) throw err;
            var parseJson = JSON.parse(content);
            parseJson[functionName].dep.push(depricatedVersion);
        fs.writeFile('versions.json',JSON.stringify(parseJson),function(err){
            if(err) throw err;
        });
    });
}

function modifyVersionFunction(functionName,modifiedVersion){
    fs.readFile('versions.json',function(err,content){
        if(err) throw err;
            var parseJson = JSON.parse(content);
            parseJson[functionName].mod.push(modifiedVersion);
        fs.writeFile('versions.json',JSON.stringify(parseJson),function(err){
            if(err) throw err;
        });
    });
}
 
const i=getAllFunctions();
console.log(i);