define([ 'jquery', 'parsley' ], function($) {

	window.ParsleyValidator.addValidator('remote2', function(val, url, self) {
		$.emit('parsley:field:validate', this);
		var that = this;

		var deferred = $.Deferred();

		$.ajax({
		    url : url + '/' + val,
		    type : 'GET',
		    success : function(data, textStatus, jqXHR) {
			    if (jqXHR.status == 204) {
				    deferred.resolveWith(this);
				    $.emit('parsley:field:success', that);
				    $.emit('parsley:field:validated', that);

			    } else {
				    deferred.rejectWith(this);
				    $.emit('parsley:field:error', that);
				    $.emit('parsley:field:validated', that);
			    }
		    },
		    error : function(jqXHR, textStatus, errorThrown) {
			    deferred.rejectWith(this);
			    $.emit('parsley:field:error', that);
			    $.emit('parsley:field:validated', that);
		    }
		});

		return true;
	}, -1).addMessage('en', 'remote2', 'User name already registed');

	return window.ParsleyValidator;
});
