import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardTitle,
  Form,
  CustomInput,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
// import './users.css';
import NavBar from "../../navbar/navbar";
import Swal from "sweetalert2";
import "./userrole.css";
import utils from "../../../utils";
import constant from "../../../constant/constant";
import TableComponent from "../../../component/tables/table";
import { userRoleUpdateRequest } from "../../../modelController/userRoleModel";
import API from "../../../service/role.service";
const $ = require("jquery");
$.DataTable = require("datatables.net");

interface getUserRoleRequest {
  searchText?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}

class UserRole extends React.Component<{ history: any }> {
  state = {
    count: "10",
    currentPage: "1",
    items_per_page: "10",
    perpage: 2,
    paginationdata: "",
    isFetch: false,
    data: "",
    allRecords: "",
    upperPageBound: 3,
    lowerPageBound: 0,
    pageBound: 3,
    isPrevBtnActive: "disabled",
    isNextBtnActive: "",
    onClickPage: 1,
    activePage: 15,
    userrole: [],
    switchSort: false,
    isStatus: false,
  };

  constructor(props: any) {
    super(props);
    this.editRole = this.editRole.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.viewRole = this.viewRole.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleClick = this.handleClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.compareByDesc = this.compareByDesc.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.statusEditChange = this.statusEditChange.bind(this);
  }

  componentDidMount() {
    document.title = constant.userRoleTitle + utils.getAppName();
    $("#dtBasicExample").DataTable({
      paging: false,
      info: false,
      searching: false,
      sorting: false,
      ordering: false,
    });
    this.getRole();
  }

  async getRole() {
    const obj = {
      searchText: "",
      page: 1,
      size: parseInt(this.state.items_per_page),
    };
    var getRole = await API.getRoles(obj);
    console.log("getRole", getRole);

    if (getRole) {
      if (getRole.status === 200) {
        this.setState({
          userrole: this.state.userrole = getRole.resultObject.data,
          count: this.state.count = getRole.resultObject.totalcount,
        });
      } else {
        const msg1 = getRole.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  handlePageChange(pageNumber: number) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
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

  editRole(data: any) {
    this.props.history.push("/edituserrole/" + data.roleId);
  }

  viewRole(data: any) {
    this.props.history.push("/viewuserrole/" + data.roleId);
  }

  deleteRole(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be remove role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        var deleteRole = await API.deleteRole(id);
        if (deleteRole.status === 200) {
          const msg = deleteRole.message;
          utils.showSuccess(msg);
          this.getRole();
        } else {
          const msg = deleteRole.message;
          utils.showError(msg);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "UserRole is safe :";
        utils.showError(msg1);
      }
    });
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getRole();
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.userrole];
    copyTableData.sort(this.compareByDesc(key));
    this.setState({
      userrole: this.state.userrole = copyTableData,
    });
  }

  compareByDesc(key: any) {
    if (this.state.switchSort) {
      return function (a: any, b: any) {
        if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
        if (a[key] > b[key]) return 1; //check for value if the second value is bigger then first return 1
        return 0;
      };
    } else {
      return function (a: any, b: any) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      };
    }
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj: getUserRoleRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    var getRoles = await API.getRoles(obj);
    console.log("getRoles", getRoles);

