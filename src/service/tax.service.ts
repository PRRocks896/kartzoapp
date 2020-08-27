import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addTax: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.taxController.addtax, data,false);
    },
    getTaxData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.taxController.gettaxlist, data,false);
    },
    getTaxById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.taxController.gettax + data.id,false);
    },
    updateTax: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.taxController.edittax + id,data,false);
    }   
}