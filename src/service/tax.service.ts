import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, taxCreateRequest, taxUpdateRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add tax
     */
    addTax: async function (data: taxCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.taxController.addtax, data,false);
    },

    /**
     * 
     * @param data : get tax data
     */
    getTaxData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.taxController.gettaxlist, data,false);
    },

    /**
     * 
     * @param data : tax id
     */
    getTaxById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.taxController.gettax + data.id,false);
    },

    /**
     * 
     * @param data : update tax
     */
    updateTax: async function (data: taxUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.taxController.edittax + data.taxId,data,false);
    },

    /**
     * 
     * @param data : delete tax
     */
    deleteTax: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.taxController.deletetax + data.id,false);
    }
}