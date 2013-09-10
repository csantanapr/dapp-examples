# dApp Example: Request App
Shows a simple App of 3 views for work orders requests using the dApp Framework


Installing
===
### Clone Project

    git clone https://github.com/csantanapr/dapp-examples.git
    cd dapp-examples/dapp-request`

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


## Running Remote Demo
- Run from your smartphone [Request App](http://csantanapr.github.io/dapp-examples/dapp-request/www/index.html)
or use the following QR Code:
- ![QR](http://chart.apis.google.com/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=http%3A%2F%2Fcsantanapr.github.io%2Fdapp-examples%2Fdapp-request%2Fwww%2Findex.html)

## App Requirements
The client provided wireframes and some documentation for the desire functionality of the App.

- Requirement documentation: [docs/ReferenceImplementationRequirementsandDocumentation.pdf](docs/ReferenceImplementationRequirementsandDocumentation.pdf "ReferenceImplementationRequirementsandDocumentation").
- Request Phone Wireframes
    - ![Request Phone Wireframes](docs/Request Phone Wireframes.png "Request Phone Wireframes")
- Request Tablet and Desktop Wireframes
    - ![Request Tablet and Desktop Wireframes.png](docs/Request Tablet and Desktop Wireframes.png "Request Tablet and Desktop Wireframes.png")


### Useful resources


* [Dojox/App Tutorial](http://dojotoolkit.org/documentation/tutorials/1.9/dojox_app)
* [Dojox/App Reference](http://dojotoolkit.org/reference-guide/dojox/app.html#dojox-app)


### Dual License

Licensed under the [same
terms](https://github.com/dojo/dojo/blob/master/LICENSE) as the Dojo
Toolkit.

* [BSD](https://github.com/dojo/dojo/blob/master/LICENSE#L13)
* [AFLv2.1](https://github.com/dojo/dojo/blob/master/LICENSE#L43)

