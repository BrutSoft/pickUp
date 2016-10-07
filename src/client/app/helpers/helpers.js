(function(window) {

window.helpers = {
  createGameTime: function (reqTime) {
    // works for TODAY
    var gameTime = new Date(
      moment().get('year'),
      moment().get('month'),
      moment().get('date'),
      parseInt(reqTime)
    );
    return gameTime;
  },

  getLocation: function() {
	  return new Promise(function(resolve, reject) {
		  navigator.geolocation.getCurrentPosition(function(position) {

        var coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        resolve(coordinates);

      }, function(error) {
        reject(error);
      }, {
        // options
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    });
  },

};

})(window);
