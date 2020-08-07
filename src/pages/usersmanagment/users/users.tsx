import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import utils from "../../../utils";
import API from "../../../service/service";
import RoleAPI from "../../../service/role.service";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardTitle,
  Form,
  CustomInput,
  FormGroup,
  Label,
  // Table,
  Row,
} from "reactstrap";
import "./users.css";
import NavBar from "../../navbar/navbar";
import { MDBDataTable } from "mdbreact";
import constant from "../../../constant/constant";
import TableComponent from "../../../component/tables/table";
import apiUrl from "../../../apicontroller/apicontrollers";
import { userListRequest } from "../../../modelController/userModel";
const $ = require("jquery");
$.DataTable = require("datatables.net");
var _ = require('lodash');

 interface getUserRequest {
  roleID?: number,
  searchText?:string,
  isActive?:boolean,
  page?:number,
  size?:number
}


class Users extends React.Component<{ history: any }> {
  state = {
    count: '10',
    currentPage: '1',
    items_per_page: '10',
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
    role: "",
    roleid: '0',
    onItemSelect:'',
    userrole:[],
    userdata:[],
    switchSort:false
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
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.compareByDesc = this.compareByDesc.bind(this);
  }

  async componentDidMount() {
    document.title = constant.userTitle + utils.getAppName();
    $("#dtBasicExample").DataTable({
      paging: false,
      info: false,
      searching:false,
      sorting:false,
      ordering:false
    });
    // $('.dataTables_length').addClass('bs-select');
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

  edituser(data:any) {
    this.props.history.push('/edituser/' + data.userID);
  }

  viewuser(data:any) {
    this.props.history.push('/viewuser/' + data.userID);
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page = event.target.options[event.target.selectedIndex].value
    });

    this.getUsers();
  }

 async onRoleSelect(event: any) {
    this.setState({
      roleid: this.state.roleid = event.target.options[event.target.selectedIndex].value,
      onItemSelect:this.state.onItemSelect = event.target.options[event.target.selectedIndex].innerHTML
    });

    console.log("roleid",this.state.roleid);

    const obj:getUserRequest = {
      roleID:parseInt(this.state.roleid),
      searchText: "",
      isActive: true,
      page: 1,
      size: parseInt(this.state.items_per_page)
    }

    var getUserDataPagination = await API.getUserDataPagination(obj);
    console.log("getUserDataPagination",getUserDataPagination);

    if( getUserDataPagination.status === 200) {
      this.setState({
        // rows: { 'firstName','lastName' },
        userdata:this.state.userdata = getUserDataPagination.resultObject.data,
        count:this.state.count = getUserDataPagination.resultObject.totalcount
      })
    } else {
      const msg1 = getUserDataPagination.message;
      utils.showError(msg1);
    }

  }

  onSort(){
    const sorted = _.sortBy(this.state.userdata, 'firstName')
    this.setState({
      userdata: this.state.userdata = sorted
    });
  }

  handleSort(key:any){
    this.setState({
        switchSort:!this.state.switchSort
    })
   let copyTableData =[...this.state.userdata];
   copyTableData.sort(this.compareByDesc(key));
   this.setState({
    userdata:this.state.userdata = copyTableData
   })
}

