import React, { Component } from 'react';
import { Table, Button, Input, message, Modal } from 'antd';
import { PlusOutlined,EditOutlined,InfoCircleOutlined,SearchOutlined } from '@ant-design/icons';
import Authority from '../../../../Frame/Authority';
import ContoctsRecordService from './Service'
import ContoctsRecordInfo from './Info'
import ContoctsRecordAdd from './Add'
const {confirm} = Modal
class ContoctsRecord extends Component {
    state = {
        dataSource: [],
        pagination:{},
        filters:{},
        sorter:{},
        loading:false,
        addVisible: false,
        editVisible:false,
        selectedRowKeys:[],
        contoctsRecord:{},
    }

    componentDidMount = () => {
		this.search();
    }
    
    search = (pagination=this.state.pagination, filters=this.state.filters, sorter=this.state.sorter) => {
        this.setState({ loading: true })
        ContoctsRecordService.pageList({...pagination, ...filters, ...sorter}).then(res => {
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
        const columns = [   { title: '序号', width: 50, render: (text, record, index) => `${index + 1}`,},
		                    { title: '客户', width: 120, dataIndex: 'customerName', key: 'customerName', sorter: true,...this.getSearchProps("customerName") },
		                    { title: '商机', width: 120, dataIndex: 'businessName', key: 'businessName',sorter: true,...this.getSearchProps("businessName") },
                            { title: '联系人', dataIndex: 'contoctsName', key: 'contoctsName', sorter: true,...this.getSearchProps("contactsName"), width: 120},
                            { title: '是否跟进', width: 100, dataIndex: 'isFollow', key: 'isFollow',
								render: ((data) => {
									switch (data) {
									case false:
										return '否'
									case true:
										return '是'
									default:
										return "";
									}
								})
                            },
                            { title: '内容', dataIndex: 'content', key: 'content',  width: 200},
                            { title: '下次联系时间', dataIndex: 'nextTime', key: 'nextTime',  width: 100},
                            { title: '创建人', dataIndex: 'createUser', key: 'createUser', width: 100, },
                            { title: '创建时间', dataIndex: 'createTime', key: 'createTime', sorter: true, width: 150, }
            ];
        return(
            <div className="table-list"> 
               <div className='table-list-top'>
                    <div className='table-list-top-tp'>
                        <Authority authorityId='CONTOCTS_RECORD_EDIT'>
                            <Button className="table-list-operator-buttom" type="primary" icon={<PlusOutlined />} onClick={this.handleAdd}>新建</Button>
                        </Authority>
                        <Authority authorityId='CONTOCTS_RECORD_INFO'>
                            <Button className="table-list-operator-buttom"  icon={<InfoCircleOutlined  />} onClick={this.handleInfo}>详情</Button>
                        </Authority>
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
                <Modal title='添加联系记录' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
				onOk={this.handleAddOK} onCancel={this.handleAddCancel}
				okText='提交' cancelText='关闭'>
                    <ContoctsRecordAdd ref={this.onAddRef} token = {this.state.token} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>

                <Modal title='联系记录详情' visible={this.state.infoVisible} destroyOnClose={true} centered width={1000}
				onCancel={this.handleInfoCancel} okButtonProps={{disabled:true}}
				okText='提交' cancelText='关闭'>
                    <ContoctsRecordInfo ref={this.onInfoRef} contoctsRecord = {this.state.contoctsRecord} />
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
    //点击创建按钮
	handleAdd = async () => {
		this.setState({
            addVisible: true,
            token:await ContoctsRecordService.getToken()
		})
    }

    handleAddOK = () =>{
        this.child.handleOK();
    }

    handAddOKFinish = ()=>{
        this.setState({ addVisible: false })        
        this.search(); 
    }

    handleAddCancel = () => {
        this.setState({ 
            addVisible: false, 
        })
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
    handleInfo = async () => {
        if(this.state.selectedRowKeys.length > 1){
            message.error("对不起，您只能选择一行进行查询！");
            return;
        }
        if(this.state.selectedRowKeys.length < 1){
            message.info("您好，您必须选择一行进行修改查询！"); 
            return
        }
        //获取数据
        let accessLog = await ContoctsRecordService.getContoctsRecord(this.state.selectedRowKeys[0])
        this.setState({ 
            infoVisible: true, 
            accessLog
        })
    }

    handleInfoCancel = () => {
        this.setState({ 
            infoVisible: false, 
        })
    }
}
export default ContoctsRecord;