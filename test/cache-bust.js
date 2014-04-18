/** @license MIT License (c) copyright 2014 original authors */
/** @author John Hann */

var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var fail = buster.referee.fail;


buster.testCase('cache-bust', {

	'should replace loadScript function': function () {
		var priv = this['curl/_privileged'];
		var loadScript = priv.core.loadScript;
		requireAmd(this, '../cache-bust');
		refute.equals(loadScript, priv.core.loadScript);
	},

	'should append urlArgs to paths': function () {
		var priv = this['curl/_privileged'];
		priv.config.returns({
			urlArgs: 'foo'
		});
		var spy = priv.core.loadScript;
		requireAmd(this, '../cache-bust');
		priv.core.loadScript({ url: 'app/main.js' }, success, failure);
		priv.core.loadScript({ url: 'app/main.js?bar' }, success, failure);
		priv.core.loadScript({ url: 'app/main.js?bar=7' }, success, failure);
		assert.calledThrice(spy);
		assert.calledWith(spy, { url: 'app/main.js?foo' }, success, failure);
		assert.calledWith(spy, { url: 'app/main.js?bar&foo' }, success, failure);
		assert.calledWith(spy, { url: 'app/main.js?bar=7&foo' }, success, failure);
	},

	'should append nothing if urlArgs not configured': function () {
		var priv = this['curl/_privileged'];
		var spy = priv.core.loadScript;
		requireAmd(this, '../cache-bust');
		priv.core.loadScript({ url: 'app/main.js' }, success, failure);
		assert.calledWith(spy, { url: 'app/main.js' }, success, failure);
	},

	setUp: function () {
		this['curl/_privileged'] = createPrivStub(this);
	},

	tearDown: function () {
		delete this['curl/_privileged'];
	}

});

function success () {}

function failure () {}

function createPrivStub (sinon) {
	return {
		core: {
			loadScript: sinon.spy()
		},
		config: sinon.stub().returns({})
	};
}

function requireAmd (namespace, name) {
	var fs = require('fs');
	var path = require('path');
	var source = fs.readFileSync(path.join(__dirname, name) + '.js');
	return new Function ('define', source)(define);

	function define (deps, factory) {
		return factory.apply(global, deps.map(getDep));
	}

	function getDep (id) { return namespace[id]; }
}
