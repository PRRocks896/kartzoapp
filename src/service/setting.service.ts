import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, settingCreateRequest, settingUpdateRequest, deleteByIdRequest } from '../modelController';

export default {
    addSetting: async function (data: settingCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.settingController.addsetting, data,false);
    },
    getSettingData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.settingController.getsettinglist, data,false);
    },
    getSettingById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.settingController.getsetting + data.id,false);
    },
    updateSetting: async function (data: settingUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.settingController.editsetting + data.settingId,data,false);
    },
    deleteSetting: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.settingController.deletesetting + data.id,false);
    },
    
}