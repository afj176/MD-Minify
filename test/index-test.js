/*global describe, beforeEach, it*/
'use strict';

var assert = require('assert'),
		path = require('path'),
		mdm = require('../index');

var path, min, example, readme, config, configPath;

describe('Markdown Minifier Test', function() {

	beforeEach(function(done) {
		readme = mdm.read(path.join(__dirname, 'example-readme.md'));
		done();
	});

	describe('convert markdown file', function() {
		it('should convert markdown and output to console minified markdown', function(done) {
			readme.then(function(content){
				min = mdm.parseEsc(content);
				example = '# EXAMPLE README\\r\\n\\r\\n![alt "Hero"](http://placehold.it/700x400 "Featured Image")'+
									'\\r\\n\\r\\n## Production Recommendations\\r\\n\\r\\nDuring development I work with'+
									' multiple CSS files as needed, and multiple JS files for each part of the site or '+
									'functionality. But when I move to production, I normally put together a build setup '+
									'that optimizes the code for production.\\r\\n\\r\\n> Email-style angle brackets\\r\\n>'+
									' are used for blockquotes.\\r\\n\\r\\n> > And, they can be nested.\\r\\n\\r\\n> #### Headers'+
									' in blockquotes\\r\\n> \\r\\n> * You can quote a list.\\r\\n> * Etc.    \\r\\n\\r\\n## Optional'+
									' Helper Shell Script\\r\\n\\r\\nThe `site` file is a helper script that will take care'+
									' of setting up a new directory for you to start working on your new site. This script '+
									'will first create the directory then export all the needed files (without the `.git` '+
									'directory or any `.git*` files) to the new directory. This is the preferred method'+
									' of utilizing this template framework.\\r\\n\\r\\nYou can use the `site` command '+
									'via the command line, like this:\\r\\n\\r\\n    ./site /path/to/new/site\\r\\n\\r\\n'+
									'You may need to mark this script as executable before using it:\\r\\n\\r\\n    chmod +x'+
									' site\\r\\n\\r\\nFinally, you can move this file to /usr/bin to use the `site` command '+
									'from any directory. If you do this, be sure to uncomment the `cd ~/Development...` line'+
									' and update the path to the location of this git repository on your local computer.'+
									'\\r\\n\\r\\nThat\'s some text with a footnote.[^1]\\r\\n\\r\\n[^1]: And that\'s'+
									' the footnote.';
				assert.equal(min, example, 'Minified markdown match.');
				console.log(min);
				done();
			});
		});
	});

	describe('convert markdown and inject into json file', function() {

		beforeEach(function(done) {
			configPath = path.join(__dirname, 'example-json.json');
			config = mdm.read(configPath);
			done();
		});

		it('should take a file path to a markdown file', function(done) {
			readme.then(function(content){
				min = mdm.parse(content);
				config.then(function(conf){
					var toBeConf = JSON.parse(conf.toString());
					toBeConf.readme = min;
					mdm.saveConfig(configPath, toBeConf).then(function () {
					    return mdm.read(configPath);
					}).then(function (writtenConf) {
						assert.ok(mdm.compare(writtenConf, toBeConf), 'Updated json file.');
						done();
					});
				});
			});
		});
	});
});
