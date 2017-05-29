var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var bs = require('browser-sync').create();
var reload = bs.reload;

var jssrc = './app/js/**/*.js';
var csssrc = './app/css/**/*.css';
var scss = './app/scss/**/*.scss';
var html = './app/view/*.html'

gulp.task('serve',['postcss'],function(){
    bs.init({
        server:'./app'
    })
    gulp.watch(scss,['postcss']);
    gulp.watch(html).on('change', reload);
})

gulp.task('postcss', function () {
    var processors = [px2rem({ remUnit: 75 })];
    return gulp.src(scss)
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({stream: true}));
});

gulp.task('default',['serve']);