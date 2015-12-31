'use strict';
var fs = require('graceful-fs');
var globby = require('globby');
var pify = require('pify');
var Promise = require('pinkie-promise');
var File = require('vinyl');
var vinylFile = require('vinyl-file');
var fsP = pify(fs, Promise);
module.exports = function (glob, opts) {
	opts = opts || {};

	var cwd = opts.cwd || process.cwd();
	var base = opts.base || cwd;

	return globby(glob, {cwd: cwd}).then(function (paths) {
		return Promise.all(paths.map(function (pth) {
			return fsP.stat(pth).then(function (stat) {
				if (stat.isDirectory()) {
					return Promise.resolve(new File({
						cwd: cwd,
						base: base,
						path: pth,
						stat: stat
					}));
				}

				return vinylFile.read(pth, opts);
			});
		}));
	});
};

module.exports.sync = function (glob, opts) {
	opts = opts || {};

	var cwd = opts.cwd || process.cwd();
	var base = opts.base || cwd;

	return globby.sync(glob, {cwd: cwd}).map(function (pth) {
		var stat = fs.statSync(pth);

		if (stat.isDirectory()) {
			return new File({
				cwd: cwd,
				base: base,
				path: pth,
				stat: stat
			});
		}

		return vinylFile.readSync(pth, opts);
	});
};
