import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Form,
  CustomInput,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import Switch from "react-switch";

import { ProductAPI, SliderAPI } from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import { addSliderStateRequest } from "../../../../modelController/sliderModel";

class AddSlider extends React.Component<{ history: any; location: any }> {
  sliderState: addSliderStateRequest = constant.homesliderPage.state;
  state = {
    selectedFile: this.sliderState.selectedFile,
    selectedFileerror: this.sliderState.selectedFile,
    file: this.sliderState.file,
    productid: this.sliderState.productid,
    productiderror: this.sliderState.productiderror,
    altertag: this.sliderState.altertag,
    updateTrue: this.sliderState.updateTrue,
    filetrue: this.sliderState.filetrue,
    sortorder: this.sliderState.sortorder,
    sortordererror: this.sliderState.sortordererror,
    isActive: this.sliderState.isActive,
    productdata: this.sliderState.productdata,
    sliderid: this.sliderState.sliderid
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
    this.addSlider = this.addSlider.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.getAllProduct = this.getAllProduct.bind(this);
    // this.getSliderDataById = this.getSliderDataById.bind(this);
  }

  async componentDidMount() {
    this.getAllProduct();
    const sliderId = this.props.location.pathname.split("/")[2];
    if (sliderId !== undefined) {
      this.getSliderById(sliderId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
        sliderid: this.state.sliderid = sliderId
      });
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.homesliderPage.title.updateHomesliderTitle +
        utils.getAppName();
    } else {
      document.title =
        constant.homesliderPage.title.addHomesliderTitle + utils.getAppName();
    }
  }

  handleChange(checked: boolean) {
    this.setState({ isActive: this.state.isActive = checked });
  }

  async getAllProduct() {
    const getAllProduct = await ProductAPI.getAllProduct();
    console.log("getAllProduct", getAllProduct);
    if (getAllProduct) {
      if (getAllProduct.status === 200) {
        this.setState({
          productdata: this.state.productdata = getAllProduct.resultObject,
        });
      } else {
        const msg1 = getAllProduct.message;
        utils.showSuccess(msg1);
      }

    } else {

    }
  }

  async getSliderById(categoryId: any) {
    const obj = {
      id: categoryId
    };
    const getSliderDataById: any = await SliderAPI.getSliderDataById(obj);
    console.log("getSliderDataById", getSliderDataById);
    if (getSliderDataById) {
      if (getSliderDataById.status === 200) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        filetrue: this.state.filetrue = true,
        productid: this.state.productid =
          getSliderDataById.resultObject.productId,
        altertag: this.state.altertag =
          getSliderDataById.resultObject.alterTag,
        file: this.state.file = getSliderDataById.resultObject.photoPath,
        sortorder: this.state.sortorder =
          getSliderDataById.resultObject.sortOrder,
        selectedFile: this.state.selectedFile =
          getSliderDataById.resultObject.photoPath,
        isActive: this.state.isActive = getSliderDataById.resultObject.isActive
      });
    } else {
      const msg1 = getSliderDataById.message;
      utils.showSuccess(msg1);
    }
    } else {

    }
  }

  onItemSelect(event: any) {
    this.setState({
      productid: this.state.productid =
        event.target.options[event.target.selectedIndex].value,
    });
  }

  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: this.state.filetrue = false,
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    } else {
      this.setState({
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    }
  }

  validate() {
    let productiderror = "";

    // if (!this.state.categoryname) {
    //   categorynameerror = "please enter category name";
    // }

    if (!this.state.productid) {
      productiderror = "please select product";
    }

    if (productiderror) {
      this.setState({ productiderror });
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

  async addSlider() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        productiderror: ""
      });
      if (this.state.productid) {

        let formData = new FormData();

        formData.append("productId", this.state.productid);
        formData.append("alterTag", this.state.altertag);
        formData.append("productLink", constant.productURL);
        formData.append("sortOrder", this.state.sortorder.toString());
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("files", this.state.selectedFile ? this.state.selectedFile[0] : '');
        formData.append("userId", "0");

        const addSlider = await SliderAPI.addSlider(formData);
        console.log("addSlider", addSlider);
        if (addSlider) {
          if(addSlider.status === 200) {
            const msg1 = addSlider.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-slider");
          } else {
            const msg1 = addSlider.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async updateSlider() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        productiderror: ""
      });
      if (this.state.productid) {

        let formData = new FormData();

        formData.append("homeSliderId", this.state.sliderid.toString());
        formData.append("productId", this.state.productid);
        formData.append("alterTag", this.state.altertag);
        formData.append("productLink", constant.productURL);
        formData.append("sortOrder", this.state.sortorder.toString());
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("files", this.state.selectedFile ? this.state.selectedFile[0] : '');
        formData.append("userId", "0");

        const editSlider = await SliderAPI.editSlider(formData, this.state.sliderid);
        console.log("editSlider", editSlider);
        if (editSlider) {
          if(editSlider.status === 200) {
            const msg1 = editSlider.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-slider");
          } else {
            const msg1 = editSlider.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  removeIcon() {
    this.setState({
      file: this.state.file = "",
    });
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
                          <h1>
                            {
                              constant.homesliderPage.title
                                .updateHomesliderTitle
                            }
                          </h1>
                        </Col>
                      ) : (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1>
                              {constant.homesliderPage.title.addHomesliderTitle}
                            </h1>
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
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {
                                constant.homesliderPage.homeSliderTableColumn
                                  .selectproduct
                              }
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                              value={
                                this.state.productid ? this.state.productid : ""
                              }
                            >
                              <option value="">
                                {
                                  constant.homesliderPage.homeSliderTableColumn
                                    .selectproduct
                                }
                              </option>
                              {this.state.productdata.length > 0
                                ? this.state.productdata.map(
                                  (data: any, index: any) => (
                                    <option key={index} value={data.value}>
                                      {data.name}
                                    </option>
                                  )
                                )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.productiderror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="altertag">
                            {
                              constant.homesliderPage.homeSliderTableColumn
                                .alterTag
                            }
                          </Label>
                          <Input
                            type="text"
                            id="altertag"
                            name="altertag"
                            className="form-control"
                            value={this.state.altertag}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your alter tag"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="sortorder">
                            {
                              constant.homesliderPage.homeSliderTableColumn
                                .sortOrder
                            }
                          </Label>
                          <Input
                            type="number"
                            id="sortnumber"
                            name="sortorder"
                            className="form-control"
                            value={this.state.sortorder}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your sort order"
                            required
                          />
                        </FormGroup>
                        <div className="mb-4 text-danger">
                          {this.state.sortordererror}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          {this.state.file != "" ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  {this.state.filetrue === true ? (
                                    <img
                                      className="picture"
                                      src={constant.filepath + this.state.file}
                                    />
                                  ) : (
                                      <img
                                        className="picture"
                                        src={this.state.file}
                                      />
                                    )}
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                              <div className="">
                                <p style={{ fontSize: "16px" }}>
                                  {
                                    constant.homesliderPage.homeSliderTableColumn
                                      .sliderimage
                                  }
                                </p>
                                <Label className="imag" for="file-input">
                                  <i
                                    className="fa fa-upload fa-lg"
                                    style={{ color: "#20a8d8" }}
                                  ></i>
                                </Label>
                                <Input
                                  id="file-input"
                                  type="file"
                                  className="form-control"
                                  name="file"
                                  onChange={this.onChangeHandler.bind(this)}
                                />
                              </div>
                            )}
                          <div className="text-danger">
                            {this.state.selectedFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <label>
                          <span>
                            {" "}
                            {constant.productPage.productTableColumn.isActive}
                          </span>
                          <br />
                          <div style={{ marginTop: "10px" }}>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.isActive}
                            />
                          </div>
                        </label>
                      </Col>
                    </Row>
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateSlider}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                        <Button
                          type="button"
                          size="sm"
                          color="primary"
                          className="mb-2 mr-2 custom-button"
                          onClick={this.addSlider}
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

export default AddSlider;
