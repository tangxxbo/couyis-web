import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class FileService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath + '/base/file/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}
}

export default new FileService()
