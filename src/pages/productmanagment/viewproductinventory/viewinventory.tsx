import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
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
} from 'reactstrap';
// import './adduser.css';

import API from '../../../service/user.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class ViewProductInventory extends React.Component<{ history: any }> {

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        document.title = constant.viewInventoryProduct + utils.getAppName();
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
                                                <h1>View Inventory Product Details</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/list-product-inventory">
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
                                                    <Label htmlFor="first_name"><b>Product Name</b></Label>
                                                    <p>Product-1</p>

                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name"><b>Product Qty</b></Label>
                                                    <p>1</p>

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

export default ViewProductInventory;
