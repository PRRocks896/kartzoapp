import React from "react";
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
import { API, RoleAPI } from "../../service/index.service";
import constant from "../../constant/constant";
import {
  profileGetRequest, addProfileStateRequest,
} from "../../modelController/index";
import EventEmitter from "../../event";

interface User {
  userId: number;
}

class Profile extends React.Component {

  /** profile state */
  profileState : addProfileStateRequest = constant.profilePage.state;
  state = {
    selectedFile: this.profileState.selectedFile,
    firstname: this.profileState.firstname,
    firstnameerror: this.profileState.firstnameerror,
    lastname: this.profileState.lastname,
    lastnameerror: this.profileState.lastnameerror,
    email: this.profileState.email,
    emailerror: this.profileState.emailerror,
    mobilenumber: this.profileState.mobilenumber,
    mobilenumbererror: this.profileState.mobilenumbererror,
    selectedFileerror: this.profileState.selectedFileerror,
    role: this.profileState.role,
    roleerror: this.profileState.roleerror,
    roleid: this.profileState.roleid,
    roleiderror: this.profileState.roleiderror,
    userid: this.profileState.userid,
    userrole: this.profileState.userrole,
    updateTrue: this.profileState.updateTrue,
    filetrue: this.profileState.filetrue,
    file: this.profileState.file
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.Profile = this.Profile.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
  }

  /** page render call */
  async componentDidMount() {
    document.title = constant.profileTitle + utils.getAppName();
    this.getUserRole();
    this.getUserById();
  }

  /** get user by id */
  async getUserById() {
    var user = localStorage.getItem("user");
    if (user) {
      let profile: User = JSON.parse(user);
      const obj: profileGetRequest = {
        id: profile.userId,
      };
      JSON.parse(user);
      const getProfile = await API.getProfile(obj);
      // console.log("getprofile", getProfile);

      if (getProfile) {
        if(getProfile.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          filetrue: this.state.filetrue = true,
          userid: this.state.userid = getProfile.resultObject.userId,
          firstname: this.state.firstname = getProfile.resultObject.firstName,
          lastname: this.state.lastname = getProfile.resultObject.lastName,
          mobilenumber: this.state.mobilenumber = getProfile.resultObject.phone,
          selectedFile: this.state.selectedFile = getProfile.resultObject.photo,
          file: this.state.file = getProfile.resultObject.photoPath
        });
      } else {
        const msg1 = getProfile.message;
          utils.showError(msg1);
      }
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

  /** Get user role */
  async getUserRole() {
    const getUserRole = await RoleAPI.getUserRole();
    // console.log("getUserRole", getUserRole);

    if (getUserRole) {
      if (getUserRole.resultObject != null) {
        this.setState({
          userrole: this.state.userrole = getUserRole.resultObject
        })

      } else {
        const msg1 = getUserRole.explanation;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /**
   * 
   * @param event : role select
   */
  onItemSelect(event: any) {
    if (event.target.value === "User") {
      this.setState({
        role:  event.target.value,
        roleid:  1,
      });
    } else {
      this.setState({
        role: event.target.value,
        roleid: 2,
      });
    }
  }

  /** check validate or not */
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
    
    const mobile:any = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    if (!this.state.mobilenumber) {
      mobilenumbererror = "please enter mobile number";
    } else if(!mobile.test(this.state.mobilenumber)) {
      mobilenumbererror = "please enter valid mobile number";
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

  /**
   * 
   * @param event : update state value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** profile */
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

        let formData = new FormData();
        // console.log('File in formData: ', this.state.selectedFile[0]);
        formData.append('id', this.state.userid.toString());
        formData.append('firstName', this.state.firstname);
        formData.append('lastName', this.state.lastname);
        formData.append('phone', this.state.mobilenumber.toString());
        formData.append('files', this.state.selectedFile[0]);
        formData.append('userId', '0');

        const updateProfile = await API.updateProfile(formData);
        // console.log("updateProfile", updateProfile);

        if (updateProfile) {
          if(updateProfile.status === 200) {
            const msg1 = updateProfile.message;
            utils.showSuccess(msg1);
            const users: any = localStorage.getItem("user");
            let user = JSON.parse(users);
            user.firstName = updateProfile.resultObject.firstName;
            user.lastName =  updateProfile.resultObject.lastName;
            localStorage.setItem("user",JSON.stringify(user));
          this.getUserById();
          this.setState({
            file:this.state.file = updateProfile.resultObject.photoPath ? updateProfile.resultObject.photoPath : '',
            firstname: this.state.firstname = updateProfile.resultObject.firstName ? updateProfile.resultObject.firstName : '',
            lastname: this.state.lastname = updateProfile.resultObject.lastName ? updateProfile.resultObject.lastName : '',
          })
          EventEmitter.dispatch('imageUpload', this.state.file);
          EventEmitter.dispatch('firstname', this.state.firstname);
          EventEmitter.dispatch('lastname', this.state.lastname);
        } else {
          const msg1 = updateProfile.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /**
   * 
   * @param event : file upload
   */
  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: this.state.filetrue = false,
        selectedFile: this.state.selectedFile = event.target.files
      })
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = ev => {
        this.setState({
          file: reader.result
        })
      }
    } else {
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
  }

  /** Remove Icon */
  removeIcon() {
    this.setState({
      file: this.state.file = '',
    });
    EventEmitter.dispatch('imageUpload', this.state.file);
  }

  /** Render DOM */
  render() {
    return (
      <>
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <strong>{constant.profilePage.profile.profile}</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          {this.state.file !== '' ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  {this.state.filetrue === true ? (
                                    <img
                                      className="picture"
                                      src={constant.filepath + this.state.file}
                                    />
                                  ) : (
                                      <img
                                        className="picture"
                                        src={this.state.file}
                                      />
                                    )}
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
                                  <b>{constant.profilePage.profile.userimage}</b>
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
                          <Label htmlFor="first_name">{constant.profilePage.profile.firstname}</Label>
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
                          <Label htmlFor="last_name">{constant.profilePage.profile.lastname}</Label>
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
                          <Label htmlFor="mobile_no">{constant.profilePage.profile.mobilenumber}</Label>
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
                      {constant.button.update}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </>
      </>
    );
  }
}

export default Profile;
