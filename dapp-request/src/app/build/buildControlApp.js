/*global define */
define(["build/buildControlDefault"], function (bc) {
    // module:
    //      dojox/app/build/buildControlApp
    // summary:
    //      This module extend default build control module to add dojox/app build support
    // enhance buildControl
    'use strict';
    bc.discoveryProcs.splice(0, 0, "app/build/discoverAppConfig");
    return bc;
});