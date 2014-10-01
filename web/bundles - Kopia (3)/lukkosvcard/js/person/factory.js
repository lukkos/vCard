angular.module('vcard')
.factory('vCardFactory',['Restangular', function(Restangular){
    
    return {
      getList: function (page,pageSize) {
        console.log('vCardFactory get vCards list');
        return Restangular.all("api/vcards").getList({page: page, pageSize: pageSize}).$object;
      },
      get: function(id) { 
        console.log('vCardFactory get vCard');
        person = Restangular.one('api/vcards',id);
        return person.get();
      }
    };
    
}])