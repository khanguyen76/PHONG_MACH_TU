import React from 'react';

import QuanLiPhieuKham from '../views/QuanLiPhieuKham';
import QuanLiBenhNhan from '../views/QuanLiBenhNhan';
import QuanLiThuoc from '../views/QuanLiThuoc';
import QuanLiTaiKhoan from '../views/QuanLiTaiKhoan';
import CaiDat from '../views/CaiDat';
import NotFound404 from '../views/NotFound404';
import DangNhap from '../views/DangNhap';
import ForgotPassword from '../views/ForgotPassword';
import ChangePassword from '../views/ChangePassword';

export const routeMain = [
    { path: '/quan-li-phieu-kham', main: (props) => <QuanLiPhieuKham {...props} /> },
    { path: '/quan-li-benh-nhan', main: (props) => <QuanLiBenhNhan {...props} /> },
    { path: '/quan-li-thuoc', main: (props) => <QuanLiThuoc {...props} /> },
    { path: '/quan-li-tai-khoan', main: (props) => <QuanLiTaiKhoan {...props} /> },
    { path: '/cai-dat', main: (props) => <CaiDat {...props} /> },
    { path: '/404', main: (props) => <NotFound404 {...props} /> },
]

export const routeAuth = [
    { path: '/auth/dang-nhap', main: (props) => <DangNhap {...props} /> },
    { path: '/auth/quen-mat-khau', main: (props) => <ForgotPassword {...props} /> },
    { path: '/auth/doi-mat-khau', main: (props) => <ChangePassword {...props} /> },
]