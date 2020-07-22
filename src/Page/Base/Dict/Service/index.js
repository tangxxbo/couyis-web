import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class DictService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/dict/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getTreeDict = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/dict/findAll', method: 'post' });
		return this.assembleTree(result);
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/dict/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getDict = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/dict/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/dict/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/dict/delete', method: 'post' ,data: data});
		return result;
	}

	getDictByParentCode = async (code) =>{
		let result = await request.axiosSynRequest({ url: basePath + '/base/dict/findByParentCode/'+code, method: 'post'});
		return result;
	}
}

export default new DictService()
