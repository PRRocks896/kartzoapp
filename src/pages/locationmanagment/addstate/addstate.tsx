import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Input,
  Col,
  Form,
  CustomInput,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import API from "../../../service/location.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import {
  stateCreateRequest,
  stateUpdateRequest,
} from "../../../modelController/stateModel";

class AddState extends React.Component<{ history: any; location: any }> {
  state = {
    selectedFile: "",
    statename: "",
    statenameerror: "",
    selectedFileerror: "",
    file: "",
    countryid: "",
    countryiderror: "",
    stateid: 0,
    countrylist: [],
    updateTrue: false,
    filetrue: false,
    countryname: "",
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addState = this.addState.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.editState = this.editState.bind(this);
  }

  async componentDidMount() {
    const stateId = this.props.location.pathname.split("/")[2];
    if (stateId !== undefined) {
      const obj = {
        id: stateId,
      };
      const getStateById: any = await API.getStateById(obj);
      console.log("getStateById", getStateById);

      if(getStateById) {
        if (getStateById.status === 200) {
          this.setState({
            updateTrue: this.state.updateTrue = true,
            filetrue: this.state.filetrue = true,
            statename: this.state.statename = getStateById.resultObject.stateName,
            countryid: this.state.countryid = getStateById.resultObject.countryId,
            countryname: this.state.countryname =
              getStateById.resultObject.countryName,
            stateid: this.state.stateid = getStateById.resultObject.stateId,
          });
        } else {
          const msg1 = getStateById.message;
          utils.showError(msg1);
        }
      } else {
        const msg1 = "Internal server error";
      utils.showError(msg1);
      }
    }

    const getCountry = await API.getCountry();
    console.log("getCountry", getCountry);

    if(getCountry) {
      if (getCountry.status === 200) {
        this.setState({
          countrylist: this.state.countrylist = getCountry.resultObject,
        });
      } else {
        const msg1 = "Error";
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }

    if (this.state.updateTrue === true) {
      document.title = constant.updateStateTitle + utils.getAppName();
    } else {
      document.title = constant.addStateTitle + utils.getAppName();
    }
  }

  validate() {
    let statenameerror = "";
    let countryiderror = "";

    if (!this.state.statename) {
      statenameerror = "please enter state name";
    }

    if (!this.state.countryid) {
      countryiderror = "please select country";
    }

    if (statenameerror || countryiderror) {
      this.setState({ statenameerror, countryiderror });
      return false;
    }
    return true;
  }

  onItemSelect(event: any) {
    this.setState({
      countryid: this.state.countryid = event.target.value,
    });
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async addState() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        statenameerror: "",
        countryiderror: "",
      });
      if (this.state.statename && this.state.countryid) {
        const obj: stateCreateRequest = {
          stateName: this.state.statename,
          countryId: JSON.parse(this.state.countryid),
          isActive: true,
        };

        const addState = await API.addState(obj);
        console.log("addState", addState);

        if(addState) {
          if (addState.status === 200) {
            const msg = addState.message;
            utils.showSuccess(msg);
            this.props.history.push("/state");
          } else {
            const msg = addState.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async editState() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        statenameerror: "",
        countryiderror: "",
      });
      if (this.state.statename && this.state.countryid && this.state.stateid) {
        const obj: stateUpdateRequest = {
          stateId: this.state.stateid,
          stateName: this.state.statename,
          countryId: JSON.parse(this.state.countryid),
          isActive: true,
        };

        const editState = await API.editState(obj, this.state.stateid);
        console.log("editState", editState);

        if(editState) {
          if (editState.status === 200) {
            const msg = editState.message;
            utils.showSuccess(msg);
            this.props.history.push("/state");
          } else {
            const msg = editState.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>Update State</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>Add State</h1>
                        </Col>
                      )}

                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        style={{ textAlign: "right" }}
                      >
                        <Link to="/state">
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
                          <Label htmlFor="state_name">State Name</Label>
                          <Input
                            type="text"
                            id="state_name"
                            name="statename"
                            className="form-control"
                            value={this.state.statename}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your state name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.statenameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              Select Country
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                            >
                              {this.state.updateTrue === true ? (
                                <>
                                  <option value="">
                                    {this.state.countryname}
                                  </option>
                                  {this.state.countrylist.length > 0
                                    ? this.state.countrylist.map(
                                        (data: any, index: any) => (
                                          <option
                                            key={index}
                                            value={data.value}
                                          >
                                            {data.name}
                                          </option>
                                        )
                                      )
                                    : ""}
                                </>
                              ) : (
                                <>
                                  <option value="">Select Country</option>
                                  {this.state.countrylist.length > 0
                                    ? this.state.countrylist.map(
                                        (data: any, index: any) => (
                                          <option
                                            key={index}
                                            value={data.value}
                                          >
                                            {data.name}
                                          </option>
                                        )
                                      )
                                    : ""}
                                </>
                              )}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.selectedFileerror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>

                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.editState}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addState}
                      >
                        Save
                      </Button>
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

export default AddState;
