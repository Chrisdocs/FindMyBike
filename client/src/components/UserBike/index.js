import React, { useState, useEffect } from "react";
import BikeMessage from "../BikeMessage";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { DELETE_BIKE } from "../../utils/mutations";
import EditBike from "../EditBike";
import "../../assets/styles/dashboard.css";

const UserBike = () => {
  // const { loading, data } = useQuery(QUERY_USERS);
  // const user = data?.users[6] || {};
  // console.log(data);
  // console.log(user);
  // const { username, email, bikeCount, bikes } = user;

    //use when logged into app. if using seeded data, uncomment lines 9-13
    const { data } = useQuery(QUERY_USER);
    console.log(data?.user);

    // const username = data?.user.username;
    // const email = data?.user.email;
    // const bikeCount = data?.user.bikeCount;
    const bikes = data?.user.bikes;

    const [bikeMessages, setBikeMessages] = useState();
    // const [showMessages, clickedShowMessages] = useState(false);
    const [bikeState, setBikeState] = useState([bikes]);
    const [bikeId, setBikeId] = useState();

    useEffect(() => {
        setBikeState(bikes);
    });

    const [deleteBike, { error }] = useMutation(DELETE_BIKE);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  function handleMessagesClick(e) {
    e.preventDefault();
    // get bike id
    const bikeId = e.target.getAttribute("data-bike-id");
    setBikeId(bikeId);
    // get bike messages
    const bikeMessages = bikes?.filter(bike => bike._id === bikeId)[0].messages;
    setBikeMessages(bikeMessages);
    // display show/hide model
    var bikeMessageEl = document.getElementById("bikemessage");
    var dashboardEl = document.getElementById("dashboardcontainer");
    var addbikebtnEl = document.getElementById("addbikebtn");
    bikeMessageEl.classList.remove("hidden");
    dashboardEl.classList.add("hidden", "pb-10");
    addbikebtnEl.classList.add("hidden");
  }

  function handleMessagesReturnClick(e) {
    e.preventDefault();
    // display show/hide
    var bikeMessageEl = document.getElementById("bikemessage");
    var dashboardEl = document.getElementById("dashboardcontainer");
    var addbikebtnEl = document.getElementById("addbikebtn");
    bikeMessageEl.classList.add("hidden");
    dashboardEl.classList.remove("hidden", "pb-10");
    addbikebtnEl.classList.remove("hidden");
  }

  function handleEditClick(e) {
    e.preventDefault();
    console.log("clicked edit!");

    // get bike id
    const bikeId = e.target.getAttribute("data-bike-id");
  }

  const handleDeleteClick = async bikeId => {
    //  e.preventDefault();
    console.log("clicked delete!");
    console.log("This is the bikeID: " + bikeId);
    try {
      await deleteBike({
        variables: { bikeId },
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <span>
      <div
        id="dashboardcontainer"
        className="pb-20 flex flex-wrap justify-center visible"
      >
        {bikes?.map(bike => (
          <div
            className="bg-gray-300 dark:bg-gray-600 p-6 itembox m-2 rounded-3xl shadow-2xl max-w-lg col-container"
            key={bike._id}
          >
            <div className="bg-gray-600 dark:bg-gray-800 rounded-3xl">
              {bike.image ? (
                <img
                  className="object-cover rounded-3xl h-full w-full p-1"
                  src={bike.image}
                  alt="the users bike"
                />
              ) : null}
              <div className="bg-gray-200 dark:bg-gray-400 rounded-3xl p-2">
                {bike.status[0].isLost ? (
                  <div className="pt-2 pb-2 bg-red-200 text-center rounded-full">
                    Missing
                  </div>
                ) : (
                  <div className="pt-2 pb-2 bg-green-200 text-center rounded-full">
                    Not Missing
                  </div>
                )}
                <div className="text-center bg-blue-200 rounded-xl dark:bg-blue-400">
                  <div className="bg-blue-100 dark:bg-blue-200"><p className="pt-1 pb-1">Brand: {bike.brand}</p></div>
                  <div><p className="pt-1 pb-1">Model: {bike.bike_model}</p></div>
                  <div className="bg-blue-100 dark:bg-blue-200"><p className="pt-1 pb-1">Year: {bike.year}</p></div>
                  <div><p className="pt-1 pb-1">Serial Number: {bike.serial}</p></div>
                  <div className="bg-blue-100 dark:bg-blue-200"><p className="pt-1 pb-1">
                    Location: {bike.status[0].location}
                  </p></div>
                  <div className="bg-gray-100 dark:bg-gray-600">
                  <p className="pt-3 pb-3 mb-3 dark:text-gray-300">
                    Description: {bike.description}
                  </p>
                  </div>
                </div>
                <div className="flex justify-around">
                  <EditBike
                    bikeId={bike._id}
                    status={bike.status[0].isLost}
                    brand={bike.brand}
                    bikeModel={bike.bike_model}
                    year={bike.year}
                    serialNum={bike.serial}
                    city={bike.status[0].location}
                    description={bike.description}
                    image={bike.image}
                  />
                  <button
                    data-bike-id={bike._id}
                    className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleMessagesClick}
                  >
                    Messages {bike.messages.length ? ` (${bike.messages.length})` : ''}
                  </button>
                  <button
                    data-bike-id={bike._id}
                    className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleDeleteClick(bike._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="bikemessage" className="hidden flex flex-col items-center">
        <BikeMessage bikeMessages={bikeMessages} bike={bikeId} />
        <button
          className="rounded-md mb-10 border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white mt-4 hover:bg-blue-700 focus:outline-none  sm:w-auto sm:text-sm"
          onClick={handleMessagesReturnClick}
        >
          Return To Bike List
        </button>
      </div>
    </span>
  );
};

export default UserBike;