import React from "react";
import API from "../../service/service";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import utils from "../../utils";
import './resetpassword.css';

class ResetPassword extends React.Component<{ location: any,history:any }> {
  state = {
    password: "",
    passwordError: "",
  };
  /** First Constructor Call */
  constructor(props: any) {
    super(props);
    this.ResetPassword = this.ResetPassword.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  /** first this method call */
  componentDidMount() {
    console.log("query=", this.props.location.pathname.split("/")[2].split('=')[1]);
  }

  /** validation of reset form */
  validate = () => {
    let passwordError = "";

    if (this.state.password) {
      passwordError = "please enter reset password";
    }

    if (passwordError) {
      this.setState({ passwordError });
      return false;
    }
    return true;
  };

  /** onChange event  */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Reset password  */
  async ResetPassword() {
    const obj = {
      guid: this.props.location.pathname.split("/")[2].split('=')[1],
      password: this.state.password,
    };
    var resetPassword = await API.resetPassword(obj);
    console.log("resetPassword", resetPassword);

    if (resetPassword.data.resultObject === true) {
      const msg = "Password Reset Suucessfully";
      utils.showSuccess(msg);
      this.props.history.push("/login");
  } else {
      const msg1 = "Error";
      utils.showError(msg1);
  }
  }

  render() {
    return (
      <div className="mainclass">
        <div className="main-box">
          <Card>
            <CardHeader>
              <strong className="maincontent">Reset Password</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <div className="box">
                  <FormGroup>
                    <Label htmlFor="resetpassword">ResetPassword</Label>
                    <Input
                      type="password"
                      name="password"
                      id="defaultFormRegisterPasswordEx"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.handleChangeEvent}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordError}
                    </div>
                  </FormGroup>
                </div>
              </Row>
              <Button
                type="button"
                className="mb-2 mr-2 custom-button"
                color="primary"
                onClick={this.ResetPassword}
                disabled={!this.state.password}
              >
                Reset
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
