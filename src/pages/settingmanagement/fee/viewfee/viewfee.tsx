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
import {FeeAPI } from "../../../../service/index.service";
import { getDataByIdRequest, addFeeStateRequest } from "../../../../modelController";

class ViewFee extends React.Component<{ history: any; location: any }> {
    feeState : addFeeStateRequest= constant.feePage.state;
    state = {
      name: this.feeState.name,
      nameerror: this.feeState.nameerror,
      description: this.feeState.description,
      descriptionerror: this.feeState.descriptionerror,
      isActive: this.feeState.isActive,
      updateTrue: this.feeState.updateTrue,
      feeId:this.feeState.feeId
    };
  
  constructor(props: any) {
    super(props);
    this.getFeeById = this.getFeeById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.feePage.viewfeedetails.viewfee + utils.getAppName();
    const feeId = this.props.location.pathname.split("/")[2];
    if (feeId !== undefined) {
        this.getFeeById(feeId);
        this.setState({
          updateTrue: this.state.updateTrue = true
        })
      }
  }

  async getFeeById(feeId: any) {
    const obj:getDataByIdRequest = {
      id: feeId,
    };
    const getFeeById: any = await FeeAPI.getFeeById(obj);
    console.log("getFeeById", getFeeById);

    if (getFeeById) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        name: this.state.name = getFeeById.resultObject.name,
        feeId: this.state.feeId = getFeeById.resultObject.feeId,
        description: this.state.description =
          getFeeById.resultObject.description,
        isActive: this.state.isActive = getFeeById.resultObject.isActive
      });
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
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
    <h1>{constant.feePage.title.viewfeeTitle}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-fee">
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
                                constant.feePage.feeTableColumn.name
                              }
                            </b>
                          </Label>
                          <p>{this.state.name}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>{constant.feePage.feeTableColumn.description}</b>
                          </Label>
                          <p>{this.state.description}</p>
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

export default ViewFee;
