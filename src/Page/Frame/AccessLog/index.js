import React, { Component } from 'react';
import { Table, Button, Input, message, DatePicker,Modal  } from 'antd';
import {InfoCircleOutlined ,SearchOutlined } from '@ant-design/icons';
import AccessLogService from './Service'
import AccessLogInfo from './Info'
const { RangePicker } = DatePicker;
class AccessLog extends Component {
    state = {
        dataSource: [],
        pagination:{},
        filters:{},
        sorter:{},
        loading:false,
        infoVisible:false,
        selectedRowKeys:[],
        accessLog:{},
    }

    componentDidMount = () => {
		this.search();
    }
    
    search = (pagination=this.state.pagination, filters=this.state.filters, sorter=this.state.sorter) => {
        this.setState({ loading: true })
        AccessLogService.pageList({...pagination, ...filters, ...sorter}).then(res => {
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

    handleSearch = (confirm) => {
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

    getSearchTimeScope=(dataIndex)=>({
        filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <RangePicker ref={node => {this.timeScope = node;}} value={selectedKeys}
                onChange = {(date,dateString) => setSelectedKeys(date)}
                style={{marginTop:10, marginBottom: 15 }}
                showTime/>
                <br></br>
                <Button type="primary" onClick={() => this.handleSearch(confirm)}
                    icon={<SearchOutlined />} style={{ width: 90, marginRight: 8 }}>查询</Button>

                <Button onClick={() => this.handleReset(clearFilters)} style={{ width: 90 }}>清除</Button>  
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        
    })

    // <RangePicker showTime onPanelChange/>

    render() {
        const columns = [   { title: '序号', width: 80, render: (text, record, index) => `${index + 1}`, },
		                    { title: '请求路径', width: 140, dataIndex: 'url', key: 'url', sorter: true,...this.getSearchProps("url") },
		                    { title: '用户IP', width: 250, dataIndex: 'ipAddress', key: 'ipAddress', sorter: true,...this.getSearchProps("ipAddress")  },
                            { title: '用户帐号', dataIndex: 'createUser', key: 'createUser', sorter: true, width: 250,...this.getSearchProps("createUser") },
                            { title: '访问时间', dataIndex: 'createTime', key: 'createTime', sorter: true, width: 200, ...this.getSearchTimeScope("createTime")},
            ];
        return(
            <div className="table-list"> 
               <div className='table-list-top'>
                    <div className='table-list-top-tp'>
                        <Button className="table-list-operator-buttom"  icon={<InfoCircleOutlined  />} onClick={this.handleInfo}>详情</Button>
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
                <Modal title='日志详情' visible={this.state.infoVisible} destroyOnClose={true} centered width={1000}
				onCancel={this.handleInfoCancel} okButtonProps={{disabled:true}}
				okText='提交' cancelText='关闭'>
                    <AccessLogInfo accessLog={ this.state.accessLog}/>
                </Modal>
			</div >
        )
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
            message.error("对不起，您只能选择一行进行修改！");
            return;
        }
        if(this.state.selectedRowKeys.length < 1){
            message.info("您好，您必须选择一行进行修改！"); 
            return
        }
        //获取数据
        let accessLog = await AccessLogService.getAccessLog(this.state.selectedRowKeys[0])
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
export default AccessLog;