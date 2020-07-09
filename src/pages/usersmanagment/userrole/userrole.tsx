import React from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
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
} from 'reactstrap';
// import './users.css';
import NavBar from '../../navbar/navbar';
import Swal from 'sweetalert2';
import utils from '../../../utils';
import constant from '../../../constant/constant';
import TableComponent from '../../../component/tables/table';
const $ = require('jquery');
$.DataTable = require('datatables.net')

class UserRole extends React.Component<{ history: any }> {

    state = {
        count: 10,
        currentPage: 1,
        items_per_page: 2,
        perpage: 2,
        paginationdata: '',
        isFetch: false,
        data: '',
        allRecords: '',
        upperPageBound: 3,
        lowerPageBound: 0,
        pageBound: 3,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        onClickPage: 1,
        activePage: 15
    }

    constructor(props: any) {
        super(props);
        this.editRole = this.editRole.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
        this.viewRole = this.viewRole.bind(this);

    }

    componentDidMount() {
        document.title = constant.userRoleTitle + utils.getAppName();
        $('#dtBasicExample').DataTable({
            "paging": false,
            "info": false
        });
    }


    handlePageChange(pageNumber: number) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }


    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
    }

    editRole() {
        this.props.history.push('/edituserrole');
    }

    viewRole() {
        this.props.history.push('/viewuserrole');
    }

    deleteRole() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You should be remove role!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.value) {
                // var deleteCategory = await API.deleteCategory(id);
                const msg = "UserRole has been deleted";
                utils.showSuccess(msg);
                // this.componentDidMount();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                const msg1 = "UserRole is safe :";
                utils.showError(msg1);
            }
        })
    }

    render() {
        // const data = ({
        //     columns: [
        //         {
        //             label: 'Role Name',
        //             field: 'rolename',
        //             sort: 'asc',
        //             width: 150
        //         },
        //         {
        //             label: 'Status',
        //             field: 'status',
        //             sort: 'asc',
        //             width: 150
        //         },
        //         {
        //             label: 'Action',
        //             field: 'action',
        //             sort: 'asc',
        //             width: 100
        //         }
        //     ],
        //     rows: [
        //         {
        //             rolename: 'Admin',
        //             status: (<i className="fa fa-check"></i>),
        //             action: (<span className="padding">
        //                 <i className="fa fa-eye" onClick={this.viewRole}></i>
        //                 <i className="fas fa-edit" onClick={this.editRole}></i>
        //                 <i className="far fa-trash-alt" onClick={this.deleteRole}></i>
        //             </span>),

        //         },
        //         {
        //             rolename: 'User',
        //             status: (<i className="fa fa-check"></i>),
        //             action: (<span className="padding">
        //                 <i className="fa fa-eye" onClick={this.viewRole}></i>
        //                 <i className="fas fa-edit" onClick={this.editRole}></i>
        //                 <i className="far fa-trash-alt" onClick={this.deleteRole}></i>
        //             </span>),
        //         }
        //     ]
        // })
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.count / this.state.items_per_page); i++) {
            pageNumbers.push(i);
        }
        var renderPageNumbers = pageNumbers.map((number: any) => {
            if (number === 1 && this.state.currentPage === 1) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link">{number}</a>
                    </li>
                );
            }
            else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link" id={number}>{number}</a>
                    </li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > this.state.upperPageBound) {
            pageIncrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnIncrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        let pageDecrementBtn = null;
        if (this.state.lowerPageBound >= 1) {
            pageDecrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnDecrementClick}
                    >
                        &hellip;
          </a>
                </li>
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
                                                <CardTitle
                                                    className="font"
                                                >
                                                    Role Management
                                            </CardTitle>
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
                                        <div className="selectDiv">

                                            <CustomInput
                                                type="select"
                                                id="exampleCustomSelect"
                                                name="customSelect"
                                            // onChange={this.onItemSelect}
                                            >
                                                <option value="">Record per page</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                {/* {
                            this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                <option key={data.id} value={data.id}>{data.name}</option>
                            ) : ''
                        } */}
                                            </CustomInput>
                                        </div>

                                        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>Role Name</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Admin</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye" onClick={this.viewRole}></i>
                                                            <i className="fas fa-edit" onClick={this.editRole}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteRole}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Customer</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye" onClick={this.viewRole}></i>
                                                            <i className="fas fa-edit" onClick={this.editRole}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteRole}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        {/* <TableComponent column={constant.roleTableColumn}/> */}
                                        {/* <MDBDataTable
                                            striped
                                            hover
                                            data={data}
                                        /> */}
                                        {/* <div>
                                            <Row>
                                                <Col md="6">
                                                    <div>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Search"
                                                            aria-label="Search"
                                                        // onKeyUp={this.searchApplicationDataKeyUp}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="6">
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
                                        </div>
                                        <br /> */}
                                        {/* <Table hover className="mb-0 table_responsive" bordered>
                                            <thead>
                                                <tr>
                                                    <th>Role Name</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Admin</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.editRole}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteRole}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Customer</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.editRole}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteRole}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table> */}
                                        <div>
                                            <ul className="pagination" id="page-numbers">
                                                {pageDecrementBtn}
                                                {renderPageNumbers}
                                                {pageIncrementBtn}
                                            </ul>
                                        </div>
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
