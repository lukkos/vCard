angular.module('vcard', ['ngRoute','restangular','ui.bootstrap','dialogs','chieffancypants.loadingBar', 'ngAnimate'])
  .config(function($routeProvider,RestangularProvider,$httpProvider) {
        var debugModePrefix = 'app_dev.php/';
        RestangularProvider.setBaseUrl(debugModePrefix);
        $routeProvider.
                when('/', {templateUrl: debugModePrefix + 'listTemplate', controller: 'vCardCtrl'}).
                when('/companies', {templateUrl: debugModePrefix + 'companiesListTemplate', controller: 'CompanyCtrl'})
                //when('/profile', {templateUrl: debugModePrefix + 'profile/edit', controller: 'EditProfileCtrl'}).
                //when('/vcard', {templateUrl: debugModePrefix + 'vcard/listTemplate', controller: 'vCardCtrl'}).
                //otherwise({redirectTo: '/'});
        
        //$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        
   })
  .config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  });