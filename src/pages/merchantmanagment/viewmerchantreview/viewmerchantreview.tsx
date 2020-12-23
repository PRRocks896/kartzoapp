import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { MerchantAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import {
  getDataByIdRequest,
  addMerchantStateRequest,
} from "../../../modelController";
import StarRatingComponent from "react-star-rating-component";

class ViewMerchantReview extends React.Component<{
  history: any;
  location: any;
}> {

  /** Merchant state */
  merchantState:any = constant.merchantPage.state;
  state = {
    merchantname:'',
    customername:'',
    rating:0,
    ratingdetails:''
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.getMerchantReviewById = this.getMerchantReviewById.bind(this);
  }

  /** Page Render call */
  async componentDidMount() {
    document.title =
      constant.merchantPage.title.viewMerchantReviewTitle +
      utils.getAppName();
    const merchantId = this.props.location.pathname.split("/")[2];
    if (merchantId !== undefined) {
      this.getMerchantReviewById(merchantId);
    }
  }

  /**
   * 
   * @param id : merchant id
   */
  async getMerchantReviewById(id: getDataByIdRequest) {
    const getMerchantReviewById: any = await MerchantAPI.getMerchantReviewById(id);
    // console.log("getMerchantReviewById", getMerchantReviewById);

    if (getMerchantReviewById) {
      if(getMerchantReviewById.status === 200) {

      this.setState({
        merchantname:getMerchantReviewById.resultObject.merchantName,
        customername:getMerchantReviewById.resultObject.userName,
        rating:getMerchantReviewById.resultObject.rating,
        ratingdetails:getMerchantReviewById.resultObject.reviewDetail
      });
    } else {
      const msg1 = getMerchantReviewById.message;
        utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
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
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1 className="userbutton1">{constant.merchantPage.title.viewMerchantReviewTitle}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="userbutton"
                      >
                        <Link to="/list-merchant-review">
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
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .merchantname
                              }
                            </b>
                          </Label>
                          <p>{this.state.merchantname}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .customername
                                }
                              </b>
                            </Label>
                            <p>{this.state.customername}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {constant.merchantPage.merchantTableColumn.rating}
                            </b>
                          </Label>
                          <div>
                          <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={this.state.rating}
                />
                        </div>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .ratingdetails
                                }
                              </b>
                            </Label>
                            <p>{this.state.ratingdetails ? this.state.ratingdetails : 'N/A'}</p>
                          </FormGroup>
                        </Form>
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

export default ViewMerchantReview;
