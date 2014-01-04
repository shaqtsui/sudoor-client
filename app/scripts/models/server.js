define(['q/q', 'jquery', 'purl/purl', 'OData', '../vendor/jaydata/jaydata'], function (Q, $, purl, OData) {
	//JayData need global OData
	window.OData = OData;

	var server = {};
	var clientURL = $.url();

	/*
	 server.config  maintain the config data
	 */
	server.config = {
		serverURL: clientURL.attr('protocol') + '://' + clientURL.attr('host').replace("www.", "server.") + ':80/gng-server-1.0',
		odataURI: '/data/odata.svc',
		userURI: '/data/odata.svc/User',
		loginURI: '/j_spring_security_check',
		logoutURI: '/j_spring_security_logout',
		restURI: '/data/rest',
		authenticationURI: '/data/rest/SpringSecurity/Authentication',
		fileUploadURL: '/data/rest/tools/fileupload/File'
	};

	server._db = null;

	/*
	 server.getDb() return DB promise with cache
	 */
	server.getDb = function () {
		if (!server._db) {
			//Promise Fulfillment
			var servicePromise = $data.initService(server.config.serverURL + server.config.odataURI);
			var dbCacheDeferred = Q.defer();
			servicePromise.then(function (remoteDBContext, contextFactory, contexType) {
				var localDBContext = contextFactory({
					name: 'local',
					databaseName: 'GPlatformDB'
				});
				dbCacheDeferred.resolve(localDBContext);
			});
			server._db = Q(servicePromise);
			server._db.cache = dbCacheDeferred.promise;
		}
		return  server._db;
	};

	server._session = null;

	/*
	 server.getSession() return Session promise
	 */
	server.getSession = function () {
		if (!server._session) {
			var authMsg = $.ajax({
						url: server.config.serverURL + server.config.authenticationURI,
						type: 'GET',
						xhrFields: {
							withCredentials: true
						}
					}
			);
			server._session = Q(authMsg).then(function (data) {
				var sessionData = {
					user: data
				};
				return sessionData;
			});
		}
		return server._session;
	};

	/*
	 server.destroySession() destroy session, so that can get fresh one via server.getSession()
	 */
	server.destroySession = function () {
		server._session = null;
	};

	/*
	 server.login() fire login msg & update session
	 */
	server.login = function (loginData) {
		var loginMsg = $.ajax({
					url: server.config.serverURL + server.config.loginURI,
					type: 'POST',
					data: loginData,
					xhrFields: {
						withCredentials: true
					}
				}
		);
		var promise = Q(loginMsg).then(function () {
			server.destroySession();
			return server.getSession();
		});
		return promise;
	};

	/*
	 server.logout() fire logout msg & update session
	 */
	server.logout = function () {
		var logoutMsg = $.ajax({
					url: server.config.serverURL + server.config.logoutURI,
					type: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}
		);
		var promise = Q(logoutMsg).then(
				function () {
					server.destroySession();
					return server.getSession();
				}
		);
		return promise;
	};

	/*
	 server.isLogin() check whether current session login
	 */
	server.isLogin = function () {
		var data = server.getSession().inspect().value;
		if (data) {
			return (data.user.name != 'anonymousUser');
		}
		return false;
	};

	return server;
});