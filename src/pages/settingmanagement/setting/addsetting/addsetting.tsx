import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
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
import { SettingAPI } from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import {
  settingCreateRequest,
  settingUpdateRequest,
  getDataByIdRequest,
  addSettingStateRequest,
} from "../../../../modelController";

class AddSetting extends React.Component<{ history: any; location: any }> {

  /** setting state */
  settingState: addSettingStateRequest = constant.settingPage.state;
  state = {
    identifier: this.settingState.identifier,
    identifiererror: this.settingState.identifiererror,
    value: this.settingState.value,
    valueerror: this.settingState.valueerror,
    isActive: this.settingState.isActive,
    updateTrue: this.settingState.updateTrue,
    settingid: this.settingState.settingid
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.addSetting = this.addSetting.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.getSettingById = this.getSettingById.bind(this);
  }

  /** page render call */
  async componentDidMount() {
    const settingId = this.props.location.pathname.split("/")[2];
    if (settingId !== undefined) {
      this.getSettingById(settingId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.settingPage.title.updatesettingTitle + utils.getAppName();
    } else {
      document.title =
        constant.settingPage.title.addSettingTitle + utils.getAppName();
    }
  }

  /**
   * 
   * @param settingId : setting id
   */
  async getSettingById(settingId: any) {
    const obj: getDataByIdRequest = {
      id: settingId,
    };
    const getSettingById: any = await SettingAPI.getSettingById(obj);
    // console.log("getSettingById", getSettingById);

    if (getSettingById) {
      if (getSettingById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          identifier: this.state.identifier = getSettingById.resultObject.identifier,
          settingid: this.state.settingid = getSettingById.resultObject.settingId,
          value: this.state.value =
            getSettingById.resultObject.value,
          isActive: this.state.isActive = getSettingById.resultObject.isActive
        });
      } else {
        const msg1 = getSettingById.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  //   handleChange(checked: boolean) {
  //     this.setState({ isOpen: this.state.isOpen = checked });
  //   }

  /** validate or not */
  validate() {
    let identifiererror = "";
    let valueerror = "";

    if (!this.state.identifier) {
      identifiererror = "please enter identifier";
    }

    if (!this.state.value) {
      valueerror = "please enter value";
    }

    if (identifiererror || valueerror) {
      this.setState({ identifiererror, valueerror });
      return false;
    }
    return true;
  }

  /**
   * 
   * @param event : update the value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** add setting */
  async addSetting() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        identifiererror: "",
        valueerror: "",
      });
      if (this.state.identifier && this.state.value) {
        const obj: settingCreateRequest = {
          identifier: this.state.identifier,
          value: this.state.value,
          isActive: this.state.isActive
        };

        const addSetting = await SettingAPI.addSetting(obj);
        // console.log("addSetting", addSetting);

        if (addSetting) {
          if (addSetting.status === 200) {
            const msg1 = addSetting.message;
            utils.showSuccess(msg1);
            this.props.history.push("/list-setting");
          } else {
            const msg1 = addSetting.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** update setting */
  async updateSetting() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        identifiererror: "",
        valueerror: "",
      });
      if (this.state.identifier && this.state.value) {
        const obj: settingUpdateRequest = {
          settingId: parseInt(this.state.settingid),
          identifier: this.state.identifier,
          value: this.state.value,
          isActive: this.state.isActive
        };

        const updateSetting = await SettingAPI.updateSetting(obj);
        // console.log("updateSetting", updateSetting);

        if (updateSetting) {
          if (updateSetting.status === 200) {
            const msg1 = updateSetting.message;
            utils.showSuccess(msg1);
            this.props.history.push("/list-setting");
          } else {
            const msg1 = updateSetting.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
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
                    <Row>
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1 className="userbutton1">{constant.settingPage.title.updatesettingTitle}</h1>
                        </Col>
                      ) : (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1 className="userbutton1">{constant.settingPage.title.addSettingTitle}</h1>
                          </Col>
                        )}
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="userbutton"
                      >
                        <Link to="/list-setting">
                          <Button
                            type="button"
                            size="sm"
                            color="primary"
                            className="mb-2 mr-2 custom-button"
                          >
                            {constant.button.back}
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            {constant.settingPage.settingTableColumn.identifier}
                          </Label>
                          <Input
                            type="text"
                            id="role_name"
                            name="identifier"
                            className="form-control"
                            value={this.state.identifier}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your identifier"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.identifiererror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">  {constant.settingPage.settingTableColumn.value}</Label>
                          <Input
                            type="text"
                            id="description"
                            name="value"
                            className="form-control"
                            value={this.state.value}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your value"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.valueerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateSetting}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                        <Button
                          type="button"
                          size="sm"
                          color="primary"
                          className="mb-2 mr-2 custom-button"
                          onClick={this.addSetting}
                        >
                          {constant.button.Save}
                        </Button>
                      )}
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

export default AddSetting;
