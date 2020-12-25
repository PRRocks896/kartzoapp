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
  MerchantAPI,
  DeleteAPI,
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import {
  getAllTableDataListRequest,
  statusChangeRequest,
  deleteByIdRequest,
  allStateRequest,
  merchantStateRequest,
  deleteAllDataRequest,
} from "../../../modelController";
import checkRights from "../../../rights";
import StarRatingComponent from "react-star-rating-component";

class ListMerchantReview extends React.Component<{ history: any }> {
  /** Merchant state */
  merchantState: merchantStateRequest = constant.merchantPage.state;
  userState: allStateRequest = constant.userPage.state;
  state = {
    count: this.merchantState.count,
    currentPage: this.merchantState.currentPage,
    items_per_page: this.merchantState.items_per_page,
    upperPageBound: this.merchantState.upperPageBound,
    lowerPageBound: this.merchantState.lowerPageBound,
    pageBound: this.merchantState.pageBound,
    onItemSelect: this.merchantState.onItemSelect,
    merchantreviewdata: this.merchantState.merchantreviewdata,
    switchSort: this.merchantState.switchSort,
    isStatus: this.merchantState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.editMerchant = this.editMerchant.bind(this);
    // this.deleteMerchant = this.deleteMerchant.bind(this);
    // this.deleteAllData = this.deleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewMerchantReview = this.viewMerchantReview.bind(this);
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
    this.getMerchantReviewData = this.getMerchantReviewData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
  }

  /** Page Render call */
  async componentDidMount() {
    document.title =
      constant.merchantPage.title.merchantReviewTitle + utils.getAppName();
    utils.dataTable();
    this.getMerchantReviewData();
  }

  /**
   *
   * @param searchText : search value
   * @param page : page
   * @param size : per page value
   */
  async getMerchantReviewData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj: getAllTableDataListRequest = {
      searchText: searchText,
      isActive: true,
      page: page,
      size: size,
    };

    var getMerchantReviewData = await MerchantAPI.getMerchantReviewData(obj);
    // console.log("getMerchantReviewData", getMerchantReviewData);

