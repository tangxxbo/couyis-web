import React from 'react';
import './index.css';
import { Breadcrumb } from 'antd';
class Bread extends React.Component { 
    render() {
        const { menus,path } = this.props;
        var topMenu ="";
        var leftMenu="";
        for(var i =0 ;i<menus.length;i++){
            if(menus[i].url===path){
                topMenu=menus[i].name;
            }
            var flag = false;
            var childs = menus[i].childs
            if(childs !== undefined){
                for(var j =0 ;j<childs.length;j++){
                    if(childs[j].url===path){
                        leftMenu=childs[j].name;
                        flag=true;
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
                            leftMenu=childs[j].name;
                            flag=true;
                            break;
                        }
                    } 
                }
            }
            if(flag === true ){
                topMenu=menus[i].name;
            }
        }
        return(
        <Breadcrumb separator="" className="content-title">
            <Breadcrumb.Item>当前位置</Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item>{topMenu}</Breadcrumb.Item>
            {leftMenu===''?'':<Breadcrumb.Separator />}
            <Breadcrumb.Item href="">{leftMenu}</Breadcrumb.Item>
        </Breadcrumb>
       )
    }
}

export default Bread;