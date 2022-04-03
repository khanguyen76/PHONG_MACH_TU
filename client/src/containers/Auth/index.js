import React, { useState, useEffect, useContext, useMemo } from 'react'
import { 
    useHistory, 
    Switch, 
    Route,
    Redirect 
} from 'react-router-dom';
import { routeAuth } from '../../constants/routes';

export default function MainLayout(props) {
    return (
        <div className="layout">
            <Switch>
                {routeAuth.map((route, index) => {
                    return <Route key={index} path={route.path} exact component={props => route.main(props)} />
                })}
            </Switch>
        </div>
    )
}