angular.module('vcard')
.factory('CompanyFactory',['Restangular', function(Restangular){
    
    return {
      getList: function (page,pageSize) {
        console.log('CompanyFactory get company list');
        return Restangular.all("api/companies").getList({page: page, pageSize: pageSize}).$object;
      },
      get: function(id) { 
        console.log('CompanyFactory get company');
        person = Restangular.one('api/companies',id);
        return person.get();
      }
    };
    
}]);