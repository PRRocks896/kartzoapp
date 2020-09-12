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
import { getAllTableDataListRequest, statusChangeRequest, deleteByIdRequest, addOnStateRequest,allStateRequest,deleteAllDataRequest } from "../../../modelController";

class ListProductAddOn extends React.Component<{ history: any }> {
  productCustomiseState:addOnStateRequest = constant.productCustomPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.productCustomiseState.count,
    currentPage: this.productCustomiseState.currentPage,
    items_per_page: this.productCustomiseState.items_per_page,
    upperPageBound: this.productCustomiseState.upperPageBound,
    lowerPageBound: this.productCustomiseState.lowerPageBound,
    pageBound: this.productCustomiseState.pageBound,
    onItemSelect: this.productCustomiseState.onItemSelect,
    addondata: this.productCustomiseState.addondata,
    switchSort: this.productCustomiseState.switchSort,
    isStatus: this.productCustomiseState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  constructor(props: any) {
    super(props);
    this.editCustomise = this.editCustomise.bind(this);
    // this.deleteCustomise  = this.deleteCustomise.bind(this);
    this.deleteAllData = this.deleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewCustomise = this.viewCustomise.bind(this);
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
    this.getProductCustomiseData = this.getProductCustomiseData.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.productCustomPage.title.customiseTitle + utils.getAppName();
    utils.dataTable();
    this.getProductCustomiseData();
  }

  async getProductCustomiseData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getProductCustomiseData = await ProductAPI.getProductCustomiseData(obj);
    console.log("getProductCustomiseData", getProductCustomiseData);

    if (getProductCustomiseData) {
      this.setState({
        addondata: this.state.addondata =
          getProductCustomiseData.resultObject.data,
        count: this.state.count = getProductCustomiseData.resultObject.totalcount,
      });
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
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

  editCustomise(id: any) {
    this.props.history.push("/edit-customise/" + id);
  }

  viewCustomise(id: any) {
    this.props.history.push("/view-customise/" + id);
  }

  // async deleteCustomise(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.productCustomizeId,
  //     };
  //     var deleteCustomise = await ProductAPI.deleteCustomise(obj);
  //     console.log("deleteCustomise", deleteCustomise);
  //     if (deleteCustomise) {
  //       this.getProductCustomiseData(
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

  async deleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "ProductCustomize",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllMerchantData(obj);
      console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        this.getProductCustomiseData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
      } else {
        const msg1 = "Internal server error";
        utils.showError(msg1);
      }
    }
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getProductCustomiseData(
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

    this.getProductCustomiseData(obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getProductCustomiseData(obj.searchText, obj.page, obj.size);
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.addondata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      addondata: this.state.addondata = copyTableData,
    });
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "ProductCustomize",
        id: data.productCustomizeId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getMerchantPanelStatusChange(obj);
      console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        this.getProductCustomiseData();
      } else {
        const msg1 = "Internal server error";
      utils.showError(msg1);
      }
    }
  }

  
  handleChange(item: any, e: any) {
    let _id = item.productCustomizeId;
    let ind: any = this.state.addondata.findIndex(
      (x: any) => x.productCustomizeId === _id
    );
    let data: any = this.state.addondata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        addondata: this.state.addondata = data,
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
        newarray.push(res.productCustomizeId);
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
    console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.addondata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      addondata: this.state.addondata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.addondata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.productCustomizeId);
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
    console.log("deleteuserdata array", this.state.deleteuserdata);
  }

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

  getTable(addondata: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("product")}>
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
            <th>
              {
                constant.productCustomPage.productCustomiseTableColumn.productname
              }
            </th>
            <th>
              {
                constant.productCustomPage.productCustomiseTableColumn.amount
              }
            </th>
            <th>
              {
                constant.productCustomPage.productCustomiseTableColumn.customisetype
              }
            </th>
            <th className="text-center">{constant.tableAction.status}</th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.addondata.length > 0 ? (
            <>
              {this.state.addondata.map((data: any, index: any) => (
                <tr key={index}>
                   <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.productCustomizeId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.addondata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                  <td>{data.product}</td>
                  <td>{data.amount}</td>
                  <td>{data.productCustomizeType}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be inActive customise",
                            "Yes, inActive it"
                          )
                        }
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="status_inactive_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Active customise",
                            "Yes, Active it"
                          )
                        }
                      >
                        InActive
                      </button>
                    )}
                  </td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() =>
                          this.viewCustomise(data.productCustomizeId)
                        }
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() =>
                          this.editCustomise(data.productCustomizeId)
                        }
                      ></i>
                       {/* <i
                        className="fa fa-trash"
                        onClick={() =>
                          this.deleteCustomise(
                            data,
                            "You should be Delete Customise",
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
                          {constant.productCustomPage.title.customiseTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/product-addondetail">
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

                    {this.state.addondata.length > 0 ? (
                      <>{this.getTable(this.state.addondata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                     {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.deleteAllData("You should be Delete Customise",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.addondata.length > 0
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

export default ListProductAddOn;
