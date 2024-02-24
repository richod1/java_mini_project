const {extname,basename}=require("node:path")
const {globSync}=require('glob')

const appModelFiles=globSync('../appModels/**/*.js');
const pattern='../../models/**/*.js';

const modelFiles=globSync(pattern).map((filePath)=>{
    const fileNameWithExtension=basename(filePath);
    const fileNameWithoutExtension=fileNameWithExtension.replace(extname(fileNameWithExtension),''
    )
    return fileNameWithoutExtension;
});

const constrollersList = [];
const appModelList=[];
const entityList=[];
const troutesList=[];

for(const filePath of appModelFiles){
    const fileNameWithExtension=fileNameWithExtension.replace(
        extname(),''
    );

    const firstChar = fileNameWithExtension.charAt(0);
    const modelName = fileNameWithExtension.replace(firstChar, firstChar.toUpperCase());
    const fileNameLowerCaseFirstChar = fileNameWithExtension.replace(
        firstChar,
        firstChar.toLowerCase()
        );
        const entity = fileNameWithExtension.toLowerCase();
    
        controllerName = fileNameLowerCaseFirstChar + 'Controller';
        constrollersList.push(controllerName);
        appModelList.push(modelName);
        entityList.push(entity);
    
        const route = {
        entity: entity,
        modelName: modelName,
        controllerName: controllerName,
        };
        troutesList.push(route);
    }
    
    module.exports = { constrollersList, appModelList, modelFiles, entityList, troutesList };
