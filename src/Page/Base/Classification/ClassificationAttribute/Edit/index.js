import React, { Component } from 'react';
import {  Form, Input,Select} from 'antd';
import AttributeService from '../../../Attribute/Service'
const {Option} = Select;
//添加组件
class Add extends Component {

    formRef = React.createRef();
    state = {selectAtrributes:'',attributes:[]}
    componentWillMount = async () =>{
        const attributes = await AttributeService.getAttributes();
        this.setState({
            attributes,
            selectAtrributes:attributes.map(d => (<Option key={d.id}>{d.code+"-"+ d.name}</Option>))
        })
    }

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = (values) =>{
        const { handEditOKFinish} = this.props;
        let name = "";
        let code = "";
        this.state.attributes.forEach(attribute => {
            if(attribute.id===values.attributeId){
                name = attribute.name;
                code = attribute.code;
            }
        });
        values = {...values,name,code}
        handEditOKFinish(values);
    }
	render() {       
		const {classificationAttribute} = this.props;
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={classificationAttribute}>
                    <Form.Item name="key" style={{display:'none'}} rules={[{ required: true, message: 'key!' }]}>
                        <Input type='hidden'/>
                    </Form.Item>
                    <Form.Item label="属性" name="attributeId" rules={[{ required: true, message: '属性不能为空!' }]}>
                        <Select >
                            {this.state.selectAtrributes}
                        </Select >
                    </Form.Item>
                    <Form.Item label="描述" name="description" rules={[{ required: true, message: '描述不能为空!' }]}>
                        <Input />
                    </Form.Item>
				</Form>
		);
	}
}
export default Add;