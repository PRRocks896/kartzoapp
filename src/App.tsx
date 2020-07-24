import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Main from './routes/routes';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Dashboard from './pages/dashboard/dashboard';
// import ProtectedRoute from 'react-protected-route-component'

class App extends React.Component {

  render() {
    console.log('localstoreage',localStorage.getItem('token'));
   
    const loading = (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )

    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route {...rest} render={props => (
        // console.log(Component)
        props.location.pathname !== '/admin/' &&  1<2 ? (
          // console.log("enter")
         1<2 ? (
            // console.log("msg")
            <Component {...props} />
          ) : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
        ) : (  <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />) 
      )} />
    )
    return (
      // <div>
      //   {Main}
      // </div>
      <HashRouter>
        <Switch>
          <React.Suspense fallback={loading}>
          <Route exact path='/' render={(props: any) => (<Login {...props} />) } />
            <Route exact path='/login' render={(props: any) => ( localStorage.getItem('token') !== null ? (<Redirect to="/dashboard" />) : (<Login {...props} />)) } />
            {/* <Route exact path='/' render={(props: any) => <Login {...props} />} /> */}
            <Route exact path='/signup' render={(props: any) => (localStorage.getItem('token') ? (<Redirect to="/dashboard" />) : (<Signup {...props} />)) } />
            <PrivateRoute path="/" component={Main} />
          </React.Suspense>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
