import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  Row,
} from "reactstrap";
import { CategoryAPI, DeleteAPI, StatusAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import {
  getAllTableDataListRequest,
  statusChangeRequest,
  allStateRequest,
  categoryStateRequest,deleteAllDataRequest
} from "../../../modelController";

class SubCategory extends React.Component<{ history: any }> {

  /** Subcategory List */
  categoryState:categoryStateRequest = constant.categoryPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.categoryState.count,
    currentPage: this.categoryState.currentPage,
    items_per_page: this.categoryState.items_per_page,
    upperPageBound: this.categoryState.upperPageBound,
    lowerPageBound: this.categoryState.lowerPageBound,
    pageBound: this.categoryState.pageBound,
    onItemSelect: this.categoryState.onItemSelect,
    categorydata: this.categoryState.categorydata,
    switchSort: this.categoryState.switchSort,
    isStatus: this.categoryState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.editCategory = this.editCategory.bind(this);
    // this.deleteCategory = this.deleteCategory.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewCategory = this.viewCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
    this.delleteAllData = this.delleteAllData.bind(this);
  }

  /** Page Render */
  async componentDidMount() {
    document.title =
      constant.categoryPage.title.subcategoryTitle + utils.getAppName();
    utils.dataTable();
    this.getSubCategory();
  }

  /** Get Sub category */
  async getSubCategory(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj: getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getSubCategory = await CategoryAPI.getSubCategory(obj);
    // console.log("getSubCategory", getSubCategory);

    if (getSubCategory) {
      if(getSubCategory.status === 200) {
      this.setState({
        categorydata: this.state.categorydata = getSubCategory.resultObject.data,
        count: this.state.count = getSubCategory.resultObject.totalcount,
      });
    } else {
      const msg1 = getSubCategory.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** Button next */
  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
  }

  /** Button previous */
  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
  }

  /**
   * 
   * @param id : edit category
   */
  editCategory(id: any) {
    this.props.history.push("/editsubcategory/" + id);
  }

  /**
   * 
   * @param id : view category
   */
  viewCategory(id: any) {
    this.props.history.push("/viewsubcategory/" + id);
  }

  // async deleteCategory(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.categoryId,
  //     };
  //     var deleteCategory = await CategoryAPI.deleteCategory(obj);
  //     // console.log("deleteCategory", deleteCategory);
  //     if (deleteCategory) {
  //       this.getSubCategory(
  //         "",
  //         parseInt(this.state.currentPage),
  //         parseInt(this.state.items_per_page)
  //       );
  //     } else {
  //       const msg1 = "Internal server error";
  //     utils.showError(msg1);
  //     }
  //   }
  // }

  /**
   * 
   * @param text : message
   * @param btext : button message
   */
  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "Category",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllData(obj);
      // console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        if (deleteAllData.data.status === 200) {
          const msg1 = deleteAllData.data.message;
          utils.showSuccess(msg1);
        this.getSubCategory(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
        this.setState({
          deleteFlag:this.state.deleteFlag = false
        })
      } else {
        const msg1 = deleteAllData.data.message;
        utils.showError(msg1);
      }
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

  /**
   * 
   * @param event : record per page value
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getSubCategory(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  /**
   * 
   * @param event : click on next page
   */
  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj: getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

  
    this.getSubCategory(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : search sub category data
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj: getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getSubCategory(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting table
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.categorydata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      categorydata: this.state.categorydata = copyTableData,
    });
  }

  /**
   * 
   * @param data : status change data
   * @param text : message
   * @param btext : button message
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: statusChangeRequest = {
        moduleName: "Category",
        id: data.categoryId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getSubCategory(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
      } else {
        const msg1 = getStatusChange.message;
        utils.showError(msg1);
      }
      } else {
      //   const msg1 = "Internal server error";
      // utils.showError(msg1);
      }
    }
  }

  /**
   * 
   * @param item : item
   * @param e : event
   */
  handleChange(item: any, e: any) {
    let _id = item.categoryId;
    let ind: any = this.state.categorydata.findIndex(
      (x: any) => x.categoryId === _id
    );
    let data: any = this.state.categorydata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        categorydata: this.state.categorydata = data,
      });
    }
    if (
      data.filter((res: any, index: number) => res._rowChecked === true)
        .length === data.length
    ) {
      this.setState({
        _maincheck: true,
      });
    } else {
      this.setState({
        _maincheck: false,
      });
    }
    let newarray: any = [];
    data.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newarray.push(res.categoryId);
      }
    });
    this.setState({
      deleteuserdata: this.state.deleteuserdata = newarray,
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: this.state.deleteFlag = true,
      });
    } else {
      this.setState({
        deleteFlag: this.state.deleteFlag = false,
      });
    }
    // console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  /**
   * 
   * @param e : main check box event
   */
  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.categorydata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      categorydata: this.state.categorydata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.categorydata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.categoryId);
      }
    });
    this.setState({
      deleteuserdata: this.state.deleteuserdata = newmainarray,
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: this.state.deleteFlag = true,
      });
    } else {
      this.setState({
        deleteFlag: this.state.deleteFlag = false,
      });
    }
    // console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  /**
   * 
   * @param pageNumbers : page number
   */
  pagination(pageNumbers: any) {
    var res = pageNumbers.map((number: any) => {
      if (number === 1 && parseInt(this.state.currentPage) === 1) {
        return (
          <li
            key={number}
            id={number}
            className={
              parseInt(this.state.currentPage) === number
                ? "active"
                : "page-item"
            }
          >
            <a className="page-link" onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      } else if (
        number < this.state.upperPageBound + 1 &&
        number > this.state.lowerPageBound
      ) {
        return (
          <li
            key={number}
            id={number}
            className={
              parseInt(this.state.currentPage) === number
                ? "active"
                : "page-item"
            }
          >
            <a className="page-link" id={number} onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      }
    });
    return res;
  }

  /**
   * 
   * @param categorydata : Table List
   */
  getTable(categorydata: any) {
    return (
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("category")}>
            <th className="centers">
              <CustomInput
                name="name"
                defaultValue="value"
                type="checkbox"
                id="exampleCustomCheckbox"
                onChange={this.handleMainChange}
                checked={this.state._maincheck}
              />
            </th>
            <th>{constant.categoryPage.caetgoryTableColumn.subCategoryName}</th>
            <th>{constant.categoryPage.caetgoryTableColumn.categoryName}</th>
            <th>{constant.categoryPage.caetgoryTableColumn.image}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.categorydata.length > 0 ? (
            <>
              {this.state.categorydata.map((data: any, index: any) => (
                  data.parentCategoryId !== 0 ? (
                    <tr key={index}>
                    <td className="centers">
                      <CustomInput
                        // name="name"
                        type="checkbox"
                        id={data.categoryId}
                        onChange={(e) => this.handleChange(data, e)}
                        checked={
                          this.state.categorydata[index]["_rowChecked"] === true
                        }
                      />
                    </td>
                    {data.parentCategory ? (
                      <td>{data.category}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                    <td>{data.parentCategory}</td>
  
  
                    <td>
                      {data.imagePath != null ? (
                        <div className="img-size">
                          {data.imagePath ? (
                            <div>
                              <img
                                className="table-picture"
                                src={constant.filepath + data.imagePath}
                              />
                              {/* <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i> */}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div>
                          <i className="fa fa-user picture"></i>
                          {/* <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i> */}
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {data.isActive === true ? (
                        <button
                          className="status_active_color"
                          onClick={() =>
                            this.statusChange(
                              data,
                              "You should be Inactive subcategory",
                              "Yes, Inactive it"
                            )
                          }
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="status_Inactive_color"
                          onClick={() =>
                            this.statusChange(
                              data,
                              "You should be Active subcategory",
                              "Yes, Active it"
                            )
                          }
                        >
                          Inactive
                        </button>
                      )}
                    </td>
                    <td className="action">
                      <span className="padding">
                        <i
                          className="fa fa-eye"
                          onClick={() => this.viewCategory(data.categoryId)}
                        ></i>
                        <i
                          className="fas fa-edit"
                          onClick={() => this.editCategory(data.categoryId)}
                        ></i>
                        {/* <i
                          className="fa fa-trash"
                          onClick={() =>
                            this.deleteCategory(
                              data,
                              "You should be Delete Category",
                              "Yes, Category it"
                            )
                          }
                        ></i> */}
                      </span>
                    </td>
                  </tr>
                  ) : ('')
              
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
    );
  }

  /** Get Page Data */
  getPageData(
    pageDecrementBtn: any,
    renderPageNumbers: any,
    pageIncrementBtn: any
  ) {
    return (
      <div className="filter">
        <CustomInput
          type="select"
          id="item"
          className="custom_text_width"
          name="customSelect"
          onChange={this.onItemSelect}
        >
          <option value="10">{constant.recordPerPage.recordperPage}</option>
          <option value={constant.recordPerPage.fifteen}>
            {constant.recordPerPage.fifteen}
          </option>
          <option value={constant.recordPerPage.twenty}>
            {constant.recordPerPage.twenty}
          </option>
          <option value={constant.recordPerPage.thirty}>
            {constant.recordPerPage.thirty}
          </option>
          <option value={constant.recordPerPage.fifty}>
            {constant.recordPerPage.fifty}
          </option>
        </CustomInput>
        <div>
          <ul className="pagination" id="page-numbers">
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
          </ul>
        </div>
      </div>
    );
  }

  /** Render DOM */
  render() {
    var pageNumbers = utils.pageNumber(
      this.state.count,
      this.state.items_per_page
    );
    var renderPageNumbers = this.pagination(pageNumbers);

    let pageIncrementBtn = null;
    if (pageNumbers.length > this.state.upperPageBound) {
      pageIncrementBtn = (
        <li className="page-item">
          <a className="page-link" onClick={this.btnIncrementClick}>
            &hellip;
          </a>
        </li>
      );
    }

    let pageDecrementBtn = null;
    if (this.state.lowerPageBound >= 1) {
      pageDecrementBtn = (
        <li className="page-item">
          <a className="page-link" onClick={this.btnDecrementClick}>
            &hellip;
          </a>
        </li>
      );
    }

    return (
      <>
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">
                          {constant.categoryPage.title.subcategoryTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/addsubcategory">
                            <Button
                              className="mb-2 mr-2 custom-button"
                              color="primary"
                            >
                              {constant.button.add}
                            </Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="search_right">
                      <input
                        className="form-control custom_text_width search"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyUp={this.searchApplicationDataKeyUp}
                      />
                    </div>
                    {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData( "You should be Delete Sub Category",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.categorydata.length > 0 ? (
                      <>{this.getTable(this.state.categorydata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                  
                    {this.state.categorydata.length > 0
                      ? this.getPageData(
                          pageIncrementBtn,
                          renderPageNumbers,
                          pageDecrementBtn
                        )
                      : ""}
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

export default SubCategory;
