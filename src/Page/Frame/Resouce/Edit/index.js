import React, { Component } from 'react';
import { message, Form, Input, Select } from 'antd';
import ResourceService from '../Service';
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Edit extends Component {
    formRef = React.createRef();    
	// state = {
    //     resource: {},
	// } 

    // componentWillReceiveProps (nextProps) {
    //     if(nextProps.resource !== this.props.resource){
    //         this.setState({
    //             resource: nextProps.resource,
    //         })
    //     }
    //   }

	handleOK =  () => {
        this.formRef.current.submit();
    };
    
    onFinish =  async(values) =>{
        const { handEditOKFinish } = this.props;
		await ResourceService.edit(values);
		message.success("修改成功！");
		handEditOKFinish()
    }

	render() {       
		const { handleEditCancel } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...this.props.resource}}>
                    <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="资源值" name="value" rules={[{ required: true, message: '资源值不能为空!' }]}>
						<Input />
					</Form.Item>
					<Form.Item label="资源属性" name="attr" rules={[{ required: true, message: '资源属性不能为空!' }]}>
						<Select dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="请选择资源属性">
                            <Option key='PROTECTED'>非授权资源</Option>
                            <Option key='PRIVATE'>需授权资源</Option>
						</Select>
					</Form.Item>
					<Form.Item label="备注" name="remark">
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Edit;