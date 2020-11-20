import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, matrixCreateRequest, matrixUpdateRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : get matrix data
     */
    getMatrixData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.matrixController.getmatrix, data,false);
    },

    /**
     * 
     * @param data : add matrix data
     */
    addMatrix: async function (data: matrixCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.matrixController.addmatrix, data,false);
    },

    /**
     * 
     * @param data : matrix id
     */
    getMatrixById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.matrixController.getMatrixById + data.id,false);
    },

    /**
     * 
     * @param data : edit matrix data
     */
    editMatrix: async function (data: matrixUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.matrixController.editMatrix + data.distanceMatrixId, data,false);
    },

    /**
     * 
     * @param data : delete matrix
     */
    deleteMatrix: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.matrixController.deleteMatrix + data.id,false);
    }
}