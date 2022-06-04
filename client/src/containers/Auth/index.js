import React, { useState, useEffect, useContext, useMemo } from 'react'
import { 
    useHistory, 
    Switch, 
    Route,
    Redirect 
} from 'react-router-dom';
import { routeAuth } from '../../constants/routes';
// Contexts
import { stateContext } from "../../contexts"
import { saveProfile } from '../../contexts/actions'
export default function MainLayout(props) {
    const history = useHistory()
    const { auth } = useContext(stateContext).state;
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            history.push("/")
        }
    }, [auth])
    return (
        <div className='auth-layout'>
            <Switch>
                {routeAuth.map((route, index) => {
                    return <Route key={index} path={route.path} exact component={props => route.main(props)} />
                })}
            </Switch>
        </div>
    )
}