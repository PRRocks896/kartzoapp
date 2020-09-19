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
import {
  MatrixAPI,
} from "../../../../service/index.service";
import { getDataByIdRequest, addMatrixStateRequest } from "../../../../modelController";

class ViewMatrix extends React.Component<{ history: any; location: any }> {
  matrixState: addMatrixStateRequest= constant.matrixPage.state;
  state = {
    isActive: this.matrixState.isActive,
    updateTrue: this.matrixState.updateTrue,
    matrixId: this.matrixState.matrixId,
    matrix: this.matrixState.matrix,
    feedata: this.matrixState.feedata,
    feetype: this.matrixState.feetype,
    feetypeerror: this.matrixState.feetypeerror,
    addflag: this.matrixState.addflag,
    to: this.matrixState.matrix,
  };

  constructor(props: any) {
    super(props);
    this.getMatrixById = this.getMatrixById.bind(this);
    // this.getMerchantById = this.getMerchantById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.matrixPage.viewMatrixdetails.viewMatrix + utils.getAppName();
    const matrixId = this.props.location.pathname.split("/")[2];
    if (matrixId !== undefined) {
      this.getMatrixById(matrixId);
    }
  }

  async getMatrixById(payoutId: any) {
    const obj:getDataByIdRequest = {
      id: payoutId,
    };
    const getMatrixById: any = await MatrixAPI.getMatrixById(obj);
    console.log("getMatrixById", getMatrixById);

    if (getMatrixById) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        feetype: this.state.feetype = getMatrixById.resultObject.feeType,
        matrix: this.state.matrix = getMatrixById.resultObject.fees,
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
                        <h1>{constant.matrixPage.title.viewmatrixTitle}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-matrix">
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
                              {constant.matrixPage.matrixTableColumn.feeType}:
                            </b>
                          </Label>
                          <span className="ml-5">{this.state.feetype}</span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>{constant.matrixPage.matrixTableColumn.fee}:</b>
                          </Label>
                          {
                            this.state.matrix && this.state.matrix.length > 0 ? (
                              <div className="ml-5">
                              <table
                                id="dtBasicExample"
                                className="table table-striped table-bordered table-sm text-center"
                                width="100%"
                              >
                                <thead>
                                  <tr>
                                    <th>To</th>
                                    <th>From</th>
                                    <th>Fee</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.matrix.length > 0 ? (
                                    <>
                                      {this.state.matrix.map(
                                        (data: any, index: any) => (
                                          <tr key={index}>
                                            <td>{data.to} </td>
                                            <td>{data.from} </td>
                                            <td>{data.fee} </td>
                                          </tr>
                                        )
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </tbody>
                              </table>
                            </div>
                            ) : (
                              <div className="ml-5">
                              <h3>{constant.noDataFound.nodatafound}</h3>
                              </div>
                            )
                          }
                     
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

export default ViewMatrix;
