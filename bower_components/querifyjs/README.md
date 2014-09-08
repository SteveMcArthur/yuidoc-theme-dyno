# Querify JS

[![Build Status](https://secure.travis-ci.org/pflannery/querifyjs.png?branch=master)](http://travis-ci.org/pflannery/querifyjs "Check this project's build status on TravisCI")
[![NPM version](https://badge.fury.io/js/querifyjs.png)](https://npmjs.org/package/querifyjs "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/pflannery.png)](https://www.gittip.com/pflannery/ "Donate weekly to this project using Gittip")
[![Analytics](https://ga-beacon.appspot.com/UA-47157500-1/querifyjs/readme)](https://github.com/pflannery/querifyjs)

A No-SQL object query library made for javascript

## Documentation

[Library API](http://pflannery.github.io/querifyjs/api/modules/QuerifyJs.html)

## Examples

```javascript

var querify = requires("querifyjs");

var model = {
	name: 'querify js',
	year: 2014
};

var query = {
	name: {
		$equals: 'querify js'
	},
	/* explicit $and operation */
	$and: {
		year: {
			$typeof: 'number'
		}
	}
};

// returns a promise
querify.one(model, query)
    .then(function(result) {

    }).catch(function(error) {

    });

```

```javascript
var querify = requires("querifyjs");

var model = {
    name: 'querify js',
    year: 2014
};

var query = {
    name: {
        $equals: 'querify js'
    },
    /* implicit $and operation */
    year: {
            $typeof: 'number'
    }
};

// returns a promise
querify.one(model, query)
    .then(function(result) {

    }).catch(function(error) {

    });
```

####Operations

|name|description
|----|-----------
|$and   	    |The logical AND operator (&&)
|$or         	|The logical OR operator (||)
|$not        	|The logical negation operator (!) reverses the result of all operations beneath it

####Compare methods

|name|description
|----|-----------
|$equals   	    |===
|$regexp        |regular expression
|$left        	|left
|$right         |right
|$typeof        |typeof
|$instanceof    |instanceof
|$toLowerCase	|toLowerCase
|$toUpperCase	|toUpperCase
|$inArray	    |matches against an array of values
|$has		    |matches model property names against a single or an array of value(s)
|$queryOne      |matches a query against the models children properties. i.e. much like (return querify.one(model, query))

All compare methods are\can-be registered in querify.config.compareMethods array

Example custom compare methods:
```javascript
// direct compare result
$myEquals: function(modelValue, testValue) {
	return modelValue === testValue;
},...

// deferred compare using a promise
$userNameExists: function(modelValue, testValue) {

    	return new Promise(function(fulfil, reject) {
	        setTimeout(function() {
	            fulfil(modelValue === testValue);
	        }, 5000);
    	});
    	
},...

```		

## Contributing
Feel free to submit ideas and issues.

## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2014+ Stringz Solutions Ltd
<br/>Copyright &copy; 2014+ [Peter Flannery](http://github.com/pflannery)
