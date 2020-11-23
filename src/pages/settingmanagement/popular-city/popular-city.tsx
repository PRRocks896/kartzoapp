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
  SettingAPI,
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest, deleteByIdRequest, settingStateRequest, allStateRequest } from "../../../modelController";
import checkRights from "../../../rights";

class ListPopularCity extends React.Component<{ history: any }> {

  /** setting state */
  settingState:settingStateRequest = constant.settingPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.settingState.count,
    currentPage: this.settingState.currentPage,
    items_per_page: this.settingState.items_per_page,
    upperPageBound: this.settingState.upperPageBound,
    lowerPageBound: this.settingState.lowerPageBound,
    pageBound: this.settingState.pageBound,
    onItemSelect: this.settingState.onItemSelect,
    settingdata: this.settingState.settingdata,
    switchSort: this.settingState.switchSort,
    isStatus: this.settingState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.editSetting = this.editSetting.bind(this);
    this.deleteSetting = this.deleteSetting.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewSetting = this.viewSetting.bind(this);
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
    // this.handleChange = this.handleChange.bind(this);
    // this.handleMainChange = this.handleMainChange.bind(this);
  }

  /** Page render call */
  async componentDidMount() {
    document.title =
      constant.settingPage.title.popularcitytitle + utils.getAppName();
    utils.dataTable();
    this.getSettingData();
  }

  /** Get setting data */
  async getSettingData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getSettingData = await SettingAPI.getSettingData(obj);
    // console.log("getSettingData", getSettingData);

    if (getSettingData) {
      if(getSettingData.status === 200) {
      this.setState({
        settingdata: this.state.settingdata =
          getSettingData.resultObject.data,
        count: this.state.count = getSettingData.resultObject.totalcount,
      });
    } else {
      const msg1 = getSettingData.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** button next */
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

  /** button previous */
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
   * @param id : setting id
   */
  editSetting(id: any) {
    this.props.history.push("/edit-popular-city/" + id);
  }

  /**
   * 
   * @param id : setting id
   */
  viewSetting(id: any) {
    this.props.history.push("/view-popular-city/" + id);
  }

  /**
   * 
   * @param data : data
   * @param text : text message
   * @param btext : button message
   */
  async deleteSetting(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteByIdRequest = {
        id: data.settingId,
      };
      var deleteSetting = await SettingAPI.deleteSetting(obj);
      // console.log("deleteSetting", deleteSetting);
      if (deleteSetting) {
        this.getSettingData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
        this.setState({
          deleteFlag:this.state.deleteFlag = false
        })
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

/**
 * 
 * @param event : record per page
 */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getSettingData(
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

   
    this.getSettingData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : popular city search
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getSettingData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting table list
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.settingdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      settingdata: this.state.settingdata = copyTableData,
    });
  }

  /**
   * 
   * @param data : data
   * @param text : text
   * @param btext : button message
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "Setting",
        id: data.settingId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        this.getSettingData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
      } else {
      //   const msg1 = "Internal server error";
      // utils.showError(msg1);
      }
    }
  }

   
  // handleChange(item: any, e: any) {
  //   let _id = item.settingId;
  //   let ind: any = this.state.settingdata.findIndex(
  //     (x: any) => x.settingId === _id
  //   );
  //   let data: any = this.state.settingdata;
  //   if (ind > -1) {
  //     let newState: any = !item._rowChecked;
  //     data[ind]._rowChecked = newState;
  //     this.setState({
  //       settingdata: this.state.settingdata = data,
  //     });
  //   }
  //   if (
  //     data.filter((res: any, index: number) => res._rowChecked === true)
  //       .length === data.length
  //   ) {
  //     this.setState({
  //       _maincheck: true,
  //     });
  //   } else {
  //     this.setState({
  //       _maincheck: false,
  //     });
  //   }
  //   let newarray: any = [];
  //   data.map((res: any, index: number) => {
  //     if (res._rowChecked === true) {
  //       newarray.push(res.settingId);
  //     }
  //   });
  //   this.setState({
  //     deleteuserdata: this.state.deleteuserdata = newarray,
  //   });
  //   if (this.state.deleteuserdata.length > 0) {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = true,
  //     });
  //   } else {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = false,
  //     });
  //   }
  //   // console.log("deleteuserdata array", this.state.deleteuserdata);
  // }

  // handleMainChange(e: any) {
  //   let _val = e.target.checked;
  //   this.state.settingdata.forEach((element: any) => {
  //     element._rowChecked = _val;
  //   });
  //   this.setState({
  //     settingdata: this.state.settingdata,
  //   });
  //   this.setState({
  //     _maincheck: _val,
  //   });
  //   let newmainarray: any = [];
  //   this.state.settingdata.map((res: any, index: number) => {
  //     if (res._rowChecked === true) {
  //       newmainarray.push(res.settingId);
  //     }
  //   });
  //   this.setState({
  //     deleteuserdata: this.state.deleteuserdata = newmainarray,
  //   });
  //   if (this.state.deleteuserdata.length > 0) {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = true,
  //     });
  //   } else {
  //     this.setState({
  //       deleteFlag: this.state.deleteFlag = false,
  //     });
  //   }
  //   // console.log("deleteuserdata array", this.state.deleteuserdata);
  // }

  /**
   * 
   * @param pageNumbers : pagination 
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

  /** Get table list data */
  getTable(settingdata: any) {
    return (
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("value")}>
          {/* <th className="centers">
              <CustomInput
                name="name"
                defaultValue="value"
                type="checkbox"
                id="exampleCustomCheckbox"
                onChange={this.handleMainChange}
                checked={this.state._maincheck}
              />
            </th> */}
            <th>{constant.settingPage.settingTableColumn.identifier}</th>
            <th>{constant.settingPage.settingTableColumn.value}</th>
            {/* <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th> */}
            {checkRights.checkViewRights("Popular-City") === true ||
            checkRights.checkEditRights("Popular-City") === true ? (
              <th className="action">{constant.tableAction.action}</th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.settingdata.length > 0 ? (
            <>
              {this.state.settingdata.map((data: any, index: any) => (
                  data.identifier === "City" ? (
                    <tr key={index}>
                    {/* <td className="centers">
                     <CustomInput
                       // name="name"
                       type="checkbox"
                       id={data.settingId}
                       onChange={(e) => this.handleChange(data, e)}
                       checked={
                         this.state.settingdata[index]["_rowChecked"] === true
                       }
                     />
                   </td> */}
                   <td>{data.identifier}</td>
                   <td>{data.name}</td>
                   {/* <td style={{ textAlign: "center" }}>
                     {data.isActive === true ? (
                       <button
                         className="status_active_color"
                         onClick={() =>
                           this.statusChange(
                             data,
                             "You should be Inactive setting",
                             "Yes, Inactive it"
                           )
                         }
                       >
                         Active
                       </button>
                     ) : (
                       <button
                         className="status_Inactive_color"
                         onClick={() =>
                           this.statusChange(
                             data,
                             "You should be Active setting",
                             "Yes, Active it"
                           )
                         }
                       >
                         Inactive
                       </button>
                     )}
                   </td> */}
                    {checkRights.checkViewRights("Popular-City") === true ||
                  checkRights.checkEditRights("Popular-City") === true ? (
                    <td className="action">
                      <span className="padding">
                        {checkRights.checkViewRights("Popular-City") === true ? (
                           <i
                           className="fa fa-eye"
                           onClick={() => this.viewSetting(data.settingId)}
                         ></i>
                        ) : (
                          ""
                        )}
                        {checkRights.checkEditRights("Popular-City") === true ? (
                           <i
                           className="fas fa-edit"
                           onClick={() => this.editSetting(data.settingId)}
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
                  ) : (null)
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
    );
  }

  /** Get page data */
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
                          {constant.settingPage.title.popularcitytitle}
                        </CardTitle>
                      </Col>
                      {checkRights.checkAddRights("Popular-City") === true ? (
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                      <div className="right">
                        <Link to="/add-popular-city">
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

                    {this.state.settingdata.length > 0 ? (
                      <>{this.getTable(this.state.settingdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                      {/* {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )} */}
                    {this.state.settingdata.length > 0
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

export default ListPopularCity;
