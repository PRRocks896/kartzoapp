import React from 'react';
import { Link } from 'react-router-dom';
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

class UserRoleToRights extends React.Component {

    // state = {
    //     count: '',
    //     currentPage: "1",
    //     items_per_page: "2",
    //     perpage: '',
    //     paginationdata: '',
    //     isFetch: false,
    //     data: '',
    //     allRecords: '',
    //     upperPageBound: "3",
    //     lowerPageBound: "0",
    //     pageBound: "3",
    //     isPrevBtnActive: 'disabled',
    //     isNextBtnActive: '',
    //     onClickPage: "1"
    // }

    // constructor(props: any) {
    //     super(props);
    //     // this.handleClick = this.handleClick.bind(this);
    //     this.btnIncrementClick = this.btnIncrementClick.bind(this);
    //     this.btnDecrementClick = this.btnDecrementClick.bind(this);

    // }


    // btnIncrementClick() {
    //     this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
    //     this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    //     let listid = this.state.upperPageBound + 1;
    //     this.setState({ currentPage: listid });
    // }

    // btnDecrementClick() {
    //     this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
    //     this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    //     let listid = this.state.upperPageBound - this.state.pageBound;
    //     this.setState({ currentPage: listid });
    // }


    render() {
        // var pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(this.state.count / this.state.items_per_page); i++) {
        //     pageNumbers.push(i);
        // }
        // var renderPageNumbers = pageNumbers.map(number => {
        //     if (number === 1 && this.state.currentPage === 1) {
        //         return (
        //             <li
        //                 key={number}
        //                 id={number}
        //                 className={this.state.currentPage === number ? 'active' : 'page-item'}
        //             >
        //                 <a className="page-link" onClick={this.handleClick}>{number}</a>
        //             </li>
        //         );
        //     }
        //     else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
        //         return (
        //             <li
        //                 key={number}
        //                 id={number}
        //                 className={this.state.currentPage === number ? 'active' : 'page-item'}
        //             >
        //                 <a className="page-link" id={number} onClick={this.handleClick}>{number}</a>
        //             </li>
        //         )
        //     }
        // });

        // let pageIncrementBtn = null;
        // if (pageNumbers.length > this.state.upperPageBound) {
        //     pageIncrementBtn =
        //         <li
        //             className='page-item'
        //         >
        //             <a
        //                 className='page-link'
        //                 onClick={this.btnIncrementClick}
        //             >
        //                 &hellip;
        //   </a>
        //         </li>
        // }

        // let pageDecrementBtn = null;
        // if (this.state.lowerPageBound >= 1) {
        //     pageDecrementBtn =
        //         <li
        //             className='page-item'
        //         >
        //             <a
        //                 className='page-link'
        //                 onClick={this.btnDecrementClick}
        //             >
        //                 &hellip;
        //   </a>
        //         </li>
        // }

        return (
            <>
                <NavBar>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card className="main-card mb-12">
                                    <CardHeader>
                                        <CardTitle
                                            className="font"
                                        >
                                            UserRoleToRights
                                            </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <div>
                                            <Row>
                                                <Col md="4">
                                                    <Form>
                                                        <FormGroup>
                                                            <Label for="exampleCustomSelect"><b>Select Role To Manage The All Rights:</b></Label>
                                                            <CustomInput
                                                                type="select"
                                                                id="exampleCustomSelect"
                                                                name="customSelect"
                                                            // onChange={this.onItemSelect}
                                                            >
                                                                <option value="">Select UserRole:</option>
                                                                {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                            </CustomInput>
                                                        </FormGroup>
                                                    </Form>
                                                </Col>
                                                <Col md="8">
                                                    <div className="right">
                                                        <Link to="/">
                                                            <Button
                                                                className="mb-2 mr-2"
                                                                color="primary"
                                                            >
                                                                Export Details
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">

                                                    <Card className="main-card mb-8">
                                                        <CardHeader>
                                                            <CardTitle className="font">User Role To Right</CardTitle>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Table hover className="mb-0" bordered>
                                                                <thead>
                                                                    <tr>
                                                                        <th className="centers">
                                                                            <span>Name</span>
                                                                        </th>
                                                                        <th>All</th>
                                                                        <th>View</th>
                                                                        <th>Add</th>
                                                                        <th>Edit</th>
                                                                        <th>Delete</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        {/* <td className="centers">
                                                                                <CustomInput
                                                                                    // name={data.module}
                                                                                    // value={this.state.selectroledata[index]['_rowChecked'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                // id={data.id}
                                                                                // onChange={(e) => this.handleChange(data, 'row', e)}
                                                                                // checked={this.state.selectroledata[index]['_rowChecked'] == true}
                                                                                />
                                                                            </td> */}
                                                                        <td><span></span></td>

                                                                        <td className="centers">
                                                                            <CustomInput
                                                                                name="all"
                                                                                // value={this.state.selectroledata[index]['read'] == true ? 1 : 0}
                                                                                type="checkbox"
                                                                                // id={data.id + 'read'}
                                                                                data_type="read"
                                                                            // onChange={(e) => this.handleChange(data, 'read', e)}
                                                                            // checked={this.state.selectroledata[index]['read'] == true}
                                                                            />
                                                                        </td>
                                                                        <td className="centers">
                                                                            <CustomInput
                                                                                name="view"
                                                                                // value={this.state.selectroledata[index]['write'] == true ? 1 : 0}
                                                                                type="checkbox"
                                                                                // id={data.id + 'write'}
                                                                                data_type="write"
                                                                            // onChange={(e) => this.handleChange(data, 'write', e)}
                                                                            // checked={this.state.selectroledata[index]['write'] == true}
                                                                            />
                                                                        </td>
                                                                        <td className="centers">
                                                                            <CustomInput
                                                                                name="add"
                                                                                // value={this.state.selectroledata[index]['delete'] == true ? 1 : 0}
                                                                                type="checkbox"
                                                                                // id={data.id + 'delete'}
                                                                                data_type="delete"
                                                                            // onChange={(e) => this.handleChange(data, 'delete', e)}
                                                                            // checked={this.state.selectroledata[index]['delete'] == true}
                                                                            />
                                                                        </td>
                                                                        <td className="centers">
                                                                            <CustomInput
                                                                                name="edit"
                                                                                // value={this.state.selectroledata[index]['import'] == true ? 1 : 0}
                                                                                type="checkbox"
                                                                                // id={data.id + 'import'}
                                                                                data_type="import"
                                                                            // onChange={(e) => this.handleChange(data, 'import', e)}
                                                                            // checked={this.state.selectroledata[index]['import'] == true}
                                                                            />
                                                                        </td>
                                                                        <td className="centers">
                                                                            <CustomInput
                                                                                name="delete"
                                                                                // value={this.state.selectroledata[index]['read'] == true ? 1 : 0}
                                                                                type="checkbox"
                                                                                // id={data.id + 'read'}
                                                                                data_type="read"
                                                                            // onChange={(e) => this.handleChange(data, 'read', e)}
                                                                            // checked={this.state.selectroledata[index]['read'] == true}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Button
                                                    className="mb-2 mr-2"
                                                    color="primary"
                                                    style={{margin:'15px'}}
                                                >
                                                    Save
                                                </Button>
                                            </Row>
                                        </div>
                                        <br />
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

export default UserRoleToRights;