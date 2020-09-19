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

import {ProductAPI} from "../../../service/index.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import {
  productCustomiseTypeCreateRequest, productCustomiseTypeUpdateRequest, getDataByIdRequest, addProdcutTypeStateRequest,
} from "../../../modelController";

class AddProductType extends React.Component<{ history: any; location: any }> {
    productCustomiseState : addProdcutTypeStateRequest = constant.productCustomisePage.state;
  state = {
   typeName:this.productCustomiseState.typeName,
   typeNameerror: this.productCustomiseState.typeNameerror,
    updateTrue: this.productCustomiseState.updateTrue,
    typeid: this.productCustomiseState.typeid,
    isActive: this.productCustomiseState.isActive
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCustomiseType = this.addCustomiseType.bind(this);
    this.updateCustomiseType = this.updateCustomiseType.bind(this);
    this.getCustomiseTypeById = this.getCustomiseTypeById.bind(this);
  }

  async componentDidMount() {
    const profuctCustomiseTypeId = this.props.location.pathname.split("/")[2];
    if (profuctCustomiseTypeId !== undefined) {
      this.getCustomiseTypeById(profuctCustomiseTypeId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.productCustomisePage.title.updateTypeTitle + utils.getAppName();
    } else {
      document.title =
      constant.productCustomisePage.title.addTypeTitle + utils.getAppName();
    }
  }

  async getCustomiseTypeById(profuctCustomiseTypeId: any) {
    const obj:getDataByIdRequest = {
      id: profuctCustomiseTypeId,
    };
    const getCustomiseTypeById: any = await ProductAPI.getCustomiseTypeById(obj);
    console.log("getCustomiseTypeById", getCustomiseTypeById);

    if (getCustomiseTypeById) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        typeName: this.state.typeName = getCustomiseTypeById.resultObject.typeName,
        typeid: this.state.typeid = getCustomiseTypeById.resultObject.productCustomizeTypeId,
        isActive: this.state.isActive = getCustomiseTypeById.resultObject.isActive
      });
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  handleChange(checked: boolean) {
    this.setState({ isActive: this.state.isActive = checked });
  }

  validate() {
    let typeNameerror = "";

    if (!this.state.typeName) {
        typeNameerror = "please enter product customise type name";
    }

    if (typeNameerror) {
      this.setState({ typeNameerror });
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

  async addCustomiseType() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        typeNameerror: "",
      });
      if (this.state.typeName && this.state.isActive) {
        const obj: productCustomiseTypeCreateRequest = {
          typeName: this.state.typeName,
          isActive: this.state.isActive
        };
        const addCustomiseType = await ProductAPI.addCustomiseType(obj);
        console.log("addCustomiseType", addCustomiseType);

        if (addCustomiseType) {
          this.props.history.push("/list-type");
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async updateCustomiseType() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        typeNameerror: "",
      });
      if (this.state.typeName && this.state.isActive) {
        const obj: productCustomiseTypeUpdateRequest = {
            productCustomizeTypeId:this.state.typeid,
          typeName: this.state.typeName,
          isActive: this.state.isActive
        };
        const editCustomiseProduct = await ProductAPI.editCustomiseProduct(obj);
        console.log("editCustomiseProduct", editCustomiseProduct);

        if (editCustomiseProduct) {
          this.props.history.push("/list-type");
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.productCustomisePage.title.updateTypeTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.productCustomisePage.title.addTypeTitle}</h1>
                        </Col>
                      )}
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
                          <Label htmlFor="typename">
                            {constant.productCustomisePage.productCustomiseTypeTableColumn.typename}
                          </Label>
                          <Input
                            type="text"
                            id="typename"
                            name="typeName"
                            className="form-control"
                            value={this.state.typeName}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your role name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.typeNameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <label>
                      <span>{constant.productCustomisePage.productCustomiseTypeTableColumn.isActive}</span>
                          <br />
                          <div style={{ marginTop: "10px" }}>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.isActive}
                            />
                          </div>
                        </label>
                      </Col>
                    </Row>
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateCustomiseType}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addCustomiseType}
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

export default AddProductType;
