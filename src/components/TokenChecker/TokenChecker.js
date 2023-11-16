import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

const TokenChecker = () => {
    const history = useHistory();

    useEffect(() => {
        const checkTokenStatus = () => {
            const token = localStorage.getItem('token');

            if (isTokenExpired(token)) {
                // Redirect to the login page or perform other actions
                history.push('/login');
            }
        };

        // Check token status on component mount
        checkTokenStatus();

        // Optionally, you can set up a timer to periodically check the token status
        const tokenCheckInterval = setInterval(() => {
            checkTokenStatus();
        }, 60000); // Check every 60 seconds

        // Clear the interval on component unmount to avoid memory leaks
        return () => clearInterval(tokenCheckInterval);
    }, [history]);

    // This component doesn't render anything, as it's mainly used for side effects
    return null;
};

export default TokenChecker;
