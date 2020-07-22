import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class ContoctsService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/business/leads/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/leads/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getLeads = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/leads/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/leads/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/leads/delete', method: 'post' ,data: data});
		return result;
	}

	transition = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/leads/transition?token=' + data.token, method: 'post', data: data });
		return result;
	}
}

export default new ContoctsService()
