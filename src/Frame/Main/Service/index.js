import request from '../../../Axios/request'
import '../../../Config/config'
const basePath = global.constants.platform;
class MainService {
	getAcc = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/getAcc', method: 'post'});
		return result;
	}
}

export default new MainService()
