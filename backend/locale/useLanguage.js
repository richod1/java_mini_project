const {readBySettingKey}=require("../middlewares/settings");

async function getCurrentLanguage(){
    const {settingValue}=await readBySettingKey({settingKey:'language'});
    return settingValue;
}

const getLabel=(lang,key)=>{
    try{
        const lowerCaseKey=key.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/ /g, '_');

        if(lang[lowerCaseKey]) return lang[lowerCaseKey];
        else{
            const remove_underscore_fromKey=lowerCaseKey.replace(/ _/g,'').split(' ');
            const conversationOfAllFirstCharacterofEachWord=remove_underscore_fromKey.map((word)=>word[0].toUpperCase() + word.join(' '));
            const label=conversationOfAllFirstCharacterofEachWord.join(' ');

            return label;
            
        }
    }catch(err){
        return success({msg:"No translate found"});
    }
}


const useSelector=(lang)=>{
    const filePath=`./translation/${lang}`;
    const defaultfilePath=`./translation/en_us`;
    const currentTranslation=require(filePath);
    if(currentTranslation){
        return currentTranslation;
    }else{
        const langFile=require(defaultfilePath);
        return langFile;
    }
}


const useLanguage=({selectedLang})=>{
    const lang=useSelector(selectedLang);
    const translate=(value)=>{
        const text=getLabel(lang,value);
        return text;
    }

    return translate;
}