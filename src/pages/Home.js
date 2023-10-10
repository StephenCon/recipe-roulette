import React from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import HeroSection from '../components/HeroSection/HeroSection';
import Features from '../components/Features/Features';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';

function App() {
    return (
        <div className="container">
            <NavigationBar />
            <hr className='hr' />
            <div className='container'>
            <HeroSection />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Footer />
            </div>
        </div>
    );
}

export default App;