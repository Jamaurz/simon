var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');

gulp.task("less", function(){
    return gulp.src('style/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('style/css'))
})

gulp.task("jade",function(){
     return gulp.src('./*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'));
})

gulp.task('watch',function(){
    gulp.watch('style/less/**/*.less', ['less']);
    gulp.watch('./*.jade', ['jade']);
})