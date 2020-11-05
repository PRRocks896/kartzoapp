import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import "./addmap.css";
import { CouponAPI, MerchantAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as _ from "lodash";
import {
  addCouponStateRequest,
  addCouponMappingState,
  getDataByIdRequest,
  editCouponMappingState,
} from "../../../modelController";

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

  /** Coupon State */
  couponState: addCouponStateRequest = constant.couponPage.state;
  state: any = {
    items: this.couponState.items,
    selected: this.couponState.selected,
    couponlistdata: this.couponState.couponlistdata,

    mainCouponArray: this.couponState.mainCouponArray,
    selectedCouponArray: this.couponState.selectedCouponArray,
    tempCouponArray: this.couponState.tempCouponArray,

    tempMerchantArray: this.couponState.tempMerchantArray,

    merchantdata: this.couponState.merchantdata,
    selectedmerchantdata: this.couponState.selectedmerchantdata,
    offername: this.couponState.offername,
    offernameerror: this.couponState.offernameerror,
    couponselectedarray: this.couponState.couponselectedarray,
    merchantselectedarray: this.couponState.merchantselectedarray,
    updateTrue: false,
    couponmappingid: this.couponState.couponmappingid,
    isActive: this.couponState.isActive
  };

  id2List: any = {
    droppable: "mainCouponArray",
    droppable2: "selectedCouponArray",
  };

  id4List: any = {
    droppable: "merchantdata",
    droppable4: "selectedmerchantdata",
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragMerchantEnd = this.onDragMerchantEnd.bind(this);
    this.getCouponList = this.getCouponList.bind(this);
    this.getMerchantList = this.getMerchantList.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addCouponMapping = this.addCouponMapping.bind(this);
    this.editCouponMapping = this.editCouponMapping.bind(this);
  }

  /** Page Render Call */
  async componentDidMount() {
    this.getCouponList();
    this.getMerchantList();
    const couponId = this.props.location.pathname.split("/")[2];
    if (couponId !== undefined) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        couponmappingid: this.state.couponmappingid = couponId,
      });
      this.getCouponMappingById(couponId);
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.couponPage.title.updateCouponMappingTitle + utils.getAppName();
    } else {
      document.title =
        constant.couponPage.title.addCouponMappingTitle + utils.getAppName();
    }
  }

 /**
  * 
  * @param id : coupon mapping id
  */
  async getCouponMappingById(id: any) {
    const obj: getDataByIdRequest = {
      id: id,
    };
    const getCouponMappingById: any = await CouponAPI.getCouponMappingById(obj);
    // console.log("getCouponMappingById", getCouponMappingById);

    if (getCouponMappingById) {
      if (getCouponMappingById.status === 200) {
      const tarray: any = [];
      if(this.state.tempCouponArray && getCouponMappingById.resultObject.couponId) {
        this.state.tempCouponArray.map((value: any, index: number) => {
          if (getCouponMappingById.resultObject.couponId.includes(value.value)) {
            tarray.push(value);
            // console.log("tarray", tarray);
          }
        });
        this.setState({
          selectedCouponArray: this.state.selectedCouponArray = tarray,
        });
      }

      const t2array: any = [];
      if(this.state.tempMerchantArray && getCouponMappingById.resultObject.merchantId) {
      this.state.tempMerchantArray.map((value: any, index: number) => {
        if (
          getCouponMappingById.resultObject.merchantId.includes(value.value)
        ) {
          t2array.push(value);
          // console.log("t2array", t2array);
        }
      });
      this.setState({
        selectedmerchantdata: this.state.selectedmerchantdata = t2array,
      });
    }

      const tarray1: any = [];
      if(this.state.tempCouponArray && this.state.selectedCouponArray) {
      this.state.tempCouponArray.map((data: any, index: number) => {
        if (!this.state.selectedCouponArray.includes(data)) {
          tarray1.push(data);
        }
      });
      // console.log("tarray1", tarray1);
      this.setState({ mainCouponArray: this.state.mainCouponArray = tarray1 });
    }

      const tarray2: any = [];
      if(this.state.tempMerchantArray && this.state.selectedmerchantdata) {
      this.state.tempMerchantArray.map((data: any, index: number) => {
        if (!this.state.selectedmerchantdata.includes(data)) {
          tarray2.push(data);
        }
      });
      // console.log("tarray2", tarray2);
      this.setState({ merchantdata: this.state.merchantdata = tarray2 });
    }

      // console.log("Selected Coupon: ", this.state.selectedCouponArray);
      this.setState({
        offername: this.state.offername =
          getCouponMappingById.resultObject.offerName,
        couponselectedarray: this.state.couponselectedarray =
          getCouponMappingById.resultObject.couponId,
        merchantselectedarray: this.state.merchantselectedarray =
          getCouponMappingById.resultObject.merchantId,
          isActive: this.state.isActive =  getCouponMappingById.resultObject.isActive
      });
      //   var newList : any = this.state.items.filter(function(x:any){
      //     return  getCouponMappingById.resultObject.couponId.indexOf(x) < 0;
      //  })
      // // console.log('filter',this.state.items.filter(item => item.news_id == id ))
      // let newUpdatdCouponArray:any = []
      // for(var i=0;i<this.state.selected.length;i++) {
      //   for(var j=0;j<this.state.items.length;j++) {
      //     if(this.state.selected[i] !== this.state.items[j].value)
      //     newUpdatdCouponArray.push(this.state.items[j].value,this.state.items[j].name);
      //     // newUpdatdCouponArray.name.push(this.state.items[j].name);
      //   }
      // }
      // // console.log("newUpdatdCouponArray",newUpdatdCouponArray);
    } else {
      const msg1 = getCouponMappingById.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal Server";
      // utils.showError(msg1);
    }
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

  /** Get Coupon List */
  async getCouponList() {
    var getCouponList = await CouponAPI.getCouponList();
    // console.log("getCouponList", getCouponList);

    if (getCouponList) {
      if (getCouponList.status === 200) {
      this.setState({
        mainCouponArray: this.state.mainCouponArray =
          getCouponList.resultObject,
        tempCouponArray: this.state.tempCouponArray =
          getCouponList.resultObject,
      });
    } else {
      const msg1 = getCouponList.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** Get Merchant List */
  async getMerchantList() {
    var getMerchantList = await MerchantAPI.getMerchantList();
    // console.log("getMerchantList", getMerchantList);

    if (getMerchantList) {
      if (getMerchantList.status === 200) {
      this.setState({
        merchantdata: this.state.merchantdata = getMerchantList.resultObject,
        tempMerchantArray: this.state.tempMerchantArray =
          getMerchantList.resultObject,
      });
    } else {
      const msg1 = getMerchantList.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  getList = (id: any) => this.state[this.id2List[id]];

  getMerchantListdata = (id: any) => this.state[this.id4List[id]];

  /**
   * 
   * @param result : coupon drag event
   */
  onDragEnd = (result: any) => {
    const { source, destination } = result;

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
      // console.log("result", result);
      if (this.state.updateTrue === false) {
        this.setState({
          mainCouponArray: result.droppable,
          selectedCouponArray: this.state.selectedCouponArray =
            result.droppable2,
        });
        let newarray: any = [];
        this.state.selectedCouponArray.map((res: any, index: number) => {
          newarray.push(res.value);
        });
        this.setState({
          couponselectedarray: this.state.couponselectedarray = newarray,
        });
        // console.log("result", this.state.selectedCouponArray);
      } else {
        // console.log("source", source);
        // console.log("destination", destination);
        if (source.droppableId === "droppable") {
          let newarray: any = this.state.selectedCouponArray;
          // console.log("New Array: ", newarray);
          if(result.droppable2) {
            result.droppable2.map((data: any, index: number) => {
              // console.log("data: ", data);
              if (!newarray.includes(data)) {
                // console.log("in if condition");
                newarray.push(data);
              }
            });
            // console.log("newarray", newarray);
            this.setState({
              selectedCouponArray: this.state.selectedCouponArray = newarray,
            });
          }
          if(result.droppable2) {
            result.droppable2.map((data: any, index: number) => {
              if (this.state.mainCouponArray.includes(data)) {
                // console.log("Found");
                const index = this.state.mainCouponArray.indexOf(data);
                this.state.mainCouponArray.splice(index, 1);
                // console.log(this.state.mainCouponArray);
              } else {
                // console.log("Not Found");
              }
            });
          }
          // console.log("Main array: ", this.state.mainCouponArray);
          // console.log(
          //   "selectedCouponArray after updated",
          //   this.state.selectedCouponArray
          // );
          let newarray3: any = [];
          if(this.state.selectedCouponArray) {
            this.state.selectedCouponArray.map((res: any, index: number) => {
              newarray3.push(res.value);
            });
            this.setState({
              couponselectedarray: this.state.couponselectedarray = newarray3,
            });
            // console.log("result", this.state.selectedCouponArray);
          }
        } else if (source.droppableId === "droppable2") {
          let newarray: any = this.state.mainCouponArray;
          // console.log("New Array: ", newarray);
          if(result.droppable) {
            result.droppable.map((data: any, index: number) => {
              // console.log("data: ", data);
              if (!newarray.includes(data)) {
                // console.log("in if condition");
                newarray.push(data);
              }
            });
            // console.log("newarray", newarray);
            this.setState({
              mainCouponArray: this.state.mainCouponArray = newarray,
            });
          }
          if(result.droppable) {
            result.droppable.map((data: any, index: number) => {
              if (this.state.selectedCouponArray.includes(data)) {
                // console.log("Found");
                const index = this.state.selectedCouponArray.indexOf(data);
                this.state.selectedCouponArray.splice(index, 1);
                // console.log(this.state.selectedCouponArray);
              } else {
                // console.log("Not Found");
              }
            });
          }
          // console.log("Main array: ", this.state.mainCouponArray);
          // console.log(
          //   "mainCouponArray after updated",
          //   this.state.mainCouponArray
          // );
          // console.log(
          //   "selectedCouponArray after updated",
          //   this.state.selectedCouponArray
          // );
          let newarray3: any = [];
          if(this.state.selectedCouponArray) {
            this.state.selectedCouponArray.map((res: any, index: number) => {
              newarray3.push(res.value);
            });
            this.setState({
              couponselectedarray: this.state.couponselectedarray = newarray3,
            });
          }
        }
      }
    }
  };

  /**
   * 
   * @param result : merchant drag event
   */
  onDragMerchantEnd = (result: any) => {
    const { source, destination } = result;

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
      // // console.log("result", result);

      if (this.state.updateTrue === false) {
        this.setState({
          merchantdata: result.droppable,
          selectedmerchantdata: this.state.selectedmerchantdata =
            result.droppable4,
        });
        let newmainarray: any = [];
        this.state.selectedmerchantdata.map((res: any, index: number) => {
          newmainarray.push(res.value);
        });
        this.setState({
          merchantselectedarray: this.state.merchantselectedarray = newmainarray,
        });
        // console.log("result", this.state.merchantselectedarray);
      } else {
        // console.log("source", source);
        // console.log("destination", destination);
        if (source.droppableId === "droppable") {
          let newarray: any = this.state.selectedmerchantdata;
          // console.log("New Array: ", newarray);
          if(result.droppable4) {
            result.droppable4.map((data: any, index: number) => {
              // console.log("data: ", data);
              if (!newarray.includes(data)) {
                // console.log("in if condition");
                newarray.push(data);
              }
            });
            // console.log("newarray", newarray);
            this.setState({
              selectedmerchantdata: this.state.selectedmerchantdata = newarray,
            });
          }
          if(result.droppable4) {
            result.droppable4.map((data: any, index: number) => {
              if (this.state.merchantdata.includes(data)) {
                // console.log("Found");
                const index = this.state.merchantdata.indexOf(data);
                this.state.merchantdata.splice(index, 1);
                // console.log(this.state.merchantdata);
              } else {
                // console.log("Not Found");
              }
            });
          }
          // console.log("Main array: ", this.state.merchantdata);
          let newmainarray: any = [];
          if(this.state.selectedmerchantdata) {
            this.state.selectedmerchantdata.map((res: any, index: number) => {
              newmainarray.push(res.value);
            });
            this.setState({
              merchantselectedarray: this.state.merchantselectedarray = newmainarray,
            });
          }
          // console.log(
          //   "selectedmerchantdata after updated",
          //   this.state.selectedmerchantdata
          // );
        } else if (source.droppableId === "droppable4") {
          let newarray: any = this.state.merchantdata;
          // console.log("New Array: ", newarray);
          if(result.droppable) {
            result.droppable.map((data: any, index: number) => {
              // console.log("data: ", data);
              if (!newarray.includes(data)) {
                // console.log("in if condition");
                newarray.push(data);
              }
            });
            // console.log("newarray", newarray);
            this.setState({
              merchantdata: this.state.merchantdata = newarray,
            });
          }
          if(result.droppable) {
            result.droppable.map((data: any, index: number) => {
              if (this.state.selectedmerchantdata.includes(data)) {
                // console.log("Found");
                const index = this.state.selectedmerchantdata.indexOf(data);
                this.state.selectedmerchantdata.splice(index, 1);
                // console.log(this.state.selectedmerchantdata);
              } else {
                // console.log("Not Found");
              }
            });
          }
          // console.log("Main array: ", this.state.merchantdata);

          // console.log("merchantdata after updated", this.state.merchantdata);
          let newmainarray: any = [];
          if(this.state.selectedmerchantdata) {
            this.state.selectedmerchantdata.map((res: any, index: number) => {
              newmainarray.push(res.value);
            });
            this.setState({
              merchantselectedarray: this.state.merchantselectedarray = newmainarray,
            });
          }
        }
      }
    }
  };

  /** Check valid or not */
  validate() {
    let offernameerror = "";

    if (!this.state.offername) {
      offernameerror = "please enter offer name";
    }
    if (offernameerror) {
      this.setState({
        offernameerror,
      });
      return false;
    }
    return true;
  }

  /** Add coupon mapping */
  async addCouponMapping() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        offernameerror: "",
      });
      if (this.state.offername) {
        let mappingDetails = {
          couponId: this.state.couponselectedarray,
          merchantId: this.state.merchantselectedarray,
        };
        const obj: addCouponMappingState = {
          offername: this.state.offername,
          isActive: this.state.isActive,
          mappingDetail: mappingDetails,
        };

        const addCouponMapping = await CouponAPI.addCouponMappingMapping(obj);
        // console.log("addCouponMapping", addCouponMapping);
        if (addCouponMapping) {
          if(addCouponMapping.status === 200) {
            const msg1 = addCouponMapping.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-coupon-map");
        } else {
          const msg1 = addCouponMapping.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Edit coupon mapping */
  async editCouponMapping() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        offernameerror: "",
      });
      if (this.state.offername) {
        let mappingDetails = {
          couponId: this.state.couponselectedarray,
          merchantId: this.state.merchantselectedarray,
        };
        const obj: editCouponMappingState = {
          couponMappingId: parseInt(this.state.couponmappingid),
          isActive: this.state.isActive,
          offername: this.state.offername,
          mappingDetail: mappingDetails,
        };

        // console.log("obj", obj);

        const editCouponMapping = await CouponAPI.editCouponMapping(obj);
        // console.log("editCouponMapping", editCouponMapping);
        if (editCouponMapping) {
          if(editCouponMapping.status === 200) {
            const msg1 = editCouponMapping.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-coupon-map");
        } else {
          const msg1 = editCouponMapping.message;
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
    let { selected, selectedmerchantdata } = this.state;
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
                          <h1>
                            {constant.couponPage.title.updateCouponMappingTitle}
                          </h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
                            {constant.couponPage.title.addCouponMappingTitle}
                          </h1>
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
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="offer">
                            {constant.couponPage.couponTableColumn.offername}
                          </Label>
                          <Input
                            type="text"
                            id="offer"
                            name="offername"
                            className="form-control"
                            value={this.state.offername}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your offer name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.offernameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="main_coupon merchnat">
                      <DragDropContext onDragEnd={this.onDragEnd}>
                        <div>
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
                                {this.state.updateTrue === true ? (
                                  //* Update Coupon Mapping
                                  _.map(
                                    this.state.mainCouponArray,
                                    (itm: any, index1: number) => (
                                      <Draggable
                                        key={"coupon_left_" + index1}
                                        draggableId={itm.value.toString()}
                                        index={index1}
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
                                            {itm.name}
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                    // _.map(this.state.selectedCouponArray, (item: any, index: any) =>
                                    //   item.value !== itm.value ? (

                                    //   ) : (
                                    //     ""
                                    //   )
                                  )
                                ) : (
                                  //* Add Coupon Mapping Main Array
                                  <>
                                    {this.state.mainCouponArray.map(
                                      (item: any, index: any) => (
                                        <Draggable
                                          key={index}
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
                                  </>
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
                                {this.state.selectedCouponArray
                                  ? _.map(
                                      this.state.selectedCouponArray,
                                      (item: any, index: any) => (
                                        <Draggable
                                          key={"coupon_right_" + index}
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
                                    )
                                  : ""}
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
                                {this.state.updateTrue === true ? (
                                  <>
                                    {this.state.merchantdata.map(
                                      (item: any, index: any) => (
                                        <Draggable
                                          key={index}
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
                                  </>
                                ) : (
                                  <>
                                    {this.state.merchantdata.map(
                                      (item: any, index: any) => (
                                        <Draggable
                                          key={index}
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
                                  </>
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
                                {this.state.selectedmerchantdata
                                  ? _.map(
                                      selectedmerchantdata,
                                      (item: any, index: any) => (
                                        <Draggable
                                          key={"merchant_map" + index}
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
                                    )
                                  : ""}

                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </DragDropContext>
                    </Row>

                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 mt-5 custom-button"
                        onClick={this.editCouponMapping}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 mt-5 custom-button"
                        onClick={this.addCouponMapping}
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

export default AddCouponMapping;
