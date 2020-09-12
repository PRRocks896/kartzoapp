import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CustomInput,
  Col,
  Row,
} from "reactstrap";
import {DeleteAPI, LocationAPI, StatusAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";
import {getAllTableDataListRequest, statusChangeRequest, deleteByIdRequest, stateStateRequest, allStateRequest, deleteAllDataRequest } from "../../../modelController/index";

class StateManagment extends React.Component<{ history: any }> {
  stateState:stateStateRequest = constant.statePage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.stateState.count,
    currentPage: this.stateState.currentPage,
    items_per_page: this.stateState.items_per_page,
    upperPageBound: this.stateState.upperPageBound,
    lowerPageBound: this.stateState.lowerPageBound,
    pageBound: this.stateState.pageBound,
    onItemSelect: this.stateState.onItemSelect,
    statedata: this.stateState.statedata,
    switchSort: this.stateState.switchSort,
    isStatus: this.stateState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  constructor(props: any) {
    super(props);
    this.editState = this.editState.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewState = this.viewState.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
    // this.deleteState = this.deleteState.bind(this);
    this.delleteAllData = this.delleteAllData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
  }

  async componentDidMount() {
    document.title = constant.statePage.title.stateTitle + utils.getAppName();
    utils.dataTable();
    this.getStateData();
  }

  async getStateData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getStateData = await LocationAPI.getStateData(obj);
    console.log("getStateData", getStateData);

    if (getStateData) {
      this.setState({
        statedata: this.state.statedata = getStateData.resultObject.data,
        count: this.state.count = getStateData.resultObject.totalcount,
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

  editState(id: any) {
    this.props.history.push("/editstate/" + id);
  }

  viewState(id: any) {
    this.props.history.push("/viewstate/" + id);
  }

  // async deleteState(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.stateId,
  //     };
  //     var deleteState = await LocationAPI.deleteState(obj);
  //     console.log("deleteState", deleteState);
  //     if (deleteState) {
  //       this.getStateData('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
  //     } else {
  //       const msg1 = "Internal server error";
  //     utils.showError(msg1);
  //     }
  //   }
  // }

  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "State",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllData(obj);
      console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        this.getStateData('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
      } else {
        const msg1 = "Internal server error";
        utils.showError(msg1);
      }
    }
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: 
        event.target.options[event.target.selectedIndex].value,
    });

    this.getStateData('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
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

    this.getStateData(obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getStateData(obj.searchText, obj.page, obj.size);
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.statedata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      statedata: this.state.statedata = copyTableData,
    });
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "State",
        id: data.stateId,
        isActive: data.isActive === true ? false : true
       }
       var getStatusChange = await StatusAPI.getStatusChange(obj);
       console.log("getStatusChange", getStatusChange);
       if (getStatusChange) {
        this.getStateData('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
      } else {
        const msg1 = "Internal server error";
      utils.showError(msg1);
      }
    }
  }

  handleChange(item: any, e: any) {
    let _id = item.stateId;
    let ind: any = this.state.statedata.findIndex(
      (x: any) => x.stateId === _id
    );
    let data: any = this.state.statedata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        statedata: this.state.statedata = data,
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
        newarray.push(res.stateId);
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
    this.state.statedata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      statedata: this.state.statedata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.statedata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.stateId);
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

  getTable(statedata: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("stateName")}>
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
            <th>{constant.statePage.stateTableColumn.stateName}</th>
            <th>{constant.statePage.stateTableColumn.countryName}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.statedata.length > 0 ? (
            <>
              {this.state.statedata.map((data: any, index: any) => (
                <tr key={index}>
                    <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.stateId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.statedata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                  <td>{data.stateName}</td>
                  <td>{data.countryName}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be inActive state",
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
                            "You should be Active state",
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
                        onClick={() => this.viewState(data.stateId)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editState(data.stateId)}
                      ></i>
                         {/* <i
                        className="fa fa-trash"
                        onClick={() =>
                          this.deleteState(
                            data,
                            "You should be Delete State",
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
    <CardTitle className="font">{constant.statePage.title.stateTitle}</CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/addstate">
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

                    {this.state.statedata.length > 0 ? (
                      <>{this.getTable(this.state.statedata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                      {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData("You should be Delete State",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.statedata.length > 0
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

export default StateManagment;
