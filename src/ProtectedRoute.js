import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userCookie } from './apirequest/config';
const ProtectedRoute = ({ children }) => {
    const token = Cookies.get(userCookie);

    if (!token) {
        window.location.href = "/login";
        return null; 
    }

    return children;
};
export default ProtectedRoute;
