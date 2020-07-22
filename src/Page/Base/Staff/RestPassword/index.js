import React, { Component } from 'react';
import { message, Form, Input } from 'antd';
import StaffService from '../Service'
//添加组件
class RestPassword extends Component {
	formRef = React.createRef();    
	state={
		targetKeys:[]
	}
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handleRestOKFinish } = this.props;	
		await StaffService.restPassword(values);
		message.success("密码设置成功！");	
        handleRestOKFinish({...values});
	}	

	render() {       
		const { handleRestCancel,staff,visible } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{account:staff.code}}>
					<Form.Item label="工号" name='account' rules={[{ required: true, message: '工号不能为空!' }]}>
						<Input disabled={true} />
					</Form.Item>
					<Form.Item label="密码" name='password' rules={[{ required: true, message: '密码不能为空!' }]} hasFeedback>
						<Input.Password />
					</Form.Item>
					<Form.Item label="重复密码"  name='confirm' rules={[{ required: true, message: '重复密码不能为空!' },
							({ getFieldValue }) => ({
								validator(rule, value) {
								  if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								  }
								  return Promise.reject('两次密码输入不匹配!');
								},
							  })
						]} dependencies={['password']} hasFeedback>
						<Input.Password onBlur={this.handleConfirmBlur} />
					</Form.Item>
				</Form>
		);
	}
}
export default RestPassword;