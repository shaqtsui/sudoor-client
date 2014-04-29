/*global describe, it */
'use strict';
define([ 'sudoor-client/app/scripts/models/server' ], function(server) {
	describe('server', function() {
		describe('#login()', function() {
			it('should return SUCCESS when correct credentials used', function(done) {
				var loginData = {
				    j_username : "test",
				    j_password : "test",
				    _spring_security_remember_me : "false"
				};
				return expect(server.login(loginData)).to.eventually.equal('SUCCESS');
				// server.login(loginData).then(function(result) {
				// expect(result).to.equal("SUCCESS");
				// done();
				// }, function(err) {
				// done(err);
				// });
			});
		});
		describe('#isLogin()', function() {
			it('should return false when not login', function() {
				expect(server.isLogin()).to.equal(false);
			});
		});
	});
});
