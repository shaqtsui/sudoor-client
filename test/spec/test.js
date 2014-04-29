/*global describe, it */
'use strict';
define([ 'sudoor-client/app/scripts/models/server' ], function(server) {
	describe('server', function() {
		describe('#login()', function() {
			it('should run here few assertions', function() {

			});
		});
		describe('#isLogin()', function() {
			it('should return false when not login', function() {
				server.isLogin().should.equal(false);
			});
		});
	});
});
