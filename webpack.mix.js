let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public')
   .setResourceRoot('../')
   .sass('resources/sass/app.scss', 'css')
   .js('resources/js/app.js', 'js')
   .sourceMaps(true)
   .options({
       uglify: false
   })
   .extract([
       'axios', 'lodash', 'vue', 'vuex', 'vue-router'
   ]);
