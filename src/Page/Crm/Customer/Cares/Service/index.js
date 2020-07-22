import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class ContoctsService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/customer/cares/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getCaress = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/cares/findAll', method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/cares/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getCares = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/customer/cares/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/cares/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/cares/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new ContoctsService()
