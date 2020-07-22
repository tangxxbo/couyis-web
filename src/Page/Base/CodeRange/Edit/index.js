import React, { Component } from 'react';
import { message, Form, Input,TreeSelect,InputNumber } from 'antd';
import CodeRangeService from '../Service'
const { TextArea } = Input;
//添加组件
class Edit extends Component {
	formRef = React.createRef();  
	state ={
		dictTree:[]
	}    
	// componentWillMount = async () =>{
	// 	this.setState({
	// 		dictTree:(await DictService.getTreeDict())
	// 	})
	// }  
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish =async (values) =>{
		const { handEditOKFinish } = this.props;
		await CodeRangeService.edit(values);
		message.success("修改成功！");
        handEditOKFinish();
    }

	render() {       
		const { codeRange} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...codeRange}}>
                    <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="号码段编号" name="code" rules={[{ required: true, message: '组织编号不能为空!' }]}>
                        <Input  />
					</Form.Item>
                    <Form.Item label="起始编号" name="startCode" rules={[{ required: true, message: '组织名称不能为空!' }]}>
                        <Input disabled={true}/>
					</Form.Item>
					<Form.Item label="截止编号" name="stopCode" >
						<Input disabled={true}/>
					</Form.Item>
					<Form.Item label="最大号码" name="maxCode" rules={[{ required: true, message: '顺序号不能为空!' }]}>
						<Input disabled={true}/>
					</Form.Item>
					<Form.Item label="是否外部给号" name="isExt">
						<Input type="checkbox" onChange={this.changeIsExt} disabled={true}/>
					</Form.Item>
				</Form>
		);
	}
}
export default Edit;