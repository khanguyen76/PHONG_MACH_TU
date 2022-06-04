import React from 'react';

import QuanLiPhieuKham from '../views/QuanLiPhieuKham';
import QuanLiBenhNhan from '../views/QuanLiBenhNhan';
import NotFound404 from '../views/NotFound404';
import Login from '../views/Login';
import ForgotPassword from '../views/ForgotPassword';
import ChangePassword from '../views/ChangePassword';

export const routeMain = [
    { path: '/quan-li-phieu-kham', main: (props) => <QuanLiPhieuKham {...props} /> },
    { path: '/quan-li-benh-nhan', main: (props) => <QuanLiBenhNhan {...props} /> },
    { path: '/404', main: (props) => <NotFound404 {...props} /> },
]

export const routeAuth = [
    { path: '/auth/login', main: (props) => <Login {...props} /> },
    { path: '/auth/forgotPassword', main: (props) => <ForgotPassword {...props} /> },
    { path: '/auth/changePassword', main: (props) => <ChangePassword {...props} /> },
]