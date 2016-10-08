var timeSlots = _.range(17, 23).map(function (hour) {
  return {
    id: hour.toString(),
    hour: hour,
    name: moment(hour, 'hh').format('h:mma')
  };
});

angular.module('gameReqForm', ['pickUp.services'])
.controller('TimeSelectController', function($scope, $location, GameReq, sharedProps) {
    var gameReq = {};

    $scope.getLocation = function() {
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
    };

    $scope.requestGame = function() {
      console.log('requesting Game');
      $scope.getLocation()
      .then(function(location) {
        
        gameReq.time = helpers.createGameTime($scope.data.selectedOption.hour);
        gameReq.smsNum = $scope.smsNum;
        gameReq.sport = $scope.sportInput;
        gameReq.location = location;

        console.log(gameReq);

        GameReq.requestGame(gameReq)
          .then(function (game) {
            sharedProps.set(game);
            $location.path('/games');
          })
          .catch(function (error) {
            console.error('error requesting game ', error);
          });
      });
    };


    $scope.data = {
      model: null,
      availableOptions: timeSlots,
      selectedOption: timeSlots[0]
    };
  });
