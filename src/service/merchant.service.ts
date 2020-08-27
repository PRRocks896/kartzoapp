import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.addMerchant, data,true);
    },
    editMerchant: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.merchantController.editMerchant + id, data,true);
    },
    addMerchantBusiness: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.addMerchantBusiness, data,false);
    },
    addMerchantReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantReviewController.addMerchantReview, data,false);
    },
    getBusinessHoursData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursData, data,false);
    },
    getBusinessById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursById + data,false);
    },
    getMerchantData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchant, data,true);
    },
    getMerchantById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantById + data,true);
    },
    getToken: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantController.gettoken,data,false);
    },
    getMerchantList: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getList,true);
    },
    
}