
import React, { Component } from 'react';
import { Result, Button } from 'antd';

class Error extends Component {

	back = ()=>{
		window.location='/#/frame/home'
	}

	render() {
		return (
			<Result
				status="500"
				title="500"
				subTitle="对不起，内部服务器出现故障，请稍后重试."
				extra={<Button type="primary" onClick={this.back}>返回首页</Button>}
			/>
		);
	}
}
export default Error;