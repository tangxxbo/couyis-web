import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import '../../Config/config'

class Home extends React.Component {
    initUi = () =>{
        const menus = global.constants.menus;
        
        return menus.map((menu, index)=>(      
            <span>
            {(menu.childs.length>=1 || menu.public===true)?      
            <div className={menu.public==true?"home-main-col home-main-col-pub":"home-main-col"}  key={index} >
                <div className="top-title">
                    <div className={menu.className +" " +" top-title-img"}></div>
                    <Link className="top-title-link" to={menu.url}>{menu.name}</Link>
                </div>
                <div className="left-title">
                    {this.initLeftMenu(menu.childs)}                        
                </div>
            </div>:''}
            </span>     
        ))
    }

    initLeftMenu = (menus) =>{
        if(menus!==undefined){
            return menus.map((leftMenu,i)=>(
                <Link className="left-title-link" key={i} to={leftMenu.url}>{leftMenu.name}</Link>
            ))
        }        
    }

    render() {
        return (
            <div className="home-main">
                {this.initUi()}            
            </div>
        )}
}
export default Home;