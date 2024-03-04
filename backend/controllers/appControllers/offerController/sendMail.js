    const fs = require('node:fs');
    const custom = require('../../pdfController');
    const { SendOffer } = require('../../../emailTemplate/SendEmailTemplate');
    const mongoose = require('mongoose');
    const OfferModel = mongoose.model('Offer');
    const { Resend } = require('resend');
    const { loadSettings } = require('../../../middlewares/settings/loadSettings');
    const { useAppSettings } = require('../../../settings/useAppSettings');

    const mail = async (req, res) => {
    const { id } = req.body;

    // Throw error if no id
    if (!id) {
        throw { name: 'ValidationError' };
    }

    const result = await OfferModel.findOne({
        _id: id,
        removed: false,
    }).exec();

    // Throw error if no result
    if (!result) {
        throw { name: 'ValidationError' };
    }

    // Continue process if result is returned
    const { lead } = result;
    const { name } = lead;
    const email = lead[lead.type].email;

    if (!email) {
        return res.status(403).json({
        success: false,
        result: null,
        message: 'Lead has no email , add new email and try again',
        });
    }

    const modelName = 'Offer';

    const fileId = modelName.toLowerCase() + '-' + result._id + '.pdf';
    const folderPath = modelName.toLowerCase();
    const targetLocation = `src/public/download/${folderPath}/${fileId}`;

    await custom.generatePdf(
        modelName,
        { filename: folderPath, format: 'A4', targetLocation },
        result,
        async () => {
        const { id: mailId } = await sendViaApi({
            email,
            name,
            targetLocation,
        });

        if (mailId) {
            OfferModel.findByIdAndUpdate({ _id: id, removed: false }, { status: 'sent' })
            .exec()
            .then((data) => {
                // Returning successfull response
                return res.status(200).json({
                success: true,
                result: mailId,
                message: `Successfully sent offer to ${email}`,
                });
            });
        }
        }
    );
    };

    const sendViaApi = async ({ email, name, targetLocation }) => {
        try {
            const resend = new Resend(process.env.RESEND_API);
        //   fake domain detailes
            const settings = await loadSettings();
            const octa_app_email = 'noreply@octa.com';
            const octa_app_company_email = settings['octa_app_company_email'];
            const company_name = settings['company_name'];
            // Read the file to be attatched
            const attatchedFile = fs.readFileSync(targetLocation);
        
            // Send the mail using the send method

            /**if resend api dont work like the other time when the 
             * domain fucked off use mailgun wich is easy to intergrate
             */
            const { data } = await resend.emails.send({
                from: octa_app_email,
                to: email,
                subject: 'Offer From ' + company_name,
                reply_to: octa_app_company_email,
                attachments: [
                {
                    filename: 'Offer.pdf',
                    content: attatchedFile,
                },
                ],
                html: SendOffer({ name, title: 'Offer From ' + company_name }),
            });
        
            return data;
            } catch (error) {
            throw new error('error while sending email ');
            }
        };

    module.exports = mail;