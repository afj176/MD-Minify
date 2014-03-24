'use strict';

var FS, mdm, _;

FS = require('q-io/fs');

_ = require('underscore');

mdm = module.exports;

mdm.read = function(markdown) {
	return FS.read(markdown);
};

mdm.pat = /[\r\n|\n|\r]/gm;

mdm.parse = function(txt){
	return txt.toString().replace(mdm.pat, '\r\n');
};

mdm.parseEsc = function(txt){
	return txt.toString().replace(mdm.pat, '\\r\\n');
};

mdm.saveConfig = function(path, toBeConf){
	return FS.write(path, JSON.stringify(toBeConf, null, 2));
};

mdm.compare = function(writtenConf, toBeConf){
	var conf = (_.isString(writtenConf)) ? JSON.parse(writtenConf) : writtenConf;
	return _.isEqual(conf, toBeConf);
};
