import React from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Hero from '../components/Hero/Hero';
import Features from '../components/Feature/Feature';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';


function App() {
    return (
        <div className="App">
            <NavigationBar />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Footer />
        </div>
    );
}

export default App;