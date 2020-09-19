import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import {LocationAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getDataByIdRequest, stateStatesRequest } from "../../../modelController";

class ViewState extends React.Component<{ history: any; location: any }> {
  stateState : stateStatesRequest = constant.statePage.state;
  state = {
    statename: this.stateState.statename,
    countryname: this.stateState.countryname,
  };

  async componentDidMount() {
    document.title =
      constant.statePage.title.viewStateTitle + utils.getAppName();
    const stateId = this.props.location.pathname.split("/")[2];
    if (stateId !== undefined) {
     this.getState(stateId);
    }
  }

  async getState(stateId:any) {
    const obj:getDataByIdRequest = {
      id: stateId,
    };
    const getStateById: any = await LocationAPI.getStateById(obj);
    console.log("getStateById", getStateById);

    if (getStateById) {
      this.setState({
        countryname: this.state.countryname =
          getStateById.resultObject.countryName,
        statename: this.state.statename =
          getStateById.resultObject.stateName,
      });
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
    <h1>{constant.statePage.title.stateTitle}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/state">
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
                          <Label htmlFor="state_name">
                            <b>
                              {constant.statePage.stateTableColumn.stateName}
                            </b>
                          </Label>
                          <p>{this.state.statename}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.statePage.stateTableColumn
                                    .countryName
                                }
                              </b>
                            </Label>
                            <p>{this.state.countryname}</p>
                          </FormGroup>
                        </Form>
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

export default ViewState;
