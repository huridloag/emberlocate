App = Ember.Application.create();

App.Router.map(function() {
	this.resource('city',{path:'/'});
})

// CLASS: CityLocation

App.CityLocation = Ember.Object.extend({
	longitude: 0,
	latitude: 0,
	init: function() {
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			self.set('latitude',lat);
			self.set('longitude',long);
			//console.log(position);
		},function(err) {
			if (err.code == 1) {
				// Permission denied
			} else if (err.code == 2) {
				// Position unavailable
			} else if (err.code == 3) {
				// Timeout
			}
		});
	},
	getCity: function() {
		return this.longitude;
	}
});

var currentLocation = App.CityLocation.create();
var currentCity = currentLocation.getCity(); 

App.CityRoute = Ember.Route.extend({
	model: function() {
		return city_object;
	}
});

var city_object = {
	location: currentLocation,
	city: currentCity
};