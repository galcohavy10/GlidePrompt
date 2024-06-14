import React from 'react';

const Contact = () => {
    return (
        <div className='text-white px-4 py-5'>
            <div className='max-w-[1240px] w-full mx-auto text-left flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold p-2 text-center md:text-left'>
                    Contact Information
                </p>
                
                <div className='my-4'>
                    <h2 className='md:text-xl sm:text-lg font-bold p-2'>
                        Founder's Message:
                    </h2>
                    <p className='text-gray-500 mt-2 p-2'>
                        Hi, I'm the founder of this tool. <br/> My email is gal@glideprompt.com. <br/> You may reach me directly there. 
                    </p>
                </div>
                
                <div className='my-4'>
                    <h2 className='md:text-xl sm:text-lg font-bold p-2'>
                        Special Quotes:
                    </h2>
                    <p className='text-gray-500 mt-2 p-2'>
                        Call or text me for a quote on using the service for larger enterprises, startups, or educators who need customized features.
                    </p>
                </div>

                <div className='my-4'>
                    <h2 className='md:text-xl sm:text-lg font-bold p-2'>
                        Feedback Welcome:
                    </h2>
                    <p className='text-gray-500 mt-2 p-2'>
                        My email and phone are open for feedback of any sort, I'm commited to the improvement of GlidePrompt. <br></br>Please be nice though, I'm a normal human guy with feelings!
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Contact;
