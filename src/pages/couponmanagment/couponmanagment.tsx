import React from "react";
import { Link } from "react-router-dom";
import utils from "../../utils";
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
} from "reactstrap";
import "./couponmanagment.css";
import { CouponAPI } from "../../service/index.service";
import constant from "../../constant/constant";
import {
  couponCreateRequest,
  couponUpdateRequest,
  createCouponStateRequest,
  getDataByIdRequest,
} from "../../modelController";

class Coupon extends React.Component<{ history: any; location: any }> {

  /** Coupon state */
  couponState : createCouponStateRequest = constant.couponPage.state;
  state = {
    checked: this.couponState.checked,
    couponcode: this.couponState.couponcode,
    couponcodeerror: this.couponState.couponcodeerror,
    percentage: this.couponState.percentage,
    percentageerror: this.couponState.percentageerror,
    discountprice: this.couponState.discountprice,
    discountpriceerror: this.couponState.discountpriceerror,
    startdate: this.couponState.startdate,
    startdateerror: this.couponState.startdateerror,
    enddate: this.couponState.enddate,
    enddateerror: this.couponState.enddateerror,
    discription: this.couponState.discription,
    discriptionerror: this.couponState.discriptionerror,
    minamountorder: this.couponState.minamountorder,
    minamountordererror: this.couponState.minamountordererror,
    title: this.couponState.title,
    titleerror: this.couponState.titleerror,
    isByPrice: this.couponState.isByPrice,
    isActive: this.couponState.isActive,
    updateTrue: this.couponState.updateTrue,
    couponId: this.couponState.couponId,
    dpriceFlag: this.couponState.dpriceFlag,
    finalprice: this.couponState.finalprice
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    // this.Profile = this.Profile.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCoupon = this.addCoupon.bind(this);
    this.IOSDateToYYYYMMDD = this.IOSDateToYYYYMMDD.bind(this);
    this.editCoupon = this.editCoupon.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChangeEventDiscount = this.handleChangeEventDiscount.bind(this);
  }

  /** Checked boolean */
  handleChange(checked: boolean) {
    this.setState({
      isByPrice: this.state.isByPrice = checked,
      dpriceFlag: !this.state.dpriceFlag,
    });
  }

  /**
   * 
   * @param value : percentage value 
   */
  handleOnChange = (value: any) => {
    this.setState({
      percentage: value,
    });
    if (this.state.minamountorder && this.state.percentage) {
      const percentage = this.state.percentage / 100;
      const mainprice = parseInt(this.state.minamountorder) * percentage;
      const discount = parseInt(this.state.minamountorder) - mainprice;
      this.setState({
        discountprice: this.state.discountprice = discount.toString(),
      });

      // const newData = this.state.percentage/100
    }
  };

  /**
   * 
   * @param event : discount price
   */
  handleChangeEventDiscount(event: any) {

    this.setState({
      discountprice: this.state.discountprice = event.target.value,
    });
 
  }

