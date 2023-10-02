// Importing necessary React and React-Bootstrap components
import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav, Modal } from 'react-bootstrap';
import SignupForm from '../SignUpForm/SignUpForm'; // Import your SignupForm component
import './NavigationBar.css';

// Importing profile image from assets
import profile_image from '../../assets/images/emptyprofile.png';

// NavigationBar component definition
const NavigationBar = () => {
    // State to control whether the NavDropdown is shown or not
    const [show, setShow] = useState(false);
    // State to control the visibility of the Signup Modal
    const [showSignupModal, setShowSignupModal] = useState(false);

    return (
        <Navbar className="bg-white">
            <Navbar.Brand href="#home">Recipe Roulette</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end p-1" id="basic-navbar-nav">
                <Nav>
                    <NavDropdown
                        title={
                            <img
                                src={profile_image}
                                alt="Profile"
                                className="rounded-circle border border-white"
                                width="50"
                                height="50"
                            />
                        }
                        show={show}
                        id="basic-nav-dropdown"
                        onMouseOver={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                    >
                        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setShowSignupModal(true)}>Sign Up</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>

            {/* Signup Modal */}
            <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm />
                </Modal.Body>
            </Modal>
        </Navbar>
    );
};

export default NavigationBar;
