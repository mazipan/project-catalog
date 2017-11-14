var ghpages = require('gh-pages');
var path = require('path');
 
ghpages.publish('dist', function(err) {
  console.log('done publishing to gh-pages', err)
});