define(['./models/infra', './models/angular', './models/postload', './models/validator'], function () {
	return {};
});

//Can not include ./vendor/jaydata/jaydata, as there will be path issue: /angular_comp/GPlatform/jaydataproviders/oDataProvider.js
//Can not include './models/server' as it rely on jaydata