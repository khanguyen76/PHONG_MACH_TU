import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
// Material UI
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function () {
    return (
        <div className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <span className="current-time">10:30 AM, Thứ sáu ngày 13/10/2022</span>
                    </div>
                    <div className="header__right">
                        <div className="user-box">
                            <div className="user-box__avatar">

                            </div>
                            <div className="user-box__name">
                                Admin
                            </div>
                            <ExpandMoreIcon className="user-box__arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
