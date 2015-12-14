/**
 * map.js
 */

// ユーザエージェント判別
var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());

/**
 * 初期化
 */
function initialize() {
    
    // ベースレイヤー
    var baseLayers = createLayers();

    var overViews = createLayers();

    // オーバーレイ
    var overlays = createOverlays();

    // 地図オブジェクト
    var map = L.map('map', {
        layers: [baseLayers['OpenStreetMap']], // 初期レイヤー
        center: [25.04582, 121.513309],     // 中心座標
        zoom: 13,                           // 初期ズーム値
        minZoom: 4,                         // 最小ズーム値
        maxZoom: 18,                        // 最大ズーム値
        crs: L.CRS.EPSG3857                 // 投影法
    });

    // マーカー生成
    createMarkers(map, overlays);

    // コントロール生成
    // スマートフォンまたはタブレットの場合
    if(_ua.Mobile || _ua.Tablet) {

        // ズームボタン
        map.addControl(L.control.zoom());
    }
    // 上記以外
    else {

        // ズームスライダー
        map.addControl(L.control.zoomSlider());

        // マウスポジション
        map.addControl(L.control.mousePosition());
    }

    // ロケール
    map.addControl(L.control.locate());
    
    // ズームラベル
    map.addControl(L.control.zoomLabel());

    // スケールバー
    map.addControl(L.control.scale());

    // レイヤースイッチャー
    map.addControl(L.control.layers(baseLayers, overlays));
}

function createLayers() {

    // GoogleMaps(ロードマップ)
    //var gmp = new L.Google('ROADMAP');

    // GoogleMaps(航空写真 + ロードマップ)
    //var hyb = new L.Google('HYBRID');

    // OpenStreetMap
    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution : '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    });

    // Transport(OpenStreetMap)
    var trs = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
        attribution : '&copy; <a href="http://www.thunderforest.com/maps/" target="_blank">Gravitystorm</a> / <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a>'
    });

    // 国土地理院
    var std = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        attribution: '<a href="http://portal.cyberjapan.jp/help/development.html" target="_blank">国土地理院</a>'
    });

    return {
        //'GoogleMaps': gmp,
        //'GoogleMaps(航空写真)': hyb,
        'OpenStreetMap': osm,
        'Transport': trs
        //'国土地理院': std
    };
}

function createOverlays() {

    // 気圧図
    var cnt = L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure_cntr/{z}/{x}/{y}.png', {
        opacity: 0.8
    });

    // 降水量
    var pre = L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png', {
        opacity: 0.5
    });

    return {
        //'気圧図': cnt,
        '降水量': pre
    };
}

