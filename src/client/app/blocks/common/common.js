(function() {
  'use strict';

  angular
    .module('blocks.common')
    .factory('common', common);

  common.$inject = ['$q', '$rootScope', '$timeout', 'commonConfig'];

  /* @ngInject */
  function common($q, $rootScope, $timeout, commonConfig, logger) {
        var throttles = {};

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            createSearchThrottle: createSearchThrottle,
            debouncedThrottle: debouncedThrottle,
            isNumber: isNumber,
            logger: logger, // for accessibility
            textContains: textContains,
            getPageUrl: getPageUrl
        };

        return service;

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
            // After a delay, search a viewmodel's list using 
            // a filter function, and return a filteredList.

            // custom delay or use default
            delay = +delay || 300;
            // if only vm and list parameters were passed, set others by naming convention 
            if (!filteredList) {
                // assuming list is named sessions, filteredList is filteredSessions
                filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
                // filter function is named sessionFilter
                filter = list + 'Filter'; // function in string form
            }

            // create the filtering function we will call from here
            var filterFn = function () {
                // translates to ...
                // vm.filteredSessions 
                //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
                viewmodel[filteredList] = viewmodel[list].filter(function(item) {
                    return viewmodel[filter](item);
                });
            };

            return (function () {
                // Wrapped in outer IFFE so we can use closure 
                // over filterInputTimeout which references the timeout
                var filterInputTimeout;

                // return what becomes the 'applyFilter' function in the controller
                return function(searchNow) {
                    if (filterInputTimeout) {
                        $timeout.cancel(filterInputTimeout);
                        filterInputTimeout = null;
                    }
                    if (searchNow || !delay) {
                        filterFn();
                    } else {
                        filterInputTimeout = $timeout(filterFn, delay);
                    }
                };
            })();
        }

        function debouncedThrottle(key, callback, delay, immediate) {
            // Perform some action (callback) after a delay. 
            // Track the callback by key, so if the same callback 
            // is issued again, restart the delay.

            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (throttles[key]) {
                $timeout.cancel(throttles[key]);
                throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                throttles[key] = $timeout(callback, delay);
            }
        }

        function isNumber(val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        function truncatePredicateObjectValue(input) {
            var result = input.substring(input.indexOf(':') + 1);
            return result;
        }

        function getPageUrl(tableState, customFilterString) {
            if (!tableState) {
                return '';
            }

            var pagination = tableState.pagination;
            var skip = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var top = pagination.number || 10;  // Number of entries showed per page. Number of page = start / top + 1;

            var filterString = '';
            var listFilterConditions = [];
            if (tableState.search.predicateObject) {
                for (var key in tableState.search.predicateObject) {
                    if (tableState.search.predicateObject.hasOwnProperty(key)) {
                        if (key == 'Status' && tableState.search.predicateObject[key]!= 'All' && tableState.search.predicateObject[key]!= 'string:All') {
                            listFilterConditions.push("Status eq '" + truncatePredicateObjectValue(tableState.search.predicateObject[key]) + "'");
                        } else if (key == 'Timespan') {
                            var val = truncatePredicateObjectValue(tableState.search.predicateObject[key]);
                            
                            //var date = val.toDate();
                            //var dateWithOffsetFormat = date.toISOString();
                            //var newDate = new Date(date.setDate(date.getDate() + 1));
                            //var newDateWithOffsetFormat = newDate.toISOString();
                            //andFilterString = key + " ge " + dateWithOffsetFormat + " and " + key + " lt " + newDateWithOffsetFormat;
                        }
                        else if (key != '$' && key != 'Status') {
                            if(key != 'CustomerOrderCode') {
                                var serchVal = tableState.search.predicateObject[key].toLowerCase();
                                listFilterConditions.push("contains(tolower(" + key + "), '" + serchVal + "')");
                            }
                            
                        } 
                    }
                }
            }
            if (customFilterString) {
                listFilterConditions.push(customFilterString);
            }
            if (listFilterConditions.length > 0) {
                filterString = "$filter=";
                for (var i = 0; i < listFilterConditions.length; i++) {
                    if (i > 0) {
                        filterString += " and " + listFilterConditions[i];
                    } else {
                        filterString += listFilterConditions[i];
                    }
                }
            }
            //var selectString = '&$select=GroupOrderCode,CreatedTime,Shipments/Cost,Shipments/SenderPickupAddress/RawAddress,Shipments/ReceiverPickupAddress/RawAddress,Shipments/Rank';
            //var expandString = '&$expand=Shipments';
            var orderBy = '$orderby=Id desc';
            if (tableState.sort.predicate) {
                var direction = tableState.sort.reverse ? 'asc' : 'desc';
                orderBy = '$orderby=' + tableState.sort.predicate + " " + direction;
            }

            var result = '?$skip=' + skip + '&$top=' + top + (filterString ? '&' + filterString : '') + (orderBy ? '&' + orderBy : '');
            return result;
        }
    }
} ());
