const apiUrl = {
    userController: {
        createData:'user',
        getData:'user',
        getDataById:'user/',
        forgotpassword:'',
        updateData:'user',
        getCount:'user',
        getUserPaginationData:'user'

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
        addRole:'role',
        getRole:'role',
        editRole:'role',
        deleteRole:'role'
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
}

export default apiUrl;