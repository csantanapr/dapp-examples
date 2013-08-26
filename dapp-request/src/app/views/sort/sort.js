/*jslint nomen: true */
/*jshint nomen: true */
/*global _, define, console*/
var testMemoryStore;
define([
    'dojo/query!css3',
    //query is the core of dojo dom query
    // the return is NodeList that has full set of functions
    // most of the function have same syntax as jquery see bellow this file for summary
    'dojo/on',
    'dojo/store/Memory',
    'dojox/mobile/parser',
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
], function ($, on, Memory, parser) {
    'use strict';

    var view, // set in init(params) to save in closure reference to this view controller instance
        viewNode; // set in init(params) to save in closure reference to this view dom node

    return {

        init: function (params) {
            // summary:
            //      view life cycle init()
            console.log(this.name + " view:init()");

            //save the view node in clousure to use as scope for dom manipulatation and query
            viewNode = this.domNode;
            view = this;

        },

        beforeActivate: function (view, data) {
            // summary:
            //      view life cycle beforeActivate()
            console.log(this.name + " view:beforeActivate(view,data)");
            //parser.parse();
        },

        afterActivate: function (view, data) {
            // summary:
            //      view life cycle afterActivate()
            console.log(this.name + " view:afterActivate(view,data)");
        },

        beforeDeactivate: function (view, data) {
            // summary:
            //      view life cycle beforeDeactivate()
            console.log(this.name + " view:beforeDeactivate(view,data)");
        },

        afterDeactivate: function (view, data) {
            // summary:
            //      view life cycle afterDeactivate()
            console.log(this.name + " view:afterDeactivate(view,data)");
        },

        destroy: function (params) {
            // summary:
            //      view life cycle destroy()
            console.log(this.name + " view:destory()");
        },
        /*****
         * Custom Code for View Controller
         *****/

        _formatterTmpl : function (value, key) {
            // summary:
            //      Use to format template properties using the convention ${foo:_formatterTmpl}
            console.log(this.name + "_formatterTmpl(" + value + "," + "key" + ");");

        },
        doSomething: function (event) {
            console.log('did something');
            // summary:
            //      Example of a custom view controller callback for event listener
            console.log(this.name + "doSomething(" + event + ");");

        },
        _sort: function(){
        	console.log('do sort');
        	var sort = [];
        	 
        	var firstField = view.sortfirstField.get("value");
        	var firstOrder = view.sortfirstOrder.get("value");
        	if(firstField && firstOrder){
        		sort.push({'attribute': firstField,
        					'descending': firstOrder === "Descending"});
        	}
        	var secondField = view.sortsecondField.get("value");
        	var secondOrder = view.sortsecondOrder.get("value");
        	if(secondField && secondOrder){
        		sort.push({'attribute': secondField,
        					'descending': secondOrder === "Descending"});
        	}

        	view.app.transitionToView(view.domNode, { target: 'requestList', reverse: 'true', 'data': {'sort': sort}});
        }
    };


});
