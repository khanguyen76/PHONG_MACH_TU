import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
// Material UI
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment'
export default function ({
    profile
}) {
    return (
        <div className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <span className="current-time">{moment(new Date()).format("hh:mm A, dddd DD/MM/YYYY")}</span>
                    </div>
                    <div className="header__right">
                        <div className="user-box">
                            <div className="user-box__avatar">
                                <span>{profile?.ho_ten.split(" ").at(-1).charAt(0)}</span>
                            </div>
                            <div className="user-box__name">
                                {profile?.ho_ten}
                            </div>
                            <ExpandMoreIcon className="user-box__arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
