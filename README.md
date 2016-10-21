# angular-imagepreload
Simple Angular directive for image preloading. You can pass a custom function to do what ever you want when the image is loaded.

## Install

	bower install https://github.com/vollyimnetz/angular-imagepreload.git --save
	
or

	npm install https://github.com/vollyimnetz/angular-imagepreload.git --save


## How to use
Add module to your app.

	angular.module('myApp',[
		...
		'totalmedial.imagePreload',
		...
	])

There are 4 ways to use the functionality.

### 1. Directive on a dynamic image with ng-src-attribute
You have a dynamic image and want to call a function once it is completely loaded.

Use the `ngsrcpreload` attribute.
	
	<img ng-src="{{my_image_url}}" ngsrcpreload="doSomething()" />
	<img ng-src="./my_base_path/{{my_image_name}}" ngsrcpreload="doSomething('since it is your own function you can pass parameters as you want')" />
	<img ng-src="./my_base_path/{{my_image_name}}" ngsrcpreload="doSomething('.fancyCssClass')" />

### 2. Directive on static images with src-attribute
You have a normal image and want to call a function once it is completely loaded.

Use the `srcpreload` attribute.

	<img src="IMAGE_URL" srcpreload="doSomething()" />

### 3. Generic directive
This directive is ideal if you want to use preloading on a static background-image.

	<imagepreload url="IMAGE_URL" loadcomplete="doSomething()"></imagepreload>

### 4. Call a function
You do not want to use a directive? Fine, use the function directly.

	app.controller('MyControler',function(imagePreload) {
		imagePreload('myFancyImage.jpg').then(function(){
			console.log('Image should be loaded completely.');
		});
	})
