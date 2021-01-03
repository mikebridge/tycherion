import React from 'react';
import {
    Container,
    Navbar,
    NavbarBrand,
} from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';

export const NavBar = () => {
    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <Container>
                    <NavbarBrand href="#" className="mr-auto">Tycherion</NavbarBrand>
                </Container>
            </Navbar>
        </div>
    );
}
