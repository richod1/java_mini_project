import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'IDURAR'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://www.IDURARapp.com">www.IDURARapp.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/IDURAR/IDURAR-erp-crm">
              https://github.com/IDURAR/IDURAR-erp-crm
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.IDURARapp.com/contact-us/`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
