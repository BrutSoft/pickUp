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

  // getLocation() is now deprecated on non secure origins
  // https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only
  getLocation: function() {
	  return new Promise(function(resolve, reject) {
      $.getJSON('https://ipinfo.io/geo', resolve);
    });
  },
};

})(window);
