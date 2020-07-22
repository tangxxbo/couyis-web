import 'core-js'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IRouter from './Router';
import { Provider } from 'react-redux'
import configureStore from './Redux/Store/configureStore'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import * as serviceWorker from './serviceWorker';

const store = configureStore();
ReactDOM.render(
  <ConfigProvider locale={zhCN}><Provider store={store}><IRouter /></Provider></ConfigProvider>,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change<Provider store={configureStore}></Provider>
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