  /** Page Render Call */
  async componentDidMount() {
    const couponId = this.props.location.pathname.split("/")[2];
    if (couponId !== undefined) {
      this.getCouponById(couponId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
      });
    }
    if (this.state.updateTrue === true) {
      document.title = document.title =
        constant.couponPage.title.updateCouponTitle + utils.getAppName();
    } else {
      document.title =
        constant.couponPage.title.addCouponTitle + utils.getAppName();
    }
  }

  /** IOS Format */
  IOSDateToYYYYMMDD(d: any) {
    const date = new Date(d);
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + dt;
  }

  /**
   * 
   * @param id : get coupon mapping id
   */
  async getCouponById(id: any) {
    const obj: getDataByIdRequest = {
      id: id,
    };
    const getCouponById: any = await CouponAPI.getCouponById(obj);
    // console.log("getCouponById", getCouponById);

    if (getCouponById) {
      if (getCouponById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          couponId: this.state.couponId = getCouponById.resultObject.couponId,
          couponcode: this.state.couponcode =
            getCouponById.resultObject.couponCode,
          percentage: this.state.percentage =
            getCouponById.resultObject.percentage,
          discountprice: this.state.discountprice =
            getCouponById.resultObject.sellingPrice,
          startdate: this.state.startdate =
            getCouponById.resultObject.startDate,
          enddate: this.state.enddate = getCouponById.resultObject.endDate,
          discription: this.state.discription =
            getCouponById.resultObject.description,
          minamountorder: this.state.minamountorder =
            getCouponById.resultObject.minAmountOrder,
          title: this.state.title = getCouponById.resultObject.title,
          isByPrice: this.state.isByPrice =
            getCouponById.resultObject.isByPrice,
        });
        this.setState({
          startdate: this.state.startdate = this.IOSDateToYYYYMMDD(
            this.state.startdate
          ),
          enddate: this.state.enddate = this.IOSDateToYYYYMMDD(
            this.state.enddate
          ),
        });
      } else {
        const msg1 = getCouponById.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal Server";
      // utils.showError(msg1);
    }
  }

  /** Validate or not */
  validate() {
    let couponcodeerror = "";
    let discountpriceerror = "";
    let startdateerror = "";
    let enddateerror = "";
    let discriptionerror = "";
    let minamountordererror = "";
    let titleerror = "";

    if (!this.state.couponcode) {
      couponcodeerror = "please enter coupon code";
    }

    var regex1 = /^[0-9]+$/;
    var m = parseInt(this.state.minamountorder);
    var d =  parseInt(this.state.discountprice);
    if (!this.state.discountprice) {
      discountpriceerror = "please enter selling price";
    } else if(!regex1.test(this.state.discountprice)) {
      discountpriceerror = "please enter valid discount price";
    } else if(m < d) {
      discountpriceerror = "please enter selling price must be less then min amount order";
    }

    if (!this.state.startdate) {
      startdateerror = "please select start date";
    }

    if (!this.state.enddate) {
      enddateerror = "please select end date";
    }

    var regex = /^[0-9]+$/;
    if (!this.state.minamountorder) {
      minamountordererror = "please enter min amount order";
    } else if(!regex.test(this.state.minamountorder)) {
      minamountordererror = "please enter valid min amount order";
    }

    if (!this.state.title) {
      titleerror = "please enter title";
    }

    if (!this.state.discription) {
      discriptionerror = "please enter discription";
    }

    if (
      couponcodeerror ||
      discountpriceerror ||
      startdateerror ||
      enddateerror ||
      discriptionerror ||
      minamountordererror ||
      titleerror
    ) {
      this.setState({
        couponcodeerror,
        discountpriceerror,
        startdateerror,
        enddateerror,
        discriptionerror,
        minamountordererror,
        titleerror,
      });
      return false;
    }
    return true;
  }

  /**
   * 
   * @param event : update state value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Add coupon */
  async addCoupon() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        couponcodeerror: "",
        discountpriceerror:this.state.discountpriceerror = "",
        startdateerror: "",
        enddateerror: "",
        discriptionerror: "",
        titleerror: "",
        minamountordererror: "",
      });
      if (
        this.state.couponcode &&
        this.state.minamountorder &&
        this.state.title &&
        this.state.discountprice &&
        this.state.startdate &&
        this.state.enddate &&
        this.state.discription
      ) {
        const obj: couponCreateRequest = {
          couponCode: this.state.couponcode,
          sellingPrice: parseInt(this.state.discountprice),
          startDate: this.state.startdate,
          endDate: this.state.enddate,
          description: this.state.discription,
          title: this.state.title,
          isActive: this.state.isActive,
          minAmountOrder: parseInt(this.state.minamountorder),
        };
        // console.log("obj", obj);

        const addCoupon = await CouponAPI.addCoupon(obj);
        // console.log("addCoupon", addCoupon);
        if (addCoupon) {
          if(addCoupon.status === 200) {
            const msg1 = addCoupon.message;
            utils.showSuccess(msg1);
          this.props.history.push("/listcoupon");
        } else {
          const msg1 = addCoupon.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Edit coupon */
  async editCoupon() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        couponcodeerror: "",
        discountpriceerror:this.state.discountpriceerror = "",
        startdateerror: "",
        enddateerror: "",
        discriptionerror: "",
        titleerror: "",
        minamountordererror: "",
      });
      if (
        this.state.couponcode &&
        this.state.minamountorder &&
        this.state.title &&
        this.state.discountprice &&
        this.state.startdate &&
        this.state.enddate &&
        this.state.discription
      ) {
        const obj: couponUpdateRequest = {
          couponId: this.state.couponId,
          couponCode: this.state.couponcode,
          sellingPrice: parseInt(this.state.discountprice),
          startDate: this.state.startdate,
          endDate: this.state.enddate,
          description: this.state.discription,
          title: this.state.title,
          isActive: this.state.isActive,
          minAmountOrder: parseInt(this.state.minamountorder),
        };
        // console.log("obj", obj);

        const editCoupon = await CouponAPI.editCoupon(obj);
        // console.log("editCoupon", editCoupon);
        if (editCoupon) {
          if(editCoupon.status === 200) {
            const msg1 = editCoupon.message;
            utils.showSuccess(msg1);
          this.props.history.push("/listcoupon");
        } else {
          const msg1 = editCoupon.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Render DOM */
  render() {
    return (
      <>
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.couponPage.title.updateCouponTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.couponPage.title.addCouponTitle}</h1>
                        </Col>
                      )}
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/listcoupon">
                          <Button
                            type="button"
                            size="sm"
                            color="primary"
                            className="mb-2 mr-2 custom-button"
                          >
                            {constant.button.back}
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="coupon_code">
                            {constant.couponPage.couponTableColumn.couponCode}
                          </Label>
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
                            <Label htmlFor="title">
                              {constant.couponPage.couponTableColumn.title}
                            </Label>
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
                        <FormGroup>
                          <Label htmlFor="minamount">
                            {
                              constant.couponPage.couponTableColumn
                                .minAmountOrder
                            }
                          </Label>
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
                            <Label htmlFor="discount_price">
                              {
                                constant.couponPage.couponTableColumn
                                  .discountPrice
                              }
                            </Label>
                            <Input
                              type="number"
                              id="discount_price"
                              name="discountprice"
                              className="form-control"
                              value={this.state.discountprice}
                              onChange={this.handleChangeEventDiscount}
                              placeholder="Enter your selling price"
                              required
                            />
                            <div className="mb-4 text-danger">
                              {this.state.discountpriceerror}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Label htmlFor="start_date">
                          {constant.couponPage.couponTableColumn.startDate}
                        </Label>
                        <Input
                          type="date"
                          id="start_date"
                          name="startdate"
                          className="form-control"
                          value={this.state.startdate}
                          onChange={(e) =>
                            this.setState({ startdate: e.target.value })
                          }
                          placeholder="Select your start date"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.startdateerror}
                        </div>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Label htmlFor="end_date">
                          {constant.couponPage.couponTableColumn.endDate}
                        </Label>
                        <Input
                          type="date"
                          id="end_date"
                          name="enddate"
                          className="form-control"
                          value={this.state.enddate}
                          onChange={(e) =>
                            this.setState({ enddate: e.target.value })
                          }
                          placeholder="Select your end date"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.enddateerror}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Label htmlFor="Discription">
                          {constant.couponPage.couponTableColumn.description}
                        </Label>
                        <Input
                          type="textarea"
                          id="Discription"
                          name="discription"
                          className="form-control"
                          value={this.state.discription}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your description"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.discriptionerror}
                        </div>
                      </Col>
                    </Row>

                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.editCoupon}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addCoupon}
                      >
                        {constant.button.Save}
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </>
      </>
    );
  }
}

