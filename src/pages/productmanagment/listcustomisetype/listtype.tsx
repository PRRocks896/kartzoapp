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
import {
  StatusAPI,
  ProductAPI,
  CouponAPI,
  MerchantAPI,
  SettingAPI,
  FeeAPI,
  PayoutAPI,
  MatrixAPI,
  SliderAPI,
} from "../../../service/index.service";
import constant from "../../../constant/constant";

class ListProductType extends React.Component<{ history: any }> {
  productCustomiseState = constant.productCustomisePage.state;
  state = {
    count: this.productCustomiseState.count,
    currentPage: this.productCustomiseState.currentPage,
    items_per_page: this.productCustomiseState.items_per_page,
    upperPageBound: this.productCustomiseState.upperPageBound,
    lowerPageBound: this.productCustomiseState.lowerPageBound,
    pageBound: this.productCustomiseState.pageBound,
    onItemSelect: this.productCustomiseState.onItemSelect,
    typedata: this.productCustomiseState.typedata,
    switchSort: this.productCustomiseState.switchSort,
    isStatus: this.productCustomiseState.isStatus,
  };

  constructor(props: any) {
    super(props);
    this.editCustomiseType = this.editCustomiseType.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewCustomiseType = this.viewCustomiseType.bind(this);
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
    this.getProductCustomiseTypeData = this.getProductCustomiseTypeData.bind(
      this
    );
  }

  async componentDidMount() {
    document.title =
      constant.productCustomisePage.title.typeTitle + utils.getAppName();
    utils.dataTable();
    this.getProductCustomiseTypeData();
  }

  async getProductCustomiseTypeData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getProductCustomiseTypeData = await ProductAPI.getProductCustomiseTypeData(obj);
    console.log("getProductCustomiseTypeData", getProductCustomiseTypeData);

    if (getProductCustomiseTypeData) {
      if (getProductCustomiseTypeData.status === 200) {
        this.setState({
          typedata: this.state.typedata =
            getProductCustomiseTypeData.resultObject.data,
          count: this.state.count = getProductCustomiseTypeData.resultObject.totalcount,
        });
      } else {
        const msg1 = getProductCustomiseTypeData.message;
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

  editCustomiseType(id: any) {
    this.props.history.push("/edit-type/" + id);
  }

  viewCustomiseType(id: any) {
    this.props.history.push("/view-type/" + id);
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getProductCustomiseTypeData(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    this.getProductCustomiseTypeData(obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getProductCustomiseTypeData(obj.searchText, obj.page, obj.size);
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.typedata];
    copyTableData.sort(this.compareByDesc(key));
    this.setState({
      typedata: this.state.typedata = copyTableData,
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
      const obj = {
        moduleName: "Payout",
        id: data.pauoutId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      console.log("getStatusChange", getStatusChange);
      if (getStatusChange.status === 200) {
        const msg = getStatusChange.message;
        utils.showSuccess(msg);
        this.getProductCustomiseTypeData();
      } else {
        const msg1 = getStatusChange.message;
        utils.showError(msg1);
      }
    }
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

  getTable(typedata: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("typeName")}>
            <th>
              {
                constant.productCustomisePage.productCustomiseTypeTableColumn
                  .typename
              }
            </th>
            <th className="text-center">{constant.tableAction.status}</th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.typedata.length > 0 ? (
            <>
              {this.state.typedata.map((data: any, index: any) => (
                <tr key={index}>
                  <td>{data.typeName}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be inActive customise type",
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
                            "You should be Active customise type",
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
                        onClick={() =>
                          this.viewCustomiseType(data.productCustomizeTypeId)
                        }
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() =>
                          this.editCustomiseType(data.productCustomizeTypeId)
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
    for (
      let i = 1;
      i <=
      Math.ceil(
        parseInt(this.state.count) / parseInt(this.state.items_per_page)
      );
      i++
    ) {
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
                          {constant.productCustomisePage.title.typeTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/add-type">
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

                    {this.state.typedata.length > 0 ? (
                      <>{this.getTable(this.state.typedata)}</>
                    ) : (
                      <h1 className="text-center mt-5">No Data Found</h1>
                    )}
                    {this.state.typedata.length > 0
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

export default ListProductType;