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
	      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
	      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
	      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
	      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
	      {
	        test: /\.scss$/,
	        loader: "style!css!sass"
	      },
	      {
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        loaders: ["babel-loader"]
	      }
	    ],
			preLoaders: [
				{
					test: /\.jsx?$/,
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
