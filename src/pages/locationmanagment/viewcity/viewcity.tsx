import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Input,
  Col,
  Form,
  CustomInput,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import API from "../../../service/location.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";

class ViewCity extends React.Component<{ history: any; location: any }> {
  state = {
    statename: "",
    cityname: "",
  };

  async componentDidMount() {
    document.title = constant.viewCityTitle + utils.getAppName();
    const cityId = this.props.location.pathname.split("/")[2];
    if (cityId !== undefined) {
      const obj = {
        id: cityId,
      };
      const getCityById: any = await API.getCityById(obj);
      console.log("getCityById", getCityById);

      if (getCityById.status === 200) {
        this.setState({
          statename: this.state.statename = getCityById.resultObject.stateName,
          cityname: this.state.cityname = getCityById.resultObject.cityName,
        });
      } else {
        const msg1 = getCityById.message;
        utils.showError(msg1);
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
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>View City Details</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        style={{ textAlign: "right" }}
                      >
                        <Link to="/city">
                          <Button
                            type="button"
                            size="sm"
                            color="primary"
                            className="mb-2 mr-2 custom-button"
                          >
                            Back
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="city_name">
                            <b>City Name</b>
                          </Label>
                          <p>{this.state.cityname}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>State Name</b>
                            </Label>
                            <p>{this.state.statename}</p>
                          </FormGroup>
                        </Form>
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

export default ViewCity;
