import React from 'react';
import { Link } from 'react-router-dom';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    CardTitle,
    Form,
    CustomInput,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    Table,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
// import './users.css';
import NavBar from '../navbar/navbar';

class Profile extends React.Component {

    state = {

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
                                        {/* <Row>
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div>
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="pic" src={config.REMOTE_URL + this.state.selectedFile} />
                                                                            <i className="fa fa-remove fa-lg cursor" onClick={() => this.removeIcon(this.props.profile.avatar)}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div>
                                                                    {
                                                                        this.props.profile.avatar ? (
                                                                            <div>
                                                                                <img className="pic" src={config.REMOTE_URL + this.props.profile.avatar} />
                                                                                <i className="fa fa-remove fa-lg cursor" onClick={() => this.removeIcon(this.props.profile.avatar)}></i>
                                                                            </div>
                                                                        ) : (
                                                                                <div>
                                                                                    <p>Select File:</p>
                                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg"></i></Label>
                                                                                    <span className="ml-20"> <b>Or</b> Enter URL</span>
                                                                                    <Input
                                                                                        type="url"
                                                                                        id="image"
                                                                                        name="filename"
                                                                                        className="form-control profile_search"
                                                                                        // defaultValue={this.state.filename}
                                                                                      
                                                                                        placeholder="Please Enter URL"
                                                                                        required
                                                                                    />
                                                                                    <Button className="mt-0 ml-15" type="button" size="sm" color="primary" onClick={this.onURLChangeHandler.bind(this)}>Upload</Button>
                                                                                    <Input
                                                                                        id="file-input"
                                                                                        type="file"
                                                                                        className="form-control"
                                                                                        name="file"
                                                                                        // onChange={this.onChangeHandler.bind(this)}
                                                                                    />

                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            )
                                                    }

                                                </FormGroup>
                                            </Col>
                                        </Row> */}
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
