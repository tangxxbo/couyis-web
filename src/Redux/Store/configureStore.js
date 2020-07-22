/**
 * 引入createStore保存数据源
 */
 
import {createStore} from 'redux'
import reducer from '../Reducer'
 
export default () => createStore(reducer)　