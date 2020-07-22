import React from 'react';
import './index.css';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
const { Sider} = Layout;
class NavLeft extends React.Component {
    currentTop = () =>{
        const { menus,path } = this.props;
        var menu = {};
        for(var i =0 ;i<menus.length;i++){
            if(menus[i].url===path){
                menu =menus[i];
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
                menu = menus[i];
            }
        }
        return menu;
    }

    // componentWillReceiveProps=(nextProps)=>{
    //     if( nextProps.leftCurrent !== this.props.leftCurrent){
    //         this.setState({
    //             currentId:nextProps.leftCurrent,
    //         });
    //     }        
    // }

    initUi= (menus) =>{
        const { path } = this.props;       
        return menus.map((menu, index)=>(  
            <Link to={menu.url} className="ui-profile-link" id={menu.id} key={index}>         
                <li className={path===menu.url ?  "current ui-profile-navLeft-item":"ui-profile-navLeft-item"}  >               
                    <div className={menu.className+" "+"ui-profile-navLeft-item-icon"}></div>
                    <div className="ui-profile-navLeft-item-text">{menu.name}</div>              
                </li>
            </Link>
        ));
    }

    render() {
        var menus = this.currentTop().childs
        if(menus===undefined ||menus.length<=0){
            return(<div></div>);
        }
        return(
        <Sider id="site-layout-left" trigger={null}>  
            <ul className="ui-profile-navLeft">
                {this.initUi(menus)}
            </ul>
        </Sider> 
       )
    }
}

export default NavLeft;