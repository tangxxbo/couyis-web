import React, { Component } from 'react';
import { message, Form, Input } from 'antd';
import CategoryService from '../Service'
const { TextArea } = Input;
//添加组件
class Add extends Component {
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await CategoryService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
                        <Input />
					</Form.Item>
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="备注" name="description">
                        <TextArea />
					</Form.Item>
				</Form>
			);
	}
}
export default Add;