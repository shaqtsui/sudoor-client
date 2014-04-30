define([ 'jquery', 'parsley' ], function($) {

	window.ParsleyValidator.addValidator('remote2', function(val, url, self) {

		var deferred = $.Deferred();

		$.ajax({
		    url : url + '/' + val,
		    type : 'GET',
		    success : function(data, textStatus, jqXHR) {
			    if (jqXHR.status == 204) {
				    deferred.resolveWith(this);
			    } else {
				    deferred.rejectWith(this);
			    }
		    },
		    error : function(jqXHR, textStatus, errorThrown) {
			    deferred.rejectWith(this);
		    }
		});

		return deferred.promise();
	}, 64).addMessage('en', 'remote2', 'User name already registed');

	return window.ParsleyValidator;
});