compareByDesc(key:any){
  if(this.state.switchSort){
      return function(a:any,b:any){
          if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
          if (a[key] > b[key]) return 1;  //check for value if the second value is bigger then first return 1
          return 0;
      };
  }else{
      return function(a:any,b:any){
          if (a[key] > b[key]) return -1; 
          if (a[key] < b[key]) return 1; 
          return 0;
      };
  }
 }

  async deleteuser(id:any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You should be remove user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        var deleteUser = await API.deleteUser(id);
        if(deleteUser.status === 200) {
          const msg = deleteUser.message;
          utils.showSuccess(msg);
          this.getUsers();
        } else {
          const msg = deleteUser.message;
          utils.showSuccess(msg);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "User is safe :";
        utils.showError(msg1);
      }
    });
  }

  async getUserRole() {
    const getUserRole = await RoleAPI.getUserRole();

  if(getUserRole.status === 200) {
    this.setState({
      userrole : this.state.userrole = getUserRole.resultObject
    })

  } else {
    const msg1 = getUserRole.message;
    utils.showError(msg1);
}
}

  async getUsers() {

    const obj:getUserRequest = {
      roleID:parseInt(this.state.roleid),
      searchText: "",
      isActive: true,
      page: 1,
      size: parseInt(this.state.items_per_page)
    }

    var getUserDataPagination = await API.getUserDataPagination(obj);
    console.log("getUserDataPagination",getUserDataPagination);

    if( getUserDataPagination.status === 200) {
      this.setState({
        // rows: { 'firstName','lastName' },
        userdata:this.state.userdata = getUserDataPagination.resultObject.data,
        count:this.state.count = getUserDataPagination.resultObject.totalcount
      })
    } else {
      const msg1 = getUserDataPagination.message;
      utils.showError(msg1);
    }
  }

  async handleClick(event : any) {
    this.setState({
      currentPage:this.state.currentPage = event.target.id
    })
  const obj:getUserRequest = {
    roleID:parseInt(this.state.roleid),
    searchText: "",
    isActive: true,
    page: parseInt(event.target.id),
    size: parseInt(this.state.items_per_page)
  }

  var getUserDataPagination = await API.getUserDataPagination(obj);
  console.log("getUserDataPagination",getUserDataPagination);

  if( getUserDataPagination.status === 200) {
    this.setState({
      // rows: { 'firstName','lastName' },
      userdata:this.state.userdata = getUserDataPagination.resultObject.data,
      count:this.state.count = getUserDataPagination.resultObject.totalcount
    })
  } else {
    const msg1 = getUserDataPagination.message;
    utils.showError(msg1);
  }
  }

  async searchApplicationDataKeyUp(e:any) {
    console.log("search",e.target.value)
    const obj:getUserRequest = {
      roleID:parseInt(this.state.roleid),
      searchText: e.target.value,
      isActive: true,
      page: 1,
      size: parseInt(this.state.items_per_page)
    }

    var getUserDataPagination = await API.getUserDataPagination(obj);
    console.log("getUserDataPagination",getUserDataPagination);

    if( getUserDataPagination.status === 200) {
      this.setState({
        // rows: { 'firstName','lastName' },
        userdata:this.state.userdata = getUserDataPagination.resultObject.data,
        count:this.state.count = getUserDataPagination.resultObject.totalcount
      })
    } else {
      const msg1 = getUserDataPagination.message;
      utils.showError(msg1);
    }
  }
  


  render() {
    
    var pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(parseInt(this.state.count) / parseInt(this.state.items_per_page));
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
              parseInt(this.state.currentPage) === number ? "active" : "page-item"
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
              parseInt(this.state.currentPage) === number ? "active" : "page-item"
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
                        <CardTitle className="font">User Management</CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/adduser">
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
                    <div className="filter">
                      
                          <CustomInput
                            type="select"
                            id="onselect"
                            name="role"
                            className="custom_text_width bottom_text"
                            onChange={this.onRoleSelect}
                          >
                            <option value="">Select UserRole:</option>
                            {
                                this.state.userrole.length > 0 ? this.state.userrole.map((data:any, index) =>
                                    <option key={data.value} value={data.value}>{data.name}</option>
                                ) : ''
                            }
                          </CustomInput>
                      
                      <input
                          className="form-control custom_text_width"
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
                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                          <CustomInput
                            type="select"
                            id="onselect"
                            name="role"
                            onChange={this.onRoleSelect}
                          >
                            <option value="">Select UserRole:</option>
                           
                            {
                                this.state.userrole.length > 0 ? this.state.userrole.map((data:any, index) =>
                                    <option key={data.value} value={data.value}>{data.name}</option>
                                ) : ''
                            }
                          </CustomInput>
                        </Col>
                      </Row>
                    </div>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                    <div>
                     
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search"
                          aria-label="Search"
                          onKeyUp={this.searchApplicationDataKeyUp}
                      />
                    </div>
                    </Col>
                    </Row> */}



                    {/* {
                      this.state.userdata !== null ? (

                        <TableComponent column={constant.userTableColumn} row={this.state.userdata}/>
                      ) : (
                        'No Data Found'
                      )
                    } */}

                    <table
                      id="dtBasicExample"
                      className="table table-striped table-bordered table_responsive table-sm sortable"
                      width="100%"
                    >
                      <thead>
                        <tr onClick={() => this.handleSort('firstName')}>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th style={{ textAlign: "center" }}>Status</th>
                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.userdata != null ? (
                            <>
                            {
                              this.state.userdata.sort((a:any, b:any) => a.firstName - b.firstName).map((data:any,index:any) =>
                              <tr key={index}>
                              <td className="sorting_1">{data.firstName}</td>
                              <td>{data.lastName}</td>
                              <td>{data.email}</td>
                              <td>{data.role}</td>
                              <td style={{ textAlign: "center" }}>
                                {
                                  data.isActive === true ? (
                                    <i className="fa fa-check"></i>
                                  ) : (
                                    <i className="fa fa-times cursor"></i>
                                  )
                                }
                              </td>
                              <td className="action">
                                <span className="padding">
                                  <i
                                    className="fa fa-eye"
                                    onClick={() => this.viewuser(data)}
                                  ></i>
                                  <i
                                    className="fas fa-edit"
                                    onClick={() => this.edituser(data)}
                                  ></i>
                                  <i
                                    className="far fa-trash-alt"
                                    onClick={() => this.deleteuser(data.userID)}
                                  ></i>
                                </span>
                              </td>
                            </tr>
                              )
                            }
                            </>
                          ) : (
                            ''
                          )
                        }
                      </tbody>
                    </table>
                      {
                        this.state.userdata.length > 0 ? (
                          
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
                          ''
                        )
                      }
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

export default Users;
