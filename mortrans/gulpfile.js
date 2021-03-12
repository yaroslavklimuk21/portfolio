var gulp = require('gulp');
var bs = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


// Запускаем сервер, предварительно скопилировав SASS
gulp.task('serve', ['sass'], function() {

    bs.init({
      server: "./"
    });

    gulp.watch("./sass/*.sass", ['sass']);
    gulp.watch("./*.html").on('change', bs.reload);
});

// Делаем компиляцию SASS в CSS 
gulp.task('sass', function() {
 return gulp.src("./sass/*.sass")
   .pipe(sass())
   .pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
   .pipe(gulp.dest("./css"))
   .pipe(bs.stream());
});

gulp.task('default', ['serve']);



