define([ './logging' ], function(log) {
	// onResourceLoad implement
	var onResourceLoad = function(context, map, depArray) {
		log.debug('loaded: ' + map.name + ' at ' + map.url);
	};
	return onResourceLoad;
});