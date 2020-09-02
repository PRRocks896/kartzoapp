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
import NavBar from "../../navbar/navbar";
import { RoleAPI, ProductAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewProductCustomise extends React.Component<{
  history: any;
  location: any;
}> {
  productCustomiseState = constant.productCustomPage.state;
  state = {
    amount: this.productCustomiseState.amount,
    addondetails: this.productCustomiseState.addondetails,
    isActive: this.productCustomiseState.isActive,
    productdata: this.productCustomiseState.productdata,
    productdatatype: this.productCustomiseState.productdatatype,
  };
  constructor(props: any) {
    super(props);
    this.getCustomiseById = this.getCustomiseById.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.productCustomPage.title.viewcustomiseTitle + utils.getAppName();
    const productCustomiseTypeId = this.props.location.pathname.split("/")[2];
    if (productCustomiseTypeId !== undefined) {
      this.getCustomiseById(productCustomiseTypeId);
    }
  }

  async getCustomiseById(profuctCustomiseTypeId: any) {
    const obj = {
      id: profuctCustomiseTypeId,
    };
    const getCustomiseTypeById: any = await ProductAPI.getCustomiseById(obj);
    console.log("getCustomiseTypeById", getCustomiseTypeById);

    if (getCustomiseTypeById) {
      if (getCustomiseTypeById.status === 200) {
        this.setState({
          productdata: this.state.productdata =
            getCustomiseTypeById.resultObject.product,
          productdatatype: this.state.productdatatype =
            getCustomiseTypeById.resultObject.productCustomizeType,
          isActive: this.state.isActive =
            getCustomiseTypeById.resultObject.isActive,
          amount: this.state.amount = getCustomiseTypeById.resultObject.amount,
          addondetails: this.state.addondetails =
            getCustomiseTypeById.resultObject.addOnDetail,
        });
      } else {
        const msg1 = getCustomiseTypeById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  createMarkup() {
    return { __html: this.state.addondetails };
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
                        <h1>
                          {
                            constant.productCustomPage
                              .viewProductCustomisedetails
                              .viewProductCustomiseDetails
                          }
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
                        <Link to="/list-product-customise">
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
                                constant.productCustomPage
                                  .productCustomiseTableColumn.productname
                              }
                            </b>
                          </Label>
                          <p>{this.state.productdata}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.productCustomPage
                                  .productCustomiseTableColumn.customisetype
                              }
                            </b>
                          </Label>
                          <p>{this.state.productdatatype}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.productCustomPage
                                  .productCustomiseTableColumn.amount
                              }
                            </b>
                          </Label>
                          <p>{this.state.amount}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.productCustomPage
                                  .productCustomiseTableColumn.addondetails
                              }
                            </b>
                          </Label>
                          <p dangerouslySetInnerHTML={this.createMarkup()}></p>
                        </FormGroup>
                      </Col>
                    </Row>
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

export default ViewProductCustomise;
