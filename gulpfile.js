const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const image = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();


const clean = () => {
    del(['src/css/**.css']);
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
    .pipe(browserSync.stream());
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

const styles = () => {
    src(['src/css/lib/normalize.min.css','src/css/lib/*.css'])
    .pipe(concat('style_lib.min.css'))
    .pipe(dest('dist/css'));

    return src('src/css/*.css')
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
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
    .pipe(browserSync.stream());
}

const scripts = () => {
    src('src/js/lib/*.js')
    .pipe(dest('dist/js'));

    return src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

const scriptsBuild = () => {
    return src('dist/js/*Script.min.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify({
        toplevel: true
    }).on('error',notify.onError()))
    .pipe(dest('dist/js'))
}

// просто переписывает скрипты
/*const scriptsDebug = () => {
  return src('src/js/*.js')
  .pipe(dest('dist/js/*.min.js'))
  .pipe(browserSync.stream());
}*/ // использовалось на начальном этапе разработки

const scriptLib = () => {
  return src('src/js/lib/*.js')
  .pipe(concat('scriptLib.min.js'))
  .pipe(dest('dist/js'))
}

/* подключаем только нужные для модуля скрипты в о дин файл*/
   const scriptInclude = () => {
    return src('src/js/script/*.js')
    .pipe(fileInclude({
        prefix: '@',
        basepath: '@file'
    }))
    .pipe(dest('dist/js'))
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
    .pipe(browserSync.stream());
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
let scriptSeriesDebug = series(scriptLib, scriptInclude);
let scriptSeries = series(scriptLib, scriptInclude, scriptsBuild);

watch('src/sass/**/*.scss', stylesSass);
watch('src/css/**/*.css', styles);
watch('src/img/svg/**/*.svg', htmlSeries);

watch('src/js/**/*.js', scriptSeriesDebug);
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
// сжимает стили и скрипты
exports.build = series(clean, htmlSeries, stylesSassBuild, styles,  images, fonts, scriptSeries, watchFiles);

/* Сборка для dev */
//ничего не делает со скриптами, и стилями, только обьединяет
exports.default = series(clean, htmlSeries, stylesSass, styles, images, fonts, scriptSeriesDebug, watchFiles);

/* сборка для отладки, не переписывает картинки*/
exports.debug = series(htmlSeries, stylesSass, styles, fonts, scriptSeriesDebug, watchFiles);
