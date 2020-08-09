export default {
  account: "Login to Account",
  loginpage: "Please enter your email and password to continue",
  signin: "Sign In",
  email: "Email Address",
  password: "Password",
  confirm: "Confirm Your Email",
  name: "Your Name",
  login: "Log In",
  signup: "Create Account",
  signuppage: "Please enter personal information to continue",
  forgotpassword: "Forgot Password?",
  notmember: "Do Not have an account?",
  register: "Register",
  back: "Back To Login",
  forgot: "Forgot Password?",
  reset: "Forgot Password",
  dashboard: "Dashboard",
  home: "Home",
  about: "About",
  service: "Service",
  logout: "Logout",
  filepath: "http://api.kartzoapp.com/",
  mainUrl: "http://api.kartzoapp.com/api/",
  apiUrl: "http://api.kartzoapp.com/v1/",
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1IiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoidXNlciBhYmMiLCJuYmYiOjE1OTU1NjUxNDMsImV4cCI6MTU5NTU4Njc0MywiaWF0IjoxNTk1NTY1MTQzfQ.KfSFaBXToiMLq4ULJUBmurIaNUrmZx181xqKOAD7il1Xr380mHx1DhpfV0OnqYuq-_IDhH3WzNKWIX31TnpjSQ",
    "Access-Control-Allow-Origin": true,
  },
  firstname: "Firstname",
  lastname: "Lastname",
  changepassword: "Change Password",
  dashboardTitle: "Dashboard",

  recoverPassword:'Recover Password',
  rolePrivilegesTitle: "Role Privileges Management",
  enter:'Enter your email to recover your password',
  subcategoryTitle: "Sub Category Management",
  addSubCategoryTitle: "Add SubCategory",
  viewSubCategoryTitle: "View SubCategory",
  profileTitle: "Profile",
  loginTitle: "Login",
  signupTitle: "Signup",
  couponManagement: "Coupon Management",
  merchantManagement: "Merchant Management",
  merchantBusinessManagement: "Merchant Business Management",
  merchantReviewManagement: "Merchant Review Management",
  viewProductManagement: "View Product",
  listProduct: "List Product",
  addProduct: "Add Product",
  imageProduct: "Image Product",
  listImageProduct: "List Image Product",
  inventoryProduct: "Add Inventory Product",
  viewImageProduct: "View Image Product",
  reviewProduct: "Review Product",
  addonProduct: "AddOn Product",
  delivery: "Delivery Management",
  addDelivery: "Add Delivery",
  viewDelivery: "View Delivery",
  listMerchantReview: "Merchant Review",
  listInventoryProduct: "Inventory Management",
  viewInventoryProduct: "View Inventory",
  viewProductReview: "View Product Review",
  ViewMerchantReview: "View Merchant Review",
  listOrderManagement: "Order Management",
  viewOrderManagement: "View Order",
  addCartOrder: "Order Cart Management",
  addOrder: "Add Order",
  listCartManagement: "Cart Management",
  viewCartManagement: "View Order Cart",
  addCustomerTitle: "Add Customer",
  viewCustomerTitle: "View Customer",
  listCustomer: "Customer Management",
  addAddress: "Add Address",
  listAddress: "Address Management",
  viewAddress: "View Address",
  listCard: "Card Management",
  addCard: "Add Card",
  viewCard: "View Card",

  tableAction: {
    status: "Status",
    action: "Action",
  },

  button: {
    update:'Update',
    Save:'Save',
    back:'Back',
    add:'Add'
  },

  pageNotFound: {
    gobackhome:'Go back home'
  },

  navbarPage: {
    profile:'Profile',
    changepassword:'Change Password',
    logout:'Log Out'
  },

  alertMsg:{
    msg:'new password && confirm password are not same please check again',
    newmsg:'new password && old password are same please change new password'
  },

  resetPasswordPage: {
    resetpassword:'Reset Password',
    resetButton:'Reset'
  },

  changePasswordPage: {
    state:{
      oldpassword: '',
      oldpassworderror:'',
      newpassword: '',
      newpassworderror:'',
      confirmpassword:'',
      confirmpassworderror:'',
      userid:0
  },
  title: {
    changepassword:'Change Password',
    oldpassword:'Old Password',
    newpassword:'New Password',
    confirmpassword:'Confirm Password'
  }
  },

  recordPerPage: {
    recordperPage: "Record Per Page",
    fifteen: "15",
    twenty: "20",
    thirty: "30",
    fifty: "50",
  },

  loginPage: {
    state: {
      email: "",
      emailerror: "",
      password: "",
      passworderror: "",
      ipAddress: "",
      isButton: false,
      type: 'password'
    }
  },

  profilePage: {
    state:{
    selectedFile: '',
    firstname: "",
    firstnameerror: "",
    lastname: "",
    lastnameerror: "",
    email: "",
    emailerror: "",
    mobilenumber: "",
    mobilenumbererror: "",
    selectedFileerror: "",
    role: "",
    roleerror: "",
    roleid: 1,
    roleiderror: "",
    userid:0,
    userrole:[],
    updateTrue:false,
    filetrue:false,
    file:''
    },

    profile:{
      profile:'My Profile',
      userimage:'User Image',
      lastname:'Last Name',
      firstname:'First Name',
      mobilenumber:'Mobile Number'
    }
  },

  userPage: {
    title: {
      addUserTitle: "Add User",
      updateUserTitle: "Update User",
      viewUserTitle: "View User",
      userTitle: "User Management",
      editUser:'Edit User',
      addUser:'Add User'
    },
    state: {
      count: "10",
      currentPage: "1",
      items_per_page: "10",
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      role: "",
      roleid: "0",
      onItemSelect: "",
      userrole: [],
      userdata: [],
      switchSort: false,
      isStatus: false,

      selectedFile: "",
      firstname: "",
      firstnameerror: "",
      lastname: "",
      lastnameerror: "",
      email: "",
      emailerror: "",
      mobilenumber: 0,
      mobilenumbererror: "",
      password: "",
      passworderror: "",
      checked: false,
      selectedFileerror: "",
      onItemSelecterror: "",
      updateTrue: false,
      filetrue:false,
      file: "",
      userid:0,
      rolename: "",
      type:'password'
    },
    userTableColumn: {
      firstname: "First Name",
      lastname: "Last Name",
      email: "E-Mail",
      role: "Role",
      mobilenumber:'Mobile Number',
      password:'Password',
      roleselect:'Select Role:',
      userimage:'User Image'
    },
    viewuser:{
      viewdetails:'View User Details'
    }
  },

  userRolePage: {
    title: {
      userRoleTitle: "Role Management",
      viewUserRoleTitle: "View Role",
      adduserRoleTitle: "Add Role",
      updateRoleTitle: "Update Role",
    },
    state: {
      count: "10",
      currentPage: "1",
      items_per_page: "10",
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      onItemSelect: "",
      userrole: [],
      switchSort: false,
      isStatus: false,

      rolename: "",
      rolenameerror: "",
      description: "",
      descriptionerror: "",
      isOpen: false,
      updateTrue:false,
      roleid:0
    },
    userRoleTableColumn: {
      rolename: "Role Name",
      description:'Description',
      isadminrole:'IsAdminRole'
    },
    viewrole:{
      roleview:'View Role'
    }
  },

  rolePrivileges:{
    state:{
      userrole: [],
      roleid: "0",
      onItemSelect: "",
      mainItemName: [],
      role: [],
      roleprivileges: [],
      _maincheck: false,
      _viewcheck: false,
      _editcheck: false,
      _addcheck: false,
      _deletecheck: false,
      _detailcheck: false,
      show: false,
    },
    title:{
      title:'Select Role To Manage The All Rights:',
      roleprivileges:'Role Privileges',
      name:'Name',
      edit:'Edit',
      view:'View',
      delete:'Delete',
      detail:'Detail',
      add:'Add'
    }
  },

  categoryPage: {
    title: {
      categoryTitle: "Category Management",
      addCategoryTitle: "Add Category",
      updateCategoryTitle: "Update Category",
      viewCategoryTitle: "View Category",
    },
    state: {
      count: "10",
      currentPage: "1",
      items_per_page: "10",
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      onItemSelect: "",
      categorydata: [],
      switchSort: false,
      isStatus: false,

      selectedFile: '',
      file: '',
      categoryname: '',
      categorynameerror: '',
      selectedFileerror: '',
      sortorder: 0,
      updateTrue: false,
      filetrue:false,
      categoryid: 0,
      categorylist:[],
      selectcategory:'',
      selectcategoryerror:'',
      parentCategory:''
    },
    caetgoryTableColumn: {
      categoryName: "Category Name",
      subCategoryName: "Sub Category Name",
      image: "Category Image",
      selectparentcategory:'Select Parent Category',
      sortorder:'Sort Order'
    },
    viewcategorydetail:{
      viewcategory:'View Catgeory Details'
    }
  },

  cityPage: {
    title: {
      addCityTitle: "Add City",
      viewCityTitle: "View City",
      updateCityTitle: "Update City",
      cityTitle: "City Management"
    },
    state: {
      count: "10",
      currentPage: "1",
      items_per_page: "10",
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      onItemSelect: "",
      citydata: [],
      switchSort: false,
      isStatus: false,

      stateid: "",
      stateiderror: "",
      cityname: "",
      citynameerror: "",
      selectedFileerror: "",
      selectedStateerror: "",
      statelist: [],
      updateTrue: false,
      statename: "",
      cityid: 0,
    },
    cityTableColumn: {
      cityName: "City Name",
      stateName: "State Name",
      selectstate:'Select State'
    },
    viewcitydetails:{
      viewcity:'View City Details'
    }
  },

  statePage: {
    title: {
      addStateTitle: "Add State",
      stateTitle: "State Management",
      viewStateTitle: "View State",
      updateStateTitle: "Update State"
    },
    state: {
      count: "10",
      currentPage: "1",
      items_per_page: "10",
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      onItemSelect: "",
      statedata: [],
      switchSort: false,
      isStatus: false,

      selectedFile: "",
      statename: "",
      statenameerror: "",
      selectedFileerror: "",
      file: "",
      countryid: "",
      countryiderror: "",
      stateid: 0,
      countrylist: [],
      updateTrue: false,
      filetrue: false,
      countryname: "",
    },
    stateTableColumn: {
      stateName: "State Name",
      countryName: "Country Name",
      selectcountry:'Select Country'
    }
  },

  countryPage: {
    title: {
      countryTitle: "Country Management",
      updateCountryTitle: "Update Country",
      addCountryTitle: "Add Country",
      viewCountryTitle: "View Country",
    },
    state: {
      count: "10",
      currentPage: "1",
      items_per_page: "10",
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      onItemSelect: "",
      countrydata: [],
      switchSort: false,
      isStatus: false,

      selectedFile: '',
      countryname: '',
      countrynameerror: '',
      countrycode: '',
      countrycodeerror: '',
      selectedFileerror: '',
      file:'',
      filetrue:false,
      updateTrue:false,
      countryid:0
    },
    countryTableColumn: {
      countryName: "Country Name",
      countryCode: "Country Code",
      countryFlag: "Country Flag"
    },
    viewcountrypagedetails : {
      viewcountry:'View Country Details'
    }
  },
};
