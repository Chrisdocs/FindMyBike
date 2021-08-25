import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";
import { QUERY_USER, QUERY_BIKE_MESSAGES } from "../../utils/queries";
import "../../assets/styles/bikemessage.css";

const BikeMessage = ({ bikeMessages, bike }) => {
  let nomessages = false;
  let noReply = true;
  
  if (bikeMessages?.length === 0) {
    nomessages = true;
    noReply = false;
  }

  const [clickReply, setClickReply] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [bikeId, setBikeId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [addMessage, {error}] = useMutation(ADD_MESSAGE //, {
  //   update(cache, { data: { addMessage } }) {
  //     try {
  //       const { bike } = cache.readQuery({ query: QUERY_BIKE_MESSAGES });
  
  //       cache.writeQuery({
  //         query: QUERY_BIKE_MESSAGES,
  //         data: { bike: { messages: [...bike.messages, addMessage] } }
  //       });

  //       const { user } = cache.readQuery({ query: QUERY_USER });
  //       cache.writeQuery({
  //         query: QUERY_USER,
  //         data: { user: { ...user, bikes: { mesages: [...user.bikes.messages, addMessage]}}}
  //       })
  //     }
  //     catch(e) {
  //       console.error(e);
  //     }
  //   }
  // }
  );

  function handleReply() {
    setClickReply(true);
  }

  function handleChange(event) {
    setMessageBody(event.target.value);
    setBikeId(bike);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      await addMessage({
        variables: { bikeId, messageBody },
      });

      setMessageBody("");
      setBikeId("");
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  }

  if (submitted === true) {
    alert("Your message has been sent!");
    setSubmitted(false);
    setClickReply(false);
    // window.location.reload(); // ideally find another way to refresh the messages without reloading

    // hide model
    var bikeMessageEl = document.getElementById("bikemessage");
    var dashboardEl = document.getElementById("dashboardcontainer");
    var addbikebtnEl = document.getElementById("addbikebtn");
    bikeMessageEl.classList.add("hidden");
    dashboardEl.classList.remove("hidden", "pb-10");
    addbikebtnEl.classList.remove("hidden");
  }

  return (
    <div className="flex justify-center w-8/12 p-20 pb-0 pt-0 mt-1">
      <div className="justify-center inline-block addbikecontainer align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-lg sm:w-full">
        <div className=" addheadercontainer px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <span role="img" aria-label="bike Emoji">
                ✉️
              </span>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg addheadertext leading-6 font-medium text-gray-900">
                Messages
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  If other users see your bike, they will leave messages for you here!  
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 content-between  p-6 itemcontainercomment shadow-md">
          <div className="flex-col justify-center mx-auto justify-items-center text-center">
            {bikeMessages &&
              bikeMessages.map(message => (
                <div className="bg-gray-200 p-6 m-2 rounded-3xl pt-0 my-7 break-words itemboxcomment shadow-md m-auto w-auto">
                  <div className="flex justify-between mb-5">
                    <div className="message-username">{message.username}</div>
                    <div>{message.createdAt}</div>
                  </div>
                  <div
                    className="bg-gray-50 p-6 m-2 rounded-3xl mx-auto shadow-md w-full"
                    key={message._id}
                  >
                    <div>{message.messageBody}</div>
                  </div>
                </div>
              ))}
            {nomessages && (
              <div className="bg-gray-200 p-6 pt-6 m-2 rounded-3xl pt-0  itemboxcomment my-3 shadow-md m-auto w-auto">
                <div className="bg-gray-50 p-6 m-2 rounded-3xl mx-auto shadow-md w-full">
                  There Are No Messages Yet! Don't Give Up Hope!
                </div>
              </div>
            )}
            {clickReply ? (
                    <form onSubmit={handleFormSubmit}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 addbackground sm:p-6">
                        <div className="col-span-6 sm:col-span-3">
                          <textarea
                            className="border pl-3 pt-1 mt-2 rounded-md outline"
                            rows="5"
                            cols="52"
                            placeholder="Type your message here!"
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  ) : (
                    noReply && (<button className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleReply}>
                    Reply
                  </button>)
                  ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeMessage;
