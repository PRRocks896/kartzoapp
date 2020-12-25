import React from "react";
import "./login.css";
import { API, RoleAPI } from "../../service/index.service";
import utils from "../../utils";
import constant from "../../constant/constant";
import axios from "axios";
import apiUrl from "../../apicontroller/apicontrollers";
import {
  loginCreateRequest,
  forgotPasswordRequest,
  addLoginStateRequest,
  getDataByIdRequest,
} from "../../modelController";
import { Button, Input, FormGroup, Label } from "reactstrap";
import { Modal } from "react-bootstrap";
import { any } from "prop-types";
import EventEmitter from "../../event";
const interceptor = require("../../intercepter");
const publicIp = require("public-ip");

class Login extends React.Component<{ history: any }> {

  /** Login state */
  loginState: addLoginStateRequest = constant.loginPage.state;
  state = {
    email: this.loginState.email,
    emailerror: this.loginState.emailerror,
    forgotemail: this.loginState.forgotemail,
    forgotemailerror: this.loginState.forgotemailerror,
    password: this.loginState.password,
    passworderror: this.loginState.passworderror,
    ipAddress: this.loginState.ipAddress,
    isButton: this.loginState.isButton,
    type: this.loginState.type,
    forgot: this.loginState.forgot,
    disabled: this.loginState.disabled,
    refreshTokenTimeout:0,
    disabledForgot:false
  };

