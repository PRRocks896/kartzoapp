import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Input,
    Col,
    Form,
    CustomInput,
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/location.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { stateCreateRequest, stateUpdateRequest } from '../../../modelController/stateModel';

class AddState extends React.Component<{ history: any }> {

    state = {
        selectedFile: {},
        statename: '',
        statenameerror: '',
        selectedFileerror: ''
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addState = this.addState.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.addStateTitle + utils.getAppName();
        // const getCountry = await API.getCountry();
        // console.log("getCountry",getCountry);
    }

    validate() {
        let statenameerror = "";
        let selectedFileerror = "";

        if (!this.state.statename) {
            statenameerror = "please enter state name";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select country";
        }

        if (statenameerror || selectedFileerror) {
            this.setState({ statenameerror, selectedFileerror });
            return false;
        }
        return true;
    };

    onItemSelect(event: any) {
        // this.setState({

        // })
    }

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    async addState() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                statenameerror: '',
                selectedFileerror: ''
            })
            if (this.state.statename && this.state.selectedFile) {
                const obj : stateCreateRequest = {
                    statename: this.state.statename,
                    selectedFile: this.state.selectedFile
                }

                const obj1 : stateUpdateRequest = {
                    id:'',
                    statename: this.state.statename,
                    selectedFile: this.state.selectedFile
                }

                // const addState = await API.addState(obj);
                // console.log("addState",addState);

                // const editState = await API.editState(obj);
                // console.log("editState",editState);

                if (this.state.statename === obj.statename && this.state.selectedFile === obj.selectedFile) {
                    const msg = "State Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/state');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
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
                                                <h1>Add State</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/state">
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
                                                    <Label htmlFor="state_name">State Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="state_name"
                                                        name="statename"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your state name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.statenameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select Country</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="customSelect"
                                                            onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select Country</option>
                                                            <option value="India">India</option>
                                                            <option value="USA">USA</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.selectedFileerror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addState}
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

export default AddState;
