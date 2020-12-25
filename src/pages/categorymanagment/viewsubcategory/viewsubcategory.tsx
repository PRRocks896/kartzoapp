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

import {CategoryAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { addCategoryStateRequest, getDataByIdRequest } from "../../../modelController";

class ViewSubCategory extends React.Component<{ history: any; location: any }> {
  categoryState:addCategoryStateRequest = constant.categoryPage.state;
  state = {
    categoryname: this.categoryState.categoryname,
    file: this.categoryState.file,
    sortorder: this.categoryState.sortorder,
    parentCategory: this.categoryState.parentCategory,
  };

  constructor(props: any) {
    super(props);
    this.getCategory = this.getCategory.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.categoryPage.title.viewCategoryTitle + utils.getAppName();

    const categoryId = this.props.location.pathname.split("/")[2];
    if (categoryId !== undefined) {
     this.getCategory(categoryId)
    }
  }

  async getCategory(categoryId:any){
    const obj:getDataByIdRequest = {
      id: categoryId,
    };
    const getCategoryById: any = await CategoryAPI.getCategoryById(obj);
    // console.log("getCategoryById", getCategoryById);
    if (getCategoryById) {
      if (getCategoryById.status === 200) {
      this.setState({
        categoryname: this.state.categoryname =
          getCategoryById.resultObject.parentCategory,
        sortorder: this.state.sortorder =
          getCategoryById.resultObject.sortOrder,
        file: this.state.file = getCategoryById.resultObject.imagePath,
        parentCategory: this.state.parentCategory = getCategoryById
          .resultObject.parentCategory
          ? getCategoryById.resultObject.category
          : "",
      });
    } else {
      const msg1 = getCategoryById.message;
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
    <h1>{constant.categoryPage.viewcategorydetail.viewsubcategory}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                       className="search_right"
                      >
                        <Link to="/subcategory">
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
                        <FormGroup className="view_user">
                          <div>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.categoryPage.caetgoryTableColumn
                                  .categoryName
                              } :
                            </b>
                          </Label>
                          <span>{this.state.categoryname}</span>
                          </div>
                          <div>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.categoryPage.caetgoryTableColumn
                                  .subCategoryName
                              } :
                            </b>
                          </Label>
                          {this.state.parentCategory === "" ? (
                            <span>N/A</span>
                          ) : (
                            <span>{this.state.parentCategory}</span>
                          )}
                          </div>
                         
                         {/* <div>
                          <Label htmlFor="category_name">
                          <b>{constant.categoryPage.caetgoryTableColumn.sortorder} :</b>
                          </Label>
                          <span>{this.state.sortorder}</span>
                         </div> */}
                        </FormGroup>
                       
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                          <b>{constant.categoryPage.caetgoryTableColumn.image} :</b>
                          </p>
                          {this.state.file != "" ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  <img
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

export default ViewSubCategory;
