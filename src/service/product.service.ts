import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getDataByIdRequest, addOnCreateRequest,addOnUpdateRequest,productCustomiseTypeCreateRequest,productCustomiseTypeUpdateRequest, getAllTableDataListRequest } from '../modelController';

export default {
    addProduct: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.addproduct, data,true);
    },
    deleteProduct: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.productController.deleteproduct);
    },
    editProduct: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productController.editproduct + id,data,true);
    },
    getProduct: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.productController.getproduct,false);
    },
    addProductImage: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addImage,data,false);
    },
    addProductInventory: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addInventory,data,false);
    },
    addProductReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addReview,data,false);
    },
    addOnProduct: async function (data: addOnCreateRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.addcustomise,data,true);
    },
    editaddOnProduct: async function (data: addOnUpdateRequest) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productTypeController.editcustomise + data.productCustomizeId,data,true);
    },
    
    deleteImageProduct: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.productController.deleteproductImage);
    },
    editProductImage: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.productController.editproductImage,data,false);
    },
    getProductData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.getproduct,data,true);
    },
    getProductById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getProductById + data,true);
    },
    getAllProduct: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getAllProduct,true);
    },
    getProductCustomiseTypeData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.gettype,data,true);
    },
    addCustomiseType: async function (data: productCustomiseTypeCreateRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.addtype,data,true);
    },
    getCustomiseTypeById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productTypeController.gettypebyid + data.id,true);
    },
    editCustomiseProduct: async function (data:productCustomiseTypeUpdateRequest) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productTypeController.gettypebyid + data.productCustomizeTypeId,data,true);
    },
    getProductCustomiseData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productTypeController.getcustomise,data,true);
    },
    getAllProductTypeType: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productTypeController.getAllProductType,true);
    },
    getCustomiseById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productTypeController.getcustomisebyid + data.id,true);
    },
    
    
    
    
    

}