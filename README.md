# browserify-links
Minimal bug reproduction

## Steps

1. `npm install`
2. `npm run bundle`

This runs browserify with a custom plugin on *index.js*. The plugin does 2 things:
1. It adds a transform which creates a list of the files it was passed
2. At the end of the `sort` pipeline, it looks for the sorted files in the list created by the transform and logs whether it can find them or not.

### Expected

```sh
FOUND
FOUND
FOUND
```

### Observed

```sh
FOUND
NOT FOUND: /Users/shawn/Work/browserify-links/one.js
NOT FOUND: /Users/shawn/Work/browserify-links/two.js
```

## The problem

As you can see, the linked files are not found. This is because the file name is different in the transform (e.g. `/Users/shawn/Work/browserify-links/first-level.js`) and at the `sort` step (e.g. `/Users/shawn/Work/browserify-links/one.js`) because the transform gets the name of the link and the sort step gets the name of the file the link points to.