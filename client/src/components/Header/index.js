import React from 'react';

import Nav from '../Nav';

import '../../assets/styles/header.css';

const Header = () => {
    return (
        <div>
            <header className="w-screen">
                <div>
                    <h1 className="brand-title">Find My Bike</h1>
                    <div className="nav-section">
                    <Nav />
                </div>
              
                </div>
            </header>
        </div>
    )
}

export default Header;