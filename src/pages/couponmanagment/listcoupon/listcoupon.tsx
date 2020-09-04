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
  FormGroup,
  CustomInput,
  Label,
  Row,
} from "reactstrap";
import NavBar from "../../navbar/navbar";
import {StatusAPI, CouponAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest,deleteByIdRequest } from "../../../modelController";

class ListCoupon extends React.Component<{ history: any }> {
  couponState = constant.couponPage.state;
  userState = constant.userPage.state;
  state = {
    count: this.couponState.count,
    currentPage: this.couponState.currentPage,
    items_per_page: this.couponState.items_per_page,
    upperPageBound: this.couponState.upperPageBound,
    lowerPageBound: this.couponState.lowerPageBound,
    pageBound: this.couponState.pageBound,
    onItemSelect: this.couponState.onItemSelect,
    coupondata: this.couponState.coupondata,
    switchSort: this.couponState.switchSort,
    isStatus: this.couponState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  constructor(props: any) {
    super(props);
    this.editCoupon = this.editCoupon.bind(this);
    this.deleteCoupon = this.deleteCoupon.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewCoupon = this.viewCoupon.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.compareByDesc = this.compareByDesc.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.couponPage.title.counponTitle + utils.getAppName();
      utils.dataTable();
    this.getCoupon();
  }

  async getCoupon(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getCoupon = await CouponAPI.getCoupon(obj);
    console.log("getCoupon", getCoupon);

    if (getCoupon) {
      if (getCoupon.status === 200) {
        this.setState({
          coupondata: this.state.coupondata = getCoupon.resultObject.data,
          count: this.state.count = getCoupon.resultObject.totalcount,
        });
      } else {
        const msg1 = getCoupon.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

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

  editCoupon(id: any) {
    this.props.history.push("/edit-coupon/" + id);
  }

  viewCoupon(id: any) {
    this.props.history.push("/view-coupon/" + id);
  }

  async deleteCoupon(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteByIdRequest = {
        id: data.couponId,
      };
      var deleteCoupon = await CouponAPI.deleteCoupon(obj);
      console.log("deleteCoupon", deleteCoupon);
      if (deleteCoupon.status === 200) {
        const msg = deleteCoupon.message;
        utils.showSuccess(msg);
        this.getCoupon('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
      } else {
        const msg1 = deleteCoupon.message;
        utils.showError(msg1);
      }
    }
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getCoupon('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj:getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    this.getCoupon(obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getCoupon(obj.searchText, obj.page, obj.size);
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.coupondata];
    copyTableData.sort(this.compareByDesc(key));
    this.setState({
      coupondata: this.state.coupondata = copyTableData,
    });
  }

  compareByDesc(key: any) {
    if (this.state.switchSort) {
      return function (a: any, b: any) {
        if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
        if (a[key] > b[key]) return 1; //check for value if the second value is bigger then first return 1
        return 0;
      };
    } else {
      return function (a: any, b: any) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      };
    }
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "Coupon",
        id: data.couponId,
        isActive: data.isActive === true ? false : true
       }
       var getStatusChange = await StatusAPI.getStatusChange(obj);
       console.log("getStatusChange", getStatusChange);
       if (getStatusChange.status === 200) {
        const msg = getStatusChange.message;
        utils.showSuccess(msg);
        this.getCoupon('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
      } else {
        const msg1 = getStatusChange.message;
        utils.showError(msg1);
      }
    }
  }

  
  handleChange(item: any, e: any) {
    let _id = item.couponId;
    let ind: any = this.state.coupondata.findIndex(
      (x: any) => x.couponId === _id
    );
    let data: any = this.state.coupondata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        coupondata: this.state.coupondata = data,
      });
    }
    let count = 0;
    data.forEach((element: any) => {
      if (element._rowChecked === true) {
        element._rowChecked = true;
        count++;
      } else {
        element._rowChecked = false;
      }
    });
    if (count === data.length) {
      this.setState({
        _maincheck: true,
      });
    } else {
      this.setState({
        _maincheck: false,
      });
    }
    let newarray: any = [];
    for (var i = 0; i < this.state.coupondata.length; i++) {
      if (this.state.coupondata[i]["_rowChecked"] === true) {
        newarray.push(this.state.coupondata[i]["couponId"]);
      }
    }
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
    console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.coupondata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      coupondata: this.state.coupondata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    for (var i = 0; i < this.state.coupondata.length; i++) {
      if (this.state.coupondata[i]["_rowChecked"] === true) {
        newmainarray.push(this.state.coupondata[i]["couponId"]);
      }
    }
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
    console.log("deleteuserdata array", this.state.deleteuserdata);
  }

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

  getTable(coupondata: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("couponCode")}>
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
            <th>{constant.couponPage.couponTableColumn.couponCode}</th>
            <th>{constant.couponPage.couponTableColumn.title}</th>
            <th>{constant.couponPage.couponTableColumn.discountPrice}</th>
            <th>{constant.couponPage.couponTableColumn.percentage}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.coupondata.length > 0 ? (
            <>
              {this.state.coupondata.map((data: any, index: any) => (
                <tr key={index}>
                   <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.couponId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.coupondata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                  <td>{data.couponCode}</td>
                  <td>{data.title}</td>
                  <td>{data.discountPrice}</td>
                  <td>{data.percentage}%</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be inActive coupon",
                            "Yes, inActive it"
                          )
                        }
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="status_inactive_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Active coupon",
                            "Yes, Active it"
                          )
                        }
                      >
                        InActive
                      </button>
                    )}
                  </td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewCoupon(data.couponId)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editCoupon(data.couponId)}
                      ></i>
                     <i
                        className="fa fa-trash"
                        onClick={() =>
                          this.deleteCoupon(
                            data,
                            "You should be Delete Coupon",
                            "Yes, Delete it"
                          )
                        }
                      ></i>
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

  render() {
    var pageNumbers = [];
    for (let i = 1; i <= Math.ceil(parseInt(this.state.count) / parseInt(this.state.items_per_page)); i++) {
      pageNumbers.push(i);
    }
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
        <NavBar>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">
                          {constant.couponPage.title.counponTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/add-coupon">
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

                    {this.state.coupondata.length > 0 ? (
                      <>{this.getTable(this.state.coupondata)}</>
                    ) : (
                      <h1 className="text-center mt-5">No Data Found</h1>
                    )}
                     {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.coupondata.length > 0
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
        </NavBar>
      </>
    );
  }
}

export default ListCoupon;
