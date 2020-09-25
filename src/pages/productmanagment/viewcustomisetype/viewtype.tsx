import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
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
import {ProductAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getDataByIdRequest, addProdcutTypeStateRequest } from "../../../modelController";

class ViewProductType extends React.Component<{ history: any; location: any }> {
  productCustomiseState : addProdcutTypeStateRequest= constant.productCustomisePage.state;
  state = {
    typeName: this.productCustomiseState.typeName,
    isActive: this.productCustomiseState.isActive
  };

  constructor(props: any) {
    super(props);
    this.getCustomiseTypeById = this.getCustomiseTypeById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.productCustomisePage.title.viewTypeTitle + utils.getAppName();
    const productCustomiseTypeId = this.props.location.pathname.split("/")[2];
    if (productCustomiseTypeId !== undefined) {
      this.getCustomiseTypeById(productCustomiseTypeId);
    }
  }

  async getCustomiseTypeById(productCustomiseTypeId: any) {
    const obj:getDataByIdRequest = {
      id: productCustomiseTypeId,
    };
    const getCustomiseTypeById: any = await ProductAPI.getCustomiseTypeById(
      obj
    );
    console.log("getCustomiseTypeById", getCustomiseTypeById);

    if (getCustomiseTypeById) {
      if(getCustomiseTypeById.status === 200) {
      this.setState({
        typeName: this.state.typeName =
          getCustomiseTypeById.resultObject.typeName,
        isActive: this.state.isActive =
          getCustomiseTypeById.resultObject.isActive
      });
    } else {
      const msg1 = getCustomiseTypeById.message;
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
                        <h1>
                          {
                            constant.productCustomisePage
                              .viewProductCustomiseTypedetails
                              .viewProductCustomiseTypeDetails
                          }
                        </h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/list-type">
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
                                constant.productCustomisePage
                                  .productCustomiseTypeTableColumn.typename
                              }
                            </b>
                          </Label>
                          <p>{this.state.typeName}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>
                              {
                                constant.productCustomisePage
                                  .productCustomiseTypeTableColumn.isActive
                              }
                            </b>
                          </Label>
                          <p>{this.state.isActive === true ? 'True' : 'False'}</p>
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

export default ViewProductType;
