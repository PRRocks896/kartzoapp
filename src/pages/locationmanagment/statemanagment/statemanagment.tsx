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
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/location.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class StateManagment extends React.Component<{ history: any }> {

    state = {
        selectedFile: null,
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
        this.deleteState = this.deleteState.bind(this);
        this.editState = this.editState.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.viewState = this.viewState.bind(this);
    }

    async componentDidMount() {
        document.title = constant.stateTitle + utils.getAppName();
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

    editState() {
        this.props.history.push('/editstate');
    }

    viewState() {
        this.props.history.push('/viewstate');
    }

    deleteState() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You should be remove state!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.value) {
                // var deleteState = await API.deleteState(id);
                const msg = "Your State has been deleted";
                utils.showSuccess(msg);
                // this.componentDidMount();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                const msg1 = "State is safe :";
                utils.showError(msg1);
            }
        })
    }

    render() {
        const data = ({
            columns: [
                {
                    label: 'State Name',
                    field: 'statename',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Country Name',
                    field: 'countryname',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows: [
                {
                    statename: 'Gujarat',
                    countryname: 'INDIA',
                    status: (<i className="fa fa-check"></i>),
                    action: (<span className="padding">
                        <i className="fa fa-eye" onClick={this.viewState}></i>
                        <i className="fas fa-edit" onClick={this.editState}></i>
                        <i className="far fa-trash-alt" onClick={this.deleteState}></i>
                    </span>)

                },
                {
                    statename: 'Rajshathan',
                    countryname: 'INDIA',
                    status: (<i className="fa fa-check"></i>),
                    action: (<span className="padding">
                        <i className="fa fa-eye" onClick={this.viewState}></i>
                        <i className="fas fa-edit" onClick={this.editState}></i>
                        <i className="far fa-trash-alt" onClick={this.deleteState}></i>
                    </span>)
                }
            ]
        })

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
                                            State Management
                                        </CardTitle>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <div className="right">
                                                    <Link to="/addstate">
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
                                        <MDBDataTable
                                            striped
                                            hover
                                            data={data}
                                        />
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
                                                        <Link to="/addstate">
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
                                        <br />
                                        <Table hover className="mb-0 table_responsive" bordered>
                                            <thead>
                                                <tr>
                                                    <th>State Name</th>
                                                    <th>Country Name</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>GUJRAT</td>
                                                    <td>INDIA</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.editState}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteState}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>RAJSHTHAN</td>
                                                    <td>INDIA</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.editState}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteState}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <div>
                                            <ul className="pagination" id="page-numbers">
                                                {pageDecrementBtn}
                                                {renderPageNumbers}
                                                {pageIncrementBtn}
                                            </ul>
                                        </div> */}
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

export default StateManagment;
