import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";

import constant from "../../../../constant/constant";
import { SettingAPI } from "../../../../service/index.service";
import { getDataByIdRequest, addSettingStateRequest } from "../../../../modelController";

class ViewPopularCity extends React.Component<{ history: any; location: any }> {

    /** Setting State */
    settingState : addSettingStateRequest = constant.settingPage.state;
    state = {
      identifier: this.settingState.identifier,
      identifiererror: this.settingState.identifiererror,
      value: this.settingState.value,
      valueerror: this.settingState.valueerror,
      isActive: this.settingState.isActive,
      updateTrue: this.settingState.updateTrue,
      settingid:this.settingState.settingid
    };
  
    /** Constructor call */
  constructor(props: any) {
    super(props);
    this.getSettingById = this.getSettingById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.settingPage.viewsettingdetails.viewpopularcity + utils.getAppName();
    const settingId = this.props.location.pathname.split("/")[2];
    if (settingId !== undefined) {
        this.getSettingById(settingId);
        this.setState({
          updateTrue: this.state.updateTrue = true
        })
      }
  }

  async getSettingById(settingId: any) {
    const obj:getDataByIdRequest = {
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
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
    <h1>{constant.settingPage.viewsettingdetails.viewpopularcity}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-popular-city">
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
                            <b>
                              {
                                constant.settingPage.settingTableColumn.identifier
                              }
                            </b>
                          </Label>
                          <p>{this.state.identifier}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>{constant.settingPage.settingTableColumn.value}</b>
                          </Label>
                          <p>{this.state.value}</p>
                        </FormGroup>
                      </Col>
                    </Row>
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

export default ViewPopularCity;
