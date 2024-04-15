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
            Website : <a href="https://www.frimpSoft.com">www.frimpSoft.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/richod1/java_mini_project">
              https://github.com/richod1/java_min_project
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.frimpSoft.com/contact-us/`);
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
