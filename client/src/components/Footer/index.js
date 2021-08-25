import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import "../../assets/styles/footer.css";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Footer = () => {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    function submitCheckout() {
        getCheckout();
    }

    return (
        <div className=" footer-section">
            <footer className="footer-text dark:text-gray-400">
                <div>&copy; 2021 by UTA Coding Bootcamp Group 1</div>
                <div>
                    <div className="product">
                        <div className="description">
                            <h3>
                                Please consider a small donation to the
                                BikeSleuth team hard at work recovering lost
                                bicycles everywhere.
                            </h3>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={submitCheckout}
                    >
                        Donate
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
