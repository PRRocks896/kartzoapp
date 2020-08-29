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
  CustomInput,
  Form,
  Row,
} from "reactstrap";
import NavBar from "../../../navbar/navbar";
import {
  FeeAPI,
  PayoutAPI,
  MerchantAPI,
  MatrixAPI,
} from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import {
  feeCreateRequest,
  feeUpdateRequest,
} from "../../../../modelController";
import {
  payoutCreateRequest,
  payoutUpdateRequest,
} from "../../../../modelController/payoutModel";
import "./addmatrix.css";

class AddMatrix extends React.Component<{ history: any; location: any }> {
  matrixState = constant.matrixPage.state;
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
    feetypeid: this.matrixState.feetypeid,
  };

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addClick = this.addClick.bind(this);
    this.addMatrix = this.addMatrix.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getFee = this.getFee.bind(this);
    this.matrixUI = this.matrixUI.bind(this);
    this.removeClick = this.removeClick.bind(this);
    this.getMatrixById = this.getMatrixById.bind(this);
    this.updateMatrix = this.updateMatrix.bind(this);
    this.handleChangeFee = this.handleChangeFee.bind(this);
    // this.removeString = this.removeString.bind(this);
  }

  addClick() {
    this.setState((prevState: any) => ({
      addflag: this.state.addflag = true,
      matrix: [...prevState.matrix, { to: "", from: "", fee: "" }],
    }));
  }

  removeClick(i: number) {
    let matrix = [...this.state.matrix];
    matrix.splice(i, 1);
    this.setState({ matrix });
    console.log("remove matrix", this.state.matrix);
    if (this.state.matrix.length === 2) {
      this.setState({
        addflag: this.state.addflag = false,
      });
    } else {
      this.setState({
        addflag: this.state.addflag = true,
      });
    }
  }

  async componentDidMount() {
    const matrixId = this.props.location.pathname.split("/")[2];
    if (matrixId !== undefined) {
      this.getMatrixById(matrixId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
        matrixId: this.state.matrixId = matrixId,
      });
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.matrixPage.title.updatematrixTitle + utils.getAppName();
    } else {
      document.title =
        constant.matrixPage.title.addMatrixTitle + utils.getAppName();
    }
    this.getFee();
  }

  async getMatrixById(matrixId: any) {
    const obj = {
      id: matrixId,
    };
    const getMatrixById: any = await MatrixAPI.getMatrixById(obj);
    console.log("getMatrixById", getMatrixById);

    if (getMatrixById) {
      if (getMatrixById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          feetype: this.state.feetype = getMatrixById.resultObject.feeType,
          matrix: this.state.matrix = getMatrixById.resultObject.fees,
          feetypeid: this.state.feetypeid =
            getMatrixById.resultObject.feeTypeId,
        });
        if (this.state.matrix.length > 1) {
          this.setState({
            addflag: this.state.addflag = true,
          });
        }
      } else {
        const msg1 = getMatrixById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  onItemSelect(event: any) {
    this.setState({
      feetype: this.state.feetype = event.target.value,
    });
  }

  async getFee() {
    const getFee: any = await FeeAPI.getFee();
    console.log("getFee", getFee);
    if (getFee) {
      if (getFee.status === 200) {
        this.setState({
          feedata: this.state.feedata = getFee.resultObject,
        });
      } else {
        const msg1 = getFee.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  validate() {
    let feetypeerror = "";

    if (!this.state.feetype) {
      feetypeerror = "please select fee type";
    }

    if (feetypeerror) {
      this.setState({ feetypeerror });
      return false;
    }
    return true;
  }

  handleChange(i: number, e: any) {
    const { name, value } = e.target;
    let matrix = [...this.state.matrix];
    if(value>=0 && value<=100) {
      matrix[i] = { ...matrix[i], [name]: parseInt(value) };
      this.setState({ matrix });
    }
  }

  // removeString(e:any) {
  //   console.log("e",e);
  //   const charCode = (e.which) ? e.which : e.keyCode;
  //   if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43 ||
  //     charCode === 44 || charCode === 46 || charCode === 47 || charCode === 61) {
  //     return false;
  //   }
  //   return true;
  // }

  handleChangeFee(i: number, e: any) {
    const { name, value } = e.target;
    let matrix = [...this.state.matrix];
      matrix[i] = { ...matrix[i], [name]: parseInt(value) };
      this.setState({ matrix });
  }

  

  matrixUI() {
    return this.state.matrix.map((el, i) => (
      <Row key={i}>
        <Col xs="12" sm="12" md="3" lg="3" xl="3">
          <FormGroup>
            <Input
              type="number"
              id="to"
              name="to"
              className="form-control"
              value={el.to || ""}
              placeholder={constant.matrixPage.matrixTableColumn.to}
              onChange={this.handleChange.bind(this, i)}
              required
            />
            {/* <div className="mb-4 text-danger">
              {this.state.merchantOrderAmounterror}
            </div> */}
          </FormGroup>
        </Col>
        <Col xs="12" sm="12" md="3" lg="3" xl="3">
          <FormGroup>
            <Input
              type="number"
              id="from"
              name="from"
              className="form-control"
              value={el.from || ""}
              placeholder={constant.matrixPage.matrixTableColumn.from}
              onChange={this.handleChange.bind(this, i)}
              required
            />
            {/* <div className="mb-4 text-danger">
              {this.state.merchantOrderAmounterror}
            </div> */}
          </FormGroup>
        </Col>
        <Col xs="12" sm="12" md="3" lg="3" xl="3">
          <FormGroup>
            <Input
              type="number"
              id="fee"
              name="fee"
              className="form-control"
              value={el.fee || ""}
              placeholder={constant.matrixPage.matrixTableColumn.fee}
              onChange={this.handleChangeFee.bind(this, i)}
              required
            />
            {/* <div className="mb-4 text-danger">
              {this.state.merchantOrderAmounterror}
            </div> */}
          </FormGroup>
        </Col>
        {this.state.addflag === true ? (
          <Col xs="12" sm="12" md="3" lg="3" xl="3">
            <FormGroup className="remove_icon">
              <i
                className="fas fa-trash-alt"
                onClick={this.removeClick.bind(this, i)}
              ></i>
              {/* <Button
                type="button"
                size="sm"
                color="primary"
                className="mb-2 mt-4 mr-2 custom-button"
                onClick={this.removeClick.bind(this, i)}
              >
                {constant.button.remove}
              </Button> */}
            </FormGroup>
          </Col>
        ) : (
          ""
        )}
      </Row>
    ));
  }

  async addMatrix() {
    console.log("feetype", this.state.feetype);
    console.log("matrix", this.state.matrix);

    const isValid = this.validate();
    if (isValid) {
      this.setState({
        feetypeerror: "",
      });
      let temparray: any = [];
      this.state.matrix.map((data: any, index: number) =>
        data.to !== 0 && data.from !== 0 && data.fee !== 0
          ? temparray.push(data)
          : ""
      );
      console.log("matrix updated", temparray);
      if (this.state.feetype && temparray.length > 0) {
        const obj = {
          feeTypeId: parseInt(this.state.feetype),
          fees: temparray,
        };

        const addMatrix = await MatrixAPI.addMatrix(obj);
        console.log("addMatrix", addMatrix);

        if (addMatrix) {
          if (addMatrix.status === 200) {
            const msg = addMatrix.message;
            utils.showSuccess(msg);
            this.props.history.push("/list-matrix");
          } else {
            const msg1 = addMatrix.message;
            utils.showError(msg1);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async updateMatrix() {
    console.log("feetype", this.state.feetype);
    console.log("matrix", this.state.matrix);

    const isValid = this.validate();
    if (isValid) {
      this.setState({
        feetypeerror: "",
      });
      let temparray: any = [];
      this.state.matrix.map((data: any, index: number) =>
        data.to !== 0 && data.from !== 0 && data.fee !== 0
          ? temparray.push(data)
          : ""
      );
      console.log("matrix updated", temparray);
      if (this.state.feetype && temparray.length > 0) {
        const obj = {
          distanceMatrixId: parseInt(this.state.matrixId),
          feeTypeId: this.state.feetypeid,
          fees: temparray,
        };

        const editMatrix = await MatrixAPI.editMatrix(
          obj,
          obj.distanceMatrixId
        );
        console.log("editMatrix", editMatrix);

        if (editMatrix) {
          if (editMatrix.status === 200) {
            const msg = editMatrix.message;
            utils.showSuccess(msg);
            this.props.history.push("/list-matrix");
          } else {
            const msg1 = editMatrix.message;
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
      <NavBar>
        <div className="ms-content-wrapper">
          <div className="row">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <Card>
                <CardHeader>
                  <Row>
                    {this.state.updateTrue === true ? (
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>{constant.matrixPage.title.updatematrixTitle}</h1>
                      </Col>
                    ) : (
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>{constant.matrixPage.title.addMatrixTitle}</h1>
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
                      <Form>
                        <FormGroup>
                          <Label for="exampleCustomSelect">
                            {
                              constant.matrixPage.matrixTableColumn
                                .selectfeetype
                            }
                          </Label>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="feetype"
                            onChange={this.onItemSelect}
                          >
                            {this.state.updateTrue === true ? (
                              <>
                                <option value={this.state.feetypeid}>
                                  {this.state.feetype}
                                </option>
                                {this.state.feedata.length > 0
                                  ? this.state.feedata.map(
                                      (data: any, index: any) => (
                                        <option key={index} value={data.value}>
                                          {data.name}
                                        </option>
                                      )
                                    )
                                  : ""}
                              </>
                            ) : (
                              <>
                                <option value="">
                                  {
                                    constant.matrixPage.matrixTableColumn
                                      .selectfeetype
                                  }
                                </option>
                                {this.state.feedata.length > 0
                                  ? this.state.feedata.map(
                                      (data: any, index: any) => (
                                        <option key={index} value={data.value}>
                                          {data.name}
                                        </option>
                                      )
                                    )
                                  : ""}
                              </>
                            )}
                          </CustomInput>
                          <div className="mb-4 text-danger">
                            {this.state.feetypeerror}
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                  {this.state.matrix[0].to !== 0 &&
                  this.state.matrix[0].from !== 0 &&
                  this.state.matrix[0].fee !== 0 ? (
                    <div className="add_icon">
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={this.addClick}
                      ></i>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addClick}
                      >
                        {constant.button.add}
                      </Button> */}
                  <div className="add_more">{this.matrixUI()}</div>
                  {/* <input
                      type="button"
                      value="add more"
                      onClick={this.addClick}
                    /> */}
                  {/* <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            {constant.payoutPage.payoutTableColumn.commision}
                          </Label>
                          <Input
                            type="number"
                            id="commission"
                            name="commission"
                            className="form-control"
                            value={this.state.commission}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your commision"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.commissionerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="description">{constant.payoutPage.payoutTableColumn.merchantamount}</Label>
                          <Input
                            type="number"
                            id="amount"
                            name="merchantOrderAmount"
                            className="form-control"
                            value={this.state.merchantOrderAmount}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your merchant order amount"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.merchantOrderAmounterror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="description">{constant.payoutPage.payoutTableColumn.merchantpayamount}</Label>
                          <Input
                            type="number"
                            id="paymentamount"
                            name="merchantPayAmount"
                            className="form-control"
                            value={this.state.merchantPayAmount}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your merchant pay amount"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.merchantPayAmounterror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row> */}

                  <div className="mt-3">
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateMatrix}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addMatrix}
                      >
                        {constant.button.Save}
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </NavBar>
    );
  }
}

export default AddMatrix;
