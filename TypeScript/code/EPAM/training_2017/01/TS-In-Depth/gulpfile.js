var gulp = require('gulp');
var plug = require("gulp-load-plugins")();

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var buffer = require('vinyl-buffer');

var paths = {
    pages: ['src/*.html'],
    localhost: "http://localhost:8000/index.html",
    tssource: ["src/**/*.ts"],
    htmlsource: ["src/**/*.html"]
};

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('app'));
});

gulp.task('webserver', function() {
    return gulp.src('app')
        .pipe(plug.webserver({
            livereload: true,
            directoryListing: true,
            open: paths.localhost
        }));
});

gulp.task('bundle', function() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
    })
    .bundle()
    .on('error', function(err){
        console.log('Compile Error', err.stack, err.message);
        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(plug.sourcemaps.init({loadMaps: true}))
    .pipe(plug.uglify())
    .pipe(plug.sourcemaps.write('./'))
    .pipe(gulp.dest('app'));
});

gulp.task("watch", function() {
    gulp.watch(paths.tssource, ["bundle"]);
    gulp.watch(paths.htmlsource, ["copyHtml"]);
});

gulp.task('default', ['watch', 'copyHtml', 'bundle', 'webserver']);