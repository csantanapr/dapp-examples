/*jslint nomen: true */
/*global define, console*/

define([
    'dojox/mobile/ListItem',
    'dojo/NodeList-manipulate',
    // Load dojo/NodeList-manipulate to get JQuery syntax: see below this file for function syntax
    'dojo/text!app/views/sort/sort.html',
    'dojox/mobile/Heading',
    'dojox/mobile/TextBox',
    'dojox/mobile/ToolBarButton',
    'dojox/mobile/Button',
    'dojox/mobile/FormLayout',
    'dojox/mobile/ComboBox',
    'dojox/mobile/RoundRect',
    'dijit/form/DataList'
], function () {
    'use strict';

    var viewWidget; // set in init(params) to save in closure reference to this view controller instance


    return {

        init: function () {
            // summary:
            //      view life cycle init()
            console.log(this.name + " view:init()");

            //save the view node in clousure to use as scope for dom manipulatation and query
            viewWidget = this;

        },
        beforeActivate: function (previousView, data) {
            // summary:
            //      view life cycle beforeActivate()
            console.log(this.name + " view:beforeActivate(" + (previousView ? previousView.name : "") + ",data)" + data);
        },

        afterActivate: function (previousView, data) {
            // summary:
            //      view life cycle afterActivate()
            console.log(this.name + " view:afterActivate(" + (previousView ? previousView.name : "") + ",data)" + data);
        },

        beforeDeactivate: function (nextView, data) {
            // summary:
            //      view life cycle beforeDeactivate()
            console.log(this.name + " view:beforeDeactivate(" + (nextView ? nextView.name : "") + ",data)" + data);

        },

        afterDeactivate: function (nextView, data) {
            // summary:
            //      view life cycle afterDeactivate()
            console.log(this.name + " view:afterDeactivate(" + (nextView ? nextView.name : "") + ",data)" + data);

        },
        /*****
         * Custom Code for View Controller
         *****/
        _sort: function () {
            console.log('do sort');
            var sort,
                firstField,
                firstOrder,
                secondField,
                secondOrder;

            sort = [];

            firstField = viewWidget.sortfirstField.get("value");
            firstOrder = viewWidget.sortfirstOrder.get("value");
            if (firstField && firstOrder) {
                sort.push({'attribute': firstField,
                            'descending': firstOrder === "Descending"});
            }
            secondField = viewWidget.sortsecondField.get("value");
            secondOrder = viewWidget.sortsecondOrder.get("value");
            if (secondField && secondOrder) {
                sort.push({'attribute': secondField,
                            'descending': secondOrder === "Descending"});
            }

            viewWidget.app.transitionToView(viewWidget.domNode, { target: 'requestList', reverse: 'true', 'data': {'sort': sort}});
        }
    };


});
