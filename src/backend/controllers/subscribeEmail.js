import dotenv from 'dotenv';
dotenv.config();
import mailchimp from '@mailchimp/mailchimp_marketing';

const mailChimpKey = process.env.MAILCHIMP_KEY;
const mailChimpAudienceID = process.env.MAILCHIMP_LIST_ID;
const mailChimpServerPrefix = mailChimpKey.split('-')[1];  // Extracts the server prefix

// Initialize the Mailchimp client
mailchimp.setConfig({
    apiKey: mailChimpKey,
    server: mailChimpServerPrefix
});

export async function subscribeEmail(email) {
        console.log("Mailchimp Key:", mailChimpKey);
        console.log("Mailchimp Audience ID:", mailChimpAudienceID);
        console.log("Mailchimp Server Prefix:", mailChimpServerPrefix);
    
        try {
            const response = await mailchimp.lists.addListMember(mailChimpAudienceID, {
                email_address: email,
                status: "subscribed"
            });
    
            console.log('User added to Mailchimp list successfully:', response);
        } catch (error) {
            console.error('Exception adding user to Mailchimp:', error.response ? error.response.body : error.message);
            throw error;  // Propagate the error to the caller
        }
};