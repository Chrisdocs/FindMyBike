// import React, { Fragment, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { useMutation } from "@apollo/client";
// // import { QUERY_USER } from "../../utils/queries";
// import { UPDATE_BIKE, UPDATE_STATUS } from "../../utils/mutations";
// import { useAlert } from 'react-alert';
// import FileBase64 from "react-file-base64";
// import gql from "graphql-tag";
//import "../../assets/styles/editbike.css";
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGES_FROM_USER } from "../../utils/queries";
import "../../assets/styles/inbox.css";

const Inbox = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  // array of all messages user has posted on bikes
  const { data } = useQuery(QUERY_MESSAGES_FROM_USER);
  const messageArray = data?.userMessages;
  console.log("messagesSent:", messageArray);

  // filter only messages with replies to add to dashboard inbox
  const messagesWithReplies = messageArray?.filter(
    (message) => message.replyCount > 0
  );
  console.log("replied messages: ", messagesWithReplies);

  // set inbox count
  const count = messagesWithReplies?.length;

  return (
    <>
      <span id="addbikebtn" onClick={() => setOpen((open) => !open)}>
        Inbox{` (${count})`}
      </span>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block addbikecontainer align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-600">
                <div className=" addheadercontainer px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-600">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <span role="img" aria-label="bike Emoji">
                        🚴
                      </span>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg addheadertext leading-6 font-medium text-gray-900"
                      >
                        Inbox
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="">
                    <div className="replies mt-5 md:mt-0 md:col-span-2">
                      {messagesWithReplies &&
                        messagesWithReplies.map((message) => (
                          <div key={message._id}>
                            <div>You wrote: {message.messageBody}</div>
                            <div>
                              {message.replies.map((reply) => (
                                <div key={reply._id}>
                                  <div>
                                    {reply.username} replied on{" "}
                                    {reply.createdAt}:
                                  </div>
                                  <div>{reply.replyBody}</div>
                                </div>
                              ))}
                              {/*Add reply button or have them click the message div to open up a chat/message modal display*/}
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="backButton mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Inbox;
