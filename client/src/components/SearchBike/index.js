import React, { useState } from "react";
import {
    Route,
    NavLink,
    HashRouter, //can use browserRouter to get rid of #
    Switch,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import "react-multi-carousel/lib/styles.css";
import Message from "../../pages/Message.js";
import { QUERY_LOST_BIKES } from "../../utils/queries.js";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../../assets/styles/carousel.css";

const SearchBike = () => {
    const [searchInput, setSearchInput] = useState("");

    const { loading, data } = useQuery(QUERY_LOST_BIKES, {
        variables: { searchInput },
    });

    // use a ternary operator to check if bike data is present (loaded)
    const lostBikes = loading ? [] : data.lostBikes;

    console.log("These are your lost bikes: ", lostBikes);

    const [searchedBikes, setSearchedBikes] = useState([]);

    const [clickSearch, setClickSearch] = useState(false);

    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5,
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 3,
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2,
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1,
    //     },
    // };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        // console.log("clicked")
        setClickSearch(true);

        function findLostBikes(arr, query) {
            console.log("this is your array: ", arr);
            console.log("You searched for: ", query);
            return arr.filter((bikes, index) => {
                index = +0;
                if (bikes.status[index].location === query) {
                    console.log(bikes);
                    return bikes;
                }
            });
        }

        try {
            const response = await findLostBikes(lostBikes, searchInput);
            console.log("This is your response: ", response);

            if (!response) {
                throw new Error("Something went wrong!");
            }

            // const bikeData = response.map((bike) => ({
            //     bikeId: bike._id,
            //     brand: bike.brand,
            //     description: bike.description,
            //     image: bike.image,
            //     serial: bike.serial,
            //     status: bike.status,
            // }));

            setSearchedBikes(response);
            setSearchInput("");
        } catch (err) {
            console.log(err);
        }
    };

    const slidesNumber = searchedBikes?.length - 2;
    console.log("number of slides:", slidesNumber);

    return (
        <>
            <span className="justify-center">
                <form
                    className="bg-white dark:bg-gray-700 shadow p-4 flex"
                    onSubmit={handleSearchSubmit}
                >
                    <span className="w-auto flex justify-end items-center text-gray-500 dark:text-gray-300 dark:bg-gray-800 p-2">
                        <p className="material-icons text-3xl">search</p>
                    </span>
                    <input
                        className="w-full rounded p-2 dark:text-gray-300 dark:bg-gray-600"
                        type="text"
                        placeholder="Try 'Los Angeles'"
                        name="searchInput"
                        value={searchInput}
                        onChange={(event) =>
                            setSearchInput(event.target.value.toUpperCase())
                        }
                    />
                    <button className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                        <p className="font-semibold text-xs">Search</p>
                    </button>
                </form>

                {console.log(
                    "searchedBikes",
                    searchedBikes.length ? true : false
                )}

                {!clickSearch ? (
                    <div className="text-center pt-20">
                        <h2 className="dark:text-gray-300">Hey There!</h2>
                        <p className="dark:text-gray-300">
                            Type in the name of a city in the search bar above
                            to get started!
                        </p>
                    </div>
                ) : (
                    <div className="pt-20">
                        {searchedBikes.length ? (
                            <CarouselProvider
                                naturalSlideWidth={60}
                                naturalSlideHeight={60}
                                totalSlides={slidesNumber}
                                orientation={"horizontal"}
                                // step={1}
                                // dragStep={1}
                                visibleSlides={1}
                                isIntrinsicHeight={true}
                                // infinite={true}
                                // isPlaying={true}
                                // interval={5000}
                            >
                                <div className="flex flex-wrap  justify-center visible">
                                    <Slider>
                                        {searchedBikes.map((bike, i) => {
                                            return (
                                                <div key={bike._id}>
                                                    <Slide
                                                        index={i}
                                                        key={bike._id}
                                                    >
                                                        <div className="bg-gray-300 dark:bg-gray-600 p-6 itembox m-2 rounded-3xl shadow-2xl max-w-lg col-container">
                                                            {/* <div className="h-full object-fill"> */}
                                                                <div className="bg-gray-600 dark:bg-gray-800 rounded-3xl ">
                                                                    {bike.image ? (
                                                                        <img
                                                                            className="object-cover rounded-3xl h-full w-full p-1"
                                                                            src={
                                                                                bike.image
                                                                            }
                                                                            alt="the users bike"
                                                                        />
                                                                    ) : null}
                                                                    <div className="bg-gray-200 dark:bg-gray-400 rounded-3xl p-2">
                                                                        {bike
                                                                            .status[0]
                                                                            .isLost ? (
                                                                            <h4 className="pt-2 pb-2 bg-red-200 text-center rounded-full">
                                                                                Missing
                                                                            </h4>
                                                                        ) : (
                                                                            <h4 className="pt-2 pb-2 bg-green-200 text-center rounded-full">
                                                                                Found
                                                                            </h4>
                                                                        )}
                                                                        <div className="text-center bg-blue-200 rounded-xl dark:bg-blue-400">
                                                                            <div className="bg-blue-100 dark:bg-blue-200">
                                                                                <p className="pt-1 pb-1">
                                                                                    Brand:{" "}
                                                                                    {
                                                                                        bike.brand
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="pt-1 pb-1">
                                                                                    Model:{" "}
                                                                                    {
                                                                                        bike.bike_model
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="bg-blue-100 dark:bg-blue-200">
                                                                                <p className="pt-1 pb-1">
                                                                                    Year:{" "}
                                                                                    {
                                                                                        bike.year
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="pt-1 pb-1">
                                                                                    Serial
                                                                                    Number:{" "}
                                                                                    {
                                                                                        bike.serial
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="bg-gray-100 dark:bg-gray-600">
                                                                                <p className="pt-3 pb-3 mb-3 dark:text-gray-300">
                                                                                    Description:{" "}
                                                                                    {
                                                                                        bike.description
                                                                                    }
                                                                                </p>
                                                                            {/* </div> */}
                                                                        </div>
                                                                    </div>
                                                                    <HashRouter>
                                                                        <div className="flex justify-around">
                                                                            <NavLink
                                                                                exact
                                                                                to={`/Message/${bike._id}`}
                                                                                activeClassName="current-nav"
                                                                                className="nav-link"
                                                                                replace
                                                                            >
                                                                                <button className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                                                                    Message
                                                                                    User
                                                                                </button>
                                                                            </NavLink>

                                                                            <Switch>
                                                                                <Route
                                                                                    exact
                                                                                    path={`/Message/${bike._id}`}
                                                                                    component={() => (
                                                                                        <Message
                                                                                            bikeId={
                                                                                                bike._id
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Switch>
                                                                        </div>
                                                                    </HashRouter>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Slide>
                                                </div>
                                            );
                                            // }
                                        })}
                                    </Slider>
                                </div>
                                <div className="flex justify-center">
                                    <ButtonBack className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                        Back
                                    </ButtonBack>
                                    <ButtonNext className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                        Next
                                    </ButtonNext>
                                </div>
                                <DotGroup />
                            </CarouselProvider>
                        ) : clickSearch ? (
                            <div className="dark:text-gray-200 text-center">
                                Wheelie great news! <br />
                                There are no missing bikes reported in this area.
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
            </span>
        </>
    );
};

export default SearchBike;
