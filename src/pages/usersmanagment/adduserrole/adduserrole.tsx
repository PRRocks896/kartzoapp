import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
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
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import API from "../../../service/role.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import {
  userRoleCreateRequest,
  userRoleUpdateRequest,
} from "../../../modelController/userRoleModel";

class AddUserRole extends React.Component<{ history: any,location:any }> {
  state = {
    rolename: "",
    rolenameerror: "",
    description: "",
    descriptionerror: "",
    isOpen: false,
    updateTrue:false,
    roleid:0
  };

  constructor(props: any) {
    super(props);
    // this.Profile = this.Profile.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUserRole = this.addUserRole.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
  }

  async componentDidMount() {
    const roleId = this.props.location.pathname.split('/')[2];
    if(roleId != undefined) {
      const obj = {
        id:roleId
      }
      const getRoleById:any = await API.getRoleById(obj);
      console.log("getRoleById",getRoleById);
      this.setState({
        updateTrue:this.state.updateTrue = true,
        rolename:this.state.rolename = getRoleById.resultObject.role,
        roleid:this.state.roleid = getRoleById.resultObject.roleId,
        description:this.state.description = getRoleById.resultObject.description,
        isOpen:this.state.isOpen = getRoleById.resultObject.isAdminRole
      })
    }
    if(this.state.updateTrue === true) {
      document.title = constant.updateRoleTitle + utils.getAppName();
    } else {
      document.title = constant.adduserRoleTitle + utils.getAppName();
    }
  }

  handleChange(checked: boolean) {
    this.setState({ isOpen: this.state.isOpen = checked });
  }

  validate() {
    let rolenameerror = "";
    let descriptionerror = "";

    if (!this.state.rolename) {
      rolenameerror = "please enter role name";
    }

    if (!this.state.description) {
      descriptionerror = "please enter description";
    }

    if (rolenameerror || descriptionerror) {
      this.setState({ rolenameerror, descriptionerror });
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

  async addUserRole() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        rolenameerror: "",
        descriptionerror: "",
      });
      if (this.state.rolename && this.state.description) {
        const obj: userRoleCreateRequest = {
          role: this.state.rolename,
          description: this.state.description,
          isActive: true,
          isAdminRole: this.state.isOpen,
        };

        console.log("userole", obj);

        const addUserRole = await API.addUserRole(obj);
        console.log("addUserRole", addUserRole);

        if (addUserRole.resultObject !== null) {
          const msg = "UserRole Added Successfully";
          utils.showSuccess(msg);
          this.props.history.push("/userrole");
        } else {
          const msg1 = "Error";
          utils.showError(msg1);
        }
      }
    }
  }

  async updateUserRole() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        rolenameerror: "",
        descriptionerror: "",
      });
      if (this.state.rolename && this.state.description) {
        const obj: userRoleUpdateRequest = {
          roleId:this.state.roleid,
          role: this.state.rolename,
          description: this.state.description,
          isActive: true,
          isAdminRole: this.state.isOpen,
        };
        console.log("userole", obj);

        const editUserRole = await API.editUserRole(obj);
        console.log("editUserRole",editUserRole);

        if (editUserRole.resultObject !== null) {
          const msg = "UserRole Updated Successfully";
          utils.showSuccess(msg);
          this.props.history.push("/userrole");
        } else {
          const msg1 = "Error";
          utils.showError(msg1);
        }
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
                      {
                        this.state.updateTrue === true ? (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>Update Role</h1>
                        </Col>
                        ) : (

                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>Add Role</h1>
                      </Col>
                        )
                      }
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        style={{ textAlign: "right" }}
                      >
                        <Link to="/userrole">
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
                          <Label htmlFor="role_name">Role Name</Label>
                          <Input
                            type="text"
                            id="role_name"
                            name="rolename"
                            className="form-control"
                            value={this.state.rolename}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your role name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.rolenameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">Description</Label>
                          <Input
                            type="textarea"
                            id="description"
                            name="description"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your description"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.descriptionerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <label>
                          <span>IsAdminRole</span>
                          <br />
                          <div style={{ marginTop: "10px" }}>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.isOpen}
                            />
                          </div>
                        </label>
                      </Col>
                    </Row>
                    {
                      this.state.updateTrue === true ? (
                    <Button
                      type="button"
                      size="sm"
                      color="primary"
                      className="mb-2 mr-2 custom-button"
                      onClick={this.updateUserRole}
                    >
                      Update
                    </Button>
                      ) : (
                        <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addUserRole}
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

export default AddUserRole;
