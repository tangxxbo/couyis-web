import React, { Component } from 'react';
import { Result, Button } from 'antd';

class NotLogin extends Component {
  back = ()=>{
		window.location='/#/'
	}
  render() {
    return (
      <Result
        status="401"
        title="401"
        subTitle="对不起，您的登录已经失效，请您重新登录."
        extra={<Button type="primary" onClick={this.back}>重新登录</Button>}
      />
    );
  }
}
export default NotLogin;