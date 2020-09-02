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
import { addOnCreateRequest } from "../../../modelController/productAddOnModel";

class AddOnProduct extends React.Component<{ history: any }> {
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
  };

  constructor(props: any) {
    super(props);

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    // this.addOnProduct = this.addOnProduct.bind(this);
    this.onProductSelect = this.onProductSelect.bind(this);
    this.handleEditorMainChange = this.handleEditorMainChange.bind(this);
  }
  async componentDidMount() {
    document.title = constant.addonProduct + utils.getAppName();
    // this.getAllProduct();
    // const getProduct = await API.getProduct();
    // console.log("getProduct",getProduct);
  }

  onProductSelect(event: any) {
    this.setState({
      productid: this.state.productid = event.target.value,
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

    if (productiderror || producttypeiderror || amounterror || addondetailerror) {
      this.setState({ productiderror,producttypeiderror,amounterror, addondetailerror });
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

//   async addOnProduct() {
//     const isValid = this.validate();
//     if (isValid) {
//       this.setState({
//         productiderror: "",
//         addondetailerror: "",
//       });
//       if (this.state.productid && this.state.addondetail) {
//         const obj: addOnCreateRequest = {
//           productid: this.state.productid,
//           addondetail: this.state.addondetail,
//         };

//         // const addOnProduct = await API.addOnProduct(obj);
//         // console.log("addOnProduct",addOnProduct);

//         if (
//           this.state.productid === obj.productid &&
//           this.state.addondetail === obj.addondetail
//         ) {
//           const msg = "Product details Added Successfully";
//           utils.showSuccess(msg);
//           // this.props.history.push('/users');
//         } else {
//           const msg1 = "Error";
//           utils.showError(msg1);
//         }
//       }
//     }
//   }

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
                            >
                              <option value="">
                                {
                                  constant.productCustomPage
                                    .productCustomiseTableColumn.selectproduct
                                }
                              </option>

                              {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
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
                              //   onChange={this.onProductTypeSelect}
                            >
                              <option value="">
                                {
                                  constant.productCustomPage
                                    .productCustomiseTableColumn
                                    .selectproducttype
                                }
                              </option>
                              <option value="Product-1">Product-1</option>
                              <option value="Product-2">Product-2</option>
                              {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
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
                            initialValue="<p>This is the initial content of the editor</p>"
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
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mt-3 mr-2 custom-button"
                        // onClick={this.addOnProduct}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mt-3 mr-2 custom-button"
                        // onClick={this.addOnProduct}
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
