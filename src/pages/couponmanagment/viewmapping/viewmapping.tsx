import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import {CouponAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import {addCouponStateRequest, getDataByIdRequest} from "../../../modelController";

class ViewCouponMapping extends React.Component<{ history: any; location: any }> {
    couponState :addCouponStateRequest = constant.couponPage.state;
    state:any = {
      items: this.couponState.items,
      selected: this.couponState.selected,
      couponlistdata: this.couponState.couponlistdata,
      merchantdata:this.couponState.merchantdata,
      selectedmerchantdata:this.couponState.selectedmerchantdata,
      offername: this.couponState.offername,
      offernameerror: this.couponState.offernameerror,
      couponselectedarray: this.couponState.couponselectedarray,
      couponname:'',
      merchantname:'',
      merchantselectedarray : this.couponState.merchantselectedarray,
    };
  

  constructor(props: any) {
    super(props);
    this.getCouponMappingById = this.getCouponMappingById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.couponPage.title.viewCouponMappingTitle + utils.getAppName();
    const couponId = this.props.location.pathname.split("/")[2];
    if (couponId !== undefined) {
      this.getCouponMappingById(couponId);
    }
  }

  async getCouponMappingById(id: any) {
    const obj : getDataByIdRequest = {
      id: id,
    };
    const getCouponMappingById: any = await CouponAPI.getCouponMappingById(obj);
    console.log("getCouponMappingById", getCouponMappingById);

    if (getCouponMappingById) {
      this.setState({
        offername: this.state.offername = getCouponMappingById.resultObject.offerName,
        couponname: this.state.couponname = getCouponMappingById.resultObject.coupon,
        merchantname: this.state.merchantname = getCouponMappingById.resultObject.merchant
      });
    } else {
      const msg1 = "Internal Server";
      utils.showError(msg1);
    }
  }

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
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>
                          {constant.couponPage.viewcouponpagedetails.viewcouponmapping}
                        </h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-coupon-map">
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
                          <Label htmlFor="category_name">
                            <b>
                              {constant.couponPage.couponTableColumn.offername}
                            </b>
                          </Label>
                          <p>{this.state.offername}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>{constant.couponPage.couponTableColumn.couponname}</b>
                          </Label>
                          <p>{this.state.couponname ? this.state.couponname : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {constant.couponPage.couponTableColumn.merchantname}
                            </b>
                          </Label>
                          <p>{this.state.merchantname ? this.state.merchantname : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                    </Row>
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

export default ViewCouponMapping;
