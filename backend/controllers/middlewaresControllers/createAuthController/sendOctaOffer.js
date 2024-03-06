const { afterRegistrationSuccess } = require('../../../emailTemplate/EmailVerification');

const { Resend } = require('resend');

const sendIdurarOffer = async ({ email, name }) => {
    const resend = new Resend(process.env.RESEND_API);

    const { data } = await resend.emails.send({
        from: 'hello@octa.com',
        to: email,
        subject: 'Customize Octa ERP CRM or build your own SaaS',
        html: afterRegistrationSuccess({ name }),
    });

    return data;
};

module.exports = sendOctaOffer;