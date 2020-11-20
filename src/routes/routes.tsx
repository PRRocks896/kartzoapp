import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "../pages/usersmanagment/users/users";
import UserRole from "../pages/usersmanagment/userrole/userrole";
import Signup from "../pages/signup/signup";
import Dashboard from "../pages/dashboard/dashboard";
import UserRoleToRights from "../pages/usersmanagment/userroletorights/userroletorights";
import Profile from "../pages/profile/profile";
import AddUser from "../pages/usersmanagment/adduser/adduser";
import Category from "../pages/categorymanagment/category/category";
import SubCategory from "../pages/categorymanagment/subcategory/subcategory";
import AddCategory from "../pages/categorymanagment/addcategory/addcategory";
import AddSubCategory from "../pages/categorymanagment/addsubcategory/addsubcategory";
import AddUserRole from "../pages/usersmanagment/adduserrole/adduserrole";
import CountryManagment from "../pages/locationmanagment/countrymanagment/countrymanagment";
import AddCountry from "../pages/locationmanagment/addcountry/addcountry";
import StateManagment from "../pages/locationmanagment/statemanagment/statemanagment";
import AddState from "../pages/locationmanagment/addstate/addstate";
import City from "../pages/locationmanagment/citymanagment/city";
import AddCity from "../pages/locationmanagment/addcity/addcity";
import ViewUser from "../pages/usersmanagment/viewuser/viewuser";
import ViewUserRole from "../pages/usersmanagment/viewuserrole/viewuserrole";
import ViewCategory from "../pages/categorymanagment/viewcategory/viewcategory";
import ViewSubCategory from "../pages/categorymanagment/viewsubcategory/viewsubcategory";
import ViewCity from "../pages/locationmanagment/viewcity/viewcity";
import ViewState from "../pages/locationmanagment/viewstate/viewstate";
import ViewCountry from "../pages/locationmanagment/viewcountry/viewcountry";
import Tables from "../component/tables/table";
import Coupon from "../pages/couponmanagment/couponmanagment";
import Merchant from "../pages/merchantmanagment/merchant/merchant";
import MerchantBusiness from "../pages/merchantmanagment/business-management/business";
import MerchantReview from "../pages/merchantmanagment/review-management/reviewmanagement";
import AddProduct from "../pages/productmanagment/addproduct/addproduct";
import ImageProduct from "../pages/productmanagment/imageproduct/imageproduct";
import InventoryProduct from "../pages/productmanagment/inventoryproduct/inventoryproduct";
import ListProduct from "../pages/productmanagment/listproduct/listproduct";
import ViewProduct from "../pages/productmanagment/viewproduct/viewproduct";
import ProductReview from "../pages/productmanagment/reviewproduct/reviewproduct";
import AddOnProduct from "../pages/productmanagment/addonmanagment/addonmanagment";
import DeliveryManagement from "../pages/deliverymanagment/deliverymanagment";
import AddDelivery from "../pages/deliverymanagment/adddelivery/adddelivery";
import ViewDelivery from "../pages/deliverymanagment/viewdelivery/viewdelivery";
import ListProductImage from "../pages/productmanagment/listimageproduct/listimageproduct";
import ViewProductImage from "../pages/productmanagment/viewproductimage/viewproductimage";
import ListMerchantReview from "../pages/merchantmanagment/listreview/listreview";
import ListProductInventory from "../pages/productmanagment/listinventory/listinventory";
import ViewProductInventory from "../pages/productmanagment/viewproductinventory/viewinventory";
import ListProductReview from "../pages/productmanagment/listproductreview/listproductreview";
import ViewProductReview from "../pages/productmanagment/viewproductreview/viewproductreview";
import ViewMerchantReview from "../pages/merchantmanagment/viewmerchantreview/viewmerchantreview";
import OrderManagement from "../pages/ordermanagment/order/order";
import ListOrderManagement from "../pages/ordermanagment/listorder/listorder";
import OrderCartManagement from "../pages/ordermanagment/cart/cart";
import ViewOrderManagement from "../pages/ordermanagment/vieworder/vieworder";
import ListCartManagement from "../pages/ordermanagment/listcart/listcart";
import ViewCartManagement from "../pages/ordermanagment/viewcart/viewcart";
import ListUser from "../pages/customermanagment/listuser/listuser";
import AddCustomer from "../pages/customermanagment/adduser/adduser";
import ViewCustomer from "../pages/customermanagment/viewuser/viewuser";
import ListAddress from "../pages/customermanagment/listaddress/listaddress";
import AddAddress from "../pages/customermanagment/addaddress/addaddress";
import ViewAddress from "../pages/customermanagment/viewaddress/viewaddress";
import ListCard from "../pages/customermanagment/listcard/listcard";
import AddCard from "../pages/customermanagment/addcard/addcard";
import ViewCard from "../pages/customermanagment/viewcard/viewcard";
import ChangePassword from "../pages/chnagepassword/changepassword";
import Page404 from "../pages/pagenotfound/pagenotfound";
import ListCoupon from "../pages/couponmanagment/listcoupon/listcoupon";
import ViewCoupon from "../pages/couponmanagment/viewcoupon/viewcoupon";
import ListCouponMap from "../pages/couponmanagment/listcouponmapping/listmap";
import AddCouponMapping from "../pages/couponmanagment/addcouponmapping/addmap";
import ListMerchant from "../pages/merchantmanagment/listmerchant/listmerchant";
import ListBussinessHours from "../pages/merchantmanagment/listhours/listhours";
import ViewBusinessHours from "../pages/merchantmanagment/viewhours/viewhours";
import ViewMerchant from "../pages/merchantmanagment/viewmerchant/viewmerchant";
import ListSetting from "../pages/settingmanagement/setting/setting";
import AddSetting from "../pages/settingmanagement/setting/addsetting/addsetting";
import ViewSetting from "../pages/settingmanagement/setting/viewsetting/viewsetting";
import ListFee from "../pages/settingmanagement/fee/fee";
import AddFee from "../pages/settingmanagement/fee/addfee/addfee";
import ViewFee from "../pages/settingmanagement/fee/viewfee/viewfee";
import ListTax from "../pages/settingmanagement/tax/tax";
import AddTax from "../pages/settingmanagement/tax/addtax/addtax";
import ViewTax from "../pages/settingmanagement/tax/viewtax/viewtax";
import ListPayout from "../pages/settingmanagement/payout/listpayout";
import AddPayout from "../pages/settingmanagement/payout/addpayout/addpayout";
import ViewPayout from "../pages/settingmanagement/payout/viewpayout/viewpayout";
import ListMatrix from "../pages/settingmanagement/matrix/matrix";
import AddMatrix from "../pages/settingmanagement/matrix/addmatrix/addmatrix";
import ViewMatrix from "../pages/settingmanagement/matrix/viewmatrix/viewmatrix";
import ListSlider from "../pages/settingmanagement/homeslider/listslider";
import AddSlider from "../pages/settingmanagement/homeslider/addslider/addslider";
import ViewSlider from "../pages/settingmanagement/homeslider/viewslider/viewslider";
import ListProductType from "../pages/productmanagment/listcustomisetype/listtype";
import AddProductType from "../pages/productmanagment/addproducttype/addtype";
import ViewProductType from "../pages/productmanagment/viewcustomisetype/viewtype";
import ListProductAddOn from "../pages/productmanagment/listaddon/listaddon";
import ViewProductCustomise from "../pages/productmanagment/viewcustomise/viewcustomise";
import NavBar from "../component/navbar/navbar";
import ViewCouponMapping from "../pages/couponmanagment/viewmapping/viewmapping";
import ListMenu from "../pages/usersmanagment/menu/listmenu";
import ViewMenuItem from "../pages/usersmanagment/viewmenu/viewmenu";
import AddMenu from "../pages/usersmanagment/addmenu/addmenu";
import AddPopularCity from "../pages/settingmanagement/popular-city/addcity/addcity";
import ViewPopularCity from "../pages/settingmanagement/popular-city/viewcity/viewcity";
import ListPopularCity from "../pages/settingmanagement/popular-city/popular-city";

