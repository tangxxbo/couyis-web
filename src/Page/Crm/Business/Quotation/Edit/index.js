import React, { Component } from 'react';
import { message, Form, Input, InputNumber,Select,DatePicker } from 'antd';
import DemandService from '../Service'
import ProductService from '../../../Product/Product/Service'
import AttrService from '../../../Platform/Attr/Service'
import AttrEdit from '../../../Platform/Attr/Add'
const { TextArea } = Input;
const {Option} = Select;
//添加组件
class Edit extends Component {
    state={
        selectProducts:'',
        product:{},
        attrs:[],
    }
    formRef = React.createRef(); 
    componentWillMount  = async ()=>{
        const products =await ProductService.getProducts()
        this.setState({
			selectProducts:products.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
		})
    }
    handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		await DemandService.edit(values);
		message.success("修改成功！");
        handEditOKFinish();
    } 
    handleProductChange = async (value)=>{
        const product = await ProductService.getProduct(value)
        this.formRef.current.setFieldsValue({unitCode:product.unitCode});
        this.formRef.current.setFieldsValue({price:product.suggestedPrice});
        const attrs = await AttrService.getAttr(product.classificationCode);
        this.setState({attrs});
    }

    render() {      
        const {demand} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
        return (
            <Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...demand}}>
                <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id不能为空!' }]}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name="businessId" style={{display:'none'}} rules={[{ required: true, message: 'businessId不能为空!' }]}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item label="产品" name="productId" rules={[{ required: true, message: '产品不能为空!' }]}>
                    <Select placeholder="请选择产品对手" onChange={this.handleProductChange}>
                        {this.state.selectProducts}
                    </Select>
                </Form.Item>	
                <Form.Item label="数量" name='quantity' rules={[{ required: true, message: '数量不能为空!' }]}>
                    <InputNumber/>
                </Form.Item>

                <Form.Item label="单位" name='unitCode'>
                    <Input disabled />
                </Form.Item>

                <Form.Item label="价格" name='price' rules={[{ required: true, message: '价格不能为空!' }]}>
                    <Input prefix="￥" suffix="RMB"/>
                </Form.Item>

                <Form.Item label="备注" name='description'>
                    <TextArea rows={3} />
                </Form.Item>
                <AttrEdit attrs={demand.attrs}/>
            </Form>
        )
    }
}
export default Edit;