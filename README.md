IssuesFeed
==========

Convert GitHub Issues to Feed by GitHub API v3

## Demo usage:

    $ git clone git@github.com:Gerhut/IssuesFeed.git
    $ cd IssuesFeed
    $ node demo.js

## Module usage:

```js
IssuesFeed = require('./IssuesFeed');
IssuesFeed(owner, repo, callback);
```

- `owner`: owner name of repo
- `repo`: name of repo, default for `owner.github.com`
- `callback`: callback function(err, data), default for `console.log`
  - `err`: null or error message.
  - `data`: rss string.