export default Coupon;

// import React from "react";
// import { Link } from "react-router-dom";
// import utils from "../../utils";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Input,
//   Col,
//   FormGroup,
//   Label,
//   Row,
// } from "reactstrap";
// import "./couponmanagment.css";
// import { CouponAPI } from "../../service/index.service";
// import Switch from "react-switch";
// import constant from "../../constant/constant";
// import {
//   couponCreateRequest,
//   couponUpdateRequest,
//   getDataByIdRequest,
// } from "../../modelController";
// import Slider from "react-rangeslider";
// import "react-rangeslider/lib/index.css";

// class Coupon extends React.Component<{ history: any; location: any }> {
//   couponState = constant.couponPage.state;
//   state = {
//     checked: this.couponState.checked,
//     couponcode: this.couponState.couponcode,
//     couponcodeerror: this.couponState.couponcodeerror,
//     percentage: this.couponState.percentage,
//     percentageerror: this.couponState.percentageerror,
//     discountprice: this.couponState.discountprice,
//     discountpriceerror: this.couponState.discountpriceerror,
//     startdate: this.couponState.startdate,
//     startdateerror: this.couponState.startdateerror,
//     enddate: this.couponState.enddate,
//     enddateerror: this.couponState.enddateerror,
//     discription: this.couponState.discription,
//     discriptionerror: this.couponState.discriptionerror,
//     minamountorder: this.couponState.minamountorder,
//     minamountordererror: this.couponState.minamountordererror,
//     title: this.couponState.title,
//     titleerror: this.couponState.titleerror,
//     isByPrice: this.couponState.isByPrice,
//     isActive: this.couponState.isActive,
//     updateTrue: this.couponState.updateTrue,
//     couponId: this.couponState.couponId,
//     dpriceFlag: this.couponState.dpriceFlag,
//     finalprice: this.couponState.finalprice
//   };

