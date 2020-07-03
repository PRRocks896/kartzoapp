import React from 'react';
import './login.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom';
import Constant from '../../constant/constant';

class Login extends React.Component {
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

                <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>


                <main className="body-content">
                    <div className="ms-content-wrapper ms-auth">
                        <div className="ms-auth-container">
                            <div className="ms-auth-col">
                                <div className="ms-auth-bg"></div>
                            </div>
                            <div className="ms-auth-col">
                                <div className="ms-auth-form">
                                    <form className="needs-validation">
                                        <h3><b>Login to Account</b></h3>
                                        <p>Please enter your email and password to continue</p>
                                        <div className="mb-3">
                                            <label><b>Email Address</b></label>
                                            <div className="input-group">
                                                <input type="email" className="form-control" id="validationCustom08" placeholder="Email Address" required />
                                                <div className="invalid-feedback">Please provide a valid email.</div>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label><b>Password</b></label>
                                            <div className="input-group">
                                                <input type="password" className="form-control" id="validationCustom09" placeholder="Password" required />
                                                <div className="invalid-feedback">Please provide a password.</div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="ms-checkbox-wrap">
                                                <input className="form-check-input" type="checkbox" value="" /> <i className="ms-checkbox-check"></i>
                                            </label> <span><b> Remember Password </b></span>
                                            <label className="d-block mt-3"><a href="" className="btn-link" data-toggle="modal" data-target="#modal-12"><b style={{ color: '#eea218' }}>Forgot Password? </b></a>
                                            </label>
                                        </div>
                                        <button className="btn mt-4 d-block w-100" type="button" style={{ backgroundColor: '#eea218', color: '#fff' }}>Sign In</button>
                                        <p className="mb-0 mt-3 text-center">Don't have an account? <a className="btn-link" href="default-register.html"><b style={{ color: '#eea218' }}><Link to="/signup">Create Account</Link></b></a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="modal-12" tabIndex={1} role="dialog" aria-labelledby="modal-12">
                        <div className="modal-dialog modal-dialog-centered modal-min" role="document">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                                    </button> <i className="flaticon-secure-shield d-block"></i>
                                    <h1>Forgot Password?</h1>
                                    <p>Enter your email to recover your password</p>
                                    <form method="post">
                                        <div className="ms-form-group has-icon">
                                            <input type="text" placeholder="Email Address" className="form-control" name="forgot-password" value="" /> <i className="material-icons">email</i>
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-none">Reset Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Login;
