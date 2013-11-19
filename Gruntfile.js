/* jshint node: true */
'use strict';

module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  var srcFiles = [
    'src/templates.js',
    'src/mixins.js',
    'src/app.js',
    'src/search-view.js',
    'src/tasks-view.js',
    'src/task-details-view.js',
    'src/tasks-collection.js'
  ];


  // Project configuration.
  grunt.initConfig({
    pkg         : pkg,

    requirejs: {
      options: {
        baseUrl: 'src',
        optimize: 'none',

        paths: {
          'underscore':      './../bower_components/underscore/underscore',
          'backbone':        './../bower_components/backbone/backbone',
          'jquery':          './../bower_components/jquery/jquery',
          'backbone-pageable':  './../bower_components/backbone-pageable/lib/backbone-pageable',

          'camunda-client':          'app'
        },

        shim: {
          underscore: {
            exports: ['_']
          },
          jquery: {
            exports: ['jQuery']
          },
          backbone: {
            exports: ['Backbone'],
            deps: ['jquery', 'underscore']
          },

          'camunda-client': {
            exports: ['SCBone'],
            deps: [
              'backbone'
            ]
          }
        }
      },
      lib: {
        options: {
          out: 'camunda-client.js',
          name: 'camunda-client',
          // wrap: true,
          exclude: [
            'backbone',
            'jquery',
            'underscore'
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'src/**/*.js'
        ],
        tasks: [
          'build'
        ]
      }
    },

    compass: {
      compile: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'images',
          // javascriptsDir: '',
          fontsDir: 'fonts',
          importPath: [
            'bower_components/foundation/scss'
          ],
          relativeAssets: true,
          outputStyle: 'nested',
        }
      }
    },

    connect: {
      dev: {
        options: {
          hostname: '*',
          port: '8002',
          base: __dirname
        }
      }
    }
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', [
    'requirejs',
    'compass'
  ]);

  // Default tasks to be run.
  grunt.registerTask('dev', [
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};