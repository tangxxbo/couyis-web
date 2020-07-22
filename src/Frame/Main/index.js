import React from 'react';
import './index.css';
import { Layout} from 'antd';
import TopHeader from '../../Components/TopHeader';
import NavLeft from '../../Components/NavLeft';
import Bread from '../../Components/Bread';
import { connect } from 'react-redux'  //连接器
import '../../Config/config'

const {Content} = Layout;

class Main extends React.Component {
    state={
      menus:[],
    }

    componentWillMount = async () =>{    
      const menus = this.getAuthMenus(this.props.authority);// global.constants.menus;
      
      menus.forEach(menu =>{
        if(menu.childs.length>0){
          menu.url=menu.childs[0].url
        }        
      })
      this.setState({
        menus:menus,
      })      
    }

    render() {
      const url = window.location.href;
      const path = url.substring(url.indexOf("#")+1)
      const pathInfo = { menus: this.state.menus,path:path};
      return (
        <Layout className="main-frame">
            <TopHeader {...pathInfo}/>
            <Layout className="site-layout">
            <NavLeft {...pathInfo} />                         
            <Content className="site-layout-content" >
             <Bread {...pathInfo} />
             {this.props.children}
            </Content>                   
            </Layout>
            {/* <Footer className="site-layout-fotter">©2018 星邦重工</Footer> */}
        </Layout>
      )
    }


    getAuthMenus = (authoritys) => {
      const menus = global.constants.menus;
      menus.forEach(menu =>{
        menu.childs=this.getAuthChilds(menu.childs,authoritys);
      })
      return menus;
    }

    getAuthChilds = (childs , authoritys) =>{
      var cs=new Array();
      for(var i =0;i<childs.length;i++){
        if(this.checkMenu(childs[i].authority,authoritys)===true){
          cs.push(childs[i]);
        }       
      }
      return cs;
    }

    checkMenu = (authority,authoritys) => {      
      for(var i =0;i<authoritys.length;i++){
        if(authoritys[i]===authority){
          return true;
        } 
      }
      return false;
    }

}

const mapMStateToProps = state => {
	return {
		authority: state.authority,
	}
}

export default connect(mapMStateToProps)(Main);