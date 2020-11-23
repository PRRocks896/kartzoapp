import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  Row,
} from "reactstrap";
import {
  StatusAPI,
  SliderAPI, DeleteAPI
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest,deleteByIdRequest, allStateRequest,sliderStateRequest, deleteAllDataRequest } from "../../../modelController";
import checkRights from "../../../rights";

class ListSlider extends React.Component<{ history: any }> {

  /** Home slider state */
  homesliderState:sliderStateRequest = constant.homesliderPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.homesliderState.count,
    currentPage: this.homesliderState.currentPage,
    items_per_page: this.homesliderState.items_per_page,
    upperPageBound: this.homesliderState.upperPageBound,
    lowerPageBound: this.homesliderState.lowerPageBound,
    pageBound: this.homesliderState.pageBound,
    onItemSelect: this.homesliderState.onItemSelect,
    sliderdata: this.homesliderState.sliderdata,
    switchSort: this.homesliderState.switchSort,
    isStatus: this.homesliderState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.editSlider = this.editSlider.bind(this);
    // this.deleteSlider = this.deleteSlider.bind(this);
    this.delleteAllData = this.delleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewSlider = this.viewSlider.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.getSliderData = this.getSliderData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
  }

  /** Page render call */
  async componentDidMount() {
    document.title =
      constant.homesliderPage.title.homeSliderTitle + utils.getAppName();
    utils.dataTable();
    this.getSliderData();
  }

  /**
   * 
   * @param searchText : search value
   * @param page : page
   * @param size : per page 
   */
  async getSliderData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest= {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getSliderData = await SliderAPI.getSliderData(obj);
    // console.log("getSliderData", getSliderData);

    if (getSliderData) {
      if(getSliderData.status === 200) {
      this.setState({
        sliderdata: this.state.sliderdata =
          getSliderData.resultObject.data,
        count: this.state.count = getSliderData.resultObject.totalcount,
      });
    } else {
      const msg1 = getSliderData.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** button increment */
  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
  }

  /** button decrement */
  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
  }

  /**
   * 
   * @param id : slider id
   */
  editSlider(id: any) {
    this.props.history.push("/edit-slider/" + id);
  }

  /**
   * 
   * @param id : slider id
   */
  viewSlider(id: any) {
    this.props.history.push("/view-slider/" + id);
  }

  // async deleteSlider(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.homeSliderId,
  //     };
  //     var deleteSlider = await SliderAPI.deleteSlider(obj);
  //     // console.log("deleteSlider", deleteSlider);
  //     if (deleteSlider) {
  //       this.getSliderData(
  //         "",
  //         parseInt(this.state.currentPage),
  //         parseInt(this.state.items_per_page)
  //       );
  //     } else {
  //       const msg1 = "Internal server error";
  //     utils.showError(msg1);
  //     }
  //   }
  // }

  /**
   * 
   * @param text : text message
   * @param btext : button message
   */
  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "HomeSlider",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteAllData(obj);
      // console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        if (deleteAllData.data.status === 200) {
          const msg1 = deleteAllData.data.message;
          utils.showSuccess(msg1);
        this.getSliderData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
        this.setState({
          deleteFlag:this.state.deleteFlag = false
        })
        } else {
          const msg1 = deleteAllData.data.message;
          utils.showError(msg1);
        }
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

  /**
   * 
   * @param event : record per page value
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getSliderData(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  /**
   * 
   * @param event : click on next page
   */
  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj:getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

   

    this.getSliderData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : search value
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getSliderData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting table
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.sliderdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      sliderdata: this.state.sliderdata = copyTableData,
    });
  }

  /**
   * 
   * @param data : data
   * @param text : text message
   * @param btext : button message
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "Homeslider",
        id: data.pauoutId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getSliderData();
        } else {
          const msg1 = getStatusChange.message;
          utils.showError(msg1);
        }
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

  /**
   * 
   * @param item : item
   * @param e  event
   */
  handleChange(item: any, e: any) {
    let _id = item.homeSliderId;
    let ind: any = this.state.sliderdata.findIndex(
      (x: any) => x.homeSliderId === _id
    );
    let data: any = this.state.sliderdata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        sliderdata: this.state.sliderdata = data,
      });
    }
    if (
      data.filter((res: any, index: number) => res._rowChecked === true)
        .length === data.length
    ) {
      this.setState({
        _maincheck: true,
      });
    } else {
      this.setState({
        _maincheck: false,
      });
    }
    let newarray: any = [];
    data.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newarray.push(res.homeSliderId);
      }
    });
    this.setState({
      deleteuserdata: this.state.deleteuserdata = newarray,
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: this.state.deleteFlag = true,
      });
    } else {
      this.setState({
        deleteFlag: this.state.deleteFlag = false,
      });
    }
    // console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  /**
   * 
   * @param e : main check box event
   */
  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.sliderdata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      sliderdata: this.state.sliderdata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.sliderdata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.homeSliderId);
      }
    });
    this.setState({
      deleteuserdata: this.state.deleteuserdata = newmainarray,
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: this.state.deleteFlag = true,
      });
    } else {
      this.setState({
        deleteFlag: this.state.deleteFlag = false,
      });
    }
    // console.log("deleteuserdata array", this.state.deleteuserdata);
  }

