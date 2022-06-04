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
// API
import { useLazyQuery } from "@apollo/client"
import { getProfile } from '../../graphql-queries/TAI_KHOAN'
// Contexts
import { stateContext } from "../../contexts"
import { saveProfile } from '../../contexts/actions'
export default function MainLayout(props) {
    const history = useHistory()
    const dispatch = useContext(stateContext).dispatch;
    const { auth } = useContext(stateContext).state;
    const [getProfileAccount] = useLazyQuery (getProfile)

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!auth && token) {
            (async () =>{
                let res = await getProfileAccount({
                    variables: { token },
                })
                if (res.data.TAI_KHOAN) {
                    saveProfile({
                        account: {
                            accessToken: token,
                            profile: res.data.TAI_KHOAN
                        }, dispatch
                    })
                }else{
                    localStorage.removeItem("access_token");
                    history.push("/auth/dang-nhap") 
                }
            })()
        }
        else if(!token || auth?.isLogin == false){
            history.push("/auth/dang-nhap")
        }
    }, [auth])
    return (
        <div className="layout">
            <Sidebar />
            <Header profile={auth?.profile} />
            <Switch>
                <Route exact path="/">
                    <Redirect to={"/quan-li-phieu-kham"} />
                </Route>
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
