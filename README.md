# curl-cache-bust

curl-cache-bust is a curl.js shim that adds the ability to "bust the cache"
during development.

Cache busting isn't something I think a module loader should normally do, yet
people ask for it [a lot](https://github.com/cujojs/curl/issues/159)),
so I added the capability via this shim.

## Usage

curl-cache-bust is installable via bower, if desired.

You can set the cache-busting url string via the `urlArgs` config option.
Do not include the '?' or '&' in the cache-busting url string.  It is 
added automatically.

The simplest way to use curl-cache-bust is to include a second async script
element in your page.  This isn't the best performing option, and is not
recommended for production:

```html
<script data-curl-run="run.js" src="bower_components/curl/src/curl.js" async></script>
<script src="bower_components/curl-cache-bust/cache-bust.js" async></script>
```

You could also load the shim as a `preloads` in your curl config:

```js
curl.config({
	urlArgs: 'cache-bust=' + new Date(),
	packages: {
		'curl-cache-bust': {
			location: 'bower_components/curl-cache-bust',
			main: 'cache-bust'
		}
		// configure your other packages here
	},
	preloads: [ 'curl-cache-bust' ]
});
```

You can also build your own curl.js with curl-cache-bust *baked in*.  There
are instructions in curl.js's `dist` folder for creating your own custom
curl.js.  curl-cache-bust will work with the tools described therein.

## Testing

To test the shim via [buster.js](http://busterjs.org), simply type the
following from the root of the project:

```
npm install
npm test
```

## Contributing

Pull requests accepted!  Please see [Contributing](CONTRIBUTING.md).
