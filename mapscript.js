var map;
var marker = [];
var data = [];
var windows = [];
var currentInfoWindow = null;

function initialize() {
  // Create a simple map.
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 11,
    center: {lat: 43.001698, lng: 141.357699},
    fitBounds: true,
    mapTypeId : google.maps.MapTypeId.ROADMAP
      
  });

  // Load a GeoJSON from the same server as our demo.
  var data_layer1 = new google.maps.Data({map: map});
  var data_layer2 = new google.maps.Data({map: map});
  var data_layer3 = new google.maps.Data({map: map});
  var data_layer4 = new google.maps.Data({map: map});
  var data_layer5 = new google.maps.Data({map: map});
  var data_layer6 = new google.maps.Data({map: map});
  var data_layer7 = new google.maps.Data({map: map});
  var data_layer8 = new google.maps.Data({map: map});
  var data_layer9 = new google.maps.Data({map: map});
  var data_layer10 = new google.maps.Data({map: map});
  data_layer1.loadGeoJson('./sapporo.json');
  data_layer2.loadGeoJson('./east.json');
  data_layer3.loadGeoJson('./west.json');
  data_layer4.loadGeoJson('./south.json');
  data_layer5.loadGeoJson('./north.json');

  data_layer1.setStyle({
    fillColor: 'pink',
    strokeWeight: 2
  });
  data_layer2.setStyle({
    fillColor: 'blue',
    strokeWeight: 2
  });
  data_layer3.setStyle({
    fillColor: 'red',
    strokeWeight: 2
  });
  data_layer4.setStyle({
    fillColor: 'green',
    strokeWeight: 2
  });
  data_layer5.setStyle({
    fillColor: 'cyan',
    strokeWeight: 2
  });


  // put markers
  $.getJSON("./branch.json", function(json){
    for (var i = 0; i <= json.length-1; i++) {
      data.push(
        {
           'name': json[i].name,
           'address': json[i].address,
           'url': json[i].url,
           'lat': json[i].lat,
           'lng': json[i].lng
            
        }
      );
    };

    for (var i = 0; i < data.length; i++) {
      markerLatLng = {lat: data[i]['lat'], lng: data[i]['lng']};
      marker[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map
      });

      windows[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        content: '<div style="width: 220px;"><p>[支店名] ' + data[i]['name'] + '</p>'+
                 '<p>[住所] ' + data[i]['address'] + '</p>' +
                 '<a href="' + data[i]['url'] + '"/>詳しくはこちら</a>'
                 // 吹き出しに表示する内容
      });
      var movePos = new google.maps.LatLng(data[i]['lat'],data[i]['lng']); 
      markerEvent(i,movePos); // マーカーにクリックイベントを追加

    }

  });//jsonの閉じ

}

//マーカーにクリックイベントを追加
function markerEvent(i,movePos) {
  marker[i].addListener('click', function() { // マーカーをクリックし たとき
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }
    windows[i].open(map, marker[i]); // 吹き出しの表示
    currentInfoWindow = windows[i];
    map.panTo(movePos); 
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