//   constructor(props: any) {
//     super(props);
//     // this.Profile = this.Profile.bind(this);
//     this.handleChangeEvent = this.handleChangeEvent.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.addCoupon = this.addCoupon.bind(this);
//     this.IOSDateToYYYYMMDD = this.IOSDateToYYYYMMDD.bind(this);
//     this.editCoupon = this.editCoupon.bind(this);
//     this.handleOnChange = this.handleOnChange.bind(this);
//     this.handleChangeEventDiscount = this.handleChangeEventDiscount.bind(this);
//   }

//   handleChange(checked: boolean) {
//     this.setState({
//       isByPrice: this.state.isByPrice = checked,
//       dpriceFlag: !this.state.dpriceFlag,
//     });
//   }

//   handleOnChange = (value: any) => {
//     this.setState({
//       percentage: value,
//     });
//     if (this.state.minamountorder && this.state.percentage) {
//       const percentage = this.state.percentage / 100;
//       const mainprice = parseInt(this.state.minamountorder) * percentage;
//       const discount = parseInt(this.state.minamountorder) - mainprice;
//       this.setState({
//         discountprice: this.state.discountprice = discount.toString(),
//       });

//       // const newData = this.state.percentage/100
//     }
//   };

//   handleChangeEventDiscount(event: any) {
//     this.setState({
//       discountprice: this.state.discountprice = event.target.value,
//     });
//     if (this.state.minamountorder && this.state.discountprice) {
      
//       const d1 =
//         parseInt(this.state.minamountorder) -
//         parseInt(this.state.discountprice);
//       const d2 = d1 * 100;
//       const d3 = d2 / parseInt(this.state.minamountorder);
//       this.setState({
//         percentage: this.state.percentage = d3,
//       });
//       const finalamount =   parseInt(this.state.minamountorder) - parseInt(this.state.discountprice);
//       this.setState({
//         finalprice: this.state.finalprice = finalamount.toString(),
//       });
//     }
//   }

//   async componentDidMount() {
//     const couponId = this.props.location.pathname.split("/")[2];
//     if (couponId !== undefined) {
//       this.getCouponById(couponId);
//       this.setState({
//         updateTrue: this.state.updateTrue = true,
//       });
//     }
//     if (this.state.updateTrue === true) {
//       document.title = document.title =
//         constant.couponPage.title.updateCouponTitle + utils.getAppName();
//     } else {
//       document.title =
//         constant.couponPage.title.addCouponTitle + utils.getAppName();
//     }
//   }

//   IOSDateToYYYYMMDD(d: any) {
//     const date = new Date(d);
//     const year = date.getFullYear();
//     let month: any = date.getMonth() + 1;
//     let dt: any = date.getDate();

//     if (dt < 10) {
//       dt = "0" + dt;
//     }
//     if (month < 10) {
//       month = "0" + month;
//     }

//     return year + "-" + month + "-" + dt;
//   }

//   async getCouponById(id: any) {
//     const obj: getDataByIdRequest = {
//       id: id,
//     };
//     const getCouponById: any = await CouponAPI.getCouponById(obj);
//     // console.log("getCouponById", getCouponById);

