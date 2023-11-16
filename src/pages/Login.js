import React from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import LoginForm from '../components/LoginForm/LoginForm';
import Footer from '../components/Footer/Footer';

function App() {
    return (
        <div className="container">
            <NavigationBar />
            <hr className='hr' />
            <div className='container'>
                <LoginForm />
                <Footer />
            </div>
        </div>
    );
}

export default App;