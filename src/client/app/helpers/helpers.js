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
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
	  return new Promise(function(resolve, reject) {
		  navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  },
};

})(window);
