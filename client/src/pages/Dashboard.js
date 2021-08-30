import React from "react";
import { Redirect } from "react-router-dom";
import UserBike from "../components/UserBike";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Dashboard = () => {
    const { data } = useQuery(QUERY_USER);
    console.log(data?.user);

    const username = data?.user.username;

    if (!Auth.loggedIn()) {
        return <Redirect to="/Login" />;
    }

    return (
        <div className="w-screen">
            {Auth.loggedIn() ? (
                <div className=" flex flex-col text-center pt-10">
                    <div className="username capitalize dark:text-gray-200">
                        Hello {username}!
                    </div>
                    <div className="welcome dark:text-gray-200">
                        Register your bike information and if a bike is marked as 
                        missing, it will automatically be added to the Search page!
                    </div>
                </div>
            ) : (
                <></>
            )}
            <UserBike />
        </div>
    );
};

export default Dashboard;