  /** Consructor call */
  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChangeEventPassword = this.handleChangeEventPassword.bind(this);
    this.login = this.login.bind(this);
    this.forgotpassword = this.forgotpassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.forgotmodelOpen = this.forgotmodelOpen.bind(this);
    this.handleCloseForgot = this.handleCloseForgot.bind(this);
  }

  /** Forgot Model Open */
  forgotmodelOpen() {
    this.setState({ forgot: !this.state.forgot });
  }

  /** Forgot Model Close */
  handleCloseForgot() {
    this.setState({ forgot: !this.state.forgot });
  }

  /** Page Render  Call */
  async componentDidMount() {
    document.title = constant.loginTitle + utils.getAppName();
    // const ipaddress = await publicIp.v4();
    this.setState({
      ipAddress: this.state.ipAddress = "125.123.1222.141",
      isButton: this.state.isButton = false,
    });
  }

  /**
   * 
   * @param event : update state value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /**
   * 
   * @param event : change password event state
   */
  handleChangeEventPassword(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Click on next page */
  handleClick = () =>
    this.setState(({ type }: any) => ({
      type: type === "password" ? "text" : "password",
    }));

  /** check validate or not */
  validate() {
    let emailerror = "";
    let passworderror = "";

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    if (!this.state.password) {
      passworderror = "please enter password";
    }

    if (emailerror || passworderror) {
      this.setState({ emailerror, passworderror });
      return false;
    }
    return true;
  }

  /** check validate or not password */
  validatePassword() {
    let forgotemailerror = "";

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.forgotemail) {
      forgotemailerror = "please enter email";
    } else if (!reg.test(this.state.forgotemail)) {
      forgotemailerror = "please enter valid email";
    }

    if (forgotemailerror) {
      this.setState({ forgotemailerror });
      return false;
    }
    return true;
  }

  /** Forgot Password */
  async forgotpassword() {
    this.setState({
      disabledForgot:this.state.disabledForgot = true
    })
    const isValid = this.validatePassword();
    if (isValid) {
      this.setState({
        forgotemailerror: this.state.forgotemailerror = "",
      });
      if (this.state.forgotemail) {
        const obj: forgotPasswordRequest = {
          email: this.state.forgotemail,
        };

        var forgotPassword: any = await API.forgotPassword(obj);
        // console.log("forgotPassword", forgotPassword);

        if (forgotPassword) {
          const msg1 = forgotPassword.data.message;
              utils.showSuccess(msg1);
          this.setState({
            disabledForgot:this.state.disabledForgot = false,
            forgot: this.state.forgot = false,
          });
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      } else {
        this.setState({
          disabledForgot:this.state.disabledForgot = false
        })
      }
    } else {
      this.setState({
        disabledForgot:this.state.disabledForgot = false
      })
    }
  }

  /** Refresh token */
  async refreshToken() {
    
    // const ipaddress = publicIp.v4();
    // const users: any = localStorage.getItem("user");
    // let user = JSON.parse(users);
    // const data = {
    //   deviceType: 1,
    //   deviceId: "deviceId",
    //   ipAddress: await ipaddress,
    //   loginToken: user.token,
    //   refreshToken: user.refreshToken,
    // };

    // axios
    // .post(constant.apiUrl + "token", data)
    // .then(async (res: any) => {
    //   console.log("res",res);
    //   const users: any = localStorage.getItem("user");
    //   let user = JSON.parse(users);
    //   user.token = res.data.token;
    //   user.refreshToken =  res.data.refreshToken;
    //   localStorage.setItem("user",JSON.stringify(user));
    //   localStorage.setItem("token",res.data.token);
    //   await this.tokenexpire(res.data.token);
    // })
  }

  /**
   * 
   * @param menu : menu
   */
  sidenavarray(rights:any,menu:any) {
  
    let sideMenu:any = [];
    menu.map((data: any, index: number) => {
      if(data.menuItemView === 'header') {
        sideMenu.push({
          name: data.menuItemName,
          type:data.menuItemView
        })
      }
      if(data.menuItemView === 'Index') {
        sideMenu.push({
          name: data.menuItemName,
          icon: data.iconImage,
          url: '/' + data.menuItemController,
          type: data.menuItemView
        })
      }
    });
    localStorage.setItem('menuItems',JSON.stringify(sideMenu));
  }

  // stopRefreshTokenTimer() {
  //   clearTimeout(this.state.refreshTokenTimeout);
  // }

  /** Login */
  async login() {
    this.setState({
      isButton: true,
      disabled: this.state.disabled = true,
    });
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        emailerror: this.state.emailerror = "",
        passworderror: this.state.passworderror = "",
      });
      if (this.state.email && this.state.password) {
        const obj = {
          email: this.state.email,
          password: this.state.password,
          deviceType: 1,
          deviceId: "deviceId",
          ipAddress: this.state.ipAddress,
          userId: 0,
        };

        axios
          .post(constant.apiUrl + apiUrl.userController.createData, obj)
          .then(async (res: any) => {
            // console.log("login", res);
            if (res) {
              if (res.data.status === 200) {
                this.setState({
                  isButton: true,
                  disabled: true,
                });
                var userData = res.data.resultObject;
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", userData.token);
                localStorage.setItem("refreshtoken", userData.refreshToken);
                localStorage.setItem("rolePreveliges",  JSON.stringify(userData.roleprivileges));
                // localStorage.setItem("menuItems", JSON.stringify(userData.menuItems));
                this.sidenavarray(userData.roleprivileges,userData.menuItems);
              
                const ipaddress = await publicIp.v4();
                const users: any = localStorage.getItem("user");
                let user = JSON.parse(users);
                const obj = {
                  Id: "2120d758-b8bd-42cd-a265-a3ca30845e2f",
                  userName: "b3EB+9LJEVMrXNFQ6ZekiPGVTSAirzq1xcYlUViCxic=",
                  Password: "O8QziWH1Sq75LO+lH9Q9AqB/HbgvlglvDYPUXykFRvM=",
                  Key: "digitalvicharcommonkartzoapi"
                };
                var getToken = await API.getToken(obj);
                console.log("getToken", getToken);
                if (getToken) {
                  localStorage.setItem("merchantToken", getToken.data.token);
                }
               
                this.props.history.push("/dashboard");
              } else {
                this.setState({
                  isButton: this.state.isButton = false,
                  disabled: false,
                });
                const msg1 = res.data.message;
                utils.showError(msg1);
              }
            } else {
              this.setState({
                isButton: this.state.isButton = false,
                disabled: false,
              });
              // const msg1 = "Internal server error";
              // utils.showError(msg1);
            }
          });
      }
    } else {
      this.setState({
        isButton: this.state.isButton = false,
        disabled: false,
      });
    }
  }

  /**
   * 
   * @param event : enter pressed call
   */
  enterPressed(event: any) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.login();
    }
  }

  /** Render DOM */
  render() {
    return (
      <div className="ms-body ms-primary-theme ms-logged-out">
        <div id="preloader-wrap">
          <div className="spinner spinner-8">
            <div className="ms-circle1 ms-child"></div>
            <div className="ms-circle2 ms-child"></div>
            <div className="ms-circle3 ms-child"></div>
            <div className="ms-circle4 ms-child"></div>
            <div className="ms-circle5 ms-child"></div>
            <div className="ms-circle6 ms-child"></div>
            <div className="ms-circle7 ms-child"></div>
            <div className="ms-circle8 ms-child"></div>
            <div className="ms-circle9 ms-child"></div>
            <div className="ms-circle10 ms-child"></div>
            <div className="ms-circle11 ms-child"></div>
            <div className="ms-circle12 ms-child"></div>
          </div>
        </div>

        <div
          className="ms-aside-overlay ms-overlay-left ms-toggler"
          data-target="#ms-side-nav"
          data-toggle="slideLeft"
        ></div>
        <div
          className="ms-aside-overlay ms-overlay-right ms-toggler"
          data-target="#ms-recent-activity"
          data-toggle="slideRight"
        ></div>

        <main className="body-content">
          <div className="ms-content-wrapper ms-auth">
            <div className="ms-auth-container">
              <div className="ms-auth-col">
                <div className="ms-auth-bg"></div>
              </div>
              <div className="ms-auth-col">
                <div className="ms-auth-form">
                  <form className="needs-validation">
                    <h3>
                      <b>{constant.account}</b>
                    </h3>
                    <p>{constant.loginpage}</p>
                    <div className="mb-3">
                      <label>
                        <b>{constant.email}</b>
                      </label>
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="validationCustom08"
                          placeholder="Email Address"
                          onKeyPress={this.enterPressed.bind(this)}
                          onChange={this.handleChangeEvent}
                        />
                      </div>
                      <div className="mb-4 text-danger">
                        {this.state.emailerror}
                      </div>
                    </div>
                    <div className="mb-2">
                      <label>
                        <b>{constant.password}</b>
                      </label>
                      <div className="right-inner-addon input-group">
                        <input
                          type={this.state.type}
                          name="password"
                          className="form-control"
                          id="validationCustom09"
                          placeholder="Password"
                          onKeyPress={this.enterPressed.bind(this)}
                          onChange={this.handleChangeEvent}
                        />
                        {this.state.type === "password" ? (
                          <i
                            onClick={this.handleClick}
                            className="fas fa-eye"
                          ></i>
                        ) : (
                          <i
                            onClick={this.handleClick}
                            className="fas fa-eye-slash"
                          ></i>
                        )}
                      </div>

                      <div className="mb-4 text-danger">
                        {this.state.passworderror}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="ms-checkbox-wrap">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                        />
                        <i className="ms-checkbox-check"></i>
                      </label>{" "}
                      <span>
                        <b> {constant.recoverPassword} </b>
                      </span>
                      <label className="d-block mt-3">
                        <a className="btn-link" onClick={this.forgotmodelOpen}>
                          <b style={{ color: "#eea218" }}>{constant.forgot} </b>
                        </a>
                      </label>
                    </div>
                    {this.state.isButton === false ? (
                      <button
                        className="btn mt-4 d-block w-100"
                        type="button"
                        style={{
                          backgroundColor: "#eea218",
                          color: "#fff",
                          fontWeight: 500,
                        }}
                        onClick={this.login}
                        disabled={this.state.disabled}
                      >
                        {constant.signin}
                      </button>
                    ) : (
                      <div className="spinerButton">
                        <div>
                          <button
                            className="btn mt-4 d-block w-100"
                            disabled={this.state.disabled}
                            type="button"
                            style={{
                              backgroundColor: "#eea218",
                              color: "#fff",
                              fontWeight: 500,
                            }}
                          >
                            {constant.signin}
                          </button>
                        </div>
                        <div className="spinners"></div>
                      </div>
                    )}
                    {/* <p className="mb-0 mt-3 text-center">{constant.notmember} <b className="btn-link"><Link to="/signup" style={{ color: 'rgb(238, 162, 24)',fontWeight:600 }}>{constant.signup}</Link></b>
                                        </p> */}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <Modal isOpen={this.state.forgot} fade={this.state.forgot} toggle={this.handleCloseForgot}>
            <ModalHeader>{constant.forgotpassword}</ModalHeader>
            <ModalBody style={{ margin: "auto" }}>
              <FormGroup>
                <div className="text-center">
                  <Label> {constant.email}:</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    onChange={this.handleChangeEventPassword}
                    required
                  />
                  <div className="mb-4 text-danger">
                    {this.state.emailerror}
                  </div>
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <div className="button-ct">
                <Button color="primary" onClick={this.forgotpassword}>
                  {" "}
                  {constant.reset}
                </Button>{" "}
              </div>
            </ModalFooter>
          </Modal> */}

          <Modal
            className="modal-dialog-centered"
            show={this.state.forgot}
            onHide={this.handleCloseForgot}
          >
            <Modal.Header closeButton>
              <Modal.Title>{constant.forgotpassword}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ margin: "auto" }}>
              <FormGroup>
                <div className="text-center">
                  <Label> {constant.email}:</Label>
                  <Input
                    type="email"
                    name="forgotemail"
                    placeholder="Email Address"
                    className="form-control"
                    onChange={this.handleChangeEventPassword}
                    required
                  />
                  <div className="mb-4 text-danger">
                    {this.state.forgotemailerror}
                  </div>
                </div>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <div className="button-ct">
                <Button className="bbg" onClick={this.forgotpassword} disabled={this.state.disabledForgot}>
                  {constant.reset}
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </main>
      </div>
    );
  }
}

export default Login;
