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
import {
  StatusAPI,
  ProductAPI, DeleteAPI
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest, deleteByIdRequest, productStateRequest, allStateRequest , deleteAllDataRequest} from "../../../modelController";
import checkRights from "../../../rights";

class ListProduct extends React.Component<{ history: any }> {

  /** Product state */
  productState:productStateRequest = constant.productPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.productState.count,
    currentPage: this.productState.currentPage,
    items_per_page: this.productState.items_per_page,
    upperPageBound: this.productState.upperPageBound,
    lowerPageBound: this.productState.lowerPageBound,
    pageBound: this.productState.pageBound,
    onItemSelect: this.productState.onItemSelect,
    productdata: this.productState.productdata,
    switchSort: this.productState.switchSort,
    isStatus: this.productState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.editProduct = this.editProduct.bind(this);
    // this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteAllData = this.deleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
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
  }

  /** Page render call */
  async componentDidMount() {
    document.title =
      constant.productPage.title.productTitle + utils.getAppName();
    utils.dataTable();
    this.getProductData();
  }

  /**
   * 
   * @param searchText : search value
   * @param page : page
   * @param size : per page value
   */
  async getProductData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getProductData = await ProductAPI.getProductData(obj);
    // console.log("getProductData", getProductData);

    if (getProductData) {
      if(getProductData.status === 200) {
      this.setState({
        productdata: this.state.productdata =
          getProductData.resultObject.data,
        count: this.state.count = getProductData.resultObject.totalcount,
      });
    } else {
      const msg1 = getProductData.message;
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

  /** Butoon previous */
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
   * @param id : product id
   */
  editProduct(id: any) {
    this.props.history.push("/edit-product/" + id);
  }

  /**
   * 
   * @param id : product id
   */
  viewProduct(id: any) {
    this.props.history.push("/view-product/" + id);
  }

  // async deleteProduct(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.productId,
  //     };
  //     var deleteProduct = await ProductAPI.deleteProduct(obj);
  //     // console.log("deleteProduct", deleteProduct);
  //     if (deleteProduct) {
  //       this.getProductData(
  //         "",
  //         parseInt(this.state.currentPage),
  //         parseInt(this.state.items_per_page)
  //       );
  //     } else {
  //       const msg1 = "Internal server error";
  //       utils.showError(msg1);
  //     }
  //   }
  // }

  /**
   * 
   * @param text : text
   * @param btext : button message
   */
  async deleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "Product",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllMerchantData(obj);
      // console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        if (deleteAllData.data.status === 200) {
          const msg1 = deleteAllData.data.message;
          utils.showSuccess(msg1);
        this.getProductData(
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
   * @param event : record per page
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page:
        event.target.options[event.target.selectedIndex].value,
    });

    this.getProductData(
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
    const obj:getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

  
    this.getProductData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : search data value
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getProductData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting table list
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.productdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      productdata: this.state.productdata = copyTableData,
    });
  }

  /**
   * 
   * @param data : data
   * @param text : message
   * @param btext : button messge
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "Product",
        id: data.productId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getMerchantPanelStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getProductData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
      } else {
        const msg1 = getStatusChange.message;
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
   * @param item : item
   * @param e : event
   */
  handleChange(item: any, e: any) {
    let _id = item.productId;
    let ind: any = this.state.productdata.findIndex(
      (x: any) => x.productId === _id
    );
    let data: any = this.state.productdata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        productdata: this.state.productdata = data,
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
        newarray.push(res.productId);
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
   * @param e : event
   */
  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.productdata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      productdata: this.state.productdata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.productdata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.productId);
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

  /** Get Table List */
  getTable(coupondata: any) {
    return (
      <div className="userClass">
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("productName")}>
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
            <th>{constant.productPage.productTableColumn.prodctname}</th>
            <th>{constant.productPage.productTableColumn.price}</th>
            <th>{constant.productPage.productTableColumn.discountPrice}</th>
            {checkRights.checkEditRights("Product") === true ? (
              <th style={{ textAlign: "center" }}>
                {constant.tableAction.status}
              </th>
            ) : (
              ""
            )}
            {checkRights.checkViewRights("Product") === true ||
            checkRights.checkEditRights("Product") === true ? (
              <th className="action">{constant.tableAction.action}</th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.productdata.length > 0 ? (
            <>
              {this.state.productdata.map((data: any, index: any) => (
                <tr key={index}>
                   <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.productId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.productdata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                  <td>{data.productName}</td>
                  <td>{data.price}</td>
                  <td>{data.discountPrice}</td>
                  {checkRights.checkEditRights("Product") === true ? (
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Inactive product",
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
                            "You should be Active product",
                            "Yes, Active it"
                          )
                        }
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  ) : ('') }
                  {checkRights.checkViewRights("Product") === true ||
                  checkRights.checkEditRights("Product") === true ? (
                    <td className="action">
                      <span className="padding">
                        {checkRights.checkViewRights("Product") === true ? (
                         <i
                         className="fa fa-eye"
                         onClick={() => this.viewProduct(data.productId)}
                       ></i>
                        ) : (
                          ""
                        )}
                        {checkRights.checkEditRights("Product") === true ? (
                         <i
                         className="fas fa-edit"
                         onClick={() => this.editProduct(data.productId)}
                       ></i>
                        ) : (
                          ""
                        )}
                      </span>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
      </div>
    );
  }

  /**
   * 
   * @param pageDecrementBtn : page decrement
   * @param renderPageNumbers : page number
   * @param pageIncrementBtn : page increment
   */
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
          className="r-per-page"
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
                          {constant.productPage.title.productTitle}
                        </CardTitle>
                      </Col>
                      {checkRights.checkAddRights("Product") === true ? (
                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                    <div className="right">
                      <Link to="/product">
                        <Button
                          className="mb-2 mr-2 custom-button"
                          color="primary"
                        >
                          {constant.button.add}
                        </Button>
                      </Link>
                    </div>
                  </Col>
                    ) : (
                      ""
                    )}
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
                    {this.state.deleteFlag === true &&  checkRights.checkDeleteRights("Product") === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.deleteAllData("You should be Delete Product",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.productdata.length > 0 ? (
                      <>{this.getTable(this.state.productdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                       
                    {this.state.productdata.length > 0
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

export default ListProduct;
