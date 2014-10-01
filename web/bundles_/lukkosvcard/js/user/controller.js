angular.module('vcard')
.controller('UserCtrl', function($scope, $rootScope, UserFactory, FlashFactory,$http, $modal,$timeout, cfpLoadingBar) {
    var debugModePrefix = 'app_dev.php/';
    $scope.currentPage = 1;
    $scope.pageSize    = 5;
    
    $scope.UsersList = UserFactory.getList($scope.currentPage, $scope.pageSize);
    $scope.flash = FlashFactory;
    
    $scope.Pagination = function(params,target) {
        
        doPagination = true;
        
        switch(target) {
            case 'prev':
                target = params.previous;
                break;
            case 'next':
                if(params.current == params.last)
                {
                   doPagination = false;
                   target = params.current;
                }
                else
                {
                   target = parseInt(params.current) + 1;
                }
                break;
        } 

        if(target == undefined)
        {
            $scope.currentPage = 1;
            doPagination = false;
        }
        else
        {
            $scope.currentPage =  target;
        }
        
        $scope.pageSize    =  params.numItemsPerPage;
        if(doPagination)
           $scope.UsersList = UserFactory.getList($scope.currentPage, $scope.pageSize);
    }
    
    $scope.open = function(id)
    {
        console.log(id);
        var modalInstance = $modal.open({
        templateUrl: debugModePrefix + 'user/formModal',
        controller: 'UserModalCtrl',
        id: id,
        resolve: {
          user: function () {
            return UserFactory.get(id);
          }
        }
      });

      modalInstance.result.then(function (flash) {
        FlashFactory.set(flash);
        $scope.flash = FlashFactory;
        setTimeout(function(){ FlashFactory.clear(); $rootScope.$digest(); },5000);
        $scope.Pagination({numItemsPerPage:$scope.pageSize},$scope.currentPage);
      }, function () {
          
      });
    }
    
    $scope.range = function(min, max){
        var input = [];
        for (var i=min; i<=max; i++) input.push(i);
        return input;
    };
})