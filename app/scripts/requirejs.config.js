/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午12:05
 * To change this template use File | Settings | File Templates.
 */
require.config({

	//baseUrl default to bower_components path
	baseUrl: 'bower_components',

    waitSeconds: 60,

	//only for setting up root paths for module IDs, the module not changed
	paths: {
		//For named module
		'jquery': 'jquery/jquery',
		'underscore.string' : 'underscore.string/lib/underscore.string',

		//for JQM bug
		'jquery-ui/jquery.ui.widget':'jquery-mobile/external/jquery-ui/jquery.ui.widget',
		'jquery-ui/jquery.ui.core':'jquery-mobile/external/jquery-ui/jquery.ui.core',
		'jquery-ui/jquery.ui.tabs':'jquery-mobile/external/jquery-ui/jquery.ui.tabs',

		//if self pkg under bower_components
		'datajs': 'infra-client/app/scripts/vendor/datajs/datajs-1.1.1',
		'OData': 'infra-client/app/scripts/vendor/datajs/datajs-1.1.1'

		//if self pkg NOT under bower_components, don't look for it under bower_components
//		'infra-client': '../..',
//		datajs: '../scripts/vendor/datajs/datajs-1.1.1',
//		OData: '../scripts/vendor/datajs/datajs-1.1.1'

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
		'swipe/swipe': ['jquery', 'css!infra-client/app/styles/vendor/swipe/swipe'],
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

        'infra-client/app/scripts/vendor/jaydata/jaydata': ['OData'],

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
