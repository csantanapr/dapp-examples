/*jslint nomen: true */
/*global _, define, console*/
define([
    'dojo/on',
    'dojo/when',
    'dojo/dom-class',
    'dojo/_base/window',
    'dojo/Deferred',
    'dojo/aspect',
    'dojo/NodeList-manipulate',
    // Load dojo/NodeList-manipulate to get JQuery syntax: see below this file for function syntax
    'dojo/text!app/views/edit/edit.html',
    'dojox/mobile/Heading',
    'dojox/mobile/ToolBarButton',
    'dojox/mobile/Button',
    'dojox/mobile/FormLayout',
    'dojox/mobile/TextBox',
    'dojox/mobile/RoundRect',
    'dojox/mobile/ExpandingTextArea',
    'dojox/mobile/Opener',
    'dojox/mobile/DatePicker',
    'dojox/mobile/SpinWheelDatePicker',
    'dojox/mobile/ValuePickerDatePicker',
    'dojox/mobile/SimpleDialog',
    'dojox/mobile/RoundRectStoreList'
], function (on, when, domClass, win, Deferred, aspect) {
    'use strict';

    var viewWidget, // set in init() to save in closure reference to this view controller instance
        viewNode, // set in init() to save in closure reference to this view dom node
        itemToEdit, // model to save and edit
        requestTypeMap, // to be use as cache for possible values for requestType
        statusMap, // to be use as cache for possible values for status
        priorityMap, // to be use as cache for possible values for priority
        unitTypeMap; // to be use as cache for possible values for unitType

    return {

        init: function () {
            // summary:
            //      view life cycle init()

            console.log(this.name + " view:init()");

            //save the view node in clousure to use as scope for dom manipulatation and query
            viewNode = this.domNode;
            viewWidget = this;

            //add class to identify view for css rules
            domClass.add(viewNode, this.name);

            // populate user visible values to data values
            requestTypeMap = viewWidget._setupSelectMap(viewWidget.loadedStores.requestTypeStore, "description");
            statusMap = viewWidget._setupSelectMap(viewWidget.loadedStores.requestStatusStore, "description");
            priorityMap = viewWidget._setupSelectMap(viewWidget.loadedStores.requestPriorityStore, "description");
            unitTypeMap = viewWidget._setupSelectMap(viewWidget.loadedStores.requestUnitTypeStore, "description");
            // attach event listener on the view
            viewWidget._attachHandlers();
        },

        beforeActivate: function (previousView, data) {
            // summary:
            //      view life cycle beforeActivate()
            console.log(this.name + " view:beforeActivate(" + (previousView ? previousView.name : "") + ",data)" + data);

            // get the id of the displayed request from the params
            itemToEdit = this._renderItem(this.params.id);

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

        destroy: function () {
            // summary:
            //      view life cycle destroy()
            console.log(this.name + " view:destory()");
        },

        /*****
         * Custom Code for View Controller
         *****/
        _setupSelectMap: function (store, value) {
            // summary
            //  Creates the map to be use to translate user values to data values
            var deferred,
                map;

            deferred = new Deferred();

            when(store.query(), function (results) {
                map = {};
                results.forEach(function (item) {

                    map[item[store.idProperty]] = item[value];
                });
                deferred.resolve(map);
                console.log("map resolved");
            });

            return deferred.promise;
        },

        _renderItem: function (id) {
            // summary:
            //      Fetch data and render ui
            var promise;

            promise = null;
            if (!id) {
                // no item passed in
                return promise;
            }

            promise = viewWidget.loadedStores.requestsListStore.get(id);
            when(promise, function (request) {

                viewWidget._renderRequest(request);
            });
            return promise;
        },
        _renderRequest: function (request) {
            // summary:
            //      Render the request data

            if (!request) {
                viewWidget._clearForm();
                return;
            }

            //the display value for user needs to be look in map from store
            requestTypeMap.then(function (map) {
                viewWidget.requestType.set({
                    "value": map[request.requestType],
                    "storeValue": request.requestType,
                    "store": viewWidget.loadedStores.requestTypeStore
                });
            });
            statusMap.then(function (map) {
                viewWidget.status.set({
                    "value": map[request.status],
                    "storeValue": request.status,
                    "store": viewWidget.loadedStores.requestStatusStore
                });
            });
            priorityMap.then(function (map) {
                viewWidget.priority.set({
                    "value": map[request.priority],
                    "storeValue": request.priority,
                    "store": viewWidget.loadedStores.requestPriorityStore
                });
            });
            unitTypeMap.then(function (map) {
                viewWidget.unitType.set({
                    "value": map[request.unitType],
                    "storeValue": request.unitType,
                    "store": viewWidget.loadedStores.requestUnitTypeStore
                });
            });

            // values display to user as found in data
            viewWidget.reqid.set("value", request.id);
            viewWidget.description.set("value", request.description);
            viewWidget.requestedBy.set("value", request.requestedBy);
            viewWidget.requestedFinishDate.set("value", request.requestedFinishDate);
            viewWidget.assignedTo.set("value", request.assignedTo);
            viewWidget.actualFinishDate.set("value", request.actualFinishDate);
            viewWidget.estimatedUnits.set("value", request.estimatedUnits);
            viewWidget.createdDate.set("value", request.createdDate);
            viewWidget.updatedDate.set("value", request.updatedDate);



        },
        _clearForm: function () {
            // summary:
            //      Clears the form fields
            viewWidget.reqid.set("value", null);
            viewWidget.requestType.set("value", null);
            viewWidget.status.set("value", null);
            viewWidget.priority.set("value", null);
            viewWidget.unitType.set("value", null);
            viewWidget.description.set("value", null);
            viewWidget.requestedBy.set("value", null);
            viewWidget.requestedFinishDate.set("value", null);
            viewWidget.assignedTo.set("value", null);
            viewWidget.actualFinishDate.set("value", null);
            viewWidget.estimatedUnits.set("value", null);
            viewWidget.createdDate.set("value", null);
            viewWidget.updatedDate.set("value", null);
        },
        _copyForm: function () {
            // summary:
            //      Copies the form data
            var itemStore = viewWidget.loadedStores.requestsListStore;
            console.log(this.name + " view:_copyForm()");

            when(itemToEdit, function (request) {
                when(viewWidget._saveRequest(request), function (newItem) {
                    delete newItem.id; //delete id so the store knows this is a new item to create and assigned a new id
                    newItem.description = "Copy of " + newItem.description; //update description to reflect new one
                    itemStore.add(newItem);
                    if (win.global.history && win.global.history.back) {
                        win.global.history.back();
                    }
                });
            });

            viewWidget._hideOpenerMore();
        },

        _saveRequest: function (request) {
            // summary:
            //      Gets value from the form on the html and updates the input request

            viewWidget._setRequestValue(viewWidget.description, request, "description");
            viewWidget._setRequestValue(viewWidget.requestType, request, "requestType");
            viewWidget._setRequestValue(viewWidget.status, request, "status");
            viewWidget._setRequestValue(viewWidget.priority, request, "priority");
            viewWidget._setRequestValue(viewWidget.requestedBy, request, "requestedBy");
            viewWidget._setRequestValue(viewWidget.requestedFinishDate, request, "requestedFinishDate");
            viewWidget._setRequestValue(viewWidget.actualFinishDate, request, "actualFinishDate");
            viewWidget._setRequestValue(viewWidget.estimatedUnits, request, "estimatedUnits");
            viewWidget._setRequestValue(viewWidget.unitType, request, "unitType");
            viewWidget._setRequestValue(viewWidget.createdDate, request, "createdDate");
            viewWidget._setRequestValue(viewWidget.updatedDate, request, "updatedDate");

            return request;
        },

        _deleteRequest: function () {
            // summary:
            //      Deletes the item being edited and returns back to the list

            var promise = null,
                id = viewWidget.params.id;
            if (!id) {
                // no item passed in
                return promise;
            }

            promise = viewWidget.loadedStores.requestsListStore.remove(id);

            when(promise, function () {
                // we want to be back to list, which is 2 levels back
                viewWidget._hideConfirmDelete();
                viewWidget.app.transitionToView(viewWidget.domNode, {
                    target: 'requestList',
                    reverse: 'true'
                });
            });
        },

        _saveForm: function () {
            // summary:
            //      Updates the itemtoEdit with values from form and sends put to store with new values
            var itemStore = viewWidget.loadedStores.requestsListStore;

            when(itemToEdit, function (request) {
                if (request) {
                    // save the updated item into the store
                    itemStore.put(viewWidget._saveRequest(request));
                } else {
                    // not found do not update
                    console.log("item not found");
                }
            });
        },

        _setRequestValue: function (widget, request, reqfield) {
            // summary:
            //  Only updates the request from widget if value is defined

            var value = widget.get("storeValue") || widget.get("value");
            if (value !== undefined) {
                request[reqfield] = value;
            }
        },

        _attachHandlers: function () {
            // summary:
            //      Attach listeners to form inputs on click

            //add listeners on form fields type date picker
            on(viewWidget.requestedFinishDate, "click", viewWidget._showDateOpener.bind(this.requestedFinishDate));
            on(viewWidget.actualFinishDate, "click", viewWidget._showDateOpener.bind(this.actualFinishDate));
            //add listener on form field type checklist
            on(viewWidget.requestType, "click", viewWidget._showSelectOpener.bind(viewWidget.requestType));
            on(viewWidget.status, "click", viewWidget._showSelectOpener.bind(viewWidget.status));
            on(viewWidget.priority, "click", viewWidget._showSelectOpener.bind(viewWidget.priority));
            on(viewWidget.unitType, "click", viewWidget._showSelectOpener.bind(viewWidget.unitType));

            //add listener to checklist
            aspect.after(viewWidget.selectCheckList, "onCheckStateChanged", viewWidget._onCheckStateChanged, true);
        },

        _showSelectOpener: function (event) {
            //summary:
            //      Show Select Opener
            var opener,
                formWidget;

            opener = viewWidget.openerSelect;
            formWidget = opener.formWidget = this;
            opener.formWidget = formWidget;

            console.log("_showDateOpener(event)");
            opener.onHide = function () {
                console.log("hiding opener");
            };
            opener.onShow = function () {
                console.log("showing opener");
            };
            viewWidget.selectCheckList.setStore(formWidget.store);
            opener.show(event.target);

        },
        _onCheckStateChanged: function (listItem, newState) {
            // summary:
            //      Stub function to connect to from your application.
            // description:
            //      Called when the check state has been changed.

            var formWidget,
                valueSelected,
                value,
                opener;

            // we only care about the value being selected
            if (!newState) {
                return;
            }
            opener = viewWidget.openerSelect;
            formWidget = opener.formWidget;
            valueSelected = listItem.label;
            value = listItem[formWidget.store.idProperty];

            console.log("_onCheckStateChanged");
            console.log("listItem" + listItem);
            console.log("newState" + newState);

            formWidget.set({
                "value": valueSelected,
                "storeValue": value
            });
            opener.hide();
        },

        _showDateOpener: function (event) {
            // summary:
            //      Show DateOpener

            var DateTextBox = this;
            console.log("_showDateOpener(event)");
            viewWidget.opener.onHide = function () {
                console.log("hiding opener");
            };
            viewWidget.opener.onShow = function () {
                console.log("showing opener");
            };
            viewWidget.opener.show(event.target);
            viewWidget.opener.formWidget = DateTextBox;
        },

        _doneOpener: function () {
            // summary:
            //  Done selecting new date

            var opener = viewWidget.opener,
                formWidget = viewWidget.opener.formWidget,
                datePicker = viewWidget.datePicker;

            console.log("done opener");

            formWidget.set("value", datePicker.get("value"));
            opener.hide();
        },

        _cancelOpener: function () {
            // summary:
            //      Cancel date editing

            console.log("cancel opener");
            viewWidget.opener.hide();
        },

        _hideConfirmDelete: function () {
            // summary:
            //      Hides the delere confirm dialog
            console.log("cancel delete confirm");
            viewWidget.confirmDelete.hide();
        },

        _showConfirmDelete: function () {
            // summary:
            //      Displays the confirm dialog to user
            viewWidget._hideOpenerMore();
            viewWidget.confirmDelete.show();
        },

        _showMoreOpener: function (event) {
            // summary:
            //      Show More Action Sheet

            console.log("cancel opener");
            viewWidget.openerMore.show(event.target);

        },

        _hideOpenerMore: function () {
            // summary:
            //     Hides More Action Sheet Opener
            viewWidget.openerMore.hide();
        }
    };

});