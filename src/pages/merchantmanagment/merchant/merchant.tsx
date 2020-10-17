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
  CustomInput,
  Form,
  Row,
} from "reactstrap";
import "./merchant.css";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import { Editor } from "@tinymce/tinymce-react";
import {
  LocationAPI,
  MerchantAPI,
  CategoryAPI,
} from "../../../service/index.service";
import {
  getDataByIdRequest,
  addMerchantStateRequest,
} from "../../../modelController";

class Merchant extends React.Component<{ history: any; location: any }> {
  merchantState: addMerchantStateRequest = constant.merchantPage.state;
  state = {
    selectedFile: this.merchantState.selectedFile,
    selectedProfileFile: this.merchantState.selectedProfileFile,
    selectedProofFile: this.merchantState.selectedProofFile,
    selectedDocumentFile: this.merchantState.selectedDocumentFile,
    s1: this.merchantState.s1,
    s2: this.merchantState.s2,
    s3: this.merchantState.s3,
    s4: this.merchantState.s4,
    firstname: this.merchantState.firstname,
    firstnameerror: this.merchantState.firstnameerror,
    lastname: this.merchantState.lastname,
    lastnameerror: this.merchantState.lastnameerror,
    email: this.merchantState.email,
    emailerror: this.merchantState.emailerror,
    mobilenumber: this.merchantState.mobilenumber,
    mobilenumbererror: this.merchantState.mobilenumbererror,
    shopname: this.merchantState.shopname,
    shopnamerror: this.merchantState.shopnamerror,
    address: this.merchantState.address,
    addresserror: this.merchantState.addresserror,
    city: this.merchantState.city,
    cityerror: this.merchantState.cityerror,
    user: this.merchantState.user,
    usererror: this.merchantState.usererror,
    zipcode: this.merchantState.zipcode,
    zipcodeerror: this.merchantState.zipcodeerror,
    latitude: this.merchantState.latitude,
    latitudeerror: this.merchantState.latitudeerror,
    longitude: this.merchantState.longitude,
    longitudeerror: this.merchantState.longitudeerror,
    website: this.merchantState.website,
    shoppingpolicy: this.merchantState.shoppingpolicy,
    shoppingpolicyerror: this.merchantState.shoppingpolicyerror,
    refundpolicy: this.merchantState.refundpolicy,
    refundpolicyerror: this.merchantState.refundpolicyerror,
    cancellationpolicy: this.merchantState.cancellationpolicy,
    cancellationpolicyerror: this.merchantState.cancellationpolicyerror,
    isOpen: this.merchantState.isOpen,
    checked: this.merchantState.checked,
    selectedProfileFileerror: this.merchantState.selectedProfileFileerror,
    selectedFileerror: this.merchantState.selectedFileerror,
    selectedProofFileerror: this.merchantState.selectedProofFileerror,
    selectedDocumentFileerror: this.merchantState.selectedDocumentFileerror,
    password: this.merchantState.password,
    passworderror: this.merchantState.passworderror,
    citydata: this.merchantState.citydata,
    type: this.merchantState.type,
    file: this.merchantState.file,
    filetrue: this.merchantState.filetrue,
    file1: this.merchantState.file1,
    file1true: this.merchantState.file1true,
    file2: this.merchantState.file2,
    file2true: this.merchantState.file2true,
    file4: this.merchantState.file4,
    file4true: this.merchantState.file4true,
    updateTrue: this.merchantState.updateTrue,
    merchantId: this.merchantState.merchantId,
    roleid: this.merchantState.roleid,
    roleiderror: this.merchantState.roleiderror,
    cityname: "",
    roledata: this.merchantState.roledata,
    categorydata: this.merchantState.categorydata,
    categoryid: this.merchantState.categoryid,
    categoryiderror: this.merchantState.categoryiderror,
  };

  constructor(props: any) {
    super(props);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
    this.addMerchant = this.addMerchant.bind(this);
    this.editMerchant = this.editMerchant.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeIDProof = this.onChangeIDProof.bind(this);
    this.onChangeDocumentHandler = this.onChangeDocumentHandler.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleEditorMainChange = this.handleEditorMainChange.bind(this);
    this.handleEditorUpChange = this.handleEditorUpChange.bind(this);
    this.removeDocumentIcon = this.removeDocumentIcon.bind(this);
    this.removeProofIcon = this.removeProofIcon.bind(this);
    this.removeProfilePhotoIcon = this.removeProfilePhotoIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getMerchantById = this.getMerchantById.bind(this);
    this.getCityById = this.getCityById.bind(this);
    this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
    this.onItemSelectRole = this.onItemSelectRole.bind(this);
    this.onItemSelectCategory = this.onItemSelectCategory.bind(this);
  }

