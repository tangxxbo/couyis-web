
import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class AccessLogService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/frame/accessLog/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
    }
    
	getAccessLog = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/frame/accessLog/findById/' + id, method: 'get' });
		return result;
	}
}

export default new AccessLogService()
