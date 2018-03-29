module.exports = {
  // fetch JSON data from local or remote URL
  fetchJSON: function(location) {
    var request = require('request');
    var fs = require('fs');
    var data = [{}];

    // if location is remote, request data via GET
    if (location.startsWith('http')) {
      request.get({
        url: location,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, repository) => {
        if (err) {
          console.log('Error: ', err);
        } else if (res.statusCode !== 200) {
          console.log('Status: ', res.statusCode);
        } else {
          // iterate through repository object
          for (var i = 0; i < repository.length; i++) {
            var obj = repository[i];

            for (var key in obj) {
              // only match where repository.fork is false
              if (key == 'fork' && obj[key] == false) {
                data = Object.assign(data, repository[i]);
              }
            }
          }

          if (data.length) {
            return data;
          }
        }
      });
    // if location is local, stream data
    } else {
      // use createReadStream for more efficient loading of local file
      var readStream = fs.createReadStream(location, 'utf8');
      var dataReturn = '';

      readStream.on('data', function(chunk) {  
        data += chunk;
      }).on('end', function() {
        if (data.length) {
          return data;
        }
      });
    }
  }
}