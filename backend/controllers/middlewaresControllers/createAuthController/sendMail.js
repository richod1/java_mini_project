const { emailVerfication, passwordVerfication } = require('../../../emailTemplate/EmailVerification');

const { Resend } = require('resend');

const sendMail = async ({
    email,
    name,
    link,
    octa_app_email,
    subject = 'Verify your email | idurar',
    type = 'emailVerfication',
    emailToken,
    }) => {
    const resend = new Resend(process.env.RESEND_API);

    const { data } = await resend.emails.send({
        from: octa_app_email,
        to: email,
        subject,
        html:
        type === 'emailVerfication'
            ? emailVerfication({ name, link, emailToken })
            : passwordVerfication({ name, link }),
    });

    return data;
};

module.exports = sendMail;