const filePath = "resources/files/contents"

var LoadResourcesUtils = {};

LoadResourcesUtils.loadJSON = async function(pageName) {
    let fileName = `${filePath}/${pageName}.json`; 
    try {
        let file = await fetch(fileName)
        let data = await file.json()
        return data;
    }
    catch (e) {
        throw new Error(`Error while fetching file ${fileName}!`);
    }
}

export {LoadResourcesUtils}