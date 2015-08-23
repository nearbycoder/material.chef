var webpack = require("webpack"),
	path = require("path");

// Karma configuration
// Generated on Mon May 11 2015 14:13:57 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
		"./test/specs/**/*.test.js"
    ],
    preprocessors: {
		"./test/specs/**/*.test.js": ["webpack"]
    },
	webpack: {
		module: {
			loaders: [
        {test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]},
				{ test: /\.scss$/, loader: "style!css!sass" }
			],
			preLoaders: [
				{
					test: /(\.jsx)|(\.js)$/,
					exclude: /(test|node_modules)\//,
					loader: 'isparta-instrumenter-loader'
				}
			]
		}
	},
	webpackMiddleware: {
		noInfo: true
	},
	plugins: [
		require("karma-webpack"),
		require("karma-jasmine"),
		require("karma-chrome-launcher"),
		require('karma-jasmine-html-reporter'),
		require('karma-coverage')
	],
    reporters: ['html','progress','coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
		coverageReporter: {
      type: 'html',
      dir: 'coverage/'
		}
  });
};
