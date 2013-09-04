/*jslint nomen: true */
/*global define, console*/

define([
    'dojo/on',
    'dojo/store/Memory',
    'dojo/query',
    'dojo/_base/lang',
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
    'dojox/mobile/RoundRectStoreList',
    'dojox/mobile/Opener',
    'dojox/mobile/Overlay',
    'dojox/mobile/ScrollableView'
], function (on, Memory, query, lang) {
    'use strict';

    var view; // set in init(params) to save in closure reference to this view controller instance


    return {

        init: function () {
            // summary:
            //      view life cycle init()
            console.log(this.name + " view:init()");

            //save the view node in clousure to use as scope for dom manipulatation and query
            view = this;
            this.loadedStores.searchFieldsStore.query().then(function (items) {
                view.sortfirstField.set("value", items[0].label);
                view.sortfirstField.set("sortkey", items[0].key);
                view.sortsecondField.set("value", items[0].label);
                view.sortsecondField.set("sortkey", items[0].key);
            });
            // setup _sortDirStore
            var _sortDirdata = {"identifier": "key", "items": [{key: "ascending", label: view.nls.ascending}, {key: "descending", label: view.nls.descending}]};
            view._sortOrderStore = new Memory({data: _sortDirdata});
            view.sortfirstOrder.set("value", view.nls.ascending);
            view.sortfirstOrder.set("sortkey", "ascending");
            view.sortsecondOrder.set("value", view.nls.ascending);
            view.sortsecondOrder.set("sortkey", "ascending");
            this._attachHandlers();

            // setup default opener view
            view._openerStore = this.loadedStores.searchFieldsStore;
            view._openerItem = view.sortfirstField;
            view.openerHeader.set("label", view.nls.sort + " " + view.nls.sortfirst);
            view.sortchecklist.setStore(view._openerStore);


        },

        _attachHandlers: function () {
            // summary:
            //      Attach listeners to form inputs on click

            on(view.sortfirstField, "click", view._showOpener.bind(view.sortfirstField, view.loadedStores.searchFieldsStore, view.nls.sort + " " + view.nls.sortfirst));
            on(view.sortsecondField, "click", view._showOpener.bind(view.sortsecondField, view.loadedStores.searchFieldsStore, view.nls.sort + " " + view.nls.sortsecond));
            on(view.sortfirstOrder, "click", view._showOpener.bind(view.sortfirstOrder, view._sortOrderStore, view.nls.sort + " " + view.nls.sortfirst));
            on(view.sortsecondOrder, "click", view._showOpener.bind(view.sortsecondOrder, view._sortOrderStore, view.nls.sort + " " + view.nls.sortsecond));
            on(view.sortchecklist, "click", view._handleOpenerClick);
        },

        _showOpener: function (store, title, event) {

            view._openerStore = store;
            view._openerItem = this;
            view.openerHeader.set("label", title);
            view.sortchecklist.setStore(store);

            var selval = this.get("value");
            view.sortchecklist.getChildren().forEach(function (child) {
                if (child.label === selval) {
                    child.set("checked", true);
                }
            });

            view.opener.show(event.target);
        },

        _handleOpenerClick: function () {
            var selVal,
                getKey,
                queryResults;

            view.opener.hide(true);
            selVal = "";
            query(".mblListItemChecked", view.sortchecklist.domNode).forEach(function (node) {
                selVal = lang.trim(node.innerText || node.textContent || '');
            });

            getKey = function (items) {
                items.forEach(function (item) {
                    if (item.label === selVal) {
                        view._openerItem.set("searchkey", item.key);
                    }
                });
            };

            queryResults = view._openerStore.query({label: selVal});
            if (queryResults.then) {
                queryResults.then(getKey);
            } else {
                getKey(queryResults);
            }

            view._openerItem.set("value", selVal);
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
            var sort,
                firstField,
                firstOrder,
                secondField,
                secondOrder;

            console.log('do sort');
            sort = [];

            firstField = view.sortfirstField.get("searchkey");
            firstOrder = view.sortfirstOrder.get("searchkey");
            if (firstField && firstField !== "none" && firstOrder) {
                sort.push({'attribute': firstField,
                            'descending': firstOrder === "descending"});
            }
            secondField = view.sortsecondField.get("searchkey");
            secondOrder = view.sortsecondOrder.get("searchkey");
            if (secondField && secondField !== "none" && secondOrder) {
                sort.push({'attribute': secondField,
                            'descending': secondOrder === "descending"});
            }

            view.app.transitionToView(view.domNode, { target: 'requestList', reverse: 'true', 'data': {'sort': sort}});
        }
    };


});
