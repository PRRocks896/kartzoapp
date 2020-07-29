import React from "react";
import { Link } from "react-router-dom";
import utils from "../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import "./profile.css";
import NavBar from "../navbar/navbar";
import API from "../../service/service";
import RoleAPI from "../../service/role.service";
import constant from "../../constant/constant";
import {
  profileUpdateRequest,
  profileListRequest,
  profileGetRequest,
} from "../../modelController/profileModel";

interface User {
  userID: number;
}

class Profile extends React.Component {
  state = {
    selectedFile: [],
    firstname: "",
    firstnameerror: "",
    lastname: "",
    lastnameerror: "",
    email: "",
    emailerror: "",
    mobilenumber: "",
    mobilenumbererror: "",
    selectedFileerror: "",
    role: "",
    roleerror: "",
    roleid: 1,
    roleiderror: "",
    userid:0,
    userrole:[],
    updateTrue:false,
    file:null
  };

  constructor(props: any) {
    super(props);
    this.Profile = this.Profile.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
  }

  async componentDidMount() {
    document.title = constant.profileTitle + utils.getAppName();

    this.getUserRole();
    this.getUserById();

   

    // const getProfile : profileListRequest = [];
  }

  async getUserById() {
    var user = localStorage.getItem("user");
    if (user) {
      let profile: User = JSON.parse(user);
      console.log("getprofile", profile.userID);
      const obj: profileGetRequest = {
        id: profile.userID,
      };
      // JSON.parse(user);
      const getProfile = await API.getProfile(obj);
      console.log("getprofile", getProfile);

      if (getProfile.resultObject !== undefined) {
        this.setState({
          updateTrue:this.state.updateTrue = true,
          userid:this.state.userid = getProfile.resultObject.userID,
          firstname: this.state.firstname = getProfile.resultObject.firstName,
          lastname: this.state.lastname = getProfile.resultObject.lastName,
          mobilenumber: this.state.mobilenumber = getProfile.resultObject.phone,
          selectedFile: this.state.selectedFile = getProfile.resultObject.photo,
          file:this.state.file =  getProfile.resultObject.photoPath
        });
      } else {
        const msg1 = getProfile.explanation;
        utils.showError(msg1);
      }
    }
  }

  async getUserRole() {
    const getUserRole = await RoleAPI.getUserRole();
  console.log("getUserRole",getUserRole);

  if(getUserRole.resultObject != null) {
    this.setState({
      userrole : this.state.userrole = getUserRole.resultObject
    })

  } else {
    const msg1 = getUserRole.explanation;
    utils.showError(msg1);
}
}

  onItemSelect(event: any) {
    if (event.target.value === "User") {
      this.setState({
        role: this.state.role = event.target.value,
        roleid: this.state.roleid = 1,
      });
    } else {
      this.setState({
        role: this.state.role = event.target.value,
        roleid: this.state.roleid = 2,
      });
    }
  }

  validate() {
    let firstnameerror = "";
    let lastnameerror = "";
    let mobilenumbererror = "";
    let selectedFileerror = "";

    if (!this.state.firstname) {
      firstnameerror = "please enter firstname";
    }

    if (!this.state.lastname) {
      lastnameerror = "please enter lastname";
    }


    if (!this.state.mobilenumber) {
      mobilenumbererror = "please enter mobile number";
    }

    if (!this.state.selectedFile) {
      selectedFileerror = "please select file";
    }

    if (
      firstnameerror ||
      lastnameerror ||
      mobilenumbererror ||
      selectedFileerror
    ) {
      this.setState({
        firstnameerror,
        lastnameerror,
        mobilenumbererror,
        selectedFileerror
      });
      return false;
    }
    return true;
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async Profile() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        firstnameerror: "",
        lastnameerror: "",
        mobilenumbererror: "",
        selectedFileerror: ""
      });
      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.mobilenumber &&
        this.state.selectedFile
      ) {
        // const obj: profileUpdateRequest = {
        //   iD: this.state.userid,
        //   firstName: this.state.firstname,
        //   lastName: this.state.lastname,
        //   phone: this.state.mobilenumber,
        //   files: new Array(this.state.selectedFile),
        //   userId:0
        // };

        let formData = new FormData();    
        console.log('File in formData: ', this.state.selectedFile[0]);
        formData.append('iD', this.state.userid.toString());   
        formData.append('firstName', this.state.firstname);
        formData.append('lastName', this.state.lastname);
        formData.append('phone', this.state.mobilenumber.toString());
        formData.append('files', this.state.selectedFile[0]);
        formData.append('userId', '0');

        const updateProfile = await API.updateProfile(formData);
        console.log("updateProfile",updateProfile);

        if(updateProfile.resultObject !== null) {
          const msg = "Profile Updated Successfully";
          this.getUserById();
          utils.showSuccess(msg);
        } else {
          const msg1 = "Error";
            utils.showError(msg1);
        }


        // if (
        //   this.state.firstname === obj.firstname &&
        //   this.state.lastname === obj.lastname &&
        //   this.state.email === obj.email &&
        //   this.state.mobilenumber === obj.mobilenumber &&
        //   this.state.selectedFile === obj.selectedFile
        // ) {
         
        // } else {
        //   const msg1 = "Error";
        //   utils.showError(msg1);
        // }
      }
    }
  }

  onChangeHandler(event: any) {
    var fileArray = [];
    fileArray.push(event.target.files[0])
    this.setState({
      selectedFile: this.state.selectedFile = event.target.files,
    });
    // this.getUserById();
  }

  removeIcon() {
    this.setState({
      file: this.state.file = null,
    });
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
                    <strong>My Profile</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          {this.state.file != null ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  <img
                                    className="picture"
                                    src={constant.filepath + this.state.file}
                                  />
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="">
                              <p>
                                <b>User Image:</b>
                              </p>
                              <Label className="imag" for="file-input">
                                <i
                                  className="fa fa-upload fa-lg"
                                  style={{ color: "#20a8d8" }}
                                ></i>
                              </Label>
                              <Input
                                id="file-input"
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={this.onChangeHandler.bind(this)}
                              />
                            </div>
                          )}
                          <div className="text-danger">
                            {this.state.selectedFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
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
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
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
                    </Row>
                   
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
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
                    </Row>

                    <Button
                      type="button"
                      size="sm"
                      className="mb-2 mr-2 custom-button"
                      color="primary"
                      onClick={this.Profile}
                    >
                      Update
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

export default Profile;
