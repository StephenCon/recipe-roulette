import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="container bg-white">
            <footer className="py-3 my-4">
                {/* <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a className="nav-link px-2 text-muted">About</a></li>
                    <li className="nav-item"><a className="nav-link px-2 text-muted">Road Map</a></li>
                    <li className="nav-item"><a className="nav-link px-2 text-muted">Random</a></li>
                    <li className="nav-item"><a className="nav-link px-2 text-muted">FAQs</a></li>
                </ul> */}
                <p className="text-center text-muted">© {currentYear} Recipe Roulette. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Footer;
