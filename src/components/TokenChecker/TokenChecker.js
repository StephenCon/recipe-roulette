// External imports
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/auth';

/**
 * TokenChecker component checks the expiration status of the user's token.
 * Redirects to the login page if the token is expired.
 */
function TokenChecker() {
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the user's token from local storage
        const token = localStorage.getItem('token');

        // Check if the token is expired
        if (isTokenExpired(token)) {
            // Redirect to the login page if the token is expired
            navigate('/');
        }
    }, [navigate]);

    // This component doesn't render anything
    return null;
}

export default TokenChecker;
