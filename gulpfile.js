const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();


const clean = () => {
    del(['src/css/style.css'])
    return del(['dist']);
}

/*  переписывает основные файлы=> пока не надо*/
/*const html = () => {
    return src('src/*.*')
    .pipe(dest('dist'))
}*/

/* подключаем общие модули, используемые в нескольких местах и svg спрайт/
   В данной работе не буду минифицировать html просто скопирую*/
const htmlInclude = () => {
    return src('src/*.html')
    .pipe(fileInclude({
        prefix: '@',
        basepath: '@file'
    }))
    .pipe(dest('dist'))
}

/*В данной сборке у меня уже готовые шрифты,
 поэтому я их просто перепишу */
const fonts = () => {
    return src('src/fonts/*.*')
    .pipe(dest('dist/fonts'))
}

const stylesSass = () => {
    return  src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('src/css'));
}

const stylesSassBuild = () => {
    return src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError()))
    .pipe(dest('src/css'))
}

const stylesBuild = () => {
    return src(['src/css/lib/normalize.min.css','src/css/lib/*.css','src/css/style.css'])
    .pipe(concat('style.min.css'))
    .pipe(dest('dist/css'))
}

const stylesDebug = () => {
    return src(['src/css/lib/normalize.min.css','src/css/lib/*.css','src/css/style.css'])
    .pipe(concat('style.min.css'))
    .pipe(dest('dist/css'))
    //.pipe(browserSync.stream());
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite:'../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist'))
    //.pipe(browserSync.stream());
}

const scripts = () => {
    src('src/js/lib/*.js')
    .pipe(dest('dist/js'));

    return src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    //.pipe(browserSync.stream());
}

const scriptsBuild = () => {
    src('src/js/lib/*.js')
    .pipe(dest('dist/js'));

    return src('src/js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify({
        toplevel: true
    }).on('error',notify.onError()))
    .pipe(dest('dist/js'))
}

const scriptsDebug = () => {
  return src('src/js/*.js')
  .pipe(dest('dist/js'))
  //.pipe(browserSync.stream());
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.png',
        'src/img/*.svg',
        'src/img/**/*.jpeg'
    ])
    .pipe(image())
    .pipe(dest('dist/img'))
    //.pipe(browserSync.stream());
}

const favicon = () => {
   return src('src/*.ico')
  .pipe(dest('dist'));
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir:'dist'
        }
    });
}

let htmlSeries = series(favicon, svgSprites, htmlInclude);

watch('src/sass/**/*.scss', stylesSass);
watch('src/css/**/*.css', stylesDebug);
watch('src/img/svg/**/*.svg', htmlSeries);

watch('src/js/**/*.js', scriptsDebug);
watch('src/*.*', series(favicon, htmlInclude));
watch('src/**/*.html', htmlInclude);

watch('src/img/*.*', images);
watch('src/img/320/*.*', images);
watch('src/img/768/*.*', images);
watch('src/img/1024/*.*', images);


//exports.styles = styles;
exports.svgSprites = svgSprites;
exports.scripts = scripts;
exports.clean = clean;
exports.stylesSass = stylesSass;
exports.watchFiles = watchFiles;
exports.img = images;


/* Сборка для build*/

exports.build = series(clean, htmlSeries, stylesSassBuild, stylesBuild,  images, fonts, scriptsBuild);

/* Сборка для dev */
exports.default = series(clean, htmlSeries, stylesSass, stylesDebug, images, fonts, scripts, watchFiles);

exports.debug = series(htmlSeries, stylesSass, stylesDebug, fonts, scriptsDebug);
