var ctrls = angular.module('haoshiyou.PostCtrls', ['ngResource', 'lbServices']);

function EditOrCreateCtrl($log, $scope, $q, $state, $stateParams,
                          $ionicLoading, $ionicModal,  $ionicPopup, $http,
                          HsyPost, ConstantService, SessionService, uuid4) {
    $scope.postInput = {};
    $scope.dirty = {};
    if ($stateParams.postId) {
        $scope.title = "编辑";
        $scope.submitLabel = "更新";
        HsyPost.findById({id: $stateParams.postId}).$promise
            .then(function(hsyPost){
                $log.info(hsyPost);
                $log.info(HsyPost);
                return $q.all([hsyPost,
                    HsyPost.hsyHousePreference({id: $stateParams.postId})
                        .$promise,
                    HsyPost.hsyRoommatePreference({id: $stateParams.postId})
                        .$promise
                ]);
            }).then(function(results) {
                $log.info(results);
                var hsyPost = results[0];
                var housePref = results[1];
                var roommatePref = results[2];
                for (var i in $scope.FIELDS) {
                    var field = $scope.FIELDS[i];
                    if (field.type === "date") {
                        $scope.postInput[field.key] = new Date(hsyPost[field.key]);
                    } else {
                        $scope.postInput[field.key] = hsyPost[field.key];
                    }
                }

                ['privateBath', 'designatedParking'].forEach(function(key) {
                    $scope.postInput[key] = housePref[key];
                });
                ['lessCooking', 'noPets'].forEach(function(key) {
                    $scope.postInput[key] = roommatePref[key];
                });
            })
            .catch(function(err){
                //TODO(zzn): handle error when no postId found
            });

    } else {
        $scope.title = "创建";
        $scope.submitLabel = "发布";
    }

    $scope.FIELDS = ConstantService.FIELDS;
    // Load the add / change dialog from the given template URL
    $ionicModal.fromTemplateUrl('templates/edit-field.html', function(modal) {
        $scope.modal = modal;
    }, {
        scope: $scope,
        backdropClickToClose: false
    });

    $scope.showModal = function(action) {
        $log.info("modalAction = " + action);
        $scope.modalField = $scope.FIELDS.filter(function(field) {
            return field.key == action;
        })[0];
        $scope.modal.show();
    };

    $ionicModal.fromTemplateUrl('templates/edit-photo.html', function(modal) {
        $scope.photoModal = modal;
    }, {
        scope: $scope,
        backdropClickToClose: false
    });

    $scope.showPhotoModal = function() {
        $scope.photoModal.show();
    };

    $scope.done = function() {
        $scope.modal.hide();
        $scope.photoModal.hide();
    };
    function validate () {
        var valid = true;
        for (var i in $scope.FIELDS) {
            var field = $scope.FIELDS[i];
            if (!field.required || $scope.postInput[field.key]) {
                // Do nothing
                $log.info("field = " + JSON.stringify(field));
            } else {
                valid = false;
            }
        }
        return valid;
    }
    function submitToDataStorePromise() {
        $log.info("submit!");
        $log.info($scope.postInput);
        $log.log("submiting");

        var post = _.omit($scope.postInput, [
            // TODO(zzn): use a better solution instead of hardcoding them here.
            'privateBath', 'designatedParking',
            'lessCooking', 'noPets'
        ]);
        post.guid = uuid4.generate();
        post.createdBySessionId = SessionService.getSessionId();
        $log.info("new guid = " + post.guid);
        var roommatePreference = _.pick($scope.postInput, ['lessCooking', 'noPets']);
        var housePreference = _.pick($scope.postInput, ['privateBath', 'designatedParking']);
        if ($stateParams.postId) {
            return HsyPost.findById({id: $stateParams.postId}).$promise
                .then(function(hsyPost) {
                    $log.info(hsyPost);
                    for (var i in $scope.FIELDS) {
                        var field = $scope.FIELDS[i];
                        hsyPost[field.key] = $scope.postInput[field.key];
                    }
                    return $q.all([
                        hsyPost.$save(),
                        HsyPost.hsyHousePreference.update({id: $stateParams.postId}, housePreference),
                        HsyPost.hsyRoommatePreference.update({id: $stateParams.postId}, roommatePreference),
                    ]);
                }).catch(function(err) {
                    $log.error(err);
                });
        } else {
            return HsyPost.create(post).$promise
                .then(function (hsyPost) {
                    $log.info(hsyPost);
                    return $q.all([

                        HsyPost.hsyHousePreference.create({id: hsyPost.id}, housePreference),
                        HsyPost.hsyRoommatePreference.create({id: hsyPost.id}, roommatePreference),
                    ]);
                });

        }
    }
    $scope.onSubmit = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '确认发布'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.attempted = true;
                if (validate()) {
                    submitToDataStorePromise().then(function(){
                        $state.go('tab.my');
                        $ionicLoading.show({ template: $scope.submitLabel + '成功', noBackdrop: true, duration: 1500 });
                    });
                } else {
                    // Do nothing

                    $ionicLoading.show({ template: $scope.submitLabel + '失败', noBackdrop: true, duration: 1500 });
                    $log.info("invalid, not submiting");
                }
            } else {
                $log.info("cancel on submit, not submiting");
            }
        });
    }
}
ctrls.controller('EditOrCreateCtrl', EditOrCreateCtrl);


