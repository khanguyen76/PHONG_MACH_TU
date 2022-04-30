import React from 'react';

import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import KhamBenh from '../views/KhamBenh'

export const routeMain = [
    { path: '/dashboard', main: (props) => <Dashboard {...props} /> },
    { path: '/KhamBenh', main: (props) => <KhamBenh {...props}/> },
]

export const routeAuth = [
    { path: '/auth/login', main: (props) => <Login {...props} /> },
]