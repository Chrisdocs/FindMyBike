import React, { useEffect } from "react";


function Success() {
    useEffect(() => {
        setTimeout(() => {
            window.location.assign("/");
        }, 4000);
    });

    return (
        <div className="object-center">
                <div className="home-container">
                <h2 className="welcome-title">
                    <span className="dark:text-gray-200">
                        Donation Successful!
                    </span>
                </h2>
                <div className="pt-4">
                    <p className="welcome-text dark:text-gray-200">
                        Thank you for your donation! Because of people like you,
                        the BikeSleuths can continue to help bike owners
                        nationwide recover their missing bikes.
                    </p>
                    <p className="welcome-text dark:text-gray-200">You will now be redirected to the home page.</p>
                </div>
                </div>
        </div>
    );
}

export default Success;
