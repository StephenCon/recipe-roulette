// Importing necessary React and React-Bootstrap components
import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './NavigationBar.css';
// Importing profile image from assets
import profile_image from '../../assets/images/emptyprofile.png';

// NavigationBar component definition
const NavigationBar = () => {
    // State to control whether the NavDropdown is shown or not
    const [show, setShow] = useState(false);

    return (
        <Navbar>
            <Navbar.Brand href="#home">Meal Mixer</Navbar.Brand> {/* Brand Name of the Navbar */}
            <Navbar.Toggle /> {/* Toggle button for smaller screen sizes */}
            <Navbar.Collapse className="justify-content-end p-1">
                <Nav>
                    {/* NavDropdown component with an image as the title */}
                    <NavDropdown
                        title={
                            <img
                                src={profile_image} // Profile image
                                alt="Profile" // Alt text for the image
                                className="rounded-circle" // Rounded image style
                                width="50" height="50"
                            />
                        }
                        show={show} // Control the dropdown display based on state
                        id="basic-nav-dropdown"
                        onMouseOver={() => setShow(true)} // Show dropdown on mouse over
                        onMouseLeave={() => setShow(false)} // Hide dropdown on mouse leave
                    >
                        {/* Dropdown items */}
                        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

// Exporting the NavigationBar component
export default NavigationBar;
