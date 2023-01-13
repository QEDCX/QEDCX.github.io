
//https://apis.map.qq.com/ws/district/v1/search?key=QZ4BZ-35RKS-ECROB-6FMER-RZ3HS-4PBDP&keyword=520000&get_polygon=2
// https://apis.map.qq.com/ws/district/v1/getchildren?key=QZ4BZ-35RKS-ECROB-6FMER-RZ3HS-4PBDP&id=520000&get_polygon=2&max_offset=1000
const key='QZ4BZ-35RKS-ECROB-6FMER-RZ3HS-4PBDP';
const ipData=`https://apis.map.qq.com/ws/location/v1/ip?key=${key}&output=jsonp&callback=getLocationData`;
const GzData=`https://apis.map.qq.com/ws/district/v1/getchildren?key=${key}&id=520000&get_polygon=2&max_offset=1000&output=jsonp&callback=getAreaData`;

//地址解析：https://apis.map.qq.com/ws/geocoder/v1/?key=QZ4BZ-35RKS-ECROB-6FMER-RZ3HS-4PBDP&address=铜仁梵净山
let map=getMap('container',7.5,'3D');
get(ipData);
setCityNames();
get(GzData);
/*——————————————————————————————————————————————    JSONP请求   ——————————————————————————————————————————————————————————————————————————————*/
function get(src)
{
    let tmp = document.createElement('script');
    tmp.type="text/javascript";
    tmp.src=src;
    document.head.appendChild(tmp);
    document.head.removeChild(tmp);
}

function getLocationData(info)
{
    let result=info.result;
    let lat=result.location.lat;
    let lng=result.location.lng;
    let location=new TMap.LatLng(lat,lng);
    setMarker(map,location);
}
/*
* ip
* location
*       lat
*       lng
* ad_info
*       nation
*       province
*       city
*       district
*       adcode
*/
/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/


/*———————————————————————————————————————————————————   设置点标记   ———————————————————————————————————————————————————————————————————————————————————————————————*/

function setMarker(map,point)
{
    new TMap.MultiMarker({
        map:map,
        geometries:[{position:point,styleId:'style1'}],
        styles:{
            'style1':new TMap.MarkerStyle({color:'#000000',width:27,height:40})
        }
    });
}

/*————————————————————————————————————————————————————   获取地图   ——————————————————————————————————————————————————————————————————————*/
function getMap(id,zoom,view) {
     return new TMap.Map(document.getElementById(id), {
         center:new TMap.LatLng(26.600328,106.705251), //贵州省
         pitch:30,
        zoom:zoom,   //设置地图缩放级别
        viewMode:view,
        baseMap: {			//底图设置（参数为：VectorBaseMap对象）
            type: 'vector',	//类型：失量底图
            features: ['base','point']
        },
         mapStyleId: 'style1',
        //  maxZoom:,
        //  minZoom:
      }
    );
}

/*————————————————————————————————————————————————————   行政区生成   ——————————————————————————————————————————————————————————————————————*/
function getStyle(i)
{
    return 'style'+i;
}
//JSONP回调函数
function getAreaData(res){
    let road=[];
    let paths=[];
    let mutiPoints=[];
    //城市数组
    let cities=res.result[0];
    //遍历城市
    for (let i = 0; i < cities.length; i++)
    {
        //获取城市边界线数组，边界线以点串的数组表示
        let lines=cities[i].polygon;
        //遍历每条边界线
        for (let j = 0; j < lines.length; j++)
        {
            let line=lines[j];
            let points=[];
           // 因为点串的顺序是 经、纬度，函数需要所以反转为 纬、经度
            for (let k=0;k<line.length-1;k+=2)
            {
                    let tmp=line[k];
                    line[k]=line[k+1];
                    line[k+1]=tmp;
                    points.push(new TMap.LatLng(line[k],line[k+1]));
            }
            mutiPoints.push(points);
            // console.log(points);
            // road.push({id:j,paths:tmp1});
        }

        paths.push({path:lines,styleId:getStyle(i%9+1)});
    }
    console.log(mutiPoints);
    //添加区域图层
    setArea(paths,map);
    let mask = new TMap.MaskLayer({map:map,geometries:[{paths:mutiPoints[0]}]});
}

function setArea(paths,map)
{
    let area = new TMap.visualization.Area(
        {
            styles: { //设置区域图样式
            style1: {
                fillColor: 'rgba(255,102,242,0.8)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色,
            },
            style2: {
                fillColor: 'rgba(0,59,70,1)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
            },
            style3: {
                fillColor: 'rgba(56,124,234)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
            },
            style4: {
                fillColor: 'rgba(47,171,49)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
            },
            style5: {
                fillColor: 'rgb(140,31,190)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
            },
            style6: {
                fillColor: 'rgb(143,152,171)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
            },
            style7: {
                fillColor: 'rgba(27,10,213,0.6)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
            },
            style8: {
                fillColor: 'rgba(117,5,234,1)', //设置区域填充色
                strokeColor: '#fc0808' //设置区域边线颜色
            },
            style9: {
                fillColor: 'rgba(2,215,234)', //设置区域填充色
                strokeColor: '#6799EA' //设置区域边线颜色
             }
           }
        }
    ).setData(paths).addTo(map)
}
/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/


/*———————————————————————————————————————————————————   城市名标记   ———————————————————————————————————————————————————————————————————————————————————————————————*/
function setCityNames()
{
    let label=new TMap.MultiLabel({
        map:map,
        geometries:[{
            content:'贵阳',
            position:new TMap.LatLng(26.600328,106.705251)
        }]

    });
}
