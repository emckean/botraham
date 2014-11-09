var util = require('util');
var fs = require('fs');
//from twoheadlines
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore.deferred');
var Twit = require('twit');
var T = new Twit(require('./config.js'));
//



function tweet() {
  var stopAfter100Char = function(s) {
    return s.length >= 100
  }

  var MarkovChain = require('markovchain').MarkovChain
  , quotes = new MarkovChain({ files: 'lincoln.txt' })

  quotes
  .start('The') //
  .end(stopAfter100Char)
  .process(function(err, s) {
    console.log(s);
    var newS = s.replace("\"", "", "gi");
    newS = newS + ".";
    T.post('statuses/update', { status: newS }, function(err, reply) {
      if (err) {
        console.log('error:', err);
      }
      else {
        console.log('reply:', reply);
      }
  });
  })
  
}

// Tweets once on initialization.
tweet();

// Tweets every 6.66 hours.
setInterval(function () {
  try {
    tweet();
  }
  catch (e) {
    console.log(e);
  }
}, 24000000);