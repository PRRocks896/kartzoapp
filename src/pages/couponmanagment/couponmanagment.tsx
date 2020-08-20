import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../utils';
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
import './couponmanagment.css';
import NavBar from '../navbar/navbar';
import {CouponAPI} from '../../service/index.service';
import Switch from "react-switch";
import constant from '../../constant/constant';
import { format } from "date-fns";
import { any } from 'prop-types';
import moment from 'moment';
import { couponCreateRequest, couponUpdateRequest } from '../../modelController/couponModel';

class Coupon extends React.Component<{ history: any }> {

    state = {
        checked: false,
        couponcode: '',
        couponcodeerror: '',
        percentage: '',
        percentageerror: '',
        discountprice: '',
        discountpriceerror: '',
        startdate: '',
        startdateerror: '',
        enddate: '',
        enddateerror: '',
        discription: '',
        discriptionerror: '',
        minamountorder:'',
        minamountordererror:'',
        title:'',
        titleerror:'',
        isByPrice: false,
        isActive:true
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCoupon = this.addCoupon.bind(this);
    }


    handleChange(checked: boolean) {
        this.setState({ isByPrice: this.state.isByPrice = checked });
    }

    async componentDidMount() {
        document.title = constant.couponManagement + utils.getAppName();
    }


    validate() {
        let couponcodeerror = "";
        let percentageerror = "";
        let discountpriceerror = "";
        let startdateerror = "";
        let enddateerror = "";
        let discriptionerror = "";
        let minamountordererror = "";
        let titleerror = "";

        if (!this.state.couponcode) {
            couponcodeerror = "please enter coupon code";
        }


        var x = /^(100?|[1-9]?\d)$/;
        if (!(this.state.percentage)) {
            percentageerror = "please enter percentage";
        } else if (!x.test(this.state.percentage)) {
            percentageerror = "please enter number below 100 or do not use decimal value";
        }

        if (!this.state.discountprice) {
            discountpriceerror = "please enter discount price";
        }

        if (!this.state.startdate) {
            startdateerror = "please select start date";
        }

        if (!this.state.enddate) {
            enddateerror = "please select end date";
        }

        if (!this.state.minamountorder) {
            minamountordererror = "please enter min amount order";
        }

        if (!this.state.title) {
            titleerror = "please enter title";
        }

        if (!this.state.discription) {
            discriptionerror = "please enter discription";
        }

        if (couponcodeerror || percentageerror || discountpriceerror || startdateerror || enddateerror || discriptionerror || minamountordererror || titleerror) {
            this.setState({
                couponcodeerror, percentageerror, discountpriceerror, startdateerror, enddateerror, discriptionerror,minamountordererror,titleerror
            });
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

    async addCoupon() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                couponcodeerror: '',
                percentageerror: '',
                discountpriceerror: '',
                startdateerror: '',
                enddateerror: '',
                discriptionerror: '',
                titleerror:'',
                minamountordererror:''
            })
            if (this.state.couponcode && this.state.percentage && this.state.minamountorder && this.state.title && this.state.discountprice && this.state.startdate && this.state.enddate && this.state.discription) {
                const obj : couponCreateRequest = {
                    couponCode: this.state.couponcode,
                    percentage: parseInt(this.state.percentage),
                    discountPrice: parseInt(this.state.discountprice),
                    startDate: this.state.startdate,
                    endDate: this.state.enddate,
                    description: this.state.discription,
                    isByPrice: this.state.isByPrice,
                    title:this.state.title,
                    isActive:this.state.isActive,
                    minAmountOrder:parseInt(this.state.minamountorder)
                }
                console.log("obj",obj);

                // const obj1 : couponUpdateRequest = {
                //     couponcode: this.state.couponcode,
                //     percentage: this.state.percentage,
                //     discountprice: this.state.discountprice,
                //     startdate: this.state.startdate,
                //     enddate: this.state.enddate,
                //     discription: this.state.discription,
                //     isByPrice: this.state.isByPrice
                // }


                const addCoupon = await CouponAPI.addCoupon(obj);
                console.log("addCoupon",addCoupon);
                if (addCoupon) {
                    if (addCoupon.status === 200) {
                      const msg = addCoupon.message;
                      utils.showSuccess(msg);
                      this.props.history.push("/list-coupon");
                    } else {
                      const msg1 = addCoupon.message;
                      utils.showError(msg1);
                    }
                  } else {
                    const msg1 = "Internal server error";
                    utils.showError(msg1);
                  }

                // if (this.state.couponcode === obj.couponcode && this.state.percentage === obj.percentage && this.state.discountprice === obj.discountprice && this.state.startdate === obj.startdate && this.state.enddate === obj.enddate && this.state.discription === obj.discription && this.state.isByPrice === obj.isByPrice) {
                //     const msg = "Coupon Added Successfully";
                //     utils.showSuccess(msg);
                //     // this.props.history.push('/users');
                // } else {
                //     const msg1 = "Error";
                //     utils.showError(msg1);
                // }
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
                                                <h1>Coupon Management</h1>
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
                                                    <Label htmlFor="coupon_code">Coupon Code</Label>
                                                    <Input
                                                        type="text"
                                                        id="coupon_code"
                                                        name="couponcode"
                                                        className="form-control"
                                                        value={this.state.couponcode}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your coupon code"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.couponcodeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="percentage">Percentage</Label>
                                                    <Input
                                                        type="number"
                                                        id="percentage"
                                                        name="percentage"
                                                        className="form-control"
                                                        value={this.state.percentage}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your percentage"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.percentageerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="minamount">Min Amount Order</Label>
                                                    <Input
                                                        type="number"
                                                        id="minamount"
                                                        name="minamountorder"
                                                        className="form-control"
                                                        value={this.state.minamountorder}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your min amount order"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.minamountordererror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="title">Title</Label>
                                                    <Input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        className="form-control"
                                                        value={this.state.title}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your title"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.titleerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="start_date">Start Date</Label>
                                                <Input
                                                    type="date"
                                                    id="start_date"
                                                    name="startdate"
                                                    className="form-control"
                                                    onChange={e => this.setState({ startdate:e.target.value})}
                                                    placeholder="Select your start date"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.startdateerror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="end_date">End Date</Label>
                                                <Input
                                                    type="date"
                                                    id="end_date"
                                                    name="enddate"
                                                    className="form-control"
                                                    // min={moment(this.state.startdate).format('yyyy-MM-dd')}
                                                    onChange={e => this.setState({ enddate: e.target.value })}
                                                    placeholder="Select your end date"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.enddateerror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                                <Label htmlFor="Discription">Discription</Label>
                                                <Input
                                                    type="textarea"
                                                    id="Discription"
                                                    name="discription"
                                                    className="form-control"
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your description"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.discountpriceerror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="discount_price">Discount Price</Label>
                                                    <Input
                                                        type="number"
                                                        id="discount_price"
                                                        name="discountprice"
                                                        className="form-control"
                                                        value={this.state.discountprice}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your discount price"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.discountpriceerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <label>
                                                    <span>IsByPrice</span>
                                                    <br />
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Switch
                                                            onChange={this.handleChange}
                                                            checked={this.state.isByPrice}
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
                                            onClick={this.addCoupon}
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

export default Coupon;
