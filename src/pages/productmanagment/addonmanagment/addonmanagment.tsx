import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
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
import "./addonmanagment.css";
import NavBar from "../../navbar/navbar";
import API from "../../../service/product.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import { Editor } from "@tinymce/tinymce-react";
import { addOnCreateRequest, addOnUpdateRequest } from "../../../modelController/productAddOnModel";
import { ProductAPI } from "../../../service/index.service";

class AddOnProduct extends React.Component<{ history: any,location:any }> {
  productCustomiseState = constant.productCustomPage.state;
  state = {
    productid: this.productCustomiseState.productid,
    productiderror: this.productCustomiseState.productiderror,
    producttypeid: this.productCustomiseState.producttypeid,
    producttypeiderror: this.productCustomiseState.producttypeiderror,
    amount: this.productCustomiseState.amount,
    amounterror: this.productCustomiseState.amounterror,
    addondetails: this.productCustomiseState.addondetails,
    addondetailserror: this.productCustomiseState.addondetailserror,
    updateTrue: this.productCustomiseState.updateTrue,
    typeid: this.productCustomiseState.typeid,
    isActive: this.productCustomiseState.isActive,
    productdata: this.productCustomiseState.productdata,
    productdatatype: this.productCustomiseState.productdatatype,
  };

  constructor(props: any) {
    super(props);

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addOnProduct = this.addOnProduct.bind(this);
    this.onProductSelect = this.onProductSelect.bind(this);
    this.onProductTypeSelect = this.onProductTypeSelect.bind(this);
    this.handleEditorMainChange = this.handleEditorMainChange.bind(this);
    this.getCustomiseById = this.getCustomiseById.bind(this);
    this.updateaddOnProduct = this.updateaddOnProduct.bind(this);
  }

