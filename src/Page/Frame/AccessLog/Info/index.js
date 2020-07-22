import React, { Component } from 'react';
import { Descriptions} from 'antd';
//添加组件
class Info extends Component {
    formRef = React.createRef(); 
	render() {       
		const { accessLog } = this.props;
		return (
			
				<Descriptions bordered>
                <Descriptions.Item label="请求路径" span={3}>
                    {accessLog.url}
                </Descriptions.Item>
                <Descriptions.Item label="用户IP" span={3}>
                    {accessLog.ipAddress}
                </Descriptions.Item>
                <Descriptions.Item label="GET参数" span={3}>
                    {accessLog.getPara}
                </Descriptions.Item>
                <Descriptions.Item label="POST参数" span={3}>
                    {accessLog.postPara}
                </Descriptions.Item>
                <Descriptions.Item label="账号">
                    {accessLog.createUser}
                </Descriptions.Item>
                <Descriptions.Item label="请求时间">
                    {accessLog.createTime}
                </Descriptions.Item>
                </Descriptions>
		);
	}
}
export default Info;