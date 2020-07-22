import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class ContoctsService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/customer/contocts/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getContoctsByCustomer = async (customerId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/contocts/findByCustomerId/'+customerId, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/contocts/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getContocts = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/customer/contocts/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/contocts/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/contocts/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new ContoctsService()
