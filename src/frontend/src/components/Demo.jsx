import React, { useState, useEffect, useRef } from 'react';
import Typed from 'react-typed';

const Demo = () => {
    const [currentQAIndex, setCurrentQAIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const demoRef = useRef(null);
    
    const userQuestions = [
        "What is the company's expectations in the first 90 days of me joining?",
        "Create a function notifyUser every week they have a competition coming up in my api",
        "How might we be able to boost sales next quarter?"
    ];
    
    const botAnswers = [
        `The company is very excited to have you on board. We also expect you to be able to work independently and be able to communicate effectively. Practically, you will be expected to start learning to use our tools, workflows and helping your Central Manager. You'll start to be assigned tasks and projects to do such as shadowing and taking notes at meetings. Welcome! <br><br><a href='https://example.com' class='text-blue-500 underline' target='_blank' rel='noopener noreferrer'>Source: employeeHandbook.pdf (p. 57)</a>`,
        `To implement this feature, you can use a scheduling library like "node-cron". Below is a code example about how this could look:

        <br>
        
        Since you have the package node-cron already installed: in your <code>competitionController.js</code> file you may add something like this:
        
        <br>
                
        <pre style="font-size: 0.9em;">
        const cron = require('node-cron');
        
        // This function would actually send the notifications
        const notifyUsersAboutUpcomingCompetitions = async () => {
            try {
                // Fetch the users with an upcoming competition
                const users = await getUsersWithUpcomingCompetitions();
        
                for (let user of users) {
                    const message = "You have a competition coming up next week.";
                    await userController.notifyUser(user._id, "system", message, "competition", competition._id);
                }
            } catch (e) {
                console.log('Failed to notify users: ', e);
            }
        };
        
        // Now, we use node-cron to schedule this task to run at '0 0 * * SUN' -> every Sunday at 12AM (week start)
        cron.schedule('0 0 * * SUN', notifyUsersAboutUpcomingCompetitions);
        </pre>
        
        <br>
        
        The method <code>getUsersWithUpcomingCompetitions()</code> retrieves those users who have a competition in the following week. 
        
        <br><br>
        
        <a href='https://example.com' class='text-blue-500 underline' target='_blank' rel='noopener noreferrer'>Sources: walletController.js, userController.notifyUser, notificationController.createNotification</a>
        `,
        `Consider running targeted marketing campaigns such as a collaboration with musicians in your domain to attract a wider audience. For context, consider the impact per dollar you had in terms of monthly recurring revenue: the most efficient campaigns were music creators sharing the platform. <br><br> <a href='https://example.com' class='text-blue-500 underline' target='_blank' rel='noopener noreferrer'>Sources: 2023SalesSummary.pdf (p. 33, 87, 113)</a>`
    ];

    const contextOfQuestionAnswers = [
        "Employee Handbooks attached.",
        "Codebase attached.",
        "Sales Summary attached."
    ];

    useEffect(() => {
        console.log("Demo ref changed: ", demoRef.current);
        const currentDemo = demoRef.current;  // Capture the current value
    
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            console.log("Intersection Ratio:", entry.intersectionRatio);
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, {
            threshold: 0.4 //has to be 40% visible to trigger
        });
        
    
        if (currentDemo) {
            observer.observe(currentDemo);
        }
    
        return () => {
            if (currentDemo) {
                observer.unobserve(currentDemo);
            }
        };
    }, []);
    

    useEffect(() => {
        console.log("Visibility changed: ", isVisible);
    
        // Calculate the duration based on the answer's length
        const answerLength = botAnswers[currentQAIndex].length;
        const durationToRead = answerLength * 20;  // 20ms per character, adjust as needed
    
        const timer = setTimeout(() => {
            if (!isVisible) return;
    
            if (currentQAIndex < userQuestions.length - 1) {
                setCurrentQAIndex(currentQAIndex + 1);
            } else {
                setCurrentQAIndex(0);
            }
        }, durationToRead);
    
        return () => clearTimeout(timer);
    }, [currentQAIndex, isVisible, botAnswers]);
    
    
    

    return (
        <div className='w-full py-10 px-4 bg-white' ref={demoRef}>
            <div className='max-w-[1240px] mx-auto flex flex-col items-center gap-8'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>It's as easy as...</h1>
                <p 
                    className='md:text-2xl text-xl font-bold text-gray-500 onceBounce'
                    key={contextOfQuestionAnswers[currentQAIndex]}
                >
                    {contextOfQuestionAnswers[currentQAIndex]}
                </p>




                {/* User's question */}
                <div className='self-end p-4 rounded-3xl rounded-br-sm bg-[#00df9a] shadow-md max-w-[60%] break-words'>
                    {userQuestions[currentQAIndex]}
                </div>
                {/* Bot's response with dynamic typing */}
                <div className='self-start p-4 rounded-3xl rounded-bl-sm bg-gray-200 shadow-md max-w-[90%] w-full break-words overflow-x-hidden'>
                    <Typed
                        key={currentQAIndex}
                        strings={[botAnswers[currentQAIndex]]}
                        typeSpeed={5}
                        startDelay={1000}
                        showCursor={false}
                        dangerouslySetInnerHTML={{ __html: botAnswers[currentQAIndex] }} // Allows rendering of HTML tags
                    />
                </div>
            </div>
        </div>
    );
};

export default Demo;
