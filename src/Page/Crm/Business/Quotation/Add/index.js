import React, { Component } from 'react';
import { Modal,message, Form, Input, Tabs,Select,DatePicker,Descriptions,Table } from 'antd';
import QuotationService from '../Service'
import ContoctsService from '../../../Customer/Contocts/Service'
import BusinessService from '../../../Business/Business/Service'
import Discount from '../Discount'
const { TextArea } = Input;
const {Option} = Select;
const {TabPane} =Tabs;
//添加组件
class Add extends Component {
    state={
        selectContoctss:'',
        quotationItems:[],
        discountVisible:false,
    }
    formRef = React.createRef(); 
    componentWillMount  = async ()=>{
        const { businessId } = this.props;
        const business = await BusinessService.getBusiness(businessId);
        const contoctss =await ContoctsService.getContoctsByCustomer(business.customerId);
        const quotationItems =await  QuotationService.getQuotationItemByBusinessId(businessId);
        let amount = 0;
        quotationItems.forEach(quotationItem => {
            switch (quotationItem.discountWay){
                case 'DEPRECIATE':
                    amount+=((quotationItem.quantity*quotationItem.price)-quotationItem.discount);
                    break;
                case 'DISCOUNT':
                    amount+=((quotationItem.quantity*quotationItem.price)*quotationItem.discount);
                    break;
                default:
                    amount+=0;
            }
        });
        this.formRef.current.setFieldsValue({amount:amount});
        this.setState({
			selectContoctss:contoctss.map(d => (<Option key={d.id}>{d.name}</Option>)),quotationItems
		})
    }
    handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
        const { handAddOKFinish } = this.props;
        values = {...values,quotationItems:this.state.quotationItems}
		await QuotationService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    } 
    
    render() {      
        const { token,businessId } = this.props;
        const columns = [ 
        { title: '产品编号', width: 100, dataIndex: 'productCode', key: 'productCode'},							
        { title: '产品名称', width: 120, dataIndex: 'priductName', key: 'priductName'},
        { title: '数量', width: 80, dataIndex: 'quantity', key: 'quantity'},
        { title: '价格', width: 80, dataIndex: 'price', key: 'price'},
        { title: '单位', width: 80, dataIndex: 'unitCode', key: 'unitCode'},
        { title: '折扣方式', width: 100, dataIndex: 'discountWay', key: 'discountWay',
        render: ((data) => {
            switch (data) {
            case 'DEPRECIATE':
                return '降价'
            case 'DISCOUNT':
                return '折扣'
            default:
                return "";
            }
        }) },
        { title: '金额/折扣', width: 80, dataIndex: 'discount', key: 'discount'},
        {
            title: '操作',
            key: 'operation',
            width: 60,
            render: (text,record,index) =>
            <span>
                <a href='javascript:void(0)' onClick={()=>{this.handDiscount(record.id)}}>折扣</a>
            </span>
        }
        ];
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
        return (
            <Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,businessId:businessId}}>
                 <Tabs type="card">
                    <TabPane tab="基本信息" key="1">	
                        <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                            <Input type='hidden'/>
                        </Form.Item>
                        <Form.Item name="businessId" style={{display:'none'}} rules={[{ required: true, message: 'businessId不能为空!' }]}>
                            <Input type='hidden'/>
                        </Form.Item>
                        <Form.Item label="报价单名称" name="name" rules={[{ required: true, message: '产品不能为空!' }]}>
                            <Input />
                        </Form.Item>	
                        <Form.Item label="报价日期" name='quotationDate' rules={[{ required: true, message: '数量不能为空!' }]}>
                            <DatePicker />
                        </Form.Item>

                        <Form.Item label="客户联系人" name='contoctsId'>                    
                            <Select placeholder="请选择客户联系人">
                                {this.state.selectContoctss}
                            </Select>
                        </Form.Item>

                        <Form.Item label="总金额" name='amount' rules={[{ required: true, message: '价格不能为空!' }]}>
                            <Input prefix="￥" suffix="RMB"/>
                        </Form.Item>

                        <Form.Item label="有效天" name='effectiveDate' rules={[{ required: true, message: '数量不能为空!' }]}>
                            <Input suffix="天"/>
                        </Form.Item>

                        <Form.Item label="我方联系人" name='contacts'>
                            <Input />
                        </Form.Item>

                        <Form.Item label="联系电话" name='contactPhone'>
                            <Input />
                        </Form.Item>
                        <Form.Item label="联系地址" name='contactAddress'>
                            <Input />
                        </Form.Item>
                        <Form.Item label="备注" name='description'>
                            <TextArea rows={3} />
                        </Form.Item>

                </TabPane>
                <TabPane tab="产品明细" key="2">
                    <Table 
                    className='info-table' 
                    rowKey="productCode"
                    columns={columns} bordered={true} size="small" 
                    dataSource={this.state.quotationItems}  
                    pagination={false}
                    expandable={ {expandedRowRender:record =>
                    <Descriptions className='business-content'  column={2}>
                        {record.attrs.map(attr=>(<Descriptions.Item label={attr.name}>{attr.value}</Descriptions.Item>))}
                    </Descriptions>
                    }}
                    />
                </TabPane>
                </Tabs>
                <Modal title='折扣' visible={this.state.discountVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleDiscountOK} onCancel={this.handleDiscountCancel}
                    okText='提交' cancelText='关闭'>
                    <Discount ref={this.onDiscountRef} discount={this.state.discount} handDiscountOKFinish={this.handDiscountOKFinish}  />
                </Modal>
            </Form>
        )
    }

    onDiscountRef = (ref) => {
        this.child = ref
    }//点击创建按钮


    handDiscount=(id)=>{
        this.state.quotationItems.forEach(quotationItem => {
            if(quotationItem.id===id){
                this.setState({
                    discount:quotationItem,
                    discountVisible:true
                })
            }
        });
    }

    handleDiscountOK = () =>{
        this.child.handleOK();
    }

    handleDiscountCancel = () => {
        this.setState({ 
            discountVisible: false, 
        })
    }

    handDiscountOKFinish = async (values)=>{
        this.setState({ discountVisible: false })
        let amount = 0;     
        const quotationItems = this.state.quotationItems 
        quotationItems.forEach(quotationItem => {
            if(quotationItem.id===values.id){
                quotationItem.discountWay=values.discountWay
                quotationItem.discount = values.discount
            }
            switch (quotationItem.discountWay){
                case 'DEPRECIATE':
                    amount+=(quotationItem.quantity*(quotationItem.price-quotationItem.discount));
                    break;
                case 'DISCOUNT':
                    amount+=((quotationItem.quantity*quotationItem.price)*quotationItem.discount);
                    break;
                default:
                    amount+=0;
            }
        })
        this.setState({ quotationItems: quotationItems })
        this.formRef.current.setFieldsValue({amount:amount});
    }


}
export default Add;