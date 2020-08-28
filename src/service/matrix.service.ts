import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    getMatrixData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.matrixController.getmatrix, data,false);
    },
    addMatrix: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.matrixController.addmatrix, data,false);
    },
    getMatrixById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.matrixController.getMatrixById + data.id,false);
    },
    editPayout: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.payoutController.editPayout + id, data,false);
    },
    
    
    
}