//     if (getCouponById) {
//       if (getCouponById.status === 200) {
//         this.setState({
//           updateTrue: this.state.updateTrue = true,
//           couponId: this.state.couponId = getCouponById.resultObject.couponId,
//           couponcode: this.state.couponcode =
//             getCouponById.resultObject.couponCode,
//           percentage: this.state.percentage =
//             getCouponById.resultObject.percentage,
//           discountprice: this.state.discountprice =
//             getCouponById.resultObject.discountPrice,
//           startdate: this.state.startdate =
//             getCouponById.resultObject.startDate,
//           enddate: this.state.enddate = getCouponById.resultObject.endDate,
//           discription: this.state.discription =
//             getCouponById.resultObject.description,
//           minamountorder: this.state.minamountorder =
//             getCouponById.resultObject.minAmountOrder,
//           title: this.state.title = getCouponById.resultObject.title,
//           isByPrice: this.state.isByPrice =
//             getCouponById.resultObject.isByPrice,
//         });
//         this.setState({
//           startdate: this.state.startdate = this.IOSDateToYYYYMMDD(
//             this.state.startdate
//           ),
//           enddate: this.state.enddate = this.IOSDateToYYYYMMDD(
//             this.state.enddate
//           ),
//         });
//       } else {
//         const msg1 = getCouponById.message;
//         utils.showError(msg1);
//       }
//     } else {
//       const msg1 = "Internal Server";
//       utils.showError(msg1);
//     }
//   }

//   validate() {
//     let couponcodeerror = "";
//     let percentageerror = "";
//     let discountpriceerror = "";
//     let startdateerror = "";
//     let enddateerror = "";
//     let discriptionerror = "";
//     let minamountordererror = "";
//     let titleerror = "";

//     if (!this.state.couponcode) {
//       couponcodeerror = "please enter coupon code";
//     }
//     if (!this.state.percentage) {
//       percentageerror = "please enter percentage";
//     }

//     if (!this.state.discountprice) {
//       discountpriceerror = "please enter discount price";
//     }

//     if (!this.state.startdate) {
//       startdateerror = "please select start date";
//     }

//     if (!this.state.enddate) {
//       enddateerror = "please select end date";
//     }

//     if (!this.state.minamountorder) {
//       minamountordererror = "please enter min amount order";
//     }

//     if (!this.state.title) {
//       titleerror = "please enter title";
//     }

//     if (!this.state.discription) {
//       discriptionerror = "please enter discription";
//     }

//     if (
//       couponcodeerror ||
//       percentageerror ||
//       discountpriceerror ||
//       startdateerror ||
//       enddateerror ||
//       discriptionerror ||
//       minamountordererror ||
//       titleerror
//     ) {
//       this.setState({
//         couponcodeerror,
//         percentageerror,
//         discountpriceerror,
//         startdateerror,
//         enddateerror,
//         discriptionerror,
//         minamountordererror,
//         titleerror,
//       });
//       return false;
//     }
//     return true;
//   }

//   handleChangeEvent(event: any) {
//     event.preventDefault();
//     const state: any = this.state;
//     state[event.target.name] = event.target.value;
//     this.setState(state);
//   }

//   async addCoupon() {
//     const isValid = this.validate();
//     if (isValid) {
//       this.setState({
//         couponcodeerror: "",
//         percentageerror: "",
//         discountpriceerror: "",
//         startdateerror: "",
//         enddateerror: "",
//         discriptionerror: "",
//         titleerror: "",
//         minamountordererror: "",
//       });
//       if (
//         this.state.couponcode &&
//         this.state.percentage &&
//         this.state.minamountorder &&
//         this.state.title &&
//         this.state.discountprice &&
//         this.state.startdate &&
//         this.state.enddate &&
//         this.state.discription
//       ) {
//         const obj: couponCreateRequest = {
//           couponCode: this.state.couponcode,
//           percentage: this.state.percentage,
//           discountPrice: parseInt(this.state.discountprice),
//           startDate: this.state.startdate,
//           endDate: this.state.enddate,
//           description: this.state.discription,
//           isByPrice: this.state.isByPrice,
//           title: this.state.title,
//           isActive: this.state.isActive,
//           minAmountOrder: parseInt(this.state.minamountorder),
//         };
//         // console.log("obj", obj);

