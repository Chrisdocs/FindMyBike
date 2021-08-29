import React from "react";
import { Redirect } from "react-router-dom";
import AddBike from "../components/AddBike";
import UserBike from "../components/UserBike";
import Inbox from "../components/Inbox";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from '../utils/auth';

const Dashboard = () => {
  const { data } = useQuery(QUERY_USER);
  console.log(data?.user);

  const username = data?.user.username;

  if (!Auth.loggedIn()) {
    return <Redirect to="/Login" />
  }
  
  return (
    <div className="w-screen">
      {Auth.loggedIn() ? (
      <div className=" flex flex-col items-center pt-20">
          <div className="username capitalize dark:text-gray-200">Hello {username}!</div>
          <div className="welcome dark:text-gray-200">Here you can upload your bike information and if a bike is marked as missing, it will be automatically added to the Search page!</div>
      </div>
       ):(
       <>

       </>)}
      <Inbox />
      <AddBike />
      <UserBike />
    </div>
  );
};

export default Dashboard;
