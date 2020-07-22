import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class AttrService extends service {
	getAttr = async (classificationCode) => {
		let result = await request.axiosSynRequest({ url: basePath + '/platform/attr/findAttr/'+classificationCode, method: 'get' });		
		return result;
	}
}

export default new AttrService()
