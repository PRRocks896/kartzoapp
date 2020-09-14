import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import { API, DeleteAPI, RoleAPI, StatusAPI } from "../../../service/index.service";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardTitle,
  CustomInput,
  Row,
} from "reactstrap";
import "./users.css";
import constant from "../../../constant/constant";
import {
  getAllTableDataListRequest,
  statusChangeRequest,
  deleteByIdRequest,
  allStateRequest,deleteAllDataRequest
} from "../../../modelController";
import checkRights from '../../../rights';
const $ = require("jquery");
var _ = require("lodash");

class Users extends React.Component<{ history: any }> {
  userState = constant.userPage.state;
  state: allStateRequest = {
    count: this.userState.count,
    currentPage: this.userState.currentPage,
    items_per_page: this.userState.items_per_page,
    upperPageBound: this.userState.upperPageBound,
    lowerPageBound: this.userState.lowerPageBound,
    pageBound: this.userState.pageBound,
    role: this.userState.role,
    roleid: this.userState.roleid,
    onItemSelect: this.userState.onItemSelect,
    userrole: this.userState.userrole,
    userdata: this.userState.userdata,
    switchSort: this.userState.switchSort,
    isStatus: this.userState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.edituser = this.edituser.bind(this);
    this.viewuser = this.viewuser.bind(this);
    this.onRoleSelect = this.onRoleSelect.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
    this.delleteAllData = this.delleteAllData.bind(this);
  }

  async componentDidMount() {
    document.title = constant.userPage.title.userTitle + utils.getAppName();
    utils.dataTable();
    this.getUserRole();
    this.getUsers();
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

  edituser(data: any) {
    this.props.history.push("/edituser/" + data.userId);
  }

  viewuser(data: any) {
    this.props.history.push("/viewuser/" + data.userId);
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });
    this.getUsers(
      parseInt(this.state.roleid),
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  async onRoleSelect(event: any) {
    this.setState({
      roleid: this.state.roleid =
        event.target.options[event.target.selectedIndex].value,
      onItemSelect: this.state.onItemSelect =
        event.target.options[event.target.selectedIndex].innerHTML,
    });

    console.log("roleid", this.state.roleid);

    const obj: getAllTableDataListRequest = {
      roleID: parseInt(this.state.roleid),
      searchText: "",
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    var getUserDataPagination = await API.getUserDataPagination(obj);
    console.log("getUserDataPagination", getUserDataPagination);
    // This status sould becheck in intercepter only
    if (getUserDataPagination) {
      if (getUserDataPagination.status === 200) {
        this.setState({
          // rows: { 'firstName','lastName' },
          userdata: this.state.userdata =
            getUserDataPagination.resultObject.data,
          count: this.state.count =
            getUserDataPagination.resultObject.totalcount,
        });
      } else {
        const msg1 = getUserDataPagination.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.userdata];
    copyTableData.sort(utils.compareByDesc(key, this.state.switchSort));
    this.setState({
      userdata: this.state.userdata = copyTableData,
    });
  }

  async getUserRole() {
    const getUserRole = await RoleAPI.getUserRole();
    if (getUserRole) {
      this.setState({
        userrole: this.state.userrole = getUserRole.resultObject,
      });
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async getUsers(
    roleID: number = 0,
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj: getAllTableDataListRequest = {
      roleID: roleID,
      searchText: searchText,
      page: page,
      size: size,
    };

    var getUserDataPagination = await API.getUserDataPagination(obj);
    console.log("getUserDataPagination", getUserDataPagination);

    if (getUserDataPagination) {
      this.setState({
        userdata: this.state.userdata = getUserDataPagination.resultObject.data,
        count: this.state.count = getUserDataPagination.resultObject.totalcount,
      });
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj: getAllTableDataListRequest = {
      roleID: parseInt(this.state.roleid),
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    this.getUsers(obj.roleID, obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj: getAllTableDataListRequest = {
      roleID: parseInt(this.state.roleid),
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getUsers(obj.roleID, obj.searchText, obj.page, obj.size);
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: statusChangeRequest = {
        moduleName: "User",
        id: data.userId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        this.getUsers(
          parseInt(this.state.roleid),
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

  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "User",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllData(obj);
      console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        this.getUsers(
          parseInt(this.state.roleid),
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

  handleChange(item: any, e: any) {
    let _id = item.userId;
    let index: any = this.state.userdata.findIndex(
      (x: any) => x.userId === _id
    );
    let data: any = this.state.userdata;
    if (index > -1) {
      let newState: any = !item._rowChecked;
      data[index]._rowChecked = newState;
      this.setState({
        userdata: this.state.userdata = data,
      });
    }
    console.log(
      "after check the box data: ",
      data.filter((res: any, index: number) => res._rowChecked == true)
    );
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
        newarray.push(res.userId);
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
    this.state.userdata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      userdata: this.state.userdata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.userdata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.userId);
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

  pagination(pageNumbers: number[]) {
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

  getTable(userdata: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table_responsive table-sm sortable"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("firstName")}>
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
            <th>{constant.userPage.userTableColumn.firstname}</th>
            <th>{constant.userPage.userTableColumn.lastname}</th>
            <th>{constant.userPage.userTableColumn.email}</th>
            <th>{constant.userPage.userTableColumn.role}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {userdata != null ? (
            <>
              {userdata.map((data: any, index: number) => (
                <tr key={"user-" + index}>
                  <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.userId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={userdata[index]["_rowChecked"] === true}
                    />
                  </td>
                  <td className="sorting_1">{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be inActive user",
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
                            "You should be Active user",
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
                        onClick={() => this.viewuser(data)}
                      ></i>
                      {/* {
                        (checkRights('Users', 'write') == true)
                      } */}
                      <i
                        className="fas fa-edit"
                        onClick={() => this.edituser(data)}
                      ></i>
                      {/* <i
                        className="fas fa-trash"
                        onClick={() =>
                          this.deleteuser(
                            data,
                            "You should be Delete user",
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
        <div className="ms-content-wrapper">
          <div className="row">
            {
              (checkRights.checkViewRights('User') === true) ? (
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">
                          {constant.userPage.title.userTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/adduser">
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
                    <div className="filter">
                      <CustomInput
                        type="select"
                        id="onselect"
                        name="role"
                        className="custom_text_width bottom_text"
                        onChange={this.onRoleSelect}
                      >
                        <option value="">
                          {constant.userPage.userTableColumn.roleselect}
                        </option>
                        {this.state.userrole.length > 0
                          ? this.state.userrole.map(
                              (data: any, index: number) => (
                                <option key={data.value} value={data.value}>
                                  {data.name}
                                </option>
                              )
                            )
                          : ""}
                      </CustomInput>
                      <input
                        className="form-control custom_text_width"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyUp={this.searchApplicationDataKeyUp}
                      />
                    </div>
                    {this.state.userdata.length > 0 ? (
                      <>{this.getTable(this.state.userdata)}</>
                    ) : (
                      <h1 className="text-center mt-5">
                        {constant.noDataFound.nodatafound}
                      </h1>
                    )}
                    {this.state.deleteFlag === true ? (
                      <Button className="mb-2 mr-2 custom-button" color="primary" onClick={() => this.delleteAllData("You should be Delete user","Yes, Delete it")}>
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.userdata.length > 0
                      ? this.getPageData(
                          pageIncrementBtn,
                          renderPageNumbers,
                          pageDecrementBtn
                        )
                      : ""}
                  </CardBody>
                </Card>
              </Col>
              ) : (
                <h1>You are not authorized</h1>
              )
            }
         
          </div>
        </div>
      </>
    );
  }
}

export default Users;
