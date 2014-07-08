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
    _ = require('underscore'),
    exec = require('child_process').exec;

module.exports = function(grunt) {

  function run_check( options, done ){
    var command = "wp theme review check " + options.theme + " --path=" + options.path;

    grunt.log.debug( 'Running: ' + command );

    grunt.event.once('wpThemeCheck', function( result, err ){
      if ( err ){
        grunt.log.debug( err );
        grunt.log.error( 'WordPress encountered an error, check your WP install.' );
        done( false );
      } else {
        if ( result.indexOf( 'Success' ) === 0 ) {
          grunt.log.ok( result );
        } else {
          grunt.log.write( result );
        }
        done( true );
      }
    });

    WP.load({ path: options.path }, function( WP ) {
      grunt.event.emit( 'wpReady', WP );

      // Check that options.theme is a theme.

      exec( command, function( err, stdout, stderr ){
        grunt.event.emit( 'wpThemeCheck', stdout, stderr );
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
