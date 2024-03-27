const useAppSettings = () => {
  let settings = {};
  settings['IDURAR_app_email'] = 'noreply@IDURARapp.com';
  settings['IDURAR_base_url'] = 'https://cloud.IDURARapp.com';
  return settings;
};

module.exports = useAppSettings;
