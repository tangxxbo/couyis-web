import React, { Component } from 'react';
import { Form, Input,Radio, InputNumber} from 'antd';
//添加组件
class Add extends Component {

    formRef = React.createRef();

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = (values) =>{
        const { handAddOKFinish } = this.props;
        handAddOKFinish(values);
    }
	render() {       
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{isUse:true}}>
                    <Form.Item label="阶段名称" name="name" rules={[{ required: true, message: '编号不能为空!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="是否启用" name="isUse">
                        <Radio.Group>
                            <Radio value={false}>否</Radio>
                            <Radio value={true}>是</Radio>
                            </Radio.Group>
                    </Form.Item>
                    <Form.Item label="顺序" name="sort" rules={[{ required: true, message: '顺序不能为空!' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="描述" name="desription">
                        <Input />
                    </Form.Item>
				</Form>
		);
	}
}
export default Add;