import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class CompetitorService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/customer/competitor/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getCompetitors = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/competitor/findAll', method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/competitor/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getCompetitor = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/customer/competitor/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/competitor/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/competitor/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new CompetitorService()
