import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function () {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src="/images/white_logo.png" alt="" />
            </div>
            <ul className="menu">
                <li className="menu__item active">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-file-medical-alt"></i>
                        </div>
                        <label>Khám bệnh</label>
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-user-injured"></i>
                        </div>
                        <label>Bệnh nhân</label>
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-pills"></i>
                        </div>
                        <label>Thuốc</label>
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-chart-bar"></i>
                        </div>
                        <label>Báo cáo</label>
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-user-friends"></i>
                        </div>
                        <label>Tài khoản</label>
                    </Link>
                </li>
            </ul>
            <ul className="menu">
                <li className="menu__item">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-cog"></i>
                        </div>

                        <label>Cài đặt</label>
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/#">
                        <div className="icon">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>

                        <label>Đăng xuất</label>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
