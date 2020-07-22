import React, { Component } from 'react';
import { message,Form, Input,Select} from 'antd';
import UnitService from '../Service'
import DictService from '../../Dict/Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {

	state ={selectDicts:''}
	formRef = React.createRef();    
	
	componentWillMount = async ()=>{
		this.setState({
			selectDicts:(await DictService.getDictByParentCode("UNIT_CATEGORY")).map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>))
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await UnitService.add(values);
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
					<Form.Item label="所属数据字典" name="categoryId" rules={[{ required: true, message: '类别不能为空!' }]}>
						<Select	placeholder="请选择类别" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
							{this.state.selectDicts}
						</Select>
					</Form.Item>
					<Form.Item label="备注" name="remark">
						<TextArea rows={3} />
					</Form.Item>
				</Form>
			
		);
	}
}
export default Add;