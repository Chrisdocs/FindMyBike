import React from 'react';

import Nav from '../Nav';

import '../../assets/styles/header.css';

import bikeSleuthLight from '../../assets/images/bikesleuthbanner.jpg'
import bikeSleuthDark from '../../assets/images/bikesleuthbannerdark.jpg'

const Header = () => {

    let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <div className="inset-x-0 top-0">
            <header>
                <div className="justify-center">
                    {matched ? (
                        <img src={bikeSleuthDark} className="min-w-full" alt="banner with sloth riding bike down forest road"/>
                    ) : (
                        <img src={bikeSleuthLight} className="min-w-full" alt="banner with sloth riding bike down forest road"/>
                    )}
                    <h1 className="brand-title text-center">BikeSleuth</h1>
                    <div className="nav-section">
                    <Nav />
                </div>
                </div>
            </header>
        </div>
    )
}

export default Header;