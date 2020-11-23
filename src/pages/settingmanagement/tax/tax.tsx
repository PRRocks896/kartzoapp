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
  DeleteAPI,
  StatusAPI,
  TaxAPI,
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest, deleteByIdRequest, taxStateRequest,allStateRequest, deleteAllDataRequest } from "../../../modelController";
import checkRights from "../../../rights";

class ListTax extends React.Component<{ history: any }> {

  /** Tax state */
  taxState:taxStateRequest = constant.taxPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.taxState.count,
    currentPage: this.taxState.currentPage,
    items_per_page: this.taxState.items_per_page,
    upperPageBound: this.taxState.upperPageBound,
    lowerPageBound: this.taxState.lowerPageBound,
    pageBound: this.taxState.pageBound,
    onItemSelect: this.taxState.onItemSelect,
    taxdata: this.taxState.taxdata,
    switchSort: this.taxState.switchSort,
    isStatus: this.taxState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.editTax = this.editTax.bind(this);
    // this.deleteTax = this.deleteTax.bind(this);
    this.delleteAllData = this.delleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewTax = this.viewTax.bind(this);
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
      constant.taxPage.title.taxTitle + utils.getAppName();
    utils.dataTable();
    this.getTaxData();
  }

  /**
   * 
   * @param searchText : search value
   * @param page : page number
   * @param size : per page value
   */
  async getTaxData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getTaxData = await TaxAPI.getTaxData(obj);
    // console.log("getTaxData", getTaxData);

    if (getTaxData) {
      if(getTaxData.status === 200) {
      this.setState({
        taxdata: this.state.taxdata =
          getTaxData.resultObject.data,
        count: this.state.count = getTaxData.resultObject.totalcount,
      });
    } else {
      const msg1 = getTaxData.message;
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
   * @param id : tax id
   */
  editTax(id: any) {
    this.props.history.push("/edit-tax/" + id);
  }

  /**
   * 
   * @param id : tax id
   */
  viewTax(id: any) {
    this.props.history.push("/view-tax/" + id);
  }

  // async deleteTax(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.taxId,
  //     };
  //     var deleteTax = await TaxAPI.deleteTax(obj);
  //     // console.log("deleteTax", deleteTax);
  //     if (deleteTax) {
  //       this.getTaxData(
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
   * @param text : text message
   * @param btext : button message
   */
  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "Tax",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllData(obj);
      // console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        if (deleteAllData.data.status === 200) {
          const msg1 = deleteAllData.data.message;
          utils.showSuccess(msg1);
        this.getTaxData(
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

    this.getTaxData(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  /**
   * 
   * @param event : click on next page event
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

   
    this.getTaxData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : tax search data event
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getTaxData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting data
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.taxdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      taxdata: this.state.taxdata = copyTableData,
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
        moduleName: "Tax",
        id: data.taxId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getTaxData(
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
    let _id = item.taxId;
    let ind: any = this.state.taxdata.findIndex(
      (x: any) => x.taxId === _id
    );
    let data: any = this.state.taxdata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        taxdata: this.state.taxdata = data,
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
        newarray.push(res.taxId);
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
    this.state.taxdata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      taxdata: this.state.taxdata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.taxdata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.taxId);
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
   * @param pageNumbers : page  number
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

  /** Get table data */
  getTable(taxdata: any) {
    return (
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("categoryName")}>
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
          <th>{constant.taxPage.taxTableColumn.categoryname}</th>
            <th>{constant.taxPage.taxTableColumn.taxname}</th>
            <th>{constant.taxPage.taxTableColumn.percentage}</th>
            {checkRights.checkEditRights("Tax") === true ? (
              <th style={{ textAlign: "center" }}>
                {constant.tableAction.status}
              </th>
            ) : (
              ""
            )}
            {checkRights.checkViewRights("Tax") === true ||
            checkRights.checkEditRights("Tax") === true ? (
              <th className="action">{constant.tableAction.action}</th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.taxdata.length > 0 ? (
            <>
              {this.state.taxdata.map((data: any, index: any) => (
                <tr key={index}>
                   <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.taxId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.taxdata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                    <td>{data.categoryName}</td>
                  <td>{data.taxName}</td>
                  <td>{data.percentage}%</td>
                  {checkRights.checkEditRights("Tax") === true ? (
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Inactive tax",
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
                            "You should be Active tax",
                            "Yes, Active it"
                          )
                        }
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  ) : ('') }

{checkRights.checkViewRights("Tax") === true ||
                  checkRights.checkEditRights("Tax") === true ? (
                    <td className="action">
                      <span className="padding">
                        {checkRights.checkViewRights("Tax") === true ? (
                           <i
                           className="fa fa-eye"
                           onClick={() => this.viewTax(data.taxId)}
                         ></i>
                        ) : (
                          ""
                        )}
                        {checkRights.checkEditRights("Tax") === true ? (
                          <i
                          className="fas fa-edit"
                          onClick={() => this.editTax(data.taxId)}
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
                          {constant.taxPage.title.taxTitle}
                        </CardTitle>
                      </Col>
                      {checkRights.checkAddRights("Tax") === true ? (
                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                    <div className="right">
                      <Link to="/add-tax">
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
                    {this.state.deleteFlag === true &&  checkRights.checkDeleteRights("Tax") === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData("You should be Delete Tax",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.taxdata.length > 0 ? (
                      <>{this.getTable(this.state.taxdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                    
                    {this.state.taxdata.length > 0
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

export default ListTax;
