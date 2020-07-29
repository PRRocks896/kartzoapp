const apiUrl = {
    userController: {
        createData:'users/login',
        getData:'User',
        getDataById:'users/',
        forgotpassword:'users/forgot-password',
        updateProfile:'users/update-profile',
        updateData:'users/',
        getCount:'User',
        getUserPaginationData:'users/get-user-list',
        createUser:'users',
        deleteUser:'users/',
        updatepassword:'users/change-password',
        resetpassword:'users/reset-password'

    },
    customerController: {
        createData:'user',
        getData:'user',
        getDataById:'user/',
        forgotpassword:'',
        updateData:'user',
        getCount:'user',
        getUserPaginationData:'user',
        deleteCustomer:'user'

    },
    userRoleController: {
        addRole:'roles',
        getRole:'roles/get-role-list-dropdown',
        editRole:'roles/',
        deleteRole:'roles/',
        rolepreveliges:'roleprivileges/',
        updateRolePreveliges:'roleprivileges',
        getRoles:'roles/get-role-list',
        getRoleById:'roles/'
    },
    locationController: {
        addCountry:'country',
        getCountry:'country',
        editCountry:'country',
        deleteCountry:'country',
        addState:'state',
        getState:'state',
        editState:'state',
        deleteState:'state',
        addCity:'city',
        gedCity:'city',
        edidCity:'city',
        deletdCity:'city'
    },
    categoryController: {
        addCatergory:'category',
        getCategory:'category',
        editCategory:'category',
        deleteCategory:'category',
        addsubCategory:'subcategory'
    },
    couponController: {
        addCoupon:'coupon',
        getCoupon:'coupon',
        editCoupon:'coupon',
        deleteCoupon:'coupon'
    },
    merchantController: {
        addMerchant:'merchant',
        getMerchant:'merchant',
        editMerchant:'merchant',
        deleteMerchant:'merchant'
    },
    merchantBusinessController: {
        addMerchantBusiness:'merchant',
        getMerchantBusiness:'merchant',
        editMerchantBusiness:'merchant',
        deleteMerchantBusiness:'merchant'
    },
    merchantReviewController: {
        addMerchantReview:'merchant',
        getMerchantReview:'merchant',
        editMerchantReview:'merchant',
        deleteMerchantReview:'merchant'
    },
    productController: {
        addproduct:'product',
        getproduct:'product',
        editproduct:'product',
        deleteproduct:'product',
        addImage:'product',
        addInventory:'product',
        addReview:'product',
        addOnProduct:'product',
        deleteproductImage:'product',
        editproductImage:'product',
    },
    deliveryController: {
        addDelivery:'delivery',
        getDelivery:'delivery',
        editDelivery:'delivery',
        deleteDelivery:'delivery'
    },
    orderController: {
        addOrder:'order',
        getOrder:'order',
        editOrder:'order',
        deleteOrder:'order',
        addOrderCart:'order'
    },
    addressController: {
        addAddress:'address',
        getAddress:'address',
        editAddress:'address',
        deleteAddress:'address'
    },
}

export default apiUrl;