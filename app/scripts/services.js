'use strict';
var routerApp = angular.module('routerApp').constant("baseURL","http://localhost:3000/");

//define a service called foodFactory 
routerApp.service('foodFactory', ['$resource', 'baseURL', function($resource,baseURL) {
  
  //implement the function called getFoods
    this.getFoods = function(){
        return $resource(baseURL+"foods/:id", null, {'update':{method:'PUT' }} );
    };
}])

//define a service called photoFactory 
.service('photoFactory', ['$resource', 'baseURL',function($resource,baseURL) {

  // implement the function called getPhotos()
   
    this.getPhotos = function () {
        return $resource(baseURL+"photos/:id", null, {'update':{method:'PUT' }} );
    };
}])

.service('commentFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	this.getComments= function() {
		return $resource(baseURL + "usercomments/:id", null, {
			'save': {
				method: 'POST'
			},
            'delete': { 
                method: 'DELETE', params: {id: '@id'} },
            'update': {
				method: 'PUT'
			}
		});
	};
}])
 

;