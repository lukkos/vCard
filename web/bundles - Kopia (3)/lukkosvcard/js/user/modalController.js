angular.module('vcard').controller('UserModalCtrl', function ($scope,Restangular, FlashFactory, $modalInstance, user) {

  if(user)
  {
    $scope.lukkos_userbundle_user = user;
    console.log($scope.lukkos_vcardbundle_user)
  }

  $scope.submit = function (formValues) {
      var user = Restangular.restangularizeElement(null,formValues,'api/users');

         if(undefined == user.id)
         {
            user.post().then(function(data) {
                  $scope.errors = data.errors;
                  $scope.flash  = data.flash;
                  if(data.errors.length == 0)
                     $modalInstance.close($scope.flash);
                   //console.log($scope.errors);
                }, function() {
                 console.log("There was an error saving");
                });
          }
          else
          {
            user.put().then(function(data) {
                  $scope.errors = data.errors;
                  $scope.flash  = data.flash;
                  if(data.errors.length == 0)
                     $modalInstance.close($scope.flash);
                   //console.log($scope.errors);
                }, function() {
                 console.log("There was an error saving");
                });
          }
    //$modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
  $scope.remove = function (formValues) {
    var user = Restangular.restangularizeElement(null,formValues,'api/users');
    user.remove().then(function(data){
            $scope.errors = data.errors;
            $scope.flash  = data.flash;
            if(data.errors.length == 0)
               $modalInstance.close($scope.flash);
    });
  };
});