//         // const obj1 : couponUpdateRequest = {
//         //     couponcode: this.state.couponcode,
//         //     percentage: this.state.percentage,
//         //     discountprice: this.state.discountprice,
//         //     startdate: this.state.startdate,
//         //     enddate: this.state.enddate,
//         //     discription: this.state.discription,
//         //     isByPrice: this.state.isByPrice
//         // }

//         const addCoupon = await CouponAPI.addCoupon(obj);
//         // console.log("addCoupon", addCoupon);
//         if (addCoupon) {
//           if (addCoupon.status === 200) {
//             const msg = addCoupon.message;
//             utils.showSuccess(msg);
//             this.props.history.push("/listcoupon");
//           } else {
//             const msg1 = addCoupon.message;
//             utils.showError(msg1);
//           }
//         } else {
//           const msg1 = "Internal server error";
//           utils.showError(msg1);
//         }

//         // if (this.state.couponcode === obj.couponcode && this.state.percentage === obj.percentage && this.state.discountprice === obj.discountprice && this.state.startdate === obj.startdate && this.state.enddate === obj.enddate && this.state.discription === obj.discription && this.state.isByPrice === obj.isByPrice) {
//         //     const msg = "Coupon Added Successfully";
//         //     utils.showSuccess(msg);
//         //     // this.props.history.push('/users');
//         // } else {
//         //     const msg1 = "Error";
//         //     utils.showError(msg1);
//         // }
//       }
//     }
//   }

//   async editCoupon() {
//     const isValid = this.validate();
//     if (isValid) {
//       this.setState({
//         couponcodeerror: "",
//         percentageerror: "",
//         discountpriceerror: "",
//         startdateerror: "",
//         enddateerror: "",
//         discriptionerror: "",
//         titleerror: "",
//         minamountordererror: "",
//       });
//       if (
//         this.state.couponcode &&
//         this.state.percentage &&
//         this.state.minamountorder &&
//         this.state.title &&
//         this.state.discountprice &&
//         this.state.startdate &&
//         this.state.enddate &&
//         this.state.discription
//       ) {
//         const obj: couponUpdateRequest = {
//           couponId: this.state.couponId,
//           couponCode: this.state.couponcode,
//           percentage: this.state.percentage,
//           discountPrice: parseInt(this.state.discountprice),
//           startDate: this.state.startdate,
//           endDate: this.state.enddate,
//           description: this.state.discription,
//           isByPrice: this.state.isByPrice,
//           title: this.state.title,
//           isActive: this.state.isActive,
//           minAmountOrder: parseInt(this.state.minamountorder),
//         };
//         // console.log("obj", obj);

//         const editCoupon = await CouponAPI.editCoupon(obj);
//         // console.log("editCoupon", editCoupon);
//         if (editCoupon) {
//           if (editCoupon.status === 200) {
//             const msg = editCoupon.message;
//             utils.showSuccess(msg);
//             this.props.history.push("/listcoupon");
//           } else {
//             const msg1 = editCoupon.message;
//             utils.showError(msg1);
//           }
//         } else {
//           const msg1 = "Internal server error";
//           utils.showError(msg1);
//         }
//       }
//     }
//   }

