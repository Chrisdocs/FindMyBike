import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { useAlert } from "react-alert";
import "../../assets/styles/updateUser.css";

const UpdateUserForm = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [updateUser] = useMutation(UPDATE_USER);

  const [formState, setFormState] = useState({ email: "", password: "" });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const alert = useAlert();
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });
      console.log(data);
      alert.success("Account updated");
    } catch (e) {
      console.error(e);
      alert.error("Error editing account");
    }
  };

  return (
    <>
      <span id="addbikebtn" onClick={() => setOpen((open) => !open)}>
        Update User
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
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="">
                    <div className="formbox flex p-20 justify-center">
                      <div className="w-full max-w-xs">
                        <form
                          className="bg-white dark:bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          onSubmit={handleFormSubmit}
                        >
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="email"
                            >
                              New Email
                            </label>
                            <input
                              className="focus:outline-none focus:ring focus:border-blue-300 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name="email"
                              type="text"
                              placeholder="email"
                              value={formState.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-6">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="password"
                            >
                              New Password
                            </label>
                            <input
                              className="focus:outline-none focus:ring focus:border-blue-300 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="password"
                              name="password"
                              type="password"
                              placeholder="***********"
                              value={formState.password}
                              onChange={handleChange}
                            />
                            <p className="text-red-500 text-xs italic">
                              Please choose a password.
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus: shadow-outline"
                              type="submit"
                              onClick={() => setOpen(false)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="cancel mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
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

export default UpdateUserForm;
