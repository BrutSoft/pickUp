var app = angular.module('pickUp', ['ui.router', 'gameReqForm', 'games', 'login', 'register', 'pickUpServices'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');

  $stateProvider
    .state('gameReq', {
      url: '/index',
      templateUrl: 'app/partials/gameReq/gameReqForm.html',
      controller: 'TimeSelectController'
    })
    .state('games', {
      url: '/games',
      templateUrl: 'app/partials/games/games.html',
      controller: 'GamesController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/partials/auth/login.html',
      controller: 'loginController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/partials/auth/register.html',
      controller: 'registerController'
    });
});

app.run(function ($rootScope, $location, $state, AuthService, sharedProps) {
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
      if (next.url !== '/register' && AuthService.isLoggedIn() === false) {
        $location.path('/login');
        sharedProps.set('login');
    }
  });
});