class Main extends React.Component<{ history: any }> {
  
  /** constructor call */
  constructor(props: any) {
    super(props);
    // console.log("Main props", this.props);
  }

  componentDidMount() {
    // const rightdata: any = localStorage.getItem("rolePreveliges");
    // let user_right = JSON.parse(rightdata);

  }

  /** Render DOM */
  render() {
    // let rights = {
    //   add: true,
    // };
    return (
      <Router>
        <NavBar {...this.props}>
          <Switch>
            <Route
              path="/dashboard"
              name="Dashboard"
              render={(props: any) => <Dashboard {...props} />}
            />
            <Route
              path="/signup"
              render={(props: any) => <Signup {...props} />}
            />
            <Route
              path="/users"
              render={(props: any) => <Users {...props} />}
            />
            <Route
              path="/userrole"
              render={(props: any) => <UserRole {...props} />}
            />
            <Route
              path="/userroletorights"
              render={(props: any) => <UserRoleToRights {...props} />}
            />
            <Route
              path="/profile"
              render={(props: any) => <Profile {...props} />}
            />
            <Route
              path="/adduser"
              render={(props: any) => <AddUser {...props} />}
            />
            <Route
              path="/edituser/:id"
              render={(props: any) => <AddUser {...props} />}
            />
            <Route
              path="/category"
              render={(props: any) => <Category {...props} />}
            />
            <Route
              path="/subcategory"
              render={(props: any) => <SubCategory {...props} />}
            />
            <Route
              path="/addcategory"
              render={(props: any) => <AddCategory {...props} />}
            />
            <Route
              path="/editcategory/:id"
              render={(props: any) => <AddCategory {...props} />}
            />
            <Route
              path="/addsubcategory"
              render={(props: any) => <AddSubCategory {...props} />}
            />
            <Route
              path="/editsubcategory/:id"
              render={(props: any) => <AddSubCategory {...props} />}
            />
            <Route
              path="/adduserrole"
              render={(props: any) => <AddUserRole {...props} />}
            />
            <Route
              path="/edituserrole/:id"
              render={(props: any) => <AddUserRole {...props} />}
            />
            <Route
              path="/country"
              render={(props: any) => <CountryManagment {...props} />}
            />
            <Route
              path="/addcountry"
              render={(props: any) => <AddCountry {...props} />}
            />
            <Route
              path="/editcountry/:id"
              render={(props: any) => <AddCountry {...props} />}
            />
            <Route
              path="/state"
              render={(props: any) => <StateManagment {...props} />}
            />
            <Route
              path="/addstate"
              render={(props: any) => <AddState {...props} />}
            />
            <Route
              path="/editstate/:id"
              render={(props: any) => <AddState {...props} />}
            />
            <Route path="/city" render={(props: any) => <City {...props} />} />
            <Route
              path="/addcity"
              render={(props: any) => <AddCity {...props} />}
            />
            <Route
              path="/editcity/:id"
              render={(props: any) => <AddCity {...props} />}
            />
            <Route
              path="/viewuser/:id"
              render={(props: any) => <ViewUser {...props} />}
            />
            <Route
              path="/viewuserrole/:id"
              render={(props: any) => <ViewUserRole {...props} />}
            />
            <Route
              path="/viewcategory/:id"
              render={(props: any) => <ViewCategory {...props} />}
            />
            <Route
              path="/viewsubcategory/:id"
              render={(props: any) => <ViewSubCategory {...props} />}
            />
            <Route
              path="/viewcity/:id"
              render={(props: any) => <ViewCity {...props} />}
            />
            <Route
              path="/viewstate/:id"
              render={(props: any) => <ViewState {...props} />}
            />
            <Route
              path="/viewcountry/:id"
              render={(props: any) => <ViewCountry {...props} />}
            />
            <Route
              path="/table"
              render={(props: any) => <Tables {...props} />}
            />

            <Route
              path="/merchant-review"
              render={(props: any) => <MerchantReview {...props} />}
            />
            <Route
              path="/product"
              render={(props: any) => <AddProduct {...props} />}
            />
            <Route
              path="/edit-product/:id"
              render={(props: any) => <AddProduct {...props} />}
            />
            <Route
              path="/view-product/:id"
              render={(props: any) => <ViewProduct {...props} />}
            />
            <Route
              path="/product-image"
              render={(props: any) => <ImageProduct {...props} />}
            />
            <Route
              path="/product-inventory"
              render={(props: any) => <InventoryProduct {...props} />}
            />
            <Route
              path="/list-product"
              render={(props: any) => <ListProduct {...props} />}
            />
            <Route
              path="/product-review"
              render={(props: any) => <ProductReview {...props} />}
            />

            <Route
              path="/delivery"
              render={(props: any) => <DeliveryManagement {...props} />}
            />
            <Route
              path="/add-delivery"
              render={(props: any) => <AddDelivery {...props} />}
            />
            <Route
              path="/editdelivery"
              render={(props: any) => <AddDelivery {...props} />}
            />
            <Route
              path="/viewdelivery"
              render={(props: any) => <ViewDelivery {...props} />}
            />
            <Route
              path="/list-product-image"
              render={(props: any) => <ListProductImage {...props} />}
            />
            <Route
              path="/edit-product-image"
              render={(props: any) => <ImageProduct {...props} />}
            />
            <Route
              path="/view-product-image"
              render={(props: any) => <ViewProductImage {...props} />}
            />
            <Route
              path="/list-merchant-review"
              render={(props: any) => <ListMerchantReview {...props} />}
            />
            <Route
              path="/list-product-inventory"
              render={(props: any) => <ListProductInventory {...props} />}
            />
            <Route
              path="/edit-product-inventory"
              render={(props: any) => <InventoryProduct {...props} />}
            />
            <Route
              path="/view-product-inventory"
              render={(props: any) => <ViewProductInventory {...props} />}
            />
            <Route
              path="/list-product-review"
              render={(props: any) => <ListProductReview {...props} />}
            />
            <Route
              path="/view-product-review"
              render={(props: any) => <ViewProductReview {...props} />}
            />
            <Route
              path="/view-merchant-review"
              render={(props: any) => <ViewMerchantReview {...props} />}
            />
            <Route
              path="/list-order"
              render={(props: any) => <ListOrderManagement {...props} />}
            />
            <Route
              path="/add-order"
              render={(props: any) => <OrderManagement {...props} />}
            />
            <Route
              path="/edit-order-details"
              render={(props: any) => <OrderManagement {...props} />}
            />
            <Route
              path="/view-order-details"
              render={(props: any) => <ViewOrderManagement {...props} />}
            />
            <Route
              path="/order-cart"
              render={(props: any) => <OrderCartManagement {...props} />}
            />
            <Route
              path="/list-cart"
              render={(props: any) => <ListCartManagement {...props} />}
            />
            <Route
              path="/view-cart-order"
              render={(props: any) => <ViewCartManagement {...props} />}
            />
            <Route
              path="/list-user"
              render={(props: any) => <ListUser {...props} />}
            />
            <Route
              path="/add-user"
              render={(props: any) => <AddCustomer {...props} />}
            />
            <Route
              path="/edit-user"
              render={(props: any) => <AddCustomer {...props} />}
            />
            <Route
              path="/view-user"
              render={(props: any) => <ViewCustomer {...props} />}
            />
            <Route
              path="/list-address"
              render={(props: any) => <ListAddress {...props} />}
            />
            <Route
              path="/add-address"
              render={(props: any) => <AddAddress {...props} />}
            />
            <Route
              path="/edit-address"
              render={(props: any) => <AddAddress {...props} />}
            />
            <Route
              path="/view-address"
              render={(props: any) => <ViewAddress {...props} />}
            />
            <Route
              path="/list-card"
              render={(props: any) => <ListCard {...props} />}
            />
            <Route
              path="/add-card"
              render={(props: any) => <AddCard {...props} />}
            />
            <Route
              path="/edit-card"
              render={(props: any) => <AddCard {...props} />}
            />
            <Route
              path="/view-card"
              render={(props: any) => <ViewCard {...props} />}
            />
            <Route
              path="/change-password"
              render={(props: any) => <ChangePassword {...props} />}
            />
            <Route
              path="/listcoupon"
              render={(props: any) => <ListCoupon {...props} />}
            />
            <Route
              path="/add-coupon"
              render={(props: any) => <Coupon {...props} />}
            />
            <Route
              path="/edit-coupon/:id"
              render={(props: any) => <Coupon {...props} />}
            />
            <Route
              path="/view-coupon/:id"
              render={(props: any) => <ViewCoupon {...props} />}
            />
            <Route
              path="/list-coupon-map"
              render={(props: any) => <ListCouponMap {...props} />}
            />
            <Route
              path="/add-coupon-map"
              render={(props: any) => <AddCouponMapping {...props} />}
            />
            <Route
              path="/edit-coupon-map/:id"
              render={(props: any) => <AddCouponMapping {...props} />}
            />
            <Route
              path="/view-coupon-map/:id"
              render={(props: any) => <ViewCouponMapping {...props} />}
            />
            <Route
              path="/list-merchant"
              render={(props: any) => <ListMerchant {...props} />}
            />
            <Route
              path="/merchant"
              render={(props: any) => <Merchant {...props} />}
            />
            <Route
              path="/edit-merchant/:id"
              render={(props: any) => <Merchant {...props} />}
            />
            <Route
              path="/view-merchant/:id"
              render={(props: any) => <ViewMerchant {...props} />}
            />
            <Route
              path="/list-business-hours"
              render={(props: any) => <ListBussinessHours {...props} />}
            />
            <Route
              path="/merchant-business"
              render={(props: any) => <MerchantBusiness {...props} />}
            />
            <Route
              path="/edit-merchant-business/:id"
              render={(props: any) => <MerchantBusiness {...props} />}
            />
            <Route
              path="/view-merchant-business/:id"
              render={(props: any) => <ViewBusinessHours {...props} />}
            />
            <Route
              path="/list-setting"
              render={(props: any) => <ListSetting {...props} />}
            />
            <Route
              path="/add-setting"
              render={(props: any) => <AddSetting {...props} />}
            />
            <Route
              path="/edit-setting/:id"
              render={(props: any) => <AddSetting {...props} />}
            />
            <Route
              path="/view-setting/:id"
              render={(props: any) => <ViewSetting {...props} />}
            />
            <Route
              path="/list-fee"
              render={(props: any) => <ListFee {...props} />}
            />
            <Route
              path="/add-fee"
              render={(props: any) => <AddFee {...props} />}
            />
            <Route
              path="/edit-fee/:id"
              render={(props: any) => <AddFee {...props} />}
            />
            <Route
              path="/view-fee/:id"
              render={(props: any) => <ViewFee {...props} />}
            />
            <Route
              path="/list-tax"
              render={(props: any) => <ListTax {...props} />}
            />
            <Route
              path="/add-tax"
              render={(props: any) => <AddTax {...props} />}
            />
            <Route
              path="/edit-tax/:id"
              render={(props: any) => <AddTax {...props} />}
            />
            <Route
              path="/view-tax/:id"
              render={(props: any) => <ViewTax {...props} />}
            />
            <Route
              path="/list-payout"
              render={(props: any) => <ListPayout {...props} />}
            />
            <Route
              path="/add-payout"
              render={(props: any) => <AddPayout {...props} />}
            />
            <Route
              path="/edit-payout/:id"
              render={(props: any) => <AddPayout {...props} />}
            />
            <Route
              path="/view-payout/:id"
              render={(props: any) => <ViewPayout {...props} />}
            />
            <Route
              path="/list-matrix"
              render={(props: any) => <ListMatrix {...props} />}
            />
            <Route
              path="/add-matrix"
              render={(props: any) => <AddMatrix {...props} />}
            />
            <Route
              path="/edit-matrix/:id"
              render={(props: any) => <AddMatrix {...props} />}
            />
            <Route
              path="/view-matrix/:id"
              render={(props: any) => <ViewMatrix {...props} />}
            />
            <Route
              path="/list-slider"
              render={(props: any) => <ListSlider {...props} />}
            />
            <Route
              path="/add-slider"
              render={(props: any) => <AddSlider {...props} />}
            />
            <Route
              path="/edit-slider/:id"
              render={(props: any) => <AddSlider {...props} />}
            />
            <Route
              path="/view-slider/:id"
              render={(props: any) => <ViewSlider {...props} />}
            />
            <Route
              path="/list-type"
              render={(props: any) => <ListProductType {...props} />}
            />
            <Route
              path="/add-type"
              render={(props: any) => <AddProductType {...props} />}
            />
            <Route
              path="/edit-type/:id"
              render={(props: any) => <AddProductType {...props} />}
            />
            <Route
              path="/view-type/:id"
              render={(props: any) => <ViewProductType {...props} />}
            />
            <Route
              path="/list-product-customise"
              render={(props: any) => <ListProductAddOn {...props} />}
            />
            <Route
              path="/product-addondetail"
              render={(props: any) => <AddOnProduct {...props} />}
            />
            <Route
              path="/edit-customise/:id"
              render={(props: any) => <AddOnProduct {...props} />}
            />
            <Route
              path="/view-customise/:id"
              render={(props: any) => <ViewProductCustomise {...props} />}
            />
            <Route
              path="/listmenu"
              render={(props: any) => <ListMenu {...props} />}
            />
            <Route
              path="/add-menu"
              render={(props: any) => <AddMenu {...props} />}
            />
            <Route
              path="/edit-menu/:id"
              render={(props: any) => <AddMenu {...props} />}
            />
            <Route
              path="/view-menu/:id"
              render={(props: any) => <ViewMenuItem {...props} />}
            />
            <Route
              path="/list-popular-city"
              render={(props: any) => <ListPopularCity {...props} />}
            />
            <Route
              path="/add-popular-city"
              render={(props: any) => <AddPopularCity {...props} />}
            />
            <Route
              path="/edit-popular-city/:id"
              render={(props: any) => <AddPopularCity {...props} />}
            />
            <Route
              path="/view-popular-city/:id"
              render={(props: any) => <ViewPopularCity {...props} />}
            />
            {this.props.history.location.pathname !== "/" ? (
              <Route path="*" component={Page404} />
            ) : (
              ""
            )}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </NavBar>
      </Router>
    );
  }
}

export default Main;
