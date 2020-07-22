import React, { Component } from 'react';
import { message, Form, Input, InputNumber,Select,DatePicker } from 'antd';
import BusinessCompetitorService from '../Service'
import CompetitorService from '../../../../Customer/Competitor/Service'
const { TextArea } = Input;
const {Option} = Select;
//添加组件
class CompetitorAdd extends Component {
    state={
        selectCompetitors:''
    }
    formRef = React.createRef(); 
    componentWillMount  = async ()=>{
        const competitors =await CompetitorService.getCompetitors()
        this.setState({
			selectCompetitors:competitors.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
		})
    }
    handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await BusinessCompetitorService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    } 
    render() {      
        const { token,businessId } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
        return (
            <Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,businessId:businessId}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
                    <Form.Item name="businessId" style={{display:'none'}} rules={[{ required: true, message: 'businessId不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
                    <Form.Item label="竞争对手" name="competitorId" rules={[{ required: true, message: '竞争对手不能为空!' }]}>
						<Select placeholder="请选择竞争对手" onChange={this.handleCustomerChange}>
							{this.state.selectCompetitors}
						</Select>
					</Form.Item>					
					<Form.Item label="备注" name='description'>
						<TextArea rows={3} />
					</Form.Item>
				</Form>
        )
    }
}
export default CompetitorAdd;