/**
 * 
 * @param pageNumbers : page number
 */
  pagination(pageNumbers: any) {
    var res = pageNumbers.map((number: any) => {
      if (number === 1 && parseInt(this.state.currentPage) === 1) {
        return (
          <li
            key={number}
            id={number}
            className={
              parseInt(this.state.currentPage) === number
                ? "active"
                : "page-item"
            }
          >
            <a className="page-link" onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      } else if (
        number < this.state.upperPageBound + 1 &&
        number > this.state.lowerPageBound
      ) {
        return (
          <li
            key={number}
            id={number}
            className={
              parseInt(this.state.currentPage) === number
                ? "active"
                : "page-item"
            }
          >
            <a className="page-link" id={number} onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      }
    });
    return res;
  }

  /**
   * 
   * @param sliderdata : slider data
   */
  getTable(sliderdata: any) {
    return (
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("imageName")}>
          <th className="centers">
              <CustomInput
                name="name"
                defaultValue="value"
                type="checkbox"
                id="exampleCustomCheckbox"
                onChange={this.handleMainChange}
                checked={this.state._maincheck}
              />
            </th>
            <th>{constant.homesliderPage.homeSliderTableColumn.sliderimage}</th>
            <th>{constant.homesliderPage.homeSliderTableColumn.alterTag}</th>
            {checkRights.checkViewRights("HomeSlider") === true ||
            checkRights.checkEditRights("HomeSlider") === true ? (
              <th className="action">{constant.tableAction.action}</th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.sliderdata.length > 0 ? (
            <>
              {this.state.sliderdata.map((data: any, index: any) => (
                <tr key={index}>
                   <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.homeSliderId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.sliderdata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                   <td>
                    {data.photoPath != null ? (
                      <div className="img-size">
                        {data.photoPath ? (
                          <div>
                            <img
                              className="table-picture"
                              src={constant.filepath + data.photoPath}
                            />
                            {/* <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i> */}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div>
                        <i className="fa fa-user picture"></i>
                        {/* <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i> */}
                      </div>
                    )}
                  </td>
                  <td>{data.alterTag}</td>
                  {checkRights.checkViewRights("HomeSlider") === true ||
                  checkRights.checkEditRights("HomeSlider") === true ? (
                    <td className="action">
                      <span className="padding">
                        {checkRights.checkViewRights("HomeSlider") === true ? (
                        <i
                        className="fa fa-eye"
                        onClick={() => this.viewSlider(data.homeSliderId)}
                      ></i>
                        ) : (
                          ""
                        )}
                        {checkRights.checkEditRights("HomeSlider") === true ? (
                            <i
                            className="fas fa-edit"
                            onClick={() => this.editSlider(data.homeSliderId)}
                          ></i>
                        ) : (
                          ""
                        )}
                      </span>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
    );
  }

  /**
   * 
   * @param pageDecrementBtn : page decrement
   * @param renderPageNumbers : page number
   * @param pageIncrementBtn : page incement
   */
  getPageData(
    pageDecrementBtn: any,
    renderPageNumbers: any,
    pageIncrementBtn: any
  ) {
    return (
      <div className="filter">
        <CustomInput
          type="select"
          id="item"
          className="custom_text_width"
          name="customSelect"
          onChange={this.onItemSelect}
        >
          <option value="10">{constant.recordPerPage.recordperPage}</option>
          <option value={constant.recordPerPage.fifteen}>
            {constant.recordPerPage.fifteen}
          </option>
          <option value={constant.recordPerPage.twenty}>
            {constant.recordPerPage.twenty}
          </option>
          <option value={constant.recordPerPage.thirty}>
            {constant.recordPerPage.thirty}
          </option>
          <option value={constant.recordPerPage.fifty}>
            {constant.recordPerPage.fifty}
          </option>
        </CustomInput>
        <div>
          <ul className="pagination" id="page-numbers">
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
          </ul>
        </div>
      </div>
    );
  }

  /** Render DOM */
  render() {
    var pageNumbers = utils.pageNumber(
      this.state.count,
      this.state.items_per_page
    );
    var renderPageNumbers = this.pagination(pageNumbers);

    let pageIncrementBtn = null;
    if (pageNumbers.length > this.state.upperPageBound) {
      pageIncrementBtn = (
        <li className="page-item">
          <a className="page-link" onClick={this.btnIncrementClick}>
            &hellip;
          </a>
        </li>
      );
    }

    let pageDecrementBtn = null;
    if (this.state.lowerPageBound >= 1) {
      pageDecrementBtn = (
        <li className="page-item">
          <a className="page-link" onClick={this.btnDecrementClick}>
            &hellip;
          </a>
        </li>
      );
    }

    return (
      <>
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">
                          {constant.homesliderPage.title.homeSliderTitle}
                        </CardTitle>
                      </Col>
                      {checkRights.checkAddRights("HomeSlider") === true ? (
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                      <div className="right">
                        <Link to="/add-slider">
                          <Button
                            className="mb-2 mr-2 custom-button"
                            color="primary"
                          >
                            {constant.button.add}
                          </Button>
                        </Link>
                      </div>
                    </Col>
                    ) : (
                      ""
                    )}
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="search_right">
                      <input
                        className="form-control custom_text_width search"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyUp={this.searchApplicationDataKeyUp}
                      />
                    </div>
                    {this.state.deleteFlag === true &&  checkRights.checkDeleteRights("HomeSlider") === true  ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData("You should be Delete Slider",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}

                    {this.state.sliderdata.length > 0 ? (
                      <>{this.getTable(this.state.sliderdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                     
                    {this.state.sliderdata.length > 0
                      ? this.getPageData(
                          pageIncrementBtn,
                          renderPageNumbers,
                          pageDecrementBtn
                        )
                      : ""}
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

export default ListSlider;
