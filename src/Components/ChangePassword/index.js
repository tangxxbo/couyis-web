import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import LoginService from '../../Frame/Login/Service'
//添加组件
class ChangePassword extends Component {
	formRef = React.createRef();    
	state={
		targetKeys:[]
	}
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = (values) =>{
        const {handleChangeOK } = this.props;
        handleChangeOK({...values});
	}	

	render() {       
		const {handleChangeCancel,visible } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			<Modal title='修改密码' visible={visible} destroyOnClose={true} centered width={800}
				onOk={this.handleOK} onCancel={handleChangeCancel}
				okText='提交' cancelText='关闭'>
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish}>
                    <Form.Item label="密码" name='oldPassword' rules={[{ required: true, message: '密码不能为空!' },
                        ({ getFieldValue }) => ({
                            async  validator(rule, value) {
                                //发送到服务器进行验证
                                let flag = await LoginService.checkPassword(value);
                                console.log(flag)
                                if ( flag === true) {
                                   return Promise.resolve();
                                }
                                return Promise.reject('密码校验错误!');
                            },
                          })
                        ]} validateTrigger='onBlur' hasFeedback>
                        <Input.Password  />
					</Form.Item>
					<Form.Item label="新密码" name='password' rules={[{ required: true, message: '新密码不能为空!' }]} hasFeedback>
						<Input.Password />
					</Form.Item>
					<Form.Item label="确认密码"  name='confirm' rules={[{ required: true, message: '确认密码不能为空!' },
							({ getFieldValue }) => ({
								validator(rule, value) {
								  if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								  }
								  return Promise.reject('两次密码输入不匹配!');
								},
							  })
						]} dependencies={['password']} hasFeedback>
						<Input.Password />
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}
export default ChangePassword;