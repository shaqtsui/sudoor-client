define([ 'extendFunction', './logging', 'angular/angular' ], function(extendFunction, log) {
	angular.module('angular-requirejs', []).run(function($rootScope) {

		// Extend Function to call $rootScope.$apply() after it be executed
		// Since each time the callback is a new function, so can not do cache
		var extendFuncInvokeApply = (function() {
			return function(func) {
					var eFunc = extendFunction(func, function(a, b, c) {
						var res = b.apply(this, a);
					$rootScope.$apply();
						return res;
					});
					log.debug('Extend Func: [' + func + '] to Invoke Apply');
				return eFunc;
			};
		})();

		// Extend require to call enhanced callback
		require = extendFunction(require, function(args, originalFunction, dontCallOriginal) {
			var dep = args[0];
			var sCB = args[1];
			var fCB = args[2];

			if (sCB) {
				var eSCB = extendFuncInvokeApply(sCB);
			}
			if (fCB) {
				var eFCB = extendFuncInvokeApply(fCB);
			}

			var result = originalFunction.call(this, dep, eSCB, eFCB);
			return result;
		});

		log.debug('Extended require to call enhanced callback');
	});
});