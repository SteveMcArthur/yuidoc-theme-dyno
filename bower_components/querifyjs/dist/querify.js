/**
 * ###A No-SQL object query library made for javascript
 *
 * ####Installing:
 *
 * ######NodeJs:
 *
 * Will automatically reference any dependencies.
 *
 *      run ```npm install querifyjs --save```
 *
 * ######Bower:
 *
 *      run ```bower install querifyjs --save```
 *
 *
 * ####Referencing:
 *
 * ######Browser:
 *
 * Dependencies:
 *
 * [promise-extras](http://github.com/pflannery/promise-extras)
 *
 * [dist/querify.all.min.js](https://github.com/pflannery/querifyjs/) includes all dependencies
 *
 *      <script type="application/javascript" src="path/to/lib/querify.all.min.js"></script>
 *
 * otherwise manually place before Querify library i.e.
 *
 *      <script type="application/javascript" src="path/to/lib/promise-extras.min.js"></script>
 *      <script type="application/javascript" src="path/to/lib/querify.min.js"></script>
 *
 ```javascript
 // global QueryRunner instance
 var querify = window.querify;

 //create a new QueryRunner instance
 var QueryRunner = querify.QueryRunner;
 var querify = new QueryRunner(config, sharedContext);
 ```
 *
 * ######NodeJs:
 *
 ```javascript
 // global QueryRunner instance
 var querify = require("querifyjs");

 //create a new QueryRunner instance
 var QueryRunner = require("querifyjs").QueryRunner;
 var querify = new QueryRunner(config, sharedContext);
 ```
 *
 * @module QuerifyJs
 */
