require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    var exec = require('child_process').exec;
    var cmd = 'zip -r ' + config.build.assetsRoot + '/dist.zip ' + config.build.assetsRoot;

    exec(cmd, function(error, stdout, stderr) {
      console.log(chalk.cyan(
        '  Created dist.zip:\n' + stdout
      ))
    });
  })
  rm(path.join(config.build.assetsRoot, "dist.zip"), err => {
    if (err) throw err
  })
})
