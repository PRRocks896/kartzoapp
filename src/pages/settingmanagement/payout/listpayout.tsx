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
  PayoutAPI,DeleteAPI
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest,deleteByIdRequest, allStateRequest,payoutStateRequest, deleteAllDataRequest } from "../../../modelController";

class ListPayout extends React.Component<{ history: any }> {
  payoutState:payoutStateRequest = constant.payoutPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.payoutState.count,
    currentPage: this.payoutState.currentPage,
    items_per_page: this.payoutState.items_per_page,
    upperPageBound: this.payoutState.upperPageBound,
    lowerPageBound: this.payoutState.lowerPageBound,
    pageBound: this.payoutState.pageBound,
    onItemSelect: this.payoutState.onItemSelect,
    payoutdata: this.payoutState.payoutdata,
    switchSort: this.payoutState.switchSort,
    isStatus: this.payoutState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  constructor(props: any) {
    super(props);
    this.editPayout = this.editPayout.bind(this);
    // this.deletePayout = this.deletePayout.bind(this);
    // this.delleteAllData = this.delleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewPayout = this.viewPayout.bind(this);
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
    // this.handleChange = this.handleChange.bind(this);
    // this.handleMainChange = this.handleMainChange.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.payoutPage.title.payoutTitle + utils.getAppName();
    utils.dataTable();
    this.getPayoutData();
  }

  async getPayoutData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getPayoutData = await PayoutAPI.getPayoutData(obj);
    // console.log("getPayoutData", getPayoutData);

    if (getPayoutData) {
      if(getPayoutData.status === 200) {
      this.setState({
        payoutdata: this.state.payoutdata =
          getPayoutData.resultObject.data,
        count: this.state.count = getPayoutData.resultObject.totalcount,
      });
    } else {
      const msg1 = getPayoutData.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

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

  editPayout(id: any) {
    this.props.history.push("/edit-payout/" + id);
  }

  viewPayout(id: any) {
    this.props.history.push("/view-payout/" + id);
  }

  // async deletePayout(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.payoutId,
  //     };
  //     var deletePayout = await PayoutAPI.deletePayout(obj);
  //     // console.log("deletePayout", deletePayout);
  //     if (deletePayout) {
  //       this.getPayoutData(
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

  // async delleteAllData(text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteAllDataRequest = {
  //       moduleName: "Payout",
  //       id: this.state.deleteuserdata
  //     };
  //     var deleteAllData = await DeleteAPI.deleteAllData(obj);
  //     // console.log("deleteAllData", deleteAllData);
  //     if (deleteAllData) {
  //       this.getPayoutData(
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

  onItemSelect(event: any) {
    this.setState({
      items_per_page:
        event.target.options[event.target.selectedIndex].value,
    });

    this.getPayoutData(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj:getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    if(event.target.id > 1) {
    this.getPayoutData(obj.searchText, obj.page, obj.size);
    }
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getPayoutData(obj.searchText, obj.page, obj.size);
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.payoutdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      payoutdata: this.state.payoutdata = copyTableData,
    });
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "Payout",
        id: data.pauoutId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
        this.getPayoutData(
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

  // handleChange(item: any, e: any) {
  //   let _id = item.payoutId;
  //   let ind: any = this.state.payoutdata.findIndex(
  //     (x: any) => x.payoutId === _id
  //   );
  //   let data: any = this.state.payoutdata;
  //   if (ind > -1) {
  //     let newState: any = !item._rowChecked;
  //     data[ind]._rowChecked = newState;
  //     this.setState({
  //       payoutdata: this.state.payoutdata = data,
  //     });
  //   }
  //   if (
  //     data.filter((res: any, index: number) => res._rowChecked === true)
  //       .length === data.length
  //   ) {
  //     this.setState({
  //       _maincheck: true,
  //     });
  //   } else {
  //     this.setState({
  //       _maincheck: false,
  //     });
  //   }
  //   let newarray: any = [];
  //   data.map((res: any, index: number) => {
  //     if (res._rowChecked === true) {
  //       newarray.push(res.payoutId);
  //     }
  //   });
  //   this.setState({
  //     deleteuserdata: this.state.deleteuserdata = newarray,
  //   });
  //   if (this.state.deleteuserdata.length > 0) {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = true,
  //     });
  //   } else {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = false,
  //     });
  //   }
  //   // console.log("deleteuserdata array", this.state.deleteuserdata);
  // }

  // handleMainChange(e: any) {
  //   let _val = e.target.checked;
  //   this.state.payoutdata.forEach((element: any) => {
  //     element._rowChecked = _val;
  //   });
  //   this.setState({
  //     payoutdata: this.state.payoutdata,
  //   });
  //   this.setState({
  //     _maincheck: _val,
  //   });
  //   let newmainarray: any = [];
  //   this.state.payoutdata.map((res: any, index: number) => {
  //     if (res._rowChecked === true) {
  //       newmainarray.push(res.payoutId);
  //     }
  //   });
  //   this.setState({
  //     deleteuserdata: this.state.deleteuserdata = newmainarray,
  //   });
  //   if (this.state.deleteuserdata.length > 0) {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = true,
  //     });
  //   } else {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = false,
  //     });
  //   }
  //   // console.log("deleteuserdata array", this.state.deleteuserdata);
  // }

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

  getTable(payoutdata: any) {
    return (
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("merchantOrderAmount")}>
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
            <th>{constant.payoutPage.payoutTableColumn.merchantamount}</th>
            <th>{constant.payoutPage.payoutTableColumn.merchantpayamount}</th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.payoutdata.length > 0 ? (
            <>
              {this.state.payoutdata.map((data: any, index: any) => (
                <tr key={index}>
                   {/* <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.payoutId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.payoutdata[index]["_rowChecked"] === true
                      }
                    />
                  </td> */}
                  <td>{data.merchantOrderAmount}</td>
                  <td>{data.merchantPayAmount}</td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewPayout(data.payoutId)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editPayout(data.payoutId)}
                      ></i>
                       {/* <i
                        className="fa fa-trash"
                        onClick={() =>
                          this.deletePayout(
                            data,
                            "You should be Delete Payout",
                            "Yes, Delete it"
                          )
                        }
                      ></i> */}
                    </span>
                  </td>
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
                          {constant.payoutPage.title.payoutTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/add-payout">
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

                    {this.state.payoutdata.length > 0 ? (
                      <>{this.getTable(this.state.payoutdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                      {/* {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData("You should be Delete Payout",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )} */}
                    {this.state.payoutdata.length > 0
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

export default ListPayout;