function PhotoCtrl($scope, $cordovaImagePicker, $rootScope, $q, $cordovaFileTransfer) {
    $scope.canEdit = true;

    $scope.ready = false;

    $rootScope.$watch('appReady.status', function() {
        console.log('watch fired '+$rootScope.appReady.status);
        if($rootScope.appReady.status) $scope.ready = true;
    });

    var options = {
        maximumImagesCount: 10,
        width: 1600,
        height: 1600,
        quality: 80
    };
    $scope.getPhotos = function() {

        console.log("222 ");
        $cordovaImagePicker.getPictures(options)
            .then(function (results) {
                console.log("333 ");
                var promises = [];
                for (var i = 0; i < results.length; i++) {
                    console.log("444 " + i);
                    try {
                        promises.push(
                            $cordovaFileTransfer.upload("https://api.cloudinary.com/v1_1/" +
                                $.cloudinary.config().cloud_name + "/image/upload", results[i], {
                                params: {upload_preset: $.cloudinary.config().upload_preset}
                            }));
                    } catch (err) {
                        console.log(JSON.stringify(err));
                    }
                }
                return $q.all(promises);
            }).then(function (postResults) {
                console.log("Start upload XXX");
                for (var i in postResults) {
                    var postResult = postResults[i];
                    var data = JSON.parse(postResult.response);

                    console.log("images:" + JSON.stringify($scope.postInput.images));
                    $scope.postInput.images = $scope.postInput.images === null ? [] : $scope.postInput.images;
                    console.log("images:" + JSON.stringify($scope.postInput.images));
                    console.log("data:" + JSON.stringify(data));
                    console.log($scope.postInput.images);
                    $scope.postInput.images.push(data.public_id);
                }
                console.log($scope.imagePublicIds);
                console.log("End upload XXX");
            }).catch(function(error) {
                console.log(error);
            });
    };
    $scope.delete = function(imageId) {
        var i = $scope.postInput.images.indexOf(imageId);
        if (i > -1) {
            $scope.postInput.images.splice(i, 1);
        }
    }
}
ctrls.controller('PhotoCtrl', PhotoCtrl);

