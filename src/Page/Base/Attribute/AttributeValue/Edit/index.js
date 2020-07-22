import React, { Component } from 'react';
import { Modal, Form, Input,Select} from 'antd';
const {Option} = Select;
//添加组件
class Edit extends Component {

    formRef = React.createRef();

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = (values) =>{
        const { handEditOKFinish } = this.props;
        handEditOKFinish(values);
    }
	render() {       
		const {attributeValue } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...attributeValue}}>
                    <Form.Item name="key" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
                    </Form.Item>
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '编号不能为空!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="值" name="value" rules={[{ required: true, message: '名称不能为空!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="默认" name="defaultValue" rules={[{ required: true, message: '默认必填不能为空!' }]}>
                        <Select >
                            <Option value={false}>非默认</Option>
                            <Option value={true}>默认</Option>
                        </Select >
                    </Form.Item>
				</Form>
		);
	}
}
export default Edit;