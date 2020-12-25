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
import ResetPassword from "./pages/resetpassword/resetpassword";
// import ProtectedRoute from 'react-protected-route-component'

class App extends React.Component {
  state = {
    isDisconnected: false,
  };

  constructor(props: any) {
    super(props);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);

    console.log("net",this.state.isDisconnected)
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => this.setState({ isDisconnected: true }));
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  };

  render() {
    const { isDisconnected } = this.state;
   
    /** Private Route */
    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route
        {...rest}
        render={(props) =>
          // // console.log(Component)
          localStorage.getItem("token") !== null ? (
            // // console.log("msg")
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
      <>
        {isDisconnected && (
          <div className="internet-error">
            <p>Internet connection lost</p>
          </div>
        )}
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
            <Route
              exact
              path="/resetpassword/:guid"
              render={(props: any) =>
                localStorage.getItem("token") !== null ? (
                  <Redirect to="/" />
                ) : (
                  <ResetPassword {...props} />
                )
              }
            />
            <PrivateRoute path="/" component={Main} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
