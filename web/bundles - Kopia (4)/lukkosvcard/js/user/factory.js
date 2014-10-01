angular.module('vcard')
.factory('UserFactory',['Restangular', function(Restangular){
    
    return {
      getList: function (page,pageSize) {
        console.log('UserFactory get user list');
        return Restangular.all("api/users").getList({page: page, pageSize: pageSize}).$object;
      },
      get: function(id) { 
        console.log('UserFactory get user');
        person = Restangular.one('api/users',id);
        return person.get();
      }
    };
    
}]);