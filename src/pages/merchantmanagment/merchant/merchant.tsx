import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Col,
    FormGroup,
    Label,
    CustomInput,
    Form,
    Row,
} from 'reactstrap';
import './merchant.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/merchant.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { Editor } from '@tinymce/tinymce-react';
import { merchantCreateRequest, merchantUpdateRequest } from '../../../modelController/merchantModel';

class Merchant extends React.Component<{ history: any }> {

    state = {
        selectedFile: {},
        selectedProofFile: {},
        selectedDocumentFile: {},
        firstname: '',
        firstnameerror: '',
        lastname: '',
        lastnameerror: '',
        email: '',
        emailerror: '',
        mobilenumber: '',
        mobilenumbererror: '',
        shopname: '',
        shopnamerror: '',
        address: '',
        addresserror: '',
        city: '',
        cityerror: '',
        user: '',
        usererror: '',
        zipcode: '',
        zipcodeerror: '',
        latitude: '',
        latitudeerror: '',
        longitude: '',
        longitudeerror: '',
        website: '',
        shoppingpolicy: '',
        shoppingpolicyerror: '',
        refundpolicy: '',
        refundpolicyerror: '',
        cancellationpolicy: '',
        cancellationpolicyerror: '',
        isOpen: false,
        checked: false,
        selectedFileerror: '',
        selectedProofFileerror: '',
        selectedDocumentFileerror: ''

    }

    constructor(props: any) {
        super(props);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.addMerchant = this.addMerchant.bind(this);
        this.onChangeIDProof = this.onChangeIDProof.bind(this);
        this.onChangeDocumentHandler = this.onChangeDocumentHandler.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleEditorMainChange = this.handleEditorMainChange.bind(this);
        this.handleEditorUpChange = this.handleEditorUpChange.bind(this);
        this.removeDocumentIcon = this.removeDocumentIcon.bind(this);
        this.removeProofIcon = this.removeProofIcon.bind(this);
    }


    handleChange(checked: boolean) {
        this.setState({ isOpen: this.state.isOpen = checked });
    }

    async componentDidMount() {
        document.title = constant.merchantManagement + utils.getAppName();

        // const getProfile = await API.getProfile();
        // console.log("getprofile",getProfile);
    }

    onUserSelect(event: any) {
        this.setState({
            user: this.state.user = event.target.value
        })
    }

    onItemSelect(event: any) {
        this.setState({
            city: this.state.city = event.target.value
        })
    }

    onChangeHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files[0].name
        })
    }

    onChangeIDProof(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedProofFile: this.state.selectedProofFile = event.target.files[0].name
        })
    }

    onChangeDocumentHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedDocumentFile: this.state.selectedDocumentFile = event.target.files[0].name
        })
    }

    handleEditorChange = (content: any, editor: any) => {
        console.log('handleEditorChange Content was updated:', content);
        this.setState({
            refundpolicy: this.state.refundpolicy = content
        })

    }

    handleEditorMainChange = (content: any, editor: any) => {
        console.log('handleEditorMainChange Content was updated:', content);
        this.setState({
            shoppingpolicy: this.state.shoppingpolicy = content
        })
    }

    handleEditorUpChange = (content: any, editor: any) => {
        console.log('handleEditorMainChange Content was updated:', content);
        this.setState({
            cancellationpolicy: this.state.cancellationpolicy = content
        })
    }

    validate() {
        let firstnameerror = "";
        let lastnameerror = "";
        let emailerror = "";
        let mobilenumbererror = "";
        let selectedFileerror = "";
        let selectedDocumentFileerror = "";
        let selectedProofFileerror = "";
        let latitudeerror = "";
        let longitudeerror = "";
        let shopnamerror = "";
        let shoppingpolicyerror = "";
        let refundpolicyerror = "";
        let cancellationpolicyerror = "";
        let usererror = "";
        let cityerror = "";
        let addresserror = "";
        let zipcodeerror = "";

        if (!this.state.firstname) {
            firstnameerror = "please enter firstname";
        }

        if (!this.state.lastname) {
            lastnameerror = "please enter lastname";
        }

        if (!this.state.zipcode) {
            zipcodeerror = "please enter zipcode";
        }


        if (!this.state.address) {
            addresserror = "please enter address";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "please enter valid email";
        }

        if (!this.state.mobilenumber) {
            mobilenumbererror = "please enter mobile number";
        }

        if (!this.state.selectedDocumentFile) {
            selectedDocumentFileerror = "please select document image";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select shop image";
        }

        if (!this.state.selectedProofFile) {
            selectedProofFileerror = "please select proof image";
        }

        if (!this.state.latitude) {
            latitudeerror = "please enter latitude";
        }

        if (!this.state.longitude) {
            longitudeerror = "please enter longitude";
        }

        if (!this.state.shopname) {
            shopnamerror = "please enter shop name";
        }

        if (!this.state.shoppingpolicy) {
            shoppingpolicyerror = "please enter shopping policy";
        }

        if (!this.state.refundpolicy) {
            refundpolicyerror = "please enter refund policy";
        }

        if (!this.state.cancellationpolicy) {
            cancellationpolicyerror = "please enter cancellation policy";
        }

        if (!this.state.user) {
            usererror = "please select user";
        }

        if (!this.state.city) {
            cityerror = "please select city";
        }


        if (firstnameerror || lastnameerror || addresserror || zipcodeerror || emailerror || mobilenumbererror || selectedDocumentFileerror || selectedFileerror || selectedProofFileerror || latitudeerror || longitudeerror || shopnamerror || shoppingpolicyerror || cancellationpolicyerror || refundpolicyerror || usererror || cityerror) {
            this.setState({ firstnameerror, lastnameerror, addresserror, zipcodeerror, emailerror, mobilenumbererror, selectedDocumentFileerror, selectedFileerror, selectedProofFileerror, latitudeerror, longitudeerror, shopnamerror, shoppingpolicyerror, cancellationpolicyerror, refundpolicyerror, usererror, cityerror });
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

    async addMerchant() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                firstnameerror: '',
                lastnameerror: '',
                emailerror: '',
                mobilenumbererror: '',
                addresserror: '',
                zipcodeerror: '',
                selectedDocumentFileerror: '',
                selectedFileerror: '',
                selectedProofFileerror: '',
                latitudeerror: '',
                longitudeerror: '',
                shopnamerror: '',
                shoppingpolicyerror: '',
                refundpolicyerror: '',
                cancellationpolicyerror: '',
                usererror: '',
                cityerror: ''

            })
            if (this.state.firstname && this.state.lastname && this.state.email && this.state.mobilenumber && this.state.selectedFile && this.state.selectedDocumentFile && this.state.selectedProofFile && this.state.latitude && this.state.longitude) {

                const obj : merchantCreateRequest = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    selectedDocumentFile: this.state.selectedDocumentFile,
                    selectedProofFile: this.state.selectedProofFile,
                    selectedFile: this.state.selectedFile,
                    latitude:this.state.latitude,
                    longitude:this.state.longitude,
                    address:this.state.address,
                    zipcode:this.state.zipcode,
                    shopname:this.state.shopname,
                    shoppingpolicy:this.state.shoppingpolicy,
                    refundpolicy:this.state.refundpolicy,
                    cancellationpolicy:this.state.cancellationpolicy,
                    city:this.state.city,
                    user:this.state.user
                }

                const obj1 : merchantUpdateRequest = {
                    id:'',
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    selectedDocumentFile: this.state.selectedDocumentFile,
                    selectedProofFile: this.state.selectedProofFile,
                    selectedFile: this.state.selectedFile,
                    latitude:this.state.latitude,
                    longitude:this.state.longitude,
                    address:this.state.address,
                    zipcode:this.state.zipcode,
                    shopname:this.state.shopname,
                    shoppingpolicy:this.state.shoppingpolicy,
                    refundpolicy:this.state.refundpolicy,
                    cancellationpolicy:this.state.cancellationpolicy,
                    city:this.state.city,
                    user:this.state.user
                }

                // const addMerchant = await API.addMerchant(obj);
                // console.log("addMerchant",addMerchant);

                if (this.state.firstname === obj.firstname && this.state.lastname === obj.lastname && this.state.email === obj.email && this.state.mobilenumber === obj.mobilenumber 
                    && this.state.selectedFile === obj.selectedFile) {
                    const msg = "Merchant Added Successfully";
                    utils.showSuccess(msg);
                    // this.props.history.push('/users');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
    }

    removeIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
        this.setState({
            selectedFile: this.state.selectedFile = {}
        })
    }

    removeDocumentIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
        this.setState({
            selectedDocumentFile: this.state.selectedDocumentFile = {}
        })
    }

    removeProofIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
        this.setState({
            selectedProofFile: this.state.selectedProofFile = {}
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
                                                <h1>Merchant Management</h1>
                                            </Col>
                                            {/* <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/users">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                    >
                                                        Back
                                        </Button>
                                                </Link>
                                            </Col> */}
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="first_name">First Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="first_name"
                                                        name="firstname"
                                                        className="form-control"
                                                        value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your first name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.firstnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="last_name">Last Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="last_name"
                                                        name="lastname"
                                                        className="form-control"
                                                        value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your last name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.lastnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="email">E-Mail</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your email"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.emailerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no">Mobile Number</Label>
                                                    <Input
                                                        type="text"
                                                        id="mobile_no"
                                                        name="mobilenumber"
                                                        className="form-control"
                                                        value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your mobile number"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.mobilenumbererror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select City</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="city"
                                                            onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select City</option>
                                                            <option value="Rajkot">Rajkot</option>
                                                            <option value="Ahmedabad">Ahmedabad</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.cityerror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select User</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="user"
                                                            onChange={this.onUserSelect}
                                                        >
                                                            <option value="">Select User</option>
                                                            <option value="User-1">User-1</option>
                                                            <option value="User-2">User-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.usererror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="shopname">Shop Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="shopname"
                                                        name="shopname"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your shop name"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.shopnamerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Address">Address</Label>
                                                    <Input
                                                        type="text"
                                                        id="Address"
                                                        name="address"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your address"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.addresserror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="ZIP-Code">ZIP-Code</Label>
                                                    <Input
                                                        type="text"
                                                        id="ZIP-Code"
                                                        name="zipcode"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your zipe-code"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.zipcodeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Website">Website</Label>
                                                    <Input
                                                        type="text"
                                                        id="Website"
                                                        name="website"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your website"
                                                    />
                                                    {/* <div className="mb-4 text-danger">
                                                    {this.state.longitudeerror}
                                                </div> */}
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Latitude">Latitude</Label>
                                                    <Input
                                                        type="text"
                                                        id="Latitude"
                                                        name="latitude"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your latitude"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.latitudeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Longitude">Longitude</Label>
                                                    <Input
                                                        type="text"
                                                        id="Longitude"
                                                        name="longitude"
                                                        className="form-control"
                                                        // value={this.state.shopname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your longitude"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.longitudeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
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
                                                                    <p style={{ fontSize: '16px' }}>Shop Logo</p>
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
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedProofFile != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.selectedProofFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeProofIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>Merchant ID Proof</p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeIDProof.bind(this)}
                                                                    />

                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.selectedProofFileerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedDocumentFile != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.selectedDocumentFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeDocumentIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>Merchant Document</p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeDocumentHandler.bind(this)}
                                                                    />
                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.selectedDocumentFileerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <div>
                                                    <p style={{ fontSize: '16px' }}>Shipping Policy</p>
                                                    <input id="my-file1" type="file" name="my-file1" style={{display:'none'}}/>
                                                    <Editor
                                                        initialValue="<p>This is the initial content of the editor</p>"
                                                        init={{
                                                            height: 200,
                                                            menubar: false,
                                                            images_upload_credentials: true,
                                                            plugins: [
                                                                'advlist autolink lists link image code imagetools charmap print preview anchor',
                                                                'searchreplace visualblocks code fullscreen',
                                                                'insertdatetime media table paste code help wordcount'
                                                            ],
                                                            toolbar:
                                                                'undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help',
                                                            images_upload_handler: function (blobInfo: any, success: any, failure: any) {
                                                                setTimeout(function (blobInfo) {
                                                                    /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                                                    success();
                                                                }, 2000);
                                                            },
                                                            file_picker_callback: function (callback:any, value:any, meta:any) {
                                                                if (meta.filetype == 'image') {
                                                                    var input:any = document.getElementById('my-file1');
                                                                    input.click();
                                                                    input.onchange = function () {
                                                                        var file = input.files[0];
                                                                        var reader = new FileReader();
                                                                        reader.onload = function (e:any) {
                                                                            callback(e.target.result, {
                                                                                alt: file.name
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    };
                                                                }
                                                            }


                                                        }

                                                        }
                                                        onEditorChange={this.handleEditorMainChange}
                                                    />
                                                </div>
                                                <div className="text-danger">
                                                    {this.state.shoppingpolicyerror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <div>
                                                    <p style={{ fontSize: '16px' }}>Refund Policy</p>
                                                    <input id="my-file2" type="file" name="my-file2" style={{display:'none'}}/>
                                                    <Editor
                                                        initialValue="<p>This is the initial content of the editor</p>"
                                                        init={{
                                                            height: 200,
                                                            menubar: false,
                                                            images_upload_credentials: true,
                                                            plugins: [
                                                                'advlist autolink lists link image code imagetools charmap print preview anchor',
                                                                'searchreplace visualblocks code fullscreen',
                                                                'insertdatetime media table paste code help wordcount'
                                                            ],
                                                            toolbar:
                                                                'undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help',
                                                            images_upload_handler: function (blobInfo: any, success: any, failure: any) {
                                                                setTimeout(function (blobInfo) {
                                                                    /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                                                    success();
                                                                }, 2000);
                                                            },
                                                            file_picker_callback: function (callback:any, value:any, meta:any) {
                                                                if (meta.filetype == 'image') {
                                                                    var input:any = document.getElementById('my-file2');
                                                                    input.click();
                                                                    input.onchange = function () {
                                                                        var file = input.files[0];
                                                                        var reader = new FileReader();
                                                                        reader.onload = function (e:any) {
                                                                            callback(e.target.result, {
                                                                                alt: file.name
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    };
                                                                }
                                                            }
                                                        }
                                                        }
                                                        onEditorChange={this.handleEditorChange}
                                                    />
                                                </div>
                                                <div className="text-danger">
                                                    {this.state.refundpolicyerror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <div>
                                                    <p style={{ fontSize: '16px' }}>Cancellation Policy</p>
                                                    <input id="my-file3" type="file" name="my-file3" style={{display:'none'}}/>
                                                    <Editor
                                                        initialValue="<p>This is the initial content of the editor</p>"
                                                        init={{
                                                            height: 200,
                                                            menubar: false,
                                                            images_upload_credentials: true,
                                                            plugins: [
                                                                'advlist autolink lists link image code imagetools charmap print preview anchor',
                                                                'searchreplace visualblocks code fullscreen',
                                                                'insertdatetime media table paste code help wordcount'
                                                            ],
                                                            toolbar:
                                                                'undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help',
                                                            images_upload_handler: function (blobInfo: any, success: any, failure: any) {
                                                                setTimeout(function (blobInfo) {
                                                                    /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                                                    success();
                                                                }, 2000);
                                                            },
                                                            file_picker_callback: function (callback:any, value:any, meta:any) {
                                                                if (meta.filetype == 'image') {
                                                                    var input:any = document.getElementById('my-file3');
                                                                    input.click();
                                                                    input.onchange = function () {
                                                                        var file = input.files[0];
                                                                        var reader = new FileReader();
                                                                        reader.onload = function (e:any) {
                                                                            callback(e.target.result, {
                                                                                alt: file.name
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    };
                                                                }
                                                            }

                                                        }

                                                        }
                                                        onEditorChange={this.handleEditorUpChange}
                                                    />
                                                </div>
                                                <div className="text-danger">
                                                    {this.state.cancellationpolicyerror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: '20px' }}>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <label>
                                                    <span>IsOpen</span>
                                                    <br />
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Switch
                                                            onChange={this.handleChange}
                                                            checked={this.state.isOpen}
                                                        />
                                                    </div>
                                                </label>
                                            </Col>

                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mt-3 mr-2 custom-button"
                                            onClick={this.addMerchant}
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

export default Merchant;
