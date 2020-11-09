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
  MatrixAPI
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest, matrixStateRequest, allStateRequest, deleteAllDataRequest } from "../../../modelController";

class ListMatrix extends React.Component<{ history: any }> {

  /** matrix state */
  matrixState:matrixStateRequest = constant.matrixPage.state;
  userState:allStateRequest = constant.userPage.state;
  state = {
    count: this.matrixState.count,
    currentPage: this.matrixState.currentPage,
    items_per_page: this.matrixState.items_per_page,
    upperPageBound: this.matrixState.upperPageBound,
    lowerPageBound: this.matrixState.lowerPageBound,
    pageBound: this.matrixState.pageBound,
    onItemSelect: this.matrixState.onItemSelect,
    matrixdata: this.matrixState.matrixdata,
    switchSort: this.matrixState.switchSort,
    isStatus: this.matrixState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** constructor call */
  constructor(props: any) {
    super(props);
    this.editmatrix = this.editmatrix.bind(this);
    // this.deleteMatrix = this.deleteMatrix.bind(this);
    // this.delleteAllData = this.delleteAllData.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewmatrix = this.viewmatrix.bind(this);
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
    this.getMatrixData = this.getMatrixData.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleMainChange = this.handleMainChange.bind(this);
  }

  /** page render call */
  async componentDidMount() {
    document.title =
      constant.matrixPage.title.matrixTitle + utils.getAppName();
    utils.dataTable();
    this.getMatrixData();
  }

  /**
   * 
   * @param searchText : search value
   * @param page : per page
   * @param size : per page value
   */
  async getMatrixData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getMatrixData = await MatrixAPI.getMatrixData(obj);
    // console.log("getMatrixData", getMatrixData);

    if (getMatrixData) {
      if(getMatrixData.status === 200) {
      this.setState({
        matrixdata: this.state.matrixdata =
          getMatrixData.resultObject.data,
        count: this.state.count = getMatrixData.resultObject.totalcount,
      });
    } else {
      const msg1 = getMatrixData.message;
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
   * @param id : matrix id
   */
  editmatrix(id: any) {
    this.props.history.push("/edit-matrix/" + id);
  }

  /**
   * 
   * @param id : matrix id
   */
  viewmatrix(id: any) {
    this.props.history.push("/view-matrix/" + id);
  }

  // async deleteMatrix(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.distanceId,
  //     };
  //     var deleteMatrix = await MatrixAPI.deleteMatrix(obj);
  //     // console.log("deleteMatrix", deleteMatrix);
  //     if (deleteMatrix) {
  //       this.getMatrixData(
  //         "",
  //         parseInt(this.state.currentPage),
  //         parseInt(this.state.items_per_page)
  //       );
  //     } else {
  //       const msg1 = "Internal server error";
  //       utils.showError(msg1);
  //     }
  //   }
  // }

  // async delleteAllData(text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteAllDataRequest = {
  //       moduleName: "DistanceMatrix",
  //       id: this.state.deleteuserdata
  //     };
  //     var deleteAllData = await DeleteAPI.deleteAllData(obj);
  //     // console.log("deleteAllData", deleteAllData);
  //     if (deleteAllData) {
  //       this.getMatrixData(
  //         "",
  //         parseInt(this.state.currentPage),
  //         parseInt(this.state.items_per_page)
  //       );
  //     } else {
  //       const msg1 = "Internal server error";
  //       utils.showError(msg1);
  //     }
  //   }
  // }

  /**
   * 
   * @param event : record per page
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getMatrixData(
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

  
    this.getMatrixData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : search matrix value
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getMatrixData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting table
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.matrixdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      matrixdata: this.state.matrixdata = copyTableData,
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
        moduleName: "Payout",
        id: data.pauoutId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
        this.getMatrixData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
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

  // handleChange(item: any, e: any) {
  //   let _id = item.distanceId;
  //   let ind: any = this.state.matrixdata.findIndex(
  //     (x: any) => x.distanceId === _id
  //   );
  //   let data: any = this.state.matrixdata;
  //   if (ind > -1) {
  //     let newState: any = !item._rowChecked;
  //     data[ind]._rowChecked = newState;
  //     this.setState({
  //       matrixdata: this.state.matrixdata = data,
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
  //       newarray.push(res.distanceId);
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
  //   this.state.matrixdata.forEach((element: any) => {
  //     element._rowChecked = _val;
  //   });
  //   this.setState({
  //     matrixdata: this.state.matrixdata,
  //   });
  //   this.setState({
  //     _maincheck: _val,
  //   });
  //   let newmainarray: any = [];
  //   this.state.matrixdata.map((res: any, index: number) => {
  //     if (res._rowChecked === true) {
  //       newmainarray.push(res.distanceId);
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
   * @param matrixdata : get table data
   */
  getTable(matrixdata: any) {
    return (
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("feeType")}>
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
            <th>{constant.matrixPage.matrixTableColumn.feeType}</th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.matrixdata.length > 0 ? (
            <>
              {this.state.matrixdata.map((data: any, index: any) => (
                <tr key={index}>
                  {/* <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.distanceId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.matrixdata[index]["_rowChecked"] === true
                      }
                    />
                  </td> */}
                  <td>{data.feeType}</td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewmatrix(data.distanceId)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editmatrix(data.distanceId)}
                      ></i>
                       {/* <i
                        className="fa fa-trash"
                        onClick={() =>
                          this.deleteMatrix(
                            data,
                            "You should be Delete Matrix",
                            "Yes, Delete it"
                          )
                        }
                      ></i> */}
                    </span>
                  </td>
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
   * @param renderPageNumbers : render page number
   * @param pageIncrementBtn : page increment
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
                          {constant.matrixPage.title.matrixTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/add-matrix">
                            <Button
                              className="mb-2 mr-2 custom-button"
                              color="primary"
                            >
                              {constant.button.add}
                            </Button>
                          </Link>
                        </div>
                      </Col>
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

                    {this.state.matrixdata.length > 0 ? (
                      <>{this.getTable(this.state.matrixdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                    {/* {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData("You should be Delete Matrix",
                        "Yes, Delete it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )} */}
                    {this.state.matrixdata.length > 0
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

export default ListMatrix;
