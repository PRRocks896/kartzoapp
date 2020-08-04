import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./routes/routes";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
// import ProtectedRoute from 'react-protected-route-component'

class App extends React.Component {
  render() {
    const loading = (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    );

    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route
        {...rest}
        render={(props) =>
          // console.log(Component)
          localStorage.getItem("token") !== null ? (
            // console.log("msg")
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props: any) =>
              localStorage.getItem("token") !== null ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} />
              )
            }
          />
          <PrivateRoute path="/" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
