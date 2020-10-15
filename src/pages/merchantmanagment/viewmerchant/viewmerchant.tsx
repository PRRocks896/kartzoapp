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

class ViewMerchant extends React.Component<{
  history: any;
  location: any;
}> {
  merchantState: addMerchantStateRequest = constant.merchantPage.state;
  state = {
    selectedFile: this.merchantState.selectedFile,
    selectedProfileFile: this.merchantState.selectedProfileFile,
    selectedProofFile: this.merchantState.selectedProofFile,
    selectedDocumentFile: this.merchantState.selectedDocumentFile,
    firstname: this.merchantState.firstname,
    firstnameerror: this.merchantState.firstnameerror,
    lastname: this.merchantState.lastname,
    lastnameerror: this.merchantState.lastnameerror,
    email: this.merchantState.email,
    emailerror: this.merchantState.emailerror,
    mobilenumber: this.merchantState.mobilenumber,
    mobilenumbererror: this.merchantState.mobilenumbererror,
    shopname: this.merchantState.shopname,
    shopnamerror: this.merchantState.shopnamerror,
    address: this.merchantState.address,
    addresserror: this.merchantState.addresserror,
    city: this.merchantState.city,
    cityerror: this.merchantState.cityerror,
    user: this.merchantState.user,
    usererror: this.merchantState.usererror,
    zipcode: this.merchantState.zipcode,
    zipcodeerror: this.merchantState.zipcodeerror,
    latitude: this.merchantState.latitude,
    latitudeerror: this.merchantState.latitudeerror,
    longitude: this.merchantState.longitude,
    longitudeerror: this.merchantState.longitudeerror,
    website: this.merchantState.website,
    shoppingpolicy: this.merchantState.shoppingpolicy,
    shoppingpolicyerror: this.merchantState.shoppingpolicyerror,
    refundpolicy: this.merchantState.refundpolicy,
    refundpolicyerror: this.merchantState.refundpolicyerror,
    cancellationpolicy: this.merchantState.cancellationpolicy,
    cancellationpolicyerror: this.merchantState.cancellationpolicyerror,
    isOpen: this.merchantState.isOpen,
    checked: this.merchantState.checked,
    selectedFileerror: this.merchantState.selectedFileerror,
    selectedProofFileerror: this.merchantState.selectedProofFileerror,
    selectedDocumentFileerror: this.merchantState.selectedDocumentFileerror,
    password: this.merchantState.password,
    passworderror: this.merchantState.passworderror,
    citydata: this.merchantState.citydata,
    type: this.merchantState.type,
    file: this.merchantState.file,
    filetrue: this.merchantState.filetrue,
    file1: this.merchantState.file1,
    file1true: this.merchantState.file1true,
    file2: this.merchantState.file2,
    file2true: this.merchantState.file2true,
    file4: this.merchantState.file4,
    file4true: this.merchantState.file4true,
    roleid: this.merchantState.roleid,
    categoryname: this.merchantState.categoryname
  };

  constructor(props: any) {
    super(props);
    this.getMerchantById = this.getMerchantById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.merchantPage.viewmerchanrpagedetails.viewmerchant +
      utils.getAppName();
    const merchantId = this.props.location.pathname.split("/")[2];
    if (merchantId !== undefined) {
      this.getMerchantById(merchantId);
    }
  }

  async getMerchantById(id: getDataByIdRequest) {
    const getMerchantById: any = await MerchantAPI.getMerchantById(id);
    // console.log("getMerchantById", getMerchantById);

    if (getMerchantById) {
      if(getMerchantById.status === 200) {

      this.setState({
        selectedFile: this.state.selectedFile =
          getMerchantById.resultObject.logoPath ? getMerchantById.resultObject.logoPath : '',
        selectedProofFile: this.state.selectedProofFile =
          getMerchantById.resultObject.idProofPath ? getMerchantById.resultObject.idProofPath : '',
        selectedDocumentFile: this.state.selectedDocumentFile =
          getMerchantById.resultObject.documentPath ? getMerchantById.resultObject.documentPath : '',
        selectedProfileFile: this.state.selectedProfileFile = getMerchantById.resultObject.profilePhotoPath ? getMerchantById.resultObject.profilePhotoPath : '',
        firstname: this.state.firstname =
          getMerchantById.resultObject.firstName,
        lastname: this.state.lastname = getMerchantById.resultObject.lastName,
        email: this.state.email = getMerchantById.resultObject.email,
        mobilenumber: this.state.mobilenumber =
          getMerchantById.resultObject.phone,
        shopname: this.state.shopname = getMerchantById.resultObject.shopName,
        address: this.state.address = getMerchantById.resultObject.address,
        city: this.state.city = getMerchantById.resultObject.cityName,
        zipcode: this.state.zipcode = getMerchantById.resultObject.zipCode,
        latitude: this.state.latitude = getMerchantById.resultObject.latitude,
        longitude: this.state.longitude =
          getMerchantById.resultObject.longitude,
        website: this.state.website = getMerchantById.resultObject.website,
        shoppingpolicy: this.state.shoppingpolicy =
          getMerchantById.resultObject.shippingPolicy,
        refundpolicy: this.state.refundpolicy =
          getMerchantById.resultObject.refundPolicy,
        cancellationpolicy: this.state.cancellationpolicy =
          getMerchantById.resultObject.cancellationPolicy,
        password: this.state.password = getMerchantById.resultObject.password,
        file: this.state.file = getMerchantById.resultObject.logoPath ? getMerchantById.resultObject.logoPath : '',
        file1: this.state.file1 = getMerchantById.resultObject.idProofPath ? getMerchantById.resultObject.idProofPath : '',
        file2: this.state.file2 = getMerchantById.resultObject.documentPath ? getMerchantById.resultObject.documentPath : '',
        file4: this.state.file4 = getMerchantById.resultObject.profilePhotoPath ? getMerchantById.resultObject.profilePhotoPath : '',
        roleid: this.state.roleid = getMerchantById.resultObject.role,
        categoryname: this.state.categoryname = getMerchantById.resultObject.categoryName ? getMerchantById.resultObject.categoryName : 'N/A'
      });
    } else {
      const msg1 = getMerchantById.message;
        utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
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
                        <h1>{constant.merchantPage.title.viewMerchantTitle}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-merchant">
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
                                  .Firstname
                              }
                            </b>
                          </Label>
                          <p>{this.state.firstname}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .lastname
                                }
                              </b>
                            </Label>
                            <p>{this.state.lastname}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {constant.merchantPage.merchantTableColumn.email}
                            </b>
                          </Label>
                          <p>{this.state.email}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .phone
                                }
                              </b>
                            </Label>
                            <p>{this.state.mobilenumber}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .password
                              }
                            </b>
                          </Label>
                          <p>{this.state.password}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .shopname
                                }
                              </b>
                            </Label>
                            <p>{this.state.shopname}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .latitude
                              }
                            </b>
                          </Label>
                          <p>{this.state.latitude}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .longitude
                                }
                              </b>
                            </Label>
                            <p>{this.state.longitude}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .Address
                              }
                            </b>
                          </Label>
                          <p>{this.state.address}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .website
                                }
                              </b>
                            </Label>
                            <p>{this.state.website}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .selectedFile
                              }
                            </b>
                          </p>
                          <div>
                            {this.state.file != null ? (
                              <img
                                className="picture"
                                src={
                                  constant.fileMerchantpath + this.state.file
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .merchantidproof
                              }
                            </b>
                          </p>
                          <div>
                            {this.state.file1 != null ? (
                              <img
                                className="picture"
                                src={
                                  constant.fileMerchantpath + this.state.file1
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .document
                              }
                            </b>
                          </p>
                          <div>
                            {this.state.file2 != null ? (
                              <img
                                className="picture"
                                src={
                                  constant.fileMerchantpath + this.state.file2
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .profile
                              }
                            </b>
                          </p>
                          <div>
                            {this.state.file4 != null ? (
                              <img
                                className="picture"
                                src={
                                  constant.fileMerchantpath + this.state.file4
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .role
                                }
                              </b>
                            </Label>
                            <p>{this.state.roleid}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .cityname
                              }
                            </b>
                          </Label>
                          <p>{this.state.city}</p>
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .category
                                }
                              </b>
                            </Label>
                            <p>{this.state.categoryname}</p>
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

export default ViewMerchant;
