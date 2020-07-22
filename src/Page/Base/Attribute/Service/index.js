import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class AttributeService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/attribute/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getAttributes = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/attribute/findAll', method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/attribute/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getAttribute = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/attribute/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/attribute/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/attribute/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new AttributeService()
