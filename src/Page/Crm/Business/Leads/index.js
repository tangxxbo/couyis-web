import React, { Component } from 'react';
import { Dropdown,Table, Button, Input, message, Modal, Menu } from 'antd';
import { PlusOutlined,EditOutlined,DeleteOutlined,SearchOutlined,DownOutlined ,RedoOutlined   } from '@ant-design/icons';
import Authority from '../../../../Frame/Authority';
import LeadsService from './Service'
import LeadsAdd from './Add'
import LeadsEdit from './Edit'
import Transition from './Transition'
const {confirm} = Modal
class Leads extends Component {
    state = {
        dataSource: [],
        pagination:{},
        filters:{},
        sorter:{},
        loading:false,
        addVisible: false,
        editVisible:false,
        transitionVisible:false,
        selectedRowKeys:[],
        contocts:{},
    }

    componentDidMount = () => {
		this.search();
    }
    
    search = (pagination=this.state.pagination, filters=this.state.filters, sorter=this.state.sorter) => {
        this.setState({ loading: true })
        LeadsService.pageList({...pagination, ...filters, ...sorter}).then(res => {
			pagination.total = res.total;
			pagination.pageSize = res.pageSize;
			pagination.current = res.current;
			pagination.showTotal = () => `总共${res.total} 条`
			pagination.showQuickJumper = true
			this.setState({
				dataSource: res.list,
                pagination: pagination,                
			})
		}).catch(error => {
			message.error(error.message)
		}).finally(() => {
			this.setState({ loading: false })
		})
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination,filters,sorter
        })
        this.search(pagination, filters, sorter)
    }

    handleReset = clearFilters => {
        clearFilters();
    };

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
      };

    getSearchProps = dataIndex =>({
        filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input ref={node => {this.searchInput = node;}} value={selectedKeys} 
                onChange={e => setSelectedKeys(e.target.value ? e.target.value : '')}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188,marginTop:10, marginBottom: 15, display: 'block' }}/>

                <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />} style={{ width: 90, marginRight: 8 }}>查询</Button>

                <Button onClick={() => this.handleReset(clearFilters)} style={{ width: 90 }}>清除</Button>    
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

        onFilterDropdownVisibleChange: visible => {if (visible) {setTimeout(() => this.searchInput.select());}},       

    })

    

    render() {
        const columns = [   { title: '序号', width: 50, render: (text, record, index) => `${index + 1}`},
		                    { title: '名称', width: 200, dataIndex: 'name', key: 'name', sorter: true,...this.getSearchProps("name")},
		                    { title: '联系人', width: 100, dataIndex: 'contactsName', key: 'contactsName',sorter: true,...this.getSearchProps("contactsName") },
                            { title: '职位', dataIndex: 'position', key: 'position', sorter: true, width: 100},
                            { title: '称呼', dataIndex: 'saltName', key: 'saltName', sorter: true, width: 100},
                            { title: '电话', dataIndex: 'mobile', key: 'mobile', sorter: true, width: 150,...this.getSearchProps("mobile") },
                            { title: '转换', dataIndex: 'isTransformed', key: 'isTransformed', sorter: true, width: 100 ,
                            filters: [
                                { text: '已转', value: 1 },
                                { text: '未转', value: 0 },
                              ],
                            render: ((data) => {
                                    switch (data) {
                                    case true:
                                        return '已转'
                                    case false:
                                        return '未转'
                                    default:
                                        return "";
                                    }
                                })
                            },
                            { title: '创建人', dataIndex: 'createUser', key: 'createUser', width: 100, },
                            { title: '创建时间', dataIndex: 'createTime', key: 'createTime', sorter: true, width: 150, },
                            { title: '修改人', dataIndex: 'updateUser', key: 'updateUser', width: 100, },
                            { title: '修改时间', dataIndex: 'updateTime', key: 'updateTime', sorter: true, width: 150, }   
            ];
        const menu=(
            <Menu>
                <Authority authorityId='CONTOCTS_EDIT'> 
                    <Menu.Item key='0'>                        
                        <Button icon={<PlusOutlined />} type="link" onClick={this.handleAddContocts}>创建联系人</Button>
                    </Menu.Item>
                </Authority>
            </Menu>
        )
        return(
            <div className="table-list"> 
               <div className='table-list-top'>
                    <div className='table-list-top-tp'>
                        <Authority authorityId='LEADS_EDIT'>                          
                            <Button className="table-list-operator-buttom" type="primary" icon={<PlusOutlined />} onClick={this.handleAdd}>添加</Button>
                            <Button className="table-list-operator-buttom" icon={<EditOutlined />} onClick={this.handleEdit}>修改</Button>
                        </Authority>
                        <Authority authorityId='LEADS_DELETE'>
                            <Button className="table-list-operator-buttom" icon={<DeleteOutlined />} onClick={this.handleDelete}>删除</Button>
                        </Authority>                        
                        
                        <Button className="table-list-operator-buttom" icon={<RedoOutlined  />}  onClick={this.handleTransition}>转换</Button>
                        <Authority authorityId='LEADS_TRAN'></Authority>
                    </div>
                </div>
				<Table
					dataSource={this.state.dataSource}
					columns={columns}
					loading={this.state.loading}
					onChange={this.handleTableChange}
					pagination={this.state.pagination}
                    bordered={true}					
                    size="small"
                    rowSelection={{type:"checkbox",onChange:this.onSelectChange,}}
                    rowKey={(record) => `${record.id}`}
					 />
                <Modal title='添加线索' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
				onOk={this.handleAddOK} onCancel={this.handleAddCancel}
				okText='提交' cancelText='关闭'>
                    <LeadsAdd ref={this.onAddRef} token = {this.state.token} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
                
                <Modal title='修改线索' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
				onOk={this.handleEditOK} onCancel={this.handleEditCancel}
				okText='提交' cancelText='关闭'>
                    <LeadsEdit ref={this.onEditRef} leads={this.state.leads} handEditOKFinish ={this.handEditOKFinish} />
                </Modal>

                <Modal title='转换' visible={this.state.transitionVisible} destroyOnClose={true} centered width={800}
				onOk={this.handleTransitionOK} onCancel={this.handleTransitionCancel}
				okText='提交' cancelText='关闭'>
                    <Transition ref={this.onTransitionRef} token = {this.state.token} leads={this.state.leads} handAddOKFinish={this.handTransitionOKFinish}  />
                </Modal>
			</div >
        )
    }
    onAddRef = (ref) => {
        this.child = ref
    }

    onEditRef = (ref) => {
        this.child = ref
    }

    onTransitionRef = (ref) => {
        this.child = ref
    }
    //点击创建按钮
	handleAdd = async () => {
		this.setState({
            addVisible: true,
            token:await LeadsService.getToken()
		})
    }

    handleAddOK = () =>{
        this.child.handleOK();
    }

    handAddOKFinish = ()=>{
        this.setState({ addVisible: false })        
        this.search(); 
    }
    
    //取消添加
	handleAddCancel = () => {
		this.setState({ addVisible: false })
	}

    onSelectChange = (record, selected) => {
        var selectedRowKeys =  new Array()
        selected.forEach(row => {
            if(row !== undefined){
                selectedRowKeys.push(row.id)
            }            
        });
        this.setState({ selectedRowKeys: selectedRowKeys});
    };

    handleEdit = async () => {
        if(this.state.selectedRowKeys.length > 1){
            message.error("对不起，您只能选择一行进行修改！");
            return;
        }
        if(this.state.selectedRowKeys.length < 1){
            message.info("您好，您必须选择一行进行修改！"); 
            return
        }
        //获取数据
        this.setState({ 
            editVisible: true, 
            leads:await LeadsService.getLeads(this.state.selectedRowKeys[0])
        })
    }

    handleEditOK = () =>{       
        this.child.handleOK();
    }

    handEditOKFinish = ()=>{
        this.setState({ editVisible: false })        
        this.search(); 
    }

    handleEditCancel = () => {
		this.setState({ editVisible: false })
    }
    
    //点击删除按钮
	handleDelete = (id) => {
        const selectedRowKeys = this.state.selectedRowKeys;
        if(selectedRowKeys.length < 1){
            message.info("您好，您必须选择一行进行删除！"); 
            return
        }
        
		const _this = this;
		confirm({
			title: '删除数据吗', content: '您确定要删除这'+selectedRowKeys.length+'项数据吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                await LeadsService.delete(selectedRowKeys)
                _this.setState({selectedRowKeys:[]});
				message.success("删除成功！")
				_this.search();
			},
		});
    }
    
    //点击创建按钮
	handleTransition = async () => {
        const selectedRowKeys = this.state.selectedRowKeys;
        if(selectedRowKeys.length < 1){
            message.info("您好，您必须选择一行进行操作！"); 
            return
        }
        const leads = await LeadsService.getLeads(this.state.selectedRowKeys[0])
        if(leads.isTransformed==true){
            message.info("该线索已经转换，请直接跟进客户！"); 
            return
        }
		this.setState({
            transitionVisible: true,
            token:await LeadsService.getToken(),
            leads
		})
    }

    handleTransitionOK = () =>{
        this.child.handleOK();
    }

    handTransitionOKFinish = ()=>{
        this.setState({ transitionVisible: false })        
        this.search(); 
    }
    
    //取消添加
	handleTransitionCancel = () => {
		this.setState({ transitionVisible: false })
	}
}
export default Leads;