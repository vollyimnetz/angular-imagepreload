angular.module('totalmedial.imagePreload',[])

.factory('imagePreload', function($q) {
	return function(url) {
		var deffered = $q.defer(),
		image = new Image();

		image.src = url;

		if (image.complete) {
			deffered.resolve();
		} else {
			
			image.addEventListener('load', function() {
				console.log('load complete');
				deffered.resolve();
			});
			
			image.addEventListener('error', function() {
				deffered.reject();
			});
		}

		return deffered.promise;
	}
})

/**
 * <imagepreload url="IMAGE_URL" loadcomplete="doSomething()"></imagepreload>
 */
.directive('imagepreload', function(imagePreload) {
	return {
		restrict: 'E',
		scope : {
			url : '@',
			loadcomplete : '&'
		},
		link: function(scope, element, attrs) {
			element.hide();
			
			imagePreload(scope.url).then(function(){
				scope.loadcomplete();
			});
		}
	};
});
