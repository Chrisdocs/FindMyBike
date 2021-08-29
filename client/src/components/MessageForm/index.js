import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";
import { Redirect } from "react-router-dom";
import { useAlert } from 'react-alert';


const MessageForm = () => {
  const [messageBody, setMessageBody] = useState("");
  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  const [bikeId, setBikeId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const alert = useAlert()

  let currentIdUrl = window.location.hash.split("/").splice(2).toString();

  function handleChange(event) {
    setMessageBody(event.target.value);
    setBikeId(currentIdUrl);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const message = await addMessage({
        variables: { bikeId, messageBody },
      });

      setMessageBody("");
      setBikeId("");

      if (message) {
        alert.success(
          "Messege Sent"
        );
      }
      
      setSubmitted(true);

    } catch (e) {
      console.error(e);
    }
  }

  if (submitted === true) {
    return <Redirect to="/Search" />;
  }

  return (
    <div className="flex justify-center">
      <div className="inline-block addbikecontainer align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="dark:bg-gray-600 addheadercontainer px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="dark:bg-gray-600 sm:flex sm:items-start">
            <div className="dark:bg-gray-500 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <span role="img" aria-label="bike Emoji">
                ✉️
              </span>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="dark:text-gray-400 text-lg addheadertext leading-6 font-medium text-gray-900">
                Leave a Message
              </h3>
              <div className="mt-2">
                <p className="dark:text-gray-300 text-sm text-gray-500">
                  Found this bike? Let the owner know! Leave a description of
                  the location and the rider if there was one. Don't worry only
                  the owner can see this message!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="dark:bg-gray-600">
          <form onSubmit={handleFormSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 dark:bg-gray-600 sm:p-6">
                <div className="dark:bg-gray-600 col-span-6 sm:col-span-3">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message the Owner!
                  </label>
                  <textarea
                    className="block mx-auto dark:bg-gray-300 border pl-3 pt-1 mt-2 rounded-md outline"
                    rows="5"
                    cols="52"
                    placeholder="Type your message here!"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            {error && <div className="dark:text-gray-300 text-sm text-gray-500">Message is required. Please try again</div>}
            <div className="dark:bg-gray-500 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
