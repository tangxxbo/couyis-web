import React, { Component } from 'react';
class MapSelect extends Component {
    componentDidMount () {
        const {longitude,latitude,area,edit} = this.props;
        var map = new window.BMap.Map("allmap");
        var point = new window.BMap.Point(longitude, latitude);
        if(edit==true){
            map.centerAndZoom(point, 14);
            var marker = new window.BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            var opts = {
                width : 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title : "客户地址" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
                message:"客户地址标识"
              }
              var infoWindow = new window.BMap.InfoWindow("客户地址标识", opts);  // 创建信息窗口对象 
              marker.addEventListener("click", function(){          
                  map.openInfoWindow(infoWindow,point); //开启信息窗口
              });
        }else{
            map.centerAndZoom(area,14);
        }
        map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT}));        
		map.addControl(new window.BMap.NavigationControl());     
        map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL}));
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
        map.addEventListener("dblclick", this.handClickMap);
    }

    handClickMap =(e) =>{
        const {handMapPoint} = this.props;
        handMapPoint(e.point.lng,e.point.lat)
    }

    render() {  
        return(
            <div>
                <div  id='allmap' style={{width:'100%',height:'400px'}}></div>
            </div>
        )}
}

export default MapSelect;