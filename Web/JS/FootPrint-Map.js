


var map = new AMap.Map('container', {
    viewMode: '15', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
    zoom:14, //初始化地图层级
    layers: [//使用多个图层

    ],
    // center: [116.397428, 39.90923] //初始化地图中心点
});


AMap.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量
        offset: [10, 20],
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        position: 'RB'
    })

    geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
            onComplete(result)
        }else{
            onError(result)
        }
    });

    function onComplete (data) {
         // map.center=data.position;
         console.log(data)
    }

    function onError (data) {
        // 定位出错
    }
})
// map.center=[]