    if (getMerchantReviewData) {
      if (getMerchantReviewData.status === 200) {
        this.setState({
          merchantreviewdata: (this.state.merchantreviewdata =
            getMerchantReviewData.resultObject.data),
          count: (this.state.count =
            getMerchantReviewData.resultObject.totalcount),
        });
      } else {
        const msg1 = getMerchantReviewData.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** Button Next */
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
   * @param id : edit merchant id
   */
  editMerchant(id: any) {
    this.props.history.push("/edit-merchant/" + id);
  }

  /**
   *
   * @param id : view merchant id
   */
  viewMerchantReview(id: any) {
    this.props.history.push("/view-merchant-review/" + id);
  }

  // async deleteMerchant(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.merchantID,
  //     };
  //     var deleteMerchant = await MerchantAPI.deleteMerchant(obj);
  //     // console.log("deleteMerchant", deleteMerchant);
  //     if (deleteMerchant) {
  //       this.getMerchantReviewData(
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
  //   async deleteAllData(text: string, btext: string) {
  //     if (await utils.alertMessage(text, btext)) {
  //       const obj: deleteAllDataRequest = {
  //         moduleName: "Merchant",
  //         id: this.state.deleteuserdata,
  //       };
  //       var deleteAllData = await DeleteAPI.deleteAllMerchantreviewData(obj);
  //       // console.log("deleteAllData", deleteAllData);
  //       if (deleteAllData) {
  //         if (deleteAllData.data.status === 200) {
  //           const msg1 = deleteAllData.data.message;
  //           utils.showSuccess(msg1);
  //           this.getMerchantReviewData(
  //             "",
  //             parseInt(this.state.currentPage),
  //             parseInt(this.state.items_per_page)
  //           );
  //           this.setState({
  //             deleteFlag: (this.state.deleteFlag = false),
  //           });
  //         } else {
  //           const msg1 = deleteAllData.data.message;
  //           utils.showError(msg1);
  //         }
  //       } else {
  //         // const msg1 = "Internal server error";
  //         // utils.showError(msg1);
  //       }
  //     }
  //   }

  /**
   *
   * @param event : record per page
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: (this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value),
    });

    this.getMerchantReviewData(
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
      currentPage: (this.state.currentPage = event.target.id),
    });
    const obj: getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    this.getMerchantReviewData(obj.searchText, obj.page, obj.size);
  }

  /**
   *
   * @param e : search merchant value
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj: getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getMerchantReviewData(obj.searchText, obj.page, obj.size);
  }

  /**
   *
   * @param key : sorting table
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.merchantreviewdata];
    copyTableData.sort(utils.compareByDesc(key, this.state.switchSort));
    this.setState({
      merchantreviewdata: (this.state.merchantreviewdata = copyTableData),
    });
  }

  /**
   *
   * @param data : data
   * @param text : message
   * @param btext : button message
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: statusChangeRequest = {
        moduleName: "Merchant",
        id: data.merchantID,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getMerchantPanelStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
          this.getMerchantReviewData(
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
    let _id = item.merchantReviewID;
    let ind: any = this.state.merchantreviewdata.findIndex(
      (x: any) => x.merchantReviewID === _id
    );
    let data: any = this.state.merchantreviewdata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        merchantreviewdata: (this.state.merchantreviewdata = data),
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
        newarray.push(res.merchantReviewID);
      }
    });
    this.setState({
      deleteuserdata: (this.state.deleteuserdata = newarray),
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: (this.state.deleteFlag = true),
      });
    } else {
      this.setState({
        deleteFlag: (this.state.deleteFlag = false),
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
    this.state.merchantreviewdata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      merchantreviewdata: this.state.merchantreviewdata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.merchantreviewdata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.merchantReviewID);
      }
    });
    this.setState({
      deleteuserdata: (this.state.deleteuserdata = newmainarray),
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: (this.state.deleteFlag = true),
      });
    } else {
      this.setState({
        deleteFlag: (this.state.deleteFlag = false),
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

  /** table list data */
  getTable(coupondata: any) {
    return (
      <div className="userClass">
        <table
          id="dtBasicExample"
          className="table table-striped table-bordered table_responsive table-sm sortable"
          width="100%"
        >
          <thead>
            <tr onClick={() => this.handleSort("merchantName")}>
              {/* <th className="centers">
                <CustomInput
                  name="name"
                  defaultValue="value"
                  type="checkbox"
                  id="exampleCustomCheckbox"
                  onChange={this.handleMainChange}
                  checked={this.state._maincheck}
                />
              </th> */}
              <th>{constant.merchantPage.merchantTableColumn.merchantname}</th>
              <th>{constant.merchantPage.merchantTableColumn.customername}</th>
              <th>{constant.merchantPage.merchantTableColumn.rating}</th>
              <th>{constant.merchantPage.merchantTableColumn.ratingdetails}</th>
              <th className="action">{constant.tableAction.action}</th>
              {/* {checkRights.checkEditRights("Merchant") === true ? (
            ) : (
              ""
            )}
            {checkRights.checkViewRights("Merchant") === true ||
            checkRights.checkEditRights("Merchant") === true ? (
            ) : (
              ""
            )} */}
            </tr>
          </thead>
          <tbody>
            {this.state.merchantreviewdata.length > 0 ? (
              <>
                {this.state.merchantreviewdata.map((data: any, index: any) => (
                  <tr key={index}>
                    {/* <td className="centers">
                      <CustomInput
                        // name="name"
                        type="checkbox"
                        id={data.merchantID}
                        onChange={(e) => this.handleChange(data, e)}
                        checked={
                          this.state.merchantreviewdata[index][
                            "_rowChecked"
                          ] === true
                        }
                      />
                    </td> */}
                    <td>{data.merchantName}</td>
                    <td>{data.userName}</td>
                    <td>
                      <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={data.rating}
                      />
                    </td>
                    <td>{data.reviewDetail ? data.reviewDetail : "N/A"}</td>

                    {checkRights.checkViewRights("Review") === true ||
                    checkRights.checkEditRights("Review") === true ? (
                      <td className="action">
                        <span>
                          {checkRights.checkViewRights("Review") === true ? (
                            <i
                              className="fa fa-eye"
                              onClick={() =>
                                this.viewMerchantReview(data.merchantReviewID)
                              }
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
                          {constant.merchantPage.title.merchantReviewTitle}
                        </CardTitle>
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
                    {this.state.deleteFlag === true &&
                    checkRights.checkDeleteRights("Review") === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        // onClick={() =>
                        //   this.deleteAllData(
                        //     "You should be Delete Merchant",
                        //     "Yes, Delete it"
                        //   )
                        // }
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.merchantreviewdata.length > 0 ? (
                      <>{this.getTable(this.state.merchantreviewdata)}</>
                    ) : (
                      <h1 className="text-center mt-5">
                        {constant.noDataFound.nodatafound}
                      </h1>
                    )}

                    {this.state.merchantreviewdata.length > 0
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

export default ListMerchantReview;
