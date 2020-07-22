/**
 * Reducer: 数据处理
 */
import { type } from './../Action'

let account = sessionStorage.getItem('account')?sessionStorage.getItem('account'):''
let login = sessionStorage.getItem('login')?sessionStorage.getItem('login'):false
let authority = sessionStorage.getItem('authority')?sessionStorage.getItem('authority').split(',') :[];
let accessToken = sessionStorage.getItem('accessToken')?sessionStorage.getItem('accessToken'):''

const initialState = {
    account,
    login,
    authority,
    accessToken
}

const storeData = (state = initialState, action) => {
    switch (action.type) {
        case type.account:
            sessionStorage.setItem('account', action.account);
            return {
                ...state, //旧值
                account: action.account //新值
            }
        case type.login:
            sessionStorage.setItem('login', action.login);
            return {
                ...state, //旧值
                login: action.login //新值
            }
        case type.authority:
            sessionStorage.setItem('authority', action.authority.join(','));
            return{
                ...state,
                authority:action.authority
            }
        case type.accessToken:
            sessionStorage.setItem('accessToken', action.accessToken);
            return{
                ...state,
                accessToken:action.accessToken
            }
        default:
            return {
                ...state,
            };
    }
}
export default storeData;