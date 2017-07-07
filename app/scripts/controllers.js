'use strict';
var routerApp = angular.module('routerApp');
routerApp.controller('IndexController',  ['$scope',  'commentFactory', function($scope,  commentFactory) {
    //open panels
    $scope.toggle = function(num) {
        if (num === 1) {
            $scope.toggleVar1 = !$scope.toggleVar1;
        } else {
            $scope.toggleVar2 = !$scope.toggleVar2;
        }
    };
    //enter and submit user comments
    $scope.showComments = false;
    $scope.message = "Loading ..."
    $scope.usercomments = commentFactory.getComments().query(
        function(response) {
            $scope.usercomments = response;
            $scope.showComments = true;
        },
        function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    }
    
    );
    $scope.enter_comment = false;
    $scope.input = {
        name: "",
        comment: "",
        date: new Date().toISOString()
    };

    $scope.submitComment = function() {
        if (!$scope.input.comment || !$scope.input.name) {
            $scope.enter_comment = true;
        } 
        else {
            $scope.enter_comment = false;
            commentFactory.getComments().save($scope.input);
            $scope.usercomments = commentFactory.getComments().query();
            $scope.input = {
                name: "",
                comment: "",
                date: new Date().toISOString()
            };
        }
    };
    
          //remove individual comments
          $scope.remove = function(id) {
              commentFactory.getComments().remove(id);
              $scope.usercomments = commentFactory.getComments().query();
          };

        }])

.controller('FoodController', ['$scope', 'foodFactory', function($scope, foodFactory) {
    
    //create a menu
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showFoods = false;
    $scope.message = "Loading ...";
    $scope.foods = foodFactory.getFoods().query(
        function(response) {
            $scope.foods = response;
            $scope.showFoods = true;
        },
        function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    }
    );
    
  //menu selections
  $scope.select = function(setTab) {
    $scope.tab = setTab;
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "main";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };
}])

.controller('PhotoController', ['$scope', 'photoFactory', function($scope, photoFactory) {
    var length = 5; 
    //create a photo slideshow
    $scope.showPhotos = false;
    $scope.message = "Loading ...";
    var current_index = 0;
    $scope.photo = photoFactory.getPhotos().get({id: current_index}).$promise.then(function(response) {
		$scope.photo = response;
		$scope.showPhotos = true;
	}, function(response) {
		$scope.message = "Error: " + response.status + " " + response.statusText;
	});

  //next button
  $scope.next = function(){
      var next_index = current_index + 1;
      if (current_index < length - 1) {
          $scope.photo = photoFactory.getPhotos().get({id: next_index});
          current_index++;
      }
  };

  //previous button
  $scope.previous = function() {
      var previous_index = current_index - 1;
      if (current_index > 0) { 
          $scope.photo = photoFactory.getPhotos().get({id: previous_index});
          current_index--;
      }
  };
}]);