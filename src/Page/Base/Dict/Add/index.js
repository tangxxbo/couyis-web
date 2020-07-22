import React, { Component } from 'react';
import { message, Form, Input,TreeSelect,InputNumber } from 'antd';
import DictService from '../Service'
const { TextArea } = Input;
//添加组件
class Add extends Component {
	formRef = React.createRef();
	state ={
		dictTree:[]
	}    
	componentWillMount = async () =>{
		this.setState({
			dictTree:(await DictService.getTreeDict())
		})
	}
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await DictService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
                        <Input />
					</Form.Item>
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="所属数据字典" name="parentId" >
						<TreeSelect allowClear={true} placeholder="请选择所属数据字典" treeDefaultExpandAll={false} treeData={this.state.dictTree} />
					</Form.Item>
					<Form.Item label="顺序号" name="sort" rules={[{ required: true, message: '顺序号不能为空!' }]}>
						<InputNumber min={1} />
					</Form.Item>
					<Form.Item label="备注" name="remark">
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Add;