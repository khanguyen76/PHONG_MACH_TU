import React from 'react';

import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import ForgotPassword from '../views/ForgotPassword';

export const routeMain = [
    { path: '/dashboard', main: (props) => <Dashboard {...props} /> },
]

export const routeAuth = [
    { path: '/auth/login', main: (props) => <Login {...props} /> },
    { path: '/auth/forgotPassword', main: (props) => <ForgotPassword {...props} /> },
]