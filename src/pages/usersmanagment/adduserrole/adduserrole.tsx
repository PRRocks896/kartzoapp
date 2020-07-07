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
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/role.service';
import Switch from "react-switch";

class AddUserRole extends React.Component<{ history: any }> {

    state = {
      rolename:'',
      rolenameerror:''
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addUserRole = this.addUserRole.bind(this);
    }
 
    validate() {
        let rolenameerror = "";

        if (!this.state.rolename) {
            rolenameerror = "please enter role name";
        }

        if (rolenameerror) {
            this.setState({ rolenameerror });
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

    async addUserRole() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
               rolenameerror:''
            })
            if (this.state.rolename) {
                const obj = {
                 rolename:this.state.rolename
                }

                // const addUserRole = await API.addUserRole(obj);
                // console.log("addUserRole",addUserRole);

                if (this.state.rolename === obj.rolename) {
                    Swal.fire({
                        text: "UserRole Added Successfully",
                        icon: 'success'
                    });
                    this.props.history.push('/userrole');
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
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Add UserRole</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/userrole">
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
                                                    <Label htmlFor="role_name"><b>Role Name</b></Label>
                                                    <Input
                                                        type="text"
                                                        id="role_name"
                                                        name="rolename"
                                                        className="form-control"
                                                        value={this.state.rolename}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your role name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.rolenameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addUserRole}
                                        >
                                            Add
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

export default AddUserRole;
