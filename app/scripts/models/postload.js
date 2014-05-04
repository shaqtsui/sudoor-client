define(['ladda/js/ladda'], function (Ladda) {
	var postload = {};
	postload.callBack = function (ctx) {
		if (!ctx) {
			ctx = document;
		}

		//body bg for show sth during loading
		$("body").removeClass("g-bs2-bg g-bs3-bg");

		//Enable bs popover
		$("[data-toggle=popover]", ctx).popover();

		//For pages loaded via ajax enable parsley validate, as parsey 2.0.0 only support normally loaded page auto bind
		$('form[data-parsley-validate]', ctx).each(function(i, o){
			$(o).parsley();
		});
		
		//Add ladda
		Ladda.bind( '.ladda-button' );
	}
	return postload;
});

