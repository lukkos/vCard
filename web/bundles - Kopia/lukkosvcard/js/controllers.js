//angular.module('vcard')
//.controller('vCardCtrl', function($scope, $rootScope, vCardFactory, FlashFactory,$http, $modal,$timeout, cfpLoadingBar) {
//    var debugModePrefix = 'app_dev.php/';
//    $scope.currentPage = 1;
//    $scope.pageSize    = 5;
//    
//    $scope.vCardList = vCardFactory.getList($scope.currentPage, $scope.pageSize);
//    $scope.flash = FlashFactory;
//    
//    $scope.Pagination = function(params,target) {
//        
//        doPagination = true;
//        
//        switch(target) {
//            case 'prev':
//                target = params.previous;
//                break;
//            case 'next':
//                if(params.current == params.last)
//                {
//                   doPagination = false;
//                   target = params.current;
//                }
//                else
//                {
//                   target = parseInt(params.current) + 1;
//                }
//                break;
//        } 
//
//        if(target == undefined)
//        {
//            $scope.currentPage = 1;
//            doPagination = false;
//        }
//        else
//        {
//            $scope.currentPage =  target;
//        }
//        
//        $scope.pageSize    =  params.numItemsPerPage;
//        if(doPagination)
//           $scope.vCardList = vCardFactory.getList($scope.currentPage, $scope.pageSize);
//    }
//    
//    $scope.open = function(id)
//    {
//        console.log(id);
//        var modalInstance = $modal.open({
//        templateUrl: debugModePrefix + 'person/formModal',
//        controller: 'ModalInstanceCtrl',
//        id: id,
//        resolve: {
//          person: function () {
//            return vCardFactory.get(id);
//          }
//        }
//      });
//
//      modalInstance.result.then(function (flash) {
//        FlashFactory.set(flash);
//        $scope.flash = FlashFactory;
//        setTimeout(function(){ FlashFactory.clear(); $rootScope.$digest(); },5000);
//        $scope.Pagination({numItemsPerPage:$scope.pageSize},$scope.currentPage);
//      }, function () {
//          
//      });
//    }
//    
//    $scope.range = function(min, max){
//        var input = [];
//        for (var i=min; i<=max; i++) input.push(i);
//        return input;
//    };
//})
//
//
//
//
//
//
//angular.module('vcard').controller('ModalInstanceCtrl', function ($scope,Restangular, FlashFactory, $modalInstance, person) {
//
//  if(person)
//  {
//    $scope.lukkos_vcardbundle_person = person;
//    console.log($scope.lukkos_vcardbundle_person)
//  }
//
//  $scope.submit = function (formValues) {
//      var person = Restangular.restangularizeElement(null,formValues,'api/vcards');
//
//         if(undefined == person.id)
//         {
//            person.post().then(function(data) {
//                  $scope.errors = data.errors;
//                  $scope.flash  = data.flash;
//                  if(data.errors.length == 0)
//                     $modalInstance.close($scope.flash);
//                   //console.log($scope.errors);
//                }, function() {
//                 console.log("There was an error saving");
//                });
//          }
//          else
//          {
//            person.put().then(function(data) {
//                  $scope.errors = data.errors;
//                  $scope.flash  = data.flash;
//                  if(data.errors.length == 0)
//                     $modalInstance.close($scope.flash);
//                   //console.log($scope.errors);
//                }, function() {
//                 console.log("There was an error saving");
//                });
//          }
//    //$modalInstance.close($scope.selected.item);
//  };
//
//  $scope.cancel = function () {
//    $modalInstance.dismiss('cancel');
//  };
//  
//  $scope.remove = function (formValues) {
//    var person = Restangular.restangularizeElement(null,formValues,'api/vcards');
//    person.remove().then(function(data){
//            $scope.errors = data.errors;
//            $scope.flash  = data.flash;
//            if(data.errors.length == 0)
//               $modalInstance.close($scope.flash);
//    });
//  };
//});