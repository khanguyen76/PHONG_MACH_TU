import React, { useState, useEffect, useContext, useMemo } from 'react'
import { 
    useHistory, 
    Switch, 
    Route,
    Redirect 
} from 'react-router-dom';
import { routeMain } from '../../constants/routes';
import Sidebar from './Layouts/sidebar';
import Header from './Layouts/header';

export default function MainLayout(props) {
    return (
        <div className="layout">
            <Sidebar />
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Redirect to={"/dashboard"} />
                </Route>
                {routeMain.map((route, index) => {
                    return <Route key={index} path={route.path} exact component={props => route.main(props)} />
                })}
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </div>
    )
}
