/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午12:05
 * To change this template use File | Settings | File Templates.
 */
require.config({

	//baseUrl default to bower_components path
	baseUrl: '../../bower_components',

    waitSeconds: 60,

	//only for setting up root paths for module IDs, the module not changed
	paths: {
		//For named module
		'jquery': 'jquery/jquery',
		'datajs': 'client-infra/app/scripts/vendor/datajs/datajs-1.1.1',
		'OData': 'client-infra/app/scripts/vendor/datajs/datajs-1.1.1',
        'underscore.string' : 'underscore.string/lib/underscore.string'

		//if self pkg not under bower_components, don't look for it under bower_components
//		datajs: '../scripts/vendor/datajs/datajs-1.1.1',
//		OData: '../scripts/vendor/datajs/datajs-1.1.1',
//		'client-infra': '../..'
	},
	map: {
		//Map one module to another, so that relative module ID will resolve base on mapped module
		'*': {
			//Plugin
			css: 'require-css/css',
			domReady: 'requirejs-domready/domReady',
			text: 'requirejs-text/text',
			//Legacy, pls use shim config instead
			depend: 'requirejs-plugins/src/depend',
			json: 'requirejs-plugins/src/json'
		}
	},
	shim: {
		'swipe/swipe': ['jquery', 'css!client-infra/app/styles/vendor/swipe/swipe'],
		'jquery-ui/ui/jquery-ui': ['jquery', 'css!jquery-ui/themes/base/jquery-ui'],
		'purl/purl': ['jquery'],
		'bootstrap/dist/js/bootstrap': ['jquery', 'css!bootstrap/dist/css/bootstrap', 'css!bootstrap/dist/css/bootstrap-theme'],
		'simplecart-js/simpleCart': ['jquery'],
		'foundation/js/foundation': ['jquery', 'modernizr/modernizr', 'css!foundation/css/foundation'],
		'foundation/js/foundation.min': ['jquery', 'modernizr/modernizr', 'css!foundation/css/foundation'],

		'parsleyjs/parsley': ['jquery'],
		'parsleyjs/parsley.extend': ['parsleyjs/parsley'],
		'parsleyjs/l10n/parsley.es': ['parsleyjs/parsley'],
		'parsleyjs/i18n/messages.zh_cn': ['parsleyjs/parsley'],

		'plupload/js/plupload.dev': ['plupload/js/moxie'],
		'plupload/js/jquery.ui.plupload/jquery.ui.plupload': ['jquery-ui/ui/jquery-ui', 'plupload/js/plupload.dev', 'css!plupload/js/jquery.ui.plupload/css/jquery.ui.plupload'],
		'plupload/js/i18n/zh_CN': ['plupload/js/jquery.ui.plupload/jquery.ui.plupload'],

		//JQM
		"jquery.hashchange": {
			deps: [ "jquery" ]
		},
		"jquery.ui.widget": {
			deps: [ "jquery" ],
			exports: "$.widget"
		},
		"widgets/jquery.ui.tabs": {
			deps: [ "jquery.ui.widget" ]
		},
		"widgets/jquery.ui.core": {
			deps: [ "jquery" ],
			exports: [ "$.ui" ]
		},

        'client-infra/app/scripts/vendor/jaydata/jaydata': ['OData'],

		//Angular
		'angular/angular': ['jquery'],
		'angular-route/angular-route': ['angular/angular'],
		'angular-resource/angular-resource': ['angular/angular'],
		'angular-animate/angular-animate': ['angular/angular'],
		'angular-loading-bar/src/loading-bar': ['angular/angular', 'css!angular-loading-bar/src/loading-bar'],
		'angular-http-auth/src/http-auth-interceptor': ['angular/angular'],
		'nginfinitescroll/build/ng-infinite-scroll': ['angular/angular'],
		'angular-translate/angular-translate': ['angular/angular'],
		'angular-translate-loader-static-files/angular-translate-loader-static-files': ['angular-translate/angular-translate'],
		'angular-xeditable/dist/js/xeditable': ['angular/angular', 'css!angular-xeditable/dist/css/xeditable'],
		'ngAnimate-animate.css/animate': ['angular-animate/angular-animate'],

		//works with angular 1.1.5 for $AnimateProvider issue
		'angular-jqm/components/angular/angular-mobile': ['angular-animate/angular-animate'],
		'angular-jqm/dist/angular-jqm': ['angular/angular', 'angular-jqm/components/angular/angular-mobile', 'css!jquery-mobile/css/themes/default/jquery.mobile']

	}
});
