import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REPLY } from "../../utils/mutations";
// import { QUERY_USER, QUERY_MESSAGE } from "../../utils/queries";
import { useAlert } from 'react-alert';

import "../../assets/styles/bikemessage.css";

const BikeMessage = ({ bikeMessages, bike }) => {
  let noMessages = false;
  const alert = useAlert()
  
  if (bikeMessages?.length === 0) {
    noMessages = true;
  }

  const [messageId, setMessageId] = useState('');
  const [clickReply, setClickReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  // const [bikeId, setBikeId] = useState('');

  const [addReply, {error}] = useMutation(ADD_REPLY //, {
  //   update(cache, { data: { addReply } }) {
  //     try {
  //       const { message } = cache.readQuery({ query: QUERY_MESSAGE });
  
  //       cache.writeQuery({
  //         query: QUERY_MESSAGE,
  //         data: { message: { replies: [...message.replies, addReply] } }
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

  function handleReply(event) {
    setClickReply(true);
    // get messageId
    const id = event.target.getAttribute('data-id');
    setMessageId(id);
  }

  function handleChange(event) {
    setReplyBody(event.target.value);
    // setBikeId(bike);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const reply = await addReply({
        variables: { messageId, replyBody },
      });

      setReplyBody("");
      // setBikeId("");

      if (reply) {
        alert.success(
          "Messege Sent"
        );

        setClickReply(false);

        // hide model
        var bikeMessageEl = document.getElementById("bikemessage");
        var dashboardEl = document.getElementById("dashboardcontainer");
        var addbikebtnEl = document.getElementById("addbikebtn");
        bikeMessageEl.classList.add("hidden");
        dashboardEl.classList.remove("hidden", "pb-10");
        addbikebtnEl.classList.remove("hidden");
      }
    } catch (e) {
      console.error(e);
    }
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
            {noMessages && (
              <div className="bg-gray-200 p-6 pt-6 m-2 rounded-3xl pt-0  itemboxcomment my-3 shadow-md m-auto w-auto">
                <div className="bg-gray-50 p-6 m-2 rounded-3xl mx-auto shadow-md w-full">
                  There Are No Messages Yet! Don't Give Up Hope!
                </div>
              </div>
            )}
            {bikeMessages &&
              bikeMessages.map(message => (
                  <div key={message._id} className="bg-gray-200 p-6 m-2 rounded-3xl pt-0 my-7 break-words itemboxcomment shadow-md m-auto w-auto">
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
                  {message.replies.length ? (
                    <div>
                      {message.replies.map(reply => (
                        <div key={reply._id} className="bg-gray-200 p-6 m-2 rounded-3xl pt-0 my-7 break-words itemboxcomment shadow-md m-auto w-auto">
                          {reply.username} replied 
                            <div className="bg-gray-50 p-6 m-2 rounded-3xl mx-auto shadow-md w-full">
                              {reply.replyBody}
                            </div>
                            <div>on {reply.createdAt}</div>
                        </div>))}
                      </div>) : (<div></div>)}
                    {clickReply ? (<></>) : (<button data-id={message._id} 
                        className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleReply}>
                          Reply
                      </button>)}
                </div>
              ))}
              {clickReply && (
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
                    {error && <div className="dark:text-gray-300 text-sm text-gray-500">Something went wrong.. Please try again</div>}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeMessage;
