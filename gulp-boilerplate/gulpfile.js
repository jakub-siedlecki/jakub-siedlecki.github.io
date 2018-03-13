var
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat');

gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(newer('images/'))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest('images/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError)
    )
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    
});

// gulp.task('sass', function () {
//   gulp.src('./scss/**/*.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(sourcemaps.write())
//     .pipe(autoprefixer())
//     .pipe(gulp.dest('./css/'));
// });


gulp.task('default', ['browserSync', 'sass'], function (){
  gulp.watch('./scss/**/*.scss', ['sass']); 
  gulp.watch('./*.html', browserSync.reload); 
  gulp.watch('./js/**/*.js', browserSync.reload); 
});
