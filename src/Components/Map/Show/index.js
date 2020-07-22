import React, { Component } from 'react';
class MapShow extends Component {
    componentDidMount () {
        const {longitude, latitude} = this.props
        this.showMap(longitude, latitude);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.longitude !== nextProps.longitude){
            this.showMap(nextProps.longitude, nextProps.latitude);
        }
    }

    showMap =(longitude,latitude)=>{
        var map = new window.BMap.Map("allmap");
            var point = new window.BMap.Point(longitude, latitude);
            map.centerAndZoom(point, 14);
            var marker = new window.BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            var opts = {
                width : 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title : "客户地址" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
                message:"客户地址"
                }
                var infoWindow = new window.BMap.InfoWindow("客户地址在此处", opts);  // 创建信息窗口对象 
                marker.addEventListener("click", function(){          
                    map.openInfoWindow(infoWindow,point); //开启信息窗口
                });
            map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT}));        
            map.addControl(new window.BMap.NavigationControl());     
            map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL}));
            map.enableScrollWheelZoom();
            map.enableContinuousZoom();
    }

    render() {  
        return(
            <div>
                <div  id='allmap' style={{width:'100%',height:'200px'}}></div>
            </div>
        )}
}

export default MapShow;