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
		     width:300,
		  }, {
		    duration: 1000,
		  });

		  $(".container").animate({
		  	left:-400,
		  	top:20
		  });
	}

	$("#search").bind("keypress", function(evt) {
		if (evt.keyCode && evt.keyCode == 13) {
			// reinitialize(38.9963192, -76.933629);

		  shrinkContainer();

			$.get("/api/events", {latitude:currX, longitude:currY}, function(data) {
				alert(data + ' get success');
			}).done(function() {
				alert('second success');
			}).fail(function() {
				alert('error :(');
			}).always(function() {
				alert('finished');
			});
		}
	});

	$("#near-me").on('click', function(evt) {
			shrinkContainer();

			$.get("/api/events", {latitude:currX, longitude:currY}, function(data) {
				alert(data + ' get success');
			}).done(function() {
				alert('second success');
			}).fail(function() {
				alert('error :(');
			}).always(function() {
				alert('finished');
			});
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