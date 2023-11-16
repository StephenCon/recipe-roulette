// Importing necessary React and React-Bootstrap components
import React, { useState, useEffect } from 'react';
import { Navbar, NavDropdown, Nav, Modal } from 'react-bootstrap';
import SignupForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';

// Importing profile image from assets
import profile_image from '../../assets/images/emptyprofile.png';

/**
 * NavigationBar component displaying the application navigation options.
 * @returns {JSX.Element} - The rendered NavigationBar component.
 */
const NavigationBar = () => {
    // State to control whether the NavDropdown is shown or not
    const [show, setShow] = useState(false);
    // State to control the visibility of the Login Modal
    const [showLoginModal, setShowLoginModal] = useState(false);
    // State to control the visibility of the Signup Modal
    const [showSignupModal, setShowSignupModal] = useState(false);
    // State to control whether the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    // Logout function to handle logout action
    const handleLogout = () => {
        // Clear the authentication token from local storage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    // Effect to update isLoggedIn when the token changes
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

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
                        {isLoggedIn ? (
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        ) : (
                            <>
                                <NavDropdown.Item onClick={() => setShowLoginModal(true)}>Login</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => setShowSignupModal(true)}>Sign Up</NavDropdown.Item>
                            </>
                        )}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>

            {/* Signup Modal */}
            <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm />
                </Modal.Body>
            </Modal>
        </Navbar>
    );
};

export default NavigationBar;
