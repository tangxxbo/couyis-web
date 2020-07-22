import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.sinoboom;
class FinishedProductService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/finished/product/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/finished/product/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getFinishedProduct = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/finished/product/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/finished/product/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/finished/product/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new FinishedProductService()
