import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //wrap the rest of the component/route
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path = "/" exact component={Home} />
            <Route path = "/signin" exact component={Signin} />
            <Route path = "/signup" exact component={Signup} />
            <PrivateRoute path = "/dashboard" exact component={Dashboard} />
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;