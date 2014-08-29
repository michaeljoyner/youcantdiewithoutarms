var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src('app/assets/sass/**/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 5 version'))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
   return gulp.src('app/assets/js/**/*.js')
       .pipe(concat('main.js'))
       .pipe(uglify())
       .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function(){
    return gulp.watch('app/assets/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);