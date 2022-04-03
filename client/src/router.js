import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
// Layouts
import MainLayout from './containers/Main';
import AuthLayout from './containers/Auth';

export default function router(props) {
    return (
        <Router basename={"/"}>
            <Switch>
                <Route exact path="/auth/:path?" component={AuthLayout} />
                <Route component={MainLayout}></Route>
            </Switch>
        </Router>
    )
}
