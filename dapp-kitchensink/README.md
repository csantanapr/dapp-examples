# dApp Example: Kitchen Sink

Shows multiple tricks you can do with dApp

- Multiple Views
- Views without a Controller
- Dijit Templates
    - Attach props
    - Attach events
- i18n Support
- Locale switching (Spanish<->English)
- Mobile Theme Switching
- Object Stores
- NodeJS REST API
- noSQL MongoDB

Installing
===
### Clone Project

    git clone https://github.com/csantanapr/dapp-examples.git
    cd dapp-examples/dapp-kitchensink`

### Install CLI Dependencies

Use  [NPM](http://npmjs.org):

    npm install

Downloads cli dependencies to `node_modules/`

### Install Browser Dependencies
Use [Bower](http://bower.io) or [Volo](http://volojs.org)

    bower install
    or
    volo install

Downloads browser dependencies to `components/`

----

Development Workflow (Use Grunt to preview, lint, build)
===
Use grunt to run tasks, for more available tasks run `grunt --help`

### Preview Source with watch and liverelaod
    grunt server

### Preview Distribution
    grunt server:dist

### Lint
    grunt lint

### Build
Be happy, and stop crying because you can't figure out how to build dojo or create a hybrid App as fast and simple as it should be.

Believe me I cried a lot :-(

    grunt build

### Optional: Hybrid App (Apache Cordova/PhoneGap)

To build web and cordova run:

    grunt build_all

To run Simulators (Apple iOS, Android) run:

    grunt cordova_emulate

To run just Apple iOS Simulator run:

    grunt cordovacli:emualte_ios

To run just Android Simulator run:

    grunt cordovacli:emualte_android

### Optional: NodeJS REST API and MongoDB

Start mongodb service

    mongodb
    
Start nodes service

    node server

Open Browser using http://localhost:3000

----

### Windows Users

If you have [msysgit](http://git-scm.com) installed, run Git Bash and verify
some dependencies by running the following commands:

    which node

Node will reward you with much faster builds.

A brief tour
----

* The starting point of the boilerplate is the file at `src/index.html` and `src/app/main.js`
  It's responsible for loading the Dojo loader and the application’s
  bootstrapper with `config.json`
* The file `grunt build` takes your application files and builds them for
  production using the Dojo build tool.
  * It depends on the presence of the build profile at `profiles/app.profile.js` and App config `src/app/config.json`
* The App creates an instance of `dojox/app/main` using the App Controller Configuration File  `src/app/config.json`
* The file `src/app/config.json` its the brain that composes the App and also used to discover dependencies for Dojo Build
* The file `src/app/views/css/app.css` contains import statements to load the CSS it's inserted from `src/index.html`
* The file `src/app/views/app.js` is an additional App Controller
* The file `src/app/views/app.html` contains the App level html template and its specified in `src/app/config.json`
* The directories inside `src/app/views/[view1 | view2 | view3]` contain View level module composed of css/images/html/js
* JS = ViewControllers, HTML=ViewTemplates
* Add View Templates, View Controllers, and Object Stores (i.e. Models) starting by modifying the `src/app/config.json`
* The provided directory structure for css, html, and js for your App is defined in config.json, you can change to a different convention

Useful resources
----------------

* [Dojox/App Tutorial](http://dojotoolkit.org/documentation/tutorials/1.9/dojox_app)
* [Dojox/App Reference](http://dojotoolkit.org/reference-guide/dojox/app.html#dojox-app)


Dual License
--
Licensed under the [same
terms](https://github.com/dojo/dojo/blob/master/LICENSE) as the Dojo
Toolkit.

* [BSD](https://github.com/dojo/dojo/blob/master/LICENSE#L13)
* [AFLv2.1](https://github.com/dojo/dojo/blob/master/LICENSE#L43)

