import {jwtDecode} from 'jwt-decode';

/**
 * Checks if the provided JWT token is expired.
 * @param {string} token - The JWT token to be checked.
 * @returns {boolean} - True if the token is expired, false otherwise.
 */
export const isTokenExpired = (token) => {
    // Return true if the token is falsy (undefined, null, or empty)
    if (!token) {
        return true;
    }

    try {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);
        // Get the current time in seconds
        const currentTime = Date.now() / 1000;

        // Return true if the token's expiration time is less than the current time
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        // Treat decoding errors as an expired token
        return true;
    }
};
