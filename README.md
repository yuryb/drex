drex
====

`drex` - "dynamic require() extension".
Dynamic version of Node's require() - loads fresh copy of the module every time the module file is changed.

Insanely simple, and/but astonishingly useful grab of bits, which has been brought to this world out of severe necessity.
>Here is why:
- all re-loaders I was able to find reload the whole node process, which means that the context of the process is gone;
- but, sometimes, you don't want that! You want your process to continue running intact, at least for those clients who already deep in it, and would choke if process forgets about them;
- sometime you have a little (or BIG) piece of code which you constantly change and, for G-d sake, do not want to sacrifice the whole your Node process for, but
- you don't want to loose the benefits of CommonJS/require supported modularity of your code.

Here comes `drex`, and it comes like this:

```javascript
var drex = require('drex');

... node code node code node code ...

// here goes my frea[ky/quently updated] piece of code, which lives in a js file called mucode.js:
drex.require('./mucode.js', function(mucode)
{
  // at this point my mucode.js has been require()d, just like this: 
  // var mucode = require('./mucode.js');
  // the code of the required module is the LATEST UPDATE TO mucode.js
  mucode.muNewFunc();  
});
```

#Here is an example (and the reason I had to comeup with drex) from the real life when drex is irreplaceable:#
frequently updated/added socket.io event handlers:

when you have a code like this:

```javascript
io.sockets.on('connection', function (socket) {
  // I need to do many things here, and these things change all the time!
  // If I use something like "forever", or "supervisor" to re-start my Node process every time 
  // when things here should change, all existing sessions with the clients will be killed!
  // Oh, no, no, no!
  // All I want to do here, most of the time, is to put new event handler, which existing sessions do not even know about!
  
  drex.require('./my_module_with_event_handlers_which_I_always_change.js', function(mymod) {
      // here I can start calling methods from my module like there is no tomorrow!
      // and I'm guaranteed that every time I update my module, sessions which will come here after the update
      // will get the new code, but sessions which were opened before the update will still be working with the
      // code which existed in my module when these sessions were created. That's fair!
  });
```

#TL;DR;#
`drex` is watching a module for updates and cleanly re-requires the module after update.
New code is being required, as if the new code is a totally different module, so require.cache is not a problem.

Enjoy
  


