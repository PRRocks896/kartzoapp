import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getDataByIdRequest, addOnCreateRequest,addOnUpdateRequest,productCustomiseTypeCreateRequest,productCustomiseTypeUpdateRequest, getAllTableDataListRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add product 
     */
    addProduct: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.addproduct, data,true);
    },

    /**
     * 
     * @param data : delete product
     */
    deleteProduct: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiMerchantUrl + apiUrl.productController.deleteproduct + data.id,true);
    },

    /**
     * 
     * @param data : delete customise data
     */
    deleteCustomise: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiMerchantUrl + apiUrl.productTypeController.deleteCustomise + data.id,true);
    },

    /**
     * 
     * @param data : delete customise type data
     */
    deleteCustomiseType: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiMerchantUrl + apiUrl.productTypeController.deleteCustomiseType + data.id,true);
    },

    /**
     * 
     * @param data : product data
     * @param id : product id
     */
    editProduct: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productController.editproduct + id,data,true);
    },

    /** Get Product */
    getProduct: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.productController.getproduct,false);
    },

    /**
     * 
     * @param data : add product image
     */
    addProductImage: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addImage,data,false);
    },

    /**
     * 
     * @param data : add product inventory
     */
    addProductInventory: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addInventory,data,false);
    },

    /**
     * 
     * @param data : add product review
     */
    addProductReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addReview,data,false);
    },

    /**
     * 
     * @param data : add on product
     */
    addOnProduct: async function (data: addOnCreateRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.addcustomise,data,true);
    },

    /**
     * 
     * @param data : edit on product
     */
    editaddOnProduct: async function (data: addOnUpdateRequest) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productTypeController.editcustomise + data.productCustomizeId,data,true);
    },
    
    /** delete image product */
    deleteImageProduct: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.productController.deleteproductImage,false);
    },

    /** edit product image */
    editProductImage: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.productController.editproductImage,data,false);
    },

    /**
     * 
     * @param data : get product data
     */
    getProductData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.getproduct,data,true);
    },

    /**
     * 
     * @param data : product id
     */
    getProductById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getProductById + data,true);
    },

    /** get all product */
    getAllProduct: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getAllProduct,true);
    },

    /**
     * 
     * @param data : get product cusomise type data
     */
    getProductCustomiseTypeData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.gettype,data,true);
    },

    /**
     * 
     * @param data : add customise type data
     */
    addCustomiseType: async function (data: productCustomiseTypeCreateRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.addtype,data,true);
    },

    /**
     * 
     * @param data : get customise type id
     */
    getCustomiseTypeById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productTypeController.gettypebyid + data.id,true);
    },

    /**
     * 
     * @param data : edit customise product 
     */
    editCustomiseProduct: async function (data:productCustomiseTypeUpdateRequest) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productTypeController.gettypebyid + data.productCustomizeTypeId,data,true);
    },

    /**
     * 
     * @param data : get product customise data
     */
    getProductCustomiseData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.getcustomise,data,true);
    },


    /** get all product type */
    getAllProductTypeType: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productTypeController.getAllProductType,true);
    },

    /**
     * 
     * @param data : get cusrtomise id
     */
    getCustomiseById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productTypeController.getcustomisebyid + data.id,true);
    },

    /**
     * 
     * @param data : category id
     */
    getCategoryById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getCategory + data,true);
    },

    /**
     * 
     * @param data : get subcategory
     */
    getSubCategory: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.productController.getSubCategory + data,false);
    },
    
    
    
    

}