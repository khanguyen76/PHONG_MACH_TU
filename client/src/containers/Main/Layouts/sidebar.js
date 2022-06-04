import React from 'react'
import { BrowserRouter, Route, NavLink, useLocation, useHistory } from "react-router-dom";
import nav from '../../../constants/nav';
export default function () {
    const history = useHistory()
    const handleLogout = () =>{
        localStorage.removeItem('access_token')
        history.push('/auth/dang-nhap')
    }
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
                    <a onClick={handleLogout}>
                        <div className="icon">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <label>Đăng xuất</label>
                    </a>
                </li>
            </ul>
        </div>
        </Route>
    )
}
