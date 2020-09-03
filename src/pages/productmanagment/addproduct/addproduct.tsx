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
import "./addproduct.css";
import NavBar from "../../navbar/navbar";
import API from "../../../service/merchant.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import { Editor } from "@tinymce/tinymce-react";
import { CategoryAPI, MerchantAPI, ProductAPI } from "../../../service/index.service";
import ImageUploading from "react-images-uploading";
import { any } from "prop-types";
import { getDataByIdRequest } from "../../../modelController";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024;

class AddProduct extends React.Component<{ history: any,location:any }> {
  productState = constant.productPage.state;
  state = {
    merchantid: this.productState.merchantid,
    merchantiderror: this.productState.merchantiderror,
    maincategoryid: this.productState.maincategoryid,
    maincategoryiderror: this.productState.maincategoryiderror,
    productname: this.productState.productname,
    productnameerror: this.productState.productnameerror,
    productdescription: this.productState.productdescription,
    productdescriptionerror: this.productState.productdescriptionerror,
    price: this.productState.price,
    priceerror: this.productState.priceerror,
    discountprice: this.productState.discountprice,
    discountpriceerror: this.productState.discountpriceerror,
    isFeatured: this.productState.isFeatured,
    metatitle: this.productState.metatitle,
    metatitleerror: this.productState.metatitleerror,
    metadiscription: this.productState.metadiscription,
    metadiscriptionerror: this.productState.metadiscriptionerror,
    metakeyword: this.productState.metakeyword,
    metakeyworderror: this.productState.metakeyworderror,
    sortorder: this.productState.sortorder,
    sortordererror: this.productState.sortordererror,
    images: this.productState.images,
    imageserror: this.productState.imageserror,
    categorylist: this.productState.categorylist,
    merchantlist: this.productState.merchantlist,
    imagesPreviewUrls: this.productState.imagesPreviewUrls,
    updateTrue:this.productState.updateTrue,
    productid:this.productState.productid,
    displayimage: this.productState.displayimage
  };

  constructor(props: any) {
    super(props);
    this.onMainCategorySelect = this.onMainCategorySelect.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.onMerchantSelect = this.onMerchantSelect.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  _handleImageChange(e: any) {
    e.preventDefault();
    let images: any = Array.from(e.target.files);
    this.setState({
      images:this.state.images = images
    });
    images.forEach((file:any) => {
      let reader:any = new FileReader();
      reader.onloadend = () => {
        this.setState({
          imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result],
        });
      };
      reader.readAsDataURL(file);
    });
  }

  handleChange(checked: boolean) {
    this.setState({ isFeatured: this.state.isFeatured = checked });
  }

