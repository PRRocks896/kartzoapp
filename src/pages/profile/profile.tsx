import React from 'react';
import { Link } from 'react-router-dom';
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

class Profile extends React.Component {

    state = {
        selectedFile: null
    }

    constructor(props: any) {
        super(props);

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
                                                        name="first_name"
                                                        className="form-control"
                                                        // defaultValue={this.state.first_name}
                                                        // onChange={this.Profile.bind(this)}

                                                        placeholder="Enter your firstname"
                                                        required
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name">Last_Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        className="form-control"
                                                        // defaultValue={this.state.last_name}
                                                        // onChange={this.Profile.bind(this)}

                                                        // value={this.state.last_name}
                                                        placeholder="Enter your lastname"
                                                        required
                                                    />

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
                                                        name="email_id"
                                                        className="profile form-control"
                                                        // defaultValue={this.state.email_id}
                                                        // onChange={this.Profile.bind(this)}


                                                        placeholder="Enter your email"
                                                        required
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no">Mobile_Number</Label>
                                                    <Input
                                                        type="text"
                                                        id="mobile_no"
                                                        name="mobile_no"
                                                        className="form-control"
                                                        // defaultValue={this.state.mobile_no}

                                                        placeholder="Enter your mobilenumber"
                                                        required
                                                    />

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button type="button" size="sm" color="primary">Update</Button>
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
