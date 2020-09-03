import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, taxCreateRequest, taxUpdateRequest } from '../modelController';

export default {
    addTax: async function (data: taxCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.taxController.addtax, data,false);
    },
    getTaxData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.taxController.gettaxlist, data,false);
    },
    getTaxById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.taxController.gettax + data.id,false);
    },
    updateTax: async function (data: taxUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.taxController.edittax + data.taxId,data,false);
    }   
}