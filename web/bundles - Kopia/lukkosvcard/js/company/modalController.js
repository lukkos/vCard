angular.module('vcard').controller('CompanyModalCtrl', function ($scope,Restangular, FlashFactory, $modalInstance, company) {

  if(company)
  {
    $scope.lukkos_vcardbundle_company = company;
    console.log($scope.lukkos_vcardbundle_company)
  }

  $scope.submit = function (formValues) {
      var company = Restangular.restangularizeElement(null,formValues,'api/companies');

         if(undefined == company.id)
         {
            company.post().then(function(data) {
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
            company.put().then(function(data) {
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
    var company = Restangular.restangularizeElement(null,formValues,'api/companies');
    company.remove().then(function(data){
            $scope.errors = data.errors;
            $scope.flash  = data.flash;
            if(data.errors.length == 0)
               $modalInstance.close($scope.flash);
    });
  };
});