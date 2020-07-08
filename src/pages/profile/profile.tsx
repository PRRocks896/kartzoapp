import React from 'react';
import { Link } from 'react-router-dom';
import sweetAlert from '../../utils';
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
        mobilenumbererror: '',
        selectedFileerror:''
    }

    constructor(props: any) {
        super(props);
        this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
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
        let selectedFileerror = "";

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

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (firstnameerror || lastnameerror || emailerror || mobilenumbererror || selectedFileerror) {
            this.setState({ firstnameerror, lastnameerror, emailerror, mobilenumbererror,selectedFileerror});
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
                mobilenumbererror: '',
                selectedFileerror:''
            })
            if (this.state.firstname && this.state.lastname && this.state.email && this.state.mobilenumber && this.state.selectedFile) {
                const obj = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    selectedFile: this.state.selectedFile
                }

                // const updateProfile = await API.updateProfile(obj);
                // console.log("updateProfile",updateProfile);

                if (this.state.firstname === obj.firstname && this.state.lastname === obj.lastname && this.state.email === obj.email && this.state.mobilenumber === obj.mobilenumber && this.state.selectedFile === obj.selectedFile) {
                    const msg = "Profile Updated Successfully";
                    sweetAlert.showSuccess(msg);
                } else {
                    const msg1 = "Error";
                    sweetAlert.showError(msg1);
                }
            }
        };
    }

    onChangeHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files[0].name
        })
    }

    removeIcon() {
        this.setState({
            selectedFile: this.state.selectedFile = null
        })
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
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div>
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-trash cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p><b>User Image:</b></p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeHandler.bind(this)}
                                                                    />

                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.selectedFileerror}
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
                                            className="mb-2 mr-2 custom-button"
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
