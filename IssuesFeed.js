var https = require('https');

/**
 * owner: String
 * repo: String(Optional), Default to "owner.github.com"
 * callback: Function(err, data)
 *   err: Error, null or message.
 *   data: String, RSS content.
 */
module.exports = function IssuesFeed(owner, repo, callback) {
  if (typeof repo === 'undefined' || typeof repo === 'function') {
    callback = repo;
    repo = owner + '.github.com';
  }
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/issues'
    , buf = [];
  https.get(url, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      buf.push(chunk);
    }).on('end', function() {
      var data = JSON.parse(buf.join(''))
        , rss = [
          '<?xml version="1.0" encoding="utf-8"?>',
          '<rss version="2.0">',
          '<channel>',
          '<title>' , repo , '</title>',
          '<link>https://github.com/' , owner , '/' , repo , '/issues</link>',
          '<description>Issues of ', owner, " / ", repo, '</description>',
          '<generator>IssuesFeed, https://github.com/Gerhut/IssuesFeed</generator>'
        ];
      data.forEach(function(entry) {
        rss = rss.concat([
          '<item>',
          '<title>', entry["title"], '</title>',
          '<guid>', entry["html_url"], '</guid>',
          '<description><![CDATA[', entry["body"], ']]></description>',
          '</item>'
        ]);
      })
      rss = rss.concat([
        '</channel>',
        '</rss>'
      ]).join('');
      if (typeof callback === 'function')
        callback(null, rss);
      else
        console.log(rss);
    });
  }).on('error', function (err) {
    if (typeof callback === 'function')
      callback(err.message);
    else
      console.log('Error: ' + err.message);
  });
}
