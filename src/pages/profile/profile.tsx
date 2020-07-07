import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Col,
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
import './profile.css';
import NavBar from '../navbar/navbar';
import API from '../../service/service';

class Profile extends React.Component {

    state = {
        selectedFile: null,
        firstname: '',
        firstnameerror: '',
        lastname: '',
        lastnameerror: '',
        email: '',
        emailerror: '',
        mobilenumber: '',
        mobilenumbererror: ''
    }

    constructor(props: any) {
        super(props);
        this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    async componentDidMount() {
        // const getProfile = await API.getProfile();
        // console.log("getprofile",getProfile);
    }

    validate() {
        let firstnameerror = "";
        let lastnameerror = "";
        let emailerror = "";
        let mobilenumbererror = "";

        if (!this.state.firstname) {
            firstnameerror = "please enter firstname";
        }

        if (!this.state.lastname) {
            lastnameerror = "please enter lastname";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "please enter valid email";
        }

        if (!this.state.mobilenumber) {
            mobilenumbererror = "please enter mobile number";
        }

        if (firstnameerror || lastnameerror || emailerror || mobilenumbererror) {
            this.setState({ firstnameerror, lastnameerror, emailerror, mobilenumbererror });
            return false;
        }
        return true;
    };

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    async Profile() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                firstnameerror: '',
                lastnameerror: '',
                emailerror: '',
                mobilenumbererror: ''
            })
            if (this.state.firstname && this.state.lastname && this.state.email && this.state.mobilenumber) {
                const obj = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber
                }

                // const updateProfile = await API.updateProfile(obj);
                // console.log("updateProfile",updateProfile);

                if (this.state.firstname === obj.firstname && this.state.lastname === obj.lastname && this.state.email === obj.email && this.state.mobilenumber === obj.mobilenumber) {
                    Swal.fire({
                        text: "Profile Updated Successfully",
                        icon: 'success'
                    });
                }
            }
        };
    }

    render() {

        return (
            <>
                <NavBar>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <strong>My Profile</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                                <FormGroup className="img-upload">
                                                    <div>
                                                        <p>Select File:</p>
                                                        <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg"></i></Label>
                                                        <Input
                                                            id="file-input"
                                                            type="file"
                                                            className="form-control"
                                                            name="file"
                                                        // onChange={this.onChangeHandler.bind(this)}
                                                        />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="first_name">First_Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="first_name"
                                                        name="firstname"
                                                        className="form-control"
                                                        value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your first name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.firstnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name">Last_Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="last_name"
                                                        name="lastname"
                                                        className="form-control"
                                                        value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your last name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.lastnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="profile">E-Mail</Label>
                                                    <Input
                                                        type="email"
                                                        id="profile"
                                                        name="email"
                                                        className="profile form-control"
                                                        value={this.state.email}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your email"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no">Mobile_Number</Label>
                                                    <Input
                                                        type="text"
                                                        id="mobile_no"
                                                        name="mobilenumber"
                                                        className="form-control"
                                                        value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your mobile number"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.mobilenumbererror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                     
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            onClick={this.Profile}
                                        >
                                            Update
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    </div>
                </NavBar>
            </>
        );
    }
}

export default Profile;
