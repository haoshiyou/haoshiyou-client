jQuery(function ($) {
    $(document).ready(function () {
        //TODO(zzn): move initialize code to somewhere else.
        var initialize = function() {
            Parse.initialize("RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y", "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h");
            zHelper.trackerFunctions["woopra"] = function (action, dimensions) {
                woopra.track(action, dimensions);
            };
            zHelper.trackerFunctions["ga"] = function (action, dimensions) {
                ga('send', 'event', 'button', 'click', action, dimensions);
            };
            zHelper.trackerFunctions["ga"] = function (action, dimensions) {
                ga('send', 'event', 'button', 'click', action, dimensions);
            };
            zHelper.trackerFunctions["parse"] = function (action, dimensions) {
                var ParseTracking = Parse.Object.extend("ParseTracking");
                var parseTracking = new ParseTracking();
                for (var key in dimensions) {
                    parseTracking.set(key, dimensions[key]);
                }
                parseTracking.set("action", action);
                parseTracking.save();
            };
            zHelper.loggerFunctions["parse"] = function (msg, level, data) {
                var ParseLogging = Parse.Object.extend("ParseLogging");
                var parseLogging = new ParseLogging();
                parseLogging.set("msg", msg);
                parseLogging.set("level", level);
                for (var key in data) {
                    parseLogging.set(key, data[key]);
                }
                parseLogging.save();
            };

            // Init view
            zHelper.log("track view");
            zHelper.track("view");
            console.log("Is Deubg? " + zHelper.isDebug());
            $.getJSON("http://www.telize.com/geoip?callback=?",
                function (jsonp) {
                    zHelper.geoInfo.ip = jsonp.ip;
                    zHelper.geoInfo.city = jsonp.city;
                    zHelper.geoInfo.country = jsonp.country;
                    zHelper.track("loaded-geo-info");
                }
            );

            // Set up cors proxy for jQuery
            $.ajaxPrefilter(function (options) {
                if (options.crossDomain && jQuery.support.cors) {
                    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                }
            });
        }

        var currentState = null;

        var hideBasicPages = function() {
            $(".basic-page").hide();
        };

        var showStartPage = function() {
            $("#start_page").show();
        };

        var showListingStep1Locaiton = function() {
            $(".listing-page").hide();
            $("#listing_step_1_location").show();
            var mapOptions = {
                center: { lat: 37.400606, lng: -122.035795},
                zoom: 8
            };
            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);
            var marker;
            function codeAddress(address) {
                //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                        map.setCenter(results[0].geometry.location);
                        if(marker != null) marker.setMap(null); // Clear marker
                        marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        zHelper.log("Geocode was not successful for the following reason: " + status);
                    }
                });
            }

            $("#listing_step_1_location_input").change(function(e){
                var address = $("#listing_step_1_location_input").val();
                codeAddress(address);
            });



        };

        var showListingStep2TimeAndPrice = function () {
            $(".listing-page").hide();
        };

        var showListingStep3Features = function(){
            $(".listing-page").hide();
        };

        var showListingStep4Restrictions = function(){
            $(".listing-page").hide();
        };

        var showListingStepsPage = function() {
            $("#listing_steps_page").show();
            assert(currentState==null);
            currentState = 1; // Enters at state 1
            showListingStep1Locaiton();
        };

        $("#start_listing_btn").click(function(e) {
            hideBasicPages();
            showListingStepsPage();
        });

        $("#login_and_manage_btn").click(function(e){
            var msg = "Login and Manage Listing Button Clicked.";
            var action = "login-manage-listing";
            zHelper.log(msg);
            zHelper.track(action, msg);
            var modal = $('#notReadyModal');
            modal.find("#feature").text(action);
            modal.modal();
        });

        $("#listing_step_prev").click(function(e) {
            switch(currentState) {
                case 1:
                    $("#listing_steps_page").hide();
                    showStartPage();
                    currentState = null;
                    break;
                case 2:
                    showListingStep1Locaiton();
                    currentState = 1;
                    break;
                case 3:
                    showListingStep2TimeAndPrice();
                    currentState = 2;
                    break;
                case 4:
                    showListingStep3Features();
                    currentState = 3;
                    break;
                default:
                    zHelper.log("Pressed on PREV when on a wrong state: " + currentState);
            }
        });

        $("#listing_step_next").click(function(e) {
            switch(currentState) {
                case 1:
                    showListingStep2TimeAndPrice();
                    currentState = 2;
                    break;
                case 2:
                    showListingStep3Features();
                    currentState = 3;
                    break;
                case 3:
                    showListingStep4Restrictions();
                    currentState = 4;
                    break;
                case 4:
                    //TODO(zzn): preview
                    break;
                default:
                    zHelper.log("Pressed on PREV when on a wrong state: " + currentState);
            }
        });

        var start = function() {
            initialize();
            zHelper.log("Start!");
            hideBasicPages();
            showStartPage();
        };

        start();
    });
});