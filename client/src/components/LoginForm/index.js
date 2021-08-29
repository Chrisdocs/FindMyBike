import React, { useState } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import SignupForm from '../Signup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LoginForm = props => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    //update state based on form input changes 
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    //submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <div className="flex p-20 justify-center">
            <div className="w-full max-w-xs">
                <form className="bg-white dark:bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit} >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="focus:outline-none focus:ring focus:border-blue-300 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="username"
                            placeholder="Username" value={formState.username}
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
                        placeholder="*********" 
                        value={formState.password}
                        onChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus: shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                {error && <div>Login failed</div>}
                <HashRouter>
                <div className="flex justify-center">
                    <p className="pt-2 pr-6 dark:text-gray-300">Not a member?</p>
                    <NavLink exact to="/Signup" activeClassName="current-nav" className="nav-link" replace>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit">
                            Sign Up
                        </button>
                    </NavLink>

                    <Switch>
                        <Route path="/Signup" component={SignupForm} />
                    </Switch>
                </div>
            </HashRouter>
            </div>
        </div>
    );
};

export default LoginForm;