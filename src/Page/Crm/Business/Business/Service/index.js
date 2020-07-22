import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class BusinessService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/business/business/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}
	getBusinessByCustomer = async (customerId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/business/findByCustomerId/'+customerId, method: 'get' });		
		return result;
	}
	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/business/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getBusiness = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/business/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/business/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/business/delete', method: 'post' ,data: data});
		return result;
	}

	nextFlow = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/business/nextFlow/' + id, method: 'get' });
		return result;
	}

	lose = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/business/lose/' + id, method: 'get' });
		return result;
	}
}

export default new BusinessService()
