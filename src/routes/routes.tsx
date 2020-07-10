import React from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import history from '../history';
import Users from '../pages/usersmanagment/users/users';
import UserRole from '../pages/usersmanagment/userrole/userrole';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Dashboard from '../pages/dashboard/dashboard';
import UserRoleToRights from '../pages/usersmanagment/userroletorights/userroletorights';
import Profile from '../pages/profile/profile';
import AddUser from '../pages/usersmanagment/adduser/adduser';
import Category from '../pages/categorymanagment/category/category';
import SubCategory from '../pages/categorymanagment/subcategory/subcategory';
import AddCategory from '../pages/categorymanagment/addcategory/addcategory';
import AddSubCategory from '../pages/categorymanagment/addsubcategory/addsubcategory';
import AddUserRole from '../pages/usersmanagment/adduserrole/adduserrole';
import CountryManagment from '../pages/locationmanagment/countrymanagment/countrymanagment';
import AddCountry from '../pages/locationmanagment/addcountry/addcountry';
import StateManagment from '../pages/locationmanagment/statemanagment/statemanagment';
import AddState from '../pages/locationmanagment/addstate/addstate';
import City from '../pages/locationmanagment/citymanagment/city';
import AddCity from '../pages/locationmanagment/addcity/addcity';
import ViewUser from '../pages/usersmanagment/viewuser/viewuser';
import ViewUserRole from '../pages/usersmanagment/viewuserrole/viewuserrole';
import ViewCategory from '../pages/categorymanagment/viewcategory/viewcategory';
import ViewSubCategory from '../pages/categorymanagment/viewsubcategory/viewsubcategory';
import ViewCity from '../pages/locationmanagment/viewcity/viewcity';
import ViewState from '../pages/locationmanagment/viewstate/viewstate';
import ViewCountry from '../pages/locationmanagment/viewcountry/viewcountry';
import Tables from '../component/tables/table';





const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// const Login = React.lazy(() => import('../pages/login/login'));
// const Signup = React.lazy(() => import('../pages/signup/signup'));
// const Dashboard = React.lazy(() => import('../pages/dashboard/dashboard'));
// const Users = React.lazy(() => import('../pages/usersmanagment/users/users'));
// const UserRole = React.lazy(() => import('../pages/usersmanagment/userrole/userrole'));
// const ForgotPassword = React.lazy(() => import('../pages/forgotpassword/forgotpassword'));
// const UserRoleToRights = React.lazy(() => import('../pages/usersmanagment/userroletorights/userroletorights'));
// const Profile = React.lazy(() => import('../pages/profile/profile'));
// const AddUser = React.lazy(() => import('../pages/usersmanagment/adduser/adduser'));
// const Category = React.lazy(() => import('../pages/categorymanagment/category/category'));
// const SubCategory = React.lazy(() => import('../pages/categorymanagment/subcategory/subcategory'));
// const AddCategory = React.lazy(() => import('../pages/categorymanagment/addcategory/addcategory'));
// const AddSubCategory = React.lazy(() => import('../pages/categorymanagment/addsubcategory/addsubcategory'));
// const AddUserRole = React.lazy(() => import('../pages/usersmanagment/adduserrole/adduserrole'));
// const CountryManagment = React.lazy(() => import('../pages/locationmanagment/countrymanagment/countrymanagment'));
// const AddCountry = React.lazy(() => import('../pages/locationmanagment/addcountry/addcountry'));
// const StateManagment = React.lazy(() => import('../pages/locationmanagment/statemanagment/statemanagment'));
// const AddState = React.lazy(() => import('../pages/locationmanagment/addstate/addstate'));
// const City = React.lazy(() => import('../pages/locationmanagment/citymanagment/city'));
// const AddCity = React.lazy(() => import('../pages/locationmanagment/addcity/addcity'));

const createRoutes = (
  <HashRouter>
    <Switch>
      <React.Suspense fallback={loading}>
        <Route exact path='/' render={(props: any) => <Login {...props} />} />
        <Route exact path='/login' render={(props: any) => <Login {...props} />} />
        <Route exact path='/dashboard' name='Dashboard' render={(props: any) => <Dashboard {...props} />} />
        <Route exact path='/signup' render={(props: any) => <Signup {...props} />} />
        {/* <Route exact path='/forgotpassword' render={(props: any) => <ForgotPassword {...props} />} /> */}
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
        <Route exact path='/viewuser' render={(props: any) => <ViewUser {...props} />} />
        <Route exact path='/viewuserrole' render={(props: any) => <ViewUserRole {...props} />} />
        <Route exact path='/viewcategory' render={(props: any) => <ViewCategory {...props} />} />
        <Route exact path='/viewsubcategory' render={(props: any) => <ViewSubCategory {...props} />} />
        <Route exact path='/viewcity' render={(props: any) => <ViewCity {...props} />} />
        <Route exact path='/viewstate' render={(props: any) => <ViewState {...props} />} />
        <Route exact path='/viewcountry' render={(props: any) => <ViewCountry {...props} />} />
        <Route exact path='/table' render={(props: any) => <Tables {...props} />} />
      </React.Suspense>
    </Switch>
  </HashRouter>
)

export default createRoutes;