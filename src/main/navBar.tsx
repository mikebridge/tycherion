import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './navBar.css';

export const NavBar = () => {
    return (
        <header>
            <Link to="/">Tycherion</Link>
            {/*<Link to="suggest">Home</Link>*/}
            {/*<Link to="search">Link</Link>*/}
        </header>
    );
}
