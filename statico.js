var fs = require('fs');
var path = require('path');

function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}

function setuper(req, res) {

  if (req.url != '/') {
    var file = req.url.substring(1);
    var type = path.extname(file);

    if (fs.existsSync(file)) {
      if (type == '.js' || type == '.css') {
        if (type == '.js') {
          res.writeHead(200, { "Content-Type" : "application/javascript" });
        } else if (type == '.css') {
          res.writeHead(200, { "Content-Type" : "text/css" });
        } else if (type == '.html') {
          res.writeHead(200, { "Content-Type" : "text/html" });
        }

        statico.use(file, {}, function (data) {
          res.end(data);
        });

      }
    }
  }

}

var statico = {

  setup : function (req, res) {
    setuper(req, res);
  },

  use : function (filename, replace, cb) {

    if (typeof replace == 'undefined') {

      var promise = new Promise(function (resolve, reject) {
        var stream = fs.createReadStream(filename);
        stream.on('data', function (chunk) {
          var str = statico.toString();
          resolve(str);
        });
      });

    } else {
      var promise = new Promise(function (resolve, reject) {

        var stream = fs.createReadStream(filename);
        stream.on('data', function (chunk) {
          var str = statico.replacer(chunk.toString(), replace);

          if (typeof cb === 'undefined') {
            resolve(str);
          } else {
            cb(str);
          }

        });
      });

    }

    return promise;

  },

  replacer : function (string, replace) {
    var re = /\$\{([^\}]+)?\}/g, match;
    while(match = re.exec(string)) {
      string = string.replace(match[0], replace[match[1]])
      re.lastIndex = 0;
    }

    return string;
  }

};

module.exports = statico;
