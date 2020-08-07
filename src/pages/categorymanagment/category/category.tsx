import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import utils from '../../../utils';
import { MDBDataTable } from 'mdbreact';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Input,
    Col,
    FormGroup,
    CustomInput,
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/category.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { categoryListRequest } from '../../../modelController/categoryModel';
const $ = require('jquery');
$.DataTable = require('datatables.net')

class Category extends React.Component<{ history: any }> {

    state = {
        selectedFile: '',
        firstname: '',
        firstnameerror: '',
        lastname: '',
        lastnameerror: '',
        email: '',
        emailerror: '',
        mobilenumber: '',
        mobilenumbererror: '',
        password: '',
        passworderror: '',
        checked: false,
        selectedFileerror: '',
        count: '10',
        currentPage: '1',
        items_per_page: '5',
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
        activePage: 15,
        categorydata: [],
        switchSort: false
    }

    constructor(props: any) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.viewCategory = this.viewCategory.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.compareByDesc = this.compareByDesc.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.categoryTitle + utils.getAppName();
        $("#dtBasicExample").DataTable({
            paging: false,
            info: false,
            searching: false,
            sorting: false,
            ordering: false,
        });
        this.getCategory();
    }

    async getCategory() {

        const obj = {
            searchText: "",
            isActive: true,
            page: 1,
            size: parseInt(this.state.items_per_page),
        };

        var getCategory = await API.getCategory(obj);
        console.log("getCategory", getCategory);

        if (getCategory.status === 200) {
            this.setState({
                categorydata: this.state.categorydata = getCategory.resultObject.data,
                count:this.state.count = getCategory.resultObject.totalcount
            });
        } else {
            const msg1 = getCategory.message;
            utils.showError(msg1);
        }

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

    editCategory(id:any) {
        this.props.history.push('/editcategory/' + id);
    }

    viewCategory(id:any) {
        this.props.history.push('/viewcategory/' + id);
    }

    onItemSelect(event: any) {
        this.setState({
            items_per_page: this.state.items_per_page =
                event.target.options[event.target.selectedIndex].value,
        });

        this.getCategory();
    }

    deleteCategory(id:any) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You should be remove category!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.value) {
                var deleteCategory = await API.deleteCategory(id);
                if(deleteCategory.status === 200) {
                    const msg = deleteCategory.message;
                    utils.showSuccess(msg);
                    this.getCategory();
                } else {
                    const msg = deleteCategory.message;
                    utils.showSuccess(msg);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                const msg1 = "Category is safe :";
                utils.showError(msg1);
            }
        })
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

        var getCategory = await API.getCategory(obj);
        console.log("getCategory", getCategory);

        if (getCategory.status === 200) {
            this.setState({
                categorydata: this.state.categorydata = getCategory.resultObject.data,
                count:this.state.count = getCategory.resultObject.totalcount
            });
        } else {
            const msg1 = getCategory.message;
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

        var getCategory = await API.getCategory(obj);
        console.log("getCategory", getCategory);


        if (getCategory.status === 200) {
            this.setState({
                categorydata: this.state.categorydata = getCategory.resultObject.data,
                count:this.state.count = getCategory.resultObject.totalcount
            });
        } else {
            const msg1 = getCategory.message;
            utils.showError(msg1);
        }
    }

    handleSort(key: any) {
        this.setState({
            switchSort: !this.state.switchSort,
        });
        let copyTableData = [...this.state.categorydata];
        copyTableData.sort(this.compareByDesc(key));
        this.setState({
            categorydata: this.state.categorydata = copyTableData,
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
                                                <CardTitle
                                                    className="font"
                                                >
                                                    Category Management
                                        </CardTitle>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <div className="right">
                                                    <Link to="/addcategory">
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
                                        <div style={{ textAlign: 'right' }}>
                                            <input
                                                className="form-control custom_text_width search"
                                                type="text"
                                                placeholder="Search"
                                                aria-label="Search"
                                                onKeyUp={this.searchApplicationDataKeyUp}
                                            />
                                        </div>

                                        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" width="100%">
                                            <thead>
                                                <tr onClick={() => this.handleSort('category')}>
                                                    <th>Category Name</th>
                                                    <th>Sub Category Name</th>
                                                    <th>Image</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.categorydata.length > 0 ? (
                                                        <>
                                                            {
                                                                this.state.categorydata.map((data: any, index: any) =>
                                                                    <tr>
                                                                        <td>{data.category}</td>
                                                                       
                                                                            {
                                                                                data.parentCategory ? (
                                                                                    <td>{data.parentCategory}</td>
                                                                                ) : (
                                                                                    <td>N/A</td>
                                                                                )
                                                                            }
                                                                       
                                                                        <td>
                                                                            {
                                                                                data.imagePath != null ? (
                                                                                    <div className="img-size">
                                                                                        {
                                                                                            data.imagePath ? (
                                                                                                <div>
                                                                                                    <img className="table-picture" src={constant.filepath + data.imagePath} />
                                                                                                    {/* <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i> */}
                                                                                                </div>
                                                                                            ) : (null)
                                                                                        }
                                                                                    </div>
                                                                                ) : (
                                                                                        <div>
                                                                                            <i className="fa fa-user picture"></i>
                                                                                            {/* <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i> */}
                                                                                        </div>
                                                                                    )
                                                                            }
                                                                        </td>
                                                                        <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                                        <td className="action">
                                                                            <span className="padding">
                                                                                <i className="fa fa-eye" onClick={() => this.viewCategory(data.categoryId)}></i>
                                                                                <i className="fas fa-edit" onClick={() => this.editCategory(data.categoryId)}></i>
                                                                                <i className="far fa-trash-alt" onClick={() => this.deleteCategory(data.categoryId)}></i>
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
                                        {this.state.categorydata.length > 0 ? (
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

export default Category;
