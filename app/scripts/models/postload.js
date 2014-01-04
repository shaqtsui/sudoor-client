define(function () {
	var postload = {};
	postload.callBack = function (ctx) {
		if (!ctx) {
			ctx = document;
		}

		//body bg for show sth during loading
		$("body").removeClass("g-bs2-bg g-bs3-bg");
		//Enable parsley validate
		$('form[parsley-validate]', ctx).each(function(i, o){
			$(o).parsley();
		});
		//Enable bs popover
		$("[data-toggle=popover]", ctx).popover();
		//JQM page
		$("[data-role=page]", ctx).page();
		$("[data-role=page]", ctx).first().addClass("ui-page-active");
		$("[data-role=panel]", ctx).on('panelbeforeopen', function () {
			$('body').addClass("modal-open");
		});
		$("[data-role=panel]", ctx).on('panelbeforeclose', function () {
			$('body').removeClass("modal-open");
		});
	}
	return postload;
});

