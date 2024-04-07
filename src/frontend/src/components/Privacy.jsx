import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className='text-white px-4 py-5'>
            <div className='max-w-[1240px] w-full mx-auto text-left flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold p-2 text-center md:text-left'>
                    Privacy Policy
                </p>
                <p className='text-xl font-medium p-2'>
                    Last updated: October 6th, 2023

                    <br /><br />
                    At GlidePrompt, we value your privacy and are committed to ensuring that your personal information is protected.

                    <br /><br />
                    <b>1. Collection of Information</b>
                    <br />
                    We collect information such as your name, email address, and other relevant data for the purpose of providing our services.

                    <br /><br />
                    <b>2. Use of Information</b>
                    <br />
                    We use the information we collect to offer you our products and services and to support our core business functions.

                    <br /><br />
                    <b>3. Sharing and Disclosure</b>
                    <br />
                    GlidePrompt does not sell or rent your personal information to third parties. Your information is transmitted
                    to OpenAI via their API: <a href="https://openai.com/enterprise-privacy" target="_blank" rel="noopener noreferrer">OpenAI Privacy Policy</a>
                    . Please read the OpenAI API policy to learn more about how they use your data and in agreeing
                    to this policy you are agreeing to the OpenAI privacy policy.


                    <br /><br />
                    <b>4. Your Choices</b>
                    <br />
                    You have the right to access, modify, or delete your personal information at any time.

                    <br /><br />
                    <b>5. Updates to this Policy</b>
                    <br />
                    We may update this policy from time to time. Any changes will be posted on this page.

                    <br /><br />
                    If you have any questions or concerns about this policy, please contact us at glideprompt@gmail.com.
                </p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
