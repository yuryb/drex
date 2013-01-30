drex
====

DREX - "dynamic require extension".
Dynamic version of Node's require() - loads fresh copy of the module every time the module file is changed.

Insanely simple, but astonishingly useful grab of bits, which has been brought to this world out of severe necessity.
Here is why:
• all re-loaders I was able to find reload a node process, which means that the context of the process is gone and re-created;
• but, sometimes, you don't want that! You want your process to continue running intact, at least for those clients who laready deep in it, and would choke if process forgets about them;
• sometime you have a little (or BIG) piece of code which you constantly twick and, for G-d sake, do not want to sacrifice the whole your Node process for, but
• you don't want to loose benefits of CommonJS/require supported modularity of your code.

Here comes drex, and it comes like this:

var drex = require('drex');

... node code node code node code ...

// here goes my frea[ky/quently updated] piece of code, which lives in a js file called mucode.js:

drex.require('./mucode.js', function(mucode)
{
  // at this point my mucode.js has been required, just like this: var mucode = require('./mucode.js');
  mucode.muFunc();  
});
