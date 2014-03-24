# MD Minify

### Markdown Minification

```command line tool and requirable module```

```bash
npm install mdm -g
```

![alt "Markdown Minify"](http://f.cl.ly/items/30031C1i1p2Y400f1p0c/md-minify.gif "Markdown Minify")

## Why?

* Wanted to convert markdown to a string
* Wanted to be able to inject markdown into json config files as a property.

## Usage

There are two ways to use mdm.
You can install it globally and use it from the command line,
or you can require it in your project.

#####From the command line:

You can use the `mdm` command on a markdown file
and it will output the results to the console:

```bash
mdm example-readme.md
```

Pipe the results to a file:

```bash
mdm example-readme.md > example-readme.txt
```

If you include a json file as a second argument it will add a property of `"readme":`

```bash
mdm example-readme.md example-json.json
```


#####Example usage in your project:

```javascript
var express = require('express'),
    mdm = require('mdm');


    mdm.read(__dirname + "/example-readme.md")
    .then(function(content){
      var readme = mdm.parse(content);
      // do something with content
      // add to config file
      // or save to db
    }).catch(function(error){
      console.log(error.message);
      // do something with error
    });
```

## Methods

### read(Path)

`read` is a wrapper around [[q-io/fs read]](https://github.com/kriskowal/q-io), it takes a markdown file and reads its entire contents into memory. It returns a promise for the whole file contents.

```javascript
return mdm.read(__dirname + '/example-markdown.md')
.then(function (content) {
    // ...
})
```

### parse(Buffer) & parseEsc(Buffer)

`parse` replaces line returns with `\r\n` and returns string.

```javascript
var parsedContent = mdm.parse(content);
```

`parseEsc` escapes line returns (`\\r\\n`) and returns string.

```javascript
var parsedEscContent = mdm.parseEsc(content);
```

### saveConfig(Path, String)

`saveConfig` takes a path to a config file and the parsed content, and adds a readme property to the config file.
It returns a promise for the whole file contents.
```javascript
return mdm.saveConfig(__dirname + '/example-json.json', configData)
.then(function (content) {
    // ...
})
```

### compare([String|Object], Object)

`compare` an object or JSON.parsable string against another object.  It returns true or false.

```javascript
mdm.compare([String|Object], Object)
// returns true or false
```
