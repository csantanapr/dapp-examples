/*global define*/

/**
 * Bootstrap dApp Application
 **/

define([
    'dojo/_base/window',
    'dojo/sniff',
    'dojox/app/main',
    'dojox/json/ref',
    'dojo/text!app/config.json',
    'dojo/_base/config',
    'dojo/text!app/resources/data/items.json',
    // add all html templates being use in config.json to force them to be included in layer
    // when doing custom dojo build, the build process will recognize them as dependencies for the package
    'dojo/text!app/views/app.html',
    'dojo/text!app/views/view2/view2.html',
    'dojo/domReady!'
], function (win, has, dApp, json, config, dojoConfig, data) {
    'use strict';
    var appConfig = json.fromJson(config);

    // for some reason appConfig.loaderConfig.paths.app set to ../src/app when running from source
    if (dojoConfig.baseUrl && dojoConfig.paths && dojoConfig.paths.app) {
        if (appConfig.loaderConfig && appConfig.loaderConfig.paths && appConfig.loaderConfig.paths.app) {
            appConfig.loaderConfig.paths.app = dojoConfig.baseUrl + dojoConfig.paths.app;
        }
    }

    // populate has flag on whether html5 history is correctly supported or not
    has.add("html5history", !has("ie") || has("ie") > 9);

    //Just for debugging this enables built in logging
    //has.add("app-log-api", true);

    // setup the data for the memory stores
    win.global.myapp = {};
    win.global.myapp.dataItems = json.fromJson(data);

    //Start the App
    dApp(appConfig);

});
