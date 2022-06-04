import React, { useState, useEffect, useContext, useMemo } from 'react'
import { 
    useHistory, 
    Switch, 
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';
import { routeMain } from '../../constants/routes';
import Sidebar from './Layouts/sidebar';
import Header from './Layouts/header';
console.log(routeMain);
export default function MainLayout(props) {
    const location = useLocation()
    return (
        <div className="layout">
            <Sidebar />
            <Header/>
            <Switch>
                {console.log("location",location)}
                {/* <Route exact path="/">
                    <Redirect to={"/quan-li-phieu-kham"} />
                </Route> */}
                {routeMain.map((route, index) => {
                    return <Route key={index} path={route.path} exact component={props => route.main(props)} />
                })}
                {/* <Route path="*">
                    <Redirect to="/404" />
                </Route> */}
            </Switch>
        </div>
    )
}