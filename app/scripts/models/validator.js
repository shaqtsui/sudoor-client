define(['jquery', 'validator'], function ($) {
	window.ParsleyConfig = window.ParsleyConfig || {};
	window.ParsleyConfig = $.extend(true, {}, window.ParsleyConfig, {
		validators: {
			remote2: function () {
				return {
					validate: function (val, url, self) {
						var result = null
								, data = {}
								, dataType = {};

						data[ self.$element.attr('name') ] = val;

						if ('undefined' !== typeof self.options.remoteDatatype)
							dataType = { dataType: self.options.remoteDatatype };

						var manage = function (isConstraintValid, message) {
							// remove error message if we got a server message, different from previous message
							if ('undefined' !== typeof message && 'undefined' !== typeof self.Validator.messages.remote2 && message !== self.Validator.messages.remote2) {
								$(self.UI.ulError + ' .remote2').remove();
							}

							if (false === isConstraintValid) {
								self.options.listeners.onFieldError(self.element, self.constraints, self);
							} else if (true === isConstraintValid && false === self.options.listeners.onFieldSuccess(self.element, self.constraints, self)) {
								// if onFieldSuccess returns (bool) false, consider that field si invalid
								isConstraintValid = false;
							}

							self.updtConstraint({ name: 'remote2', valid: isConstraintValid }, message);
							self.manageValidationResult();
						};

						// transform string response into object
						var handleResponse = function (response) {
							if ('object' === typeof response) {
								return response;
							}

							try {
								response = $.parseJSON(response);
							} catch (err) {
							}

							return response;
						}

						var manageErrorMessage = function (response) {
							return 'object' === typeof response && null !== response ? ( 'undefined' !== typeof response.error ? response.error : ( 'undefined' !== typeof response.message ? response.message : null ) ) : null;
						}

						$.ajax($.extend({}, {
							url: url + '/' + val,
							data: data,
							type: self.options.remoteMethod || 'GET',
							success: function (response) {
								response = handleResponse(response);
								manage(!response, manageErrorMessage(response));
							}, error: function (response) {
								response = handleResponse(response);
								manage(false, manageErrorMessage(response));
							}
						}, dataType));

						return result;
					}, priority: 64
				}
			}
		}, messages: {
			remote2: "The email alreay registed"
		}
	});


	return window.ParsleyConfig;
});

