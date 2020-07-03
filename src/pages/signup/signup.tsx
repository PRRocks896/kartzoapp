import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Constant from '../../constant/constant';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
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
                                        <h3><b>Create Account</b></h3>
                                        <p> Please enter personal information to continue</p>
                                        <div className="form-row">
                                            <div className="col-md-6 ">
                                                <label><b>First name</b></label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="validationCustom01" placeholder="First name" value="John" required />
                                                    <div className="valid-feedback">
                                                        Looks good!
                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <label><b>Last name</b></label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="validationCustom02" placeholder="Last name" value="Doe" required />
                                                    <div className="valid-feedback">
                                                        Looks good!
                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 ">
                                                <label><b>Email Address</b></label>
                                                <div className="input-group">
                                                    <input type="email" className="form-control" id="validationCustom03" placeholder="Email Address" required />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid email.
                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label><b>Password</b></label>
                                                <div className="input-group">
                                                    <input type="password" className="form-control" id="validationCustom04" placeholder="Password" required />
                                                    <div className="invalid-feedback">
                                                        Please provide a password.
                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check pl-0">
                                                <label className="ms-checkbox-wrap">
                                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                                    <i className="ms-checkbox-check"></i>
                                                </label>
                                                <span> <b>Agree to terms and conditions </b></span>
                                            </div>
                                        </div>
                                        <button className="btn mt-4 d-block w-100" type="button" style={{ backgroundColor: '#eea218', color: '#fff' }}>Create Account</button>
                                        <p className="mb-0 mt-3 text-center">Already have an account?<Link className="btn-link" style={{color: '#eea218' }} to="/login"> Login</Link></p>
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

export default Signup;
