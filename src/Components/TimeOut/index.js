

import React, { Component } from 'react';
import { Result, Button } from 'antd';

class NotFound extends Component {
	back = ()=>{
		window.location='/#/frame/home'
	}
	
	render() {
		return (
			<Result
				status="info"
				title="info"
				subTitle="对不起，服务器超时，请重试."
				extra={<Button type="primary" onClick={this.back}>返回首页</Button>}
			/>
		);
	}
}
export default NotFound;