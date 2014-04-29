/*global describe, it */
'use strict';
define([ 'sudoor-client/app/scripts/models/server' ], function(server) {
	describe('server', function() {
		var userName = '14edc@g.cn';

		describe('#register()', function() {
			it('should return register successful when correct credentials used', function(done) {
				var registerData = {
				    Username : userName,
				    Password : 'g',
				    Enabled : true,
				    CredentialAuthorityDetails : {
				        Username : userName,
				        Authority : 'ROLE_CUSTOMER'
				    }
				};
				//return expect(server.register(registerData)).to.eventually.equal('SUCCESS');
				server.register(registerData).then(function(result) {
					done();
				}, function(err) {
					done(err);
				});
			});
		});

		describe('#login()', function() {
			it('should return SUCCESS when correct credentials used', function(done) {
				var loginData = {
				    j_username : userName,
				    j_password : "g",
				    _spring_security_remember_me : "false"
				};
				server.login(loginData).then(function(result) {
					done();
				}, function(err) {
					done(err.status);
				});
			});
		});

		describe('#isLogin() - true', function() {
			it('should return true after logout', function(done) {
				server.isLogin().then(function(result) {
					if (result) {
						done();
					} else {
						done("Not Login");
					}
				}, function(err) {
					done(err.status);
				});
			});
		});

		describe('#logout()', function() {
			it('should logout', function(done) {
				server.logout().then(function(result) {
					done();
				}, function(err) {
					done(err.status);
				});
			});
		});

		describe('#isLogin() - false', function() {
			it('should return false after logout', function(done) {
				server.isLogin().then(function(result) {
					if (!result) {
						done();
					} else {
						done("Not Login");
					}
				}, function(err) {
					done(err.status);
				});
			});
		});
	});
});
