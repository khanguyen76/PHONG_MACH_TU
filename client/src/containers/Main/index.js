import React, { useState, useEffect, useContext, useMemo } from 'react'
import { 
    useHistory, 
    Switch, 
    Route,
    Redirect 
} from 'react-router-dom';
import { routeMain } from '../../constants/routes';

export default function MainLayout(props) {
    return (
        <div className="layout">
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