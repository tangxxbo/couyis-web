import React, { Component } from 'react';
import { Form,Input,Select,InputNumber } from 'antd';
const {Option} = Select;
//添加组件
class Discount extends Component {
    formRef = React.createRef(); 
    handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handDiscountOKFinish } = this.props;
        handDiscountOKFinish(values);
    } 

    render() {      
        const { discount } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
        return (
            <Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...discount}}>
                <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id不能为空!' }]}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item label="折扣方式" name='discountWay' rules={[{ required: true, message: '折扣方式不能为空!' }]}>                    
                    <Select placeholder="请选择折扣方式">
                        <Option value='DEPRECIATE'>降价</Option>
                        <Option value='DISCOUNT'>折扣</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="金额/折扣" name='discount' rules={[{ required: true, message: '折扣不能为空!' }]}>
                    <InputNumber/>
                </Form.Item>
            </Form>
        )
    }
}
export default Discount;