// Generated on 2014-03-13 using generator-webapp 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
	var mainCfg = {
	    angular : {
		    comp : {
		        js : 'angular_comp/**/*.js',
		        html : 'angular_comp/**/*.html',
		        json : 'angular_comp/**/*.json',
		        all : 'angular_comp/**'
		    }
	    },
	    infra : 'bower_components/infra-client/app',
	    index : 'index.html',
	    localServer : 'c:/apps/Apache24/htdocs',
	    remoteServer : 'c:/apps/Apache24/htdocs',
	    requirejs : {
	        jsout : 'requirejs.optimized.js',
	        cssout : 'requirejs.optimized.css'
	    }
	};
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

	    // Project settings
	    config : {
	        // Configurable paths
	        app : 'app',
	        dist : 'dist'
	    },

	    release : {
		    options : {
		        npm : false
		    }
	    },

	    requirejs : {
		    compile : {
			    options : {
			        /*
					 * For require-css CSS internal URL rebase: oldBase = src css path newBase: By default it's optimized css path, but if siteRoot
					 * available than siteRoot path (related to optimized css path)
					 */
			        // buildCSS: false,
			        separateCSS : true,
			        // siteRoot: '../angular_comp/GPlatform',

			        // optimize: 'none',
			        baseUrl : "<%= config.app %>/bower_components",

			        // Out path need to be under app folder, so that to avoid "../app" in url rewrite
			        out : '<%= config.app %>/' + mainCfg.requirejs.jsout,

			        // TODO: WARNING: This is project specific config, need to be replaced with sub-project config
			        name : 'infra-client/app/scripts/requirejs.config.cache',

			        // TODO: In sub-project this should changed to : '<%= config.app
					// %>/bower_components/infra-client/app/scripts/requirejs.config.js'.
			        mainConfigFile : '<%= config.app %>/scripts/requirejs.config.js',

			        // TODO: WARNING: This is project specific config, need to be replaced with sub-project config
			        paths : {
			            'infra-client' : '../..',
			            datajs : '../scripts/vendor/datajs/datajs-1.1.1',
			            OData : '../scripts/vendor/datajs/datajs-1.1.1'
			        }
			    }
		    }
	    },

	    // Watches files for changes and runs tasks based on the changed files
	    watch : {
	        bower : {
	            files : [ 'bower.json' ],
	            tasks : [ 'bowerInstall' ]
	        },
	        js : {
	            files : [ '<%= config.app %>/scripts/{,*/}*.js' ],
	            tasks : [ 'jshint' ],
	            options : {
		            livereload : true
	            }
	        },
	        jstest : {
	            files : [ 'test/spec/{,*/}*.js' ],
	            tasks : [ 'test:watch' ]
	        },
	        gruntfile : {
		        files : [ 'Gruntfile.js' ]
	        },
	        styles : {
	            files : [ '<%= config.app %>/styles/{,*/}*.css' ],
	            tasks : [ 'newer:copy:styles', 'autoprefixer' ]
	        },
	        livereload : {
	            options : {
		            livereload : '<%= connect.options.livereload %>'
	            },
	            files : [ '<%= config.app %>/{,*/}*.html', '.tmp/styles/{,*/}*.css', '<%= config.app %>/images/{,*/}*' ]
	        }
	    },

	    // The actual grunt server settings
	    connect : {
	        options : {
	            port : 80,
	            livereload : 35729,
	            // Change this to '0.0.0.0' to access the server from outside
	            hostname : '0.0.0.0'
	        },
	        livereload : {
		        options : {
		            open : 'http://localhost:80',
		            base : [ '.tmp', '<%= config.app %>' ]
		        }
	        },
	        test : {
		        options : {
		            port : 9001,
		            base : [ '.tmp', 'test', '<%= config.app %>' ]
		        }
	        },
	        dist : {
		        options : {
		            open : 'http://localhost:80',
		            base : '<%= config.dist %>',
		            livereload : false
		        }
	        }
	    },

	    // Empties folders to start fresh
	    clean : {
	        dist : {
		        files : [ {
		            dot : true,
		            src : [ '.tmp', '<%= config.dist %>/*', '!<%= config.dist %>/.git*' ]
		        } ]
	        },
	        server : '.tmp',
	        requirejsApp : {
		        files : [ {
		            expand : true,
		            cwd : '<%= config.app %>',
		            src : [ mainCfg.requirejs.jsout, mainCfg.requirejs.cssout ]
		        } ]
	        },
	        requirejsDist : {
		        files : [ {
		            expand : true,
		            cwd : '<%= config.dist %>',
		            src : [ mainCfg.requirejs.jsout, mainCfg.requirejs.cssout ]
		        } ]

	        }
	    },

	    // Make sure code styles are up to par and there are no obvious mistakes
	    jshint : {
	        options : {
	            jshintrc : '.jshintrc',
	            reporter : require('jshint-stylish')
	        },
	        all : [ 'Gruntfile.js', '<%= config.app %>/scripts/{,*/}*.js', '!<%= config.app %>/scripts/vendor/*', 'test/spec/{,*/}*.js' ]
	    },

	    // Mocha testing framework configuration options
	    mocha : {
		    all : {
			    options : {
			        run : true,
			        urls : [ 'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html' ]
			    }
		    }
	    },

	    // Add vendor prefixed styles
	    autoprefixer : {
	        options : {
		        browsers : [ 'last 1 version' ]
	        },
	        dist : {
		        files : [ {
		            expand : true,
		            cwd : '.tmp/styles/',
		            src : '{,*/}*.css',
		            dest : '.tmp/styles/'
		        } ]
	        }
	    },

	    // Automatically inject Bower components into the HTML file
	    bowerInstall : {
		    app : {
		        src : [ '<%= config.app %>/index.html' ],
		        ignorePath : '<%= config.app %>/'
		    }
	    },

	    // Renames files for browser caching purposes
	    rev : {
	        dist : {
		        files : {
			        src : [ '<%= config.dist %>/scripts/{,*/}*.js', '<%= config.dist %>/styles/{,*/}*.css', '<%= config.dist %>/images/{,*/}*.*',
			                '<%= config.dist %>/styles/fonts/{,*/}*.*', '<%= config.dist %>/*.{ico,png}' ]
		        }
	        },
	        requirejs : {
		        files : [ {
		            expand : true,
		            cwd : '<%= config.dist %>',
		            src : [ mainCfg.requirejs.jsout, mainCfg.requirejs.cssout ]
		        } ]
	        }
	    },

	    // Reads HTML for usemin blocks to enable smart builds that automatically
	    // concat, minify and revision files. Creates configurations in memory so
	    // additional tasks can operate on them
	    useminPrepare : {
	        options : {
		        dest : '<%= config.dist %>'
	        },
	        html : '<%= config.app %>/' + mainCfg.index
	    },

	    // Performs rewrites based on rev and the useminPrepare configuration
	    usemin : {
	        options : {
		        assetsDirs : [ '<%= config.dist %>', '<%= config.dist %>/images' ]
	        },
	        html : [ '<%= config.dist %>/{,*/}*.html' ],
	        css : [ '<%= config.dist %>/styles/{,*/}*.css' ]
	    },

	    // The following *-min tasks produce minified files in the dist folder
	    imagemin : {
		    dist : {
			    files : [ {
			        expand : true,
			        cwd : '<%= config.app %>/images',
			        src : '{,*/}*.{gif,jpeg,jpg,png}',
			        dest : '<%= config.dist %>/images'
			    } ]
		    }
	    },

	    svgmin : {
		    dist : {
			    files : [ {
			        expand : true,
			        cwd : '<%= config.app %>/images',
			        src : '{,*/}*.svg',
			        dest : '<%= config.dist %>/images'
			    } ]
		    }
	    },

	    htmlmin : {
		    dist : {
		        options : {
		            collapseBooleanAttributes : true,
		            collapseWhitespace : true,
		            removeAttributeQuotes : true,
		            removeCommentsFromCDATA : true,
		            removeEmptyAttributes : true,
		            removeOptionalTags : true,
		            removeRedundantAttributes : true,
		            useShortDoctype : true
		        },
		        files : [ {
		            expand : true,
		            cwd : '<%= config.dist %>',
		            src : '{,*/}*.html',
		            dest : '<%= config.dist %>'
		        } ]
		    }
	    },

	    // By default, your `index.html`'s <!-- Usemin block --> will take care of
	    // minification. These next options are pre-configured if you do not wish
	    // to use the Usemin blocks.
	    // cssmin: {
	    // dist: {
	    // files: {
	    // '<%= config.dist %>/styles/main.css': [
	    // '.tmp/styles/{,*/}*.css',
	    // '<%= config.app %>/styles/{,*/}*.css'
	    // ]
	    // }
	    // }
	    // },

	    uglify : {
		    dist : {
			    files : [ {
			        expand : true,
			        cwd : '<%= config.app %>',
			        src : mainCfg.infra + '/**/*.js',
			        dest : '<%= config.dist %>'
			    } ]
		    }
	    },
	    // concat: {
	    // dist: {}
	    // },

	    // Copies remaining files to places other tasks can use
	    copy : {
	        dist : {
		        files : [ {
		            expand : true,
		            dot : true,
		            cwd : '<%= config.app %>',
		            dest : '<%= config.dist %>',
		            src : [ '*.{ico,png,txt}', '.htaccess', 'images/{,*/}*.webp', '{,*/}*.html', 'styles/fonts/{,*/}*.*' ]
		        } ]
	        },
	        styles : {
	            expand : true,
	            dot : true,
	            cwd : '<%= config.app %>/styles',
	            dest : '.tmp/styles/',
	            src : '{,*/}*.css'
	        },
	        indirection : {
	            expand : true,
	            dot : true,
	            cwd : '<%= config.app %>',
	            dest : '<%= config.dist %>',
	            src : [ 'bower_components/**/*.{gif,jpeg,jpg,png,woff,ttf}' ]
	        },
	        angularComp : {
		        files : [ {
		            expand : true,
		            cwd : '<%= config.app %>',
		            dest : '<%= config.dist %>',
		            src : [ mainCfg.angular.comp.all ]
		        } ]
	        },
	        requirejs : {
		        files : [ {
		            expand : true,
		            cwd : '<%= config.app %>',
		            dest : '<%= config.dist %>',
		            src : [ mainCfg.requirejs.jsout, mainCfg.requirejs.cssout ]
		        } ]
	        },
	        localDeploy : {
	            expand : true,
	            cwd : '<%= config.dist %>',
	            dest : mainCfg.localServer,
	            src : '**'
	        },
	        remoteDeploy : {
	            expand : true,
	            cwd : '<%= config.dist %>',
	            dest : mainCfg.remoteServer,
	            src : '**'
	        }
	    },
	    modernizr : {
	        devFile : '<%= config.app %>/bower_components/modernizr/modernizr.js',
	        outputFile : '<%= config.dist %>/bower_components/modernizr/modernizr.js',
	        files : [ '<%= config.dist %>/scripts/{,*/}*.js', '<%= config.dist %>/styles/{,*/}*.css', '!<%= config.dist %>/scripts/vendor/*' ],
	        uglify : true
	    },
	    // Run some tasks in parallel to speed up build process
	    concurrent : {
	        server : [ 'copy:styles' ],
	        test : [ 'copy:styles' ],
	        dist : [ 'copy:styles', 'imagemin', 'svgmin' ]
	    }
	});

	grunt.registerTask('serve', function(target) {
		if (target === 'dist') {
			return grunt.task.run([ 'build', 'connect:dist:keepalive' ]);
		}

		grunt.task.run([ 'clean:server', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'watch' ]);
	});

	grunt.registerTask('server', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([ target ? ('serve:' + target) : 'serve' ]);
	});

	grunt.registerTask('test', function(target) {
		if (target !== 'watch') {
			grunt.task.run([ 'clean:server', 'concurrent:test', 'autoprefixer' ]);
		}

		grunt.task.run([ 'connect:test', 'mocha' ]);
	});

	grunt.registerTask('buildRequirejs', [ 'clean:requirejsApp', 'clean:requirejsDist', 'requirejs:compile', 'copy:requirejs', 'rev:requirejs',
	        'clean:requirejsApp' ]);

	grunt.registerTask('build', [ 'clean:dist', 'buildRequirejs', 'useminPrepare', 'concurrent:dist', 'autoprefixer', 'concat',
	// Remove cssmin, css will be processed by buildRequirejs
	// 'cssmin',
	'uglify',
	// 'modernizr',
	'copy:dist', 'copy:indirection', 'copy:angularComp', 'rev', 'usemin', 'htmlmin' ]);

	grunt.registerTask('default', [ 'newer:jshint', 'test', 'build' ]);
};
