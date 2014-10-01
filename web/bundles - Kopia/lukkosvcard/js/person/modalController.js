angular.module('vcard').controller('ModalInstanceCtrl', function ($scope,Restangular, FlashFactory, $modalInstance, person) {

  if(person)
  {
    $scope.lukkos_vcardbundle_person = person;
    console.log($scope.lukkos_vcardbundle_person)
  }

  $scope.submit = function (formValues) {
      var person = Restangular.restangularizeElement(null,formValues,'api/vcards');

         if(undefined == person.id)
         {
            person.post().then(function(data) {
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
            person.put().then(function(data) {
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
    var person = Restangular.restangularizeElement(null,formValues,'api/vcards');
    person.remove().then(function(data){
            $scope.errors = data.errors;
            $scope.flash  = data.flash;
            if(data.errors.length == 0)
               $modalInstance.close($scope.flash);
    });
  };
});