#! /usr/bin/env node

'use strict';
var args, argLength, mdm, chalk, readme, exit,
		command, configPath, config, usage, pathMessage;

mdm = require('../index');
chalk = require('chalk');

exit = function(msg){
	console.log(chalk.red(msg));
	process.exit(1);
};

pathMessage = function(mdFileName, configName){
	var da, sa, infoMd, infoConf, confProp;
	da = chalk.yellow(' => ');
	sa = chalk.yellow(' ->');
	infoMd = chalk.blue(mdFileName);
	infoConf = chalk.blue(configName);
	confProp = chalk.cyan(' "readme":');
	return infoMd + da + infoConf + sa + confProp;
};

args = process.argv.slice(2);

argLength = args.length;

usage = chalk.yellow('Usage:') +
chalk.gray('\n  mdm example-readme.md') +
chalk.gray('\n  mdm example-readme.md example-json.json') +
chalk.gray('\n  mdm example-readme.md > example-text.txt');

if(argLength){
	if(argLength < 2){
		command = 1;
	}else if(argLength > 2){
		exit(usage);
	}else if(argLength === 2){
		command = 2;
	}else{
		exit(usage);
	}
}else{
	exit(usage);
}

readme = mdm.read(args[0]);

readme.then(function(content){
	var min;

	if(command == 1){
		min = mdm.parseEsc(content);
		console.log(chalk.gray(min));
	}

	if(command == 2){
		min = mdm.parse(content);
		configPath = args[1];
		config = mdm.read(configPath);
		config.then(function(conf){
			console.log(chalk.yellow('Processing....'));
			var toBeConf = JSON.parse(conf.toString());
			toBeConf.readme = min;
			mdm.saveConfig(configPath, toBeConf).then(function () {
					console.log(pathMessage(args[0], args[1]));
			    return mdm.read(configPath);
			}).then(function (writtenConf) {
				if(mdm.compare(writtenConf, toBeConf)){
					console.log(chalk.green('successfully updated ' + configPath));
				}else{
					exit('failed to update ' + configPath);
				}
			});
		});
	}

});
