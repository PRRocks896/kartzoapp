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
import API from '../../../service/service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { categoryCreateRequest,categoryUpdateRequest } from '../../../modelController/categoryModel';

class AddCategory extends React.Component<{ history: any }> {

    state = {
        selectedFile: undefined,
        categoryname: '',
        categorynameerror: '',
        selectedFileerror: ''
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async componentDidMount() {
        document.title = constant.addCategoryTitle + utils.getAppName();
        
          // const getProfile = await API.getProfile();
        // console.log("getprofile",getProfile);
    }




    onChangeHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files[0].name
        })
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
                const obj : categoryCreateRequest = {
                    categoryname: this.state.categoryname,
                    selectedFile: this.state.selectedFile
                }

                const obj1 : categoryUpdateRequest = {
                    id:'',
                    categoryname: this.state.categoryname,
                    selectedFile: this.state.selectedFile
                }

                // const addCategory = await API.addCategory(obj);
                // console.log("addCategory",addCategory);

                // const editCategory = await API.editCategory(obj);
                // console.log("editCategory",editCategory);

                if (this.state.categoryname === obj.categoryname && this.state.selectedFile === obj.selectedFile) {
                    const msg = "Category Added Successfully";
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
            selectedFile: this.state.selectedFile = undefined
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
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Add Category</h1>
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
                                                    <Label htmlFor="category_name">Category Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="category_name"
                                                        name="categoryname"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
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
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{fontSize:'16px'}}>Category Image</p>
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

                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addCategory}
                                        >
                                            Save
                                    </Button>
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
