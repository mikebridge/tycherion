import React from 'react';
import {
    Container,
    Navbar,
    NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

export const NavBar = () => {
    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <Container>
                    <NavbarBrand href="#" className="mr-auto">Tycherion</NavbarBrand>
                    <Link to="suggest">Home</Link>
                    <Link to="search">Link</Link>
                </Container>
            </Navbar>
        </div>
    );
}