(function () {
	"use strict";

	var isBrowser = typeof window !== "undefined",
		$Promise, $promiseExtras;

	function resolveBrowserPromiseLib() {
		if (window.Promise) {
			return window.Promise;
		} else {
			throw new ReferenceError("Promise library could not be detected for this browser.");
		}
	}

	function resolveBrowserpromiseExtrasLib() {
		if (window.promiseExtras) {
			return window.promiseExtras;
		} else {
			throw new ReferenceError("Promise-extras library could not be detected for this browser.");
		}
	}

	// attempt to get the Promise ref
	if (isBrowser === true) {
		$Promise = resolveBrowserPromiseLib();
	} else {
		$Promise = require("promise");
	}

	// attempt to get the Promise ref
	if (isBrowser === true) {
		$promiseExtras = resolveBrowserpromiseExtrasLib();
	} else {
		$promiseExtras = require("promise-extras");
	}

	var library = (function (Promise, promiseExtras) {

		function logQuery() {

			var args = [],
				queryTrail = arguments[0],
				argIndex;

			for (argIndex = 1; argIndex < arguments.length; argIndex++) {
				args.push(arguments[argIndex]);
			}

			var newStackEntry = {
				level: args[0],
				operation: args[1]
			};

			// store the new stack entry
			queryTrail.push(newStackEntry);

		}

		var defaultConfig = {
			/**
			 * Default compare methods.
			 *
			 * @class CompareMethods
			 * @static
			 *
			 */
			compareMethods: {
				/**
				 * Default compare method that is used when no compare method is specified in the query.
				 *
				 * @method $default
				 * @param modelValue
				 * @param testValue Can be either a string value or a {Regexp}
				 * @return {Boolean}
				 *
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          author: 'cyborg',
				 *          title: 'cybertron'
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          author: 'cyborg',
				 *          title: /^cyber/
				 *      };
				 */
				$default: function (modelValue, testValue) {
					var compareMethods = this.config.compareMethods;
					if (testValue instanceof RegExp)
						return compareMethods.$regexp(modelValue, testValue);
					else
						return compareMethods.$equals(modelValue, testValue);
				},
				/**
				 * Equality and type check. Equivalent to using '==='
				 * @method $equals
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 *
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          name: {
				 *              $equals: 'cyborg'
				 *          }
				 *      };
				 */
				$equals: function (modelValue, testValue) {
					return modelValue === testValue;
				},
				/**
				 * Regular expression
				 * @method $regexp
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          age: {
				 *              $regexp: /\d/ig
				 *          }
				 *      };
				 */
				$regexp: function (modelValue, testValue) {
					return testValue.test(modelValue)
				},
				/**
				 * Match a {String} from the left
				 * @method $left
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          age: {
				 *              $left: 'cyb'
				 *          }
				 *      };
				 */
				$left: function (modelValue, testValue) {
					return modelValue.substring(0, testValue.length) === testValue;
				},
				/**
				 * Matches a {String} from the right
				 * @method $right
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          age: {
				 *              $right: 'org'
				 *          }
				 *      };
				 */
				$right: function (modelValue, testValue) {
					var offset = modelValue.length - testValue.length;
					return modelValue.substring(offset) === testValue;
				},
				/**
				 * Typeof
				 * @method $typeof
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          age: {
				 *              $typeof: 'number'
				 *          }
				 *      };
				 */
				$typeof: function (modelValue, testValue) {
					return typeof modelValue === testValue;
				},
				/**
				 * instanceof
				 * @method $instanceof
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          age: {
				 *              $instanceof: Object
				 *          }
				 *      };
				 */
				$instanceof: function (modelValue, testValue) {
					return modelValue instanceof testValue;
				},
				/**
				 * Converts the modelValue to lower case before making the comparison
				 * @method $toLowerCase
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'CYBORG',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          name: {
				 *              $toLowerCase: 'cyborg'
				 *          }
				 *      };
				 */
				$toLowerCase: function (modelValue, testValue) {
					return modelValue.toLowerCase() === testValue;
				},
				/**
				 * Converts the modelValue to upper case before making the comparison
				 * @method $toUpperCase
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          name: {
				 *              $toUpperCase: 'CYBORG'
				 *          }
				 *      };
				 */
				$toUpperCase: function (modelValue, testValue) {
					return modelValue.toUpperCase() === testValue;
				},
				/**
				 * Matches the modelValue against an array of values
				 * @method $inArray
				 * @param modelValue
				 * @param testArray
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          name: {
				 *              $inArray: ['cyborg', 'or-me']
				 *          }
				 *      };
				 */
				$inArray: function (modelValue, testArray) {
					return testArray.indexOf(modelValue) !== -1;
				},
				/**
				 * Matches the model property names against a single or an array of value(s)
				 * @method $has
				 * @param modelValue
				 * @param testValue
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          name: 'cyborg',
				 *          age: 123
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          $has: 'name'
				 *      };
				 */
				$has: function (modelValue, testValue) {
					if (testValue instanceof Array) {
						return testValue.every(function (testItemValue) {
							return (testItemValue in modelValue);
						});
					} else {
						return testValue in modelValue;
					}
				},
				/**
				 * Matches a query against the model children properties. i.e. return querify.one(model, query)
				 * @method $queryOne
				 * @param modelValue
				 * @param query
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          book: {
				 *              title: 'test',
				 *              author: 'fred'
				 *          }
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          book: {
				 *              $queryOne: {
				 *                  title: {
				 *                      $equals: 'test'
				 *                  }
				 *              }
				 *          }
				 *      };
				 */
				$queryOne: function (modelValue, query) {
					return executeQuery.call(this, modelValue, query, false);
				},
				/**
				 * Matches a query against an array of models. i.e. return querify.many(modelArray, query)
				 * @method $queryMany
				 * @param modelArray
				 * @param query
				 * @return {Boolean}
				 * @example
				 *      // the data to query
				 *      var model = {
				 *          books: [{
				 *              title: 'test',
				 *              author: 'fred'
				 *          }, {
				 *              title: 'another book',
				 *              author: 'fred'
				 *          }]
				 *      };
				 *
				 *      // the query
				 *      var query = {
				 *          books: {
				 *              $queryMany: {
				 *                  author: {
				 *                      $equals: 'fred'
				 *                  }
				 *              }
				 *          }
				 *      };
				 */
				$queryMany: function (modelArray, query) {
					var scope = this;
					// iterates the promises until false or error
					return promiseExtras.every(modelArray, function (model, modelIndex, fulfil) {
						fulfil(executeQuery.call(scope, model, query, false));
					});
				},
				/**
				 * Matches a query against an array of models. i.e. return querify.some(modelArray, query)
				 * @method $querySome
				 * @param modelArray
				 * @param query
				 * @return {Boolean}
				 * @example
				 *
				 * // same as $queryMany except iterates until finds first match, no matches or errors
				 *
				 */
				$querySome: function (modelArray, query) {
					var scope = this;
					// iterates the promises until finds first match, no matches or errors
					return promiseExtras.some(modelArray, function (model, modelIndex, fulfil) {
						fulfil(executeQuery.call(scope, model, query, false));
					});
				}
			}
		};

		function executeAnd(model, operations, negateCompare, modelValue) {
			// log current operation
			logQuery(this.queryTrail, this.queryLevel, '$and');

			// execute the $and operation
			return executeQuery.call(this, model, operations, negateCompare, modelValue);
		}

		function executeOr(model, operations, negateCompare, modelValue) {
			// log current operation
			logQuery(this.queryTrail, this.queryLevel, '$or');

			// execute the $and operation
			return executeQuery.call(this, model, operations, negateCompare, modelValue);
		}

		function executeNot(model, operations, modelValue) {
			// store the $not stack index so we can set it's result after
			var stackIndex = this.queryTrail.length;

			// log current operation
			logQuery(this.queryTrail, this.queryLevel, '$not');

			// execute the $not operation
			var result = executeQuery.call(this, model, operations, true, modelValue);

			// save the result to the queryTrail
			this.queryTrail[stackIndex].result = result;

			// return the result
			return result;
		}

		function executeCompare(operationkey, operations, negateCompare, modelValue, reject) {
			// log current operation
			logQuery(this.queryTrail, this.queryLevel, operationkey);

			// check if we have a compare method
			var compareMethod = this.config.compareMethods[operationkey];
			if (compareMethod === undefined) {
				reject(new ReferenceError("No compare method was found for: " + operationkey));
				return false;
			}

			// check if we have anything to process
			var compareValue = operations[operationkey];

			// execute the compareMethod
			var result = compareMethod.call(this, modelValue, compareValue);

			// negate the result if need be
			if (negateCompare) {
				result = !result;
			}

			// set the result for the current operation to the queryTrail
			this.queryTrail[this.queryTrail.length - 1].result = result;

			// return the result
			return result;
		}

		function executeValueOperations(model, operationkey, operations, negateCompare) {
			// log current operation
			logQuery(this.queryTrail, this.queryLevel, operationkey);

			var modelValue = model[operationkey];

			var descendantOps = operations[operationkey];
			if (descendantOps === undefined) {
				throw new ReferenceError("No operation property was found for: " + operationkey)
			}

			// execute the modelValue operations
			return executeQuery.call(this, model, descendantOps, negateCompare, modelValue);
		}

		function executeQuery(model, operations, negateCompare, modelValue) {
			var context = this,
				operationKeys,
				hasOrOperation;

			if (negateCompare === undefined) {
				negateCompare = false;
			}

			// increment the query level
			context.queryLevel++;

			// use default compare if operations is not an object
			if (operations instanceof RegExp || typeof operations !== 'object'){
				operations = {
					'$default': operations
				};
			}

			// get the operation keys
			operationKeys = Object.keys(operations);

			// pop the $or if exists
			hasOrOperation = '$or' in operations;
			if (hasOrOperation === true) {
				operationKeys = operationKeys.filter(function (element) {
					return element !== '$or';
				})
			}

			// loop the operation keys
			return promiseExtras.every(operationKeys, function (operationkey, operationIndex, fulfil, reject) {
				var result = false;

				if (operationkey[0] === '$') {

					if (modelValue === undefined) {
						modelValue = model;
					}

					if (operationkey === '$not') {
						result = executeNot.call(context, model, operations.$not, modelValue);
					} else if (operationkey === '$and') {
						result = executeAnd.call(context, model, operations.$and, negateCompare, modelValue);
					} else {
						result = executeCompare.call(context,
							operationkey,
							operations,
							negateCompare,
							modelValue,
							reject
						);
					}

				} else {
					result = executeValueOperations.call(context, model, operationkey, operations, negateCompare);
				}

				fulfil(result);

			}).then(function (result) {
				// the condition where promiseExtras.every passes over an empty array and returns true
				if (operationKeys.length === 0) {
					result = false;
				}

				// run the $or if present and when the result is false
				if (hasOrOperation && result === false) {
					result = executeOr.call(context, model, operations.$or, negateCompare, modelValue);
				}

				return result;

			}).then(function (result) {
				// decrement the query level
				context.queryLevel--;
				return result;

			});
		}

		/**
		 * Class for creating independent instances.
		 *
		 * @class QueryRunner
		 *
		 * @constructor
		 * @param {Object} config
		 * @param {CompareMethods} config.compareMethods
		 * @param {Object} sharedContext
		 *      passed to custom compare methods
		 *
		 */
		function QueryRunner(config, sharedContext) {
			// fallback to default config if not supplied
			this.config = config || defaultConfig;

			// init the queryTrail object
			this.queryTrail = [];

			// fallback to an empty object if not supplied
			this.sharedContext = sharedContext || {};
		}

		QueryRunner.prototype = {

			/**
			 * Class for creating an independent instance
			 *
			 * @property QueryRunner
			 * @type QueryRunner
			 *
			 * @example
			 *      // return
			 *      var runner = new QueryRunner()
			 *
			 */
			QueryRunner: QueryRunner,
			/**
			 * Contains global config.
			 *
			 * @property config
			 * @type Object
			 * @param {String} config.defaultCompareMethod
			 * @param {CompareMethods} config.compareMethods
			 */
			config: defaultConfig,
			/**
			 * Stores the query trail from the last call to one, many or filter
			 *
			 * @property queryTrail
			 * @type Array
			 *
			 */
			queryTrail: [],
			/**
			 * Tests if any of the models from an array match against a query object
			 *
			 * @method some
			 * @param modelArray
			 * @param query
			 * @return {Promise} who's result is set to a {Boolean}.
			 *
			 * @example
			 *      // the data to query
			 *      var model = [{
			 *          name: 'cyborg',
			 *          age: 123
			 *      }, {
			 *          name: 'borg',
			 *          age: 223
			 *      }];
			 *
			 *      // the query
			 *      var query = {
			 *          age: {
			 *              $equals: 223
			 *          }
			 *      };
			 *
			 *      // run the query
			 *      querify.some(model, query)
			 *              .then(function (result) {
			 *                  // the result, true or false
			 *              }).catch (function (error) {
			 *                  // catch any errors
			 *              })
			 *              .then(function () {
			 *                  // finally
			 *              });
			 *
			 */
			some: function (modelArray, query) {
				// setup the query logging stack
				var context = this;
				context.queryTrail = [];
				context.queryLevel = 0;

				if (modelArray === undefined) {
					return Promise.reject(new ReferenceError("Unspecified model array."));
				}

				if (query === undefined) {
					return Promise.reject(new ReferenceError("Unspecified query."));
				}

				// iterates the promises until false or error
				return promiseExtras.some(modelArray, function (model, modelIndex, fulfil) {
					fulfil(executeQuery.call(context, model, query, false));
				});
			},
			/**
			 * Tests one model object against a query object
			 *
			 * @method one
			 * @async
			 *
			 * @param {Object} model The data object
			 * @param {Object} query The query object
			 *
			 * @return {Promise} who's result is set to a {Boolean}.
			 *
			 * @example
			 *      // the data to query
			 *      var model = {
			 *          name: 'cyborg',
			 *          age: 123
			 *      };
			 *
			 *      // the query
			 *      var query = {
			 *          name: {
			 *              $right: 'g',
			 *              $and: {
			 *                  $left: 'cy'
			 *              }
			 *          },
			 *          $and: {
			 *              age: {
			 *                  $typeof: 'number',
			 *                  $and: {
			 *                      $equals: 123
			 *                  }
			 *              }
			 *          }
			 *      };
			 *
			 *      // run the query
			 *      querify.one(model, query)
			 *              .then(function (result) {
			 *                  // the result
			 *              }).catch (function (error) {
			 *                  // catch any errors
			 *              })
			 *              .then(function () {
			 *                  // finally
			 *              });
			 */
			one: function (model, query) {
				// setup the query logging stack
				var context = this;
				context.queryTrail = [];
				context.queryLevel = 0;

				if (model === undefined) {
					return Promise.reject(new ReferenceError("Unspecified model."));
				}

				if (query === undefined) {
					return Promise.reject(new ReferenceError("Unspecified query."));
				}

				return executeQuery.call(context, model, query, false);
			},
			/**
			 * Tests if an array of model objects match against a query object
			 *
			 * @method many
			 * @async
			 *
			 * @param {Array} modelArray An array of data objects
			 * @param {Object} query The query object
			 *
			 * @return {Promise} who's result is set to a {Boolean}.
			 *
			 * @example
			 *      // the data to query
			 *      var model = [{
			 *          name: 'cyborg',
			 *          age: 123
			 *      }, {
			 *          name: 'borg',
			 *          age: 223
			 *      }];
			 *
			 *      // the query
			 *      var query = {
			 *              name: {
			 *              $right: 'g'
			 *          },
			 *          age: {
			 *              $typeof: 'number'
			 *          }
			 *      };
			 *
			 *      // run the query
			 *      querify.many(model, query)
			 *              .then(function (result) {
			 *                  // the result, true or false
			 *              })
			 *              .catch (function (error) {
			 *                  // catch any errors
			 *              })
			 *              .then(function () {
			 *                  // finally
			 *              });
			 */
			many: function (modelArray, query) {
				// setup the query logging stack
				var context = this;
				context.queryTrail = [];
				context.queryLevel = 0;

				if (modelArray === undefined) {
					return Promise.reject(new ReferenceError("Unspecified model array."));
				}

				if (query === undefined) {
					return Promise.reject(new ReferenceError("Unspecified query."));
				}

				// iterates the promises until false or error
				return promiseExtras.every(modelArray, function (model, modelIndex, fulfil) {
					fulfil(executeQuery.call(context, model, query, false));
				});
			},
			/**
			 * Filters an array of model objects against a query object
			 *
			 * @method filter
			 * @async
			 *
			 * @param {Array} modelArray An array of data objects
			 * @param {Object} query The query object
			 *
			 * @return {Promise} who's result is set to an {Array} of filtered objects.
			 *
			 * @example
			 *      // the data to query
			 *      var model = [{
			 *          name: 'cyborg',
			 *          age: 123
			 *      }, {
			 *          name: 'borg',
			 *          age: 223
			 *      }];
			 *
			 *      // the query
			 *      var query = {
			 *          name: {
			 *              $equals: 'cyborg'
			 *          }
			 *      };
			 *
			 *      // run the query
			 *      querify.filter(model, query)
			 *              .then(function (results) {
			 *                  // the results, a filtered array
			 *              }).catch (function (error) {
			 *                  // catch any errors
			 *              })
			 *              .then(function () {
			 *                  // finally
			 *              });
			 */
			filter: function (modelArray, query) {
				// setup the query logging stack
				var context = this;
				context.queryTrail = [];
				context.queryLevel = 0;

				if (modelArray === undefined) {
					return Promise.reject(new ReferenceError("Unspecified model array."));
				}

				if (query === undefined) {
					return Promise.reject(new ReferenceError("Unspecified query."));
				}

				// create a chain of thenables
				var chainedThen = Promise.resolve([]);

				modelArray.forEach(function (model, modelIndex) {

					chainedThen = chainedThen.then(function then(filteredList) {

						context.queryLevel = 0;

						// log current operation
						logQuery(context.queryTrail, modelIndex, "$$arrayItem");

						return executeQuery.call(context, model, query, false)
							.then(function (result) {
								// determine if passed
								if (result === true) {
									filteredList.push(model);
								}
								// pass on the results
								return filteredList;
							});

					});

				});

				return chainedThen;
			},
			/**
			 * Extracts items from an object dictionary using a query object
			 *
			 * @method extract
			 * @async
			 *
			 * @param {Object} modelDictionary An object dictionary of model objects
			 * @param {Object} query The query object
			 *
			 * @return {Promise} who's result is set to an {Object} dictionary of model objects.
			 *
			 * @example
			 *      // the data to query
			 *      var modelDictionary = {
			 *          "item1": {
			 *              name: 'cyborg',
			 *              age: 123
			 *          },
			 *          "item2": {
			 *              name: 'borg',
			 *              age: 223
			 *          }
			 *      };
			 *
			 *      // the query
			 *      var query = {
			 *          name: {
			 *              $equals: 'cyborg'
			 *          }
			 *      };
			 *
			 *      // run the query
			 *      querify.extract(modelDictionary, query)
			 *              .then(function (results) {
			 *                  // the results, an extracted model dictionary
			 *              }).catch (function (error) {
			 *                  // catch any errors
			 *              })
			 *              .then(function () {
			 *                  // finally
			 *              });
			 */
			extract: function (modelDictionary, query) {
				// setup the query logging stack
				var context = this;
				context.queryTrail = [];
				context.queryLevel = 0;

				if (modelDictionary === undefined) {
					return Promise.reject(new ReferenceError("Unspecified model dictionary."));
				}

				if (query === undefined) {
					return Promise.reject(new ReferenceError("Unspecified query."));
				}

				// setup a chain of thenable methods
				var chainedThen = Promise.resolve({});

				var keys = Object.keys(modelDictionary);
				keys.forEach(function (modelKey, modelIndex) {

					chainedThen = chainedThen.then(function (filteredDictionary) {
						context.queryLevel = 0;

						// log current operation
						logQuery(context.queryTrail, modelIndex, "$$arrayItem");

						var model = modelDictionary[modelKey];
						return executeQuery.call(context, model, query, false)
							.then(function (result) {
								// determine if passed
								if (result === true) {
									filteredDictionary[modelKey] = model;
								}
								// pass on the results
								return filteredDictionary;
							});
					});

				});

				return chainedThen
			}
		};

		// return a new instance
		return new QueryRunner();

	}($Promise, $promiseExtras));

	/* export the library */
	if (typeof window !== "undefined") {
		/* browser */
		window.querify = library;
	} else if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
		/* node */
		module.exports = library;
	}

}());
