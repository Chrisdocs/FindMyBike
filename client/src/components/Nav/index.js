import React, { useEffect } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";

import Home from "../../pages/Home";
import Dashboard from "../../pages/Dashboard";
import Search from "../../pages/Search";
import Tips from "../../pages/Tips";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Message from "../../pages/Message";
import Success from "../../pages/Success";
import AddBike from "../AddBike";
import Inbox from "../Inbox";
import UpdateUserForm from "../UpdateUser";

import NoMatch from "../../pages/NoMatch";

import "../../assets/styles/nav.css";

import Auth from "../../utils/auth";

const Nav = () => {
  useEffect(() => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  });

  function closeToggle() {
    const menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("hidden");
  }

  useEffect(() => {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = document.querySelector(".dropdown-container");
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  });

    return (
        <HashRouter>
            
            <div>
                <nav className="md:hidden bg-white dark:bg-gray-600 shadow-lg">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between">
                        <div className="flex space-x-7">
						<div>
							<a href="/#" className="flex items-center py-4 px-2">
								<span className="font-semibold text-gray-500 dark:text-gray-400 text-lg">Navigation</span>
							</a>
						</div>
						
					</div>
                            <div className="md:hidden flex items-center">
                                <button className="outline-none mobile-menu-button">
                                    <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                                        x-show="!showMenu"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:hidden mobile-menu">
                            <ul className="">
                                <li onClick={closeToggle}><NavLink
                                exact
                                to="/"
                                activeClassName=""
                                className="block text-sm px-2 py-4 transition duration-300 dark:text-gray-300"
                                replace
                            >
                                Home
                            </NavLink></li>
                            {Auth.loggedIn() ? (
                                <li onBlur={closeToggle}><NavLink
                                exact
                                to="/Dashboard"
                                activeClassName="dropdown-btn"
                                className="block justify-center text-sm px-2 py-4 transition duration-300 dropdown-btn dark:text-gray-300"
                                replace
                            >
                                Dashboard
                                <i className="fa fa-caret-down"></i>
                                        <div className="dropdown-container">
                                        <span><AddBike /></span>
                                        <span><Inbox /></span>
                                        <span><UpdateUserForm /></span>
                                        </div>
                                    
                            </NavLink></li>
                            ) : (
                                <></>
                            )}
                                <li onClick={closeToggle}><NavLink
                                exact
                                to="/Search"
                                activeClassName=""
                                className="block text-sm px-2 py-4 transition duration-300 dark:text-gray-300"
                                replace
                            >
                                Search
                            </NavLink>
                            </li>
                                <li onClick={closeToggle}><NavLink
                                exact
                                to="/Tips"
                                activeClassName=""
                                className="block text-sm px-2 py-4 transition duration-300 dark:text-gray-300"
                                replace
                            >
                                Tips
                            </NavLink>
                            </li>
                            {Auth.loggedIn() ? (
                            <>
                                <li  id="login-out"
                                    className="block text-sm px-2 py-4 transition duration-300 dark:text-gray-300"
                                    onClick={Auth.logout}
                                >
                                    Sign Out</li>
                                    </>
                        ) : (
                                <li onClick={closeToggle}><NavLink
                                exact
                                to="/Login"
                                activeClassName=""
                                className="block text-sm px-2 py-4 transition duration-300 dark:text-gray-300"
                                replace
                            >
                                Sign In
                            </NavLink></li>
                            )}
                            </ul>
                        </div>

        {/* this is where main nav div starts  */}
        <nav className="hidden md:block nav-section">
          <ul>
            <li className="main-nav dark:text-gray-200 md:mx-3.5">
              <NavLink
                exact
                to="/"
                activeClassName="current-nav"
                className="nav-link"
                replace
              >
                Home
              </NavLink>
            </li>
            {Auth.loggedIn() ? (
              <li className="main-nav dark:text-gray-200 subnav md:mx-3.5">
                <NavLink
                  exact
                  to="/Dashboard"
                  activeClassName="current-nav"
                  className="nav-link"
                  replace
                >
                  Dashboard
                  <i className="fa fa-caret-down"></i>
                  <div className="subnav-content">
                    <AddBike />
                    <Inbox />
                    <UpdateUserForm />
                  </div>
                </NavLink>
              </li>
            ) : (
              <></>
            )}
            <li className="main-nav dark:text-gray-200 md:mx-3.5">
              <NavLink
                exact
                to="/Search"
                activeClassName="current-nav"
                className="nav-link"
                replace
              >
                Search
              </NavLink>
            </li>
            <li className="main-nav dark:text-gray-200 md:mx-3.5">
              <NavLink
                exact
                to="/Tips"
                activeClassName="current-nav"
                className="nav-link"
                replace
              >
                Tips
              </NavLink>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li
                  id="login-out"
                  className="nav-link dark:text-gray-200 md:mx-3.5"
                  onClick={Auth.logout}
                >
                  Sign Out
                </li>
              </>
            ) : (
              <li id="login-out">
                <NavLink
                  exact
                  to="/Login"
                  activeClassName="current-nav"
                  className="main-nav nav-link dark:text-gray-200 md:mx-3.5"
                  replace
                >
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {/* this is where main nav div ends  */}
      </div>

      <div className="object-center">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Search" component={Search} />
          <Route path="/Tips" component={Tips} />
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Message" component={Message} />
          <Route path="/Success" component={Success} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Nav;
