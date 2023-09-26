import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './NavigationBar.css';
import profile_image from '../../assets/images/emptyprofile.png';

const NavigationBar = () => {
    const [show, setShow] = useState(false);

    return (
        <Navbar>
            <Navbar.Brand href="#home">Meal Mixer</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link eventKey={2} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                        <img
                            src={profile_image}
                            alt="Profile"
                            className="rounded-circle"
                            width="50" height="50"
                        />
                        <NavDropdown title="" show={show} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
