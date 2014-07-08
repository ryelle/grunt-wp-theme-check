/*
 * grunt-wp-theme-check
 * https://github.com/ryelle/grunt-wp-theme-check
 *
 * Copyright (c) 2014 ryelle
 * Licensed under the MIT license.
 */

'use strict';

var WP = require('wp-cli'),
    Table = require('cli-table'),
    _ = require('underscore');

module.exports = function(grunt) {

  function run_check( options, done ){
    grunt.log.debug( 'Checking theme: ' + options.theme );

    grunt.event.once('wpThemeCheck', function( result, err ){
      grunt.log.debug( 'Results: ' + JSON.stringify( result ) );
    });

    WP.load({ path: options.path }, function( WP ) {
      grunt.event.emit( 'wpReady', WP );
      WP.trt.check( options.theme, function( err, result ){ //get CLI info
       grunt.event.emit( 'wpThemeCheck', result, err );
      });
    });

  }

  function list_themes( options, done ){
    grunt.event.once('wpThemeList', function( themes, err ){

      if ( err ){
        grunt.log.debug( err );
        grunt.log.error( 'WordPress encountered an error, check your WP install.' );
        done( false );
      } else {
        // Display theme list.
        var table = new Table({ head: ['name', 'status', 'update', 'version'] });
        _.each(themes, function(theme){
          table.push([ theme.name, theme.status, theme.update, theme.version ]);
        })
        grunt.log.writeln( table.toString() );

        grunt.log.error( 'The theme to check should be one of the above themes.' );
        done( false );
      }

    });

    WP.load({ path: options.path }, function( WP ) {
      grunt.event.emit( 'wpReady', WP );
      WP.theme.list( function( err, themes ){ //get CLI info
        grunt.event.emit( 'wpThemeList', themes, err );
      });
    });

  }

  grunt.registerMultiTask('wp_theme_check', 'Grunt plugin to run Theme Check', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      theme: null,
      path: null,
    });
    var done = this.async();

    grunt.log.debug( 'options: ' + JSON.stringify( options ) );

    if ( ! options.path ){
      grunt.log.error( 'Please define the path to your WordPress install.' );
      done(false);
    }

    if ( ! options.theme ) {
      list_themes( options, done );
    } else {
      run_check( options, done );
    }

  });

};
