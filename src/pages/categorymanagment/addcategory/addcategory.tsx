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
import { categoryCreateRequest, categoryUpdateRequest } from '../../../modelController/categoryModel';

class AddCategory extends React.Component<{ history: any, location: any }> {

    state = {
        selectedFile: '',
        file: '',
        categoryname: '',
        categorynameerror: '',
        selectedFileerror: '',
        sortorder: 0,
        updateTrue: false,
        categoryid: 0
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
    }

    async componentDidMount() {
        const categoryId = this.props.location.pathname.split('/')[2];
        if (categoryId !== undefined) {
            const obj = {
                id: categoryId
            }
            const getCategoryById: any = await API.getCategoryById(obj);
            console.log("getCategoryById", getCategoryById);

            if (getCategoryById.resultObject != null) {
                this.setState({
                    updateTrue: this.state.updateTrue = true,
                    categoryname: this.state.categoryname = getCategoryById.resultObject.category,
                    categoryid: this.state.categoryid = getCategoryById.resultObject.categoryId,
                    file: this.state.file = getCategoryById.resultObject.imagePath,
                    sortorder:this.state.sortorder = getCategoryById.resultObject.sortOrder
                })
            } else {
                const msg1 = "Error";
                utils.showError(msg1);
            }
        }
        if (this.state.updateTrue === true) {
            document.title = constant.updateCategoryTitle + utils.getAppName();
        } else {
            document.title = constant.addCategoryTitle + utils.getAppName();
        }


        // const getProfile = await API.getProfile();
        // console.log("getprofile",getProfile);
    }



    onChangeHandler(event: any) {
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files
        })
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = ev => {
            this.setState({ 
                file: reader.result
            })
        }
    }

    validate() {
        let categorynameerror = "";
        let selectedFileerror = "";

        if (!this.state.categoryname) {
            categorynameerror = "please enter category name";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (categorynameerror || selectedFileerror) {
            this.setState({ categorynameerror, selectedFileerror });
            return false;
        }
        return true;
    };

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    async addCategory() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                categorynameerror: '',
                selectedFileerror: ''
            })
            if (this.state.categoryname && this.state.selectedFile) {
                const obj = {
                    categoryname: this.state.categoryname,
                    selectedFile: this.state.selectedFile
                }


                let formData = new FormData();

                formData.append('category', this.state.categoryname);
                formData.append('isActive', 'true');
                formData.append('parentCategoryId', '');
                formData.append('sortOrder', this.state.sortorder.toString());
                formData.append('files', this.state.selectedFile[0]);



                const addCategory = await API.addCategory(formData);
                console.log("addCategory", addCategory);


                if (addCategory.resultObject != null) {
                    const msg = "Category Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/category');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }


                // const editCategory = await API.editCategory(obj);
                // console.log("editCategory",editCategory);
            }
        };
    }

    async updateCategory() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                categorynameerror: '',
                selectedFileerror: ''
            })
            if (this.state.categoryname && this.state.selectedFile) {
                let formData = new FormData();
                formData.append('categoryId', this.state.categoryid.toString());
                formData.append('category', this.state.categoryname);
                formData.append('isActive', 'true');
                formData.append('parentCategoryId', '');
                formData.append('sortOrder', this.state.sortorder.toString());
                formData.append('files', this.state.selectedFile[0]);
                const editCategory = await API.editCategory(formData, this.state.categoryid.toString());
                console.log("editCategory", editCategory);
                if (editCategory.resultObject != null) {
                    const msg = "Category Updated Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/category');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
    }

    removeIcon() {
        this.setState({
            file: this.state.file = ''
        })
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
                                            {
                                                this.state.updateTrue === true ? (
                                                    <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                        <h1>Update Category</h1>
                                                    </Col>
                                                ) : (

                                                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                            <h1>Add Category</h1>
                                                        </Col>
                                                    )
                                            }

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
                                                    <Label htmlFor="category_name">Category Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="category_name"
                                                        name="categoryname"
                                                        className="form-control"
                                                        value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your category name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.categorynameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="category_name">Sort Order</Label>
                                                    <Input
                                                        type="number"
                                                        id="sortnumber"
                                                        name="sortorder"
                                                        className="form-control"
                                                        value={this.state.sortorder}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your sort order"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.file != '' ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.file ? (
                                                                        <div>
                                                                            {
                                                                                this.state.updateTrue === true ? (
                                                                                     <img className="picture" src={constant.filepath + this.state.file} />
                                                                                ) : (
                                                                                    <img className="picture" src={this.state.file} />
                                                                                )
                                                                            }
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>Category Image</p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeHandler.bind(this)}
                                                                    />

                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.selectedFileerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {
                                            this.state.updateTrue === true ? (

                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    color="primary"
                                                    className="mb-2 mr-2 custom-button"
                                                    onClick={this.updateCategory}
                                                >
                                                    Update
                                                </Button>
                                            ) : (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                        onClick={this.addCategory}
                                                    >
                                                        Save
                                                    </Button>
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

export default AddCategory;
