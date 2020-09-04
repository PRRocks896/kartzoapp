import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getDataByIdRequest, cityCreateRequest, cityUpdateRequest, stateCreateRequest, stateUpdateRequest, getAllTableDataListRequest } from '../modelController';

export default {
    addCountry: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCountry,data,false);
    },
    getCountryData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCountry,data,false);
    },
    getCountryById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryById + data.id,false);
    },
    deleteCountry: async function (data: any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteCountry + data,false);
    },
    editCountry: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editCountry + id ,data,false);
    },
    getCountry: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryList,false);
    },
    addState: async function (data: stateCreateRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addState,data,false);
    },
    editState: async function (data: stateUpdateRequest) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editState + data.stateId ,data,false);
    },
    getStateData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getState,data,false);
    },
    getState: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateList,false);
    },
    getStateById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateById + data.id,false);
    },
    addCity: async function (data: cityCreateRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCity,data,false);
    },
    getCityData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCityData,data,false);
    },
    editCity: async function (data: cityUpdateRequest) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.edidCity + data.cityId,data,false);
    },
    getCityById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCityById + data.id,false);
    },
    getCity: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getcitylist,false);
    },
       
}