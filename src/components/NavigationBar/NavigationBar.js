import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = () => {
    const [show, setShow] = useState(false);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Meal Mixer</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link eventKey={2} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                        <img
                            src="path_to_your_image.jpg"
                            alt="Profile"
                            className="rounded-circle"
                            width="40" height="40"
                        />
                        <NavDropdown title="" show={show} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
