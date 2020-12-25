import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, deleteByIdRequest } from '../modelController';

export default {
    addMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.addMerchant, data,true);
    },
    editMerchant: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.merchantController.editMerchant + id, data,true);
    },
    getMerchantData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchant, data,true);
    },
    getMerchantById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantById + data,true);
    },
    getMerchantList: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getList,true);
    },
    deleteMerchant: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiMerchantUrl + apiUrl.merchantController.deleteMerchant + data.id,true);
    },
    getMerchantRole: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getRole,true);
    },
    
}