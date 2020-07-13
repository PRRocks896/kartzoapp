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
    }
}

export default apiUrl;