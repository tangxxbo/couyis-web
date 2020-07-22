import React, { Component } from 'react';
import { message, Form, Input,InputNumber,Radio,Select} from 'antd';
import ProductService from '../Service'
import UnitService from '../../../../Base/Unit/Service'
import ProductCategoryService from '../../Category/Service'
import ClassificationService from '../../../../Base/Classification/Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};
	state = {selectCategorys:'',selectUnits:'',selectClassifications:''}

	componentWillMount = async ()=>{
		const categorys= await ProductCategoryService.getCategorys()
		const units= await UnitService.getUnits()
		const classifications= await ClassificationService.getClassificationByCategory('CONFIG')
		this.setState({
			selectCategorys:categorys.map(d => (<Option key={d.id}>{d.code+'-'+d.name}</Option>)),
			selectUnits:units.map(d => (<Option key={d.code}>{d.code+'-'+d.name}</Option>)),
			selectClassifications:classifications.map(d => (<Option key={d.code}>{d.code+'-'+d.name}</Option>)),
		})
	}

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await ProductService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,isClassification:false,isCombo:false}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
                        <Input />
					</Form.Item>
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="单位" name="unitCode" rules={[{ required: true, message: '单位不能为空!' }]}>
						<Select showSearch filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}>
							{this.state.selectUnits}
						</Select>
					</Form.Item>
					<Form.Item label="建议价格" name="suggestedPrice" rules={[{ required: true, message: '建议价格不能为空!' }]}>
                        <InputNumber />
					</Form.Item>
					<Form.Item label="产品类别" name="productCategoryId" rules={[{ required: true, message: '产品类别不能为空!' }]}>
						<Select showSearch filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}>
							{this.state.selectCategorys}
						</Select>
					</Form.Item>
					<Form.Item label="是否可选配" name="isClassification" >
						<Radio.Group>
							<Radio value={false}>否</Radio>
							<Radio value={true}>是</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="选配项" name="classificationCode">
						<Select showSearch filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}>
							{this.state.selectClassifications}
						</Select>
					</Form.Item>
					<Form.Item label="组合套餐" name="isCombo">
						<Radio.Group>
							<Radio value={false}>否</Radio>
							<Radio value={true}>是</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="备注" name="description">
                        <TextArea />
					</Form.Item>
				</Form>
			);
	}
}
export default Add;