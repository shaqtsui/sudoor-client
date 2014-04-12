define([ 'extendFunction', 'angular/angular' ], function(extendFunction) {
	angular.module('angular-requirejs', [])

	.run(function($rootScope) {
		extendFunction(require.onResourceLoad, function() {
			console.log('Extend onResourceLoad');
			$rootScope.$apply();
		});
	});
});