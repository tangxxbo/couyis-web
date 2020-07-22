import React, { Component } from 'react';
import { message, Form, Input,Select} from 'antd';
import LeadsService from '../Service'
import DictService from '../../../../Base/Dict/Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {
	state ={selectSources:''}
	formRef = React.createRef();    
	
	componentWillMount = async ()=>{
		const dicts= await DictService.getDictByParentCode('SOURCE')
		this.setState({
			selectSources:dicts.map(d => (<Option key={d.name}>{d.code +'-'+d.name}</Option>)),
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await LeadsService.add(values);
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
					<Form.Item label="名称" name="name" rules={[{ required: true, message: '客户名称不能为空!' }]}>
						<Input />
					</Form.Item>
                    <Form.Item label="联系人" name="contactsName" rules={[{ required: true, message: '联系人不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="职务" name="position" >
                        <Input />
					</Form.Item>
					<Form.Item label="称呼" name="saltName" rules={[{ required: true, message: '称呼不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="电话" name="mobile" rules={[{ required: true, message: '电话不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="线索来源" name="source">
						<Select placeholder="请选择线索来源">
							{this.state.selectSources}
						</Select>
					</Form.Item>
					<Form.Item label="下次跟进" name="nextstep">
                        <Input />
					</Form.Item>
					<Form.Item label="跟进时间" name="nextStepTime">
                        <Input />
					</Form.Item>					
					<Form.Item label="备注" name='description'>
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Add;