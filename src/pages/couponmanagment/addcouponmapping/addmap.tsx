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
import "./addmap.css";
import NavBar from "../../navbar/navbar";
import { CouponAPI, MerchantAPI } from "../../../service/index.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import { format } from "date-fns";
import { any } from "prop-types";
import moment from "moment";
import {
  couponCreateRequest,
  couponUpdateRequest,
} from "../../../modelController";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import * as _ from 'lodash';

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

class AddCouponMapping extends React.Component<{
  history: any;
  location: any;
}> {
  couponState = constant.couponPage.state;
  state: any = {
    items: [],
    selected: [],
    couponlistdata: [],
    merchantdata:[],
    selectedmerchantdata:[]
  };

  id2List: any = {
    droppable: "items",
    droppable2: "selected",
  };

  id4List: any = {
    droppable: "merchantdata",
    droppable4: "selectedmerchantdata",
  };

  constructor(props: any) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragMerchantEnd = this.onDragMerchantEnd.bind(this);
    this.getCouponList = this.getCouponList.bind(this);
    this.getMerchantList = this.getMerchantList.bind(this);
    // this.Profile = this.Profile.bind(this);

    // this.handleStart = this.handleStart.bind(this);
  }

  async componentDidMount() {
    document.title =
    constant.couponPage.title.addCouponMappingTitle + utils.getAppName();
    this.getCouponList();
    this.getMerchantList();
  }

  async getCouponList() {
    var getCouponList = await CouponAPI.getCouponList();
    console.log("getCouponList", getCouponList);

    if (getCouponList) {
      if (getCouponList.status === 200) {
        this.setState({
          items: this.state.items = getCouponList.resultObject,
        });
      } else {
        const msg1 = getCouponList.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async getMerchantList() {
    var getMerchantList = await MerchantAPI.getMerchantList();
    console.log("getMerchantList", getMerchantList);

    if (getMerchantList) {
      if (getMerchantList.status === 200) {
        this.setState({
          merchantdata: this.state.merchantdata = getMerchantList.resultObject
        });
      } else {
        const msg1 = getMerchantList.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  getList = (id: any) => this.state[this.id2List[id]];

  getMerchantListdata = (id: any) => this.state[this.id4List[id]];

  onDragEnd = (result: any) => {
    console.log("result", result);
    const { source, destination } = result;
    console.log("source", source);
    console.log("destination", destination);

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state: any = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      console.log("result", result);

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  onDragMerchantEnd = (result: any) => {
    console.log("result", result);
    const { source, destination } = result;
    console.log("source", source);
    console.log("destination", destination);

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const merchantdata = reorder(
        this.getMerchantListdata(source.droppableId),
        source.index,
        destination.index
      );

      let state: any = { merchantdata };

      if (source.droppableId === "droppable4") {
        state = { selectedmerchantdata: merchantdata };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getMerchantListdata(source.droppableId),
        this.getMerchantListdata(destination.droppableId),
        source,
        destination
      );
      console.log("result", result);

      this.setState({
        merchantdata: result.droppable,
        selectedmerchantdata: result.droppable4,
      });
    }
  };

  render() {
    let {items,
        selected,
        selectedmerchantdata,
        couponlistdata} = this.state;
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
                          <h1>{constant.couponPage.title.updateCouponTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.couponPage.title.addCouponTitle}</h1>
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
                        <Link to="/list-coupon-map">
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
                  <CardBody className="container">
                    <Row className="main_coupon merchnat">
                      <DragDropContext onDragEnd={this.onDragEnd}>
                        <div  >
                          <p className="drag_select">
                            Please drag left to right for add coupon
                          </p>
                          <Label>
                            <b>Coupon</b>
                          </Label>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                className="coupon"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {this.state.items.map(
                                  (item: any, index: any) => (
                                    <Draggable
                                      key={item.value}
                                      draggableId={item.value.toString()}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className="coupon_item"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                        >
                                          {item.name}
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                        {/* <div>
                          <img src={require('../../../assets/img/exchange.png')}/>
                        </div> */}
                        <div>
                          <p className="drag_select">
                            Please drag right to left for remove coupon
                          </p>
                          <Label>
                            <b>Selected Coupon</b>
                          </Label>
                          <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                              <div
                                className="coupon"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {_.map(selected, (
                                  (item: any, index: any) => (
                                    <Draggable
                                      key={item.value}
                                      draggableId={item.value.toString()}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className="coupon_item_green"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                        >
                                          {item.name}
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </DragDropContext>
                    </Row>
                    <Row className="main_coupon merchnat">
                      <DragDropContext onDragEnd={this.onDragMerchantEnd}>
                        <div>
                          <p className="drag_select">
                            Please drag left to right for add merchant
                          </p>
                          <Label>
                            <b>Merchant</b>
                          </Label>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                className="coupon"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {this.state.merchantdata.map(
                                  (item: any, index: any) => (
                                    <Draggable
                                      key={item.value}
                                      draggableId={item.value.toString()}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className="coupon_item"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                        >
                                          {item.name}
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                        <div>
                          <p className="drag_select">
                            Please drag right to left for remove merchant
                          </p>
                          <Label>
                            <b>Selected Merchant</b>
                          </Label>
                          <Droppable droppableId="droppable4">
                            {(provided, snapshot) => (
                              <div
                                className="coupon"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {_.map(selectedmerchantdata, (
                                  (item: any, index: any) => (
                                    <Draggable
                                      key={item.value}
                                      draggableId={item.value.toString()}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className="coupon_item_green"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                        >
                                          {item.name}
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </DragDropContext>
                    </Row>

                    {/* <Row>
                      <Col xs="12" sm="12" md="12" lg="6" xl="6">
                     
                      </Col>
                    </Row>

                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        // onClick={this.editCoupon}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        // onClick={this.addCoupon}
                      >
                        {constant.button.Save}
                      </Button>
                    )} */}
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

export default AddCouponMapping;
