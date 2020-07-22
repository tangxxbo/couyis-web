import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class QuotationService extends service {
    
	getQuotationByBusinessId = async (businessId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/quotation/findByBusinessId/'+businessId, method: 'get' });		
		return result;
	}

	getQuotationItemByBusinessId = async (businessId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/quotation/findItem/'+businessId, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/quotation/add?token=' + data.token, method: 'post', data: data });
		return result;
	}
	getQuotation = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/quotation/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/quotation/edit', method: 'post', data: data });
		return result;
	}
    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/quotation/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new QuotationService()
