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
  Row,
} from "reactstrap";
import { CategoryAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getDataByIdRequest, addCategoryStateRequest } from "../../../modelController";

class AddCategory extends React.Component<{ history: any; location: any }> {

  /** Category State */
  categoryState: addCategoryStateRequest = constant.categoryPage.state;
  state = {
    selectedFile: this.categoryState.selectedFile,
    file: this.categoryState.file,
    categoryname: this.categoryState.categoryname,
    categorynameerror: this.categoryState.categorynameerror,
    selectedFileerror: this.categoryState.selectedFileerror,
    sortorder: this.categoryState.sortorder,
    sortordererror: this.categoryState.sortordererror,
    updateTrue: this.categoryState.updateTrue,
    filetrue: this.categoryState.filetrue,
    categoryid: this.categoryState.categoryid,
    categorylist: this.categoryState.categorylist,
    selectcategory: this.categoryState.selectcategory,
    selectcategoryerror: this.categoryState.selectcategoryerror,
    parentCategory: this.categoryState.parentCategory,
    parentCategoryId: this.categoryState.parentCategoryId,
    isActive: this.categoryState.isActive,
    s1:this.categoryState.s1
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getAllCategory = this.getAllCategory.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
  }

  /** Page Render Call */
  async componentDidMount() {
    this.getAllCategory();
    const categoryId = this.props.location.pathname.split("/")[2];
    if (categoryId !== undefined) {
      this.getCategoryById(categoryId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.categoryPage.title.updateCategoryTitle + utils.getAppName();
    } else {
      document.title =
        constant.categoryPage.title.addCategoryTitle + utils.getAppName();
    }
  }

  /** Get All Category */
  async getAllCategory() {
    const getAllCategory = await CategoryAPI.getAllCategory();
    // console.log("getAllCategory", getAllCategory);
    if (getAllCategory) {
      if(getAllCategory.status === 200) {
    this.setState({
      categorylist: this.state.categorylist = getAllCategory.resultObject,
    });
  } else {
    const msg1 = getAllCategory.message;
    utils.showError(msg1);
  }
  } else {
  //   const msg1 = "Internal server error";
  // utils.showError(msg1);
  }
  }

  /**
   * 
   * @param categoryId : category id
   */
  async getCategoryById(categoryId: any) {
    const obj: getDataByIdRequest = {
      id: categoryId
    };
    const getCategoryById: any = await CategoryAPI.getCategoryById(obj);
    // console.log("getCategoryById", getCategoryById);

    if(getCategoryById) {
      if (getCategoryById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          filetrue: this.state.filetrue = true,
          categoryname: this.state.categoryname =
            getCategoryById.resultObject.category,
          categoryid: this.state.categoryid =
            getCategoryById.resultObject.categoryId,
          file: this.state.file = getCategoryById.resultObject.imagePath,
          sortorder: this.state.sortorder =
            getCategoryById.resultObject.sortOrder,
          parentCategory: this.state.parentCategory =
            getCategoryById.resultObject.parentCategory,
          // selectcategory: this.state.selectcategory = getCategoryById.resultObject.parentCategoryId !== null ? getCategoryById.resultObject.parentCategoryId : '' ,
        
          isActive: this.state.isActive = getCategoryById.resultObject.isActive,
          s1:this.state.s1 = getCategoryById.resultObject.image
        });
      } else {
        const msg1 = getCategoryById.message;
        utils.showError(msg1);
    }
    }
  }

  /**
   * 
   * @param event : category select
   */
  onItemSelect(event: any) {
    this.setState({
      selectcategory:
        event.target.value,
    });
  }

  /**
   * 
   * @param event : File upload event
   */
  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: false,
        selectedFile: event.target.files,
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
        selectedFile: event.target.files,
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

  /** Check Validate or not */
  validate() {
    let categorynameerror = "";

    if (!this.state.categoryname) {
      categorynameerror = "please enter category name";
    }


    if (categorynameerror) {
      this.setState({ categorynameerror});
      return false;
    }
    return true;
  }

  /**
   * 
   * @param event : update state value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Add Category */
  async addCategory() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        categorynameerror: ""
      });
      if (this.state.categoryname) {
        let formData = new FormData();

        formData.append("category", this.state.categoryname);
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("parentCategoryId", this.state.selectcategory.toString());
        // formData.append("sortOrder", this.state.sortorder.toString());
        formData.append("files", this.state.selectedFile ? this.state.selectedFile[0] : 'null');

        const addCategory = await CategoryAPI.addCategory(formData);
        // console.log("addCategory", addCategory);
        if (addCategory) {
          if(addCategory.status === 200) {
            const msg1 = addCategory.message;
            utils.showSuccess(msg1);
          this.props.history.push("/category");
        } else {
          const msg1 = addCategory.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Update Category */
  async updateCategory() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        categorynameerror: "",
      
        sortordererror:""
      });
      if (this.state.categoryname) {
        let formData = new FormData();
        formData.append("categoryId", this.state.categoryid.toString());
        formData.append("category", this.state.categoryname);
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("parentCategoryId", this.state.selectcategory.toString());
        // formData.append("sortOrder", this.state.sortorder.toString());
        if(this.state.selectedFile) {
          formData.append("files", this.state.selectedFile ? this.state.selectedFile[0] : '');
        } else {
          if(this.state.file === '') {
            formData.append("imagePath", this.state.s1 ? this.state.s1 : '');
          }
        }
        const editCategory = await CategoryAPI.editCategory(
          formData,
          this.state.categoryid.toString()
        );
        // console.log("editCategory", editCategory);
        if (editCategory) {
          if(editCategory.status === 200) {
            const msg1 = editCategory.message;
            utils.showSuccess(msg1);
          this.props.history.push("/category");
        } else {
          const msg1 = editCategory.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Remove Icon */
  removeIcon() {
    this.setState({
      file: this.state.file = "",
      selectedFile: this.state.selectedFile = ""
    });
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.categoryPage.title.updateCategoryTitle}</h1>
                        </Col>
                      ) : (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1>{constant.categoryPage.title.addCategoryTitle}</h1>
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
                        <Link to="/category">
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
                          <Label htmlFor="category_name">
                            {
                              constant.categoryPage.caetgoryTableColumn
                                .categoryName
                            }
                          </Label>
                          <Input
                            type="text"
                            id="category_name"
                            name="categoryname"
                            className="form-control"
                            value={this.state.categoryname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your category name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.categorynameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {constant.categoryPage.caetgoryTableColumn.selectparentcategory}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                              value={this.state.selectcategory ? this.state.selectcategory : ''}
                            >
                              <option value="">
                                {constant.categoryPage.caetgoryTableColumn.selectparentcategory}
                              </option>
                              {this.state.categorylist.length > 0
                                ? this.state.categorylist.map(
                                  (data: any, index: any) => (
                                    <option
                                      key={index}
                                      value={data.value}
                                    >
                                      {data.name}
                                    </option>
                                  )
                                )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.selectcategoryerror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">{constant.categoryPage.caetgoryTableColumn.sortorder}</Label>
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
                           <div className="mb-4 text-danger">
                              {this.state.sortordererror}
                            </div>
                        </FormGroup>
                      </Col>
                    </Row> */}
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
                                <p style={{ fontSize: "16px" }}>{constant.categoryPage.caetgoryTableColumn.image}</p>
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
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateCategory}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                        <Button
                          type="button"
                          size="sm"
                          color="primary"
                          className="mb-2 mr-2 custom-button"
                          onClick={this.addCategory}
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

export default AddCategory;
