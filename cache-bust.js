/** @license MIT License (c) copyright 2014 original authors */
/** @author Brian Cavalier */
/** @author John Hann */

define(['curl/_privileged'], function (priv) {
	var loadScript = priv['core'].loadScript;

	priv['core'].loadScript = function (def, success, failure) {
		var urlArgs = priv['config']()['urlArgs'];

		if (urlArgs) {
			def.url += (def.url.indexOf('?') >= 0 ? '&' : '?') + urlArgs;
		}

		return loadScript(def, success, failure);
	};
});
