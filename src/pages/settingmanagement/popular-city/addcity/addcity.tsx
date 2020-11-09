import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  FormGroup,
  Label,
  CustomInput,
  Row,
  Form,
} from "reactstrap";
import { SettingAPI,LocationAPI } from "../../../../service/index.service";
import constant from "../../../../constant/constant";
import {
  settingCreateRequest,
  settingUpdateRequest,
  getDataByIdRequest,
  addSettingStateRequest,
  getAllTableDataListRequest
} from "../../../../modelController";
import './addcity.css';

class AddPopularCity extends React.Component<{ history: any; location: any }> {
  settingState: addSettingStateRequest = constant.settingPage.state;
  state = {
    identifier: this.settingState.identifier,
    identifiererror: this.settingState.identifiererror,
    value: this.settingState.value,
    valueerror: this.settingState.valueerror,
    isActive: this.settingState.isActive,
    updateTrue: this.settingState.updateTrue,
    settingid: this.settingState.settingid,
    citydata:[],
    isShow:true
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.addSetting = this.addSetting.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.getSettingById = this.getSettingById.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getcity = this.getcity.bind(this);
  }

  async componentDidMount() {
    const settingId = this.props.location.pathname.split("/")[2];
    if (settingId !== undefined) {
      this.getSettingById(settingId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.settingPage.title.updatepopularcityTitle + utils.getAppName();
    } else {
      document.title =
        constant.settingPage.title.addpopularcityTitle + utils.getAppName();
    }
    this.getcity();
  }

  async getSettingById(settingId: any) {
    const obj: getDataByIdRequest = {
      id: settingId,
    };
    const getSettingById: any = await SettingAPI.getSettingById(obj);
    // console.log("getSettingById", getSettingById);

    if (getSettingById) {
      if (getSettingById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          identifier: this.state.identifier = getSettingById.resultObject.identifier,
          settingid: this.state.settingid = getSettingById.resultObject.settingId,
          value: this.state.value =
            getSettingById.resultObject.value,
          isActive: this.state.isActive = getSettingById.resultObject.isActive
        });
      } else {
        const msg1 = getSettingById.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  //   handleChange(checked: boolean) {
  //     this.setState({ isOpen: this.state.isOpen = checked });
  //   }

  validate() {
    let valueerror = "";

    if (!this.state.value) {
      valueerror = "please select city";
    }

    if (valueerror) {
      this.setState({valueerror });
      return false;
    }
    return true;
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async addSetting() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        valueerror: "",
      });
      if (this.state.value) {
        const obj: settingCreateRequest = {
          identifier: "City",
          value: this.state.value,
          isActive: this.state.isActive
        };

        const addSetting = await SettingAPI.addSetting(obj);
        // console.log("addSetting", addSetting);

        if (addSetting) {
          if (addSetting.status === 200) {
            const msg1 = addSetting.message;
            utils.showSuccess(msg1);
            this.props.history.push("/list-popular-city");
          } else {
            const msg1 = addSetting.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async updateSetting() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        valueerror: "",
      });
      if (this.state.value) {
        const obj: settingUpdateRequest = {
          settingId: parseInt(this.state.settingid),
          identifier: this.state.identifier,
          value: this.state.value,
          isActive: this.state.isActive
        };

        const updateSetting = await SettingAPI.updateSetting(obj);
        // console.log("updateSetting", updateSetting);

        if (updateSetting) {
          if (updateSetting.status === 200) {
            const msg1 = updateSetting.message;
            utils.showSuccess(msg1);
            this.props.history.push("/list-popular-city");
          } else {
            const msg1 = updateSetting.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async getcity() {
  
    var getCityData = await LocationAPI.getCity();
    console.log("getSettingData", getCityData);

    if (getCityData) {
      if(getCityData.status === 200) {
      this.setState({
        citydata: this.state.citydata =
        getCityData.resultObject
      });
    } else {
      const msg1 = getCityData.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  onItemSelect(e:any) {
    this.setState({
      value:this.state.value = e.target.value
    })
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.settingPage.title.updatepopularcityTitle}</h1>
                        </Col>
                      ) : (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1>{constant.settingPage.title.addpopularcityTitle}</h1>
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
                        <Link to="/list-popular-city">
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
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            {constant.settingPage.settingTableColumn.identifier}
                          </Label>
                          <Input
                            type="text"
                            id="role_name"
                            className="form-control"
                            value="City"
                            // onChange={this.handleChangeEvent}
                            // placeholder="Enter your identifier"
                            disabled
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.identifiererror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                             Select City
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                              value={this.state.value ? this.state.value : ''}
                            >
                              <option value="">
                                  Select City
                                  </option>
                                  {this.state.citydata.length > 0
                                    ? this.state.citydata.map(
                                        (data: any, index: any) => (
                                          <option
                                            key={index}
                                            value={data.value}
                                          >
                                            {data.name}
                                          </option>
                                        )
                                      )
                                    : ""}
                              {/* <option value="">
                                {constant.taxPage.taxTableColumn.category}
                              </option>
                              {this.state.categorydata.length > 0
                                ? this.state.categorydata.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""} */}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.valueerror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                        <Label htmlFor="description">  {constant.settingPage.settingTableColumn.value}</Label>
                          <div className="serch-city">
                         
                          <Input
                        className="form-control search"
                        id="search11"
                        type="text"
                        name="value"
                        placeholder="Search"
                        // value={this.state.value}
                        onKeyUp={this.searchApplicationDataKeyUp}
                      />
                      {
                        this.state.citydata && this.state.isShow === true ? (
                          this.state.citydata.length > 0 && this.state.citydata.map((city:any,index:number) =>(
                            <div className="drop-menu" key={index}>
                            <span onClick={() => this.getCityName(city.cityName)}>{city.cityName}</span>
                        </div>
                          ))
                        ) : ('')
                      }
                    

                          </div>
                        
                        </FormGroup>
                      </Col>
                    </Row> */}

                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateSetting}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                        <Button
                          type="button"
                          size="sm"
                          color="primary"
                          className="mb-2 mr-2 custom-button"
                          onClick={this.addSetting}
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

export default AddPopularCity;
