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
import { API } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { addUserModelRequest, getDataByIdRequest } from "../../../modelController";
import './viewuser.css';

class ViewUser extends React.Component<{ history: any; location: any }> {
  userState : addUserModelRequest = constant.userPage.state;
  state = {
      firstname: this.userState.firstname,
      lastname: this.userState.lastname,
      email: this.userState.email,
      mobilenumber: this.userState.mobilenumber,
      file: null,
   
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    document.title = constant.userPage.title.viewUserTitle + utils.getAppName();
    const usderId = this.props.location.pathname.split("/")[2];
    if (usderId !== undefined) {
     this.getUser(usderId);
    }
  }

  async getUser(usderId:any) {
    const obj: getDataByIdRequest = {
      id: usderId,
    };
    const getUserById: any = await API.getUserById(obj);
    if (getUserById) {
      this.setState({
        firstname: getUserById.resultObject.firstName,
        lastname: getUserById.resultObject.lastName,
        email: getUserById.resultObject.email,
        mobilenumber: getUserById.resultObject.phone,
          file: getUserById.resultObject.photoPath,
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
                        <h1>{constant.userPage.viewuser.viewdetails}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/users">
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
                        <FormGroup className="view_user">
                          <div>
                          <Label htmlFor="first_name">
                            <b>{constant.userPage.userTableColumn.firstname} :</b>
                          </Label>
                          <span>{this.state.firstname}</span>
                          </div>
                          <div>
                          <Label htmlFor="last_name">
                            <b>{constant.userPage.userTableColumn.lastname} :</b>
                          </Label>
                          <span>{this.state.lastname}</span>
                          </div>
                          <div>
                          <Label htmlFor="email">
                            <b>{constant.userPage.userTableColumn.email} :</b>
                          </Label>
                          <span>{this.state.email}</span>
                          </div>
                          <div>
                          <Label htmlFor="mobile_no">
                            <b>
                              {constant.userPage.userTableColumn.mobilenumber} :
                            </b>
                          </Label>
                          <span>{this.state.mobilenumber}</span>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>{constant.userPage.userTableColumn.userimage} :</b>
                          </p>
                          <div>
                            {this.state.file != null ? (
                              <img
                                className="user_pic"
                                src={
                                  constant.filepath + this.state.file
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
                          </div>
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

export default ViewUser;
