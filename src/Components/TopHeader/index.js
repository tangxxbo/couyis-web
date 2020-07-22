import React from 'react';
import './index.css';
import { Layout,Dropdown ,Menu,message } from 'antd';
import { UserOutlined,LockOutlined ,LogoutOutlined,DownOutlined  } from '@ant-design/icons';
import '../../Config/config'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'  //连接器
import ChangePassword from '../ChangePassword'
import LoginService from '../../Frame/Login/Service'
const { Header} = Layout;
class TopHeader extends React.Component {
    state = {
        changeVisible:false,
        collapsed :false
    }
    handleClientW = (width,num)=>{
        if(width < num){
            this.setState({
                collapsed : true
            })
        }else{
            this.setState({
                collapsed :false
            })
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
        let clientW = document.documentElement.clientWidth;
        // console.log(clientW)
        this.handleClientW(clientW,1040);
      }
      handleResize = e => {
        let e_width = e.target.innerWidth;
        this.handleClientW(e_width,1040);
        // console.log('浏览器窗口大小改变事件', e.target.innerWidth);
      }
      componentWillUnmount() {       
        window.removeEventListener('resize', this.handleResize.bind(this));
      }

    initUi= () =>{
        const { menus } = this.props;        
        return menus.map((menu, index)=>( 
            <span>
            {(menu.childs.length>=1 || menu.public===true)?
            <Link to={menu.url} className={this.currentTop()===menu.id ?  "top-menus-current top-menus-buttom":"top-menus-buttom"} key={index}  >
                <div className="top-menus-buttom-content" collapsed = {this.state.collapsed}>                            
                <div className={menu.className+" "+"top-menus-button-img"}>
                </div>
                <div className="top-menus-button-title">{menu.name}</div>
                </div>                            
            </Link>:''}
            </span>
        ));
    }

    currentTop = () =>{
        const { menus,path } = this.props;
        var id = "";
        for(var i =0 ;i<menus.length;i++){
            if(menus[i].url===path){
                id =menus[i].id;
                break;
            }
            var flag = false;
            var childs = menus[i].childs
            if(childs !== undefined){
                for(var j =0 ;j<childs.length;j++){
                    if(childs[j].url===path){
                        flag=true;
                        break;
                    }
                    var subChilds = childs[j].childs                                      
                    if(subChilds !==undefined){
                        var subFlag = false;
                        for (var k = 0; k < subChilds.length; k++) {
                            console.log(path.indexOf(subChilds[k].url))
                           if(path.indexOf(subChilds[k].url)>=0){
                                subFlag=true;
                                break;
                           }                            
                        }
                        if(subFlag ===true){
                            flag=true;
                            break;
                        }
                    }                   

                }
            }
            if(flag === true ){
                id = menus[i].id;
            }
        }
        return id;
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              {/* <Menu.Item key="userinfo">
                    <UserOutlined />个人设置 
              </Menu.Item> */}
              <Menu.Item key="changepassword">
                    <LockOutlined  /> 修改密码
              </Menu.Item>
              <Menu.Item key="logout">
                    <LogoutOutlined  />退出系统
              </Menu.Item>
            </Menu>
          );
        const cpassMethods = { handleChangeOK: this.handleChangeOK, handleChangeCancel: this.handleChangeCancel,visible:this.state.changeVisible}
        return (           
            <Header id="site-layout-header">
                <div  className="site-layout-header">
                <div className="logo"></div>
                <div className="top-menus">
                {this.initUi()}
                </div>
                <div className="top-user-info">
                    <Dropdown overlay={menu} >
                        <a className="top-user-info-link" onClick={e => e.preventDefault()}>
                        <UserOutlined /> {this.props.account} <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
                </div>
                <ChangePassword {...cpassMethods}/>
            </Header>
        );
    }
    handleMenuClick= async (e) =>{
        switch (e.key){
            case 'userinfo':
                break;
            case 'changepassword':
                this.setState({changeVisible:true})
                break;
            case 'logout':
                await LoginService.logout();
                window.location = '/';
                break;
            default:
        }
      }

    handleChangeCancel = () =>{
        this.setState({changeVisible:false})
    }

    handleChangeOK = async (values) =>{
        await LoginService.changePassword(values);
        this.setState({changeVisible:false})
        message.success("密码修改完成！");
        
    }
}

const mapStateToProps = state => {
	return {
        account: state.account,
	}
}

export default connect(mapStateToProps)(TopHeader);