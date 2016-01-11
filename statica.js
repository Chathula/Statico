var fs = require('fs');

var statica = {

  use : function (filename, replace, cb) {

    if (typeof replace == 'undefined') {

      var promise = new Promise(function (resolve, reject) {
        var stream = fs.createReadStream(filename);
        stream.on('data', function (chunk) {
          resolve(chunk.toString());
        });
      });

    } else {
      //var replace = JSON.parse(replace);
      var promise = new Promise(function (resolve, reject) {

        var stream = fs.createReadStream(filename);
        stream.on('data', function (chunk) {
          // replace the data
          var str = statica.replacer(chunk.toString(), replace);

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

module.exports = statica;
