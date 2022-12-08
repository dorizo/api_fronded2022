import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks

// pages
import useMe from '../hooks/useMe';
import Login from 'views/authentication/Login';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
    const { user, loading } = useMe();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }
    if (pathname === '/login') {
        return <Navigate to="/" />;
    }
    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }
    return <>{children}</>;
}

AuthGuard.propTypes = {
    children: PropTypes.node
};
