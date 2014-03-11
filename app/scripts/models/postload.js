define(function () {
	var postload = {};
	postload.callBack = function (ctx) {
		if (!ctx) {
			ctx = document;
		}

		//body bg for show sth during loading
		$("body").removeClass("g-bs2-bg g-bs3-bg");

		//Enable bs popover
		$("[data-toggle=popover]", ctx).popover();
	}
	return postload;
});

