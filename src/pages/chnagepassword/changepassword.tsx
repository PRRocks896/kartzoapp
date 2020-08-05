import React, { Component } from 'react';
import Swal from 'sweetalert2';
import API from "../../service/service";
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import utils from '../../utils';
import constant from '../../constant/constant';
import NavBar from '../navbar/navbar';

class ChangePassword extends Component {

    state = {
        oldpassword: '',
        oldpassworderror:'',
        newpassword: '',
        newpassworderror:'',
        confirmpassword:'',
        confirmpassworderror:'',
        userid:0
    }

    constructor(props:any) {
        super(props);
        this.ChangePassword = this.ChangePassword.bind(this);
    }
    
    async componentDidMount() {
        let userid:any = localStorage.getItem('user');
        this.state.userid = JSON.parse(userid).userID
        document.title = constant.changepassword + utils.getAppName();
      }
    

    validate() {
        let oldpassworderror = "";
        let newpassworderror = "";
        let confirmpassworderror = "";

        if(!this.state.oldpassword) {
            oldpassworderror = "please enter old password"
        }

        if(!this.state.newpassword) {
            newpassworderror = "please enter new password"
        }

        if(!this.state.confirmpassword) {
            confirmpassworderror = "please enter confirm password"
        }

        if (newpassworderror || oldpassworderror || confirmpassworderror) {
            this.setState({ newpassworderror, oldpassworderror, confirmpassworderror});
            return false;
        }
        return true;

    }

   async ChangePassword() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                newpassworderror:'',
                oldpassworderror:'',
                confirmpassworderror:''
            })
            if(this.state.newpassword === this.state.confirmpassword && this.state.oldpassword !== this.state.newpassword) {
                const obj  = {
                    userId: this.state.userid,
                    password: this.state.newpassword
                }
               const updatePassword = await API.updatePassword(obj);
                console.log("updatePassword",updatePassword);
                
                if (updatePassword.resultObject !== null) {
                    const msg = "Password Changed Successfully";
                    utils.showSuccess(msg);
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }

            } else if(this.state.newpassword !== this.state.confirmpassword) {
                const msg1 = "new password && confirm password are not same please check again";
                utils.showError(msg1);
            } else if(this.state.oldpassword === this.state.newpassword) {
                const msg1 = "new password && old password are same please change new password";
                utils.showError(msg1);
            } else {
                const msg1 = "Error";
                utils.showError(msg1);
            }
        };
    }


    render() {

        return (
            <NavBar>
                <div className="ms-content-wrapper">
            <div className="row">
              
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardHeader>
                                <strong className="maincontent">Change Password</strong>
                             
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label htmlFor="oldpassword">OldPassword</Label>
                                            <Input
                                                type="password"
                                                id="oldpassword"
                                                name="oldpassword"
                                                className="form-control"
                                                onChange={(e) =>
                                                    this.state.oldpassword = e.target.value
                                                }
                                                placeholder="Enter your Old Password"
                                                required
                                            />
                                                 <div className="text-danger">
                                                        {this.state.oldpassworderror}
                                                    </div>

                                        </FormGroup>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label htmlFor="newpassword">NewPassword</Label>
                                            <Input
                                                type="password"
                                                id="newpassword"
                                                name="newpassword"
                                                className="form-control"
                                                onChange={(e) =>
                                                    this.state.newpassword = e.target.value
                                                }
                                                placeholder="Enter your New Password"
                                                required
                                            />
                                                 <div className="text-danger">
                                                        {this.state.newpassworderror}
                                                    </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label htmlFor="confirmpassword">ConfirmPassword</Label>
                                            <Input
                                                type="password"
                                                id="confirmpassword"
                                                name="confirmpassword"
                                                className="form-control"
                                                onChange={(e) =>
                                                    this.state.confirmpassword = e.target.value
                                                }
                                                placeholder="Enter your Confirm Password"
                                                required
                                            />
                                                 <div className="text-danger">
                                                        {this.state.confirmpassworderror}
                                                    </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                             
                                <Button 
                                type="button" 
                                className="mb-2 mr-2 custom-button"
                                color="primary"
                                onClick={this.ChangePassword}
                                >Update</Button>
                            </CardBody>
                        </Card>
                    </Col>
            
                </div>
                </div>
            </NavBar>
        );
    }
}

export default ChangePassword;