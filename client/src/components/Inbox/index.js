import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@apollo/client';
import { QUERY_MESSAGES_FROM_USER } from '../../utils/queries';

const Inbox = () => {

    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    // array of all messages user has posted on bikes
    const { data } = useQuery(QUERY_MESSAGES_FROM_USER);
    const messageArray = data?.userMessages;
    console.log("messagesSent:", messageArray);

    // filter only messages with replies to add to dashboard inbox
    const messagesWithReplies = messageArray?.filter(message => message.replyCount > 0 );
    console.log("replied messages: ", messagesWithReplies);

    // set inbox count
    const count = messagesWithReplies?.length;
    
    return (        
        <div className="pt-10 pb-10 flex justify-center">
        <button
          id="addbikebtn"
          className="rounded-md border border-transparent addbikebtn shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setOpen(open => !open)}
        >
          Inbox{` (${count})`}
        </button>
        <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
        <div className="inline-block addbikecontainer align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="mt-5 md:mt-0 md:col-span-2">
            {messagesWithReplies &&
                messagesWithReplies.map(message => (
                    <div key={message._id}>
                        <div>You wrote: {message.messageBody}</div>
                        <div>
                            {message.replies.map(reply => (
                                <div key={reply._id}>
                                    <div>{reply.username} replied on {reply.createdAt}:</div>
                                    <div>{reply.replyBody}</div>
                                </div>
                            ))}
                            {/*Add reply button or have them click the message div to open up a chat/message modal display*/}
                        </div>
                    </div>
                ))
            }
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                >
                    Back to Dashboard
                </button>

              </div>
              </div>
        </Dialog>
      </Transition.Root>
    </div>
    );
};

export default Inbox;