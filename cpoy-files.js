let fs = require('fs')
let path = require('path');

function copyDictionary(dicPath){
    let p = path.resolve(dicPath);
    let files = fs.readdirSync(p);
    for(file of files){
        if(file.endsWith('.DS_Store') || file.endsWith('.ts')){
            continue;
        }
        let absolutePath = path.resolve(path.join(p, file));
        if(fs.statSync(absolutePath).isDirectory()){
            copyDictionary(absolutePath);
        } else {
            copyFile(absolutePath)
        }
    }
}

function copyFile(filePath){
    let relativePath = path.relative('./src/themes', filePath);
    let dict = './built/themes/' + findParentDict(relativePath);
    if(!fs.existsSync(dict)){
        fs.mkdirSync(dict)
    }
    fs.copyFileSync(filePath, './built/themes/' + relativePath)
}

function findParentDict(filePath){
    let arr =  filePath.split('/');
    return arr.slice(0, arr.length - 1).join('/');
}

copyDictionary('./src/themes');