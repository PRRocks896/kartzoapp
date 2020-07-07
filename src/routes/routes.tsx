import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
const AddUser = React.lazy(() => import('../pages/usersmanagment/adduser/adduser'));
const Category = React.lazy(() => import('../pages/categorymanagment/category/category'));
const SubCategory = React.lazy(() => import('../pages/categorymanagment/subcategory/subcategory'));
const AddCategory = React.lazy(() => import('../pages/categorymanagment/addcategory/addcategory'));
const AddSubCategory = React.lazy(() => import('../pages/categorymanagment/addsubcategory/addsubcategory'));
const AddUserRole = React.lazy(() => import('../pages/usersmanagment/adduserrole/adduserrole'));
const CountryManagment = React.lazy(() => import('../pages/locationmanagment/countrymanagment/countrymanagment'));
const AddCountry = React.lazy(() => import('../pages/locationmanagment/addcountry/addcountry'));
const StateManagment = React.lazy(() => import('../pages/locationmanagment/statemanagment/statemanagment'));
const AddState = React.lazy(() => import('../pages/locationmanagment/addstate/addstate'));
const City = React.lazy(() => import('../pages/locationmanagment/citymanagment/city'));
const AddCity = React.lazy(() => import('../pages/locationmanagment/addcity/addcity'));

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
        <Route exact path='/adduser' render={(props: any) => <AddUser {...props} />} />
        <Route exact path='/edituser' render={(props: any) => <AddUser {...props} />} />
        <Route exact path='/category' render={(props: any) => <Category {...props} />} />
        <Route exact path='/subcategory' render={(props: any) => <SubCategory {...props} />} />
        <Route exact path='/addcategory' render={(props: any) => <AddCategory {...props} />} />
        <Route exact path='/editcategory' render={(props: any) => <AddCategory {...props} />} />
        <Route exact path='/addsubcategory' render={(props: any) => <AddSubCategory {...props} />} />
        <Route exact path='/editsubcategory' render={(props: any) => <AddSubCategory {...props} />} />
        <Route exact path='/adduserrole' render={(props: any) => <AddUserRole {...props} />} />
        <Route exact path='/edituserrole' render={(props: any) => <AddUserRole {...props} />} />
        <Route exact path='/country' render={(props: any) => <CountryManagment {...props} />} />
        <Route exact path='/addcountry' render={(props: any) => <AddCountry {...props} />} />
        <Route exact path='/editcountry' render={(props: any) => <AddCountry {...props} />} />
        <Route exact path='/state' render={(props: any) => <StateManagment {...props} />} />
        <Route exact path='/addstate' render={(props: any) => <AddState {...props} />} />
        <Route exact path='/editstate' render={(props: any) => <AddState {...props} />} />
        <Route exact path='/city' render={(props: any) => <City {...props} />} />
        <Route exact path='/addcity' render={(props: any) => <AddCity {...props} />} />
        <Route exact path='/editcity' render={(props: any) => <AddCity {...props} />} />
      </React.Suspense>
    </Switch>
  </BrowserRouter>
)

export default createRoutes;