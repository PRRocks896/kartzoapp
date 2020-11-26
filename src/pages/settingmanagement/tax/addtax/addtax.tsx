import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Form,
  CustomInput,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { CategoryAPI, TaxAPI } from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import {
  taxCreateRequest,
  taxUpdateRequest,
  getDataByIdRequest,
  addTaxRequest,
} from "../../../../modelController";

class AddTax extends React.Component<{ history: any; location: any }> {

  /** tax state */
  taxState : addTaxRequest= constant.taxPage.state;
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

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addTax = this.addTax.bind(this);
    this.updateTax = this.updateTax.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getAllCategory = this.getAllCategory.bind(this);
    this.getTaxById = this.getTaxById.bind(this);
  }

  /** page render call */
  async componentDidMount() {
    this.getAllCategory();
    const taxId = this.props.location.pathname.split("/")[2];
    if (taxId !== undefined) {
      this.getTaxById(taxId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
      });
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.taxPage.title.updatetaxTitle + utils.getAppName();
    } else {
      document.title = constant.taxPage.title.addTaxTitle + utils.getAppName();
    }
  }

  /** get all caetgory data */
  async getAllCategory() {
    const getAllCategory = await CategoryAPI.getAllCategory();
    // console.log("getAllCategory", getAllCategory);
    if(getAllCategory) {
      if(getAllCategory.status === 200) {
      this.setState({
        categorydata: this.state.categorydata = getAllCategory.resultObject,
      });
    } else {
      const msg1 = getAllCategory.message;
        utils.showError(msg1);
    }
    } else {
      
    }
  }

  /**
   * 
   * @param taxId : tax id
   */
  async getTaxById(taxId: any) {
    const obj:getDataByIdRequest = {
      id: taxId,
    };
    const getTaxById: any = await TaxAPI.getTaxById(obj);
    // console.log("getTaxById", getTaxById);

    if(getTaxById) {
      if(getTaxById.status === 200) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        categoryname: this.state.categoryname =
          getTaxById.resultObject.categoryName,
        taxId: this.state.taxId = getTaxById.resultObject.taxId,
        taxName: this.state.taxName = getTaxById.resultObject.taxName,
        percentage: this.state.percentage = getTaxById.resultObject.percentage,
        isActive: this.state.isActive = getTaxById.resultObject.isActive,
        mainCategoryId: this.state.mainCategoryId = getTaxById.resultObject.mainCategoryId
      });
    } else {
      const msg1 = getTaxById.message;
        utils.showError(msg1);
    }
    } else {

    }
  }

  /**
   * 
   * @param event : catgeory id
   */
  onItemSelect(event: any) {
    this.setState({
      mainCategoryId: this.state.mainCategoryId =
        event.target.value,
    });
  }

  /** validate or not  */
  validate() {
    let mainCategoryIderror = "";
    let taxNameerror = "";
    let percentageerror = "";

    if (!this.state.mainCategoryId) {
      mainCategoryIderror = "please select main category";
    }

    if (!this.state.taxName) {
      taxNameerror = "please enter tax name";
    }

    const pRegex: any = /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0?0)?)$/;
    if (!this.state.percentage) {
      percentageerror = "please enter percentage";
    } else if (!pRegex.test(this.state.percentage)) {
      percentageerror = "please enter valid percentage";
    }

    // if (!this.state.percentage) {
    //   percentageerror = "please enter percentage";
    // }

    if (mainCategoryIderror || taxNameerror || percentageerror) {
      this.setState({ mainCategoryIderror, taxNameerror, percentageerror });
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

  /** Add tax */
  async addTax() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        mainCategoryIderror: "",
        taxNameerror: "",
        percentageerror: "",
      });
      if (
        this.state.mainCategoryId &&
        this.state.taxName &&
        this.state.percentage
      ) {
        const obj: taxCreateRequest = {
          mainCategoryId: parseInt(this.state.mainCategoryId),
          taxName: this.state.taxName,
          percentage: parseInt(this.state.percentage),
          isActive: this.state.isActive
        };

        const addTax = await TaxAPI.addTax(obj);
        // console.log("addTax", addTax);
        if (addTax) {
          if(addTax.status === 200) {
            const msg1 = addTax.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-tax");
        } else {
          const msg1 = addTax.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Update tax */
  async updateTax() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        mainCategoryIderror: "",
        taxNameerror: "",
        percentageerror: "",
      });
      if (
        this.state.mainCategoryId &&
        this.state.taxName &&
        this.state.percentage
      ) {
        const obj: taxUpdateRequest = {
          taxId: parseInt(this.state.taxId),
          mainCategoryId: parseInt(this.state.mainCategoryId),
          taxName: this.state.taxName,
          percentage: parseInt(this.state.percentage),
          isActive: this.state.isActive
        };

        const updateTax = await TaxAPI.updateTax(obj);
        // console.log("updateTax", updateTax);
        if (updateTax) {
          if(updateTax.status === 200) {
            const msg1 = updateTax.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-tax");
        } else {
          const msg1 = updateTax.message;
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
                          <h1 className="userbutton1">{constant.taxPage.title.updatetaxTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1 className="userbutton1">{constant.taxPage.title.addTaxTitle}</h1>
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
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {constant.taxPage.taxTableColumn.category}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                              value={this.state.mainCategoryId ? this.state.mainCategoryId : ''}
                            >
                              <option value="">
                                    {constant.taxPage.taxTableColumn.category}
                                  </option>
                                  {this.state.categorydata.length > 0
                                    ? this.state.categorydata.map(
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
                              {/* <option value="">
                                {constant.taxPage.taxTableColumn.category}
                              </option>
                              {this.state.categorydata.length > 0
                                ? this.state.categorydata.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""} */}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.mainCategoryIderror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            {constant.taxPage.taxTableColumn.taxname}
                          </Label>
                          <Input
                            type="text"
                            id="sortnumber"
                            name="taxName"
                            className="form-control"
                            value={this.state.taxName}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your tax name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.taxNameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            {constant.taxPage.taxTableColumn.percentage}
                          </Label>
                          <Input
                            type="number"
                            id="sortnumber"
                            name="percentage"
                            className="form-control"
                            value={this.state.percentage}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your percentage"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.percentageerror}
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
                        onClick={this.updateTax}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addTax}
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

export default AddTax;
