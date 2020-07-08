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
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class AddCountry extends React.Component<{ history: any }> {

    state = {
        selectedFile: null,
        countryname: '',
        countrynameerror: '',
        countrycode: '',
        countrycodeerror: '',
        selectedFileerror: ''
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.addCountry = this.addCountry.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async componentDidMount() {
        document.title = constant.addCountryTitle + utils.getAppName();
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
        let countrynameerror = "";
        let countrycodeerror = "";
        let selectedFileerror = "";

        if (!this.state.countryname) {
            countrynameerror = "please enter country name";
        }

        if (!this.state.countrycode) {
            countrycodeerror = "please enter country code";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (countrynameerror || selectedFileerror || countrycodeerror) {
            this.setState({ countrynameerror, selectedFileerror, countrycodeerror });
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

    async addCountry() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                countrynameerror: '',
                countrycodeerror: '',
                selectedFileerror: ''
            })
            if (this.state.countryname && this.state.selectedFile && this.state.countrycode) {
                const obj = {
                    countryname: this.state.countryname,
                    selectedFile: this.state.selectedFile,
                    countrycode: this.state.countrycode
                }

                // const addCountry = await API.addCountry(obj);
                // console.log("addCountry",addCountry);

                // const editCountry = await API.editCountry(obj);
                // console.log("editCountry",editCountry);

                if (this.state.countryname === obj.countryname && this.state.selectedFile === obj.selectedFile && this.state.countrycode === obj.countrycode) {
                    const msg = "Country Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/country');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
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
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Add Country</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/country">
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
                                                    <Label htmlFor="country_name">Country Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="country_name"
                                                        name="countryname"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your country name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.countrynameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="country_code">Country Code</Label>
                                                    <Input
                                                        type="text"
                                                        id="country_code"
                                                        name="countrycode"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your country code"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.countrycodeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div>
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-trash cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{fontSize:'16px'}}>Country Flag</p>
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
                                            onClick={this.addCountry}
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

export default AddCountry;
