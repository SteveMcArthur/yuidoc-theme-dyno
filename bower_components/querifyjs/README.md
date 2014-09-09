# Querify JS

[![Build Status](https://secure.travis-ci.org/pflannery/querifyjs.png?branch=master)](http://travis-ci.org/pflannery/querifyjs "Check this project's build status on TravisCI")
[![NPM version](https://badge.fury.io/js/querifyjs.png)](https://npmjs.org/package/querifyjs "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/pflannery.png)](https://www.gittip.com/pflannery/ "Donate weekly to this project using Gittip")
[![Analytics](https://ga-beacon.appspot.com/UA-47157500-1/querifyjs/readme)](https://github.com/pflannery/querifyjs)

A No-SQL object query library made for javascript

## Documentation

[Library API](http://pflannery.github.io/querifyjs/)

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

####Api
|name|description
|----|-----------
|one   	        |Tests one model object against a query object
|some         	|Tests if any of the models from an array matches against a query object
|many        	|Tests if an array of model objects matches against a query object
|filter       	|Filters an array of model objects against a query object

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
|$queryOne      |matches a query against the model children properties. i.e. return querify.one(model, query)
|$queryMany     |matches a query against an array of models. i.e. return querify.many(modelArray, query)
|$querySome     |matches a query against an array of models. i.e. return querify.some(modelArray, query)

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
