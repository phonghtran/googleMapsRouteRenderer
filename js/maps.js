/* ---------------------------------
	map load

	// https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints
--------------------------------- */
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var route, routeCurrentPosition = 0, routeLine = null;


var styleArray = [
  {
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.local",
    "stylers": [
      { "visibility": "simplified" },
      { "saturation": 1 },
      { "color": "#b1b1b1" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      
      { "visibility": "off" } 
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#82c7e4" }
    ]
  }
];

var goldStar = {
  path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  fillColor: "yellow",
  fillOpacity: 0.8,
  scale: .1,
  strokeColor: "gold",
  strokeWeight: 1
};

var lineSymbol = {
	path: google.maps.SymbolPath.CIRCLE,
	scale: 8,
	strokeColor: '#fc7f2f'
};

var monoLady = {
		url: 'img/mapMarker.png',
		scaledSize: new google.maps.Size(22, 39)
	}

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer({
	  	polylineOptions : {
							strokeOpacity: 0
					  	},
		markerOptions : {
							icon: monoLady
						}
	  });
  
  var msp = new google.maps.LatLng(44.88, 93.22);
  var mapOptions = {
    zoom: 6,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: msp,
    disableDefaultUI: true,
    styles: styleArray
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);

  calcRoute();
}

function calcRoute() {
  var start = 'Roy Wilkins Auditorium,';
  var end = 'Alary\'s Bar, 7th Street East, Saint Paul, MN';
  var waypts = [];

  waypts.push({
          location:'36 West 7th Street, St Paul, MN 55102',
          stopover:true
     });
  

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      route = response.routes[0];

      
  		
  		drawLines();
  		
    }
  });
}

function moveMarker(){
	
	if (routeLine){

		routeCurrentPosition = (routeCurrentPosition + 1) % 200;

		var icons = routeLine.get('icons');
		icons[0].offset = (routeCurrentPosition / 2) + '%';
		routeLine.set('icons', icons);
	}
};


function drawLines(){
	var routeLineCoors = [];
 
	for (x in route.overview_path){
		routeLineCoors.push(route.overview_path[x]);
	};

	routeLine = new google.maps.Polyline({
		path: routeLineCoors,
		strokeColor: "#0093d0",
		strokeOpacity: 1.0,
		strokeWeight: 4,
		icons: [{
	      icon: lineSymbol,
	      offset: '100%'
	    }],
	});

	routeLine.setMap(map);
	setInterval('moveMarker()', 20);
}


if (location.hostname != 'localhost') google.maps.event.addDomListener(window, 'load', initialize);
