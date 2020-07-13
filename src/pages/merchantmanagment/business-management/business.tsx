import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Col,
    FormGroup,
    Label,
    CustomInput,
    Form,
    Row,
} from 'reactstrap';
import './business.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class MerchantBusiness extends React.Component<{ history: any }> {

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
        password: '',
        passworderror: '',
        checked: false,
        selectedFileerror: ''
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.addUser = this.addUser.bind(this);
    }


    handleChange(checked: boolean) {
        this.setState({ checked });
    }

    async componentDidMount() {
        document.title = constant.addUserTitle + utils.getAppName();

        // const getProfile = await API.getProfile();
        // console.log("getprofile",getProfile);
    }

    onChangeHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files[0].name
        })
    }

    validate() {
        let firstnameerror = "";
        let lastnameerror = "";
        let emailerror = "";
        let mobilenumbererror = "";
        let passworderror = "";
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

        if (!this.state.password) {
            passworderror = "please enter password";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (firstnameerror || lastnameerror || emailerror || mobilenumbererror || passworderror || selectedFileerror) {
            this.setState({ firstnameerror, lastnameerror, emailerror, mobilenumbererror, passworderror, selectedFileerror });
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

    async addUser() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                firstnameerror: '',
                lastnameerror: '',
                emailerror: '',
                mobilenumbererror: '',
                passworderror: ''
            })
            if (this.state.firstname && this.state.lastname && this.state.email && this.state.mobilenumber && this.state.password && this.state.selectedFile) {
                const obj = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    password: this.state.password,
                    selectedFile: this.state.selectedFile
                }

                // const updateProfile = await API.updateProfile(obj);
                // console.log("updateProfile",updateProfile);

                if (this.state.firstname === obj.firstname && this.state.lastname === obj.lastname && this.state.email === obj.email && this.state.mobilenumber === obj.mobilenumber && this.state.password === obj.password) {
                    const msg = "User Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/users');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
    }

    removeIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
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
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Merchant Management</h1>
                                            </Col>
                                            {/* <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/users">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                    >
                                                        Back
                                        </Button>
                                                </Link>
                                            </Col> */}
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="first_name">First Name</Label>
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
                                                    <Label htmlFor="last_name">Last Name</Label>
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
                                                    <Label htmlFor="email">E-Mail</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your email"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.emailerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no">Mobile Number</Label>
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
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select City</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="city"
                                                        // onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select City</option>
                                                            <option value="Rajkot">Rajkot</option>
                                                            <option value="Ahmedabad">Ahmedabad</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        {/* <div className="mb-4 text-danger">
                                                        {this.state.selectcityerror}
                                                    </div> */}
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select User</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="customSelect"
                                                        // onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select User</option>
                                                            <option value="User-1">User-1</option>
                                                            <option value="User-2">User-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        {/* <div className="mb-4 text-danger">
                                                        {this.state.selectusererror}
                                                    </div> */}
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="shopname">Shop Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="shopname"
                                                        name="shopname"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your shop name"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                    {/* {this.state.shopnamerror} */}
                                                </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="Address">Address</Label>
                                                    <Input
                                                        type="text"
                                                        id="Address"
                                                        name="address"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your address"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                    {/* {this.state.addresserror} */}
                                                </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="Latitude">Latitude</Label>
                                                    <Input
                                                        type="text"
                                                        id="Latitude"
                                                        name="latitude"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your latitude"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                    {/* {this.state.latitudeerror} */}
                                                </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="Longitude">Longitude</Label>
                                                    <Input
                                                        type="text"
                                                        id="Longitude"
                                                        name="longitude"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your longitude"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                    {/* {this.state.longitudeerror} */}
                                                </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="ZIP-Code">ZIP-Code</Label>
                                                    <Input
                                                        type="text"
                                                        id="ZIP-Code"
                                                        name="zipcode"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your zipe-code"
                                                    />
                                                    {/* <div className="mb-4 text-danger">
                                                    {this.state.addresserror}
                                                </div> */}
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>User Image</p>
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
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addUser}
                                        >
                                            Save
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

export default MerchantBusiness;
