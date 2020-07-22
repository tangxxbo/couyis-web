

import React, { Component } from 'react';
import { Result, Button } from 'antd';

class NotAuthority extends Component {
	back = ()=>{
		window.location='/'
	}
	home = ()=>{
		window.location='/#/frame/home'
	}
	render() {
		return (
			<Result
				status="403"
				title="403"
				subTitle="对不起，该功能并未对您授权，请切换帐号或联系管理员."
				extra={<div><Button type="primary" onClick={this.back}>重新登录</Button>或<Button type="primary" onClick={this.home}>返回</Button></div>}
			/>
		);
	}
}
export default NotAuthority;