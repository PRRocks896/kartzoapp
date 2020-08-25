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
import NavBar from "../../../navbar/navbar";
import {FeeAPI} from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import { feeCreateRequest, feeUpdateRequest } from "../../../../modelController";

class AddFee extends React.Component<{ history: any; location: any }> {
    feeState = constant.feePage.state;
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
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.addFee = this.addFee.bind(this);
    this.updateFee = this.updateFee.bind(this);
    this.getFeeById = this.getFeeById.bind(this);
  }

  async componentDidMount() {
    const feeId = this.props.location.pathname.split("/")[2];
    if (feeId !== undefined) {
      this.getFeeById(feeId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.feePage.title.updatefeeTitle + utils.getAppName();
    } else {
      document.title =
      constant.feePage.title.addFeeTitle + utils.getAppName();
    }
  }

  async getFeeById(settingId: any) {
    const obj = {
      id: settingId,
    };
    const getFeeById: any = await FeeAPI.getFeeById(obj);
    console.log("getFeeById", getFeeById);

    if (getFeeById) {
      if (getFeeById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          name: this.state.name = getFeeById.resultObject.name,
          feeId: this.state.feeId = getFeeById.resultObject.feeId,
          description: this.state.description =
            getFeeById.resultObject.description,
          isActive: this.state.isActive = getFeeById.resultObject.isActive
        });
      } else {
        const msg1 = getFeeById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

//   handleChange(checked: boolean) {
//     this.setState({ isOpen: this.state.isOpen = checked });
//   }

  validate() {
    let nameerror = "";
    let descriptionerror = "";

    if (!this.state.name) {
        nameerror = "please enter name";
    }

    if (!this.state.description) {
        descriptionerror = "please enter description";
    }

    if (nameerror || descriptionerror) {
      this.setState({ nameerror,descriptionerror });
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

  async addFee() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        nameerror: "",
        descriptionerror: "",
      });
      if (this.state.name && this.state.description) {
        const obj: feeCreateRequest = {
         name: this.state.name,
         description: this.state.description,
         isActive: this.state.isActive
        };

        const addFee = await FeeAPI.addFee(obj);
        console.log("addFee", addFee);

        if (addFee) {
          if (addFee.status === 200) {
            const msg = addFee.message;
            utils.showSuccess(msg);
            this.props.history.push("/list-fee");
          } else {
            const msg1 = addFee.message;
            utils.showError(msg1);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async updateFee() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        nameerror: "",
        descriptionerror: "",
      });
      if (this.state.name && this.state.description) {
        const obj: feeUpdateRequest = {
        feeId: parseInt(this.state.feeId),
         name: this.state.name,
         description: this.state.description,
         isActive: this.state.isActive
        };

        const updateFee = await FeeAPI.updateFee(obj,obj.feeId);
        console.log("updateFee", updateFee);

        if (updateFee) {
          if (updateFee.status === 200) {
            const msg = updateFee.message;
            utils.showSuccess(msg);
            this.props.history.push("/list-fee");
          } else {
            const msg1 = updateFee.message;
            utils.showError(msg1);
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
                          <h1>{constant.feePage.title.updatefeeTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1>{constant.feePage.title.addFeeTitle}</h1>
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
                            {constant.feePage.feeTableColumn.name}
                          </Label>
                          <Input
                            type="text"
                            id="role_name"
                            name="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.nameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="description">{constant.feePage.feeTableColumn.description}</Label>
                          <Input
                            type="text"
                            id="description"
                            name="description"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your description"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.descriptionerror}
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
                        onClick={this.updateFee}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addFee}
                      >
                        {constant.button.Save}
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

export default AddFee;
