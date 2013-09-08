$(function() {

	var map;
	var currX = 39.95086;
	var currY = -75.19298;

	function initialize(x, y) {
	  var mapOptions = {
	    zoom: 16,
	    center: new google.maps.LatLng(x, y),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  map = new google.maps.Map(document.getElementById('map'),
	      mapOptions);
	}

	function reinitialize(x, y) {
		google.maps.event.addDomListener(window, 'load', initialize(x, y));
	}

	reinitialize(currX, currY);

	function shrinkContainer() {
		  $(".container").animate({
		     width:400,
		  }, {
		    duration: 1000,
		  });

		  $(".container").animate({
		  	left:-400,
		  	top:20
		  });
	}

	var markers = [];

	$("#search").bind("keypress", function(evt) {
		$("#search-results").empty();
		while (markers.length > 0) {
			markers.pop().setMap(null);
		}
		if (evt.keyCode && evt.keyCode == 13) {
			var searchVal = $(this).val();
		  	shrinkContainer();

		  	var locations = [];
			for (var i = 0; i < events.length; i++) {
				var obj = events[i];
				var foodArray = obj.food;
				for (var j = 0; j < foodArray.length; j++) {
					if (searchVal == foodArray[j].name) {
						locations.push({'latitude':obj.latitude, 'longitude':obj.longitude,'name':obj.name, 'address':obj.address, 'city':obj.city, 'state':obj.state, 'zipcode':obj.zipcode, 'food':searchVal, 'foodAmt': foodArray[j].generalAmount, 'instructions':obj.instructions});
						break;
					}
				}
			}

			var marker, i;
			var latLang;
			var infowindow = new google.maps.InfoWindow();			

			for(i = 0; i < locations.length; i++) {
				latLang = new google.maps.LatLng(locations[i]['latitude'], locations[i]['longitude']);
				marker = new google.maps.Marker({
					position: latLang,
					map: map,
					title: "test"
				});
			
				markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {

						infowindow.setContent("<b>" + locations[i]['name'] + "</b><br><br><b>Food</b><br>" + locations[i]['food'] + ", " + locations[i]['foodAmt'] + "<br><br><i>" + locations[i]['instructions']);
					  infowindow.open(map, marker);
					}
				  })(marker, i));
			}
			$("#search-results").append(locations.length + ' events found!');
		}
	});

	$("#near-me").on('click', function(evt) {
			$("#search-results").empty();
			while (markers.length > 0) {
				markers.pop().setMap(null);
			}

			shrinkContainer();

			var nearCoords = [];
			for (var i = 0; i < events.length; i++) {
				var obj = events[i];
				if (getDistanceFromLatLonInMiles(currX, currY, obj.latitude, obj.longitude) < 20) {
					nearCoords.push({'latitude':obj.latitude, 'longitude':obj.longitude,'name':obj.name, 'address':obj.address, 'city':obj.city, 'state':obj.state, 'zipcode':obj.zipcode, 'food':obj.food, 'instructions':obj.instructions});
				}
			}

			var marker, i;
			var latLang;
			var infowindow = new google.maps.InfoWindow();			

			for(i = 0; i < nearCoords.length; i++) {
				latLang = new google.maps.LatLng(nearCoords[i]['latitude'], nearCoords[i]['longitude']);
				marker = new google.maps.Marker({
					position: latLang,
					map: map,
					title: "test"
				});
			
				markers.push(marker);
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {

						//sorry about this...
						infowindow.setContent("<b>" + nearCoords[i]['name'] + "</b><br><br><b>Food</b><br>" + nearCoords[i]['food'][0].name + ", " + nearCoords[i]['food'][0].generalAmount + "<br><br><i>" + nearCoords[i]['instructions']);
					  infowindow.open(map, marker);
					}
				  })(marker, i));
			}
			$("#search-results").append(nearCoords.length + ' events near you!');
	});

	$("#search").val($("#search")[0].title);

	$("#search").blur(function() {
		if ($(this).val() == '') {
			$(this).addClass('search-default');
			$(this).val($(this)[0].title);
		}
	});

	$("#search").focus(function() {
		if ($(this).val() == $(this)[0].title) {
			$(this).removeClass('search-default');
			$(this).val('');
		}
	});
});
