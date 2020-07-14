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
import Merchant from '../merchant/merchant';

class MerchantBusiness extends React.Component<{ history: any }> {

    state = {
     days:'',
     dayserror:'',
     hours:'',
     hourserror:'',
     isOpen:false
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addBusinessMerchant = this.addBusinessMerchant.bind(this);
    }

    async componentDidMount() {
        document.title = constant.merchantBusinessManagement + utils.getAppName();
    }

    handleChange(checked: boolean) {
        this.setState({ isOpen: this.state.isOpen = checked });
    }


    validate() {
        let dayserror = "";
        let hourserror = "";

        if (!this.state.days) {
            dayserror = "please enter days";
        }

        if (!this.state.hours) {
            hourserror = "please enter hours";
        }

        if (dayserror || hourserror) {
            this.setState({ dayserror, hourserror });
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

    async addBusinessMerchant() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                dayserror: '',
                hourserror: ''
            })
            if (this.state.days && this.state.hours) {
                const obj = {
                    days: this.state.days,
                    hours: this.state.hours
                }

                // const addMerchantBusiness = await API.addMerchantBusiness(obj);
                // console.log("addMerchantBusiness",addMerchantBusiness);

                if (this.state.days === obj.days && this.state.hours === obj.hours) {
                    const msg = "Merchant Business Added Successfully";
                    utils.showSuccess(msg);
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
                                                <h1>Merchant Business Management</h1>
                                            </Col>
                                            {/* <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/category">
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
                                                    <Label htmlFor="Days">Days</Label>
                                                    <Input
                                                        type="text"
                                                        id="Days"
                                                        name="days"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your days"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.dayserror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="Hours">Hours</Label>
                                                    <Input
                                                        type="text"
                                                        id="Hours"
                                                        name="hours"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your hours"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.hourserror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <label>
                                                    <span>IsOpen</span>
                                                    <br />
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Switch
                                                            onChange={this.handleChange}
                                                            checked={this.state.isOpen}
                                                        />
                                                    </div>
                                                </label>
                                            </Col>

                                        </Row>
                                       
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addBusinessMerchant}
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
