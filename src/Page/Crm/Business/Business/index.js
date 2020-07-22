import React, { Component } from 'react';
import { Table, Button, Input, message, Modal } from 'antd';
import moment from 'moment';
import { PlusOutlined,EditOutlined,DeleteOutlined,SearchOutlined,RiseOutlined} from '@ant-design/icons';
import Authority from '../../../../Frame/Authority';
import BusinessService from './Service'
import BusinessAdd from './Add'
import BusinessEdit from './Edit'
const {confirm} = Modal
class Business extends Component {
    state = {
        dataSource: [],
        pagination:{},
        filters:{},
        sorter:{},
        loading:false,
        addVisible: false,
        editVisible:false,
        selectedRowKeys:[],
        business:{},
    }

    componentDidMount = () => {
		this.search();
    }
    
    search = (pagination=this.state.pagination, filters=this.state.filters, sorter=this.state.sorter) => {
        this.setState({ loading: true })
        BusinessService.pageList({...pagination, ...filters, ...sorter}).then(res => {
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
        const columns = [   { title: '序号', width: 45, render: (text, record, index) => `${index + 1}`},
                            { title: '商机名称', width: 120, sorter: true,...this.getSearchProps("name"),
                                render: (text,record,index) =>
                                <span>
                                <a href='javascript:void(0)' onClick={()=>{this.handleRiseBusiness(record.id)}}>{record.name}</a>
                            </span>,
                            },
		                    { title: '商机类型', width: 120, dataIndex: 'typeName', key: 'typeName',sorter: true},
                            { title: '客户', width: 120, dataIndex: 'customerName', key: 'customerName', sorter: true, ...this.getSearchProps("customerName")},
                            { title: '商机阶段', dataIndex: 'flowName', key: 'flowName', sorter: true, width: 120},
                            { title: '状态', dataIndex: 'status', key: 'status', sorter: true, width: 120,
                            render: ((data) => {
                                switch (data) {
                                case 'FOLLOW':
                                    return '跟进中'
                                case 'WIN':
                                    return '赢单'
                                case 'LOSE':
                                    return '输单'
                                default:
                                    return "";
                                }
                            })},
                            { title: '创建人', dataIndex: 'createUser', key: 'createUser', width: 100, },
                            { title: '创建时间', dataIndex: 'createTime', key: 'createTime', sorter: true, width: 150, },
                            { title: '修改人', dataIndex: 'updateUser', key: 'updateUser', width: 100, },
                            { title: '修改时间', dataIndex: 'updateTime', key: 'updateTime', sorter: true, width: 150, }   
            ];
        return(
            <div className="table-list"> 
               <div className='table-list-top'>
                    <div className='table-list-top-tp'>
                        <Authority authorityId='BUSINESS_EDIT'>                          
                            <Button className="table-list-operator-buttom" type="primary" icon={<PlusOutlined />} onClick={this.handleAdd}>添加</Button>
                            <Button className="table-list-operator-buttom" icon={<EditOutlined />} onClick={this.handleEdit}>修改</Button>
                        </Authority>
                        <Authority authorityId='BUSINESS_DELETE'>
                            <Button className="table-list-operator-buttom" icon={<DeleteOutlined />} onClick={this.handleDelete}>删除</Button>
                        </Authority>      
                        <Authority authorityId='BUSINESS_RISE'></Authority>   
                            <Button className="table-list-operator-buttom" icon={<RiseOutlined />} onClick={this.handleRise}>跟进</Button>               
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
                <Modal title='添加商机' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
				onOk={this.handleAddOK} onCancel={this.handleAddCancel}
				okText='提交' cancelText='关闭'>
                    <BusinessAdd ref={this.onAddRef} token = {this.state.token} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
                <Modal title='修改商机' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
				onOk={this.handleEditOK} onCancel={this.handleEditCancel}
				okText='提交' cancelText='关闭'>
                    <BusinessEdit ref={this.onEditRef} business={this.state.business} handEditOKFinish ={this.handEditOKFinish} />
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
    handleRiseBusiness = (id) => {
        this.props.history.push('/crm/business/rise/'+id)
    }
    handleRise = () => {
        if(this.state.selectedRowKeys.length > 1){
            message.error("对不起，您只能选择一个商机进行跟进！");
            return;
        }
        if(this.state.selectedRowKeys.length < 1){
            message.info("您好，您必须选择一个商机进行跟进！"); 
            return
        }
        this.props.history.push('/crm/business/rise/'+this.state.selectedRowKeys[0])
    }

    //点击创建按钮
	handleAdd = async () => {
		this.setState({
            addVisible: true,
            token:await BusinessService.getToken()
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
        let business = await BusinessService.getBusiness(this.state.selectedRowKeys[0])
        business.dueDate = moment(business.dueDate, 'YYYY-MM-DD')
        this.setState({ 
            editVisible: true, 
            business
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
                await BusinessService.delete(selectedRowKeys)
                _this.setState({selectedRowKeys:[]});
				message.success("删除成功！")
				_this.search();
			},
		});
	}
}
export default Business;