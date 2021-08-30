import React from 'react';
import '../assets/styles/home.css';

const Home = () => {

    return (
        <div className="text-center md:m-24">
            <div>
                <h2 className="welcome-title"><span className="dark:text-gray-200">Welcome to BikeSleuth!</span></h2>
            </div>
            <div className="pt-4">
                <p className="welcome-text dark:text-gray-200 md:w-8/12">BikeSleuth is designed to quickly reunite a rider and their missing bicycle. With this app, you are able to upload your bicycle information at any time and in the event the bike becomes lost or stolen, you can update your bike's status as missing and your bike will be automatically added to our search page allowing other users in your area to keep an eye out for your missing bicycle. </p>
            </div>
            <div>
            <h4 className="how-to"><span className="dark:text-gray-200">How Does It Work!?</span></h4>
            </div>
            <div>
                <div className="max-w-md mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-md overflow-hidden md:max-w-4xl">
                    <div className="md:flex">
                        <div className="how-to-list p-8">
                            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Register Your Bike</p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">It’s simple. Sign up and register your bike(s). Enter the brand, model, year, serial number, description and your city.</p><br />
                            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Update Your Bikes Status</p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">If your bike goes missing, update it status to missing. It will then be added to the list of missing bikes in the community. Notifying your fellow bikeslueths to keep an eye out for it. </p><br />
                            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Share Information</p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">If a fellow bikeslueth spots or finds your bike they will be able to message personally.</p><br />
                            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">You Get Your Bike Back</p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">With the help of your fellow bikeslueth you have the information necessary to recover your missing bike.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;