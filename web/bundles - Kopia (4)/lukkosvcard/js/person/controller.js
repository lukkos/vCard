angular.module('vcard')
.controller('vCardCtrl', function($scope, $rootScope, vCardFactory, FlashFactory,$http, $modal,$timeout, cfpLoadingBar) {
    var debugModePrefix = 'app_dev.php/';
    $scope.currentPage = 1;
    $scope.pageSize    = 5;
    
    $scope.vCardList = vCardFactory.getList($scope.currentPage, $scope.pageSize);
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
           $scope.vCardList = vCardFactory.getList($scope.currentPage, $scope.pageSize);
    }
    
    $scope.open = function(id)
    {
        console.log(id);
        var modalInstance = $modal.open({
        templateUrl: debugModePrefix + 'person/formModal',
        controller: 'ModalInstanceCtrl',
        id: id,
        resolve: {
          person: function () {
            return vCardFactory.get(id);
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