import React from 'react'
import { BrowserRouter, Route, NavLink, useLocation } from "react-router-dom";
import nav from '../../../constants/nav';
export default function () {
    const location = useLocation()
    console.log(location.pathname);
    return (
        <Route>
        <div className="sidebar">
            <div className="logo">
                <img src="/images/white_logo.png" alt="" />
            </div>
            <ul className="menu">
                {
                    nav?.map((navItem, key) => (
                        <li key={key} className={`menu__item`}>
                            <NavLink
                                to={navItem.path}
                            >
                                <div className="icon">
                                    <i className={navItem.icon}></i>
                                </div>
                                <label>{navItem.title}</label>
                            </NavLink>
                        </li>
                    ))
                }

                {/* <li className="menu__item">
                    <NavLink to="/#">
                        <div className="icon">
                            <i className="fas fa-user-injured"></i>
                        </div>
                        <label>Bệnh nhân</label>
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/#">
                        <div className="icon">
                            <i className="fas fa-pills"></i>
                        </div>
                        <label>Thuốc</label>
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/#">
                        <div className="icon">
                            <i className="fas fa-chart-bar"></i>
                        </div>
                        <label>Báo cáo</label>
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/#">
                        <div className="icon">
                            <i className="fas fa-user-friends"></i>
                        </div>
                        <label>Tài khoản</label>
                    </NavLink>
                </li> */}
            </ul>
            <ul className="menu">
                <li className="menu__item">
                    <NavLink to="/cai-dat">
                        <div className="icon">
                            <i className="fas fa-cog"></i>
                        </div>
                        <label>Cài đặt</label>
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/dang-xuat">
                        <div className="icon">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>

                        <label>Đăng xuất</label>
                    </NavLink>
                </li>
            </ul>
        </div>
        </Route>
    )
}
