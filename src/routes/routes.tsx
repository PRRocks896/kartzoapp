import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import history from '../history';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Dashboard from '../pages/dashboard/dashboard';
import ForgotPassword from '../pages/forgotpassword/forgotpassword';
import Users from '../pages/usersmanagment/users/users';
import UserRole from '../pages/usersmanagment/userrole/userrole';
import UserRoleToRights from '../pages/usersmanagment/userroletorights/userroletorights';

const createRoutes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/forgotpassword' component={ForgotPassword} />
      <Route exact path='/users' component={Users} />
      <Route exact path='/userrole' component={UserRole} />
      <Route exact path='/userroletorights' component={UserRoleToRights} />
    </Switch>
  </BrowserRouter>
)

export default createRoutes;