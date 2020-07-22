

import React, { Component } from 'react';
import { Result, Button } from 'antd';

class NotFound extends Component {
	back = ()=>{
		window.location='/#/frame/home'
	}
	
	render() {
		return (
			<Result
				status="404"
				title="404"
				subTitle="对不起，您访问的页面没有找到."
				extra={<Button type="primary" onClick={this.back}>返回首页</Button>}
			/>
		);
	}
}
export default NotFound;