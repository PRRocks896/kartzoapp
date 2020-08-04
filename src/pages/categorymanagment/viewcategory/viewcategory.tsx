import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
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
import API from '../../../service/category.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class ViewCategory extends React.Component<{ history: any, location: any }> {

    state = {
        category: "",
        file: null,
        sortorder: "",
        parentCategory:''
    };

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
    }

    async componentDidMount() {
        document.title = constant.viewCategoryTitle + utils.getAppName();

        const categoryId = this.props.location.pathname.split('/')[2];
        if (categoryId !== undefined) {
            const obj = {
                id: categoryId
            }
            const getCategoryById: any = await API.getCategoryById(obj);
            console.log("getCategoryById", getCategoryById);

            if (getCategoryById.resultObject != null) {
                this.setState({
                    category: this.state.category = getCategoryById.resultObject.category,
                    sortorder: this.state.sortorder = getCategoryById.resultObject.sortOrder,
                    file: this.state.file = getCategoryById.resultObject.imagePath,
                    parentCategory:this.state.parentCategory = getCategoryById.resultObject.parentCategory?getCategoryById.resultObject.parentCategory:''
                })
            } else {
                const msg1 = "Error";
                utils.showError(msg1);
            }
        }

    }

    render() {
        return (
            <>
                <NavBar>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>View Category Details</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/category">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                    >
                                                        Back
                                    </Button>
                                                </Link>
                                            </Col>
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="category_name"><b>Category Name</b></Label>
                                                    <p>{this.state.category}</p>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="category_name"><b>Sub Category Name</b></Label>
                                                    {
                                                        this.state.parentCategory === '' ? (
                                                            <p>N/A</p>
                                                        ) : (
                                                            <p>{this.state.parentCategory}</p>
                                                        )
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="category_name"><b>Sort Order</b></Label>
                                                    <p>{this.state.sortorder}</p>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    <p style={{ fontSize: '16px' }}><b>Category Image</b></p>
                                                    {
                                                        this.state.file != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.file ? (
                                                                        <div>
                                                                            <img className="picture" src={constant.filepath + this.state.file} />
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
                                                </FormGroup>
                                            </Col>
                                        </Row>
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

export default ViewCategory;
