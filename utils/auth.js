import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Treat decoding errors as an expired token
    }
};
