import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import history from '../history';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Login = React.lazy(() => import('../pages/login/login'));
const Signup = React.lazy(() => import('../pages/signup/signup'));
const Dashboard = React.lazy(() => import('../pages/dashboard/dashboard'));
const Users = React.lazy(() => import('../pages/usersmanagment/users/users'));
const UserRole = React.lazy(() => import('../pages/usersmanagment/userrole/userrole'));
const ForgotPassword = React.lazy(() => import('../pages/forgotpassword/forgotpassword'));
const UserRoleToRights = React.lazy(() => import('../pages/usersmanagment/userroletorights/userroletorights'));
const Profile = React.lazy(() => import('../pages/profile/profile'));

const createRoutes = (
  <BrowserRouter>
    <Switch>
      <React.Suspense fallback={loading}>
        <Route exact path='/' render={(props: any) => <Login {...props} />} />
        <Route exact path='/login' render={(props: any) => <Login {...props} />} />
        <Route exact path='/dashboard' name='Dashboard' render={(props: any) => <Dashboard {...props} />} />
        <Route exact path='/signup' render={(props: any) => <Signup {...props} />} />
        <Route exact path='/forgotpassword' render={(props: any) => <ForgotPassword {...props} />} />
        <Route exact path='/users' render={(props: any) => <Users {...props} />} />
        <Route exact path='/userrole' render={(props: any) => <UserRole {...props} />} />
        <Route exact path='/userroletorights' render={(props: any) => <UserRoleToRights {...props} />} />
        <Route exact path='/profile' render={(props: any) => <Profile {...props} />} />
      </React.Suspense>
    </Switch>
  </BrowserRouter>
)

export default createRoutes;