  async componentDidMount() {
      this.getAllProduct();
      this.getAllProductType();
      const profuctCustomiseTypeId = this.props.location.pathname.split("/")[2];
    if (profuctCustomiseTypeId !== undefined) {
      this.getCustomiseById(profuctCustomiseTypeId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
        typeid:this.state.typeid = profuctCustomiseTypeId
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
      constant.productCustomPage.title.updatecustomiseTitle + utils.getAppName();
    } else {
        document.title =
      constant.productCustomPage.title.addcustomiseTitle + utils.getAppName();
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
          updateTrue: this.state.updateTrue = true,
          productid: this.state.productid = getCustomiseTypeById.resultObject.productId,
          producttypeid: this.state.producttypeid = getCustomiseTypeById.resultObject.productCustomizeTypeId,
          isActive: this.state.isActive = getCustomiseTypeById.resultObject.isActive,
          amount:this.state.amount = getCustomiseTypeById.resultObject.amount,
          addondetails: this.state.addondetails = getCustomiseTypeById.resultObject.addOnDetail
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

  handleChange(checked: boolean) {
    this.setState({ isActive: this.state.isActive = checked });
  }

  async getAllProduct() {
    const getAllProduct = await ProductAPI.getAllProduct();
    console.log("getAllProduct", getAllProduct);
    if (getAllProduct.status === 200) {
      this.setState({
        productdata: this.state.productdata = getAllProduct.resultObject,
      });
    } else {
      const msg1 = getAllProduct.message;
      utils.showError(msg1);
    }
  }

  async getAllProductType() {
    const getAllProductType = await ProductAPI.getAllProductTypeType();
    console.log("getAllProductType", getAllProductType);
    if (getAllProductType.status === 200) {
      this.setState({
        productdatatype: this.state.productdatatype =
          getAllProductType.resultObject,
      });
    } else {
      const msg1 = getAllProductType.message;
      utils.showError(msg1);
    }
  }

  onProductSelect(event: any) {
    this.setState({
      productid: this.state.productid = event.target.value,
    });
  }

  onProductTypeSelect(event: any) {
    this.setState({
      producttypeid: this.state.producttypeid = event.target.value,
    });
  }

  validate() {
    let productiderror = "";
    let producttypeiderror = "";
    let amounterror = "";
    let addondetailerror = "";

    if (!this.state.productid) {
      productiderror = "please select product";
    }

    if (!this.state.producttypeid) {
      producttypeiderror = "please select product type";
    }

    if (!this.state.amount) {
      amounterror = "please enter amount";
    }

    if (!this.state.addondetails) {
      addondetailerror = "please enter details";
    }

    if (
      productiderror ||
      producttypeiderror ||
      amounterror ||
      addondetailerror
    ) {
      this.setState({
        productiderror,
        producttypeiderror,
        amounterror,
        addondetailerror,
      });
      return false;
    }
    return true;
  }

  handleEditorMainChange = (content: any, editor: any) => {
    this.setState({
      addondetails: this.state.addondetails = content,
    });
  };

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

    async addOnProduct() {
      const isValid = this.validate();
      if (isValid) {
        this.setState({
            productiderror:"",
            producttypeiderror:"",
            amounterror:"",
            addondetailerror:"",
        });
        if (this.state.productid && this.state.producttypeid && this.state.amount && this.state.addondetails) {
          const obj: addOnCreateRequest = {
            productId: parseInt(this.state.productid),
            productCustomizeTypeId: parseInt(this.state.producttypeid),
            addOnDetail: this.state.addondetails,
            isActive:this.state.isActive,
            amount:parseInt(this.state.amount)
          };

          const addOnProduct = await ProductAPI.addOnProduct(obj);
          console.log("addOnProduct",addOnProduct);

          if (addOnProduct) {
            if (addOnProduct.status === 200) {
              const msg = addOnProduct.message;
              utils.showSuccess(msg);
              this.props.history.push("/list-product-customise");
            } else {
              const msg1 = addOnProduct.message;
              utils.showError(msg1);
            }
          } else {
            const msg1 = "Internal server error";
            utils.showError(msg1);
          }
        }
      }
    }

    async updateaddOnProduct() {
        const isValid = this.validate();
        if (isValid) {
          this.setState({
              productiderror:"",
              producttypeiderror:"",
              amounterror:"",
              addondetailerror:"",
          });
          if (this.state.productid && this.state.producttypeid && this.state.amount && this.state.addondetails) {
            const obj: addOnUpdateRequest = {
              productCustomizeId: parseInt(this.state.typeid),
              productId: parseInt(this.state.productid),
              productCustomizeTypeId: parseInt(this.state.producttypeid),
              addOnDetail: this.state.addondetails,
              isActive:this.state.isActive,
              amount:parseInt(this.state.amount)
            };
  
            const editaddOnProduct = await ProductAPI.editaddOnProduct(obj,obj.productCustomizeId);
            console.log("editaddOnProduct",editaddOnProduct);
  
            if (editaddOnProduct) {
              if (editaddOnProduct.status === 200) {
                const msg = editaddOnProduct.message;
                utils.showSuccess(msg);
                this.props.history.push("/list-product-customise");
              } else {
                const msg1 = editaddOnProduct.message;
                utils.showError(msg1);
              }
            } else {
              const msg1 = "Internal server error";
              utils.showError(msg1);
            }
          }
        }
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
                            {
                              constant.productCustomPage.title
                                .updatecustomiseTitle
                            }
                          </h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
                            {constant.productCustomPage.title.addcustomiseTitle}
                          </h1>
                        </Col>
                      )}

                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="text-right"
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
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {
                                constant.productCustomPage
                                  .productCustomiseTableColumn.selectproduct
                              }
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="productid"
                              onChange={this.onProductSelect}
                              value={
                                this.state.productid ? this.state.productid : ""
                              }
                            >
                              <option value="">
                                {
                                  constant.productCustomPage
                                    .productCustomiseTableColumn.selectproduct
                                }
                              </option>
                              {this.state.productdata.length > 0
                                ? this.state.productdata.map(
                                    (data: any, index: number) => (
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
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect1">
                              {
                                constant.productCustomPage
                                  .productCustomiseTableColumn.selectproducttype
                              }
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect1"
                              name="productid1"
                              onChange={this.onProductTypeSelect}
                              value={
                                this.state.producttypeid
                                  ? this.state.producttypeid
                                  : ""
                              }
                            >
                              <option value="">
                                {
                                  constant.productCustomPage
                                    .productCustomiseTableColumn
                                    .selectproducttype
                                }
                              </option>
                              {this.state.productdatatype.length > 0
                                ? this.state.productdatatype.map(
                                    (data: any, index: number) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.producttypeiderror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="typename">
                            {
                              constant.productCustomPage
                                .productCustomiseTableColumn.amount
                            }
                          </Label>
                          <Input
                            type="number"
                            id="typename"
                            name="amount"
                            className="form-control"
                            value={this.state.amount}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your amount"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.amounterror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div>
                          <p style={{ fontSize: "16px" }}>
                            {" "}
                            {
                              constant.productCustomPage
                                .productCustomiseTableColumn.addondetails
                            }
                          </p>
                          <input
                            id="my-file4"
                            type="file"
                            name="my-file4"
                            style={{ display: "none" }}
                          />
                          <Editor
                            initialValue={this.state.addondetails ? this.state.addondetails : "<p>This is the initial content of the editor</p>"}
                            init={{
                              height: 200,
                              menubar: false,

                              plugins: [
                                "advlist autolink lists link image imagetools charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                              ],
                              toolbar:
                                "undo redo | formatselect | bold italic backcolor | image |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help",
                              images_upload_handler: function (
                                blobInfo: any,
                                success: any,
                                failure: any
                              ) {
                                setTimeout(function (blobInfo) {
                                  /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                  success();
                                }, 2000);
                              },
                              file_picker_callback: function (
                                callback: any,
                                value: any,
                                meta: any
                              ) {
                                if (meta.filetype == "image") {
                                  var input: any = document.getElementById(
                                    "my-file4"
                                  );
                                  input.click();
                                  input.onchange = function () {
                                    var file = input.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function (e: any) {
                                      callback(e.target.result, {
                                        alt: file.name,
                                      });
                                    };
                                    reader.readAsDataURL(file);
                                  };
                                }
                              },
                            }}
                            onEditorChange={this.handleEditorMainChange}
                          />
                        </div>
                        <div className="text-danger">
                          {this.state.addondetailserror}
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <label>
                      <span>{constant.productCustomPage.productCustomiseTableColumn.isActive}</span>
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
                        className="mb-2 mt-3 mr-2 custom-button"
                        onClick={this.updateaddOnProduct}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mt-3 mr-2 custom-button"
                        onClick={this.addOnProduct}
                      >
                        {constant.button.Save}
                      </Button>
                    )}
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

export default AddOnProduct;
