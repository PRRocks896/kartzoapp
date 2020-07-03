import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import history from '../history';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Dashboard from '../pages/dashboard/dashboard';
import ForgotPassword from '../pages/forgotpassword/forgotpassword';

const createRoutes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/forgotpassword' component={ForgotPassword} />
    </Switch>
  </BrowserRouter>
)

export default createRoutes;