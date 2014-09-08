(function () {
	"use strict";

	var isBrowser = typeof window !== "undefined",
		$Promise;

	function resolveBrowserPromiseLib() {
		if (window.Promise) {
			return window.Promise;
		} else {
			throw new Error("No Promise library could be detected for this browser.");
		}
	}

	// attempt to get the Promise ref
	if (isBrowser === true) {
		$Promise = resolveBrowserPromiseLib();
	} else {
		$Promise = require("promise");
	}

	var promiseExtras = (function(Promise) {

		function promiseEveryTask(arrayItems, itemHandler, currentIndex) {

			// only process if in bounds
			if (currentIndex < arrayItems.length) {

				var context = this;

				// return the promise
				return new Promise(function (resolve, reject) {

					// make this async.
					setTimeout(function () {

						var wasResolved = false,
							wasRejected = false;

						itemHandler.call(context, arrayItems[currentIndex], currentIndex,
							function handleUserResolver(userResolver) {

								// check if this was already resolved
								if (wasResolved === true) {
									reject( Error("Resolve cannot be called more than once.") );
									return;
								}

								// check for rejection
								if (wasRejected === true) {
									return;
								}

								wasResolved = true;

								// will handle the user resolver as a value or a Promise
								var promiseResolver = Promise.resolve(userResolver);

								promiseResolver.then(function (result) {

									// check for rejection
									if (wasRejected === true) {
										return;
									}

									// if result is a true then continue the iteration
									if (result === true) {

										currentIndex++;

										if (currentIndex < arrayItems.length) {
											resolve(
												promiseEveryTask.call(context, arrayItems, itemHandler, currentIndex)
											);
										} else {
											// iteration ended successfully
											resolve(true);
										}

									} else {
										// we're just pass on the result
										resolve(result);
									}

								}).catch(function (error) {
									wasRejected = true;
									reject(error);
								});

							}, function handleUserRejection(error) {
								// check for rejection
								if (wasRejected === true) {
									throw new Error("Reject cannot be called more than once.");
								}

								wasRejected = true;
								reject(error);
							});

						// when wasResolved is false (throw error)
						if (wasResolved === false && wasRejected === false)
							reject(new ReferenceError("promiseEvery was not resolved or rejected."));

					}, 0);

				});

			}

		}

		function promiseEvery(arrayItems, itemHandler) {

			if (!arrayItems) {
				throw new ReferenceError("Unspecified array items.")
			}

			if (!itemHandler) {
				throw new ReferenceError("Unspecified item handler method.")
			}

			if (arrayItems.length === 0) {
				return Promise.resolve(true);
			}

			// returns a Promise to the first item in the iteration
			return promiseEveryTask.call(this, arrayItems, itemHandler, 0);
		}

		function promiseLater(resolution, timeout) {
			var context = this;

			if (!resolution) {
				throw new ReferenceError("Unspecified resolution callback.")
			}

			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolution.call(context, resolve, reject);
				}, timeout || 0);
			});

		}

		/**
		 * A helper library for working with JS Promises
		 *
		 * For the browser this class is registered to window.promiseExtras
		 *
		 * For NodeJs it can be required as require("promise-extras");
		 *
		 * @class promiseExtras
		 */
		return {
			/**
			 *  Iterates over an array and tests whether all elements in the array pass the test implemented by the provided callback function.
			 *
		     *  Note:
			 *
			 *          Each iteration is processed one at a time and the iteration order is preserved (inc. async callback). No queuing occurs.
			 *
			 *          During the itemHandler callback, resolve or reject must be called before it''s method exits
			 *          otherwise an error will be thrown. You can defer this process by passing a Promise to the resolve method.
			 *          See last example below
			 *
			 *
			 * @method every
			 * @async
			 *
			 * @param {Array} arrayItems The array to be iterated
			 * @param {Function} itemHandler
			 * @param {Object} itemHandler.item current array item.
			 * @param {Number} itemHandler.index current array item index.
			 * @param {Function} itemHandler.resolve used for determining iteration flow.
			 *
			 *      Calling resolve(true) will continue the iteration until finally causing the returned {Promise} object to execute it's then(...) method passing the last result {Object}
			 *
			 *       Calling resolve({Promise}) will use the result from the {Promise} object
			 *
			 *       Calling resolve({Object}) will break the iteration and cause the returned {Promise} object to execute it's then(...) method passing the last result {Object}
			 *
			 * @param {Function} itemHandler.reject used for handling iteration errors.
			 *
			 *      Calling reject({Object}) will break the current iteration and cause the returned {Promise} object to execute it's catch(...) handler method passing it the result {Object}
			 *
			 * @return {Promise} A reference to the completion {Promise} object
		     *
		     *          Will be called once the iteration has finished or rejected.
			 *          The result of the last iteration will be given to the then(...) method if the iteration had not been rejected
			 *          Use catch(...) to handle any rejections or errors the occurred during the iteration
			 *
			 * @example
			 *
	// reference the library
	var promiseX = window.promiseExtras; // or require("promise-extras") in nodejs

	// the array to iterate
	var items = [1, 2, 3, 4, 5];
			 *
			 * @example
			 *
	// iterates all items
	promiseX.every(items, function (arrayItem, arrayIndex, resolve, reject) {
		resolve(true);
	}).then(function (lastResolveResult) {
		// will print true
		console.log(lastResolveResult);
	});
			 *
			 * @example
			 *
	// breaks the loop on the first call
	promiseX.every(items, function (arrayItem, arrayIndex, resolve, reject) {
		resolve(false); // breaks here
	}).then(function (lastResolveResult) {
		// will print false
		console.log(lastResolveResult);
	});
			 *
			 * @example
			 *
	// causes catch(...) to be called
	// breaks the loop on the first call
	promiseX.every(items, function (arrayItem, arrayIndex, resolve, reject) {
		reject(new Error("Break here"));
	}).catch (function (error) {
		// will print the error
		console.log(error);
	});
			 *
			 * @example
			 *
	// iterates items in order even with async calls
	var results = [];
	promiseX.every(items, function (arrayItem, arrayIndex, resolve, reject) {

		// because resolve or reject must be called before this method exits
		// then we resolve using a Promise which lets us defer the result.
		// use the Promise result for resolve or rejection of this iteration. i.e. innerResolve(false) would break the iteration

		if (arrayIndex === 2)

			resolve(

				new Promise(function (innerResolve, innerReject) {

					// async ( go do something for a period of time )
					setTimeout(function () {
						results.push(arrayIndex);
						innerResolve(true);
					}, 2000);

				}));
		else {
			// sync
			results.push(arrayIndex);
			resolve(true);
		}

	}).then(function () {
		// will print true
		console.log(results);
	}).catch (function (error) {
		// will print the error
		console.log(error);
	});
			 *
			 */
			every: promiseEvery,

			/**
			 * Creates a Promise who won't be resolved until the calling method exits and the specified timeout has been met.
			 *
			 * @method later
			 * @async
			 *
			 * @param {Function} promise Resolution callback
			 *
			 *      function resolution(resolve, reject){}
			 *
			 * @param {Number} timeout Value passed to the setTimeout function. Can be omitted, default is 0
			 *
			 * @return {Promise} A reference to the completion {Promise} object
			 *
			 * @example
			 *
	// reference the library
	var promiseX = window.promiseExtras; // or require("promise-extras") in nodejs
    var timeout = 0; // can be omitted, 0 default

	promiseX.later( function(resolve, reject) {
	    resolve(123);
	}, timeout);
			 *
			 */
			later: promiseLater
		};

	}($Promise));

	/* export the library */
	if (isBrowser) {
		/* browser */
		window.promiseExtras = promiseExtras;
	} else if (typeof module !== "undefined" &&
				typeof module.exports !== "undefined") {
		/* node */
		module.exports = promiseExtras;
	}

}());