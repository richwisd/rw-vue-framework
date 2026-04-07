const path = require('path');
const { Transform } = require('stream');
const { dest, parallel, series, src } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const consola = require('consola');
const postcss = require('postcss');
const cssnano = require('cssnano');

// 使用 require 方式导入 epOutput
const { epOutput } = require('@rw-vue-framework/build-utils');

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(epOutput, 'theme-chalk');

/**
 * using `postcss` and `cssnano` to compress CSS
 * @returns
 */
function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // avoid color transform
          colormin: false,
          // avoid font transform
          minifyFontValues: false,
        },
      ],
    }),
  ]);
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk;
      if (file.isNull()) {
        callback(null, file);
        return;
      }
      if (file.isStream()) {
        callback(new Error('Streaming not supported'));
        return;
      }
      const cssString = file.contents.toString();
      processor.process(cssString, { from: file.path }).then((result) => {
        const name = path.basename(file.path);
        file.contents = Buffer.from(result.css);
        // 移除 chalk 使用，直接使用字符串
        consola.success(
          `${name}: ${cssString.length / 1000} KB -> ${result.css.length / 1000} KB`
        );
        callback(null, file);
      });
    },
  });
}

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
function buildThemeChalk() {
  // 使用现代 API 方式，确保兼容 Dart Sass 2.0.0
  const sass = gulpSass(dartSass);
  const noElPrefixFile = /(index|base|display)/;
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass().on('error', sass.logError))  // 使用现代 API
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `el-${path.basename}`;
        }
      })
    )
    .pipe(dest(distFolder));
}

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
}

/**
 * copy source file to packages
 */
function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  );
}

exports.build = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, copyThemeChalkBundle)
);

exports.default = exports.build;
