import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class TypeService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/business/type/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getTypes = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/type/findAll', method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/type/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getType = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/type/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/type/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/type/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new TypeService()
