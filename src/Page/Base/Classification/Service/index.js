import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class ClassificationService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/classification/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getClassifications = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/classification/findAll', method: 'get' });		
		return result;
	}

	getClassificationByCategory = async (category) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/classification/findByCategory?category='+category, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/classification/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getClassification = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/classification/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/classification/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/classification/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new ClassificationService()
