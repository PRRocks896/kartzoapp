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
  FeeAPI,DeleteAPI
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest, deleteByIdRequest, feeStateRequest, allStateRequest, deleteAllDataRequest } from "../../../modelController";
import checkRights from "../../../rights";

class ListFee extends React.Component<{ history: any }> {

  /** Fee State */
  feeState:feeStateRequest = constant.feePage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.feeState.count,
    currentPage: this.feeState.currentPage,
    items_per_page: this.feeState.items_per_page,
    upperPageBound: this.feeState.upperPageBound,
    lowerPageBound: this.feeState.lowerPageBound,
    pageBound: this.feeState.pageBound,
    onItemSelect: this.feeState.onItemSelect,
    feedata: this.feeState.feedata,
    switchSort: this.feeState.switchSort,
    isStatus: this.feeState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.editFee = this.editFee.bind(this);
    // this.deleteFee = this.deleteFee.bind(this);
    this.delleteAllData = this.delleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewFee = this.viewFee.bind(this);
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

  /** Page Render call */
  async componentDidMount() {
    document.title =
      constant.feePage.title.feeTitle + utils.getAppName();
    utils.dataTable();
    this.getFeeData();
  }

  /** get fee data */
  async getFeeData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getFeeData = await FeeAPI.getFeeData(obj);
    // console.log("getFeeData", getFeeData);

    if (getFeeData) {
      if(getFeeData.status === 200) {
        this.setState({
          feedata: this.state.feedata =
            getFeeData.resultObject.data,
          count: this.state.count = getFeeData.resultObject.totalcount,
        });
      } else {
        const msg1 = getFeeData.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** button increment */
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

  /** button decrement */
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
   * @param id : fee id
   */
  editFee(id: any) {
    this.props.history.push("/edit-fee/" + id);
  }

  /**
   * 
   * @param id : fee id
   */
  viewFee(id: any) {
    this.props.history.push("/view-fee/" + id);
  }

  // async deleteFee(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.feeId,
  //     };
  //     var deleteFee = await FeeAPI.deleteFee(obj);
  //     // console.log("deleteFee", deleteFee);
  //     if (deleteFee) {
  //       this.getFeeData(
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
   * @param text : message
   * @param btext : button message
   */
  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "Fee",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllData(obj);
      // console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        if (deleteAllData.data.status === 200) {
          const msg1 = deleteAllData.data.message;
          utils.showSuccess(msg1);
        this.getFeeData(
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
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getFeeData(
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

   
    this.getFeeData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : fee search value
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getFeeData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting value
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.feedata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      feedata: this.state.feedata = copyTableData,
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
      const obj:statusChangeRequest = {
        moduleName: "Fee",
        id: data.feeId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getFeeData(
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
    let _id = item.feeId;
    let ind: any = this.state.feedata.findIndex(
      (x: any) => x.feeId === _id
    );
    let data: any = this.state.feedata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        feedata: this.state.feedata = data,
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
        newarray.push(res.feeId);
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
    this.state.feedata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      feedata: this.state.feedata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.feedata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.feeId);
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
   * @param feedata : get fee table data
   */
  getTable(feedata: any) {
    return (
      <div className="userClass">
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("name")}>
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
            <th>{constant.feePage.feeTableColumn.name}</th>
            <th>{constant.feePage.feeTableColumn.description}</th>
            {checkRights.checkEditRights("Fee") === true ? (
              <th style={{ textAlign: "center" }}>
                {constant.tableAction.status}
              </th>
            ) : (
              ""
            )}
            {checkRights.checkViewRights("Fee") === true ||
            checkRights.checkEditRights("Fee") === true ? (
              <th className="action">{constant.tableAction.action}</th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.feedata.length > 0 ? (
            <>
              {this.state.feedata.map((data: any, index: any) => (
                <tr key={index}>
                     <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.feeId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.feedata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  {checkRights.checkEditRights("Fee") === true ? (
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Inactive fee",
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
                            "You should be Active fee",
                            "Yes, Active it"
                          )
                        }
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  ) : ('') }
                    {checkRights.checkViewRights("Fee") === true ||
                  checkRights.checkEditRights("Fee") === true ? (
                    <td className="action">
                      <span className="padding">
                        {checkRights.checkViewRights("Fee") === true ? (
                         <i
                         className="fa fa-eye"
                         onClick={() => this.viewFee(data.feeId)}
                       ></i>
                        ) : (
                          ""
                        )}
                        {checkRights.checkEditRights("Fee") === true ? (
                           <i
                           className="fas fa-edit"
                           onClick={() => this.editFee(data.feeId)}
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
   * @param renderPageNumbers : render page number
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
                          {constant.feePage.title.feeTitle}
                        </CardTitle>
                      </Col>
                      {checkRights.checkAddRights("Fee") === true ? (
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                      <div className="right">
                        <Link to="/add-fee">
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

                    {this.state.deleteFlag === true && checkRights.checkDeleteRights("Fee") === true  ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData("You should be Delete Fee",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.feedata.length > 0 ? (
                      <>{this.getTable(this.state.feedata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                    
                    {this.state.feedata.length > 0
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

export default ListFee;
