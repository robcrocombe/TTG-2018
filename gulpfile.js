const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

let firstRun = true;

const jsConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|build)/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src/app.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'app.bundle.js',
  },
  plugins: [new CheckerPlugin()],
};

function jsDev() {
  new WebpackDevServer(webpack(jsConfig), {
    contentBase: path.join(__dirname, 'build'),
    stats: {
      colors: gutil.colors.supportsColor,
      hash: false,
      timings: false,
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
    },
  }).listen(3000, 'localhost', err => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/');
  });
}

function jsProd() {
  const config = Object.assign(
    {
      plugins: [new webpack.optimize.UglifyJsPlugin()],
    },
    jsConfig
  );

  webpack(config);
}

function htmlCopy() {
  return gulp.src('src/index.html').pipe(gulp.dest('build/'));
}

gulp.task('dev:build', jsDev);
gulp.task('pro:build', jsProd);
gulp.task('dev:html', htmlCopy);
gulp.task('default', ['dev:html'], jsDev);
