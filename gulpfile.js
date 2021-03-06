// TODO: Update HardSourceWebpackPlugin when fixed
// https://github.com/mzgoddard/hard-source-webpack-plugin/issues/299
process.noDeprecation = true;

const gulp = require('gulp');
const gutil = require('gulp-util');
const ghPages = require('gulp-gh-pages');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

let firstRun = true;
const destDir = process.env.NODE_ENV === 'production' ? 'dist/' : 'build/';

// Stop HardSourceWebpackPlugin from printing info about its cache
class SilentHardSource {
  apply(compiler) {
    compiler.plugin('hard-source-log', message => {
      if (message.level === 'error' || message.level === 'warning') {
        console[message.level].call(console, `[hard-source:${message.from}]`, message.message);
      }
    });
  }
}

// Log which files have changed on watch
class ChangedFilesWatcher {
  apply(compiler) {
    compiler.plugin('watch-run', (compiler, done) => {
      const changedTimes = compiler.watchFileSystem.watcher.mtimes;
      const changedFiles = Object.keys(changedTimes)
        .map(file => `\n  ${path.relative(__dirname, file)}`)
        .join('');
      if (changedFiles.length) {
        console.log('\nFiles changed:', changedFiles);
      }
      done();
    });
  }
}

const statConfig = {
  colors: gutil.colors.supportsColor,
  hash: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false,
};

const jsConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|build)/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          cacheDirectory: '.wpcache/ats-cache',
        },
      },
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src/app.ts'),
  },
  output: {
    path: path.resolve(__dirname, destDir),
    filename: 'bundle.js',
  },
  plugins: [
    new CheckerPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '.wpcache/hard-source/[confighash]'),
    }),
    new SilentHardSource(),
    new ChangedFilesWatcher(),
  ],
  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV !== 'production',
};

function jsDev() {
  new WebpackDevServer(webpack(jsConfig), {
    contentBase: path.join(__dirname, destDir),
    stats: statConfig,
  }).listen(3000, 'localhost', err => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/');
  });
}

function jsProd() {
  return new Promise((resolve, reject) => {
    webpack(jsConfig, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.compilation.errors && stats.compilation.errors.length) {
        reject(stats.toString(statConfig));
        return;
      }

      gutil.log('[webpack]', stats.toString(statConfig));

      resolve();
    });
  });
}

function htmlCopy() {
  return gulp.src('src/index.html').pipe(gulp.dest(destDir));
}

function assetCopy() {
  return gulp.src('assets/*.*').pipe(gulp.dest(`${destDir}assets`));
}

function deploy() {
  return gulp.src('./dist/**/*').pipe(ghPages());
}

gulp.task('dev:build', jsDev);
gulp.task('pro:build', jsProd);
gulp.task('copy:html', htmlCopy);
gulp.task('copy:assets', assetCopy);
gulp.task('deploy', deploy);
gulp.task('dist', gulp.series('copy:html', 'copy:assets', 'pro:build', 'deploy'));
gulp.task('default', gulp.series('copy:html', 'copy:assets', 'dev:build'));
