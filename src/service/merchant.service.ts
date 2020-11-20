import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add mertchant
     */
    addMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.addMerchant, data,true);
    },

    /**
     * 
     * @param data : edit  merchant
     * @param id : merchant id
     */
    editMerchant: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.merchantController.editMerchant + id, data,true);
    },

    /**
     * 
     * @param data : get merchant data
     */
    getMerchantData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchant, data,true);
    },

    /**
     * 
     * @param data : merchant id
     */
    getMerchantById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantById + data,true);
    },

    /** get merchant data */
    getMerchantList: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getList,true);
    },

    /**
     * 
     * @param data : delete merchant
     */
    deleteMerchant: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiMerchantUrl + apiUrl.merchantController.deleteMerchant + data.id,true);
    },

    /** get merchant role */
    getMerchantRole: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getRole,true);
    },
}