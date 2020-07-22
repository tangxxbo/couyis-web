import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class ResourceService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/frame/resource/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getResources = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/resource/findAll', method: 'get' });		
		const resources = []
		result.map(resource => {
			resources.push({ key: resource.id, title: resource.name, description: resource.remark });
		});
		return resources;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/resource/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getResource = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/frame/resource/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/resource/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/resource/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new ResourceService()
