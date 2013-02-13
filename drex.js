var fs = require('fs');
var path = require('path');
var mc = path.join(__dirname, 'module_cache');
var watchers = {};

if (! fs.existsSync(mc))
{
    fs.mkdirSync(mc);
}

exports.require = function(modname, cb, errorCallback)
{
    errorCallback = errorCallback || function(e){
        console.log(e)
    };

    if (!watchers[modname])
    {
        var opts = {
            persistent: true,
            interval: 2190
        };

        fs.watchFile(modname, opts, function (curr, prev)
        {
            createModule(modname, function(mnm)
            {
                watchers[modname] = mnm;
                try {
                    cb(require(mnm), mnm);
                } catch (e) {
                    errorCallback(e);
                }
            })
        });

        watchers[modname] = modname;
    }
    try {
        cb(require(path.resolve(watchers[modname])), watchers[modname]);
    } catch (e) {
        errorCallback(e);
    }
}

exports.unwatch = function(modname) {
    if (watchers[modname]) {
        fs.unwatchFile(modname);
    }
}

var createModule = function(modname, cb)
{
    var dt = new Date();
    var mnm = path.join(mc,'_mod' + '_' + dt.getTime() + '.js');

    var content = fs.readFileSync(modname);
    fs.writeFileSync(mnm, content);

    cb(mnm);
}
