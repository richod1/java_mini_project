const useAppSettings=()=>{
    let settings={};
    settings['octa_app_email']='noreply@octa.com';
    settings['octa_base_url']='https://cloud.octa.com'; //this is a fake domain
    return settings;
}

module.exports=useAppSettings;