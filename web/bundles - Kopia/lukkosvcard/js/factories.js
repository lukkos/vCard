angular.module('vcard')
.factory('FlashFactory', function () {
    return {
        message:'',
        icon: '',
        status: '',
        clear: function() { 
            console.log('clear flash')
            this.message = '';
            this.icon = '';
            this.status = '';
            return 1;
        },
        set: function(flash) {   
            console.log('set flash')
            this.message = flash.message;
            this.icon = flash.icon;
            this.status = flash.status;
        }
    };
});