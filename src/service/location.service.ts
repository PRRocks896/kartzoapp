import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getDataByIdRequest, cityCreateRequest, cityUpdateRequest, stateCreateRequest, stateUpdateRequest, getAllTableDataListRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add country
     */
    addCountry: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCountry,data,false);
    },

    /**
     * 
     * @param data : get country data
     */
    getCountryData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCountry,data,false);
    },

    /**
     * 
     * @param data : country id
     */
    getCountryById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryById + data.id,false);
    },

    /**
     * 
     * @param data : country id
     */
    deleteCountry: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteCountry + data.id,false);
    },

    /**
     * 
     * @param data : delete state
     */
    deleteState: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteState + data.id,false);
    },

    /**
     * 
     * @param data : delete city data
     */
    deleteCity: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deletdCity + data.id,false);
    },
    
    /**
     * 
     * @param data : edit country data
     * @param id : country id
     */
    editCountry: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editCountry + id ,data,false);
    },

    /** Get country */
    getCountry: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryList,false);
    },

    /**
     * 
     * @param data : add state
     */
    addState: async function (data: stateCreateRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addState,data,false);
    },

    /**
     * 
     * @param data : edit state
     */
    editState: async function (data: stateUpdateRequest) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editState + data.stateId ,data,false);
    },

    /**
     * 
     * @param data : get state data
     */
    getStateData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getState,data,false);
    },

    /** Get state */
    getState: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateList,false);
    },

    /**
     * 
     * @param data : state id
     */
    getStateById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateById + data.id,false);
    },

    /**
     * 
     * @param data : add city data
     */
    addCity: async function (data: cityCreateRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCity,data,false);
    },

    /**
     * 
     * @param data : get city data
     */
    getCityData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCityData,data,false);
    },

    /**
     * 
     * @param data : edit city data
     */
    editCity: async function (data: cityUpdateRequest) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.edidCity + data.cityId,data,false);
    },

    /**
     * 
     * @param data : city id
     */
    getCityById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCityById + data.id,false);
    },

    /** Get city */
    getCity: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getcitylist,false);
    }
}