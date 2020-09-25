import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  FormGroup,
  Label,
  CustomInput,
  Form,
  Row,
} from "reactstrap";
import {PayoutAPI, MerchantAPI} from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import {getDataByIdRequest ,payoutCreateRequest, payoutUpdateRequest, addPayoutStateRequest } from "../../../../modelController";

class AddPayout extends React.Component<{ history: any; location: any }> {
  payoutState : addPayoutStateRequest = constant.payoutPage.state;
  state = {
    merchant: this.payoutState.merchant,
    merchanterror: this.payoutState.merchanterror,
    merchantOrderAmount: this.payoutState.merchantOrderAmount,
    merchantOrderAmounterror: this.payoutState.merchantOrderAmounterror,
    isActive: this.payoutState.isActive,
    updateTrue: this.payoutState.updateTrue,
    payoutId:this.payoutState.payoutId,
    commission:this.payoutState.commission,
    commissionerror: this.payoutState.commissionerror,
    merchantPayAmount:this.payoutState.merchantPayAmount,
    merchantPayAmounterror:this.payoutState.merchantPayAmounterror,
    merchantdata:this.payoutState.merchantdata,
    firstname:this.payoutState.firstname,
    lastname:this.payoutState.lastname,
    shopname:this.payoutState.shopname
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addPayout = this.addPayout.bind(this);
    this.updatePayout = this.updatePayout.bind(this);
    this.getMerchant = this.getMerchant.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getPayoutById = this.getPayoutById.bind(this);
    this.getMerchantById = this.getMerchantById.bind(this);
  }

  async componentDidMount() {
    const payoutId = this.props.location.pathname.split("/")[2];
    if (payoutId !== undefined) {
      this.getPayoutById(payoutId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.payoutPage.title.updatepayoutTitle + utils.getAppName();
    } else {
      document.title =
      constant.payoutPage.title.addPayoutTitle + utils.getAppName();
    }
    this.getMerchant();
  }

  onItemSelect(event: any) {
    this.setState({
      merchant: this.state.merchant = event.target.value
    });
  }

 async getMerchant() {
    const getMerchantList: any = await MerchantAPI.getMerchantList();
    console.log("getMerchantList", getMerchantList);
    if (getMerchantList) {
      if(getMerchantList.status === 200) {
      this.setState({
        merchantdata:this.state.merchantdata = getMerchantList.resultObject 
    });
  } else {
    const msg1 = getMerchantList.message;
    utils.showError(msg1);
  }
    } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
    }
    }
 

  async getPayoutById(payoutId: any) {
    const obj:getDataByIdRequest = {
      id: payoutId,
    };
    const getPayoutById: any = await PayoutAPI.getPayoutById(obj);
    console.log("getPayoutById", getPayoutById);

    if (getPayoutById) {
      if(getPayoutById.status === 200) {
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
    }  else {
      const msg1 = getPayoutById.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  async getMerchantById(id: any) {
    const getMerchantById: any = await MerchantAPI.getMerchantById(id);
    console.log("getMerchantById", getMerchantById);

    if (getMerchantById) {
      if(getMerchantById.status === 200) {
      this.setState({
        firstname:this.state.firstname = getMerchantById.resultObject.firstName,
        lastname:this.state.lastname = getMerchantById.resultObject.lastName,
        shopname: this.state.shopname = getMerchantById.resultObject.shopName
    });
  }  else {
    const msg1 = getMerchantById.message;
    utils.showError(msg1);
  }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }


  validate() {
    let merchanterror = "";
    let merchantOrderAmounterror = "";
    let merchantPayAmounterror = "";

    if (!this.state.merchant) {
        merchanterror = "please select merchant";
    }

    if (!this.state.merchantOrderAmount) {
        merchantOrderAmounterror = "please enter merchant amount";
    }

    if (!this.state.merchantPayAmount) {
        merchantPayAmounterror = "please enter merchant pay amount";
    }

    if (merchanterror || merchantOrderAmounterror || merchantPayAmounterror) {
      this.setState({ merchanterror,merchantOrderAmounterror, merchantPayAmounterror});
      return false;
    }
    return true;
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async addPayout() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        merchanterror: "",
        merchantOrderAmounterror: "",
        merchantPayAmounterror: ""
      });
      if (this.state.merchant && this.state.merchantOrderAmount && this.state.merchantPayAmount) {
        const obj: payoutCreateRequest = {
            merchantId: parseInt(this.state.merchant),
            merchantOrderAmount: parseInt(this.state.merchantOrderAmount),
            commission: parseInt(this.state.commission),
            merchantPayAmount:parseInt(this.state.merchantPayAmount)
        };

        const addPayout = await PayoutAPI.addPayout(obj);
        console.log("addPayout", addPayout);

        if (addPayout) {
          if(addPayout.status === 200) {
            const msg1 = addPayout.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-payout");
        } else {
          const msg1 = addPayout.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async updatePayout() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        merchanterror: "",
        merchantOrderAmounterror: "",
        merchantPayAmounterror: ""
      });
      if (this.state.merchant && this.state.merchantOrderAmount && this.state.merchantPayAmount) {
        const obj: payoutUpdateRequest = {
            payoutId:parseInt(this.state.payoutId),
            merchantId: parseInt(this.state.merchant),
            merchantOrderAmount: parseInt(this.state.merchantOrderAmount),
            commission: parseInt(this.state.commission),
            merchantPayAmount:parseInt(this.state.merchantPayAmount)
        };

        const editPayout = await PayoutAPI.editPayout(obj);
        console.log("editPayout", editPayout);

        if (editPayout) {
          if(editPayout.status === 200) {
            const msg1 = editPayout.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-payout");
        } else {
          const msg1 = editPayout.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.payoutPage.title.updatepayoutTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1>{constant.payoutPage.title.addPayoutTitle}</h1>
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
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {constant.payoutPage.payoutTableColumn.merchant}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="merchant"
                              onChange={this.onItemSelect}
                            >
                                {
                                    this.state.updateTrue === true ? (
                                        <>
                                         <option value={this.state.merchant}>{this.state.firstname} {this.state.lastname} : {this.state.shopname}</option>
                              {this.state.merchantdata.length > 0
                                ? this.state.merchantdata.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                                        </>
                                    ) : (
                                        <>
                                         <option value="">{constant.payoutPage.payoutTableColumn.merchant}</option>
                              {this.state.merchantdata.length > 0
                                ? this.state.merchantdata.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                                        </>
                                    )
                                }
                             
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.merchanterror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            {constant.payoutPage.payoutTableColumn.commision}
                          </Label>
                          <Input
                            type="number"
                            id="commission"
                            name="commission"
                            className="form-control"
                            value={this.state.commission}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your commision"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.commissionerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="description">{constant.payoutPage.payoutTableColumn.merchantamount}</Label>
                          <Input
                            type="number"
                            id="amount"
                            name="merchantOrderAmount"
                            className="form-control"
                            value={this.state.merchantOrderAmount}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your merchant order amount"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.merchantOrderAmounterror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="description">{constant.payoutPage.payoutTableColumn.merchantpayamount}</Label>
                          <Input
                            type="number"
                            id="paymentamount"
                            name="merchantPayAmount"
                            className="form-control"
                            value={this.state.merchantPayAmount}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your merchant pay amount"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.merchantPayAmounterror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                   
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updatePayout}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addPayout}
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

export default AddPayout;
