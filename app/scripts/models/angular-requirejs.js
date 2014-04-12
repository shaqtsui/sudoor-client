define([ 'extendFunction', './logging', 'angular/angular' ], function(extendFunction, log) {
	angular.module('angular-requirejs', []).run(function($rootScope) {
		// Extend require to call enhanced callback
		extendFunction('require', function(args, originalFunction, dontCallOriginal) {
			// Extend callback to call $rootScope.$apply() after it be executed
			var dep = args[0];
			if (args.length == 2) {
				var reqCB = args[1];
				var eReqCB = extendFunction(reqCB, function(a, b, c) {
					b.apply(null, a)
					$rootScope.$apply();
				});
				log.debug('Callback for: [' + dep + '] extended to call $rootScope.$apply()');
			}
			originalFunction.call(window, dep, eReqCB);
		});

		log.debug('Extended require to call enhanced callback');
	});
});