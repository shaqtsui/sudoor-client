define([ 'jquery' ], function($) {

	window.ParsleyExtend = {
		asyncValidators : {
			rest : {
			    fn : function(xhr) {
				    return 204 === xhr.status;
			    },
			    url : 'http://mycustomapiurl.ext'
			}
		}
	};
});