  handleChange(checked: boolean) {
    this.setState({ isOpen: checked });
  }

  async componentDidMount() {
    this.getCity();
    this.getRole();
    this.getCategory();
    const merchantId = this.props.location.pathname.split("/")[2];
    if (merchantId !== undefined) {
      this.getMerchantById(merchantId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
      });
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.merchantPage.title.updateMerchantTitle + utils.getAppName();
    } else {
      document.title =
        constant.merchantPage.title.addMerchantTitle + utils.getAppName();
    }
  }

  async getMerchantById(id: getDataByIdRequest) {
    const getMerchantById: any = await MerchantAPI.getMerchantById(id);
    // console.log("getMerchantById", getMerchantById);
    if (getMerchantById) {
      if (getMerchantById.status === 200) {
        this.setState({
          merchantId: this.state.merchantId =
            getMerchantById.resultObject.merchantID,
          filetrue: this.state.filetrue = true,
          s1: this.state.s1 =
            getMerchantById.resultObject.shopLogo !== null
              ? getMerchantById.resultObject.shopLogo
              : "",
          s2: this.state.s2 =
            getMerchantById.resultObject.merchantIDPoof !== null
              ? getMerchantById.resultObject.merchantIDPoof
              : "",
          s3: this.state.s3 =
            getMerchantById.resultObject.merchantDocument !== null
              ? getMerchantById.resultObject.merchantDocument
              : "",
          s4: this.state.s4 =
            getMerchantById.resultObject.merchantProfilePhoto !== null
              ? getMerchantById.resultObject.merchantProfilePhoto
              : "",
          firstname: this.state.firstname =
            getMerchantById.resultObject.firstName,
          lastname: this.state.lastname = getMerchantById.resultObject.lastName,
          email: this.state.email = getMerchantById.resultObject.email,
          mobilenumber: this.state.mobilenumber =
            getMerchantById.resultObject.phone,
          shopname: this.state.shopname = getMerchantById.resultObject.shopName,
          address: this.state.address = getMerchantById.resultObject.address,
          city: this.state.city = getMerchantById.resultObject.cityID,
          zipcode: this.state.zipcode = getMerchantById.resultObject.zipCode,
          latitude: this.state.latitude = getMerchantById.resultObject.latitude,
          longitude: this.state.longitude =
            getMerchantById.resultObject.longitude,
          website: this.state.website = getMerchantById.resultObject.website,
          shoppingpolicy: this.state.shoppingpolicy = getMerchantById
            .resultObject.shippingPolicy
            ? getMerchantById.resultObject.shippingPolicy
            : "",
          refundpolicy: this.state.refundpolicy = getMerchantById.resultObject
            .refundPolicy
            ? getMerchantById.resultObject.refundPolicy
            : "",
          cancellationpolicy: this.state.cancellationpolicy = getMerchantById
            .resultObject.cancellationPolicy
            ? getMerchantById.resultObject.cancellationPolicy
            : "",
          password: this.state.password = getMerchantById.resultObject.password,
          file: this.state.file = getMerchantById.resultObject.logoPath,
          isOpen: this.state.isOpen = getMerchantById.resultObject.isActive,
          file1true: this.state.file1true = true,
          file1: this.state.file1 = getMerchantById.resultObject.idProofPath,
          file2: this.state.file2 = getMerchantById.resultObject.documentPath,
          file2true: this.state.file2true = true,
          file4: this.state.file4 =
            getMerchantById.resultObject.profilePhotoPath,
          file4true: this.state.file4true = true,
          roleid: this.state.roleid = getMerchantById.resultObject.roleID,
          categoryid: this.state.categoryid =
            getMerchantById.resultObject.categoryId,
        });
        this.getCityById(this.state.city);
      } else {
        const msg1 = getMerchantById.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  async getCityById(id: any) {
    const obj: getDataByIdRequest = {
      id: id,
    };
    const getCity = await LocationAPI.getCityById(obj);
    // console.log("getCity", getCity);

    if (getCity) {
      if (getCity.status === 200) {
        this.setState({
          cityname: this.state.cityname = getCity.resultObject
            ? getCity.resultObject.cityName
            : "",
        });
      } else {
        const msg1 = getCity.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  async getCity() {
    const getCity = await LocationAPI.getCity();
    // console.log("getCity", getCity);

    if (getCity) {
      if (getCity.status === 200) {
        this.setState({
          citydata: this.state.citydata = getCity.resultObject,
        });
      } else {
        const msg1 = getCity.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  async getCategory() {
    const getCategory = await CategoryAPI.getAllCategory();
    // console.log("getCategory", getCategory);

    if (getCategory) {
      if (getCategory.status === 200) {
        this.setState({
          categorydata: this.state.categorydata = getCategory.resultObject,
        });
      } else {
        const msg1 = getCategory.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  async getRole() {
    const getMerchantRole = await MerchantAPI.getMerchantRole();
    // console.log("getMerchantRole", getMerchantRole);

    if (getMerchantRole) {
      if (getMerchantRole.status === 200) {
        this.setState({
          roledata: this.state.roledata = getMerchantRole.resultObject,
        });
      } else {
        const msg1 = getMerchantRole.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  onUserSelect(event: any) {
    this.setState({
      user: this.state.user = event.target.value,
    });
  }

  onItemSelect(event: any) {
    this.setState({
      city: this.state.city = event.target.value,
    });
  }

  onItemSelectRole(event: any) {
    this.setState({
      roleid: this.state.roleid = event.target.value,
    });
  }

  onItemSelectCategory(event: any) {
    this.setState({
      categoryid: this.state.categoryid = event.target.value,
    });
  }

  onChangeProfilePicture(event: any) {
    if (this.state.file4true === true) {
      this.setState({
        file4true: this.state.file4true = false,
        selectedProfileFile: this.state.selectedProfileFile =
          event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file4: reader.result,
        });
      };
    } else {
      this.setState({
        selectedProfileFile: this.state.selectedProfileFile =
          event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file4: reader.result,
        });
      };
    }
  }

  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: this.state.filetrue = false,
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    } else {
      this.setState({
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    }
  }

  onChangeIDProof(event: any) {
    if (this.state.file1true === true) {
      this.setState({
        file1true: this.state.file1true = false,
        selectedProofFile: this.state.selectedProofFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file1: reader.result,
        });
      };
    } else {
      this.setState({
        selectedProofFile: this.state.selectedProofFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file1: reader.result,
        });
      };
    }
  }

  onChangeDocumentHandler(event: any) {
    if (this.state.file2true === true) {
      this.setState({
        file2true: this.state.file2true = false,
        selectedDocumentFile: this.state.selectedDocumentFile =
          event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file2: reader.result,
        });
      };
    } else {
      this.setState({
        selectedDocumentFile: this.state.selectedDocumentFile =
          event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file2: reader.result,
        });
      };
    }
  }

  handleClick = () =>
    this.setState(({ type }: any) => ({
      type: type === "password" ? "text" : "password",
    }));

  handleEditorChange = (content: any, editor: any) => {
    this.setState({
      refundpolicy: this.state.refundpolicy = content,
    });
  };

  handleEditorMainChange = (content: any, editor: any) => {
    this.setState({
      shoppingpolicy: this.state.shoppingpolicy = content,
    });
  };

  handleEditorUpChange = (content: any, editor: any) => {
    this.setState({
      cancellationpolicy: this.state.cancellationpolicy = content,
    });
  };

  validate() {
    let firstnameerror = "";
    let lastnameerror = "";
    let emailerror = "";
    let mobilenumbererror = "";
    let latitudeerror = "";
    let longitudeerror = "";
    let shopnamerror = "";
    let cityerror = "";
    let addresserror = "";
    let zipcodeerror = "";
    let passworderror = "";
    let roleiderror = "";
    let categoryiderror = "";

    if (!this.state.firstname) {
      firstnameerror = "please enter firstname";
    }

    if (!this.state.lastname) {
      lastnameerror = "please enter lastname";
    }

    var regex = /^\d{6}$/;
    if (!this.state.zipcode) {
      zipcodeerror = "please enter zipcode";
    } else if (!regex.test(this.state.zipcode)) {
      zipcodeerror = "please enter valid zipcode";
    }

    if (!this.state.address) {
      addresserror = "please enter address";
    }

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    const mobile: any = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    if (!this.state.mobilenumber) {
      mobilenumbererror = "please enter mobile number";
    } else if (!mobile.test(this.state.mobilenumber)) {
      mobilenumbererror = "please enter valid mobile number";
    }

    if (!this.state.password) {
      passworderror = "please enter password";
    }

    if (!this.state.latitude) {
      latitudeerror = "please enter latitude";
    }

    if (!this.state.longitude) {
      longitudeerror = "please enter longitude";
    }

    if (!this.state.shopname) {
      shopnamerror = "please enter shop name";
    }

    if (!this.state.roleid) {
      roleiderror = "please select role";
    }

    if (!this.state.city) {
      cityerror = "please select city";
    }

    if (!this.state.categoryid) {
      categoryiderror = "please select category";
    }

    if (
      firstnameerror ||
      lastnameerror ||
      addresserror ||
      zipcodeerror ||
      emailerror ||
      roleiderror ||
      mobilenumbererror ||
      latitudeerror ||
      longitudeerror ||
      shopnamerror ||
      cityerror ||
      passworderror ||
      categoryiderror
    ) {
      this.setState({
        firstnameerror,
        lastnameerror,
        addresserror,
        zipcodeerror,
        emailerror,
        mobilenumbererror,
        roleiderror,
        latitudeerror,
        longitudeerror,
        shopnamerror,
        cityerror,
        passworderror,
        categoryiderror,
      });
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

  async addMerchant() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        firstnameerror: "",
        lastnameerror: "",
        emailerror: "",
        mobilenumbererror: "",
        addresserror: "",
        zipcodeerror: "",
        categoryiderror: "",
        latitudeerror: "",
        longitudeerror: "",
        shopnamerror: "",
        roleiderror: "",
        cityerror: "",
        passworderror: "",
      });
      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.email &&
        this.state.mobilenumber &&
        this.state.shopname &&
        this.state.latitude &&
        this.state.longitude &&
        this.state.password &&
        this.state.roleid &&
        this.state.categoryid
      ) {
        let formData = new FormData();
        formData.append("RoleId", this.state.roleid);
        formData.append("FirstName", this.state.firstname);
        formData.append("LastName", this.state.lastname);
        formData.append("ShopName", this.state.shopname);
        formData.append("Email", this.state.email);
        formData.append("Phone", this.state.mobilenumber.toString());
        formData.append("Password", this.state.password);
        formData.append("Address", this.state.address);
        formData.append("CityId", this.state.city);
        formData.append("ZipCode", this.state.zipcode);
        formData.append("Latitude", this.state.latitude);
        formData.append("Longitude", this.state.longitude);
        formData.append("Website", this.state.website);
        formData.append(
          "IDProoffiles",
          this.state.selectedProofFile
            ? this.state.selectedProofFile[0]
            : "null"
        );
        formData.append(
          "Documentfiles",
          this.state.selectedDocumentFile
            ? this.state.selectedDocumentFile[0]
            : "null"
        );
        formData.append("ShippingPolicy", this.state.shoppingpolicy);
        formData.append("RefundPolicy", this.state.refundpolicy);
        formData.append("CancellationPolicy", this.state.cancellationpolicy);
        formData.append("isActive", new Boolean(this.state.isOpen).toString());
        formData.append(
          "Logofiles",
          this.state.selectedFile ? this.state.selectedFile[0] : "null"
        );
        formData.append(
          "profilephotofiles",
          this.state.selectedProfileFile
            ? this.state.selectedProfileFile[0]
            : "null"
        );
        formData.append("CategoryId", this.state.categoryid);
        formData.append("UserId", "0");

        const addMerchant = await MerchantAPI.addMerchant(formData);
        // console.log("addMerchant", addMerchant);
        if (addMerchant) {
          if (addMerchant.status === 200) {
            const msg1 = addMerchant.message;
            utils.showSuccess(msg1);
            this.props.history.push("/list-merchant");
          } else {
            const msg1 = addMerchant.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async editMerchant() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        firstnameerror: "",
        lastnameerror: "",
        emailerror: "",
        mobilenumbererror: "",
        addresserror: "",
        zipcodeerror: "",
        roleiderror: "",
        latitudeerror: "",
        longitudeerror: "",
        shopnamerror: "",
        categoryiderror: "",
        cityerror: "",
        passworderror: "",
      });
      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.email &&
        this.state.mobilenumber &&
        this.state.shopname &&
        this.state.latitude &&
        this.state.longitude &&
        this.state.password &&
        this.state.roleid &&
        this.state.categoryid
      ) {
        let formData = new FormData();
        formData.append("Id", this.state.merchantId);
        formData.append("RoleId", this.state.roleid);
        formData.append("FirstName", this.state.firstname);
        formData.append("LastName", this.state.lastname);
        formData.append("ShopName", this.state.shopname);
        formData.append("Email", this.state.email);
        formData.append("Phone", this.state.mobilenumber.toString());
        formData.append("Password", this.state.password);
        formData.append("Address", this.state.address);
        formData.append("CityId", this.state.city);
        formData.append("ZipCode", this.state.zipcode);
        formData.append("Latitude", this.state.latitude);
        formData.append("Longitude", this.state.longitude);
        formData.append("Website", this.state.website);
        formData.append("CategoryId", this.state.categoryid);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (this.state.selectedProofFile) {
          formData.append(
            "IDProoffiles",
            this.state.selectedProofFile ? this.state.selectedProofFile[0] : ""
          );
        } else {
          if (this.state.file1 === "") {
            formData.append(
              "MerchantIDPoof",
              this.state.s2 ? this.state.s2 : ""
            );
          }
        }

        if (this.state.selectedDocumentFile) {
          formData.append(
            "Documentfiles",
            this.state.selectedDocumentFile
              ? this.state.selectedDocumentFile[0]
              : ""
          );
        } else {
          if (this.state.file2 === "") {
            formData.append(
              "MerchantDocument",
              this.state.s3 ? this.state.s3 : ""
            );
          }
        }

        formData.append("ShippingPolicy", this.state.shoppingpolicy);
        formData.append("RefundPolicy", this.state.refundpolicy);
        formData.append("CancellationPolicy", this.state.cancellationpolicy);
        formData.append("isActive", new Boolean(this.state.isOpen).toString());
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (this.state.selectedFile) {
          formData.append(
            "Logofiles",
            this.state.selectedFile ? this.state.selectedFile[0] : ""
          );
        } else {
          if (this.state.file === "") {
            formData.append("ShopLogo", this.state.s1 ? this.state.s1 : "");
          }
        }

        if (this.state.selectedProfileFile) {
          formData.append(
            "profilephotofiles",
            this.state.selectedProfileFile
              ? this.state.selectedProfileFile[0]
              : ""
          );
        } else {
          if (this.state.file4 === "") {
            formData.append(
              "MerchantProfilePhoto",
              this.state.s4 ? this.state.s4 : ""
            );
          }
        }

        formData.append("UserId", "0");

        const editMerchant = await MerchantAPI.editMerchant(
          formData,
          this.state.merchantId
        );
        // console.log("editMerchant", editMerchant);
        if (editMerchant) {
          if (editMerchant.status === 200) {
            const msg1 = editMerchant.message;
            utils.showSuccess(msg1);
            this.props.history.push("/list-merchant");
          } else {
            const msg1 = editMerchant.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  removeIcon() {
    this.setState({
      file: this.state.file = "",
    });
  }

  removeDocumentIcon() {
    this.setState({
      file2: this.state.file2 = "",
    });
  }

  removeProofIcon() {
    this.setState({
      file1: this.state.file1 = "",
    });
  }

  removeProfilePhotoIcon() {
    this.setState({
      file4: this.state.file4 = "",
    });
  }

  render() {
    return (
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
                          {constant.merchantPage.title.updateMerchantTitle}
                        </h1>
                      </Col>
                    ) : (
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>{constant.merchantPage.title.addMerchantTitle}</h1>
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
                      <Link to="/list-merchant">
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
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="first_name">
                          {constant.merchantPage.merchantTableColumn.Firstname}
                        </Label>
                        <Input
                          type="text"
                          id="first_name"
                          name="firstname"
                          className="form-control"
                          value={this.state.firstname}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your first name"
                          required
                        />
                        <div className="mb-4 text-danger">
                          {this.state.firstnameerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="last_name">
                          {constant.merchantPage.merchantTableColumn.lastname}
                        </Label>
                        <Input
                          type="text"
                          id="last_name"
                          name="lastname"
                          className="form-control"
                          value={this.state.lastname}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your last name"
                          required
                        />
                        <div className="mb-4 text-danger">
                          {this.state.lastnameerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="email">
                          {constant.merchantPage.merchantTableColumn.email}
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={this.state.email}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your email"
                          required
                        />
                        <div className="mb-4 text-danger">
                          {this.state.emailerror}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="mobile_no">
                          {constant.merchantPage.merchantTableColumn.phone}
                        </Label>
                        <Input
                          type="text"
                          id="mobile_no"
                          name="mobilenumber"
                          className="form-control"
                          value={this.state.mobilenumber}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your mobile number"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.mobilenumbererror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <Form>
                        <FormGroup>
                          <Label for="exampleCustomSelect">
                            {constant.merchantPage.merchantTableColumn.city}
                          </Label>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="city"
                            onChange={this.onItemSelect}
                          >
                            {this.state.updateTrue === true ? (
                              <>
                                <option value={this.state.city}>
                                  {this.state.cityname}
                                </option>
                                {this.state.citydata.length > 0
                                  ? this.state.citydata.map(
                                      (data: any, index: any) => (
                                        <option key={index} value={data.value}>
                                          {data.name}
                                        </option>
                                      )
                                    )
                                  : ""}
                              </>
                            ) : (
                              <>
                                <option value="">Select City</option>
                                {this.state.citydata.length > 0
                                  ? this.state.citydata.map(
                                      (data: any, index: any) => (
                                        <option key={index} value={data.value}>
                                          {data.name}
                                        </option>
                                      )
                                    )
                                  : ""}
                              </>
                            )}
                          </CustomInput>
                          <div className="mb-4 text-danger">
                            {this.state.cityerror}
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label for="exampleCustomSelect">
                          {constant.merchantPage.merchantTableColumn.password}
                        </Label>

                        <div className="right-inner-addon input-group">
                          <input
                            type={this.state.type}
                            name="password"
                            className="form-control"
                            id="validationCustom09"
                            placeholder="Password"
                            onChange={this.handleChangeEvent}
                          />
                          {this.state.type === "password" ? (
                            <i
                              onClick={this.handleClick}
                              className="fas fa-eye"
                            ></i>
                          ) : (
                            <i
                              onClick={this.handleClick}
                              className="fas fa-eye-slash"
                            ></i>
                          )}
                        </div>
                        <div className="text-danger">
                          {this.state.passworderror}
                        </div>
                      </FormGroup>
                    </Col>

                    {/* <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">Select User</Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="user"
                              onChange={this.onUserSelect}
                            >
                              <option value="">Select User</option>
                              <option value="0">User-1</option>
                              <option value="1">User-2</option>
                            
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.usererror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col> */}
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="shopname">
                          {constant.merchantPage.merchantTableColumn.shopname}
                        </Label>
                        <Input
                          type="text"
                          id="shopname"
                          name="shopname"
                          className="form-control"
                          value={this.state.shopname}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your shop name"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.shopnamerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="Address">
                          {constant.merchantPage.merchantTableColumn.Address}
                        </Label>
                        <Input
                          type="text"
                          id="Address"
                          name="address"
                          className="form-control"
                          value={this.state.address}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your address"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.addresserror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="ZIP-Code">
                          {constant.merchantPage.merchantTableColumn.zipcode}
                        </Label>
                        <Input
                          type="text"
                          id="ZIP-Code"
                          name="zipcode"
                          className="form-control"
                          value={this.state.zipcode}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your zipe-code"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.zipcodeerror}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="Website">
                          {constant.merchantPage.merchantTableColumn.website}
                        </Label>
                        <Input
                          type="text"
                          id="Website"
                          name="website"
                          className="form-control"
                          value={this.state.website || ""}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your website"
                        />
                        {/* <div className="mb-4 text-danger">
                                                    {this.state.longitudeerror}
                                                </div> */}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="Latitude">
                          {constant.merchantPage.merchantTableColumn.latitude}
                        </Label>
                        <Input
                          type="text"
                          id="Latitude"
                          name="latitude"
                          className="form-control"
                          value={this.state.latitude}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your latitude"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.latitudeerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="Longitude">
                          {constant.merchantPage.merchantTableColumn.longitude}
                        </Label>
                        <Input
                          type="text"
                          id="Longitude"
                          name="longitude"
                          className="form-control"
                          value={this.state.longitude}
                          onChange={this.handleChangeEvent}
                          placeholder="Enter your longitude"
                        />
                        <div className="mb-4 text-danger">
                          {this.state.longitudeerror}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup className="img-upload">
                        {this.state.file !== "" ? (
                          <div className="img-size">
                            {this.state.file !== "" ? (
                              <div>
                                {this.state.filetrue === true ? (
                                  <img
                                    className="picture"
                                    src={
                                      constant.fileMerchantpath +
                                      this.state.file
                                    }
                                  />
                                ) : (
                                  <img
                                    className="picture"
                                    src={this.state.file}
                                  />
                                )}
                                <i
                                  className="fa fa-times cursor"
                                  onClick={() => this.removeIcon()}
                                ></i>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="">
                            <p style={{ fontSize: "16px" }}>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .selectedFile
                              }
                            </p>
                            <Label className="imag" for="file-input">
                              <i
                                className="fa fa-upload fa-lg"
                                style={{ color: "#20a8d8" }}
                              ></i>
                            </Label>
                            <Input
                              id="file-input"
                              type="file"
                              className="form-control"
                              name="file"
                              onChange={this.onChangeHandler.bind(this)}
                            />
                          </div>
                        )}
                        <div className="text-danger">
                          {this.state.selectedFileerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup className="img-upload1">
                        {this.state.file1 !== "" ? (
                          <div className="img-size">
                            {this.state.file1 !== "" ? (
                              <div>
                                {this.state.file1true === true ? (
                                  <img
                                    className="picture"
                                    src={
                                      constant.fileMerchantpath +
                                      this.state.file1
                                    }
                                  />
                                ) : (
                                  <img
                                    className="picture"
                                    src={this.state.file1}
                                  />
                                )}
                                <i
                                  className="fa fa-times cursor"
                                  onClick={() => this.removeProofIcon()}
                                ></i>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="">
                            <p style={{ fontSize: "16px" }}>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .selectMerchantIdProff
                              }
                            </p>
                            <Label className="imag" for="file-input1">
                              <i
                                className="fa fa-upload fa-lg"
                                style={{ color: "#20a8d8" }}
                              ></i>
                            </Label>
                            <Input
                              id="file-input1"
                              type="file"
                              className="form-control"
                              name="file1"
                              onChange={this.onChangeIDProof.bind(this)}
                            />
                          </div>
                        )}
                        <div className="text-danger">
                          {this.state.selectedProofFileerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup className="img-upload2">
                        {this.state.file2 !== "" ? (
                          <div className="img-size">
                            {this.state.file2 !== "" ? (
                              <div>
                                {this.state.file2true === true ? (
                                  <img
                                    className="picture"
                                    src={
                                      constant.fileMerchantpath +
                                      this.state.file2
                                    }
                                  />
                                ) : (
                                  <img
                                    className="picture"
                                    src={this.state.file2}
                                  />
                                )}
                                <i
                                  className="fa fa-times cursor"
                                  onClick={() => this.removeDocumentIcon()}
                                ></i>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="">
                            <p style={{ fontSize: "16px" }}>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .selectMerchantDocument
                              }
                            </p>
                            <Label className="imag" for="file-input2">
                              <i
                                className="fa fa-upload fa-lg"
                                style={{ color: "#20a8d8" }}
                              ></i>
                            </Label>
                            <Input
                              id="file-input2"
                              type="file"
                              className="form-control"
                              name="file2"
                              onChange={this.onChangeDocumentHandler.bind(this)}
                            />
                          </div>
                        )}
                        <div className="text-danger">
                          {this.state.selectedDocumentFileerror}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <div>
                        <p style={{ fontSize: "16px" }}>
                          {
                            constant.merchantPage.merchantTableColumn
                              .shoppingpolicy
                          }
                        </p>
                        <input
                          id="my-file1"
                          type="file"
                          name="my-file1"
                          style={{ display: "none" }}
                        />
                        <Editor
                          initialValue={
                            this.state.shoppingpolicy
                              ? this.state.shoppingpolicy
                              : ""
                          }
                          init={{
                            height: 200,
                            menubar: false,
                            images_upload_credentials: true,
                            plugins: [
                              "advlist autolink lists link image code imagetools charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help",
                            images_upload_handler: function (
                              blobInfo: any,
                              success: any,
                              failure: any
                            ) {
                              setTimeout(function (blobInfo) {
                                /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                success();
                              }, 2000);
                            },
                            file_picker_callback: function (
                              callback: any,
                              value: any,
                              meta: any
                            ) {
                              if (meta.filetype == "image") {
                                var input: any = document.getElementById(
                                  "my-file1"
                                );
                                input.click();
                                input.onchange = function () {
                                  var file = input.files[0];
                                  var reader = new FileReader();
                                  reader.onload = function (e: any) {
                                    callback(e.target.result, {
                                      alt: file.name,
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                };
                              }
                            },
                          }}
                          onEditorChange={this.handleEditorMainChange}
                        />
                      </div>
                      <div className="text-danger">
                        {this.state.shoppingpolicyerror}
                      </div>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <div>
                        <p style={{ fontSize: "16px" }}>
                          {
                            constant.merchantPage.merchantTableColumn
                              .refundpolicy
                          }
                        </p>
                        <input
                          id="my-file2"
                          type="file"
                          name="my-file2"
                          style={{ display: "none" }}
                        />
                        <Editor
                          initialValue={
                            this.state.refundpolicy
                              ? this.state.refundpolicy
                              : ""
                          }
                          init={{
                            height: 200,
                            menubar: false,
                            images_upload_credentials: true,
                            plugins: [
                              "advlist autolink lists link image code imagetools charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help",
                            images_upload_handler: function (
                              blobInfo: any,
                              success: any,
                              failure: any
                            ) {
                              setTimeout(function (blobInfo) {
                                /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                success();
                              }, 2000);
                            },
                            file_picker_callback: function (
                              callback: any,
                              value: any,
                              meta: any
                            ) {
                              if (meta.filetype == "image") {
                                var input: any = document.getElementById(
                                  "my-file2"
                                );
                                input.click();
                                input.onchange = function () {
                                  var file = input.files[0];
                                  var reader = new FileReader();
                                  reader.onload = function (e: any) {
                                    callback(e.target.result, {
                                      alt: file.name,
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                };
                              }
                            },
                          }}
                          onEditorChange={this.handleEditorChange}
                        />
                      </div>
                      <div className="text-danger">
                        {this.state.refundpolicyerror}
                      </div>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <div>
                        <p style={{ fontSize: "16px" }}>
                          {
                            constant.merchantPage.merchantTableColumn
                              .cancellationpolicy
                          }
                        </p>
                        <input
                          id="my-file3"
                          type="file"
                          name="my-file3"
                          style={{ display: "none" }}
                        />
                        <Editor
                          initialValue={
                            this.state.cancellationpolicy
                              ? this.state.cancellationpolicy
                              : ""
                          }
                          init={{
                            height: 200,
                            menubar: false,
                            images_upload_credentials: true,
                            plugins: [
                              "advlist autolink lists link image code imagetools charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help",
                            images_upload_handler: function (
                              blobInfo: any,
                              success: any,
                              failure: any
                            ) {
                              setTimeout(function (blobInfo) {
                                /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                success();
                              }, 2000);
                            },
                            file_picker_callback: function (
                              callback: any,
                              value: any,
                              meta: any
                            ) {
                              if (meta.filetype == "image") {
                                var input: any = document.getElementById(
                                  "my-file3"
                                );
                                input.click();
                                input.onchange = function () {
                                  var file = input.files[0];
                                  var reader = new FileReader();
                                  reader.onload = function (e: any) {
                                    callback(e.target.result, {
                                      alt: file.name,
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                };
                              }
                            },
                          }}
                          onEditorChange={this.handleEditorUpChange}
                        />
                      </div>
                      <div className="text-danger">
                        {this.state.cancellationpolicyerror}
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <FormGroup className="img-upload5">
                        {this.state.file4 !== "" ? (
                          <div className="img-size">
                            {this.state.file4 !== "" ? (
                              <div>
                                {this.state.file4true === true ? (
                                  <img
                                    className="picture"
                                    src={
                                      constant.fileMerchantpath +
                                      this.state.file4
                                    }
                                  />
                                ) : (
                                  <img
                                    className="picture"
                                    src={this.state.file4}
                                  />
                                )}
                                <i
                                  className="fa fa-times cursor"
                                  onClick={() => this.removeProfilePhotoIcon()}
                                ></i>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="">
                            <p style={{ fontSize: "16px" }}>
                              {
                                constant.merchantPage.merchantTableColumn
                                  .profilePhoto
                              }
                            </p>
                            <Label className="imag" for="file-input4">
                              <i
                                className="fa fa-upload fa-lg"
                                style={{ color: "#20a8d8" }}
                              ></i>
                            </Label>
                            <Input
                              id="file-input4"
                              type="file"
                              className="form-control"
                              name="file4"
                              onChange={this.onChangeProfilePicture.bind(this)}
                            />
                          </div>
                        )}
                        <div className="text-danger">
                          {this.state.selectedProfileFileerror}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <label>
                        <span>
                          {constant.merchantPage.merchantTableColumn.isOpen}
                        </span>
                        <br />
                        <div style={{ marginTop: "10px" }}>
                          <Switch
                            onChange={this.handleChange}
                            checked={this.state.isOpen}
                          />
                        </div>
                      </label>
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <Form>
                        <FormGroup>
                          <Label for="exampleCustomSelect">
                            {
                              constant.merchantPage.merchantTableColumn
                                .selectrole
                            }
                          </Label>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="city"
                            onChange={this.onItemSelectRole}
                            value={this.state.roleid ? this.state.roleid : ""}
                          >
                            <option value="">
                              {" "}
                              {
                                constant.merchantPage.merchantTableColumn
                                  .selectrole
                              }
                            </option>
                            {this.state.roledata.length > 0
                              ? this.state.roledata.map(
                                  (data: any, index: any) => (
                                    <option key={index} value={data.value}>
                                      {data.name}
                                    </option>
                                  )
                                )
                              : ""}
                          </CustomInput>
                          <div className="mb-4 text-danger">
                            {this.state.roleiderror}
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                      <Form>
                        <FormGroup>
                          <Label for="exampleCustomSelect">
                            {
                              constant.merchantPage.merchantTableColumn
                                .selectcategory
                            }
                          </Label>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="category"
                            onChange={this.onItemSelectCategory}
                            value={
                              this.state.categoryid ? this.state.categoryid : ""
                            }
                          >
                            <option value="">
                              {" "}
                              {
                                constant.merchantPage.merchantTableColumn
                                  .selectcategory
                              }
                            </option>
                            {this.state.categorydata.length > 0
                              ? this.state.categorydata.map(
                                  (data: any, index: any) => (
                                    data.parentCategoryId === 0 ? (
                                    <option key={index} value={data.value}>
                                      {data.name}
                                    </option>
                                    ) : ('')
                                  )
                                )
                              : ""}
                          </CustomInput>
                          <div className="mb-4 text-danger">
                            {this.state.categoryiderror}
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                  {this.state.updateTrue === true ? (
                    <Button
                      type="button"
                      size="sm"
                      color="primary"
                      className="mb-2 mt-3 mr-2 custom-button"
                      onClick={this.editMerchant}
                    >
                      {constant.button.update}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      color="primary"
                      className="mb-2 mt-3 mr-2 custom-button"
                      onClick={this.addMerchant}
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
    );
  }
}

export default Merchant;
