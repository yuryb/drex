var fs = require('fs');
var path = require('path');
var mc = path.join(__dirname, 'module_cache');
var watchers = {};

if (fs.existsSync(mc) == false)
{
    fs.mkdirSync(mc);
}

exports.require = function(modname, cb)
{
    if (!watchers[modname])
    {
        var opts = {};

        opts.persistent = true;
        opts.interval = 2190;

        fs.watchFile(modname, opts, function (curr, prev)
        {
            console.log('the current mtime is: ' + curr.mtime);
            console.log('the previous mtime was: ' + prev.mtime);

            createModule(modname, function(mnm)
            {
                watchers[modname] = mnm;

                cb(require(mnm), mnm);
            })
        });

        watchers[modname] = modname;

        cb(require(watchers[modname]), watchers[modname]);
    }
    else
    {
        cb(require(watchers[modname]), watchers[modname]);
    }
}

var createModule = function(modname, cb)
{
    var dt = new Date();
    var mnm = path.join(mc,'_mod' + '_' + dt.getTime() + '.js');

    console.log('copying %s to %s', modname, mnm);

    var content = fs.readFileSync(modname);
    fs.writeFileSync(mnm, content);

    cb(mnm);
}
