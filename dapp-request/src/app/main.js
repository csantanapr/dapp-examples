/*global define, console*/
/*jslint todo: true */
/*jshint todo: true */

/**
 * Bootstrap dApp Application
 **/
define([
    'dojo/_base/window',
    'dojo/sniff',
    'dojox/app/main',
    'dojox/json/ref',
    'dojo/text!app/config.json',
    'dojo/domReady!'
], function (win, has, Application, json, config) {
    'use strict';
    win.global.myapp = {};

    // populate has flag on whether html5 history is correctly supported or not
    has.add("html5history", !has("ie") || has("ie") > 9);

    //TODO: Just for debugging this enables built in logging
    //has.add("app-log-api", true);

    //Start the App
    win.global.myapp.App = new Application(json.fromJson(config));

});
