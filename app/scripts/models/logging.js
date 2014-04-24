define([ 'sudoor-client/app/scripts/vendor/log4javascript/log4javascript' ], function() {
	//Can enable logging via script injection
	log4javascript.setEnabled(false);
	
	// Create the logger
	var log = log4javascript.getLogger();

	// Create a PopUpAppender with default options
	var popUpAppender = new log4javascript.PopUpAppender();
	// Change the desired configuration options
	popUpAppender.setFocusPopUp(true);
	popUpAppender.setNewestMessageAtTop(true);
	// Add the appender to the logger
	log.addAppender(popUpAppender);

	var browserConsoleAppender = new log4javascript.BrowserConsoleAppender();
	log.addAppender(browserConsoleAppender);
	
	
	return log;
});