var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  livereload = require('gulp-livereload');

gulp.task('sass', function() {
  return sass(assets.scss.main)
      .pipe(sourcemaps.write({outputStyle: 'compressed'}))
      .pipe(gulp.dest(assets.scss.output.path))
      .pipe(livereload());
})

gulp.task('js', function() {
  return gulp.src(assets.js.main)
    .pipe(sourcemaps.init())
    .pipe(concat(assets.js.output.filename))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(assets.js.output.path))
    .pipe(livereload());
})

gulp.task('html', function() {
  return gulp.src(assets.html.main)
    .pipe(gulp.dest(assets.html.output.path))
    .pipe(livereload());
})

gulp.task('vendor:css', function() {
  return gulp.src(assets.vendorCss.main)
    .pipe(concat(assets.vendorCss.output.filename))
    .pipe(gulp.dest(assets.vendorCss.output.path))
})

gulp.task('vendor:javascript', function() {
  return gulp.src(assets.vendorJs.main)
    .pipe(concat(assets.vendorJs.output.filename))
    .pipe(gulp.dest(assets.vendorJs.output.path))
})

gulp.task('templates', function() {
  return gulp.src('client/templates/**/*')
         .pipe(gulp.dest('build/templates'))
         .pipe(livereload());
})
gulp.task('partials', function() {
  return gulp.src('client/partials/**/*')
         .pipe(gulp.dest('build/partials'))
         .pipe(livereload());
})

gulp.task('images', function() {
  return gulp.src(assets.images.main)
             .pipe(gulp.dest(assets.images.output))
})

gulp.task('favicon', function() {
  return gulp.src('client/favicon.ico')
             .pipe(gulp.dest('build'))
})

gulp.task('watch', ['vendor:css', 'vendor:javascript', 'sass', 'js', 'html', 'templates', 'partials', 'images', 'favicon'], function() {
  livereload.listen({basePath:'build'});
  gulp.watch(assets.scss.files, ['sass'])
  gulp.watch(assets.js.files, ['js'])
  gulp.watch('client/index.html', ['html'])
  gulp.watch('client/templates/**/*.html', ['templates'])
  gulp.watch('client/partials/**/*.html', ['partials'])
})

gulp.task('build', ['vendor:css', 'vendor:javascript', 'sass', 'js', 'html', 'templates', 'partials', 'images', 'favicon'])

exports.gulp = gulp;