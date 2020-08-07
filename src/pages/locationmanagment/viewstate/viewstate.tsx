import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
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
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/location.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class ViewState extends React.Component<{ history: any,location:any }> {

    state = {
        statename: "",
        countryname: ""
      };

    async componentDidMount() {
        document.title = constant.viewStateTitle + utils.getAppName();
        const stateId = this.props.location.pathname.split("/")[2];
        if (stateId !== undefined) {
          const obj = {
            id: stateId,
          };
          const getStateById: any = await API.getStateById(obj);
          console.log("getStateById", getStateById);
    
          if(getStateById) {
              if (getStateById.status === 200) {
                this.setState({
                  countryname: this.state.countryname =
                    getStateById.resultObject.countryName,
                    statename: this.state.statename =
                    getStateById.resultObject.stateName
                });
              } else {
                const msg1 = getStateById.message;
                utils.showError(msg1);
              }
          } else {
            const msg1 = "Internal server error";
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
                                                <h1>View State Details</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/state">
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
                                                    <Label htmlFor="state_name"><b>State Name</b></Label>
        <p>{this.state.statename}</p>
                                                </FormGroup>
                                            </Col>
                                    
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect"><b>Country name</b></Label>
        <p>{this.state.countryname}</p>
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

export default ViewState;
