import React from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import HeroSection from '../components/HeroSection/HeroSection';
import Features from '../components/Feature/Feature';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';


function App() {
    return (
        <div className="App">
            <NavigationBar />
            <HeroSection />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Footer />
        </div>
    );
}

export default App;