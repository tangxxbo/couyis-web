import React, { Component } from 'react';
import { Table, Divider,Button,Modal,Timeline } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Authority from '../../../../../Frame/Authority';
import ContoctsService from '../../../Customer/Contocts/Service'
import ContoctsAdd from '../../../Customer/Contocts/Add'
class Contocts extends Component {
    state = {
        addVisible:false,
        contoctss:[],
    }
    componentWillMount =async () =>{
        const contoctss = await ContoctsService.getContoctsByCustomer(this.props.customerId);
        this.setState({
            contoctss,
        }) 
    }
    render() {
        const columns=[{ title: '序号', width: 80, render: (text, record, index) => `${index + 1}`},
                                { title: '姓名', width: 120, dataIndex: 'name', key: 'name'},
                                { title: '职位', dataIndex: 'post', key: 'post',  width: 120},
                                { title: '部门', dataIndex: 'dept', key: 'dept',width: 120},
                                { title: '性别', dataIndex: 'sex', key: 'sex', width: 120,
                                    render: ((data) => {
                                        switch (data) {
                                        case 0:
                                            return '女'
                                        case 1:
                                            return '男'
                                        default:
                                            return "";
                                        }
                                    })
                                },
                                { title: '称呼', dataIndex: 'saltName', key: 'saltName',width: 120},
                                { title: '电话', dataIndex: 'telephone', key: 'telephone', width: 150}]
        const {status} = this.props
        return (
        <div>
            <span className='column-title'>联系人</span>
            <div className='record-buttom'>
                <Authority authorityId='CONTOCTS_EDIT'>
                    <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd} disabled={status==='FOLLOW'?false:true}>新增联系人</Button>
                </Authority>
               
                <Modal title='添加联系记录' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddOK} onCancel={this.handleAddCancel}
                    okText='提交' cancelText='关闭'>
                    <ContoctsAdd ref={this.onAddRef} token = {this.state.token} customerId={this.props.customerId} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
            </div>
            <Table className='info-table' columns={columns} bordered={true} size="small" dataSource={this.state.contoctss}  pagination={false}/>
            <Divider />
        </div>)
    }

    onAddRef = (ref) => {
        this.child = ref
    }//点击创建按钮


    handleAdd = async () => {
        this.setState({
            addVisible: true,
            token:await ContoctsService.getToken()
        })
    }
    
    handleAddOK = () =>{
        this.child.handleOK();
    }
    
    handAddOKFinish = async ()=>{
        this.setState({ addVisible: false })        
        const contoctss =await ContoctsService.getContoctsByCustomer(this.props.customerId);
        this.setState({
            contoctss
        }) 
    }
    handleAddCancel = () => {
        this.setState({ 
            addVisible: false, 
        })
    }
}

export default Contocts;