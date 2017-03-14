# Accedo VOD

Accedo VOD app, that use to display list of all latest videos. User can watch videos and their viewed videos history list.

#### Live Demo
[Accedo VOD](https://accedo-video-app-fe.herokuapp.com/#/)

## Getting Started

To run this app on your local machine, get git clone or download as ZIP on local machine.
See deployment for notes on how to deploy the project.

### Prerequisites and dependency

#### Prerequisites
You need to install latest NPM and Node on local machine if not install 

For more information about How to install NPM and Node pleaes check this link:
[NPM and Node Install](http://blog.teamtreehouse.com/install-node-js-npm-windows)

Install Grunt and Bower if not already install
```
npm install -g grunt-cli
```

```
npm install -g bower
```

#### dependency
For BackEnd process we are using following API's
<br />
`For Add History: https://accedo-video-app-api.herokuapp.com/addHistory`
<br />
`For Get History: https://accedo-video-app-api.herokuapp.com/getHistory/`
<br />
`For Add Watch Later: https://accedo-video-app-api.herokuapp.com/addlaterVideo`
<br />
`For Get Watch : https://accedo-video-app-api.herokuapp.com/laterVideo/`

These API's created using Node Restify framework and hosted on separate heroku server.
For get more information about these API's visit following link.
[Accedo VOD API](https://github.com/sanjayV/accedoapp-video-api)

For Frontend Carousel, I am using my own [Responsive Carousel](https://github.com/sanjayV/responsive_carousel).
This Carousel will display images in carousel according screen size.

### Installing

To Run project you need to run following command fist

Move to Accedo app project folder using command prompt and run following command for install Grunt and Bower packages 
```
npm install
bower install
```
These command will install all dependencies of project in two folder `node_modules` and `bower_components`.

After install all dependencies, need to build projects by following command

```
grunt build
```
This build process will check all dependencies, Minify all js, css and html files
Copy all minify files, images, fonts in dist folder.

## Running app

To run app on local machine, move to Accedo app project folder using command prompt and run following grunt common 

```
grunt serve
```

It will check all dependencies and run project on default browser.
Default post is set `9000` so project will run on url `http://localhost:9000`
