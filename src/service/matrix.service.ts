import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, matrixCreateRequest, matrixUpdateRequest } from '../modelController';

export default {
    getMatrixData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.matrixController.getmatrix, data,false);
    },
    addMatrix: async function (data: matrixCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.matrixController.addmatrix, data,false);
    },
    getMatrixById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.matrixController.getMatrixById + data.id,false);
    },
    editMatrix: async function (data: matrixUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.matrixController.editMatrix + data.distanceMatrixId, data,false);
    },
    
    
    
}