//   render() {
//     var disable: any = "disabled";
//     return (
//       <>
//         <>
//           <div className="ms-content-wrapper">
//             <div className="row">
//               <Col xs="12" sm="12" md="12" lg="12" xl="12">
//                 <Card>
//                   <CardHeader>
//                     <Row>
//                       {this.state.updateTrue === true ? (
//                         <Col xs="12" sm="6" md="9" lg="9" xl="9">
//                           <h1>{constant.couponPage.title.updateCouponTitle}</h1>
//                         </Col>
//                       ) : (
//                         <Col xs="12" sm="6" md="9" lg="9" xl="9">
//                           <h1>{constant.couponPage.title.addCouponTitle}</h1>
//                         </Col>
//                       )}
//                       <Col
//                         xs="12"
//                         sm="6"
//                         md="3"
//                         lg="3"
//                         xl="3"
//                         className="search_right"
//                       >
//                         <Link to="/listcoupon">
//                           <Button
//                             type="button"
//                             size="sm"
//                             color="primary"
//                             className="mb-2 mr-2 custom-button"
//                           >
//                             {constant.button.back}
//                           </Button>
//                         </Link>
//                       </Col>
//                     </Row>
//                   </CardHeader>
//                   <CardBody>
//                     <Row>
//                       <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                         <FormGroup>
//                           <Label htmlFor="coupon_code">
//                             {constant.couponPage.couponTableColumn.couponCode}
//                           </Label>
//                           <Input
//                             type="text"
//                             id="coupon_code"
//                             name="couponcode"
//                             className="form-control"
//                             value={this.state.couponcode}
//                             onChange={this.handleChangeEvent}
//                             placeholder="Enter your coupon code"
//                             required
//                           />
//                           <div className="mb-4 text-danger">
//                             {this.state.couponcodeerror}
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                         <label>
//                           <span>
//                             {constant.couponPage.couponTableColumn.IsByPrice}
//                           </span>
//                           <br />
//                           <div style={{ marginTop: "10px" }}>
//                             <Switch
//                               onChange={this.handleChange}
//                               checked={this.state.isByPrice}
//                             />
//                           </div>
//                         </label>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                         <FormGroup>
//                           <Label htmlFor="minamount">
//                             {
//                               constant.couponPage.couponTableColumn
//                                 .minAmountOrder
//                             }
//                           </Label>
//                           <Input
//                             type="number"
//                             id="minamount"
//                             name="minamountorder"
//                             className="form-control"
//                             value={this.state.minamountorder}
//                             onChange={this.handleChangeEvent}
//                             placeholder="Enter your min amount order"
//                             required
//                           />
//                           <div className="mb-4 text-danger">
//                             {this.state.minamountordererror}
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                         <FormGroup>
//                           <Label htmlFor="minamount">
//                             <span>
//                               {constant.couponPage.couponTableColumn.percentage}
//                             </span>
//                             <span className="percentage">
//                               {this.state.percentage} %
//                             </span>
//                           </Label>
//                           {this.state.dpriceFlag === true ? (
//                             <Slider
//                               min={0}
//                               max={100}
//                               step={1}
//                               tooltip={false}
//                               value={this.state.percentage}
//                               orientation="horizontal"
//                               // onChange={this.handleOnChange}
//                               disabled
//                             />
//                           ) : (
//                             <Slider
//                               min={0}
//                               max={100}
//                               step={1}
//                               tooltip={false}
//                               value={this.state.percentage}
//                               orientation="horizontal"
//                               onChange={this.handleOnChange}
//                             />
//                           )}
//                           {/* <Label htmlFor="percentage">
//                             {constant.couponPage.couponTableColumn.percentage}
//                           </Label>
//                           <Input
//                             type="number"
//                             id="percentage"
//                             name="percentage"
//                             className="form-control"
//                             value={this.state.percentage}
//                             onChange={this.handleChangeEvent}
//                             placeholder="Enter your percentage"
//                             required
//                           /> */}
//                           <div className="mb-4 text-danger">
//                             {this.state.percentageerror}
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     {
//                       this.state.dpriceFlag === true ? (
//                         <Row>
//                         <Col xs="12" sm="12" md="4" lg="4" xl="4">
//                           <FormGroup>
//                             <Label htmlFor="discount_price">
//                               {
//                                 constant.couponPage.couponTableColumn
//                                   .discountPrice
//                               }
//                             </Label>
//                             <Input
//                               type="number"
//                               id="discount_price"
//                               name="discountprice"
//                               className="form-control"
//                               value={this.state.discountprice}
//                               onChange={this.handleChangeEventDiscount}
//                               placeholder="Enter your discount price"
//                               required
//                             />
//                             <div className="mb-4 text-danger">
//                               {this.state.discountpriceerror}
//                             </div>
//                           </FormGroup>
//                         </Col>
//                         <Col xs="12" sm="12" md="4" lg="4" xl="4">
//                           <FormGroup>
//                             <Label htmlFor="discount_price">
//                               {
//                                 constant.couponPage.couponTableColumn
//                                   .finalPrice
//                               }
//                             </Label>
//                             <Input
//                               type="number"
//                               id="discount_price"
//                               name="discountprice"
//                               className="form-control"
//                               value={this.state.finalprice}
//                               // onChange={this.handleChangeEventDiscount}
//                               placeholder="Enter your final price"
//                               required
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col xs="12" sm="12" md="4" lg="4" xl="4">
//                           <FormGroup>
//                             <Label htmlFor="title">
//                               {constant.couponPage.couponTableColumn.title}
//                             </Label>
//                             <Input
//                               type="text"
//                               id="title"
//                               name="title"
//                               className="form-control"
//                               value={this.state.title}
//                               onChange={this.handleChangeEvent}
//                               placeholder="Enter your title"
//                               required
//                             />
//                             <div className="mb-4 text-danger">
//                               {this.state.titleerror}
//                             </div>
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                       ) : (
//                         <Row>
//                         <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                           <FormGroup>
//                             <Label htmlFor="discount_price">
//                               {
//                                 constant.couponPage.couponTableColumn
//                                   .discountPrice
//                               }
//                             </Label>
//                             <Input
//                               type="number"
//                               id="discount_price"
//                               name="discountprice"
//                               className="form-control"
//                               value={this.state.discountprice}
//                               onChange={this.handleChangeEventDiscount}
//                               placeholder="Enter your discount price"
//                               disabled={
//                                 this.state.dpriceFlag === false ? disable : ""
//                               }
//                               required
//                             />
//                             <div className="mb-4 text-danger">
//                               {this.state.discountpriceerror}
//                             </div>
//                           </FormGroup>
//                         </Col>
//                         <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                           <FormGroup>
//                             <Label htmlFor="title">
//                               {constant.couponPage.couponTableColumn.title}
//                             </Label>
//                             <Input
//                               type="text"
//                               id="title"
//                               name="title"
//                               className="form-control"
//                               value={this.state.title}
//                               onChange={this.handleChangeEvent}
//                               placeholder="Enter your title"
//                               required
//                             />
//                             <div className="mb-4 text-danger">
//                               {this.state.titleerror}
//                             </div>
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                       )
//                     }
                   
