define([ 'q/q', 'jquery', 'purl/purl', 'OData', './logging', '../vendor/jaydata/jaydata' ], function(Q, $, purl, OData, log) {
	// JayData need global OData
	window.OData = OData;

	var server = {};
	var clientURL = $.url();

	/*
	 * server.config maintain the config data
	 */
	server.config = {
	    serverURL : clientURL.attr('protocol') + '://' + clientURL.attr('host').replace("www.", "server.") + ':8080/sudoor-server-lib',
	    odataURI : '/data/odata.svc',
	    userURI : '/data/odata.svc/User',
	    loginURI : '/j_spring_security_check',
	    logoutURI : '/j_spring_security_logout',
	    restURI : '/data/rest',
	    authenticationURI : '/data/rest/SpringSecurity/Authentication',
	    fileUploadURL : '/data/rest/tools/fileupload/File',

	    // Some mobile browser don't have local DB, so need to give
	    // option to disable cache
	    enableCache : true,

	    dbListeners : {
	        'beforeCreate' : $.noop,
	        'afterCreate' : $.noop,
	        'beforeUpdate' : $.noop,
	        'afterUpdate' : $.noop,
	        'beforeDelete' : $.noop,
	        'afterDelete' : $.noop
	    }
	};

	/**
	 * stand alone funcs
	 */
	function attachEventListener(db, listeners) {
		for (prop in db) {
			var value = db[prop];
			if (value instanceof $data.EntitySet) {
				value.elementType.addEventListener('beforeCreate', listeners.beforeCreate);
				value.elementType.addEventListener('afterCreate', listeners.afterCreate);
				value.elementType.addEventListener('beforeUpdate', listeners.beforeUpdate);
				value.elementType.addEventListener('afterUpdate', listeners.afterUpdate);
				value.elementType.addEventListener('beforeDelete', listeners.beforeDelete);
				value.elementType.addEventListener('afterDelete', listeners.afterDelete);
			}
		}
	}

	function createLocalDB(factory) {
		var localDB = null;
		if (factory) {
			localDB = factory({
			    name : 'local',
			    databaseName : 'GPlatformDB'
			});
		} else {
			localDB = new BizData.BizDataContainer({
			    name : 'local',
			    databaseName : 'GPlatformDB'
			});
		}
		return localDB;
	}

	function createRemoteDB(url) {
		var remoteDBContext = new BizData.BizDataContainer({
		    name : 'oData',
		    oDataServiceHost : url
		});
		return remoteDBContext;
	}

	server._db = null;
	/*
	 * server.getDb() return DB promise with cache
	 */
	server.getDb = function() {
		try {
			if (!server._db) {
				// Create Promise
				var dbDeferred = Q.defer();
				server._db = dbDeferred.promise;

				var remoteDBContext = null;
				var localDBContext = null;

				// Promise Fulfillment
				if (typeof BizData != 'undefined') {
					// Static context init, need to generate js first,
					// quicker than dyna approach
					remoteDBContext = createRemoteDB(server.config.serverURL + server.config.odataURI);
					if (server.config.enableCache) {
						remoteDBContext.cache = createLocalDB();
					}
					remoteDBContext.onReady(function() {
						attachEventListener(remoteDBContext, server.config.dbListeners);
						log.debug('DB Initialized');
						dbDeferred.resolve(remoteDBContext);
					});
				} else {
					// Dyna context init
					var servicePromise = $data.initService(server.config.serverURL + server.config.odataURI);
					servicePromise.then(function(remoteContext, contextFactory, contexType) {
						remoteDBContext = remoteContext;
						if (server.config.enableCache) {
							remoteDBContext.cache = createLocalDB(contextFactory);
						}
						attachEventListener(remoteDBContext, server.config.dbListeners);
						log.debug('DB Initialized');
						dbDeferred.resolve(remoteDBContext);
					});
				}
			}
			return server._db;
		} catch (e) {
			log.error(e);
		}
	};

	server._session = null;

	/*
	 * server.getSession() return Session promise
	 */
	server.getSession = function() {
		if (!server._session) {
			server._session = Q($.ajax({
			    url : server.config.serverURL + server.config.authenticationURI,
			    type : 'GET',
			    xhrFields : {
				    withCredentials : true
			    }
			})).then(function(data) {
				var sessionData = {
					user : data
				};
				return sessionData;
			});
		}
		return server._session;
	};

	/*
	 * server.destroySession() destroy session, so that can get fresh one via server.getSession()
	 */
	server.refreshSession = function() {
		server._session = null;
	};

	/*
	 * server.login() fire login msg & update session
	 */
	server.login = function(loginData) {
		return Q($.ajax({
		    url : server.config.serverURL + server.config.loginURI,
		    type : 'POST',
		    data : loginData,
		    xhrFields : {
			    withCredentials : true
		    }
		})).then(function() {
			server.refreshSession();
		});
	};

	/*
	 * server.logout() fire logout msg & update session
	 */
	server.logout = function() {
		return Q($.ajax({
		    url : server.config.serverURL + server.config.logoutURI,
		    type : 'GET',
		    xhrFields : {
			    withCredentials : true
		    }
		})).then(function() {
			server.refreshSession();
		});
	};

	/*
	 * server.isLogin() check whether current session login
	 */
	server.isLogin = function() {
		return server.getSession().then(function(sess) {
			return sess.user.name != 'anonymousUser';
		});
	};

	/*
	 * server.register() invoke JayData
	 */
	server.register = function(registerData) {
		return server.getDb().then(function(db) {
			db.CredentialUsers.add(registerData);
			return Q(db.saveChanges());
		});
	};

	return server;
});