function ViewCtrl($scope, $state, ConstantService, HsyPost, $stateParams, $log, $q) {
  $scope.$state = $state;
  $scope.FIELDS = ConstantService.FIELDS;
    $scope.postInput = {};
  $log.info("view post id = " + $stateParams.postId);
    HsyPost.findById({id: $stateParams.postId}).$promise
        .then(function(hsyPost){
            $log.info("Fetched!");
            $log.info(hsyPost);
            $log.info(HsyPost);
            return $q.all([hsyPost,
                HsyPost.hsyHousePreference({id: $stateParams.postId})
                    .$promise,
                HsyPost.hsyRoommatePreference({id: $stateParams.postId})
                    .$promise
            ]);
        }).then(function(results) {
            $log.info(results);
            var hsyPost = results[0];
            var housePref = results[1];
            var roommatePref = results[2];
            for (var i in $scope.FIELDS) {
                var field = $scope.FIELDS[i];
                if (field.type === "date") {
                    $scope.postInput[field.key] = new Date(hsyPost[field.key]);
                } else {
                    $scope.postInput[field.key] = hsyPost[field.key];
                }
            }

            ['privateBath', 'designatedParking'].forEach(function(key) {
                $scope.postInput[key] = housePref[key];
            });
            ['lessCooking', 'noPets'].forEach(function(key) {
                $scope.postInput[key] = roommatePref[key];
            });
        })
        .catch(function(err){
            //TODO(zzn): handle error when no postId found
        });
}
ctrls.controller('ViewCtrl', ViewCtrl);


function EditStartDateCtrl($scope) {
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.datePickerCallback = function(){};
}

ctrls.controller('EditStartDateCtrl', EditStartDateCtrl);

function EditLocationCtrl($log, $scope, uiGmapGoogleMapApi) {

    $scope.pending = false;
    var southWest = new google.maps.LatLng( 37.196011, -122.569317 );
    var northEast = new google.maps.LatLng( 38.071471, -121.570935 );
    var bayAreaBounds = new google.maps.LatLngBounds( southWest, northEast );
    uiGmapGoogleMapApi.then(function(maps){
        $log.info("loaded maps");
        $scope.map = {
            center: { latitude: 37.565396, longitude: -122.166257 }, zoom: 9,
            bounds: {}, // use bounds to set init view does not work
        };
    });

    $scope.options = {
        country: 'us',
        types: 'address',
        bounds: bayAreaBounds,
        watchEnter: true
    };

    // details has to be wrapped in an object, here 'autocomplete for it to be watched
    $scope.autocomplete = { details: null };

    $scope.$watch("postInput.location", function(newValue, oldValue){
        if (newValue && oldValue && newValue !== oldValue) {
            console.log("set pending to true");
            $scope.pending = true;
        }
    }, true);
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 37.565396,
            longitude: -122.166257
        },
        options: { draggable: false }
    };

    $scope.postInput['radiusInMiles'] = $scope.postInput['radiusInMiles'] || 0;

    console.log("geopointFromLocation = " + JSON.stringify($scope.postInput['geopointFromLocation'])); // XXX
    if ($scope.postInput['geopointFromLocation']) {

        console.log("!!! = " + JSON.stringify($scope.postInput['geopointFromLocation'])); // XXX
        $scope.marker.coords.latitude = $scope.postInput['geopointFromLocation'].lat;
        $scope.marker.coords.longitude = $scope.postInput['geopointFromLocation'].lng

    }
    $scope.$watch(
        "autocomplete.details",
        function( newValue ) {
            if (newValue && newValue.geometry) {
                $log.debug(newValue);
                var location = newValue.geometry.location;
                $scope.postInput['geopointFromLocation'] = {lat: location.lat(), lng: location.lng()};
                $scope.marker.coords.latitude = location.lat();
                $scope.marker.coords.longitude = location.lng();
                $log.info('update geopointFromLocation: ' + JSON.stringify($scope.postInput['geopointFromLocation']));
                $scope.pending = false;
                console.log("set pending to false");
            }
        }
        ,true);

}
ctrls.controller('EditLocationCtrl', EditLocationCtrl);

