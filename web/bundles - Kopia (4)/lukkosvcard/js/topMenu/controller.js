angular.module('vcard')
.controller('topMenuCtrl', function($scope, $rootScope, vCardFactory, FlashFactory,$http, $modal,$timeout, cfpLoadingBar) {
    var debugModePrefix = 'app_dev.php/';   

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: debugModePrefix + 'person/formModal',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          person: function () {
            return null;
          }
        }
      });

      modalInstance.result.then(function (flash) {
        FlashFactory.set(flash);
        $scope.flash = FlashFactory;
        setTimeout(function(){ FlashFactory.clear(); $rootScope.$digest(); },5000);
      }, function () {
          
      });
    };
    
    $scope.openCompanyModal = function (size) {
      var modalInstance = $modal.open({
        templateUrl: debugModePrefix + 'company/formModal',
        controller: 'CompanyModalCtrl',
        size: size,
        resolve: {
          company: function () {
            return null;
          }
        }
      });

      modalInstance.result.then(function (flash) {
        FlashFactory.set(flash);
        $scope.flash = FlashFactory;
        setTimeout(function(){ FlashFactory.clear(); $rootScope.$digest(); },5000);
      }, function () {
          
      });
    };
    
    $scope.openUserModal = function (size) {
      var modalInstance = $modal.open({
        templateUrl: debugModePrefix + 'user/formModal',
        controller: 'UserModalCtrl',
        size: size,
        resolve: {
          user: function () {
            return null;
          }
        }
      });

      modalInstance.result.then(function (flash) {
        FlashFactory.set(flash);
        $scope.flash = FlashFactory;
        setTimeout(function(){ FlashFactory.clear(); $rootScope.$digest(); },5000);
      }, function () {
          
      });
    };
    
})






//angular.module('vcard').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
//
//  $scope.items = items;
//  $scope.selected = {
//    item: $scope.items[0]
//  };
//
//  $scope.ok = function () {
//    $modalInstance.close($scope.selected.item);
//  };
//
//  $scope.cancel = function () {
//    $modalInstance.dismiss('cancel');
//  };
//});