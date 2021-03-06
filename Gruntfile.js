/*
 * grunt-wp-theme-check
 * https://github.com/ryelle/grunt-wp-theme-check
 *
 * Copyright (c) 2014 ryelle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    wp_theme_check: {
      options: {
        path: '/srv/www/wordpress-trunk'
      },
      noTheme: {},
      twentyfourteen: {
        options: {
          theme: 'twentyfourteen'
        }
      },
      twentythirteen: {
        options: {
          theme: 'twentythirteen'
        }
      },
      fakeTheme: {
        options: {
          theme: 'twentysixteen'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'wp_theme_check', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'wp_theme_check']);

};
