var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('default', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

// turns sass into css
gulp.task('sass', function () {
    return gulp.src('app/styles/stylesheet.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// spins a web server that does live reloading
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

// watches changes to sass and live reloads
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/styles/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

// image min
gulp.task('images', function () {
    return gulp.src('app/imgs/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'))
});

// babel
gulp.task('babel', () =>
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

// run babel, then minify js
gulp.task('js', ['babel'], () =>
    gulp.src('dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
)

// autoprefixes and minifies css
gulp.task('css', function () {
    var plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
        cssnano()
    ];
    return gulp.src('app/styles/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', ['js','css','images'])