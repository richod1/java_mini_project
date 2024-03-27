const useDate = ({ settings }) => {
  const { IDURAR_app_date_format } = settings;

  const dateFormat = IDURAR_app_date_format;

  return {
    dateFormat,
  };
};

module.exports = useDate;
