import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
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

import constant from "../../../../constant/constant";
import {PayoutAPI, MerchantAPI } from "../../../../service/index.service";
import { getDataByIdRequest,addPayoutStateRequest } from "../../../../modelController";

class ViewPayout extends React.Component<{ history: any; location: any }> {
    payoutState : addPayoutStateRequest = constant.payoutPage.state;
    state = {
      merchant: this.payoutState.merchant,
      merchantOrderAmount: this.payoutState.merchantOrderAmount,
      isActive: this.payoutState.isActive,
      updateTrue: this.payoutState.updateTrue,
      payoutId:this.payoutState.payoutId,
      commission:this.payoutState.commission,
      merchantPayAmount:this.payoutState.merchantPayAmount,
      merchantdata:this.payoutState.merchantdata,
      firstname:this.payoutState.firstname,
      lastname:this.payoutState.lastname,
      shopname:this.payoutState.shopname
    };
  
  constructor(props: any) {
    super(props);
    this.getPayoutById = this.getPayoutById.bind(this);
    this.getMerchantById = this.getMerchantById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.payoutPage.title.viewpayoutTitle + utils.getAppName();
    const payoutId = this.props.location.pathname.split("/")[2];
    if (payoutId !== undefined) {
        this.getPayoutById(payoutId);
      }
  }

  async getPayoutById(payoutId: any) {
    const obj:getDataByIdRequest = {
      id: payoutId,
    };
    const getPayoutById: any = await PayoutAPI.getPayoutById(obj);
    console.log("getPayoutById", getPayoutById);

    if (getPayoutById) {
      if (getPayoutById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          merchant: this.state.merchant = getPayoutById.resultObject.merchantId,
          commission: this.state.commission = getPayoutById.resultObject.commission,
          merchantOrderAmount: this.state.merchantOrderAmount =
            getPayoutById.resultObject.merchantOrderAmount,
          merchantPayAmount: this.state.merchantPayAmount = getPayoutById.resultObject.merchantPayAmount,
          payoutId:this.state.payoutId = getPayoutById.resultObject.payoutId
        });
        if(this.state.merchant) {
            this.getMerchantById(this.state.merchant);
        }
      } else {
        const msg1 = getPayoutById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async getMerchantById(id: any) {
    const getMerchantById: any = await MerchantAPI.getMerchantById(id);
    console.log("getMerchantById", getMerchantById);

    if (getMerchantById) {
      if (getMerchantById.status === 200) {
        this.setState({
            firstname:this.state.firstname = getMerchantById.resultObject.firstName,
            lastname:this.state.lastname = getMerchantById.resultObject.lastName,
            shopname: this.state.shopname = getMerchantById.resultObject.shopName
        });
      } else {
        const msg1 = getMerchantById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
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
    <h1>{constant.payoutPage.viewpayoutdetails.viewpayout}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-payout">
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
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.payoutPage.payoutTableColumn.merchantname
                              }
                            </b>
                          </Label>
                            <p>{this.state.firstname} {this.state.lastname}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>{
                                constant.payoutPage.payoutTableColumn.merchantpayamount
                              }</b>
                          </Label>
                          <p>{this.state.merchantPayAmount}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.payoutPage.payoutTableColumn.commision
                              }
                            </b>
                          </Label>
                          <p>{this.state.commission}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>{
                                constant.payoutPage.payoutTableColumn.merchantamount
                              }</b>
                          </Label>
                          <p>{this.state.merchantOrderAmount}</p>
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

export default ViewPayout;