//                     <Row>
//                       <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                         <Label htmlFor="start_date">
//                           {constant.couponPage.couponTableColumn.startDate}
//                         </Label>
//                         <Input
//                           type="date"
//                           id="start_date"
//                           name="startdate"
//                           className="form-control"
//                           value={this.state.startdate}
//                           onChange={(e) =>
//                             this.setState({ startdate: e.target.value })
//                           }
//                           placeholder="Select your start date"
//                         />
//                         <div className="mb-4 text-danger">
//                           {this.state.startdateerror}
//                         </div>
//                       </Col>
//                       <Col xs="12" sm="12" md="6" lg="6" xl="6">
//                         <Label htmlFor="end_date">
//                           {constant.couponPage.couponTableColumn.endDate}
//                         </Label>
//                         <Input
//                           type="date"
//                           id="end_date"
//                           name="enddate"
//                           className="form-control"
//                           value={this.state.enddate}
//                           onChange={(e) =>
//                             this.setState({ enddate: e.target.value })
//                           }
//                           placeholder="Select your end date"
//                         />
//                         <div className="mb-4 text-danger">
//                           {this.state.enddateerror}
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs="12" sm="12" md="12" lg="12" xl="12">
//                         <Label htmlFor="Discription">
//                           {constant.couponPage.couponTableColumn.description}
//                         </Label>
//                         <Input
//                           type="textarea"
//                           id="Discription"
//                           name="discription"
//                           className="form-control"
//                           value={this.state.discription}
//                           onChange={this.handleChangeEvent}
//                           placeholder="Enter your description"
//                         />
//                         <div className="mb-4 text-danger">
//                           {this.state.discountpriceerror}
//                         </div>
//                       </Col>
//                     </Row>

//                     {this.state.updateTrue === true ? (
//                       <Button
//                         type="button"
//                         size="sm"
//                         color="primary"
//                         className="mb-2 mr-2 custom-button"
//                         onClick={this.editCoupon}
//                       >
//                         {constant.button.update}
//                       </Button>
//                     ) : (
//                       <Button
//                         type="button"
//                         size="sm"
//                         color="primary"
//                         className="mb-2 mr-2 custom-button"
//                         onClick={this.addCoupon}
//                       >
//                         {constant.button.Save}
//                       </Button>
//                     )}
//                   </CardBody>
//                 </Card>
//               </Col>
//             </div>
//           </div>
//         </>
//       </>
//     );
//   }
// }

// export default Coupon;

