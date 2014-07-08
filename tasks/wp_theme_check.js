/*
 * grunt-wp-theme-check
 * https://github.com/ryelle/grunt-wp-theme-check
 *
 * Copyright (c) 2014 ryelle
 * Licensed under the MIT license.
 */

'use strict';

var WP = require('wp-cli');

module.exports = function(grunt) {

  function run_check( theme, done ){
    grunt.verbose.write( theme );

    list_themes( done );

  }

  function list_themes( done ){
    grunt.event.once('wpThemeList', function( themes, err ){

      if ( err ){
        grunt.log.debug( err );
        grunt.log.error( 'WordPress encountered an error, check your WP install.' );
        done( false );
      } else {
        // Display theme list.

        done( true );
      }

    });

    WP.load({ path:'/srv/www/wordpress-trunk' }, function( WP ) {
      grunt.event.emit( 'wpReady', WP );
      WP.theme.list( function( err, themes ){ //get CLI info
        grunt.event.emit( 'wpThemeList', themes, err );
      });
    });

  }

  grunt.registerMultiTask('wp_theme_check', 'Grunt plugin to run Theme Check', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      theme: null
    });
    var done = this.async();

    grunt.log.debug( 'options: ' + JSON.stringify( options ) );

    run_check( 'museum/build', done );

  });

};
