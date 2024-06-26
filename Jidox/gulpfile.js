"use strict";

const { series, src, dest, parallel, watch } = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    babel = require('gulp-babel'),
    browsersync = require("browser-sync"),
    concat = require("gulp-concat"),
    CleanCSS = require("gulp-clean-css"),
    del = require("del"),
    fileinclude = require("gulp-file-include"),
    // imagemin = require("gulp-imagemin"),
    npmdist = require("gulp-npm-dist"),
    newer = require("gulp-newer"),
    rename = require("gulp-rename"),
    rtlcss = require("gulp-rtlcss"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass")(require("sass")),
    uglify = require("gulp-uglify");


const paths = {
    baseSrc: "static/",                // source directory
    baseDist: "static/",              // build directory
    baseDistAssets: "static/", // build assets directory
    baseSrcAssets: "static/source/",   // source assets directory
};



const clean = function (done) {
    del.sync(paths.baseDist, done());
};

const vendor = function () {
    const out = paths.baseDistAssets + "vendor/";
    return src(npmdist(), { base: "./node_modules" })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest(out));
};

const data = function () {
    const out = paths.baseDistAssets + "data/";
    return src([paths.baseSrcAssets + "data/**/*"])
        .pipe(dest(out));
};

const fonts = function () {
    const out = paths.baseDistAssets + "fonts/";
    return src([paths.baseSrcAssets + "fonts/**/*"])
        .pipe(newer(out))
        .pipe(dest(out));
};

const images = function () {
    var out = paths.baseDistAssets + "images";
    return src(paths.baseSrcAssets + "images/**/*")
        .pipe(newer(out))
        // .pipe(imagemin())
        .pipe(dest(out));
};

const javascript = function () {
    const out = paths.baseDistAssets + "js/";

    // vendor.min.js
    src([
        paths.baseDistAssets + "vendor/bootstrap/js/bootstrap.bundle.min.js",
        paths.baseDistAssets + "vendor/jquery/jquery.min.js",
        paths.baseDistAssets + "vendor/simplebar/simplebar.min.js"
    ])
        .pipe(concat("vendor.js"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));


    // copying and minifying all other js
    src([paths.baseSrcAssets + "js/**/*.js", "!" + paths.baseSrcAssets + "js/layout.js", "!" + paths.baseSrcAssets + "js/main.js"])
        .pipe(uglify())
        // .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));


    // app.js (main.js + layout.js)
    return src([paths.baseSrcAssets + "js/main.js", paths.baseSrcAssets + "js/layout.js"])
        .pipe(concat("app.js"))
        .pipe(dest(out))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));
};


const scss = function () {
    const out = paths.baseDistAssets + "css/";

    src(paths.baseSrcAssets + 'scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
            })
        )
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // source maps
        .pipe(dest(out));

    // generate rtl
    return src(paths.baseSrcAssets + 'scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
            })
        )
        .pipe(rtlcss())
        .pipe(rename({ suffix: "-rtl" }))
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // source maps
        .pipe(dest(out));
};

const icons = function () {
    const out = paths.baseDistAssets + "css/";
    return src(paths.baseSrcAssets + "scss/icons.scss")
        .pipe(sourcemaps.init())
        .pipe(sass.sync()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
            })
        )
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // source maps
        .pipe(dest(out));
};

const reloadBrowserSync = function (done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    watch(paths.baseSrcAssets + "data/**/*", series(data, reloadBrowserSync));
    watch(paths.baseSrcAssets + "fonts/**/*", series(fonts, reloadBrowserSync));
    watch(paths.baseSrcAssets + "images/**/*", series(images, reloadBrowserSync));
    watch(paths.baseSrcAssets + "js/**/*", series(javascript, reloadBrowserSync));
    watch(paths.baseSrcAssets + "scss/icons.scss", series(icons, reloadBrowserSync));
    watch([paths.baseSrcAssets + "scss/**/*.scss", "!" + paths.baseSrcAssets + "scss/icons.scss"], series(scss, reloadBrowserSync));
}

// Producaton Tasks
exports.default = series(
    vendor,
    parallel(data, fonts, images, javascript, scss, icons),
    parallel(watchFiles)
);

// Build Tasks
exports.build = series(
    vendor,
    parallel(data, fonts, images, javascript, scss, icons)
);