    if (getRoles) {
      if (getRoles.status === 200) {
        this.setState({
          userrole: this.state.userrole = getRoles.resultObject.data,
          count: this.state.count = getRoles.resultObject.totalcount,
        });
      } else {
        const msg = getRoles.message;
        utils.showError(msg);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj: getUserRoleRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    var getRoles = await API.getRoles(obj);
    console.log("getRoles", getRoles);
    if (getRoles) {
      if (getRoles.status === 200) {
        this.setState({
          userrole: this.state.userrole = getRoles.resultObject.data,
          count: this.state.count = getRoles.resultObject.totalcount,
        });
      } else {
        const msg = getRoles.message;
        utils.showError(msg);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  statusChange(data: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be inActive user role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, inActive it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        const obj: userRoleUpdateRequest = {
          roleId: data.roleId,
          role: data.role,
          description: data.description,
          isActive: false,
          isAdminRole: data.isAdminRole,
        };

        const editUserRole = await API.editUserRole(obj);
        console.log("editUserRole", editUserRole);

        if (editUserRole.status === 200) {
          const msg = editUserRole.message;
          utils.showSuccess(msg);
          this.getRole();
        } else {
          const msg1 = editUserRole.message;
          utils.showError(msg1);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "user role is safe :";
        utils.showError(msg1);
      }
    });
  }

  statusEditChange(data: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be Active user role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Active it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        const obj: userRoleUpdateRequest = {
          roleId: data.roleId,
          role: data.role,
          description: data.description,
          isActive: true,
          isAdminRole: data.isAdminRole,
        };

        const editUserRole = await API.editUserRole(obj);
        console.log("editUserRole", editUserRole);

        if (editUserRole.status === 200) {
          const msg = editUserRole.message;
          utils.showSuccess(msg);
          this.getRole();
        } else {
          const msg1 = editUserRole.message;
          utils.showError(msg1);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "user role is safe :";
        utils.showError(msg1);
      }
    });
  }

  render() {
    var pageNumbers = [];
    for (
      let i = 1;
      i <=
      Math.ceil(
        parseInt(this.state.count) / parseInt(this.state.items_per_page)
      );
      i++
    ) {
      pageNumbers.push(i);
    }
    var renderPageNumbers = pageNumbers.map((number: any) => {
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
        <NavBar>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">Role Management</CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/adduserrole">
                            <Button
                              className="mb-2 mr-2 custom-button"
                              color="primary"
                            >
                              Add
                            </Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div style={{ textAlign: "right" }}>
                      <input
                        className="form-control custom_text_width search"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyUp={this.searchApplicationDataKeyUp}
                      />
                    </div>
                    {/* <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div style={{ width: "500px", position: "absolute" }}>
                          <Row>
                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                              <CustomInput
                                type="select"
                                id="item"
                                name="customSelect"
                                onChange={this.onItemSelect}
                              >
                                <option value="">Record per page</option>
                                <option value="3">3</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                              
                              </CustomInput>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                  
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            onKeyUp={this.searchApplicationDataKeyUp}
                          />
                        </div>
                    
                    </Row> */}

                    <table
                      id="dtBasicExample"
                      className="table table-striped table-bordered table-sm"
                      width="100%"
                    >
                      <thead>
                        <tr onClick={() => this.handleSort("role")}>
                          <th>Role Name</th>
                          {/* <th>Description</th> */}
                          <th style={{ textAlign: "center" }}>Status</th>
                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.userrole.length > 0 ? (
                          <>
                            {this.state.userrole.map(
                              (data: any, index: any) => (
                                <tr key={index}>
                                  <td>{data.role}</td>
                                  {/* <td>{data.description}</td> */}
                                  <td style={{ textAlign: "center" }}>
                                    {data.isActive === true ? (
                                      <button
                                        className="status_active_color"
                                        onClick={() => this.statusChange(data)}
                                      >
                                        Active
                                      </button>
                                    ) : (
                                      <button
                                        className="status_inactive_color"
                                        onClick={() =>
                                          this.statusEditChange(data)
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
                                        onClick={() => this.viewRole(data)}
                                      ></i>
                                      <i
                                        className="fas fa-edit"
                                        onClick={() => this.editRole(data)}
                                      ></i>
                                      <i
                                        className="far fa-trash-alt"
                                        onClick={() =>
                                          this.deleteRole(data.roleId)
                                        }
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </table>

                    {this.state.userrole.length > 0 ? (
                      <div className="filter">
                        <CustomInput
                          type="select"
                          id="item"
                          className="custom_text_width"
                          name="customSelect"
                          onChange={this.onItemSelect}
                        >
                          <option value="">Record per page</option>
                          <option value="3">3</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                        </CustomInput>
                        <div>
                          <ul className="pagination" id="page-numbers">
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </NavBar>
      </>
    );
  }
}

export default UserRole;
