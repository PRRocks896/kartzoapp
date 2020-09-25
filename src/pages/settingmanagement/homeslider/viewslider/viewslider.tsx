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
import {
  SliderAPI,
} from "../../../../service/index.service";
import { getDataByIdRequest, addSliderStateRequest } from "../../../../modelController";

class ViewSlider extends React.Component<{ history: any; location: any }> {
  sliderState: addSliderStateRequest = constant.homesliderPage.state;
  state = {
    selectedFile: this.sliderState.selectedFile,
    file: this.sliderState.file,
    productid: this.sliderState.productid,
    altertag: this.sliderState.altertag,
    sortorder: this.sliderState.sortorder,
    isActive: this.sliderState.isActive,
    productdata: this.sliderState.productdata,
    productLink: "",
  };

  constructor(props: any) {
    super(props);
    this.getSliderById = this.getSliderById.bind(this);
    // this.getMerchantById = this.getMerchantById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.homesliderPage.title.viewHomesliderTitle + utils.getAppName();
    const sliderId = this.props.location.pathname.split("/")[2];
    if (sliderId !== undefined) {
      this.getSliderById(sliderId);
    }
  }

  async getSliderById(sliderId: any) {
    const obj: getDataByIdRequest = {
      id: sliderId,
    };
    const getSliderDataById: any = await SliderAPI.getSliderDataById(obj);
    console.log("getSliderDataById", getSliderDataById);

    if (getSliderDataById) {
      if (getSliderDataById.status === 200) {
        this.setState({
          productid: this.state.productid =
            getSliderDataById.resultObject.productId,
          altertag: this.state.altertag = getSliderDataById.resultObject.alterTag,
          file: this.state.file = getSliderDataById.resultObject.photoPath,
          sortorder: this.state.sortorder =
            getSliderDataById.resultObject.sortOrder,
          selectedFile: this.state.selectedFile =
            getSliderDataById.resultObject.photoPath,
          isActive: this.state.isActive = getSliderDataById.resultObject.isActive,
          productLink: this.state.productLink =
            getSliderDataById.resultObject.productLink,
        });
      } else {
        const msg1 = getSliderDataById.message;
        utils.showSuccess(msg1);
      }
    } else {

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
                          {
                            constant.homesliderPage.viewHomesliderdetails
                              .viewHomeslider
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
                        <Link to="/list-slider">
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
                                constant.homesliderPage.homeSliderTableColumn
                                  .alterTag
                              }
                              :
                            </b>
                          </Label>
                          <p>{this.state.altertag}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.homesliderPage.homeSliderTableColumn
                                  .sortOrder
                              }
                              :
                            </b>
                          </Label>
                          <p>{this.state.sortorder}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.homesliderPage.homeSliderTableColumn
                                  .productLink
                              }
                              :
                            </b>
                          </Label>
                          <p>{this.state.productLink}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>
                              {
                                constant.homesliderPage.homeSliderTableColumn
                                  .image
                              }
                            </b>
                          </p>
                          {this.state.file != null ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  <img
                                    className="picture"
                                    src={constant.filepath + this.state.file}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ) : (
                              <div>
                                <i className="fa fa-user picture"></i>
                              </div>
                            )}
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

export default ViewSlider;
