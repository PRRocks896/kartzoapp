import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import utils from "../../../utils";
import { MDBDataTable } from "mdbreact";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Input,
  CustomInput,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import API from "../../../service/location.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import { cityUpdateRequest } from "../../../modelController/cityModel";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class City extends React.Component<{ history: any }> {
  state = {
    selectedFile: null,
    firstname: "",
    firstnameerror: "",
    lastname: "",
    lastnameerror: "",
    email: "",
    emailerror: "",
    mobilenumber: "",
    mobilenumbererror: "",
    password: "",
    passworderror: "",
    checked: false,
    selectedFileerror: "",
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
    citydata: [],
    switchSort: false,
    isStatus:false
  };

  constructor(props: any) {
    super(props);
    this.deleteCity = this.deleteCity.bind(this);
    this.editCity = this.editCity.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewCity = this.viewCity.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.statusEditChange = this.statusEditChange.bind(this);
  }

  async componentDidMount() {
    document.title = constant.cityTitle + utils.getAppName();
    $("#dtBasicExample").DataTable({
        paging: false,
        info: false,
        searching: false,
        sorting: false,
        ordering: false,
      });
    this.getCityData();
  }

  async getCityData() {
    const obj = {
      searchText: "",
      isActive: true,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    var getCityData = await API.getCityData(obj);
    console.log("getCityData", getCityData);

    if (getCityData.status === 200) {
      this.setState({
        citydata: this.state.citydata = getCityData.resultObject.data,
        count: this.state.count = getCityData.resultObject.totalcount,
      });
    } else {
      const msg1 = getCityData.message;
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

  editCity(id: any) {
    this.props.history.push("/editcity/" + id);
  }

  viewCity(id: any) {
    this.props.history.push("/viewcity/" + id);
  }

  deleteCity(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be remove city!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        var deleteCity = await API.deleteCity(id);
        if(deleteCity.status === 200) {
            const msg = deleteCity.message;
            utils.showSuccess(msg);
            this.getCityData();
        } else {
            const msg = deleteCity.message;
            utils.showSuccess(msg);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "City is safe :";
        utils.showError(msg1);
      }
    });
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getCityData();
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj = {
      searchText: "",
      isActive: true,
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    var getCityData = await API.getCityData(obj);
    console.log("getCityData", getCityData);

    if (getCityData.status === 200) {
      this.setState({
        citydata: this.state.citydata = getCityData.resultObject.data,
        count: this.state.count = getCityData.resultObject.totalcount,
      });
    } else {
      const msg1 = getCityData.message;
      utils.showError(msg1);
    }
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj = {
      searchText: e.target.value,
      isActive: true,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    var getCityData = await API.getCityData(obj);
    console.log("getCityData", getCityData);

    if (getCityData.status === 200) {
      this.setState({
        citydata: this.state.citydata = getCityData.resultObject.data,
        count: this.state.count = getCityData.resultObject.totalcount,
      });
    } else {
      const msg1 = getCityData.message;
      utils.showError(msg1);
    }
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.citydata];
    copyTableData.sort(this.compareByDesc(key));
    this.setState({
      citydata: this.state.citydata = copyTableData,
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

  statusChange(data:any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be inActive city!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, inActive it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        const obj: cityUpdateRequest = {
            cityId: data.cityId,
            cityName: data.cityName,
            stateId: data.stateId,
            isActive: false,
          };
  
          const editCity = await API.editCity(obj, data.cityId);
          console.log("editCity", editCity);
  
          if (editCity.status === 200) {
            const msg = editCity.message;
            utils.showSuccess(msg);
           this.getCityData();
          } else {
            const msg = editCity.message;
            utils.showError(msg);
          }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "city is safe :";
      }
    });
  }

  statusEditChange(data:any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be Active shop!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Active it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        const obj: cityUpdateRequest = {
            cityId: data.cityId,
            cityName: data.cityName,
            stateId: data.stateId,
            isActive: true,
          };
  
          const editCity = await API.editCity(obj, data.cityId);
          console.log("editCity", editCity);
  
          if (editCity.status === 200) {
            const msg = editCity.message;
            utils.showSuccess(msg);
           this.getCityData();
          } else {
            const msg = editCity.message;
            utils.showError(msg);
          }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "shop is safe :";
        // utils.showError(msg1);
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
                        <CardTitle className="font">City Management</CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/addcity">
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

                    <table
                      id="dtBasicExample"
                      className="table table-striped table-bordered table-sm"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>City Name</th>
                          <th>State Name</th>
                          <th style={{ textAlign: "center" }}>Status</th>
                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.citydata.length > 0 ? (
                          <>
                            {this.state.citydata.map(
                              (data: any, index: any) => (
                                <tr key={index}>
                                  <td>{data.cityName}</td>
                                  <td>{data.stateName}</td>

                                  <td style={{ textAlign: "center" }}>
                            {this.state.isStatus === false ? (
                              <button
                                className="status_active_color"
                                onClick={() => this.statusChange(data)}
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                className="status_inactive_color"
                                onClick={() => this.statusEditChange(data)}
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
                                          this.viewCity(data.cityId)
                                        }
                                      ></i>
                                      <i
                                        className="fas fa-edit"
                                        onClick={() =>
                                          this.editCity(data.cityId)
                                        }
                                      ></i>
                                      <i
                                        className="far fa-trash-alt"
                                        onClick={() =>
                                          this.deleteCity(data.cityId)
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
                    {this.state.citydata.length > 0 ? (
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

export default City;
