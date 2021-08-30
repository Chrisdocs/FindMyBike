import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignupForm = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="">
            <div className="flex p-20 justify-center">
                <div className="w-full max-w-xs">
                    <form className="bg-white dark:bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="focus:outline-none focus:ring focus:border-blue-300 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            name="username"
                            type="text" 
                            placeholder="Username" 
                            value={formState.username}
                            onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="focus:outline-none focus:ring focus:border-blue-300 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="email"
                            name="email" 
                            type="text" 
                            placeholder="Email" 
                            value={formState.email}
                            onChange={handleChange} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="focus:outline-none focus:ring focus:border-blue-300 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" 
                            name="password"
                            type="password" 
                            placeholder="***********" 
                            value={formState.password}
                            onChange={handleChange} />
                            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                        </div>
                        {error && <div className="dark:text-red-300 text-sm text-red-500 my-3">Email or username already in use.</div>}
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus: shadow-outline" type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;