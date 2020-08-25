import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import NavBar from "../../../navbar/navbar";
import {CategoryAPI, TaxAPI} from "../../../../service/index.service";
import constant from "../../../../constant/constant";

class ViewTax extends React.Component<{ history: any; location: any }> {
  taxState = constant.taxPage.state;
  state = {
    mainCategoryId: this.taxState.mainCategoryId,
    mainCategoryIderror: this.taxState.mainCategoryIderror,
    taxName: this.taxState.taxName,
    taxNameerror: this.taxState.taxNameerror,
    percentage: this.taxState.percentage,
    percentageerror: this.taxState.percentageerror,
    isActive: this.taxState.isActive,
    updateTrue: this.taxState.updateTrue,
    taxId: this.taxState.taxId,
    categorydata: this.taxState.categorydata,
    categoryname: this.taxState.categoryname,
  };

  constructor(props: any) {
    super(props);
    this.getTaxById = this.getTaxById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.taxPage.viewtaxdetails.viewtax + utils.getAppName();

    const taxId = this.props.location.pathname.split("/")[2];
    if (taxId !== undefined) {
        this.getTaxById(taxId);
    }
  }

  async getTaxById(taxId: any) {
    const obj = {
      id: taxId
    };
    const getTaxById: any = await TaxAPI.getTaxById(obj);
    console.log("getTaxById", getTaxById);

    if (getTaxById.status === 200) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        categoryname: this.state.categoryname =
          getTaxById.resultObject.categoryName,
        taxId: this.state.taxId = getTaxById.resultObject.taxId,
        taxName: this.state.taxName = getTaxById.resultObject.taxName,
        percentage: this.state.percentage = getTaxById.resultObject.percentage,
        isActive: this.state.isActive = getTaxById.resultObject.isActive,
      });
    } else {
      const msg1 = getTaxById.message;
      utils.showError(msg1);
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
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
    <h1>{constant.taxPage.title.viewtaxTitle}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                       className="search_right"
                      >
                        <Link to="/list-tax">
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
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.taxPage.taxTableColumn.categoryname
                              }
                            </b>
                          </Label>
                          <p>{this.state.categoryname}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.taxPage.taxTableColumn.taxname
                              }
                            </b>
                          </Label>
                            <p>{this.state.taxName}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                          <b>{
                                constant.taxPage.taxTableColumn.percentage
                              }</b>
                          </Label>
                          <p>{this.state.percentage}%</p>
                        </FormGroup>
                      </Col>
                
                    </Row>
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

export default ViewTax;
