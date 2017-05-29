// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  uncss = require('gulp-uncss'),


  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }
;

// image processing
gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', ['images'], function() {
  var
    out = folder.build + '',
    page = gulp.src(folder.src + 'index.html')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// CSS processing 
gulp.task('css', function() { 
  var out = folder.build + 'css/';
  return gulp.src(folder.src + 'css/**/*')
    .pipe(newer(out))
    .pipe(gulp.dest(out));
});

// JS processing (now only moving XD) 
gulp.task('js', function() { 
  var out = folder.build + 'js/';
  return gulp.src(folder.src + 'js/**/*')
    .pipe(newer(out))
    .pipe(gulp.dest(out));
});

// build all 
gulp.task('build', [`cleanbuild`, `html`, 'css', 'js'], function (){
  console.log('Building files');
})

// browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

// SASS
gulp.task('sass', function() {
  return gulp.src(folder.src + 'scss/*.scss') // Gets all files ending with .scss in src/scss
    .pipe(sass())
    .pipe(gulp.dest(folder.src + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// browserSync and sass watcher
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch(folder.src + 'scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(folder.src + '*.html', browserSync.reload); 
  gulp.watch(folder.src + 'js/**/*.js', browserSync.reload); 
});

// code tidy 
gulp.task('cleanbuild', function() {
  return del.sync('build');
})