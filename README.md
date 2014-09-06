Crainium CI
============

**Crainium CI (a fork of Braindead CI) is a self-hosted continuous integration and deployment
server written in Node.js**. It can build and deploy your code
automatically upon a push on Github, advertise builds on Hipchat and do that quickly and painlessly.

## What does it look like?
<img src="assets/img/dashboard.png" alt="Dashboard">

## What can it do?
* Automatic build and deploy on a push to the Github repository
* Advertise build results on Hipchat
* Very fast (starts up in less than a second, page load typically less than 500ms)
* Easy to set up (create a project in 1 minute, set up hook to Github and Hipchat in 2)
* All-purpose: can build and deploy any type of project, whatever the technology used
  is
* Smart support for Node.js projects (only reinstall dependencies if
  needed to gain time). Smart support for other platforms will come
depending on use (if you need it for your stack, do submit an issue, or even better a PR!)


## Installation and tests
This assume you already have <a href="http://nodejs.org/" target="_blank">Node.js</a> installed on your system.

```javascript
// Install Cranium in two commands
git clone git@github.com:hugs/cranium.git
npm install

// Now test it (dev dependencies need to be installed)
make test

// You're done, now launch it:
./cranium.js            // On default port (2008)
./crainium.js -p 2009   // On port 2009

// Check out possible command-line options
./cranium.js -h
```


## In production
It's **highly** recommended to serve Cranium over HTTPS (with Nginx for example). Upon first launch you will create your first admin user (you can create others in the settings), and then you'll need to be logged in to do anything.

The path to Cranium's home page should be `/` (corresponding to a URL such as `https://ci.example.com/` or `https://example.com:2008/`). I will add an option for other URL structures in the future if enough people ask for it though.


## Hooking up Cranium and Github
**1.** Cranium provides a URL, `/githubwebhook`, that Github can use POST to everytime a push occurs on the repo. In order to only allow Github to trigger builds on Cranium, you need to first create a token for Github in Cranium's Third-party services settings:

<img src="http://i.imgur.com/iwXWwII.png" alt="Github token">

**2.** Then, you set up a WebHook on your Github repo ("Settings", "Service hooks"), using the `/githubwebhook` URL and the same token you defined in step 1 as the "token" querystring parameter like this:

<img src="http://i.imgur.com/FcVbiTw.png" alt="Github webhook">



## Hooking up Cranium and Hipchat
In the third-party services settings, enter your Hipchat API token and the name of the room you want Cranium to tell you build results. You can also specify the "Cranium root url" which is the url of the home page (e.g. https://ci.example.com), so that the messages in Hipchat contain links to the build results.

Once set, you will be notified whenever a project was built (or skipped if disabled), and Hipchat will alert you in case the build fails.


## Going forward
Don't hesitate to submit issues or pull requests!


## License
MIT. Do whatever you want with the code.  
(c) 2014 Jason Huggins, jrhuggins@gmail.com
(c) 2013 Louis Chatriot, louis@tldr.io
(c) 2013 Louis Chatriot, louis@tldr.io

Changes / updates coming soon!
(c) 2014 Jason Huggins