  async componentDidMount() {
   
    this.getAllCategory();
    this.getAllMerchant();
    const productId = this.props.location.pathname.split("/")[2];
    if (productId !== undefined) {
      this.getProductById(productId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
        productid:this.state.productid = productId
      });
    }
    if(this.state.updateTrue === true) {
      document.title = constant.productPage.title.updateProductTitle + utils.getAppName();
    } else {
      document.title = constant.productPage.title.addProductTitle + utils.getAppName();
    }
  }

  async getProductById(id: getDataByIdRequest) {
    const getProductById: any = await ProductAPI.getProductById(id);
    console.log("getProductById", getProductById);

    if (getProductById) {
      if (getProductById.status === 200) {
        this.setState({
         merchantid:this.state.merchantid = getProductById.resultObject.merchantId,
         maincategoryid:this.state.maincategoryid = getProductById.resultObject.categoryId,
         prodctname: this.state.productname = getProductById.resultObject.productName,
        price:this.state.price =  getProductById.resultObject.price,
        discountprice: this.state.discountprice = getProductById.resultObject.discountPrice,
        metatitle:this.state.metatitle = getProductById.resultObject.metaTitle,
        metadescritption:this.state.metadiscription = getProductById.resultObject.metaDescription,
        metakeyword: this.state.metakeyword = getProductById.resultObject.metaKeyword,
        productdescription:this.state.productdescription = getProductById.resultObject.productDesc,
        sortorder:this.state.sortorder = getProductById.resultObject.sortOrder,
        isFeatured:this.state.isFeatured =  getProductById.resultObject.isFeatured,
        images:this.state.images = getProductById.resultObject.productImages
        });
        console.log("images",this.state.images);
      } else {
        const msg1 = getProductById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async getAllCategory() {
    const getAllCategory = await CategoryAPI.getAllCategory();
    console.log("getAllCategory", getAllCategory);
    if (getAllCategory.status === 200) {
      this.setState({
        categorylist: this.state.categorylist = getAllCategory.resultObject,
      });
    } else {
      const msg1 = getAllCategory.message;
      utils.showError(msg1);
    }
  }

  async getAllMerchant() {
    const getAllMerchant = await MerchantAPI.getMerchantList();
    console.log("getAllMerchant", getAllMerchant);
    if (getAllMerchant.status === 200) {
      this.setState({
        merchantlist: this.state.merchantlist = getAllMerchant.resultObject,
      });
    } else {
      const msg1 = getAllMerchant.message;
      utils.showError(msg1);
    }
  }

  onMerchantSelect(event: any) {
    this.setState({
      merchantid: this.state.merchantid = event.target.value,
    });
  }

  onMainCategorySelect(event: any) {
    this.setState({
      maincategoryid: this.state.maincategoryid = event.target.value,
    });
  }

  handleMainChange = (content: any, editor: any) => {
    this.setState({
      productdescription: this.state.productdescription = content,
    });
  };

  handleDescChange = (content: any, editor: any) => {
    console.log("handleDescChange Content was updated:", content);
    this.setState({
      metadiscription: this.state.metadiscription = content,
    });
  };

  handleKeywordChange = (content: any, editor: any) => {
    console.log("handleKeywordChange Content was updated:", content);
    this.setState({
      metakeyword: this.state.metakeyword = content,
    });
  };

  onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submi
    this.setState({
      images: this.state.images = imageList,
    });
  
    console.log("index of new chosen images: ", addUpdateIndex);
  };
  onError = (errors: any, files: any) => {
    console.log(errors, files);
  };

  validate() {
    let merchantiderror = "";
    let maincategoryiderror = "";
    let productnameerror = "";
    // let productdescriptionerror = "";
    let priceerror = "";
    // let discountpriceerror = "";
    // let metatitleerror = "";
    // let metadiscriptionerror = "";
    // let metakeyworderror = "";
    // let sortordererror = "";

    if (!this.state.merchantid) {
      merchantiderror = "please select merchant";
    }

    if (!this.state.maincategoryid) {
      maincategoryiderror = "please select main category";
    }

    if (!this.state.productname) {
      productnameerror = "please enter product name";
    }

    // if (!this.state.productdescription) {
    //   productdescriptionerror = "please enter product description";
    // }

    if (!this.state.price) {
      priceerror = "please enter price";
    }

    // if (!this.state.discountprice) {
    //   discountpriceerror = "please enter discount price";
    // }

    // if (!this.state.metatitle) {
    //   metatitleerror = "please enter meta title";
    // }

    // if (!this.state.metadiscription) {
    //   metadiscriptionerror = "please enter meta description";
    // }

    // if (!this.state.metakeyword) {
    //   metakeyworderror = "please enter meta keyword";
    // }

    // if (!this.state.sortorder) {
    //   sortordererror = "please enter sort order";
    // }

    if (
      merchantiderror ||
      maincategoryiderror ||
      productnameerror ||
      // productdescriptionerror ||
      priceerror
      // discountpriceerror ||
      // metatitleerror ||
      // metadiscriptionerror ||
      // metakeyworderror ||
      // sortordererror
    ) {
      this.setState({
        merchantiderror,
        maincategoryiderror,
        productnameerror,
        // productdescriptionerror,
        priceerror,
        // discountpriceerror,
        // metatitleerror,
        // metadiscriptionerror,
        // metakeyworderror,
        // sortordererror,
      });
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

  async addProduct() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        merchantiderror: "",
        maincategoryiderror: "",
        subcategoryiderror: "",
        productnameerror: "",
        // productdescriptionerror: "",
        priceerror: "",
        // discountpriceerror: "",
        // metatitleerror: "",
        // metadiscriptionerror: "",
        // metakeyworderror: "",
        // sortordererror: "",
      });
      if (
        this.state.merchantid &&
        this.state.maincategoryid &&
        this.state.productname &&
        this.state.price
        // this.state.discountprice &&
        // this.state.metadiscription &&
        // this.state.metatitle &&
        // this.state.metakeyword &&
        // this.state.sortorder
      ) {

        let formData = new FormData();
        formData.append("MerchantId", this.state.merchantid);
        formData.append("CategoryId", this.state.maincategoryid);
        formData.append("ProductName", this.state.productname);
        formData.append("Price", this.state.price);
        formData.append("ProductDesc", this.state.productdescription);
        formData.append("DiscountPrice", this.state.discountprice);
        formData.append("IsFeatured", new Boolean(this.state.isFeatured).toString());
        formData.append("MetaTitle", this.state.metatitle);
        formData.append("MetaDescription", this.state.metadiscription);
        formData.append("MetaKeyword", this.state.metakeyword);
        formData.append("IsActive", "true");
        formData.append("SortOrder", this.state.sortorder);
        this.state.images.map((image:any,index:number) => (
          formData.append("Images", image)
        ))
        formData.append("UserId", "0");

        const addProduct = await ProductAPI.addProduct(formData);
        console.log("addProduct",addProduct);

        if (addProduct) {
          if (addProduct.status === 200) {
            const msg = addProduct.message;
            utils.showSuccess(msg);
            this.props.history.push("/list-product");
          } else {
            const msg1 = addProduct.message;
            utils.showError(msg1);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async editProduct() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        merchantiderror: "",
        maincategoryiderror: "",
        subcategoryiderror: "",
        productnameerror: "",
        // productdescriptionerror: "",
        priceerror: "",
        // discountpriceerror: "",
        // metatitleerror: "",
        // metadiscriptionerror: "",
        // metakeyworderror: "",
        // sortordererror: "",
      });
      if (
        this.state.merchantid &&
        this.state.maincategoryid &&
        this.state.productname &&
        this.state.price
        // this.state.discountprice &&
        // this.state.metadiscription &&
        // this.state.metatitle &&
        // this.state.metakeyword &&
        // this.state.sortorder
      ) {

        let formData = new FormData();
        formData.append("productId", this.state.productid);
        formData.append("MerchantId", this.state.merchantid);
        formData.append("CategoryId", this.state.maincategoryid);
        formData.append("ProductName", this.state.productname);
        formData.append("Price", this.state.price);
        formData.append("ProductDesc", this.state.productdescription);
        formData.append("DiscountPrice", this.state.discountprice);
        formData.append("IsFeatured", new Boolean(this.state.isFeatured).toString());
        formData.append("MetaTitle", this.state.metatitle);
        formData.append("MetaDescription", this.state.metadiscription);
        formData.append("MetaKeyword", this.state.metakeyword);
        formData.append("IsActive", "true");
        formData.append("SortOrder", this.state.sortorder);
        this.state.images.map((image:any,index:number) => (
          formData.append("Images", image)
        ))
        formData.append("UserId", "0");

        const editProduct = await ProductAPI.editProduct(formData,this.state.productid);
        console.log("editProduct",editProduct);

        if (editProduct) {
          if (editProduct.status === 200) {
            const msg = editProduct.message;
            utils.showSuccess(msg);
            this.props.history.push("/list-product");
          } else {
            const msg1 = editProduct.message;
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
                      {
                        this.state.updateTrue === true ? (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.productPage.title.updateProductTitle}</h1>
                        </Col>
                        ) : (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.productPage.title.addProductTitle}</h1>
                        </Col>
                        )
                      }
                     
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-product">
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
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {constant.productPage.productTableColumn.selectmerchant}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="merchantid"
                              onChange={this.onMerchantSelect}
                              value={this.state.merchantid ? this.state.merchantid : ''}
                            >
                              <option value=""> {constant.productPage.productTableColumn.selectmerchant}</option>
                              {this.state.merchantlist.length > 0
                                ? this.state.merchantlist.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.merchantiderror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                            {constant.productPage.productTableColumn.selectcategory}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="maincategoryid"
                              onChange={this.onMainCategorySelect}
                              value={this.state.maincategoryid ? this.state.maincategoryid : ''}
                            >
                              <option value=""> {constant.productPage.productTableColumn.selectcategory}</option>

                              {this.state.categorylist.length > 0
                                ? this.state.categorylist.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.maincategoryiderror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Product Name"> {constant.productPage.productTableColumn.prodctname}</Label>
                          <Input
                            type="text"
                            id="Product Name"
                            name="productname"
                            className="form-control"
                            value={this.state.productname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your product name"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.productnameerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Product Price"> {constant.productPage.productTableColumn.price}</Label>
                          <Input
                            type="number"
                            id="Product Price"
                            name="price"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your product price"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.priceerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Product Discount">
                          {constant.productPage.productTableColumn.discountPrice}
                          </Label>
                          <Input
                            type="number"
                            id="Product Discount"
                            name="discountprice"
                            className="form-control"
                            value={this.state.discountprice}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your product discount price"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.discountpriceerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="metatitle"> {constant.productPage.productTableColumn.metatitle}</Label>
                          <Input
                            type="text"
                            id="metatitle"
                            name="metatitle"
                            className="form-control"
                            value={this.state.metatitle ? this.state.metatitle : ''}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your meta title"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.metatitleerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="sortorder"> {constant.productPage.productTableColumn.sortOrder}</Label>
                          <Input
                            type="number"
                            id="sortorder"
                            name="sortorder"
                            className="form-control"
                            value={this.state.sortorder ? this.state.sortorder : ''}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your sort order"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.sortordererror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <label>
                          <span> {constant.productPage.productTableColumn.isFeatured}</span>
                          <br />
                          <div style={{ marginTop: "10px" }}>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.isFeatured}
                            />
                          </div>
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <div>
                          <p style={{ fontSize: "16px" }}>
                          {constant.productPage.productTableColumn.productdescription}
                          </p>
                          <input
                            id="my-file"
                            type="file"
                            name="my-file"
                            style={{ display: "none" }}
                          />
                          <Editor
                            initialValue={this.state.productdescription ? this.state.productdescription : "<p>This is the initial content of the editor</p>"}
                            init={{
                              height: 200,
                              menubar: false,
                              images_upload_credentials: true,
                              plugins: [
                                "advlist autolink lists link image code imagetools charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                              ],
                              toolbar:
                                "undo redo | formatselect | bold italic backcolor | image | code | media |\
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
                                    "my-file"
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
                            onEditorChange={this.handleMainChange}
                          />
                        </div>
                        <div className="text-danger">
                          {this.state.productdescriptionerror}
                        </div>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Meta Description">
                          {constant.productPage.productTableColumn.metadescritption}
                          </Label>
                          <Input
                            type="textarea"
                            id="Meta Description"
                            rows={8}
                            name="metadiscription"
                            className="form-control"
                            value={this.state.metadiscription ? this.state.metadiscription: ''}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your meta discription"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.metadiscriptionerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Meta keyword"> {constant.productPage.productTableColumn.metakeyword}</Label>
                          <Input
                            type="textarea"
                            id="Meta keyword"
                            rows={8}
                            name="metakeyword"
                            className="form-control"
                            value={this.state.metakeyword ? this.state.metakeyword : ''}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your meta keyword"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.metakeyworderror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                      <form>
                        <input
                          className="upload"
                          type="file"
                          accept="image/*"
                          onChange={this._handleImageChange}
                          multiple
                        />
                      </form>
                      </Col>
                    </Row>
                    <Row className="mt-5">
                      {
                        this.state.updateTrue === true ? (
                          <div className="image_margin">
                          {this.state.images.map((img:any,index:any) => (
                            img.imagePath !== null ? (
                              <img
                                key={index}
                                className="picture"
                                alt="previewImg"
                                src={constant.apiMerchantUrl + img.imagePath}
                              />
                            ) : (
                              ''
                            )
                          ))}
                        </div>
                        ) : (
                          <div className="image_margin">
                          {this.state.imagesPreviewUrls.map((imagePreviewUrl) => {
                            return (
                              <img
                                key={imagePreviewUrl}
                                className="picture"
                                alt="previewImg"
                                src={imagePreviewUrl}
                              />
                            );
                          })}
                        </div>
                        )
                      }
                  
                    </Row>
                    {/* <Row>
                      <ImageUploading
                        value={this.state.images}
                        onChange={this.onChange}
                        maxNumber={maxNumber}
                        multiple
                        maxFileSize={maxMbFileSize}
                        acceptType={["jpg", "gif", "png"]}
                        onError={this.onError}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                        }):any=> (
                          // write your building UI
                          <div>
                            <button onClick={onImageUpload}>
                              Upload images
                            </button>
                            <button onClick={onImageRemoveAll}>
                              Remove all images
                            </button>

                            {imageList.map((image:any, index:any) => (
                              <div key={index}>
                                <img src={image.data_url} />
                                <button onClick={() => this.onImageUpdate(index)}>
                                  Update
                                </button>
                                <button onClick={() => onImageRemove(index)}>
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </ImageUploading>
                    </Row> */}
                    {
                      this.state.updateTrue === true ? (
                        <Button
                      type="button"
                      size="sm"
                      color="primary"
                      className="mb-2 mt-3 mr-2 custom-button"
                      onClick={this.editProduct}
                    >
                      {constant.button.update}
                    </Button>
                      ) : (
                        <Button
                      type="button"
                      size="sm"
                      color="primary"
                      className="mb-2 mt-3 mr-2 custom-button"
                      onClick={this.addProduct}
                    >
                       {constant.button.Save}
                    </Button>
                      )
                    }
                    
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

export default AddProduct;
