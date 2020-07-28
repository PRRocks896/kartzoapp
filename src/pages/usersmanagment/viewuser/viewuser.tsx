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
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { any } from 'prop-types';
export interface viewUser {

}
class ViewUser extends React.Component<{ history: any,location:any}> {
    
    state = {
        userdata: {
            firstName:'',
            lastName:'',
            email:'',
            phone:''
        }
    };
    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        document.title = constant.viewUserTitle + utils.getAppName();
        const usderId = this.props.location.pathname.split('/')[2];
        if(usderId !== undefined) {
          const obj = {
            id:usderId
          }
          const getUserById: any= await API.getUserById(obj);
          
          this.setState({
           userdata:{
            firstName:getUserById.resultObject.firstName,
            lastName:getUserById.resultObject.lastName,
            email:getUserById.resultObject.email,
            phone:getUserById.resultObject.phone
           }
          })
           
    }
}


    render() {

        console.log("viewarray",this.state.userdata)

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
                                                <h1>View User Details</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
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
                                            </Col>
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="first_name"><b>First Name</b></Label>
        <p>{this.state.userdata.firstName}</p>

                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name"><b>Last Name</b></Label>
        <p>{this.state.userdata.lastName}</p>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="email"><b>E-Mail</b></Label>
                                                    <p>{this.state.userdata.email}</p>

                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no"><b>Mobile Number</b></Label>
                                                    <p>{this.state.userdata.phone}</p>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {/* <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="password">Password</Label>
                                                <p></p>
                                            </Col> */}
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    <p style={{ fontSize: '16px' }}><b>User Image</b></p>
                                                    <p><i className="fa fa-user"></i></p>

                                                </FormGroup>
                                            </Col>
                                        </Row>
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

export default ViewUser;
