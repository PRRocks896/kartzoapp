import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { deleteByIdRequest, deleteAllDataRequest } from '../modelController';
import axios from 'axios';

export default {

  /**
   * 
   * @param data : delete data 
   */
    deleteAllData: async function (data:deleteAllDataRequest) {
        let queryString = '';
        data.id.map((id: any, index: number) => {
            queryString = queryString + `&id=${id}`;
        })
        return await axios.delete(Constant.apiUrl + apiUrl.userController.deleteData + `?moduleName=${data.moduleName}${queryString}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
    },

    /**
     * 
     * @param data : delete merchant functionality data
     */
    deleteAllMerchantData: async function (data:deleteAllDataRequest) {
      let queryString = '';
      data.id.map((id: any, index: number) => {
          queryString = queryString + `&id=${id}`;
      })
      return await axios.delete(Constant.apiMerchantUrl + apiUrl.userController.deleteData + `?moduleName=${data.moduleName}${queryString}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('merchantToken')}`
          }
        });
  },
    
}