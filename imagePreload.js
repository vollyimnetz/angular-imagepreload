angular.module('totalmedial.imagePreload',[])

.factory('imagePreload', ['$q', function($q) {
	return function(url) {
		var deffered = $q.defer();
		var image = new Image();

		image.src = url;

		if (image.complete) {
			deffered.resolve();
		} else {
			
			image.addEventListener('load', function() {
				deffered.resolve();
			});
			
			image.addEventListener('error', function() {
				deffered.reject();
			});
		}

		return deffered.promise;
	};
}])

/**
 * <imagepreload url="IMAGE_URL" loadcomplete="doSomething()" addparentclass="optionalCssClass"></imagepreload>
 */
.directive('imagepreload', ['imagePreload',function(imagePreload) {
	return {
		restrict: 'E',
		scope : {
			url : '@',
			loadcomplete : '&',
			addparentclass : '@'
		},
		link: function(scope, element, attrs) {
			var base = element[0];
			imagePreload(scope.url).then(function(){
				if(scope.loadcomplete) {
					scope.loadcomplete();
				}
				if(scope.addparentclass && scope.addparentclass.length>0 && base.parentNode) {
					base.parentNode.className+= ' '+scope.addparentclass;
				}
			});
		}
	};
}])

/**
 * Use this on img ng-src elements, i.e.:
 * <img ng-src="{{my_image_url}}" ngsrcpreload="doSomething()" />
 */
.directive('ngsrcpreload',[ 'imagePreload', function(imagePreload) {
	return {
		restrict : 'A',
		scope : {
			url: '@ngSrc',
			loadcomplete : '&ngsrcpreload'
		},
		link: function(scope, element, attrs) {
			scope.$watch('url', function() {
				imagePreload(scope.url).then(function(){
					scope.loadcomplete();
				});
			});
		}
	};
}])

/**
 * Use this on img src elements, i.e.:
 * <img src="IMAGE_URL" srcpreload="doSomething()" />
 */
.directive('srcpreload',[ 'imagePreload', function(imagePreload) {
	return {
		restrict : 'A',
		scope : {
			url: '@src',
			loadcomplete : '&srcpreload'
		},
		link: function(scope, element, attrs) {

			imagePreload(scope.url).then(function(){
				scope.loadcomplete();
			});
		}
	};
}]);