function createMarkers(map, overlays) {

    // 台湾桃園国際機場
    var airport = L.latLng(25.079651, 121.234217);
    var m0 = L.marker(airport).addTo(map).bindPopup('<p>台湾桃園国際機場</p>');

    // ホテル
    var hotel = L.latLng(25.04582, 121.513309);
    L.marker(hotel).addTo(map).bindPopup('<p>GREEN WORLD STATION HOTEL</p>').openPopup();

    // 1日目
     
    // 紅毛城
    var a = L.latLng(25.175309, 121.43295);
    var m1 = L.marker(a).addTo(map).bindPopup('<p>紅毛城</p>');

    // 漁人埠頭
    var b = L.latLng(25.183031, 121.410719);
    var m2 = L.marker(b).addTo(map).bindPopup('<p>漁人埠頭</p>');

    // 淡水老街
    var c = L.latLng(25.169601, 121.44153);
    var m3 = L.marker(c).addTo(map).bindPopup('<p>淡水老街</p>');
    
    // 関渡媽祖宮
    var d = L.latLng(25.118095, 121.462949);
    var m4 = L.marker(d).addTo(map).bindPopup('<p>関渡媽祖宮</p>');

    // 鼎泰豊(SOGO復興店)
    var e = L.latLng(25.041211, 121.543251);
    var m5 = L.marker(e).addTo(map).bindPopup('<p>鼎泰豊(SOGO復興店)</p>');

    // 士林市場
    var f = L.latLng(25.087793, 121.524225);
    var m6 = L.marker(f).addTo(map).bindPopup('<p>士林市場</p>');

    var l1 = L.polyline([airport, a], {color: 'blue'}).addTo(map);
    var l2 = L.polyline([a, b], {color: 'blue'}).addTo(map);
    var l3 = L.polyline([b, c], {color: 'blue'}).addTo(map);
    var l4 = L.polyline([c, d], {color: 'blue'}).addTo(map);
    var l5 = L.polyline([d, e], {color: 'blue'}).addTo(map);
    var l6 = L.polyline([e, f], {color: 'blue'}).addTo(map);
    var l7 = L.polyline([f, hotel], {color: 'blue'}).addTo(map);

    overlays['1日目'] = L.featureGroup([m1, m2, m3, m4, m5, m6, l1, l2, l3, l4, l5, l6, l7]).addTo(map);

    // 2日目
    
    // 故宮博物院
    var g = L.latLng(25.102355, 121.548493);
    var m7 = L.marker(g).addTo(map).bindPopup('<p>故宮博物院</p>'); 

    // 忠烈祠
    var h = L.latLng(25.079151, 121.533075);
    var m8 = L.marker(h).addTo(map).bindPopup('<p>忠烈祠</p>');

    // 大山茶芸教室
    var i = L.latLng(25.066485, 121.533541);
    var m9 = L.marker(i).addTo(map).bindPopup('<p>大山茶芸教室</p>');

    // 台北101
    var j = L.latLng(25.033903, 121.56451);
    var m10 = L.marker(j).addTo(map).bindPopup('<p>台北101</p>');

    // 中正記念堂
    var k = L.latLng(25.034731, 121.521934);
    var m11 = L.marker(k).addTo(map).bindPopup('<p>中正記念堂</p>');

    // 龍山寺
    var l = L.latLng(25.037162, 121.499901);
    var m12 = L.marker(l).addTo(map).bindPopup('<p>龍山寺</p>');

    // 中華民国総統府(車窓見学)
    var m = L.latLng(25.03984, 121.511916);
    var m13 = L.marker(m).addTo(map).bindPopup('<p>中華民国総統府(車窓見学)</p>');

    // 金龍藝品
    var n = L.latLng(25.054675, 121.526824);
    var m14 = L.marker(n).addTo(map).bindPopup('<p>金龍藝品</p>');

    // 梅子餐廳(南京店)
    var o = L.latLng(25.051761, 121.535812);
    var m15 = L.marker(o).addTo(map).bindPopup('<p>梅子餐廳(南京店)</p>');

    var l8 = L.polyline([hotel, g], {color: 'green'}).addTo(map);
    var l9 = L.polyline([g, h], {color: 'green'}).addTo(map);
    var l10 = L.polyline([h, i], {color: 'green'}).addTo(map);
    var l11 = L.polyline([i, j], {color: 'green'}).addTo(map);
    var l12 = L.polyline([j, k], {color: 'green'}).addTo(map);
    var l13 = L.polyline([k, l], {color: 'green'}).addTo(map);
    var l14 = L.polyline([l, m], {color: 'green'}).addTo(map);
    var l15 = L.polyline([m, n], {color: 'green'}).addTo(map);
    var l16 = L.polyline([n, o], {color: 'green'}).addTo(map);
    var l17 = L.polyline([o, hotel], {color: 'green'}).addTo(map);

    overlays['2日目'] = L.featureGroup([m7, m8, m9, m10, m11, m12, m13, m14, m15, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17]).addTo(map);

    // 3日目
    
    // 九份
    var p = L.latLng(25.110106, 121.845181);
    var m16 = L.marker(p).addTo(map).bindPopup('<p>九份</p>');

    // 東楽台菜海鮮餐庁
    var q = L.latLng(25.064999, 121.530533);
    var m17 = L.marker(q).addTo(map).bindPopup('<p>東楽台菜海鮮餐庁</p>');

    // 昇恒昌免税店
    var r = L.latLng(25.062095, 121.543123);
    var m18 = L.marker(r).addTo(map).bindPopup('<p>昇恒昌免税店</p>');

    var l18 = L.polyline([hotel, p], {color: 'red'}).addTo(map);
    var l19 = L.polyline([p, q], {color: 'red'}).addTo(map);
    var l20 = L.polyline([q, r], {color: 'red'}).addTo(map);
    var l21 = L.polyline([r, airport], {color: 'red'}).addTo(map);

    overlays['3日目'] = L.featureGroup([m16, m17, m18, l18, l19, l20, l21]).addTo(map);
}