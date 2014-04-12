define([ 'infra-client/app/scripts/vendor/log4javascript/log4javascript' ], function() {
	// Create the logger
	var log = log4javascript.getLogger();

	// Create a PopUpAppender with default options
	var popUpAppender = new log4javascript.PopUpAppender();

	// Change the desired configuration options
	popUpAppender.setFocusPopUp(true);
	popUpAppender.setNewestMessageAtTop(true);

	// Add the appender to the logger
	log.addAppender(popUpAppender);

	return log;
});