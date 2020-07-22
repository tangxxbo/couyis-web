import React, { Component } from 'react';
import { Avatar, Divider,Button,Modal,Table,Comment, Tooltip,message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Authority from '../../../../Frame/Authority';
import QuotationService from './Service'
import QuotationAdd from './Add'
import QuotationEdit from './Edit'
import Attr from '../../Platform/Attr'
const {confirm} = Modal
class Quotation extends Component {
    state = {
        addVisible:false,
        quotations:[],
        editVisible:false,
    }
    componentWillMount =async () =>{        
        const quotations = await QuotationService.getQuotationByBusinessId(this.props.businessId);
        this.setState({
            quotations,
        }) 
    }

    item=(quotationItems)=>{
        const columns = [
            { title: '产品编号', dataIndex: 'productCode', key: 'productCode' },
            { title: '名称', dataIndex: 'productName', key: 'productName' },
            { title: '数量', dataIndex: 'quantity', key: 'quantity' },
            { title: '价格', dataIndex: 'price', key: 'price' },
            { title: '价格', dataIndex: 'unitCode', key: 'unitCode' },
            { title: '折扣方式', dataIndex: 'discountWay', key: 'discountWay' ,
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
            { title: '金额/折扣', dataIndex: 'discount', key: 'discount' },
          ];
          return <Table columns={columns} dataSource={quotationItems} pagination={false} />;
    }

    render() {
        const columns = [   { title: '序号', width: 60, render: (text, record, index) => `${index + 1}`, },
        { title: '编号', width: 120, dataIndex: 'code', key: 'code'},							
        { title: '名称', width: 120, dataIndex: 'name', key: 'name'},
        { title: '报价日期', width: 120, dataIndex: 'quotationDate', key: 'quotationDate'},
        { title: '联系人', width: 120, dataIndex: 'contoctsName', key: 'contoctsName'},
        { title: '金额', width: 80, dataIndex: 'amount', key: 'amount'},
        { title: '有效天', width: 80, dataIndex: 'effectiveDate', key: 'effectiveDate'},
        { title: '我方人员', width: 120, dataIndex: 'contacts', key: 'contacts'},
        {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text,record,index) =>
            <span>
            {status==='FOLLOW'?
            <span>               
                <a href='javascript:void(0)' onClick={()=>{this.handEdit(record.id)}}>修改</a>
                <Divider type="vertical" />
                <a href='javascript:void(0)' onClick={()=>{this.handDelete(record.id)}}>删除</a>               
            </span>
             :''
            }</span>
           ,
        }];
        const {status,businessId} = this.props
        return (
        <div>
            <span className='column-title'>报价记录</span>
            <div className='record-buttom'>
                <Authority authorityId='BUSINESS_QUOTATION_EDIT'>
                    <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd} disabled={status==='FOLLOW'?false:true}>报价</Button>
                </Authority>
                <Modal title='添加报价' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddOK} onCancel={this.handleAddCancel}
                    okText='提交' cancelText='关闭'>
                    <QuotationAdd ref={this.onAddRef} token = {this.state.token} businessId={businessId} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
                <Modal title='修改报价' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleEditOK} onCancel={this.handleEditCancel}
                    okText='提交' cancelText='关闭'>
                    <QuotationEdit ref={this.onEditRef} quotation={this.state.quotation} handEditOKFinish={this.handEditOKFinish}  />
                </Modal>
            </div>
            <Table 
                className='info-table' 
                rowKey="id"
                columns={columns} bordered={true} size="small" 
                dataSource={this.state.quotations}  
                pagination={false}
                expandable={ {expandedRowRender:record => this.item(record.quotationItems) }}
                />
            <Divider />
        </div>)
    }

    onAddRef = (ref) => {
        this.child = ref
    }//点击创建按钮

    onEditRef = (ref) => {
        this.child = ref
    }

    handleAdd = async () => {
        this.setState({
            addVisible: true,
            token:await QuotationService.getToken(),            
        })
    }

    handleAddOK = () =>{
        this.child.handleOK();
    }

    handleAddCancel = () => {
        this.setState({ 
            addVisible: false, 
        })
    }

    handAddOKFinish = async ()=>{
        this.setState({ addVisible: false })        
        const quotations = await QuotationService.getQuotationByBusinessId(this.props.businessId);
        this.setState({
            quotations
        }) 
    }

    handEdit = async (id) => {
        this.setState({
            editVisible: true,
            quotation: await QuotationService.geQuotation(id)
        })
    }

    handleEditOK = () =>{
        this.child.handleOK();
    }

    handleEditCancel = () => {
        this.setState({ 
            editVisible: false, 
        })
    }

    handEditOKFinish = async ()=>{
        this.setState({ editVisible: false })        
        this.setState({
            quotations:  await QuotationService.getQuotationByBusinessId(this.props.businessId)
        }) 
    }

    //点击删除按钮
	handDelete = (id) => {
		const _this = this;
		confirm({
			title: '您确定删除报价吗', content: '您确定删除报价信息吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                await QuotationService.delete([id]);
				message.success("删除报价信息成功！")
                _this.setState({
                    quotations:  await QuotationService.getQuotationByBusinessId(_this.props.businessId)
                }) 
			},
		});
	}
}

export default Quotation;