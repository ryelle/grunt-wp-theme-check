# grunt-wp-theme-check

> Grunt plugin to run Theme Check

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wp-theme-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wp-theme-check');
```

## The "wp_theme_check" task

### Overview
In your project's Gruntfile, add a section named `wp_theme_check` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wp_theme_check: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.path
Type: `String`
Default value: `null`

Path to WordPress. Used for wp-cli's `--path` flag. Required.

#### options.theme
Type: `String`
Default value: `null`

Name of the theme to test. Use the folder name here, not the "Theme Name".

### Usage Examples

#### Default Options
In this example, we're just checking one theme, twentyfourteen, and WordPress lives in the /srv/www/wordpress-trunk directory.

```js
grunt.initConfig({
  wp_theme_check: {
    options: {
      path: '/srv/www/wordpress-trunk',
      theme: 'twentyfourteen'
    }
  },
});
```

#### Custom Options
In this example, we're testing two themes in the same WordPress install.

```js
grunt.initConfig({
  wp_theme_check: {
    options: {
      path: '/srv/www/wordpress-trunk'
    },
    twentyfourteen: {
      options: {
        theme: 'twentyfourteen'
      }
    },
    twentythirteen: {
      options: {
        theme: 'twentythirteen'
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.0: Initial release
